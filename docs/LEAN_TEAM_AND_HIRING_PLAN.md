# Lean Team and Hiring Plan

**Project:** AI Smart Glasses Indoor Training Platform  
**Planning horizon:** 90-day MVP and first ten supervised pilots  
**Author:** Manus AI  
**Date:** August 18, 2026

## 1. Staffing Principle

The prototype should not start by building a large AR, AI, or hardware organization. It needs a small cross-functional team that can demonstrate a **safe, supervised, consent-based indoor training session**. The early team must prove the product loop—participants join, see a shared map, complete objectives, record simulated hits, and receive an operator-managed session summary—before hiring for advanced AR, custom AI, computer vision, or multi-venue operations.

> **Recommended first-team shape:** two core technical builders, one founder/product owner, and four fractional specialists. This is sufficient for a credible 90-day MVP when scope is controlled.

## 2. Roles Required for the MVP

| Priority | Job title | Engagement | Primary outcome | Start window |
|:--|:--|:--|:--|:--|
| P0 | Founder & Product Owner | Full-time | Owns product decisions, customer discovery, pilot partnerships, and funding narrative. | Week 0 |
| P0 | Technical Lead / Founding Engineer | Full-time | Owns architecture, delivery, code quality, and technical trade-offs. | Week 0 |
| P0 | Full-Stack Real-Time Engineer | Full-time or senior contractor | Delivers player client, operator console, session state, maps, and deployments. | Week 0-2 |
| P1 | Product Designer / UX Researcher | Fractional | Designs safe, glanceable map/HUD flows; validates participant and operator usability. | Week 1-3 |
| P1 | Hardware & Indoor-Location Integration Engineer | Fractional contract | Tests device connectivity and UWB/BLE positioning options after the software loop works. | Week 4-8 |
| P1 | Privacy, Product-Safety & Commercial Counsel | Fractional counsel | Reviews consent, data retention, age gating, venue terms, insurance, and vendor agreements. | Week 0 onward |
| P1 | Test & Pilot Operations Lead | Fractional initially | Creates test scenarios, safety runbooks, operator checklists, and pilot evidence. | Week 6-10 |
| P2 | Game/Scenario Designer | Contract or shared with product designer | Creates balanced recreational objectives and debrief loops. | Week 8-12 |
| P2 | DevOps / Security Engineer | Fractional | Hardens deployment, monitoring, backups, access management, and incident response. | Week 8-12 |
| P2 | Partnerships & Venue Sales Lead | Founder-led then hire/contract | Signs pilot venues and converts results into commercial opportunities. | Week 8 onward |

## 3. Essential Job Cards

### 3.1 Founder & Product Owner

This role is accountable for choosing the initial customer segment, maintaining the MVP boundary, and securing the pilot venue. The Founder/Product Owner writes the product requirements, conducts customer interviews, and makes rapid feature-priority decisions. The person must be comfortable saying “not yet” to impressive but unvalidated features, especially person identification, external-data enrichment, autonomous tactical recommendations, and complex AR hardware integrations.

**First-90-day deliverables** are a signed pilot-venue letter of intent, a validated problem statement based on at least fifteen customer interviews, a weekly product decision log, a clear pilot price hypothesis, and documented MVP acceptance criteria.

### 3.2 Technical Lead / Founding Engineer

The Technical Lead is responsible for selecting and enforcing the initial architecture. The recommended MVP implementation is a TypeScript web client and operator console, Colyseus for authoritative multiplayer room state, MapLibre GL JS for venue overlays, PostgreSQL for durable records, and Docker Compose for a single-venue deployment. Colyseus provides server-defined state synchronization, room-based matchmaking, and reconnection support, which directly fits an operator-supervised session model.[1]

The Technical Lead should build the first vertical slice personally and establish code review, dependency review, testing, and release discipline. They should reject premature microservices, custom machine-learning pipelines, and complex cloud orchestration until pilot evidence requires them.

**First-90-day deliverables** are an architecture decision record set, a running local development environment, a deployable venue stack, event schemas, automated tests for core game rules, and a technical risk register.

### 3.3 Full-Stack Real-Time Engineer

This engineer delivers the product that participants and operators use. The role includes the player join flow, team lobby, shared map, objective interactions, trainer controls, simulated hit events, real-time updates, and session summary. The engineer should be strong in TypeScript, React, WebSockets, browser performance, state modeling, API design, and database migrations.

