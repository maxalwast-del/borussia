import next from "eslint-config-next";

/**
 * Flat Config fuer ESLint 9.
 *
 * `next lint` wurde in Next.js 16 entfernt; ESLint wird direkt aufgerufen
 * (`npm run lint`). `eslint-config-next` exportiert bereits ein fertiges
 * Flat-Config-Array (next, next/typescript und die TypeScript-Anbindung),
 * das hier nur um die Ignore-Liste ergaenzt wird.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      // Agent-Skills: Fremdcode inkl. gebundelter Vendor-Bibliotheken,
      // liegt nicht im Repository (siehe .gitignore).
      ".agents/**",
      ".claude/**",
    ],
  },
  ...next,
];

export default config;
