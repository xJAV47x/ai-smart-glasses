# AI Smart Glasses — Indoor Training Platform

> **Current focus:** A budget-conscious, supervised indoor recreational-training prototype that lets a small team share a live venue map, complete objectives, receive operator-managed simulated events, and review a consented session debrief.

## Why This Repository Exists

This repository is the planning and implementation home for an **augmented-reality-ready team training platform**. The long-term vision includes glasses-based visual overlays and personal productivity assistance. The immediate goal is deliberately smaller: demonstrate a safe, useful, commercially testable venue experience before investing in bespoke hardware, AI agents, advanced computer vision, or large arena infrastructure.

The first prototype is designed for **controlled, consent-based venues** such as recreational airsoft/paintball-style simulations, team-building events, and supervised training exercises. It is not designed for real-world surveillance, person identification, public-data profiling, target selection, or unsupervised tactical use.

## MVP Promise

A facilitator can create a private session, assign teams, configure objectives and restricted zones, observe a shared local map, record simulated session events, pause or end the session instantly, and produce a post-session summary. Participants join from ordinary phones or tablets, which keeps cost and hardware risk low.

| In the 90-day MVP | Explicitly deferred |
|:--|:--|
| Local venue map, team positions, objectives, and zones | Public-data facial recognition and OSINT enrichment |
| Browser-based player client and operator console | Outdoor navigation and live public tracking |
| Server-authoritative real-time state and session audit trail | Autonomous AI/tactical recommendations |
| Safe manual or BLE-based simulated event input | Weapon-like hardware or camera-based engagement scoring |
| Consent, privacy controls, safety checklist, and debrief | Persistent biometrics or nonparticipant data collection |
| One supervised pilot venue | Multi-venue cloud scaling and custom smart-glasses manufacture |

## Recommended Initial Stack

The MVP uses a pragmatic, lightweight stack rather than a collection of speculative technologies.

| Layer | Recommended component | Role |
|:--|:--|:--|
| Participant and operator clients | React + TypeScript + Vite | Mobile-responsive browser applications. |
| Real-time session state | [Colyseus](https://github.com/colyseus/colyseus) | Server-authoritative rooms, state synchronization, reconnection. |
| Venue map | [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) | Local floorplan, team markers, objectives, and zones. |
| Durable records | PostgreSQL | Consent, session, and audit data. |
| Early deployment | Docker Compose | One-command local venue stack. |
| Optional disposable internal proof | [PocketBase](https://github.com/pocketbase/pocketbase) | A one-file self-hosted back end when speed matters more than enterprise durability. |
| Later voice/video | [LiveKit](https://github.com/livekit/livekit) | Self-hosted WebRTC media after the core loop is proven. |

Colyseus offers server-defined state synchronization and room-based multiplayer primitives; MapLibre GL JS offers an open-source WebGL mapping layer under a BSD-3-Clause license.[1] [2]

## Repository Map

```text
ai-smart-glasses/
├── apps/
│   ├── player-client/         # Participant-facing client (scaffold)
│   ├── operator-console/      # Session/facilitator controls (scaffold)
│   └── api/                   # Service entry point (scaffold)
├── packages/
│   ├── shared-types/          # Shared TypeScript event and state contracts
│   └── game-rules/            # Deterministic session and scoring rules
├── infra/compose/             # Local venue deployment configuration
├── hardware/bom/              # Tested hardware bill of materials
├── tests/
│   ├── e2e/                   # End-to-end session tests
│   └── load/                  # Real-time load tests
├── docs/
│   ├── README.md              # Documentation index
│   ├── PROTOTYPE_READINESS_AUDIT.md
│   ├── 90_DAY_MVP_EXECUTION_PLAN.md
│   ├── LEAN_TEAM_AND_HIRING_PLAN.md
│   ├── OPEN_SOURCE_STACK_SHORTLIST.md
│   └── ...legacy concept, business, and compliance documents
└── business/                  # Business plans and presentation materials
```

## Start Here

1. Read the [Prototype Readiness Audit](docs/PROTOTYPE_READINESS_AUDIT.md) to understand what exists and what is missing.
2. Follow the [90-Day MVP Execution Plan](docs/90_DAY_MVP_EXECUTION_PLAN.md) for scope, cost controls, safety gates, and pilot acceptance criteria.
3. Use the [Lean Team and Hiring Plan](docs/LEAN_TEAM_AND_HIRING_PLAN.md) to recruit only the roles that unblock the next deliverable.
4. Select dependencies from the [Open-Source Stack Shortlist](docs/OPEN_SOURCE_STACK_SHORTLIST.md) after reviewing each project's license and security posture.
5. Treat all legacy concepts as **exploration tracks** until the controlled MVP passes its pilot gates.

## Governance and Safety

Every production or pilot change must preserve the following rules:

- Sessions remain supervised in a defined venue with a facilitator pause/end control.
- Participants receive clear notice and provide consent before joining a session.
- Data collection remains limited to what is needed for the session; deletion and retention controls are tested.
- No feature enables identification of nonparticipants, public-data profiling, real-world targeting, or autonomous decisions that affect participant safety.
- Privacy counsel and venue-safety review are required before external or paid pilots.

## Status

**Phase 1 foundation implemented.** The repository now includes a runnable local Node.js training API with consent-gated joins, bounded venue movement, facilitator-controlled simulated events, session pause/end controls, and an audit trail. The next implementation milestone is a two-client local-map vertical slice followed by an operator-controlled five-player dry run.

See [Phase 1 Implementation](docs/PHASE_1_IMPLEMENTATION.md) for setup and the current safety boundaries. Run `npm install && npm test` to verify the service foundation.

## License

No project license has been selected. Do not treat this repository as open source or accept external code contributions until the project owner chooses a license and contribution policy.

## References

[1] [Colyseus, “Authoritative Multiplayer Framework for Node.js.”](https://github.com/colyseus/colyseus)

[2] [MapLibre GL JS, “Interactive vector tile maps in the browser.”](https://github.com/maplibre/maplibre-gl-js)
