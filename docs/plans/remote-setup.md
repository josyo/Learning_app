# Remote setup: cloud sessions, Actions imports, previews

Set up 2026-09-30 so the owner can work for weeks from a phone. Read this with `CLAUDE.md` "Remote working".

## The model

| What | Where it runs | Touches |
|---|---|---|
| Writing content and code, `npm run validate:content`, `npm test` | Claude Code on the web (cloud session, fresh clone, **branches only**) | **no database** |
| Trying a branch's UI | Vercel **Preview** deployment of the branch | dev branch (`DATABASE_URL`/`DIRECT_URL` in Vercel Preview) |
| Dry-run or import against dev | **"Import content to dev"** workflow | dev branch |
| E2E suite | **"E2E on test branch"** workflow | test branch (wiped and reseeded) |
| Importing to production | **"Import content to production"** workflow, from `main`, after the owner approves | production (secrets live only in the GitHub `production` environment) |
| Release (merge to `main`) | Owner merges on github.com | Vercel Production and `prisma migrate deploy` on production |

Production credentials exist in exactly two places: Vercel Production variables and the GitHub `production` environment secrets. Never in a cloud environment, a `.env` file, a commit, a chat message or a log. **A cloud environment holds no database credentials at all** (production, dev or test): dev and test URLs live only in the GitHub `dev` and `test` environments.

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

Three workflows, all run by hand (`workflow_dispatch`):

- `.github/workflows/import-content-dev.yml` "Import content to dev": any branch, `dry_run` defaults to true, secrets from the `dev` environment.
- `.github/workflows/import-content-production.yml` "Import content to production": **main only**, `dry_run` defaults to true, a real run also needs `backup_confirmed`, secrets from the `production` environment.

- `.github/workflows/e2e-test-branch.yml` "E2E on test branch": any branch, secrets from the `test` environment. It asserts the secrets are the test endpoint (`ep-green-bread-aue0kwbf`), then `npm run test:e2e:setup` (reset, migrate, seed, import) and `npm run test:e2e`. The test-branch values are passed as process environment variables; no `.env.test` exists on the runner.

The two import workflows each run: `npm ci`, `scripts/assert-db-target.ts` (the secrets really point at that environment; the dev workflow refuses the production endpoint), `scripts/db-guard.ts import`, then `npm run import:content` (with `-- --dry-run` when checked). The result is also written to the run's summary page. This repository is **public**, so logs are public: the importer redacts learner names when `REDACT_LEARNER_NAMES=1` (set by both workflows), and prints only hosts, never credentials.

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

**C. The `test` environment** (for "E2E on test branch")
1. **New environment**, name exactly `test`, **Configure environment**. No reviewers and no branch restriction are needed: the branch is disposable.
2. **Environment secrets** (names must match exactly):
   - `DATABASE_URL`: test branch, **pooled**. The host starts with `ep-green-bread-aue0kwbf`.
   - `DIRECT_URL`: test branch, **direct**.
   - `BETTER_AUTH_SECRET`: a random value used only for E2E, different from every other environment.
   - `SEED_USER_PASSWORD`: a strong throwaway password for the seeded test accounts (the E2E spec reads the same variable).
   The workflow refuses to run if either URL is not the test endpoint.

### Secrets at a glance
Add at github.com: repo, **Settings**, **Secrets and variables**, **Actions**. Environment secrets are added on the environment's own page (**Settings**, **Environments**, pick the environment, **Environment secrets**). No repository-level secret is needed.

| Workflow | Environment | Secret names |
|---|---|---|
| Import content to dev | `dev` | `DATABASE_URL`, `DIRECT_URL` |
| Import content to production | `production` | `DATABASE_URL`, `DIRECT_URL` |
| E2E on test branch | `test` | `DATABASE_URL`, `DIRECT_URL`, `BETTER_AUTH_SECRET`, `SEED_USER_PASSWORD` |

### Running an import
1. Tap **Actions**, choose **Import content to production** (or **dev**) in the workflow list, tap **Run workflow**.
2. Choose the branch (`main` for production), leave **dry_run** ticked, tap **Run workflow**.
3. Open the new run. A yellow box says the run is waiting for review: open **Review deployments**, tick `production`, approve.
4. When the run finishes, open it and read the **summary**. It must match what the release checklist expects. **Stop if not.**
5. For a real import: before running, create a Neon branch from `main` (`pre-import-YYYY-MM-DD`) as the snapshot; then run again with **dry_run** unticked and **backup_confirmed** ticked, and approve again.
6. Afterwards check Praise's view from a machine with credentials; `scripts/verify-learner-view.ts` needs a database, so it is **not** run in the cloud.

The workflows appear in the Actions tab only once they are on `main`.

## 3. Claude Code cloud environment (no database)

Create the environment at claude.ai/code (environment settings). **It holds no database value at all**: anyone who uses the environment, and Claude itself in the session, can read its variables.

### Environment variables
None are needed. In particular do **not** set `DATABASE_URL`, `DIRECT_URL`, any `LEARNING_DB_*`, `ALLOW_PRODUCTION_DB_WRITE`, `ALLOW_SEED`, `SEED_*` passwords, `GH_TOKEN` (a token could let a session dispatch workflows), or anything that points at any Neon branch.

### Network access
The default level (package managers and GitHub) is enough: `npm ci`, `npm test`, `npm run validate:content` and `npm run typecheck` need no other host. Do not add `*.neon.tech`.

### What a session can run
`npm run validate:content`, `npm test`, `npm run typecheck`. Every database-touching script (`db-guard`, `import:content`, `db:seed`, the `*:test` scripts, Playwright) stops with "no database in this environment" when `DATABASE_URL` is unset. Use the Actions workflows above for those.
