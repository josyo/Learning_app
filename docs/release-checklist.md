# Production release checklist

> **Status: COMPLETED on 2026-09-30.** The owner pushed, the build ran, the production content import was done and Praise's view was verified (confirmed by the owner). The boxes below are left unticked on purpose: this file is the template for the **next** release. Before reusing it, re-check every value (branch URLs, the commit list, the expected dry-run numbers), because they describe this release, not the next one.

For releasing the guard, importer and content work to **https://learningapp-zeta.vercel.app**. Follow the steps in order and stop at the first thing that does not match. Nothing here runs by itself.

**Why the order matters.** A push to `main` deploys to production **and** runs `prisma migrate deploy` against the production database. The new code is written to cope with archived lessons, but the *old* code is not. So the content import (which archives 22 old lessons) must happen only **after** the new code is live. If you import first, the old code will show those lessons to Praise and count them toward completion.

**What ships** (run `git log --oneline origin/main..HEAD` to see it): the database guards, the hardened importer, one additive migration (`20260929200000_lesson_archived_at`, a single nullable column), the Markdown renderer, and the Orientation assignment and lesson fixes. The migration adds a column; it removes nothing.

## Before you start

- [ ] Pick a quiet time and tell Praise it is happening.
- [ ] Have three things open: the **Neon console**, the **Vercel dashboard**, and PowerShell in the repo folder.
- [ ] In a fresh PowerShell window, run `Set-PSReadLineOption -HistorySaveStyle SaveNothing` so connection strings you paste are not saved in your command history. Close the window when you finish. Never paste a connection string into a file or into this chat.
- [ ] In the repo, all three must pass:
  ```powershell
  git status              # nothing to commit
  npx tsc --noEmit        # no output
  npx vitest run          # all tests pass
  ```
- [ ] The last E2E run on the test branch was green (6 of 6).

## 1. Back up production, and check it

Use the **main** branch's **direct** connection string (in Neon: your project, Branches, `main`, Connect, and switch pooling **off**; the host has no `-pooler`). It is called `<MAIN_DIRECT_URL>` below.

1. [ ] **Snapshot in Neon:** create a branch from `main` named `pre-release-YYYY-MM-DD`. It is instant and gives you a reference copy. Never use it as dev or test.
2. [ ] **Fresh `pg_dump`:**
   ```powershell
   $env:PGDUMP_URL = '<MAIN_DIRECT_URL>'
   $stamp = Get-Date -Format 'yyyy-MM-ddTHH-mm-ss'
   $file  = "C:\Users\USER\dev-learning-platform-backups\neondb-main-$stamp.dump"
   & 'C:\Program Files\PostgreSQL\18\bin\pg_dump.exe' --format=custom --no-owner --file $file $env:PGDUMP_URL
   & 'C:\Program Files\PostgreSQL\18\bin\pg_restore.exe' --list $file | Select-Object -First 5
   Remove-Item Env:PGDUMP_URL
   $file    # note this path: you use it in the next two steps
   ```
   You should see: no errors, and a list of dump entries (the file is roughly 100 KB or more).
3. [ ] **Read-only row counts.** This tool only reads: it runs inside a `READ ONLY` transaction and prints only the host.
   ```powershell
   $env:COUNT_DB_URL = '<MAIN_DIRECT_URL>'
   # a) live vs the fresh dump (should match, apart from live activity)
   npx tsx scripts/row-counts.ts --compare $file
   # b) live vs the 29 Sep backup (shows only real activity since then)
   npx tsx scripts/row-counts.ts --compare "C:\Users\USER\dev-learning-platform-backups\neondb-2026-09-29T16-29-43-594Z.dump"
   Remove-Item Env:COUNT_DB_URL
   ```
   You should see: the line `(4 statements sent to the database, including transaction begin/commit)`, then in (a) every table matching, or only `session`, `verification` and `lesson_progress` differing (people logging in and learning). In (b) the same, and nothing else. The tool counts every table in one query, so a slow connection only makes it wait longer. If it still times out, run it again: it only reads.
   **Stop if:** a table such as `lesson`, `assignment`, `submission` or `user` differs unexpectedly. Also note the `submission` count: if Praise has **already submitted** the Environment Check assignment, do not run step 4 until you and I have decided how to handle it (the import replaces the assignment text under an existing submission).

## 2. Set the Vercel environment variables (before pushing)

Vercel dashboard, your project, Settings, Environment Variables. Copy the connection strings from Neon (Branches, choose the branch, Connect). **Pooled** means the host contains `-pooler`; **direct** means it does not.

Before you change a variable, copy its current value into your password manager, so you can restore it. You set `DATABASE_URL` and `DIRECT_URL` **by hand**, for each environment.

