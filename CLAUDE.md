# Project Handoff — Developer Learning Platform

Internal training platform for onboarding a real junior developer (one
trainee currently), built on a Frontend/Next.js curriculum. This document
is context for continuing work in Claude Code — it covers what a fresh
read of the repo won't tell you: decisions, history, and known sharp edges.

**Content work:** `docs/content-standard.md` is the quality bar for every lesson and assignment — audit against it before writing or changing any content.

## Stack & architecture

- **Next.js (App Router) + TypeScript**, strict mode. Modular monolith —
  `app/(public|learner|mentor|admin)` route segments (real folders, NOT
  route groups — see Gotcha #1 below for why that distinction mattered).
- **PostgreSQL + Prisma.** Schema at `prisma/schema.prisma`, organized in
  phase-commented sections (Phase 1 auth → Phase 6 notifications).
- **Better Auth** for auth/sessions, email+password, `role` field on User
  (LEARNER/MENTOR/ADMIN).
- **Zod** for validation, **React Hook Form** not actually used — forms are
  plain controlled inputs + Server Actions.
- **Vitest** for unit tests, **Playwright** for E2E.
- Business logic lives in `modules/{learning,mentor,admin,notifications,
  progress}/` — Server Actions (`"use server"` files) and plain query
  functions, imported by `app/` pages. Pages are thin; logic is not in JSX.

## What's been built (in order)

1. **Auth, roles, route protection** — middleware does a fast cookie check;
   `lib/session.ts`'s `requireRole()` in each role layout is the *actual*
   authorization boundary (middleware alone isn't trusted).
2. **Learning model** — `LearningPath` → `Module` (reusable across paths,
   not owned by one path) → `PathModule` (placement + order) →
   `ModulePrerequisite` (prerequisites are module-level, not per-path).
   Unlock logic is a **pure, unit-tested function**:
   `modules/progress/compute-module-statuses.ts`. Don't touch this without
   running its tests — it's the highest-risk logic in the app.
3. **Lessons** — `Lesson`/`LessonResource`/`LessonProgress`. Module
   completion = all required lessons done AND assignment approved
   (`modules/learning/derive-module-state.ts`, also unit-tested).
4. **Assignments & mentoring** — `Assignment`/`Submission`/
   `SubmissionReview` (multi-attempt history, never overwritten in place).
   Mentor overrides (`ModuleOverride`) and extra exercises
   (`MentorAssignment` — deliberately simpler, single-row, no attempt
   history, see schema comment on why).
5. **Admin content CRUD** — full path/module/lesson/assignment/prerequisite
   management at `/admin/*`, replacing what used to be seed-script-only
   content. Every delete action has a guard against destroying real
   learner history (cascade deletes are checked before allowed).
6. **Hardening** — notifications (`Notification` model, 5 trigger points),
   loading/empty/error states, a responsive pass, mentor-only activity
   feed, unit + E2E tests.
7. **Real curriculum content** — all 12 modules of the Frontend/Next.js
   path now have real lessons + assignments, written to
   `content-drafts/*.md` and loaded via `npm run import:content`
   (`prisma/import-content.ts` parses the markdown, `prisma/media-map.ts`
   maps lesson slugs to curated real video URLs + resource links).
   **Developer Orientation was rewritten once already** — the original
   3-lesson version assumed too much (never explained what an IDE was,
   never covered installing Node.js at all) and a real learner got stuck.
   The current 7-lesson version assumes genuinely zero prior experience.
8. **UI redesign — learner section only**, deliberately not mentor/admin
   (explicit scope decision). New design system scoped under a
   `.learner-theme` CSS class + `components/learner/*` — mentor/admin
   still use the original `components/app-shell*.tsx` and plain Tailwind
   defaults untouched. Visual concept: the roadmap renders as a connected
   trail of nodes (echoing a git commit graph — the trainees are learning
   Git in this exact curriculum, so the metaphor is grounded in subject
   matter, not decorative). Tokens: IBM Plex Sans/Mono, moss-green
   (success) / amber (needs changes) / paper off-white palette —
   deliberately NOT the generic "warm cream + serif" or "near-black +
   one neon accent" look common in AI-generated UI.

## Known open items (not bugs — documented gaps)

- **`components/notification-bell.tsx` still uses old shared styling**
  even inside the redesigned learner shell — it's shared with mentor/admin
  and wasn't forked. Cosmetic inconsistency, not broken.
- **8 of 46+ lessons have no video** — specific ones in Production
  Frontend Practices, Deployment & Delivery, and both Capstone lessons.
  Deliberate: no well-fitting video was found rather than forcing a loose
  match. Several playground links point at CodeSandbox's homepage as a
  generic fallback rather than a verified specific starter template, for
  the same reason (didn't want to guess a URL that might 404).
- **The Phase 5 "second-path smoke test" status is unknown** — was
  supposed to validate that adding a second LearningPath through the CRUD
  UI works without schema changes. Worth confirming it was actually run.
- **Only Developer Orientation has been rewritten for a true beginner.**
  The other 11 modules (HTML Foundations through Capstone) still have
  their original content, which was written assuming *some* baseline
  comfort with a computer, not zero. **A full audit of the whole path for
  the same beginner-friendliness bar was requested and not yet started**
  — this is likely the next real content task.
- **Git repo may or may not be pushed yet** — as of this handoff, the
  project had no `.git` folder; a first `git init` → commit → GitHub push
  walkthrough was given but completion wasn't confirmed in this session.
  Check `git log` / `git remote -v` first thing.
- **Not yet deployed to production** — Vercel deployment steps were given
  but not executed as of this handoff. `package.json`'s `build` script
  already runs `prisma migrate deploy && next build`, and `postinstall`
  runs `prisma generate` — both were missing originally and would have
  broken the first Vercel build if not caught.

## Hard-won gotchas (things that actually went wrong during this build)

1. **Next.js route groups vs. real segments.** `app/(learner)/dashboard`
   (parentheses) does NOT produce `/learner/dashboard` in the URL — route
   groups are invisible to routing. This caused a real bug early on where
   `/learner`, `/mentor`, `/admin` would have collided on the same URLs.
   Fixed by using real folders (`app/learner/`, not `app/(learner)/`).
   `(public)` is correctly a route group since its pages have no shared
   prefix.
2. **`revalidatePath` scope gaps caused two separate real bugs** — once
   where a mentor's approval only revalidated mentor-side paths, leaving
   the learner's dashboard stale; once again with `MentorAssignment`
   actions for the same reason. When adding any new mutation, check
   revalidation from **both** sides of who's affected, not just the actor.
3. **Vitest's `vi.mock` hoisting** — `vi.mock()` calls are hoisted above
   all other top-level code, including `const` declarations that appear
   earlier in the file. Referencing a plain `const mockObj = {...}`
   directly inside a `vi.mock()` factory throws a temporal-dead-zone
   error. Fix: wrap the mock object in `vi.hoisted(() => ({...}))`.
4. **Prisma unique constraints on reorderable fields.** Both `PathModule`
   and `Lesson` have a unique constraint on `(parentId, order)`. Directly
   swapping two rows' order values mid-transaction collides — you have to
   stage through a temporary out-of-range value first. The content
   *import* script hit the same class of bug for a different reason:
   re-importing into a module with unknown existing lesson state can
   collide on `order`. The importer now parks every row that moves on a
   negative order inside a per-module transaction, then writes the final
   orders (see gotcha 11).
5. **Next.js dev-mode cold compilation breaks Playwright's default
   timeouts.** The first hit to any route in a freshly started `next dev`
   server compiles that route on demand, which can exceed Playwright's
   default 30s navigation timeout on a slower machine. Fixed by raising
   timeouts in `playwright.config.ts`, but a warm server (hit the route
   once manually first) is still meaningfully faster.
6. **E2E tests need a separate database, not your working dev DB.**
   `e2e/critical-path.spec.ts` submits and approves real data — running it
   against your real dev DB pollutes it (e.g. approving the Orientation
   assignment makes the E2E test's own submission-form assertions fail on
   the next run, since the form only renders when nothing's been
   submitted/approved yet). Set up via `.env.test` +
   `npm run test:e2e:setup`; `playwright.config.ts`'s `webServer.env`
   loads it and `reuseExistingServer: false` deliberately refuses to
   reuse an already-running dev server pointed at the real database.
7. **Better Auth session-switching risk, unverified.** `createUser()` in
   `modules/admin/user-actions.ts` originally called
   `auth.api.signUpEmail()` directly from a Server Action triggered by an
   existing admin session — flagged as a risk that this might switch the
   admin's own browser session to the newly created user (never
   independently confirmed either way in this conversation). A later pass
   (via Copilot, not verified in detail here) reportedly switched this to
   Better Auth's dedicated `admin` plugin API instead, which is designed
   not to create a session for the created user. **Worth confirming this
   is actually fixed**, not just reported fixed.
8. **`.gitignore` didn't exist until very late in this build.** If secrets
   were ever committed before it was added, they need rotating, not just
   removing from a future commit (history doesn't retroactively clean
   itself). Check `git log --all --full-history -- .env.local` once a
   repo actually exists.

9. **Stale generated Prisma client silently hit PRODUCTION (2026-09).**
   `schema.prisma` was changed from `env("LEARNING_DB_DATABASE_URL")` to
   `env("DATABASE_URL")` but `prisma generate` was never re-run, so the
   client in `node_modules/.prisma` kept reading the old variable, which
   `.env` set to the hosted Neon **main** (production) branch. Every
   "dev" script, import and read went to real trainee data while `.env`
   showed `DATABASE_URL=localhost`. Nothing looked wrong. Lessons: (a) the
   only trustworthy check is a live `SELECT current_database(),
   inet_server_addr()` through the same client the code uses; (b) after
   any `datasource` change run `npm run db:generate`; (c) there is one
   variable pair now, `DATABASE_URL` (pooled) + `DIRECT_URL` (direct), and
   `LEARNING_DB_DATABASE_URL` is retired (guards refuse it).
10. **Neon branch layout: main = production, dev, test.** `main` holds real
    trainee data and is written only by a deliberate, separately approved
    step with a fresh `pg_dump` first. `.env` -> **dev** (a copy of
    production for dry-runs and imports). `.env.test` -> **test** (wiped and
    reseeded by `npm run test:e2e:setup`). All branches share the database
    name `neondb`, so the **host** is the identity. Enforcement:
    `lib/db-targets.ts` (holds the production host, no credentials) is used
    by `scripts/db-guard.ts` (runs before every migrate/seed/import/studio
    and the `*:test` scripts), by `playwright.config.ts`, and as a runtime
    tripwire in `lib/db.ts` (production is reachable only from Vercel
    Production). Deliberate production import: `ALLOW_PRODUCTION_DB_WRITE`
    set to the production host, for that one run only. Vercel: Production
    -> main URLs; Preview -> **dev** URLs, never main. Note `prisma/seed.ts`
    is destructive (it `deleteMany`s lessons and assignments, cascading to
    progress and submissions): never run it anywhere that holds real data.

11. **Content importer contract (rewritten 2026-09).** `prisma/import-content.ts`
    loads `content-drafts/<module-slug>.md` for the 12 modules in
    `prisma/content-source.ts`. Every lesson declares its identity as
    `<!-- slug: stable-slug -->` on the line after its heading; the importer
    matches on slug, never title, so retitling is safe and renaming a slug
    is a new lesson. A lesson absent from its markdown is **archived**
    (`Lesson.archivedAt`; hidden, excluded from completion by
    `derive-module-state.ts`, progress kept), never deleted. `---` inside a
    code fence does not split; CRLF is normalised (`.gitattributes` forces LF
    anyway); duplicate slugs, a second assignment, malformed headings, an
    unknown module file/slug or a dangling `media-map.ts` key abort the whole
    import before any write. **Always run `npm run import:content -- --dry-run`
    first**: it writes nothing (its client throws on any write) and reports,
    per module, create/update/archive/untouched and which learners' completion
    would change. The markdown is the source of truth: imports overwrite
    admin edits. `prisma/seed.ts` no longer seeds lessons or assignments
    (the old seed deleted them, cascading to progress/submissions, and
    re-created retired lessons: the cause of the stale Orientation/CSS rows).

## Suggested first steps in Claude Code

1. Read this doc, then explore the actual repo state — don't assume
   everything above the "known open items" section is still accurate;
   confirm against real files.
2. Confirm git/GitHub status and finish that if incomplete.
3. Confirm the Better Auth admin-plugin fix (Gotcha #7) actually holds —
   test creating a user via `/admin/users` and check the admin session
   survives it.
4. Decide whether to do the full beginner-friendliness content audit
   (11 remaining modules) before or after first production deployment —
   both were left open at the same time in this handoff.