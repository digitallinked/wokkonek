# Wok Konek (MVP)

Service marketplace / job matching web app for Papua New Guinea (PNG).

- **Live**: `https://wokkonek.vercel.app`
- **Stack**: Next.js 16 (App Router) + Supabase (Auth, Postgres + RLS, Storage) + Vercel
- **Payments (Phase 1)**: manual BSP bank transfer + **receipt upload** + **admin verification**

## MVP flow (client-first, Airtasker-like)

- **Client**: Post job → Receive bids → Accept bid → Pay via BSP → Upload receipt → Admin verifies → Tasker works → Tasker marks complete → **Client confirms completion**
- **Tasker**: Browse open jobs → Bid → Work assigned jobs after payment verified → Post updates → Mark complete
- **Admin**: Verify receipts → Manage categories → Suspend users

## Status model

- **Job status**: `open → payment_pending → payment_submitted → (in_progress | payment_rejected) → tasker_completed → client_confirmed`
- **Bid status**: `submitted → accepted / rejected / withdrawn`
- **Payment proof status**: `submitted → verified / rejected`

## Repo structure

- **Routing**: `src/app/` using route groups:
  - `(marketing)`: landing page
  - `(auth)`: sign-in / sign-up / choose-role / suspended
  - `(client)`: client dashboard + jobs
  - `(tasker)`: tasker dashboard + browse jobs + assigned jobs
  - `(admin)`: admin dashboard + payments + categories + users
- **Server actions**: `src/lib/actions/*.ts`
- **Supabase helpers**: `src/lib/supabase/*`
- **Role guards**: `src/lib/auth/guards.ts`
- **Theme tokens**: `src/app/globals.css` (light-first, logo-inspired)

## Local development

1) Install deps

```bash
pnpm install
```

2) Create `.env.local` from `.env.example` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or publishable key)

3) Run dev server

```bash
pnpm run dev
```

## Supabase project (current)

- **Project**: `wokkonek app`
- **Ref**: `ssrhmthekedwzyteywkg`
- **URL**: `https://ssrhmthekedwzyteywkg.supabase.co`

### First admin bootstrap

1) Sign up normally
2) In Supabase SQL editor, run:

```sql
update public.profiles
set role = 'admin'
where id = '<user_uuid>';
```

## Deployment

See `docs/DEPLOYMENT.md`.

## Docs

- `docs/ARCHITECTURE.md`
- `docs/DB_SCHEMA.md`
- `docs/RLS.md`
- `docs/STATUS_FLOW.md`
- `docs/OPERATIONS.md`

