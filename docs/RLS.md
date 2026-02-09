# RLS (Row Level Security) Summary

## Principle

RLS is the primary access control mechanism. The UI and server actions should assume RLS is enforced and should not rely on client-side checks for security.

## Roles

- **authenticated**: any logged-in user
- **admin**: detected via `profiles.role = 'admin'`
- **client** / **tasker**: detected via `profiles.role`

## Table access summary (high level)

- **profiles**
  - Users can read/update their own profile
  - Admin can read/update all profiles
- **categories/provinces/districts**
  - Authenticated can read
  - Admin can manage
- **jobs**
  - Authenticated can read open jobs
  - Client can create/read/update own jobs
  - Tasker can read assigned jobs and update assigned jobs (for progress/status)
  - Admin can read/update any job
- **bids**
  - Tasker can create/read/update own bids
  - Client can read bids on own jobs; can update bids on own jobs (accept/reject)
  - Admin can read all bids
- **payment_proofs**
  - Client can create/read own payment proofs
  - Admin can read/update all payment proofs
- **job_updates**
  - Author can create updates
  - Client can read updates on own jobs
  - Tasker can read updates on assigned jobs
  - Admin can read all updates
- **admin_actions / commission_settings**
  - Admin can manage
  - Authenticated can read commission settings

## Storage (receipts bucket)

- Bucket `receipts` is **private**
- Clients can upload to their own folder
- Authenticated users/admin can read via signed URLs (admin UI uses signed URLs)

## Notes / follow-ups

Supabase advisors currently flag:

- **Leaked Password Protection disabled** (Auth setting)
- Several **unindexed foreign keys** and **RLS initplan** recommendations

See `docs/OPERATIONS.md` for the operational checklist.

