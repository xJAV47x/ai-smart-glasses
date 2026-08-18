# Open-Source Component Research Notes

**Research date:** August 18, 2026

## Evaluated Repositories

| Project | What was verified | Prototype recommendation |
|:--|:--|:--|
| [Colyseus](https://github.com/colyseus/colyseus) | Node.js authoritative multiplayer framework with server-defined synchronized state, delta-compressed binary updates, room-based matchmaking, filtering, queuing, reconnection, and SDKs for major platforms. GitHub displayed approximately 7.2k stars, MIT license, and recent maintenance activity. | **Recommended MVP real-time session engine.** It directly supports a server-authoritative training-session model without requiring a custom networking protocol. |
| [Nakama](https://github.com/heroiclabs/nakama) | Apache-2 licensed game backend with multiplayer, matchmaking, leaderboards, chat, social features, WebSockets/rUDP, and an embedded operations console. It requires CockroachDB or another PostgreSQL wire-compatible database, and has higher operational scope than a minimal prototype. GitHub displayed approximately 13.2k stars and active releases. | **Recommended scale-up alternative, not MVP default.** Revisit when matchmaking, accounts, tournaments, social, and persistent live-service functions become a validated need. |
| [UWB-Indoor-Localization_Arduino](https://github.com/jremington/UWB-Indoor-Localization_Arduino) | GPL-3.0 reference implementation for ESP32/DW1000 tags and known anchors. It documents 2D/3D trilateration and careful per-anchor calibration, but supports only one tag in its stated library configuration and expects hard-coded configurations. | **Experimental reference only.** Do not embed or ship it in a proprietary product. Use it to understand calibration and test an inexpensive single-tag proof; use supported multi-tag commercial or separately designed hardware for a pilot. |

## Interim Conclusion

Use Colyseus as the real-time core, with a modular adapter for position input. Defer UWB and voice/video until the basic session loop and operator console work. Do not decide on MapLibre, PocketBase, or LiveKit until their repository maturity, licensing, and fit have been reviewed.

| [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) | GPU-accelerated open-source WebGL vector-map library for web and webview clients, licensed BSD-3-Clause. GitHub displayed approximately 11.4k stars, an active release stream, and current maintenance. | **Recommended MVP map layer.** Use a static venue floorplan or local coordinate grid first; overlay live players, objectives, zones, and safety boundaries. Do not use live public mapping data in the venue prototype. |
| [LiveKit](https://github.com/livekit/livekit) | Apache-2 licensed, actively maintained WebRTC SFU built in Go. It supports multi-user audio/video/data, client SDKs, JWT authentication, UDP/TCP/TURN networking, and self-hosting. GitHub displayed approximately 20.4k stars. | **Recommended voice/video option after MVP.** Its scope is stronger and operationally heavier than a first pilot needs. Add only after text/visual coordination has validated the session loop. |

## Updated Interim Conclusion

The recommended initial technical backbone is **Colyseus + TypeScript client + MapLibre GL JS**, operating with a local coordinate grid and a simple venue map. Voice, video, production-grade indoor positioning, and broad game-backend capabilities should remain modular follow-on integrations. This isolates the riskiest technical and operational elements while producing a credible visual prototype.

| [PocketBase](https://github.com/pocketbase/pocketbase) | MIT-licensed, self-hosted Go backend with embedded SQLite, built-in users/authentication, files, admin UI, REST-style API, and realtime subscriptions. GitHub displayed approximately 60.7k stars and active maintenance. It can be compiled into a single portable executable. | **Useful disposable-pilot option, not the recommended authoritative session engine.** Use for a very small internal proof when deployment speed is more important than data durability and complex relational reporting. Prefer PostgreSQL plus the chosen application backend for a customer pilot. |

## Recommended Stack Decisions

| Layer | Lean MVP choice | Reason | Upgrade path |
|:--|:--|:--|:--|
| Monorepo | pnpm workspaces + Turborepo or a simple pnpm workspace | Fast local development, shared types, minimal tooling. | Nx only when teams/repositories expand. |
| Client and operator console | React + TypeScript + Vite | Fast, familiar web delivery to phones, tablets, and venue PCs. | Native/AR client after UX and session rules validate. |
| Visual map | MapLibre GL JS | Highly maintained BSD-3 mapping layer; handles local floor-plan overlays and dynamic entities. | Native MapLibre if a mobile app becomes necessary. |
| Authoritative real-time sessions | Colyseus | Purpose-built room state, sync, matchmaking, reconnection; lighter than a full game-services platform. | Nakama if validated needs include social, tournaments, rich matchmaking, and multi-region operations. |
| Data and identity | PostgreSQL + application-managed auth for customer pilots | Auditable, relational, portable, suitable for consent and session records. | Add an identity provider if multi-tenant enterprise requirements emerge. |
| Internal throwaway demo | PocketBase | One-file, rapid, self-hosted proof with auth and an admin UI. | Replace before external paid pilots. |
| Voice/video | No voice in first proof; use text/visual cues | Reduces WebRTC, TURN, moderation, and safety operations risk. | LiveKit when moderated voice is validated as necessary. |
| Positioning | Deterministic test coordinates and an input adapter | Unblocks game-loop validation without premature hardware complexity. | Calibrated multi-tag UWB solution after venue layout proves its value. |
| Container deployment | Docker Compose | One venue server, one command path, straightforward local operations. | Kubernetes only after multi-venue deployment and SRE needs exist. |
| Observability | Structured logs plus basic metrics | Enough to diagnose pilot sessions. | OpenTelemetry and central logging when multiple venues are live. |

## License Warning

Every external dependency should be reviewed against the intended commercial model before inclusion. In particular, the evaluated ESP32/DW1000 UWB reference carries GPL-3.0 and should be treated as educational material, not copied into a proprietary production codebase.
