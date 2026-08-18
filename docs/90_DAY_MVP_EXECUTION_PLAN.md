# 90-Day MVP Execution Plan, Budget, and Governance

**Product boundary:** Supervised, consent-based, indoor recreational-training and venue-operations prototype  
**Author:** Manus AI  
**Date:** August 18, 2026

## 1. What the First Prototype Must Prove

The prototype is not a finished smart-glasses product. It is a controlled, venue-based training platform that demonstrates a complete participant and operator loop. It should prove that a small team can join a session, see live shared information, complete objectives, record simulated events, and receive a clear debrief without unsafe data practices or fragile hardware dependencies.

The initial release is successful only if it delivers the following six outcomes.

| Outcome | MVP definition | Explicit exclusion |
|:--|:--|:--|
| Session creation | An operator creates a private, time-bounded venue session and assigns teams. | Public matchmaking or persistent social profiles. |
| Shared awareness | Players view team positions, objectives, zones, and safety boundaries on a local map. | Public map tracking or outdoor navigation. |
| Objective loop | Players can capture, defend, or complete trainer-configured objectives. | Autonomous mission planning. |
| Simulated events | The operator or a safe input device registers hit/penalty/assist events. | Weapon simulation, real-world targeting, or physical-impact scoring. |
| Safety control | Operator can pause/end session and remove a player immediately. | Unsupervised sessions. |
| Debrief | The platform generates a session summary from consented, pseudonymous data. | Biometric profiling or person identification. |

> **Non-negotiable product boundary:** No facial recognition, public-data enrichment, OSINT lookup, real-world threat scoring, autonomous tactical advice, or persistent location tracking belongs in the prototype. These features create legal, safety, and product-focus risk without proving the core venue value.

## 2. Baseline Architecture

The initial architecture must be deliberately small. A server-authoritative real-time layer manages session state, while browser-based player and operator clients keep device costs low. Colyseus fits the MVP because it offers server-defined synchronized state, rooms, matchmaking primitives, and reconnection support.[1] MapLibre GL JS supplies an open-source, GPU-accelerated map layer suitable for local venue floorplans and dynamic overlays.[2]

```text
Participant phone/tablet ──┐
                             ├── Venue Wi-Fi ── Player Client (React)
Operator laptop/tablet ─────┘                         │
                                                       │ WebSocket
                                               Real-Time Room Server
                                               (Colyseus + game rules)
                                                       │
                                       ┌───────────────┴──────────────┐
                                       │                              │
                              PostgreSQL / local persistent store   Event / audit log
                                       │                              │
                              Docker Compose on venue mini-PC       Session summary
```

The first map is a static, locally stored floorplan using an arbitrary coordinate system, such as meters from the southwest corner. There is no need for GPS, outdoor mapping, computer vision, UWB, cloud Kubernetes, WebRTC voice, or a custom MCP service to validate this loop.

## 3. Required Build Artifacts

| Artifact | Owner | Definition of done | Target week |
|:--|:--|:--|:--|
| Product requirements document | Founder/Product Owner | Contains user roles, core session loop, exclusions, acceptance tests, and pilot KPI targets. | 1 |
| Architecture decision records | Technical Lead | Decisions for client, state server, database, deployment, privacy, and hardware adapter are recorded. | 1-2 |
| Repository scaffold | Technical Lead | Monorepo, shared types, linting, test runner, local environment, contribution guide. | 2 |
| Player client | Full-Stack Engineer | Join room, see local map, team/status markers, objectives, pause state. | 4 |
| Operator console | Full-Stack Engineer + Designer | Create session, assign teams, control objectives/zones, pause/end session. | 4 |
| Authoritative game rules | Technical Lead | State validation, event schema, reconnect behavior, audit trail, rule tests. | 5 |
| Simulated-hit adapter | Hardware Integrator | API accepts trainer click and a defined safe-device input; no weapon functionality. | 6 |
| Venue deployment pack | Technical Lead | Docker Compose, sample environment file, backup/recovery instructions, start/stop checklist. | 7 |
| Safety and consent pack | Counsel + Operations Lead | Consent screen, session notice, age policy, incident template, data deletion request procedure. | 7 |
| Pilot test pack | Operations Lead | Scripted scenarios, participant survey, operator checklist, usability protocol, defect triage. | 8 |
| Pilot evidence report | Founder + Operations Lead | Results from ten supervised sessions, KPI dashboard, issues, go/no-go recommendation. | 12 |

## 4. 12-Week Delivery Schedule

### Weeks 1-2: Freeze Scope and Prove a Vertical Slice

The team finalizes the problem statement, selects one target user segment, writes the product requirements, and creates a minimal data model. The Technical Lead scaffolds the repository, local environment, and continuous integration. The first demo uses two browser clients with manually entered positions and one objective marker. The purpose is to validate the update loop, not graphics.

**Exit gate:** Two clients can join one private room, see each other on the same local map, and recover from a browser refresh without corrupting session state.

### Weeks 3-4: Build the Operator-Controlled Game Loop

The player client receives team markers, objective state, zone visibility, a clear session status, and a consented display name. The operator console creates sessions, assigns teams, triggers pause/end, and changes objective state. The designer tests the interface with at least five prospective users and removes features that cause confusion.