The role does **not** require a generalist AI background in the first phase. The priority is deterministic, auditable, responsive session state. Voice and video should wait until the core loop validates; LiveKit is a suitable follow-on option because it offers self-hosted, multi-user WebRTC media and data capabilities under Apache-2.0, but it adds operational surface that an initial pilot does not need.[2]

**First-90-day deliverables** are a demo-ready player client, an operator console, a real-time room service, an audit log, a local dockerized installation, and a pilot feedback capture flow.

### 3.4 Product Designer / UX Researcher

The designer creates a map and control interface that a participant can understand in seconds while moving. They design the onboarding sequence, consent screens, visual hierarchy, color accessibility, operator dashboard, participant deletion flow, and debrief report. They must test with actual players and venue staff rather than relying on game-industry assumptions.

**First-90-day deliverables** are a clickable prototype, a design system, accessibility checks, usability-test scripts, and documented findings from at least eight representative users.

### 3.5 Hardware & Indoor-Location Integration Engineer

This contract specialist verifies how the software receives location and simulated-hit events. They begin with a simple adapter and deterministic test coordinates, then evaluate BLE inputs and UWB only after the core game loop works. UWB can support high-accuracy indoor positioning but anchor layout, per-device calibration, multi-tag capacity, and product licensing require real venue testing; a low-cost reference implementation should be treated as educational rather than production-ready.[3]

**First-90-day deliverables** are a device integration interface, a bench-test report, a positioning test plan, a hardware bill of materials, and a go/no-go recommendation for the pilot's positioning method.

### 3.6 Privacy, Product-Safety & Commercial Counsel

This fractional counsel owns the non-negotiable controls: participant consent, age gating, session-data retention, customer terms, incident response, insurance recommendations, and vendor contracts. This role must explicitly confirm that the prototype excludes public-data facial recognition, background OSINT enrichment, or real-world target identification.

**First-90-day deliverables** are a venue consent notice, participant terms, data-retention schedule, privacy impact assessment, safety disclaimer, insurance/waiver checklist, and a legal review of hardware and open-source licenses.

### 3.7 Test & Pilot Operations Lead

The Test & Pilot Operations Lead turns software into a safe, repeatable venue experience. They operate sessions, train staff, run the safety briefing, collect bug reports, manage participant feedback, maintain the equipment checklist, and document incidents. They need venue, events, gaming, safety, or training operations experience—not necessarily software engineering expertise.

**First-90-day deliverables** are a pilot operating manual, facility walkthrough checklist, emergency-stop procedure, incident template, technician checklist, and post-session feedback process.

## 4. Roles to Defer

The following specialist positions add value but should not be first hires because they do not unblock the controlled MVP.

| Deferred role | Trigger to hire | Why it waits |
|:--|:--|:--|
| XR / Unity Engineer | After 2D client pilots validate the UX and a glasses display is required. | Web clients validate the core value faster and more cheaply. |
| ML / Computer-Vision Engineer | After a consented, validated use case exists for in-venue object classification. | No initial MVP need; avoid building surveillance-like features. |
| AI/Agent Engineer | After operator assistants or scenario authoring prove valuable. | MCP is not the real-time synchronization layer. |
| Dedicated SRE | After more than one venue or a customer uptime commitment exists. | Docker Compose and a disciplined technical lead suffice for a single pilot. |
| Enterprise Account Executive | After the prototype produces case-study evidence and repeatable pricing. | Founder-led sales provides faster early learning. |
| Manufacturing / Supply-Chain Lead | After dedicated AR hardware is selected and pilot demand is evidenced. | No manufacturing commitment should be made before software/venue validation. |

## 5. The MCP Decision

**Do not build a custom MCP server as the “brain” of the first prototype.** MCP is useful for connecting an AI agent to controlled tools and data sources. It is not a replacement for an authoritative game/session server, database, security controls, or real-time state synchronization.

The correct sequence is:

| Need | MVP solution | Later option |
|:--|:--|:--|
| Real-time team state | Colyseus room state and application events | Nakama when full live-service functions are needed. |
| Operator actions | Controlled web-console commands with audit logs | AI-assisted operator tooling, with approval required. |
| Scenario authoring | Structured templates in the operator console | MCP-exposed tools for a human-supervised AI scenario assistant. |
| Player instructions | Prewritten, operator-triggered messages | Opt-in AI-generated coaching with policy filters. |
| Voice chat | Defer | LiveKit once voice is validated and moderation procedures exist. |

