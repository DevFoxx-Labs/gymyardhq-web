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
- Fonts, all self-hosted: Inter (body) and Archivo wide (`font-wide`, headings) via `next/font/local`
  from `assets/fonts/` — Google's latin files + a 1 KB ₹ file, Archivo pinned at wdth 125. Built by
  `design/tools/build_fonts.py`; never switch them back to `next/font/google` (that ships an 83 KB
  latin-ext file per family for the ₹ sign). New characters outside latin + ₹ → extend the script
  and the `unicode-range` in `app/layout.tsx` (`pnpm verify` fails otherwise). Hind (`font-deva`,
  Hindi pages) stays on `next/font/google`, `preload: false`.

## Performance (media-heavy site — global web-performance rule applies)
- Before/after every visual or asset change: `pnpm build` + Lighthouse mobile (median of ≥ 5 runs,
  interleaved with the previous build) **and** a full-page screenshot pixel diff at 390 and 1440 px
  with reduced motion — "faster" never ships with an unintended visual change.
- `next.config.ts` `images.deviceSizes` tops out at 1920 because no source is wider; keep every
  source ≤ 1920 px (`pnpm verify` checks) or add the width.
- Tried and rejected (measured 2026-11-22): `experimental.inlineCss` (CSS is duplicated in the RSC
  payload → HTML 425 → 626 KB, worse TBT/LCP). `content-visibility: auto` on sections helps first
  render a lot but clips overflowing mascots and shifts the scroll-progress runner — needs owner OK.
- Hero LCP image: one `fetchPriority="high"` image only; videos start after `load` (SceneVideo).
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
- **Motion (CSS only, no animation library):** classes in `app/globals.css` → `motion-rise*`
  (hero load-in), `reveal` / `parallax` / `punch-in` / `peek-up` / `pop-in` (scroll-driven via
  `animation-timeline: view()`), `motion-jump`, `frame-a/-b` (two-frame loops via
  `components/motion/frame-loop.tsx`), `ScrollRunner` (`scroll(root)`). Animate only `transform`
  and `opacity`; everything sits inside `prefers-reduced-motion: no-preference`; browsers without
  scroll timelines get the static end state. Never fade the LCP element's opacity.
- Parallax: hero depth layers (`depth-*`, `scroll(root)`) and the pinned `Showcase`
  (view timeline `--showcase`, sticky stage). New pinned sections must keep a static fallback.
- Mascot cutouts: `assets/cutouts/*.webp`, made with `design/tools/make_cutout.py` from flat
  `#FF00FF` sources in `design/raw-cutouts/` (git-ignored). Prompts: `design/ai-cutout-prompts.md`.
- Hero uses art direction (`getImageProps` + `<picture>`), eager + `fetchPriority="high"`;
  everything else is lazy.

## SEO
- Production builds require `SITE_URL` (fails closed in `config/site.ts`).
- Every page builds metadata with `pageMeta()` (`lib/seo.ts`): own canonical, og:url, title,
  description, hreflang incl. x-default. Never set `openGraph.url` in the layout.
- Structured data via `components/seo/json-ld.tsx` (hex-escaped JSON): home = Organization +
  WebSite + MobileApplication; inner pages = BreadcrumbList. No FAQPage (no Google benefit).
- Feature landing pages live in `content/features.ts` (one search intent each, facts must match
  the app). New public pages go into `app/sitemap.ts` and `llms.txt` automatically or by hand.
- Scene images that carry meaning get descriptive `alt`; purely decorative ones stay `alt=""`.

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
- **WhatsApp widget** (`components/whatsapp/`, copy `content/whatsapp.ts`, config `site.whatsapp`):
  first-party only. Never swap it for a third-party chat script/SDK (that is a tracker needing
  consent). It stores nothing and sends nothing until the visitor opens `wa.me`. Flag
  `WHATSAPP_WIDGET_LIVE` fails closed. Answers must match app facts; keep the quick replies in
  `docs/whatsapp-business-setup.md` in step. Check the on state with `EXPECT_WHATSAPP=1 pnpm verify`.

## Verify before "done"
```
pnpm lint && pnpm typecheck
SITE_URL=https://gymyardhq.example NEXT_DIST_DIR=.next-verify pnpm build   # never into .next while `pnpm dev` runs
SITE_URL=https://gymyardhq.example NEXT_DIST_DIR=.next-verify pnpm start -p 3417
BASE_URL=http://localhost:3417 pnpm verify
```
Record each task in `changes/CHANGELOG.md`; gaps in `docs/known-gaps.md`; owner steps in
`docs/owner-todo.md`.

## Reusable skills built from this site
`mascot-scroll-motion`, `apple-scroll-parallax` and `gymyard-landing-kit` (global skills) were
extracted from this codebase. When you change the design or animations here, update the
matching skill (`~/.claude/skills/<name>/templates` or `template/`) in the same change.
