# Remote setup: cloud sessions, Actions imports, previews

Set up 2026-09-30 so the owner can work for weeks from a phone. Read this with `CLAUDE.md` "Remote working".

## The model

| What | Where it runs | Touches |
|---|---|---|
| Writing content and code | Claude Code on the web (cloud session, fresh clone, **branches only**) | the **test** branch only (`ep-green-bread-aue0kwbf`, disposable) |
| Trying a branch's UI | Vercel **Preview** deployment of the branch | dev branch (`DATABASE_URL`/`DIRECT_URL` in Vercel Preview) |
| Trying an import on seeded data | Cloud session: `npm run test:e2e:setup` (resets and reseeds test, imports the content), then a dry-run | test branch |
| Checking an import against dev | The **"Import content to dev"** workflow, started by the owner (dry run first) | dev branch |
| Importing to production | **"Import content to production"** workflow, from `main`, after the owner approves | production (secrets live only in the GitHub `production` environment) |
| Release (merge to `main`) | Owner merges on github.com | Vercel Production and `prisma migrate deploy` on production |

Production credentials exist in exactly two places: Vercel Production variables and the GitHub `production` environment secrets. Never in a cloud environment, a `.env` file, a commit, a chat message or a log.

## 1. Preview sign-in (Better Auth)

`lib/auth-origins.ts` decides the base URL and trusted origins (unit-tested in `lib/auth-origins.test.ts`):

- **Production and local: unchanged.** `BETTER_AUTH_URL` (else `http://localhost:3000`) is the base URL; it, `https://$VERCEL_URL` and `BETTER_AUTH_TRUSTED_ORIGINS` are trusted.
- **Preview** (`VERCEL_ENV=preview`): `BETTER_AUTH_URL` is ignored (it may still be the production URL). The base URL is `https://$VERCEL_BRANCH_URL` (the stable per-branch address) and both `VERCEL_BRANCH_URL` and `VERCEL_URL` (the per-deployment address) are trusted, because either can be the address you open.

Vercel settings a Preview needs (Vercel, Settings, Environment Variables, **Preview** column):
- `DATABASE_URL`, `DIRECT_URL`: dev branch (already set).
- `BETTER_AUTH_SECRET`: a Preview-only secret, different from Production. **Required**: without it sign-in fails.
- `BETTER_AUTH_URL`: not needed for Preview (ignored). Leave unset.
- Vercel exposes `VERCEL_URL` and `VERCEL_BRANCH_URL` automatically. "Automatically expose System Environment Variables" must be on (it is by default).

Testing from a phone:
1. Open the branch's preview: Vercel dashboard, Deployments, the deployment for the branch, Visit. Preview deployments may first ask you to sign in to Vercel (Deployment Protection). That is separate from the app's login.
2. Sign in with an account that exists on the **dev** branch (a copy of production, so your mentor/admin account should exist).
3. If sign-in shows "Invalid origin" or you land back on the login page, the address you opened is neither of the two hosts above (a custom domain assigned to the branch, for example). Add it to `BETTER_AUTH_TRUSTED_ORIGINS` (comma-separated) in the Preview variables and redeploy.

This has **not** been tested on a real preview; only the pure function is unit-tested.

## 2. GitHub Actions content imports

Two workflows, both run by hand (`workflow_dispatch`):

- `.github/workflows/import-content-dev.yml` "Import content to dev": any branch, `dry_run` defaults to true, secrets from the `dev` environment.
- `.github/workflows/import-content-production.yml` "Import content to production": **main only**, `dry_run` defaults to true, a real run also needs `backup_confirmed`, secrets from the `production` environment.

Each runs: `npm ci`, `scripts/assert-db-target.ts` (the secrets really point at that environment; the dev workflow refuses the production endpoint), `scripts/db-guard.ts import`, then `npm run import:content` (with `-- --dry-run` when checked). The result is also written to the run's summary page. This repository is **public**, so logs are public: the importer redacts learner names when `REDACT_LEARNER_NAMES=1` (set by both workflows), and prints only hosts, never credentials.

### Add the secrets on github.com (from a phone, use the browser's "Desktop site" option)

Environments with required reviewers work in a public repository on the free plan. (For a private repository they need GitHub Pro or Team, so if the repository is ever made private, this stops working.)

**A. The `production` environment**
1. Open `github.com/josyo/Learning_app`, tap **Settings** (if it is not in the tab row, open **More** first).
2. In the left menu tap **Environments**, then **New environment**.
3. Name it exactly `production` and tap **Configure environment**.
4. Tick **Required reviewers**, type your own GitHub username, choose it from the list. **Leave "Prevent self-review" unticked** (if it is ticked, you cannot approve a run you started, and nothing will ever run). Tap **Save protection rules**.
5. Under **Deployment branches and tags** choose **Selected branches and tags**, tap **Add deployment branch or tag rule**, set the ref type to **Branch**, the name pattern to `main`, and tap **Add rule**.
6. Under **Environment secrets** tap **Add environment secret** and add two secrets. Names must match exactly:
   - `DATABASE_URL`: the **main** branch's **pooled** connection string (host contains `-pooler`).
   - `DIRECT_URL`: the **main** branch's **direct** connection string (same host without `-pooler`).
   Get both from Neon: your project, **Branches**, `main`, **Connect**; switch connection pooling on for the first and off for the second. These are the same two values Vercel Production uses. Paste each straight from Neon into GitHub; do not paste them into any chat.

