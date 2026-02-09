# Security

## Reporting

If you find a security issue, do not open a public issue. Contact the maintainers privately.

## Key practices in this repo

- **Supabase RLS** enforces data access.
- **Private Storage** for receipts (`receipts` bucket); access via signed URLs.
- No secrets in git; `.env.local` is ignored.

## Recommended Supabase settings

- Disable email confirmation for MVP (or implement a confirmation flow)
- Enable “Leaked Password Protection”

