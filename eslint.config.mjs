// ESLint 9 flat config (Next.js 16 compatible).
//
// We intentionally avoid FlatCompat here because it can trigger
// \"Converting circular structure to JSON\" errors with Next's legacy config.
import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextCoreWebVitals,
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "out/**",
    "build/**",
    ".vercel/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Too strict for common data-fetching patterns; we allow controlled state updates in effects.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
