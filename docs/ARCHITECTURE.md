# Architecture (MVP)

## Overview

Wok Konek is a client-first two-sided marketplace:

- **Client** posts a job and chooses a Tasker
- **Tasker** bids and performs work
- **Admin** verifies payment receipts and manages categories/users

Core design goals:

- **Simplicity** (MVP workflows are explicit)
- **Security** (RLS is primary enforcement)
- **Auditability** (admin actions are logged)
- **Low-bandwidth** UX (light pages, minimal dependencies)

## Frontend (Next.js 16 App Router)

- Route groups under `src/app/`:
  - `(marketing)`: landing page
  - `(auth)`: sign-in/sign-up/choose-role/suspended
  - `(client)`, `(tasker)`, `(admin)`: role-specific dashboards and pages

### Auth + routing guards

- Middleware refreshes session and gates route prefixes:
  - `src/middleware.ts`
  - `src/lib/supabase/middleware.ts`
- Per-layout role checks:
  - `src/lib/auth/guards.ts` (`requireRole`)

## Backend pattern (Supabase-first)

### Data access

- Reads happen in Server Components via `createClient()` from:
  - `src/lib/supabase/server.ts`
- Writes happen in **server actions**:
  - `src/lib/actions/*.ts`

### Authorization

- **Supabase RLS** determines whether a query/mutation is allowed.
- Server actions still perform **business validation** (status checks, ownership).

## Storage (Receipts)

- Bucket: `receipts` (private)
- Receipt viewing: admin uses **signed URLs** (`createSignedUrl`)
- Upload limits: 5MB, JPG/PNG/WebP/PDF

## Key MVP invariants

- Users only interact with their own jobs/bids/receipts, except admins.
- Jobs progress via explicit statuses; skipping is blocked by server validation (and should be enforced further via RLS as the app evolves).