Manus AI, or any other agent, should be restricted to **human-supervised back-office assistance** at this stage: scenario drafting, product research, support knowledge, or debrief summaries from de-identified data. It must not control sessions autonomously or make identity, safety, or targeting decisions.

## 6. Hiring Sequence and Budget Discipline

The first payroll commitment should be limited to the roles directly shipping the MVP. All other expertise should be acquired as fixed-scope advisory or contract work until pilot evidence establishes the need.

| Hiring step | Team composition | Indicative monthly burn excluding founder salary | Gate before next hire |
|:--|:--|:--|:--|
| Step 1: Discovery | Founder + fractional designer, counsel | $3,000-$8,000 | Problem interviews and venue partner identified. |
| Step 2: Build | Founder + Technical Lead + Full-Stack Engineer + fractional designer/counsel | $18,000-$35,000 | Functional local demo with operator controls. |
| Step 3: Pilot readiness | Add hardware integrator + test/ops lead | $25,000-$45,000 | Safety sign-off, consent flow, successful dry runs. |
| Step 4: Paid pilot | Retain dev team; add part-time DevOps/partnership support | $30,000-$55,000 | Ten supervised sessions, evidence of repeat use, customer willingness to pay. |

These are planning ranges, not salary quotations. They depend heavily on geography, employment model, and founder contribution.

## 7. Interview Scorecards

### Technical Lead / Founding Engineer

Evaluate candidates on a live architecture exercise: model a six-player venue session, design server-authoritative state, define reconnection behavior, explain audit logging, and demonstrate how they would deploy locally. Look for sound scope control, TypeScript quality, real-time systems experience, test discipline, and healthy skepticism of unnecessary complexity.

### Full-Stack Real-Time Engineer

Evaluate candidates through a small practical build: implement a room lobby, live map marker updates, and a trainer “pause session” control. Score reliability, data modeling, React/TypeScript fluency, WebSocket debugging, UX empathy, and clear documentation.

### Hardware & Indoor-Location Integrator

Ask candidates to create a measurement plan for a venue, identify calibration errors, specify an input adapter, and distinguish prototype-grade results from production claims. Score radio/embedded experience, calibration rigor, safety awareness, and vendor neutrality.

### Product Designer

Ask for a compact redesign of a crowded tactical-map screen for a moving participant. Score clarity, color/contrast accessibility, attention management, user-testing method, and ability to simplify complex features.

### Operations Lead

Use a tabletop scenario involving a participant injury, a device failure, and a venue Wi-Fi outage. Score calm decision-making, incident documentation, training discipline, and ability to protect participants without stopping all learning.

## 8. Accountability Matrix

| Workstream | Accountable | Responsible | Consulted | Informed |
|:--|:--|:--|:--|:--|
| MVP scope and customer choice | Founder/Product Owner | Founder | Designer, Technical Lead | All team members |
| Architecture and technical quality | Technical Lead | Technical Lead, Full-Stack Engineer | Hardware Integrator | Founder |
| Player/operator UX | Founder | Product Designer, Full-Stack Engineer | Operations Lead | Technical Lead |
| Real-time session implementation | Technical Lead | Full-Stack Engineer | Designer | Founder |
| Hardware and positioning evaluation | Technical Lead | Hardware Integrator | Operations Lead | Founder |
| Data privacy and terms | Founder | Legal Counsel | Technical Lead | Operations Lead |
| Pilot safety and operations | Founder | Operations Lead | Legal Counsel, Technical Lead | All team members |
| Pilot sales and partnerships | Founder | Founder | Operations Lead | Technical Lead |

## 9. Core References

[1] [Colyseus, “Authoritative Multiplayer Framework for Node.js.”](https://github.com/colyseus/colyseus)

[2] [LiveKit, “End-to-end realtime stack for connecting humans and AI.”](https://github.com/livekit/livekit)

[3] [J. Remington, “UWB Indoor Localization using Arduino and ESP32_UWB tags + anchors.”](https://github.com/jremington/UWB-Indoor-Localization_Arduino)

---

**Decision:** Recruit for an indoor-training software pilot first. Treat advanced AR glasses, multi-user UWB hardware, computer vision, AI agents, and franchise operations as evidence-gated capabilities—not initial staffing commitments.
