const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../apps/api/src/server');

let server;
let base;

test.before(async () => {
  server = createApp();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => server.close());

test('health endpoint is available', async () => {
  const response = await fetch(`${base}/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});

test('creates a private session with bounded venue state', async () => {
  const response = await fetch(`${base}/sessions`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Pilot venue', objectives: ['capture flag'] }) });
  assert.equal(response.status, 201);
  const body = await response.json();
  assert.equal(body.name, 'Pilot venue');
  assert.deepEqual(body.bounds, { width: 1000, height: 1000 });
  assert.deepEqual(body.participants, []);
});

test('does not expose an identity or public-OSINT endpoint', async () => {
  const response = await fetch(`${base}/identify?name=example`);
  assert.equal(response.status, 404);
});
