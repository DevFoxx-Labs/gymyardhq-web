@AGENTS.md

# GymYardHQ Web — project rules

Marketing + legal website for the **GymYardHQ** Flutter app (`../GymYardHQ`, package
`com.devfoxxlabs.gymyardhq`). It promotes the app and hosts every public URL Google Play needs
(privacy policy, terms, data deletion, support/grievance).

The owner's global rules apply in full (DPDP compliance, Hugeicons-only icons, security by design,
database safety, engineering workflow, web performance). Project-specific points:

## Stack
- Next.js 16 (App Router, `cacheComponents` + `partialPrefetching`), React 19, Tailwind CSS 4, pnpm.
- Read `node_modules/next/dist/docs/` before using a Next API — this version differs from older docs.
- Every page is static (`ensureStatic = "navigation"`). Keep it that way unless there is a reason.

## Design system
- Tokens in `app/globals.css` mirror the app's `AppTheme`: ink `#0b0c10`, surface `#13151b`,
  card `#1a1d26`, line `#1e222d`, accent lime `#b5f63d`, muted `#94a3b8`. Dark only.
- Fonts via `next/font` (self-hosted at build): Inter (body), Archivo wide (`font-wide`, headings),
  Hind (`font-deva`, Hindi pages).
- **Icons: Hugeicons free only** — `@hugeicons/core-free-icons` through `components/icon.tsx`.
  No other icon library, no ad-hoc SVG icons. Decorative icons are `aria-hidden`; icon-only
  controls need an `aria-label`.
- Section artwork lives in `assets/scenes/*.webp` (static imports → automatic size + blur
  placeholder). Sources are the AI-generated scenes in the app repo `../GymYardHQ/assets/images/`
  (prompts: `design/ai-graphics-prompts.md`).
- **Images never sit in boxes.** Use `components/scene/blended-scene.tsx` (art on one side,
  dissolving into the page via `scene-fade-*` masks; stacked with a fade on phones) or
  `components/scene/scene-tile.tsx` (radial `scene-vignette` dissolve). No borders or rounded
  frames around artwork. Sections that sit on lime use `tone="lime"` (`--color-lime-scene`).
- Hero uses art direction (`getImageProps` + `<picture>`), eager + `fetchPriority="high"`;
  everything else is lazy.

## Legal content — one source
- All notices live in `content/legal/*.ts` with `version` + `lastUpdated`. Pages (`/legal/[slug]`,
  `/legal/[slug]/hi`) and the JSON API (`/api/legal`, `/api/legal/[slug]`) both read them.
- Business facts (company name, address, emails, Grievance Officer, jurisdiction, providers) come
  only from env via `config/site.ts`. Never hard-code or invent them; unset values render as
  highlighted `[… — to be confirmed]` placeholders.
- When the app gains a new data type, permission, SDK or processor, update the Privacy Policy
  (both languages), bump its `version`/`lastUpdated`, and log it in `changes/CHANGELOG.md`.
- The site sets **no cookies and loads no third-party resources**. Adding analytics or any tracker
  requires a consent banner (Reject = Accept prominence), a Cookie Policy entry per key and a
  "Cookie preferences" footer link **before** it ships. `scripts/verify.mjs` fails on third-party
  scripts/iframes.

## Verify before "done"
```
pnpm lint && pnpm typecheck && pnpm build
pnpm start -p 3417            # separate terminal
BASE_URL=http://localhost:3417 pnpm verify
```
Record each task in `changes/CHANGELOG.md`; gaps in `docs/known-gaps.md`; owner steps in
`docs/owner-todo.md`.
