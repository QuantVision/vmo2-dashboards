# Network Performance Copilot (Demo)

A desktop-first, demo-only prototype of a telecom analytics portal that blends KPI dashboards with an embedded analyst panel.

## What's Included
- Next.js 14 App Router + TypeScript + Tailwind
- Recharts-based KPI dashboards with phase markers and overlay highlights
- Ask the Network analyst panel with mocked responses
- Activity tracking, KPI explorer, UK map, and timeline routes
- Local mock data only (no backend, no auth)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo-Only Architecture
- All data lives in `src/data` and is generated in-memory or provided as local arrays.
- Interactions are front-end only (no persistence, no API calls).
- Maps use lightweight public tiles and demo site coordinates.

## Key Routes
- `/` Overview dashboard
- `/activities` Activity tracker with filters + timeline preview
- `/kpi-explorer` KPI deep dive
- `/map` UK activity map
- `/timelines` Gantt-style rollout timeline
- `/saved-views` Local saved view snapshots

## Notes
- This project is intentionally front-end only.
- No production backend, authentication, or deployment is included.
