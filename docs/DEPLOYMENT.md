# Deployment (Vercel)

## Production

- App: `https://wokkonek.vercel.app`
- Hosted on Vercel (Next.js App Router)

## Required environment variables

Set these in Vercel (Production environment):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or publishable key `sb_publishable_...`)

Keep `.env.local` out of git. Use `.env.example` for onboarding.

## Deploy via CLI

```bash
npx vercel deploy --prod --yes
```

## Node version

`package.json` sets:

- `engines.node`: `>=18.18.0`

Vercel should be configured to use a compatible Node runtime.

## Notes

Next.js currently prints a deprecation warning about the `middleware` convention and refers to “proxy”.
This repo still uses `src/middleware.ts` and `src/lib/supabase/middleware.ts` for session refresh + route gating.

