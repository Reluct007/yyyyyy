# Repository Guidelines

## Project Structure

- `app/`: Next.js App Router pages and layouts (including `app/(site)/` and `app/[locale]/` for i18n routes).
- `components/`: Reusable React components.
  - `components/ui/`: Low-level UI primitives (Radix + Tailwind).
  - `components/features/`: Page/feature sections (kebab-case files, e.g. `contact-form.js`).
- `data/`: Content/config sources (SEO, navigation, products). Treat as the “CMS”.
- `locales/`: Translation dictionaries used by locale routes.
- `public/`: Static assets.
- `scripts/`: Build utilities (e.g. `scripts/generate-sitemap.mjs` runs before `pnpm build`).
- `workers/`: Cloudflare Workers API (`workers/src/`), deployed separately.
- `pages/`: Legacy fallbacks (`pages/404.js`, `pages/_error.js`) only.
- Build outputs: `.next/` and `out/` (do not commit).

## Build, Test, and Development Commands

Root (frontend):
- `pnpm dev`: Dev server with Turbopack.
- `pnpm dev:turbo`: Alias of `pnpm dev`.
- `pnpm lint`: ESLint via Next.js (`next/core-web-vitals`).
- `pnpm build`: Static export build (`next.config.mjs` uses `output: "export"`); regenerates sitemap via `prebuild`.
- `pnpm start`: Run production server (mostly for local verification; deploy uses `out/`).

Workers (API):
- `pnpm -C workers dev`: Local Worker on `http://localhost:8787`.
- `pnpm -C workers deploy`: Deploy with existing vars/secrets.
- `pnpm -C workers tail`: Stream logs.

## Coding Style & Naming

- JavaScript/JSX, 2-space indentation, semicolons; prefer existing patterns in touched files.
- File names are kebab-case; React components are PascalCase exports.
- Avoid `console.log`; ESLint allows `console.warn/error` (Workers/scripts are exempt).

## Testing Guidelines

- No dedicated test suite is configured. Changes must at least pass `pnpm lint` and `pnpm build` (also required by CI in `.github/workflows/ci.yml`).

## Commit & Pull Request Guidelines

- Commit history is mixed (short Chinese summaries and `Update <file>`). Keep messages short, descriptive, and scoped.
- PRs should include: problem/solution summary, verification commands run (at minimum `pnpm lint` + `pnpm build`), and screenshots for UI changes.
  - If touching `data/` or `locales/`, mention affected pages/routes (e.g. `app/[locale]/collection/[slug]/`).

## Security & Configuration

- Frontend env vars should be documented via `.env.example`; do not commit secrets.
- Workers secrets are managed with Wrangler (`wrangler secret put ...`); see `workers/README.md` and `DEPLOY.md`.
