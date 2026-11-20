# Change log

## 2026-11-20 — Blend AI-generated mascot scenes into every section

**What**
- Imported the owner's 20+ generated scenes (`../GymYardHQ/assets/images/*.png`) as WebP into
  `assets/scenes/` (20 files, ~2.9 MB of sources; `next/image` serves resized AVIF/WebP per
  viewport, so pages download only what fits the screen).
- New blending system — artwork never appears as a box:
  - `scene-fade-l/-r/-y/-b` and `scene-vignette` mask utilities (`app/globals.css`) dissolve
    image edges into the page background.
  - `BlendedScene` — full-bleed section, art on one side fading into the copy (desktop) or
    stacked above the copy with a fade (phones); `layout="full"` adds a text-side gradient;
    `tone="lime"` blends into the exact lime of the CTA artwork.
  - `SceneTile` — radial dissolve for feature and step scenes, copy sitting in the faded area.
- Home page rebuilt around the scenes: art-directed hero (wide scene on desktop, tall scene on
  phones, phone mockup floating between copy and mascot on ≥1280 px), four full-bleed feature
  chapters (Members, Fees & UPI, Reminders, Reports), dissolving tiles (Receipts, Trainers,
  Security, English & हिन्दी), How-it-works steps, Privacy, FAQ and lime Download section.
- Legal pages, Contact and 404 get blended scene headers.
- OG image and Play feature graphic now use the owner's generated promo art
  (`app/opengraph-image.jpg`, `design/play-feature-graphic-1024x500.png`); removed the
  `next/og` generator (`lib/promo-art.tsx`, `/brand/feature-graphic`, `assets/og/`) and the old
  cut-out mascot WebPs.

**Verification**
- `pnpm lint` 0 problems · `pnpm typecheck` 0 errors · `pnpm build` success (all static) ·
  `pnpm verify` all checks passed (og:image check now reads the page's meta tag).
- Reviewed full pages at 1440 px and 390 px (DevTools emulation) and 320 px earlier; no
  horizontal scroll. Not measured: Lighthouse LCP/CLS numbers (see known gaps #8).

## 2026-11-20 — AI graphics prompt pack

- Added `design/ai-graphics-prompts.md`: 20 copy-paste prompts for generating section
  backgrounds and promo art with the existing lion mascot and logo as fixed references
  (hero ×2, features ×8, how-it-works ×3, privacy, FAQ, download CTA, legal banner, support,
  OG image, Play feature graphic). Each prompt sets aspect ratio, where text space must stay
  empty, brand colours, and "no text" rules. Docs only — no code changed.

## 2026-11-20 — Initial website: app promotion + Play Store legal pages

**What**
- Landing page promoting the GymYardHQ Android app: hero with a pure-CSS phone mockup of the
  app dashboard (demo data), lion-mascot artwork, lime marquee, highlights, feature bento,
  "How it works", privacy section, FAQ (`<details>`, no JS) and download CTA.
- Legal notices as one versioned source (`content/legal/*.ts`, `version` 2026-11-20):
  Privacy Policy (EN + HI), Terms of Service (EN), Delete Your Data (EN + HI), Cookie Policy (EN).
  Pages: `/legal`, `/legal/[slug]`, `/legal/[slug]/hi`. JSON for the app: `/api/legal`,
  `/api/legal/[slug]`.
- `/contact` — support + DPDP Grievance Officer card with response times and Data Protection
  Board escalation. Email only; no form, so the site collects no personal data.
- Play Console short URLs: `/privacy`, `/terms`, `/delete-account`, `/support` (308 redirects).
- Promo images generated with `next/og`: `/opengraph-image` (1200×630) and
  `/brand/feature-graphic` (1024×500 Play feature graphic). Exports in `design/`.
- Security headers (CSP, HSTS, nosniff, frame DENY, Referrer/Permissions-Policy, COOP),
  `poweredByHeader: false`. Sitemap + robots.
- Design tokens mirror the Flutter `AppTheme`. Hugeicons free only. Self-hosted fonts.
- `scripts/verify.mjs` (`pnpm verify`) + `pnpm typecheck`.
- Added `@hugeicons/react` + `@hugeicons/core-free-icons` (required by the global icon rule;
  tree-shaken named imports).

**Threat model (low risk: static, no accounts, no forms, no storage)**
- Assets: brand integrity, accuracy of legal claims, visitors' privacy.
- Abuse cases: clickjacking → `frame-ancestors 'none'` + `X-Frame-Options` (prevent);
  injected third-party script/tracker → CSP `'self'` only + verify script fails on third-party
  resources (prevent + enforce); XSS via legal text → texts rendered as React text, never
  `dangerouslySetInnerHTML` (prevent); secrets in bundle → only server env, none `NEXT_PUBLIC_`
  (prevent); misleading legal facts → placeholders instead of invented values (prevent).

**Facts checked against the Flutter app** (`../GymYardHQ`): offline SQLite storage, MPIN
salted SHA-256 in secure storage, AES-256-GCM + PBKDF2 (100k) backups, optional MongoDB mode with
URI in secure storage, permissions in `AndroidManifest.xml`, Settings → Reset Application Data,
member delete/archive flow, EN/HI languages, no ads/analytics SDKs.

**Verification**
- `pnpm lint` → 0 problems · `pnpm typecheck` → 0 errors · `pnpm build` → success, all routes
  static/SSG · `pnpm verify` against `next start` → all checks passed · `pnpm audit --prod` →
  no known vulnerabilities.
- Rendered and reviewed at 320 px, 390 px (DevTools mobile emulation, no horizontal scroll) and
  1440 px. Site is dark-only by design.
- Not verified: Lighthouse/Core Web Vitals numbers (Lighthouse CI not set up yet — see gaps),
  real-device testing, screen-reader pass.

**Needs a lawyer's review** — all legal texts are drafts, not legal advice.
