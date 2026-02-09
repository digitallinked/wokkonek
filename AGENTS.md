# Agent Guidance (Wok Konek)

This repo is designed to be friendly to Cursor agents and future contributors. Follow these conventions to keep the codebase consistent and secure.

## Golden rules

- **Do not commit secrets**: never commit `.env.local` or any credentials. Use `.env.example`.
- **RLS is the source of truth**: enforce permissions in Supabase Row Level Security; UI checks are secondary.
- **Server actions for writes**: mutations live in `src/lib/actions/*` and run on the server.
- **Role-based routing**: protect `/client/*`, `/tasker/*`, `/admin/*` routes using guards and middleware.
- **Keep MVP simple**: prefer explicit status transitions and auditability over automation.

## Tech constraints

- **Next.js**: 16, App Router, TypeScript
- **UI**: Tailwind only (no component library dependency)
- **Supabase**: Auth + Postgres (RLS) + Storage
- **Deploy**: Vercel

## Where to add things

- **Pages / UI**: `src/app/**/page.tsx` and colocated `/_components/*`
- **Shared UI components**: `src/components/*`
- **Auth / guards**: `src/lib/auth/*`
- **Supabase clients**: `src/lib/supabase/*`
- **Server actions**: `src/lib/actions/*`
- **Docs**: `docs/*`
- **Cursor rules**: `.cursor/rules/*.mdc`

## Common workflows

### Add a new feature

- Add any DB changes first (new table/column/status) and update RLS.
- Add server actions next.
- Add UI pages last.

### Manual payments (Phase 1)

- Receipts are stored in **private** bucket `receipts`.
- Admin views receipts via **signed URLs** only.

## Testing and quality

- Build: `npm run build`
- Lint: `npm run lint`

## Security checklist (before shipping changes)

- Confirm **no secrets** in git diff.
- Confirm routes requiring auth are protected (middleware + `requireRole`).
- Confirm Storage stays private; use signed URLs to view receipts.
- Confirm job status transitions cannot be skipped (server action + RLS).

