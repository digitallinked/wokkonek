# Operations checklist (MVP)

## Supabase Auth settings (MVP intent)

For Phase 1 we **skip email verification**.

In Supabase Dashboard:

- **Auth → Providers → Email**: disable “Confirm email”

If you keep confirmation enabled, sign-in may fail with “Email not confirmed” (seen in logs).

## Security settings to enable

Supabase advisor currently warns:

- **Leaked Password Protection Disabled**

Enable it in Supabase Auth settings to block compromised passwords (HaveIBeenPwned check).

## Admin bootstrap

Promote a user to admin:

```sql
update public.profiles
set role = 'admin'
where id = '<user_uuid>';
```

## Receipt verification ops

- Clients upload receipts to Storage bucket `receipts` (private).
- Admin verifies under `/admin/payments`.
- Admin views receipts using signed URLs (1-hour TTL).

## Known advisor follow-ups (performance)

Supabase performance advisors currently flag:

- Several **unindexed foreign keys** (suggest adding covering indexes)
- **RLS initplan** suggestions: wrap `auth.uid()` calls as `(select auth.uid())` in policies
- “Multiple permissive policies” warnings (trade-off: clarity vs perf)

These are safe to defer for early MVP traffic, but should be addressed before scale.