**B. The `dev` environment**
1. **New environment**, name exactly `dev`, **Configure environment**.
2. Recommended: tick **Required reviewers** and add yourself (unticked "Prevent self-review"), so every dev write needs one tap from you. This keeps `CLAUDE.md` gotcha 13 ("every dev write needs the owner's OK every time") true even if someone else could start a run. Do not restrict branches: dev imports must run from content branches.
3. **Environment secrets**: `DATABASE_URL` (dev branch, **pooled**) and `DIRECT_URL` (dev branch, **direct**). The dev host starts with `ep-silent-band-aup0hqps`. The workflow refuses to run if either secret is the production endpoint or not the dev endpoint.

The GitHub button labels above follow GitHub's current documentation (fetched 2026-09-30); the label of the add-secret button was documented as "Add Secret" / "Add secret" and may differ in capitalisation on your screen.

### Running an import
1. Tap **Actions**, choose **Import content to production** (or **dev**) in the workflow list, tap **Run workflow**.
2. Choose the branch (`main` for production), leave **dry_run** ticked, tap **Run workflow**.
3. Open the new run. A yellow box says the run is waiting for review: open **Review deployments**, tick `production`, approve.
4. When the run finishes, open it and read the **summary**. It must match what the release checklist expects. **Stop if not.**
5. For a real import: before running, create a Neon branch from `main` (`pre-import-YYYY-MM-DD`) as the snapshot; then run again with **dry_run** unticked and **backup_confirmed** ticked, and approve again.
6. Afterwards check Praise's view from a machine that has the credentials. `scripts/verify-learner-view.ts` needs real learner data, so it is **not** run in a cloud session.

The workflows appear in the Actions tab only once they are on `main`.

## 3. Claude Code cloud environment (TEST branch only)

Create the environment at claude.ai/code (environment settings). **The cloud environment gets the test branch (`ep-green-bread-aue0kwbf`) and nothing else.** Not dev, because dev holds a copy of real user data, and not production. Anyone who uses the environment, and Claude itself in the session, can read its variables. The test branch is disposable and seeded with fake accounts, so exposing it costs nothing.

There is **no `.env` or `.env.test` file** in a cloud session. The app, Prisma, `scripts/db-guard.ts`, the `*:test` npm scripts and `playwright.config.ts` all work from process environment variables alone. The `test` guard role accepts only the test endpoint, so a wrong URL in the environment makes `npm run test:e2e:setup` refuse instead of resetting the wrong database.

### Environment variables (names only)

- `DATABASE_URL`: **test** branch, **pooled** (host contains `-pooler`)
- `DIRECT_URL`: **test** branch, **direct**
- `BETTER_AUTH_SECRET`: a test-only random value (not the Production, Preview or dev one)
- `BETTER_AUTH_URL`: `http://localhost:3000`
- `SEED_USER_PASSWORD`: a password for the fake seeded accounts (test only; the E2E tests log in with it)

Do **not** set: any `LEARNING_DB_*`, `ALLOW_PRODUCTION_DB_WRITE`, `ALLOW_SEED`, `GH_TOKEN` (a token could let a session start workflows), anything for the **dev** or **main** branches, or `SEED_ADMIN_PASSWORD` / `SEED_MENTOR_PASSWORD` / `SEED_TRAINEE_PASSWORD` unless you want them to differ.

What a session can then do: `npm run test:e2e:setup` (reset, migrate, seed, import content on the test branch), `npm run test:e2e`, `npm run import:content -- --dry-run` (this reads the test branch, so it shows the create/update/archive plan against seeded data, not against real learners), `npm test`, `npx tsc --noEmit`.

What it cannot do, by design: dry-run against dev or production, or run `scripts/verify-learner-view.ts` on a real learner. Those need the workflows (section 2) and your review.

### Network access

- Network access level: **Custom**, with **Also include default list of common package managers** ticked (npm, GitHub and Prisma's engine download host `binaries.prisma.sh` are in the default list).
- Allowed domains, one per line: `*.neon.tech`
- E2E also needs a Playwright browser: `npx playwright install chromium` downloads it. The download hosts are **not** in the documented default list and I have not verified which ones Playwright uses today; if the install fails with a network error, read the host from the error and add it, or check whether the cloud image already ships Chromium.

Neon hosts look like `ep-green-bread-aue0kwbf-pooler.<region>.aws.neon.tech`. `*.neon.tech` also matches the dev and production hosts at the network level, which is why neither may have credentials in the environment.

**Unverified risk:** Anthropic's documentation describes network access as a domain allowlist and does not say whether raw database connections (Postgres on port 5432, which Prisma uses) pass through it. Test it once, first thing: in a cloud session run `npm run db:guard:test` (no connection) and then `npm run test:e2e:setup`. If the setup cannot connect (`P1001` or a timeout), tell the owner: the fallback is network access **Full** (not recommended) or doing database work only through the workflows.
