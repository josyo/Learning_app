# Remote setup: cloud sessions, Actions imports, previews

Set up 2026-09-30 so the owner can work for weeks from a phone. Read this with `CLAUDE.md` "Remote working".

## The model

| What | Where it runs | Touches |
|---|---|---|
| Writing content and code | Claude Code on the web (cloud session, fresh clone, **branches only**) | dev branch at most |
| Trying a branch's UI | Vercel **Preview** deployment of the branch | dev branch (`DATABASE_URL`/`DIRECT_URL` in Vercel Preview) |
| Checking an import against dev | Cloud session, or the **"Import content to dev"** workflow | dev branch |
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
6. Afterwards check Praise's view from a machine with credentials, or ask in a cloud session for dev only; `scripts/verify-learner-view.ts` needs the production override and so is **not** run in the cloud.

The workflows appear in the Actions tab only once they are on `main`.

## 3. Claude Code cloud environment (dev only)

Create the environment at claude.ai/code (environment settings). **No production value goes in it**: anyone who uses the environment, and Claude itself in the session, can read its variables.

### Environment variables (names only)

Required for importing and dry-runs against dev:
- `DATABASE_URL`: dev branch, **pooled**
- `DIRECT_URL`: dev branch, **direct**

Only if you want the session to run the app (`next dev`) and log in:
- `BETTER_AUTH_SECRET`: a dev-only random value, not the Production or Preview one
- `BETTER_AUTH_URL`: `http://localhost:3000`

Do **not** set: any `LEARNING_DB_*`, `ALLOW_PRODUCTION_DB_WRITE`, `ALLOW_SEED`, `SEED_*` passwords, `GH_TOKEN` (a token could let a session dispatch workflows), or anything that points at the `main` branch.

No `.env` file is needed: the app, Prisma and the scripts read the process environment. E2E tests need a `.env.test` with the **test** branch URLs and a Playwright browser, which the default cloud environment does not provide; run E2E from a machine that has them.

### Network access

- Network access level: **Custom**, with **Also include default list of common package managers** ticked (npm, GitHub and Prisma's engine download host `binaries.prisma.sh` are in the default list).
- Allowed domains, one per line: `*.neon.tech`

Neon hosts look like `ep-silent-band-aup0hqps-pooler.<region>.aws.neon.tech`. The wildcard also allows the production host name from the network's point of view, which is why production credentials must not be in the environment at all.

**Unverified risk:** Anthropic's documentation describes network access as a domain allowlist and does not say whether raw database connections (Postgres on port 5432, which Prisma uses) pass through it. Test it once, first thing: in a cloud session run `npm run import:content -- --dry-run` (read-only). If it cannot connect (`P1001` or a timeout), use the **"Import content to dev"** workflow for dev dry-runs and imports instead, or set network access to **Full** (not recommended).
