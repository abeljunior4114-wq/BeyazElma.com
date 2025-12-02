## BeyazElma — Live Sports Hub

BeyazElma is a modern, responsive sports streaming / live-scores starter built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **Socket.IO**, **Redis**, and **Postgres (stubbed)**.

### Running in development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Open `http://localhost:3000`

Environment variables (via `.env.local`):

- `DATABASE_URL` — Postgres connection string (optional, stubbed by default)
- `REDIS_URL` — Redis connection string (optional; in-memory fallback is used)
- `NEXT_PUBLIC_SITE_NAME=BeyazElma`
- `ADMIN_EMAIL=benbalbazar@proton.me`

### Features

- Live hub with prioritized leagues (Süper Lig, Premier League, LaLiga, Bundesliga, Serie A)
- Live / upcoming matches, search with instant suggestions, sport filters
- Per-match detail page with timeline, stats placeholders, streaming section and chat widget
- Sticky right-side **Sports News** drawer
- Per-match WebSocket chat rooms via Socket.IO, Redis pub/sub stubs, and in-memory history
- Admin panel stub (`/admin`) to inspect stream config, league order, moderation, and analytics notes
- Mock data under `data/mockMatches.json` and configuration under `config/streams.json`, `config/league_order.json`
- Sample unit tests for search and match card rendering

### Docker & Docker Compose

Build and run with Docker:

- `docker build -t beyazelma .`
- `docker run -p 3000:3000 beyazelma`

Or use Docker Compose (app + Postgres + Redis):

- `docker-compose up --build`
- App: `http://localhost:3000`
- Postgres: `localhost:5432` (db: `beyazelma`, user/password: `postgres`)
- Redis: `localhost:6379`

### Streaming & legal notice

Streams are configured via `config/streams.json`. For Turkish league matches (`competition.country === "TR"` or Turkish league IDs), the default stream placeholder is **"beIN Sports Turkey (requires license)"**.

**Legal reminder:** do **not** embed or redistribute any stream that you do not have explicit rights to. All streams and broadcasts are subject to rights and licensing. For Turkish matches, only embed official beIN Sports Turkey or other licensed rights-holder embeds / secure HLS links. BeyazElma is not responsible for third-party streams — obtain proper rights before publishing.

### Realtime & mock events

- WebSocket endpoint: `WS /api/socket` (Socket.IO)
- Events:
  - `match:update` (payload: match diff — sample in `scripts/mockEvents.ts`)
  - `chat:message` (payload: `{ match_id, user, message, ts }`)
- A small mock events script is located at `scripts/mockEvents.ts` that shows how to emit `match:update` diffs.

### Replacing mock data

- Replace or connect `data/mockMatches.json` to your real provider in `lib/matches.ts`.
- Ensure stream mappings are updated in `config/streams.json`.
- Adjust league priority in `config/league_order.json` without touching code.

### Deployment notes (DigitalOcean / Render / Vercel)

- **DigitalOcean / Render:** build a Docker image using the provided `Dockerfile`, provision managed Postgres and Redis, and set `DATABASE_URL`, `REDIS_URL`, `NEXT_PUBLIC_SITE_NAME`, and `ADMIN_EMAIL` in your service’s environment configuration. Expose port `3000`.
- **Vercel:** import the repo, Vercel will detect Next.js. Configure environment variables in the dashboard. For WebSockets and Redis, use a separate Socket.IO-compatible service or Edge-compatible provider.

### Footer text

The site footer uses the exact text required:

> © 2025 BeyazElma — Your live sports hub. Follow updates on Telegram: t.me/forbalbasaur. For business & support: benbalbazar@proton.me. All streams & broadcasts are subject to rights and licensing. BeyazElma is not responsible for third-party streams — obtain proper rights before publishing.





