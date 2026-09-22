const http = require('node:http');
const crypto = require('node:crypto');
const { WebSocketServer } = require('ws');
const { validateParticipant, validateMove, MAX_COORDINATE } = require('../../../packages/shared-types/session-contract');

const sessions = new Map();
const audit = [];

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

function createSession(input = {}) {
  const id = crypto.randomUUID();
  const session = {
    id,
    name: typeof input.name === 'string' && input.name.trim() ? input.name.trim().slice(0, 80) : 'Local training session',
    status: 'lobby',
    bounds: { width: MAX_COORDINATE, height: MAX_COORDINATE },
    participants: new Map(),
    objectives: Array.isArray(input.objectives) ? input.objectives.slice(0, 20) : [],
    events: [],
    createdAt: new Date().toISOString()
  };
  sessions.set(id, session);
  record(session.id, 'session.created', { name: session.name });
  return session;
}

function publicState(session) {
  return {
    id: session.id,
    name: session.name,
    status: session.status,
    bounds: session.bounds,
    objectives: session.objectives,
    participants: [...session.participants.values()],
    events: session.events.slice(-50)
  };
}

function record(sessionId, type, data) {
  audit.push({ at: new Date().toISOString(), sessionId, type, data });
  if (audit.length > 5000) audit.shift();
}

function broadcast(room, message) {
  const payload = JSON.stringify(message);
  for (const client of room.clients) {
    if (client.readyState === 1) client.send(payload);
  }
}

function startSession(session, command) {
  if (command === 'pause') session.status = 'paused';
  else if (command === 'resume') session.status = 'active';
  else if (command === 'end') session.status = 'ended';
  else if (command === 'start') session.status = 'active';
  else throw new Error('unsupported facilitator command');
  record(session.id, `session.${command}`, {});
}

function createApp() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/health') return json(res, 200, { ok: true, service: 'training-api', sessions: sessions.size });
    if (req.method === 'GET' && url.pathname.startsWith('/sessions/')) {
      const session = sessions.get(url.pathname.split('/')[2]);
      return session ? json(res, 200, publicState(session)) : json(res, 404, { error: 'session not found' });
    }
    if (req.method === 'GET' && url.pathname === '/audit') return json(res, 200, audit);
    if (req.method === 'POST' && url.pathname === '/sessions') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const session = createSession(body ? JSON.parse(body) : {});
          json(res, 201, publicState(session));
        } catch { json(res, 400, { error: 'invalid JSON' }); }
      });
      return;
    }
    json(res, 404, { error: 'not found' });
  });
  const wss = new WebSocketServer({ noServer: true });
  server.on('upgrade', (req, socket, head) => {
    const match = new URL(req.url, 'http://localhost').pathname.match(/^\/rooms\/([^/]+)$/);
    const session = match && sessions.get(match[1]);
    if (!session) return socket.destroy();
    wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws, session));
  });
  wss.on('connection', (ws, session) => {
    ws.room = { clients: new Set([ws]) };
    ws.send(JSON.stringify({ type: 'state', state: publicState(session) }));
    ws.on('message', raw => {
      let message;
      try { message = JSON.parse(raw.toString()); } catch { return ws.send(JSON.stringify({ type: 'error', error: 'invalid JSON' })); }
      try {
        if (message.type === 'join') {
          const check = validateParticipant(message);
          if (!check.ok) throw new Error(check.error);
          const id = crypto.randomUUID();
          session.participants.set(id, { id, name: message.name.trim(), team: message.team, x: 0, y: 0, joinedAt: new Date().toISOString() });
          ws.participantId = id;
          record(session.id, 'participant.joined', { participantId: id, team: message.team });
        } else if (message.type === 'move') {
          if (!ws.participantId || !session.participants.has(ws.participantId)) throw new Error('join with consent before moving');
          if (session.status !== 'active') throw new Error('session is not active');
          const check = validateMove(message);
          if (!check.ok) throw new Error(check.error);
          const participant = session.participants.get(ws.participantId);
          participant.x = message.x; participant.y = message.y;
          record(session.id, 'participant.moved', { participantId: ws.participantId, x: message.x, y: message.y });
        } else if (message.type === 'simulated_event') {
          if (message.role !== 'facilitator') throw new Error('only facilitator may create simulated events');
          const event = { id: crypto.randomUUID(), label: String(message.label || 'simulated event').slice(0, 80), x: message.x ?? null, y: message.y ?? null, at: new Date().toISOString() };
          session.events.push(event); record(session.id, 'simulated.event', event);
        } else if (message.type === 'session_command') {
          if (message.role !== 'facilitator') throw new Error('only facilitator may control the session');
          startSession(session, message.command);
        } else throw new Error('unsupported message type');
        broadcast(ws.room, { type: 'state', state: publicState(session) });
      } catch (error) { ws.send(JSON.stringify({ type: 'error', error: error.message })); }
    });
    ws.on('close', () => {
      if (ws.participantId) { session.participants.delete(ws.participantId); record(session.id, 'participant.left', { participantId: ws.participantId }); }
      ws.room.clients.delete(ws);
    });
  });
  return server;
}

if (require.main === module) {
  const port = Number(process.env.PORT || 8787);
  createApp().listen(port, '0.0.0.0', () => console.log(`training-api listening on ${port}`));
}

module.exports = { createApp, createSession, sessions, audit, publicState };