| Name | Production | Preview | Development |
|---|---|---|---|
| `DATABASE_URL` | **main**, pooled | **dev**, pooled | leave unset |
| `DIRECT_URL` | **main**, direct | **dev**, direct | leave unset |
| `BETTER_AUTH_SECRET` | keep the current value (changing it signs everyone out) | a different secret | leave unset |
| `BETTER_AUTH_URL` | `https://learningapp-zeta.vercel.app` | decide when you use previews (see note) | leave unset |
| `LEARNING_DB_*` (about 20, added by the Neon integration) | **leave alone** | **leave alone** | leave alone |
| `ALLOW_PRODUCTION_DB_WRITE`, `ALLOW_SEED` | never set | never set | never set |

- [ ] `DIRECT_URL` is **required** in Production. The build fails without it.
- [ ] **Leave every `LEARNING_DB_*` variable alone** (for example `LEARNING_DB_DATABASE_URL`, `LEARNING_DB_POSTGRES_PRISMA_URL`, `LEARNING_DB_PGHOST`). The Neon integration manages them and they cannot be cleanly deleted. That is safe: no code reads them (a unit test, `lib/no-legacy-env.test.ts`, fails if any source file ever does), and the app and every script connect only through `DATABASE_URL` and `DIRECT_URL`. The build guard just prints a warning about them and carries on.
- [ ] **Do not point `DATABASE_URL` or `DIRECT_URL` at an integration value.** Type or paste the right branch's string yourself, so the environment you see in this table is the environment you get.
- [ ] **Preview must never point at `main`.** The two variables that matter are `DATABASE_URL` and `DIRECT_URL`, and the build guard refuses a Preview build whose URLs are the production host. If you ever see an *unprefixed* `POSTGRES_*`, `PG*` or `DATABASE_URL_UNPOOLED` variable in Preview, tell me: the app does not read those either, but I would want to know where it came from.
- [ ] Editing variables does **not** touch the running site. Vercel applies variable changes only to new deployments, and each old deployment keeps its own snapshot. That is also why changing a variable does not break an instant rollback.
- Note on Preview `BETTER_AUTH_URL`: on a Preview deployment `lib/auth-origins.ts` ignores it and uses the deployment's own `VERCEL_BRANCH_URL` / `VERCEL_URL` (2026-09-30), so leave it unset for Preview. Preview does need its own `BETTER_AUTH_SECRET`. Production behaviour is unchanged. See `docs/plans/remote-setup.md`. Sign-in on a real preview is still untested.

## 3. Push, and confirm the site loads

