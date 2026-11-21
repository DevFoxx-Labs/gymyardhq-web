# Change log

## 2026-11-22 — Hero headline animates like the finale lines

- Eyebrow pill + "Run your gym" sweep in from the left and "like a pro." from the right, with
  blur → sharp and a slight scale (same curve as `fn-line1/2`, 1.1 s, staggered 0/120/300 ms);
  paragraph, buttons, badges and phone follow at 520–800 ms.
- On scroll-out the lines split apart again (left line ← , right line →, blur), scroll-driven
  over the first 70vh, on top of the existing depth-copy rise/fade. Outer span = exit, inner
  span = entrance, so the two transforms never clash.
- Reduced motion / no scroll-timeline support: static text as before. No horizontal overflow at
  1440 px or 390 px. Verified: lint, typecheck, build, `pnpm verify`; stepped headless-Chrome
  recordings of entrance and exit at 1440×900 and 390×844.

## 2026-11-22 — Hero: lion scene plays as a video (desktop)

- `hero.tsx`: the desktop hero art becomes `public/videos/hero-lion-v1.{webm,mp4}` (1.3 / 1.4 MB,
  1280×720, no audio; 1 s crossfade closes the loop, seam PSNR 19.7 → 31 dB; colours already
  matched the still). Mobile keeps the image (no 9:16 video yet) and downloads no video.
