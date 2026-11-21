# Known gaps

🔴 high · 🟠 medium · 🟡 low

| # | Sev | Area | Gap | Impact | Fix |
|---|---|---|---|---|---|
| 1 | 🟠 | Legal | Company legal name, address, support email, Grievance Officer, jurisdiction, hosting and email providers are placeholders (`config/site.ts`). | Pages show highlighted "[… — to be confirmed]"; not publishable to Play until filled. | Owner sets env vars (`.env.example`); see owner-todo. |
| 2 | 🟠 | Legal | Texts are drafts, not lawyer-reviewed. | Legal risk. | Lawyer review; bump `version` after edits. |
| 3 | 🟠 | Flutter app (DPDP) | The app has no in-app **Privacy & Legal** screen (notices with version, Grievance Officer, data deletion shortcut). | DPDP rule: notices must be readable in the app. | Add a screen in `../GymYardHQ` that fetches `/api/legal` (with bundled fallback) and links "Reset Application Data". |
| 4 | 🟠 | Flutter app | `android:allowBackup` is not set to `false` in `AndroidManifest.xml`, so Android auto-backup can copy the SQLite DB to Google Drive. Privacy Policy currently discloses this. | Member data leaves the device via Google backup. | Set `android:allowBackup="false"` (and `fullBackupContent`/`dataExtractionRules`) in the app, then update Privacy Policy §9 + Data deletion §3. |
| 5 | 🟡 | Flutter app | MPIN salt is `DateTime.now().microsecondsSinceEpoch` (predictable) and a 4–6 digit PIN hash is brute-forceable offline. | Weak if a device is rooted/imaged. | Use a random 16-byte salt + slow KDF (PBKDF2/Argon2) and attempt limits. |
| 6 | 🟡 | Security | CSP needs `'unsafe-inline'` for scripts because pages are static (no per-request nonce). | Reduces XSS defence-in-depth (no user input on the site, so low risk). | Move to nonce-based CSP via `proxy.ts` if any dynamic/user content is ever added, or hash-based CSP when Next supports it for static output. |
| 7 | 🟡 | Legal | Terms of Service and Cookie Policy are English only. | DPDP guidance: offer notices in Hindi too. | Add `hi` blocks to `content/legal/terms.ts` and `cookie-policy.ts`. |
| 8 | 🟡 | CI | No CI pipeline: gitleaks, Semgrep, Lighthouse CI (perf ≥ 90, LCP/CLS/TBT budgets), `pnpm verify`, ZAP baseline not automated. | Regressions not caught automatically. | Add GitHub Actions workflow running lint, typecheck, build, verify, audit, gitleaks, Semgrep, Lighthouse CI. |
| 9 | 🟡 | Perf | No RUM (`web-vitals`) endpoint. | No field data for CWV. | Only if wanted: add a self-hosted, rate-limited, no-PII endpoint — update Cookie/Privacy notices first. |
| 10 | 🟡 | Content | Google Play badge is a custom Hugeicons button, not Google's official badge artwork. | Brand-guideline nicety only. | Optional: add the official badge asset following Google's badge guidelines. |
| 11 | 🟡 | Motion | Scroll-driven animations need `animation-timeline` (Chrome/Edge, Safari 26+). Firefox shows the static end state — no motion, nothing broken. | Less motion for Firefox users. | Acceptable; revisit when Firefox ships scroll timelines, or add a tiny IntersectionObserver fallback if wanted. |
| 12 | 🟡 | Motion | Runner now swaps arms (two frames), but both run images have the same leg forward. | At 48 px it reads as running; legs don't alternate. | Optional: generate a frame with the opposite LEG forward (prompt 8 Frame B) and use it as `run-b`. |
| 13 | 🟡 | SEO | Hindi legal pages keep `<html lang="en">` (one root layout); content wrapper has `lang="hi"`, hreflang + og:locale are correct. | Minor; Google relies on hreflang/content. | Split into route-group root layouts if a full Hindi site is added. |
| 14 | 🟠 | SEO/content | No Hindi home page, no About page, no real app screenshots, no testimonials. | Weaker reach for Hindi searches and E-E-A-T. | Add `/hi` home, About (after company facts), real screenshots, owner reviews once available. |
| 15 | 🟡 | SEO | Core Web Vitals not measured on a live URL. | Unknown LCP/INP/CLS. | Run PageSpeed/Lighthouse on the deployed site; add Lighthouse CI (gap 8). |