1. [ ] Push: `git push origin main`. This is the point of no return for the code, so only do it after steps 1 and 2.
2. [ ] Vercel dashboard, Deployments: open the new deployment and its **Build Logs**. You should see, in order:
   - `db-guard [build] warning: ... LEARNING_DB_* variable(s) are set ...` (expected: the Neon integration's variables; it is only a warning)
   - `db-guard [build] ok. Target: ep-red-mode-aur8z6oc...`
   - `Applying migration `20260929200000_lesson_archived_at``
   - `All migrations have been successfully applied.`
   - the status becomes **Ready** and the domain `learningapp-zeta.vercel.app` is assigned.
3. [ ] If the build fails, the live site keeps serving the previous deployment (Vercel does not replace it with a failed build), so Praise is not affected. Find the message:

   | Message contains | Meaning | Fix |
   |---|---|---|
   | `DIRECT_URL is missing` | variable not set in Production | set it, then Redeploy that deployment |
   | `warning: ... LEARNING_DB_* variable(s) are set` | the Neon integration's variables | nothing: it is a warning, not the cause of a failure |
   | `DATABASE_URL is missing` | variable not set in that environment (a `LEARNING_DB_*` copy does not count) | set `DATABASE_URL` by hand, then Redeploy |
   | `build points at PRODUCTION` | a Preview build has main's URLs | fix the Preview `DATABASE_URL` and `DIRECT_URL` |
   | `P1001` or connection errors | wrong `DIRECT_URL` (it must be the direct host) | correct it, then Redeploy |
   | `tsx: not found` | build tools missing | tell me; nothing else to change |

4. [ ] Confirm the site works:
   - open https://learningapp-zeta.vercel.app and the login page loads.
   - log in with **your own** mentor or admin account: the dashboard loads and Praise is listed.
   - Vercel, Runtime Logs: no `Database target refused` errors.
5. [ ] Check Praise's view **before** the import (read-only):
   ```powershell
   $env:ALLOW_PRODUCTION_DB_WRITE = 'ep-red-mode-aur8z6oc.c-10.us-east-1.aws.neon.tech'   # only lets the read-only script past the safety check
   $env:DATABASE_URL = '<MAIN_POOLED_URL>'
   $env:DIRECT_URL   = '<MAIN_DIRECT_URL>'
   npx tsx scripts/verify-learner-view.ts --user Praise --module developer-orientation
   Remove-Item Env:ALLOW_PRODUCTION_DB_WRITE, Env:DATABASE_URL, Env:DIRECT_URL
   ```
   You should see: status `IN_PROGRESS`, **9** lessons visible (the two old ones are still there until step 4), and `RESULT: ok`.

## 4. Import the content (only after step 3 is live and checked)

This archives 22 old seed lessons, updates two Orientation lessons (4 and 5) and the Orientation assignment text. It deletes nothing. HTML Foundations is held out and is not touched.

1. [ ] Set the variables for **this window only**:
   ```powershell
   $env:DATABASE_URL = '<MAIN_POOLED_URL>'
   $env:DIRECT_URL   = '<MAIN_DIRECT_URL>'
   $env:ALLOW_PRODUCTION_DB_WRITE = 'ep-red-mode-aur8z6oc.c-10.us-east-1.aws.neon.tech'
   ```
2. [ ] **Dry-run first.** It writes nothing:
   ```powershell
   npm run import:content -- --dry-run
   ```
   The first lines must say `DRY RUN` and the target `ep-red-mode-aur8z6oc`. The last line must read exactly:
   `Summary: create 0, update 2, archive 22, untouched 51 lesson(s); 0 learner/module state change(s).`
   Also check: 11 modules are listed and `html-foundations` is not one of them; `developer-orientation` shows `update: what-is-a-terminal-... [content]; installing-node-js-... [content]`, archive of `toolchain-basics, project-loop`, and `assignment: update "Environment Check" [instructions]`; and no learner is reported as changing.
   **Stop if** any number differs, any learner would change, or `html-foundations` appears. Send me the output.
3. [ ] Real import, only if the dry-run matched:
   ```powershell
   npm run import:content
   ```
   You should see `applied` for each of the 11 modules and `Import complete.`
4. [ ] Clear the variables straight away:
   ```powershell
   Remove-Item Env:DATABASE_URL, Env:DIRECT_URL, Env:ALLOW_PRODUCTION_DB_WRITE
   ```

## 5. Check Praise's view afterwards

1. [ ] Run the read-only check, with the two old lessons expected to be hidden:
   ```powershell
   $env:ALLOW_PRODUCTION_DB_WRITE = 'ep-red-mode-aur8z6oc.c-10.us-east-1.aws.neon.tech'
   $env:DATABASE_URL = '<MAIN_POOLED_URL>'
   $env:DIRECT_URL   = '<MAIN_DIRECT_URL>'
   npx tsx scripts/verify-learner-view.ts --user Praise --module developer-orientation --hidden toolchain-basics,project-loop
   Remove-Item Env:ALLOW_PRODUCTION_DB_WRITE, Env:DATABASE_URL, Env:DIRECT_URL
   ```
   You should see: `IN_PROGRESS`, **7** lessons (6 ticked, the last one, "A tour of a real project's folders", not), both `hidden check` lines saying `hidden (good)`, the assignment `Environment Check` with 7 `h2` sections and 6 checkboxes, and `RESULT: ok`.
2. [ ] Re-run the row counts against the fresh dump from step 1 (the same command as 1.3a; if you opened a new window, set `$file` again to that dump's path first). Archiving does not add or remove rows, so the only expected differences are `_prisma_migrations` at **+1** (the migration applied in step 3) and normal activity in `session`, `verification` and `lesson_progress`. `lesson`, `assignment`, `submission` and `user` must match. Any other change means stop.
3. [ ] Ask Praise to refresh the page and confirm: the Node.js lesson shows the PowerShell error and its fix, the assignment shows the new steps and the "message your mentor" line, and there is no "Toolchain basics" or "Project loop". Do **not** log in as Praise or use admin impersonation.
4. [ ] Update CLAUDE.md: remove the sentence saying production still runs older code.

## If something goes wrong

- **Site broken right after the push (before step 4).** Vercel, Deployments, open the previous Production deployment, and use **Instant Rollback**. This is safe: the migration only added a column that old code ignores. Do not drop the column.
- **Something is wrong after the import (step 4).** Fix the Markdown, then run the dry-run and import again. The import is safe to repeat: lessons are matched by slug, a slug that comes back is un-archived automatically, and nothing is deleted.
- **Do not roll the code back after the import.** The old code does not know about archived lessons, so it would show the 22 old lessons again and count them toward completion (Praise would have to tick two extra lessons). Fix forward instead. If you must roll back, expect that, and no progress is lost.
- **Data damage (worst case).**
  1. Tell Praise to stop using the site.
  2. Take a new `pg_dump` of the current state first (step 1.2), so nothing is lost by restoring.
  3. Roll the **code** back first (Instant Rollback). A database restored to before the migration has no `archivedAt` column, and the new code would crash on it.
  4. In the Neon console, restore `main` to a point before the release, or from the `pre-release-YYYY-MM-DD` branch. Menu names vary by plan, so use Neon's restore or Time Travel option. A restore discards anything written after that point, such as new progress, which is why step 2 comes first.
- **A wrong environment variable.** Restore the value you saved in step 2, then Redeploy. Old deployments keep working with their own snapshot.
- **Never do any of these against production:** `npm run db:seed`, `test:e2e:setup`, `prisma migrate reset`. The guards refuse them, and none is ever needed.