- `SceneVideo` now wraps any still as `children` (hero keeps its `<picture>` art direction), takes
  `media` (play only when it matches) and waits for the window `load` event (+ `startDelayMs`,
  1.5 s on the hero so the still's Ken Burns entrance finishes first) — the video never competes
  with the LCP image.
- Verified: lint, typecheck, build, `pnpm verify` passed; headless Chrome — desktop 1440×900: LCP
  is still the hero `<img>`, hero video plays (opacity 1), the download video is not requested
  until scrolled near; 390×844 mobile: 0 video requests across the whole page.
- Backup branch `backup/master-2026-11-22` created from master (1e065aa) before these changes.

## 2026-11-22 — Download section: lion scene plays as a video

- `components/motion/scene-video.tsx` (client): renders the still scene image first, then swaps
  in a muted looping video once the scene is displayed and within 200 px of the viewport; fades in
  on the first played frame, pauses off-screen. No video with reduced motion, Data Saver, or when
  hidden (mobile hides this scene → phones download nothing).
- `download-finale.tsx`: right-hand lion scene uses it; the CSS sway (`dl-sway`) is removed since
  the video now carries the motion. Slide-in, text sweeps, high-five, sparks and CTA unchanged.
- `public/videos/download-lion-v1.{webm,mp4}` (1.1 MB / 1.4 MB, 1280×720, 24 fps, no audio) made
  from `design/videos/footer-video.mp4`: 1 s crossfade closes the loop (seam PSNR 20 → 31 dB),
  colour shifted so the background matches the page lime (#b4fa38).
- `next.config.ts`: `/videos/*` cached 1 year immutable (file names are versioned).
  CSP unchanged (`default-src 'self'` covers same-origin media).
- `.gitignore`: `/design/videos/` (source exports, 7 MB each).
- Verified: lint, typecheck, production build, `pnpm verify` (all passed), video headers
  (`video/mp4`, immutable, nosniff), headless Chrome 1440×900: WebM plays, opacity 1, rest of
  section unchanged.

## 2026-11-22 — Google Flow campaign video prompts

- `design/flow-campaign-videos.md`: 5 × 30 s vertical ad scripts (owner problem → lion mascot
  solution → CTA), each split into 3 continuous clips with Veo/Flow prompts, a fixed character
  bible (owner + lion look, voices), start-frame image prompts, hooks with A/B variants, on-screen
  text, edit/end-card guide, captions and a pre-posting checklist. Claims checked against
  `content/features.ts` (reminders prepare messages, they don't send them automatically). Docs only,
  so no code checks were run.
- `design/flow-prompts-copy.md`: the same 20 prompts (5 start frames + 15 clips) fully expanded
  with the character bible, one copyable block each. Generated from `flow-campaign-videos.md`.
- Added lion hard rules (no tail, five fingers, stable face/mane/"G" emblem, no morphing) and
  anti-glitch rules to every prompt. Prompts in `flow-campaign-videos.md` are now fully expanded
  too, with a full start-frame prompt in each campaign. Added tail and glitch rows to troubleshooting.
- `design/flow-website-videos.md`: copy-paste Flow prompts for 15 s silent seamless-loop videos —
  hero desktop (16:9), hero mobile (9:16) and the download section (16:9, desktop only). Two parts
  each (Frames to Video; Part B ends on the original scene image to close the loop), text-safe
  empty zones, lion hard rules, export and web-performance plan (poster stays LCP).
  `/design/raw-videos/` added to `.gitignore`.

## 2026-11-21 — Fix dev "URL data during prerendering" insight on slug routes

- `/legal/[slug]`, `/legal/[slug]/hi`, `/features/[slug]` read `params` for the whole page, which
  Next 16 (cacheComponents + partialPrefetching) flags in dev. Added `export const instant = false`
  (the documented "allow blocking route" fix) instead of a Suspense split, so unknown slugs keep a
  real 404 (no soft-404) and every known slug stays fully prerendered (○ in build output).
- Verified: build, `pnpm verify` (incl. 404 checks), `/features/nope` → 404. Kit template synced.

## 2026-11-21 — SEO fixes

- **SITE_URL fails closed**: production build throws without it (was silently `localhost:3000`
  in canonicals, og:url, sitemap, robots).
- `lib/seo.ts` `pageMeta()` on every page: own canonical + og:url (layout no longer forces
  `og:url: "/"`), og/twitter title + description, hreflang with `x-default`; Hindi pages get
  `og:locale hi_IN`.
- JSON-LD (`components/seo/json-ld.tsx`, `<>&` hex-escaped): Organization + WebSite +
  MobileApplication (free, Android, BusinessApplication, feature list) on home; BreadcrumbList
  on legal, contact and feature pages.
- Home title "GymYardHQ: Gym Management App for Gym Owners in India" (53) and description (152
  chars); keyword eyebrows ("Gym fee reminders", "Gym fees & UPI billing", …); descriptive alt
  on 15 scene images; "More about …" internal links.
- 4 feature landing pages `/features/{gym-fee-reminders, upi-gym-billing, gym-receipt-app,
  gym-member-management}` (`content/features.ts`, facts from the app), linked from home and a new
  footer "Features" column; LCP scene loads eagerly (`BlendedScene eager`).
- `sitemap.xml` with lastmod on every URL, hreflang alternates for legal EN/HI, feature pages;
  `manifest.webmanifest`; `/llms.txt`.
- `scripts/verify.mjs`: SEO checks (og:url = canonical, one h1, JSON-LD on every page, Hindi
  x-default + og:locale, app schema, llms.txt, manifest, optional `EXPECT_SITE_URL`).
- Verified: build without SITE_URL fails; with `SITE_URL=https://gymyardhq.example` lint,
  typecheck, build and `pnpm verify` (all SEO checks) pass; feature page screenshots at
  1440×900 and 390×844.

## 2026-11-21 — Download section as a pinned lime finale

- New `components/home/download-finale.tsx` replaces the lime BlendedScene: 260vh section,
  sticky lime stage (view timeline `--dl`). "STRONGER" (behind the art) sweeps in from the
  left and "EVERY DAY." (in front) from the right with de-blur — same behaviour as the
  "That's it. You're ready." finale. Owner × mascot high-five cutout slides in on the left with
  a sparkle burst at the hands; the flexing-lion scene slides in on the right (left edge
  dissolved) and sways gently left–right (`dl-sway`, 2.6 s); CTA + Google Play in the middle.
  Phones: flex scene hidden, high-five centred under the CTA.
- Static composition with reduced motion / without scroll timelines.
- Skills synced: `apple-scroll-parallax` (pattern 4 + component + css), `mascot-scroll-motion`
  (css), `gymyard-landing-kit` (template, manifest).
- Verified on a separate build at 1440×900 and 390×844; sway transform changes over time; no
  horizontal scroll; lint, typecheck, `pnpm verify` pass.

## 2026-11-21 — Design + animations packaged as global skills

- Three global skills in `~/.claude/skills/`:
  - `mascot-scroll-motion` — CSS motion kit (load-in, reveal, drift, punch-in, peek-up, pop-in,
    jump + firecracker sparkles, two-frame loops, scroll runner, scene masks) + components,
    `make_cutout.py`, cutout prompts.
  - `apple-scroll-parallax` — hero depth layers, pinned showcase, pinned finale (CSS +
    components).
  - `gymyard-landing-kit` — the whole site as a template (`template/`, 94 files), `scaffold.py`,
    graphics manifest and brand-swap guide; only graphics, colour tokens and product text change.
- To make recolouring a token-only change, replaced the remaining hard-coded accent/ink colours
  with tokens (`color-mix(... var(--color-lime) ...)` in globals.css, hero gradient, phone
  shadow, sparkle lime). Visual output unchanged.
- `typecheck` script now runs `next typegen` first, so a fresh clone type-checks before any build.
- Verified the kit: scaffolded a copy, `pnpm install`, lint, typecheck, build, `pnpm verify`
  passed; 14 full-page viewport screenshots of the copy vs this site differ by 0.000% pixels;
  changing only `--color-lime` recolours the whole site.

## 2026-11-21 — Finale: full-height "That's it. You're ready." parallax section

- New `components/home/finale.tsx` right after How it works (replaces the small finish-line
  block): 280vh section with a sticky full-screen stage (view timeline `--finale`).
  - Celebrate mascot rises to 84dvh (56dvh on phones), keeps the jump loop and the firecracker
    burst (sparkles now accept `scale`/`top`, scaled 2.6× here).
  - "THAT'S IT." (behind the mascot) and "YOU'RE READY." (in front, lime) set full width
    (11.5vw / 9.4vw, Archivo wide, uppercase) sweep in from opposite sides with a de-blur.
  - Official GymYardHQ plate logo (`assets/cutouts/logo-official.webp`, black background keyed
    to alpha) slides/rotates in on the left; "Stronger every day. Together." + Google Play CTA
    on the right (md+). Phones: logo sits between the headline and the mascot.
  - Glow + plate rings behind. Static full-screen composition when motion is reduced or scroll
    timelines are unavailable. Accessible heading via `sr-only` h2.
- Verified on a separate build at 1440×900 and 390×844 across the scroll range; no horizontal
  scroll; lint, typecheck, `pnpm verify` pass.

## 2026-11-21 — Apple-style parallax: hero depth + pinned showcase

- Hero depth layers (`depth-copy` / `depth-phone` / `depth-bg`, `animation-timeline: scroll(root)`,
  range 0–90vh): copy rises and fades fastest, the phone rises slower, the hero art zooms in
  slowest — the scene "pulls away" in layers as you scroll.
- New `components/home/showcase.tsx` after the highlights: a 340vh section with a sticky
  full-screen stage (view timeline `--showcase`). The phone rises and untilts from a 3D tilt
  into place, a lime glow grows behind it, the flexing mascot drifts in at a slower depth, and
  three chapters (Dashboard → Billing → Privacy) cross-fade with blur while matching callout
  chips pop beside the phone. Mobile: phone above, chapters below, same behaviour.
- Fallback: with reduced motion or without scroll timelines the section is a normal static
  block (no pinning, all chapters listed). Only transform/opacity/filter animated; no JS, no
  new dependency.
- Verified on a separate build at 1440×900 and 390×844 at several scroll positions; no
  horizontal scroll; lint, typecheck, `pnpm verify` pass.

## 2026-11-20 — Sparkles: firecracker burst at the top of the jump

- Owner feedback: the sparkles moved up and down with the mascot, so it never read as "he
  jumped, then the celebration popped". Modelled the behaviour on the astrogaon home page
  How-it-works cracker (`astrogaon/apps/weblaravel/resources/js/Pages/Welcome.jsx`,
  `bombFlash` / `sparkLine` / `sparkDot`): one fixed origin, a flash, then pieces flying
  outward along their own angle (`rotate(--rot) translateY(-dist)`), quiet the rest of the cycle.
- `CelebrationSparkles` now sits OUTSIDE the jumping wrapper at a fixed point by the
  head/shoulders. Same visual design (lime/white/gold 4-point stars + dots with glow): 8 stars
  in a first wave, 7 dots slightly later and further, upper arc only (−120°…+120°) so nothing
  crosses the body; plus a soft white→lime flash.
- `@keyframes burst-spark` / `burst-flash` replace the old `sparkle` keyframe; same 1.6 s clock
  as `.motion-jump`. Measured in the browser: jump, spark and flash animations have identical
  phase; flash peaks at 42%, sparks fly 43–56%, jump peaks at 45%.
- Still hidden with reduced motion. Lint, typecheck and a separate build pass.

## 2026-11-20 — Celebration sparkles on the jumping mascot

- `components/motion/sparkles.tsx`: 10 decorative sparkles (CSS clip-path 4-point stars +
  dots, lime / white / gold with a soft glow) placed around the celebrate cutout's head,
  shoulders and raised fists.
- The jump now moves a wrapper holding the cutout + sparkles, so the sparkles travel with the
  body. `@keyframes sparkle` (1.6 s, same as the jump) bursts them near the top of each jump,
  drifts them outward and fades them; staggered delays.
- Hidden (opacity 0, no animation) when the visitor prefers reduced motion. No new dependency,
  no images, transform/opacity only.
- Verified on a separate build (port 3417): sparkle opacities go 0 → ~1 at the jump peak →
  0 each cycle; frames captured over one cycle show the burst around the upper body.

## 2026-11-20 — Two-frame scroll runner

- The image the owner added (`assets/Neon Sprinting Lion Mascot-1.png`) is byte-identical to
  `design/raw-cutouts/run-x3.png`; it has the opposite ARM forward to the current runner frame
  (legs are the same). Renamed the raw file to `run-b.png`, cut `assets/cutouts/run-b.webp`,
  removed the duplicate from `assets/`.
- `ScrollRunner` now uses `FrameLoop` (run ↔ run-b every 0.21 s) inside the bob; bob shortened
  to 0.21 s so there is one bounce per step, with less tilt.
- Verified on a separate build: frame opacities alternate (1/0 ↔ 0/1) and both frames render
  at the runner's position; lint and typecheck clean.

## 2026-11-20 — Move the celebrating mascot

- The jumping "celebrate" cutout sat on top of step 3's artwork (over that lion's head).
  Moved it below the three steps as a finish-line moment on empty space, with
  "That's it. You're ready." copy and a soft lime ground glow. Pops in on scroll, keeps the
  jump loop.
- ESLint now ignores `.next-verify/**` (the separate verification build folder).
- Checked at 1440×900 and 390×844 on a separate build (port 3417); lint and typecheck clean.

## 2026-11-20 — Fix: animations missing on the dev server

- Cause: verification `next build` runs wrote into `.next` while the owner's `pnpm dev`
  (port 3001) was running from the same folder; the dev server kept serving the CSS from
  before the motion rules were added (HTML had the classes, CSS did not), so both animation
  frames showed at once and nothing moved. Touching `globals.css` did not recover it.
- `next.config.ts`: `distDir` from `NEXT_DIST_DIR` (default `.next`), so verification builds
  go to `.next-verify/` (git-ignored) and never share the dev server's folder. CLAUDE.md
  verify steps updated.
- Re-verified on a fresh build (port 3417): push-up frame B opacity alternates 0 → 1, runner
  moves 12 → 458 → 904 → 1364 px across the page scroll, punch cutout scales/rotates in on
  scroll.

## 2026-11-20 — Mascot cutouts + CSS animations on the home page

**What**
- Moved the owner's 23 generated images out of the Flutter app (`../GymYardHQ/assets/images/cutouts/`,
  untracked there; 2 exact duplicates dropped) into `design/raw-cutouts/` with clean names, and
  keyed them with `make_cutout.py` → 17 cutouts in `assets/cutouts/`. Owner × Mascot scenes →
  `assets/scenes/owner-mascot-{wide,tall}.webp`.
- `make_cutout.py`: added an alpha choke and edge-band despill (removed a faint pink rim on
  mane tips).
- Animations (CSS only, no new dependency):
  - Hero: staggered load-in of copy, slow Ken Burns on the hero art, floating phone.
  - Scroll-driven: every section's copy and tiles rise in; scene art drifts (parallax).
  - Punch cutout punches in beside "Less paperwork. More reps." (lg+).
  - Peeking cutout rises from behind the "Built for the whole gym" divider.
  - Celebrating cutout pops in and jumps beside "Three sets. Done.".
  - New "For gym owners" section: owner × mascot fist bump (tall crop on phones), blended.
  - FAQ: waving mascot (two-frame loop) next to "Contact support".
  - Footer: mascot doing push-ups on the footer line (two-frame loop).
  - Scroll runner: mascot runs along a lime progress bar at the bottom (md+).
  - 404: dumbbell-curl loop.
- Removed `assets/scenes/not-found.webp` (404 now uses the curl cutout).

**Verification**
- `pnpm lint` 0 · `pnpm typecheck` 0 · `pnpm build` success · `pnpm verify` all passed.
- Checked viewport-by-viewport while scrolling (so scroll animations run as for a user) at
  1440×900 and 390×844, and with `prefers-reduced-motion: reduce` (all content visible and
  static, runner hidden). Not measured: Lighthouse/INP numbers.

**Not used yet** (available in `assets/cutouts/`): phone-showcase, point-right, flex-biceps,
thumbs-up, sit-edge, head-avatar, owner-mascot-cutout. The three run images all show the same
stride, so the runner uses one frame with a bob instead of a two-frame cycle.

## 2026-11-20 — Cutout prompts + magenta-key cutout tool

- Added `design/ai-cutout-prompts.md`: 14 mascot cutout poses (17 images incl. two-frame
  animation pairs: wave, run, push-up, curl) and 3 Owner × Mascot prompts (16:9 wallpaper,
  9:16 wallpaper, duo cutout), each mapped to the animation it will drive.
- Added `design/tools/make_cutout.py` (Pillow + NumPy, no project dependency): keys out a flat
  `#FF00FF` background with edge un-mixing and despill, trims, pads, writes PNG + WebP to
  `assets/cutouts/`; refuses images whose corners are not magenta.
- Root cause of the old cutouts' holes: they were keyed from black, which removed the black
  tank top. Removed the three defective cutout exports.
- Tested the tool on a magenta composite of the existing mascot: tank top fully kept, no pink
  fringe on dark or lime backgrounds; non-magenta input correctly skipped.
- `.gitignore`: `design/raw-cutouts/` (large AI source files).

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