**Exit gate:** A nontechnical operator can set up and run a five-player session with a written checklist in under ten minutes.

### Weeks 5-6: Add Rules, Event Capture, and Reliability

The team implements authoritative session rules, audit events, reconnect handling, participant removal, and basic post-session summaries. A trainer button and a safe BLE/button input are both supported through the same event adapter. The hardware integrator conducts a bench test for future positioning or input devices, but UWB is not a blocking dependency.

**Exit gate:** The platform records all objectives, manual simulated-hit events, pause/end actions, and reconnections in a coherent session timeline.

### Weeks 7-8: Pilot Readiness and Safety Controls

The team packages the venue deployment using Docker Compose, documents start/stop procedures, adds backups, and confirms access controls. Counsel and the Operations Lead complete consent, safety, and data-retention documentation. The team runs internal dry runs that include a lost Wi-Fi connection, an operator pause, a participant exit, and a deletion request.

**Exit gate:** Two dry-run sessions complete without an unrecoverable defect, and every safety/consent control passes the operating checklist.

### Weeks 9-10: Supervised Pilot Sessions

Run five supervised sessions with four to eight consented participants each. Capture technical logs, participant survey results, operator observations, and safety incidents. Fix only high-severity defects and avoid feature expansion.

**Exit gate:** At least four of five sessions start and end cleanly, participants understand the map/objective system, and no unresolved safety/control issue remains.

### Weeks 11-12: Repeat, Measure, and Decide

Run five additional sessions after defect remediation. Compile the pilot report, calculate user and operator metrics, conduct a pricing interview with venue or training partners, and decide whether to proceed to a paid pilot, revise the core loop, or stop.

**Exit gate:** Ten sessions provide credible evidence on reliability, usefulness, safety, and commercial demand. Only then approve work on AR displays, UWB, voice, or AI-assisted scenario tools.

## 5. MVP Backlog by Epic

| Epic | Must-have stories | Later stories |
|:--|:--|:--|
| Identity and consent | Pseudonymous participant profile; terms acknowledgement; session-specific join code; deletion request. | Federation, enterprise SSO, social profiles. |
| Session management | Operator creates/starts/pauses/ends session; teams; role permissions. | Public matchmaking, tournaments. |
| Venue map | Static floorplan; local coordinates; team markers; objectives; restricted zones. | GPS, outdoor maps, 3D AR anchors, live public map layers. |
| Game rules | Objective state, scoring, simulated hit events, respawn/return state, audit timeline. | Advanced physics, AI opponents, weapon mechanics. |
| Operator tooling | Team setup, activity map, trainer controls, participant removal, exportable session summary. | Automated AI recommendations. |
| Hardware inputs | Operator click; safe BLE input adapter; test-data simulator. | UWB production hardware, camera input, glasses-specific integrations. |
| Reliability | Reconnect, graceful errors, test environment, event logs, backups. | Multi-region failover, Kubernetes. |
| Privacy and safety | Consent, retention, deletion, minimum data, venue safety checklist. | Biometric processing, OSINT data collection. |

## 6. Budget Scenarios

The figures below are **planning ceilings**, not supplier quotations. Obtain written vendor and contractor quotes before committing funds. The two scenarios show the difference between a founder-led technical build and a contracted build with a clear pilot deadline.

| Cost area | Lean founder-led proof | Contracted 90-day MVP | Notes |
|:--|--:|--:|:--|
| Technical Lead / senior engineering | $0-$12,000 | $30,000-$55,000 | Founder-led contribution materially changes this line. |
| Full-stack real-time engineering | $8,000-$25,000 | $30,000-$60,000 | Core build role; do not underfund quality here. |
| Product design and user research | $2,000-$6,000 | $6,000-$15,000 | Fractional project scope. |
| Hardware / positioning evaluation | $500-$3,000 | $3,000-$10,000 | Do not purchase multi-user UWB infrastructure before Gate 5. |
| Test devices and venue network | $1,000-$4,000 | $2,500-$8,000 | Existing phones/laptops reduce spend. |
| Legal, safety, insurance guidance | $3,000-$8,000 | $6,000-$15,000 | Jurisdiction and venue model drive variance. |
| Pilot venue and participant operations | $1,000-$5,000 | $3,000-$12,000 | Use a partner venue or controlled private space. |
| Cloud, software, domains, tooling | $300-$1,500 | $1,000-$3,000 | Keep pilot local-first and self-hosted. |
| Contingency | $2,000-$6,000 | $12,000-$25,000 | Reserve for unexpected equipment and defects. |
| **Total 90-day planning range** | **$17,800-$70,500** | **$93,500-$203,000** | Excludes founder salary and long-term venue lease. |

### Cost Controls

The team should use existing phones/tablets, a local venue network, and a mini-PC or laptop before purchasing AR glasses. It should use a local floorplan rather than commercial map APIs, browser clients rather than native applications, and manually controlled test coordinates rather than UWB. It should contract specialty work to fixed deliverables and defer cloud infrastructure until the product has a pilot customer.

