# GymYardHQ Web

Marketing and legal website for the **GymYardHQ** gym management app for Android.

- Home page promoting the app
- Legal pages Google Play needs: Privacy Policy (English + हिन्दी), Terms of Service, Delete
  Your Data (English + हिन्दी), Cookie Policy, Contact & Grievance Officer
- The same legal texts as JSON for the app: `/api/legal`, `/api/legal/{slug}`

## Run

```bash
pnpm install
cp .env.example .env.local   # fill in the real company / grievance details
pnpm dev                     # http://localhost:3000
```

## Check before shipping

```bash
pnpm lint && pnpm typecheck && pnpm build
pnpm start -p 3417
BASE_URL=http://localhost:3417 pnpm verify
```

## Links for Google Play Console

| Play Console field | URL |
|---|---|
| Privacy policy | `https://<domain>/privacy` |
| Delete data / account URL | `https://<domain>/delete-account` |
| Website | `https://<domain>` |
| Feature graphic (1024×500) | `design/play-feature-graphic-1024x500.png` |

See `CLAUDE.md` for project rules, `docs/owner-todo.md` for what the owner still has to do.
