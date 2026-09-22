# Phase 1 Implementation — Local Training Vertical Slice

## Delivered

The repository now contains a runnable Node.js service that demonstrates the first safe product loop: create a private session, join with explicit consent, share bounded venue positions, receive facilitator-created simulated events, pause or end the session, and retain a minimal audit trail.

The service is intentionally **not** an OSINT, surveillance, or identity system. It has no facial-recognition route, no public-data enrichment route, no camera ingestion, and no autonomous tactical recommendations. Those capabilities remain deferred until a separate legal, safety, and product review establishes a legitimate, consented use case.

## Run locally

```bash
npm install
npm test
npm start
```

The API listens on `http://localhost:8787` by default. Create a session with:

```bash
curl -X POST http://localhost:8787/sessions \
  -H 'content-type: application/json' \
  -d '{"name":"Pilot venue","objectives":["capture flag"]}'
```

A browser client can connect to `ws://localhost:8787/rooms/<session-id>`. Messages are JSON and include `join`, `move`, `simulated_event`, and facilitator-only `session_command` types. Movement is constrained to a 1000 × 1000 local venue coordinate system.

## Next implementation gates

1. Add the player client and operator console using the same message contract.
2. Replace in-memory state with PostgreSQL only after retention and deletion tests exist.
3. Add authentication and facilitator authorization before any shared or paid pilot.
4. Add automated end-to-end tests for a five-player dry run.
5. Complete venue safety, privacy counsel, and incident-response review before external deployment.
