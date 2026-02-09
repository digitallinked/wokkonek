# Contributing

## Local setup

- Install: `npm install`
- Env: copy `.env.example` → `.env.local` and fill Supabase values
- Run: `npm run dev`

## Code conventions

- **TypeScript** strict mode (no `any` unless unavoidable)
- **Server actions** for all mutations: `src/lib/actions/*`
- **Tailwind only** for styling
- Keep UI components small; colocate route components under `/_components/`

## Database changes

This app relies on Supabase Postgres + RLS.

- Prefer migrations (schema + policy changes)
- Keep RLS policies simple and explicit
- Update docs when you change tables/statuses:
  - `docs/DB_SCHEMA.md`
  - `docs/RLS.md`
  - `docs/STATUS_FLOW.md`

## Commit hygiene

- Do not commit secrets or `.env.local`
- Keep commits focused and descriptive

