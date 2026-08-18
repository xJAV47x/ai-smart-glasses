# Prototype Readiness Audit

**Project:** AI Smart Glasses Tactical Training Platform  
**Status:** Concept and documentation stage  
**Audit date:** August 18, 2026  
**Author:** Manus AI

## Executive Assessment

The project has a substantial concept, business-plan, legal-framework, and presentation foundation. However, it is **not yet a buildable prototype repository**. It contains architecture proposals and commercial assumptions, but no source code, dependency manifests, test harness, hardware bill of materials, deployment configuration, product requirements, or validated technical proof-of-concept.

The recommended correction is to define a narrowly scoped, lawful **indoor recreational-training MVP** before expanding into personal AI assistance, advanced computer vision, OSINT enrichment, or an arena franchise model. The first prototype should prove only four product promises: live team location, shared objective markers, controlled simulated hit events, and a spectator/admin map. This creates a demonstrable product while limiting cost, technical risk, and privacy exposure.

> The initial product boundary should be a supervised, consent-based training or recreational venue. It must not provide real-world targeting, person identification, autonomous threat assessment, or public-data facial identification.

## Current Repository Inventory

| Area | Present | Assessment |
|:--|:--:|:--|
| Product vision and summaries | Yes | Strong conceptual base; scope is too broad for MVP execution. |
| System architecture documents | Yes | Useful direction but several technologies are alternatives, not decisions. |
| MCP server specification | Yes | Premature for the first prototype; defer until a functional game loop exists. |
| Business plan and deck | Yes | Needs bottom-up prototype budget and evidence-based market assumptions. |
| Legal and ethics documentation | Yes | Good starting point; needs a venue-specific privacy and safety operating policy. |
| Source code | No | Critical gap. |
| Hardware BOM and supplier validation | No | Critical gap. |
| System integration proof | No | Critical gap. |
| Data model and event schema | No | Critical gap. |
| Test plans and acceptance criteria | No | Critical gap. |
| CI/CD, security baseline, environment templates | No | Critical gap. |
| Git issue roadmap and ownership | No | Critical gap. |

## MVP Scope Decision

The MVP should use **smartphone or tablet clients first**, with optional tethered AR display output for one demonstrator. A dedicated AR glasses client should follow only after the multiplayer state model, positioning, and safety UX work reliably on ordinary devices. This avoids making display hardware the critical path.

| Include in MVP | Defer beyond MVP |
|:--|:--|
| Venue-defined teams and session creation | Outdoor live navigation |
| GPS-free indoor position zones or manual test coordinates | Public-data facial recognition or person identification |
| Shared 2D team/spectator map | OSINT features and external people lookup |
| Objective markers and trainer-controlled red/blue zones | Automated threat prediction and targeting suggestions |
| Simulated laser-tag / button-based hit events | Weapon-like gesture detection or computer-vision engagement scoring |
| Consent screen, session logs, deletion control | Persistent biometric or personal profile enrichment |
| Admin controls and post-session metrics | LLM-driven tactical decision automation |

## Minimum Demonstration Scenario

A four-to-eight player indoor recreational session demonstrates the core loop. The venue operator creates a session and places three objectives. Players join a blue or orange team from a phone or display client. Each player sees friendly locations, objective state, and a trainer-created restricted or engagement zone. A simple BLE button, tagged vest, or instructor console records simulated hits. The operator views a browser dashboard with all participants and ends the session, after which the platform produces a consented session summary and allows deletion.

## Architecture Decisions Required Before Coding

| Decision | Recommended MVP default | Reason |
|:--|:--|:--|
| Client platform | React/TypeScript web app, mobile-responsive | Lowest-cost path to validate interaction and networking. |
| Backend architecture | One modular API plus one real-time gateway | Avoids premature microservices and Kubernetes overhead. |
| Real-time protocol | WebSocket for state, WebRTC only for later voice/video | Keeps operations and debugging manageable. |
| Position source | Manual coordinates / UWB-ready adapter; no fragile SLAM dependency | Decouples gameplay validation from expensive indoor-location work. |
| Game authority | Server-authoritative session state | Allows audit logs, safety controls, and cheating resistance. |
| Database | PostgreSQL plus Redis only if needed | Simple, portable, and sufficient for MVP. |
| Deployment | Docker Compose for pilot venue | Easier and cheaper than cloud orchestration at prototype stage. |
| AI integration | Trainer-assist text generation only, opt-in | Validate value before building custom MCP/ML services. |

## Evidence Required to Exit MVP

The prototype should not move into advanced AR hardware or commercial venue expansion until it proves the following in at least ten supervised pilot sessions.

| Validation objective | Acceptance criterion |
|:--|:--|
| Session reliability | At least 95% of sessions start, run, and close without manual database intervention. |
| State responsiveness | Map and objective events are visible to participating clients within two seconds on venue Wi-Fi. |
| Safety controls | Instructor can pause, end, and remove a participant immediately. |
| Position usefulness | Participants can accurately locate teammates or objectives in the intended test area. |
| Usability | At least 80% of pilot participants can join a session and understand the map without staff assistance after briefing. |
| Privacy operations | Consent, deletion, and retention controls work end-to-end. |
| Commercial signal | At least three prospective venue or training customers agree to a structured pilot discussion. |

## Immediate Build Gaps

The repository must next add a product requirements document, a domain/event schema, a hardware BOM, a source-code monorepo scaffold, API contracts, sample configuration, test scenarios, and a prioritized issue backlog. The team should use the research-backed stack shortlist and role plan created in the next sections of this programme to make those choices.

## Recommended Repository Structure

```text
ai-smart-glasses/
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── operations/
│   ├── legal/
│   └── research/
├── apps/
│   ├── player-client/
│   ├── operator-console/
│   └── api/
├── packages/
│   ├── shared-types/
│   ├── game-rules/
│   └── ui/
├── infra/
│   ├── docker/
│   └── compose/
├── hardware/
│   ├── bom/
│   └── integration-notes/
├── tests/
│   ├── e2e/
│   └── load/
└── .github/
    ├── ISSUE_TEMPLATE/
    └── workflows/
```

## Next Action

Create a 90-day MVP backlog under the above scope, select proven open-source components, and staff only the roles that directly unblock the first ten pilot sessions.

---

**This audit deliberately supersedes no legal or product-safety review. Qualified counsel and a venue safety professional should review the final operating model before any customer or public pilot.**
