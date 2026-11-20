# Owner TODO

Never ticked off without the owner's confirmation.

## 2026-11-20 — Website launch + Play Store links

- [ ] Give the real values for: company legal name, registered address, support email,
      Grievance Officer name + email, court city for Terms, website hosting provider, email
      provider. Put them in the hosting env (see `.env.example`).
- [ ] Confirm the proposed timelines (acknowledge 48 h, resolve 30 days) and retention
      (support emails 3 years, server logs 30 days) — or give new values.
- [ ] Have a lawyer review Privacy Policy, Terms, Data deletion and Cookie Policy (EN + HI).
- [ ] Choose the domain, deploy (HTTPS only), set `SITE_URL`.
- [ ] Turn on MFA on the hosting, domain registrar and email accounts.
- [ ] In Play Console paste:
      - Privacy policy → `https://<domain>/privacy`
      - Data safety → Delete data URL → `https://<domain>/delete-account`
      - Store listing → Website → `https://<domain>`
      - Feature graphic → upload `design/play-feature-graphic-1024x500.png`
- [ ] After the listing is public, set `PLAY_STORE_LIVE=true` and redeploy (shows the live
      "Get it on Google Play" link).

## 2026-11-20 — Generated artwork

- [ ] Check the logo inside `design/play-feature-graphic-1024x500.png` and
      `app/opengraph-image.jpg` against the official logo — AI tools can alter lettering.
      If anything differs, place the real logo PNG over it and replace the files.
