# Documentation Index

This index separates the **current, evidence-gated indoor-training MVP** from earlier concept documents. Read the MVP documents first when deciding what to build, hire, or fund.

## Current MVP Blueprint

| Document | Purpose | Read when |
|:--|:--|:--|
| [Prototype Readiness Audit](PROTOTYPE_READINESS_AUDIT.md) | Identifies the difference between existing concept documents and a buildable prototype. Defines the smallest product boundary. | Starting the project or prioritizing work. |
| [90-Day MVP Execution Plan](90_DAY_MVP_EXECUTION_PLAN.md) | Defines the 12-week implementation path, backlog, budget scenarios, safety gates, and pilot metrics. | Planning delivery, budget, and pilot operations. |
| [Lean Team and Hiring Plan](LEAN_TEAM_AND_HIRING_PLAN.md) | Defines job titles, responsibilities, sequencing, scorecards, and ownership. | Recruiting, contracting, or assigning responsibilities. |
| [Open-Source Stack Shortlist](OPEN_SOURCE_STACK_SHORTLIST.md) | Compares validated open-source building blocks and recommends the lean stack. | Selecting technical dependencies or reviewing licenses. |

## Architecture and Product Concepts

| Document | Role in the project | Current status |
|:--|:--|:--|
| [Tactical Features Overview](TACTICAL_FEATURES_OVERVIEW.md) | Broad feature vision for a future platform. | Reference only; must not expand MVP scope. |
| [Training Arena Design](TRAINING_ARENA_DESIGN.md) | Concepts for a configurable physical venue. | Follow-on reference after pilots prove demand. |
| [MCP Server Specifications](MCP_SERVER_SPECIFICATIONS.md) | Possible AI-tooling and agent integration direction. | Deferred; MCP is not the real-time session engine. |
| [Legal Compliance Framework](LEGAL_COMPLIANCE_FRAMEWORK.md) | Original compliance analysis. | Must be reconciled with the MVP no-identification boundary by counsel. |

## Rules for Reading Legacy Documents

Earlier documents contain ambitious hardware, biometric, OSINT, and tactical concepts. They are not a build instruction for the MVP. For the first prototype, the following position governs if there is a conflict:

> Build only a supervised, consent-based, indoor recreational-training platform. Do not collect data about nonparticipants, conduct facial recognition, enrich people through public sources, or automate real-world tactical recommendations.

## Suggested Reading Order for New Collaborators

1. `README.md` at repository root.
2. `PROTOTYPE_READINESS_AUDIT.md`.
3. `90_DAY_MVP_EXECUTION_PLAN.md`.
4. `LEAN_TEAM_AND_HIRING_PLAN.md`.
5. `OPEN_SOURCE_STACK_SHORTLIST.md`.
6. The legacy architecture, business, and legal documents that relate to the collaborator's workstream.

## Maintenance Rule

Any new feature proposal must include its user problem, owner, estimate, privacy impact, safety impact, test plan, and the pilot evidence that justifies it. Store feature decisions as architecture decision records before implementation.