## 7. Procurement Checklist

| Category | Buy or secure now | Defer until evidence exists |
|:--|:--|:--|
| Computing | One venue laptop/mini-PC, one operator device, four to eight test phones/tablets. | GPU server fleet, Kubernetes cluster. |
| Network | Dedicated Wi-Fi 6 access point/router, ethernet cables, UPS if venue power is unreliable. | Multi-AP enterprise mesh unless testing proves needed. |
| Physical venue | Safe private indoor test area, marked exits, basic first-aid access, visible boundaries. | Long-term lease, major build-out, theatrical effects. |
| Input devices | Manual operator console; one safe BLE button/vest proof. | Weapon-like devices, custom electronics manufacturing. |
| Positioning | Printed/local map with manual coordinates; optional simple positioning experiment. | Multi-user UWB array, custom SLAM, proprietary sensor fleet. |
| AR hardware | One display demonstrator only, if already accessible. | Bulk purchase or custom eyewear tooling. |

## 8. Safety, Privacy, and Governance Gates

### Gate 0 — Legal and Venue Basis

Before recruiting participants, obtain a pilot venue agreement, participant terms, explicit consent, age policy, privacy notice, data-retention schedule, and insurance/safety advice appropriate to the jurisdiction. The project must have a named incident owner and a simple contact path for participant deletion requests.

**Stop condition:** Any plan to identify nonparticipants, collect public profile data, conduct facial recognition, use live real-world location tracking, or run unsupervised sessions.

### Gate 1 — Controlled Technical Core

Before adding hardware, prove the browser-based session loop with manual coordinates and simulated events.

**Stop condition:** Server state is not authoritative, session events cannot be audited, or operators cannot immediately pause/end a room.

### Gate 2 — Operator and Participant Usability

Before conducting external pilots, test the system with internal volunteers. The user interface must be understandable after a short briefing and should be usable on a normal phone or tablet.

**Stop condition:** Users cannot understand team/objective status, the display distracts from physical safety, or visual cues create accessibility problems.

### Gate 3 — Safety and Data Operations

Before any paid/partner session, test consent, deletion, backups, incident handling, Wi-Fi loss, device failures, and emergency stop behavior.

**Stop condition:** A known safety, privacy, or incident process is incomplete or untested.

### Gate 4 — Pilot Evidence

Before adding AI, voice, UWB, AR glasses, or advanced analytics, complete ten supervised pilot sessions and collect objective evidence.

**Stop condition:** Fewer than 80% of sessions complete without major technical intervention, participant satisfaction is poor, or no partner expresses willingness to pay.

### Gate 5 — Expansion Decision

Only after the pilot should the team decide whether the next investment is indoor positioning, a glasses client, voice communication, advanced scenario creation, or multi-venue infrastructure. Every feature needs a written customer problem, expected measurable benefit, cost, privacy impact, and owner.

## 9. Pilot Metrics

| Dimension | KPI | Minimum evidence threshold |
|:--|:--|:--|
| Reliability | Session completion rate | 8 of 10 sessions complete without a critical failure. |
| Responsiveness | Operator action-to-client visibility | Observe and log under two seconds on venue Wi-Fi. |
| Usability | Participant task success | 80% join and identify the next objective without staff intervention after briefing. |
| Safety | Incident outcome | No serious incident; every pause and exit is logged and reviewed. |
| Privacy | Consent/deletion operation | 100% of sessions record consent; one deletion request is successfully tested end-to-end. |
| Commercial signal | Partner conversion | At least one venue/training partner requests a paid-pilot proposal or provides a letter of intent. |
| Focus | Scope adherence | No advanced person-identification, OSINT, or autonomous AI feature enters the pilot build. |

## 10. What Comes After the MVP

The next feature is selected from evidence, not novelty.

| Evidence from pilot | Sensible next investment | Not automatically justified |
|:--|:--|:--|
| Players benefit from better position accuracy | Calibrated multi-tag indoor positioning feasibility study. | Full UWB deployment across multiple sites. |
| Participants report need for hands-free glanceable information | One-glasses-client design sprint and usability test. | Custom smart-glasses manufacturing. |
| Team communication is a demonstrated blocker | Moderated voice pilot using LiveKit, which is an Apache-2.0 self-hostable WebRTC stack.[3] | Always-on recording or unmoderated public chat. |
| Venue operators demand richer administration | Role-based admin, reporting, and multi-venue tenancy. | Full game-services replacement without need. |
| Scenario authoring consumes staff time | Human-approved AI assistant for authoring templates. | Autonomous tactical decisions or real-world guidance. |

## 11. References

[1] [Colyseus, “Authoritative Multiplayer Framework for Node.js.”](https://github.com/colyseus/colyseus)

[2] [MapLibre GL JS, “Interactive vector tile maps in the browser.”](https://github.com/maplibre/maplibre-gl-js)

[3] [LiveKit, “End-to-end realtime stack for connecting humans and AI.”](https://github.com/livekit/livekit)

---

**Decision:** Fund and build the 90-day local, supervised prototype before pursuing advanced smart-glasses hardware, high-precision location systems, AI-agent control, or large commercial venue investment.
