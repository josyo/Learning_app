# Audit: Orientation assignment and HTML Foundations

Audited against `docs/content-standard.md` on 2026-09-29. Nothing was edited: no content, importer or schema changes. Database access was read-only (`findMany` and one `SELECT current_database()`).

> **Correction (2026-09-29, later):** an earlier version of this line said the queries ran against `localhost:5432/dev_learning_platform`. That was wrong. `.env` says `DATABASE_URL=localhost`, but the **generated Prisma client in `node_modules` is stale**: it was generated when `schema.prisma` read `env("LEARNING_DB_DATABASE_URL")`, so it ignores `DATABASE_URL` and connects to the hosted **Neon database `neondb`** (`.env` line 3). Every query, learner figure and "DB" reference in this report comes from Neon. The local Postgres service (`postgresql-x64-18`) is stopped and refuses connections, so the localhost database was not used.

## 0. Sources and method

| Item | Source |
|---|---|
| Orientation assignment | DB `assignment` row `environment-check`. Identical text to `content-drafts/developer-orientation.md` ("## Assignment: Environment Check"). One version only. Its 7 lessons are byte-identical to the draft; read for context only. |
| HTML **SEED** | DB `lesson` rows `semantic-html`, `forms-and-labels`; DB `assignment` `semantic-profile-page`. Matches `prisma/lesson-content-data.ts` and `prisma/assignment-content-data.ts` as read. |
| HTML **DRAFT** | `content-drafts/html-foundations.md` (4 lessons + assignment). Never imported. |
| Links and videos | `prisma/media-map.ts` has **no HTML Foundations entries**, and the draft contains no URLs. There is nothing to load-test, so nothing is marked "unverified". |
| Learner evidence | `Submission`, `SubmissionReview`, `LessonProgress`, `ModuleOverride`, `Enrollment`, `User`. Statuses in §6 are derived by reading `get-enrolled-path-state.ts` and `compute-module-statuses.ts`. They were not observed in the running app. |

Scoring conventions: a bold-line pseudo-heading (`**The core idea**`) counts as a section. Where nothing exists that could violate a criterion (no links, no video), it scores 1, except L12 which scores 2.

## 1. Score summary (all FAIL)

| Item | Score | Fails ★ criteria |
|---|---|---|
| Orientation assignment "Environment Check" | 7 / 20 | A1, A3, A5, A6, A8, A9 |
| SEED · Lesson 1 Semantic HTML | 10 / 28 | L1, L3, L6, L7, L8, L9, L14 |
| SEED · Lesson 2 Forms and labels | 10 / 28 | same |
| SEED · Assignment "Semantic profile page" | 4 / 20 | A1, A3, A5, A6, A8, A9 |
| DRAFT · Lesson 1 Semantic HTML | 9 / 28 | L1, L3, L6, L7, L8, L9, L14 |
| DRAFT · Lesson 2 Forms | 9 / 28 | same as Lesson 1 |
| DRAFT · Lesson 3 Accessibility Basics | 8 / 28 | L1, L3, L6, L7, L8, L9, L14 |
| DRAFT · Lesson 4 Structuring a Multi-Section Page | 9 / 28 | same as L3 |
| DRAFT · Assignment "Semantic Profile Page" | 6 / 20 | A1, A3, A5, A6, A8, A9 |

Reading the scores: the seed lessons are outlines (objectives and a takeaway, with no teaching). The draft is real teaching prose but lost the objectives and check questions, and neither version has steps, recovery paths, time estimates or help routes.

## 2. Orientation assignment: "Environment Check" (DB = draft)

| # | Score | Justification (`Environment Check`, DB record) |
|---|---|---|
| A1 ★ | 1 | Four requirements cover lessons 2, 4 and 5 (VS Code, `node -v`, `npm -v`, integrated terminal). No `O1…On` list. Nothing assesses lesson 4's `pwd/ls`, lesson 3's file explorer, lesson 6 (reviews) or lesson 7 (folders). |
| A2 | 1 | "Requirements" is realistic (a real dev-machine check). No `Builds on / Feeds into`. Produces nothing later modules reuse, though HTML Foundations next needs a working folder and file. |
| A3 ★ | 1 | 4 yes/no bullets, but no `- [ ]`, and "opened a terminal inside VS Code at least once" cannot be verified by the mentor: nothing in "What to submit" evidences it. |
| A4 | 1 | Position 1 of 12, so level 3 applies. There is no template for the Notes paste, but the lessons carry the steps. |
| A5 ★ | 1 | `node -v` output is machine-specific (one personal element). The closing "If anything… didn't make sense, say so" is a prompt, not a required 3–5 sentence reflection. |
| A6 ★ | 1 | "In the notes field: paste…" matches `Submission.content`. Correctly says no repo needed. Does not say at least one field is required, which the server enforces, or where a screenshot link goes, or the resubmit rule. |
| A7 | 1 | No time estimate. No stretch goals, so nothing is mixed in. |
| A8 ★ | 0 | No trigger, channel or what-to-include list. "Say so here directly" (What to submit, bullet 2) can only be sent *after* finishing, so a learner blocked at `node -v` has no route. |
| A9 ★ | 0 | No approve / request-changes conditions. |
| A10 | 0 | No `content-drafts/mentor-notes/` directory exists. |

L3 and L14 checks: no banned words. There is no minimum Node version: "a real version number" is vague. The platform's own `package.json` depends on `next ^15.1.0`, which needs a recent Node (my recollection is 18.18+; not fetched, so unverified), and the media-map's Next.js video is a "Next.js 16" course.

**Stuck with no recovery:**
1. **Windows PowerShell blocks `npm`.** VS Code's default Windows terminal is PowerShell. A very common failure is `npm : File …\npm.ps1 cannot be loaded because running scripts is disabled on this system`. The Node lesson's only remedy is "close and reopen your terminal", so `npm -v` (required by the assignment) can fail with no fix in the module. Stated from general knowledge and not reproduced here. The maintainer's machine is Windows, so it is likely to apply.
2. `node -v` prints "not recognized" after install: only the reopen-terminal fix is given. The "installed but not on PATH, reboot/reinstall" path is absent.
3. No fallback if the integrated terminal opens in a different shell than the lesson's `pwd`/`ls` assumes (out of scope; context only).

## 3. HTML Foundations: SEED version (database)

### 3.1 Scores

Criterion order L1…L14. Both lessons are `## Learning objectives / Why this matters / one topic section / Quick check / Key takeaway`.

| # | Lesson 1 `semantic-html` | Lesson 2 `forms-and-labels` |
|---|---|---|
| L1 ★ | 1: `## Learning objectives` has 4 bullets, but uses *explain / understand / improve*, and no task exercises any. | 1: *build / connect / use / validate* are observable, but no task exercises them. |
| L2 | 0: no prerequisites, no time. | 0 |
| L3 ★ | 0: no term is bold or defined (*semantic, assistive technology, element, generic wrappers, accessibility*). Zero banned words. | 0: *label, input type, validation, placeholder, field, backend* undefined. |
| L4 | 1: `## Why this matters` is abstract ("communicates structure to browsers, assistive technology…"), no concrete situation. | 1: "the product fails even when the backend is fine" has no scenario. |
| L5 | 2: sections are 1 idea and under 60 words. | 2 |
| L6 ★ | 0: no example, guided or independent task. | 0 |
| L7 ★ | 0: no steps. Never says how to create, save or open an `.html` file. | 0 |
| L8 ★ | 0: no mistakes section. | 0: `## Common rules` lists rules, not symptoms or fixes. |
| L9 ★ | 1: one `## Quick check` question, no Predict / Spot-the-bug, **no answer**. | 1: same shape. |
| L10 | 0 | 0: never revisits Semantic HTML. |
| L11 | 1: a one-line `## Key takeaway`, no recap per outcome, no next link. | 1 |
| L12 ★ | 2 (vacuous): no video and no dependence on one. The lesson cannot stand alone for other reasons (see L6/L7). | 2 (vacuous) |
| L13 | 1: no links; an MDN pointer is missing where obviously needed. | 1 |
| L14 ★ | 1: no code examples, no verified date. Facts are correct. No `<section>` mentioned though the assignment needs it. | 1 |
| **Total** | **10 / 28** | **10 / 28** |

### 3.2 Seed assignment "Semantic profile page" (`semantic-profile-page`)

| # | Score | Justification |
|---|---|---|
| A1 ★ | 0 | No outcomes. Requires `alt` text, heading levels and `<nav>`/`<footer>`, **none of which either seed lesson teaches** (DB dump has no mention of alt, `<img>`, `<h1>` or headings). |
| A2 | 1 | Realistic, small, buildable. CSS reuses it (its Try-it says "Open your semantic profile page"), but the assignment never says so. |
| A3 ★ | 1 | 4 requirements, not checklist-shaped; vague: "semantic elements throughout", "appropriate heading levels", "properly associated". |
| A4 | 0 | No starter file, no skeleton, in module 2 of 12. |
| A5 ★ | 0 | "short personal or project profile": a generated page would pass; no reflection. |
| A6 ★ | 1 | "A GitHub repo link", "A deployed URL" map to fields but present the optional Deployed URL as required, omit Notes and the at-least-one-field rule. |
| A7 | 1 | No time; no stretch. |
| A8 ★ | 0 | none |
| A9 ★ | 0 | none |
| A10 | 0 | none |
| **Total** | **4 / 20** | |

### 3.3 Seed: terms used before defined
Lesson 1: *semantic HTML, browsers* (as agents), *assistive technology, element/tags* (nav, main, article, aside, header, footer named without saying what a tag is), *generic wrappers, accessibility, maintainability*. Lesson 2: *form, label, input, input type, placeholder, validation, backend, accessible*. Assignment: *static page, alt, repo, deployed, GitHub Pages / Vercel / Netlify, CSS frameworks*.

### 3.4 Seed: beginner stuck-points with no recovery
1. **Nothing teaches the mechanics of an HTML file:** create a file, name it, save it, open it in a browser, see a change. Neither lesson has one step.
2. **`<img>`, `alt`, heading levels, `<footer>` are assessed but not taught** (§3.2, A1).
3. **A GitHub repository and a deployed URL are demanded** ("pick whichever you find simplest") with no lesson on creating a GitHub account, uploading files, or enabling Pages. Git & GitHub is module 5; Orientation never mentions GitHub. The learner cannot submit as written.
4. Both lessons lack answers, so the learner cannot check understanding alone.

### 3.5 Seed: factual / outdated issues
No incorrect statements. Gaps rather than errors: no `<section>`, no `<h1>` rule, no `lang`/`<title>`/`<meta viewport>` (needed for CSS module), and "validate with user-friendly patterns" is undefined (HTML `required`/`type`, or JavaScript?).

## 4. HTML Foundations: DRAFT version (`content-drafts/html-foundations.md`)

### 4.1 Scores

| # | L1 Semantic HTML | L2 Forms | L3 Accessibility Basics | L4 Multi-Section Page |
|---|---|---|---|---|
| L1 ★ | 0 no outcomes (the seed's objectives were dropped) | 0 | 0 | 0 |
| L2 | 0 | 0 | 0 | 0 |
| L3 ★ | 1: divitis glossed; *screen reader, markup, element, heading level* undefined. Banned: "not just appearance", "not just where it sits" (§9, §25). | 1: `for`/`id` explained; *validation, input, attribute, `required`, `name`* not. | 1: alt text and contrast defined; *focus, focus outline, ARIA, tab order* used raw. Banned: "a common and **easy** thing to miss" (§ Core idea, Color contrast). | 1: *markup, heading level* raw. |
| L4 | 1: names a consequence (non-mouse users), no scenario | 1: "Nearly every real product needs…" | 1: "A meaningful share of real users…" (no figure) | 1: "Real pages combine everything" is not a reason |
| L5 | 1: "The core idea" covers landmarks *and* heading hierarchy | 1: label association *and* input types | 1: four concepts in one section | 2 |
| L6 ★ | 1: skeleton with `...` placeholders is not a complete worked example; no guided | 1: complete form example; no guided | 0 | 0 |
| L7 ★ | 0: no numbered steps. | 0 | 0 | 0 |
| L8 ★ | 1: one mistake ("divitis"), no symptom text | 1: placeholder-as-label | 1: removed focus outline | 1: planning after coding |
| L9 ★ | 0 | 0 | 0 | 0 |
| L10 | 0 | 0 | 0 | 0 |
| L11 | 0 | 0 | 0 | 0 |
| L12 ★ | 2 (vacuous) | 2 | 2 | 2 |
| L13 | 1 | 1 | 1 | 1 |
| L14 ★ | 1: correct; no verified date; assumes an existing page ("Take a page you'd normally build out of `<div>`s") | 1: `<form>` has no `action`, so clicking Send reloads the page with no explanation; "many screen readers won't reliably announce a placeholder" is overstated and unverified | 1: `outline: none` is CSS the learner has not met; no contrast ratio given (WCAG AA 4.5:1) | 1: teaches planning, no HTML |
| **Total** | **9** | **9** | **8** | **9** |

Headings: bold-line pseudo-headings render as paragraphs, so the lesson pages have no real headings for screen-reader or keyboard navigation (contrast with the standard's `##` rule).

### 4.2 Draft assignment "Semantic Profile Page"

| # | Score | Justification |
|---|---|---|
| A1 ★ | 1 | Requirements line up well with lessons 1–4 (semantic layout ↔ L1, form ↔ L2, alt/keyboard/focus ↔ L3, three sections ↔ L4), but no `O1…On` list and no tagging. *But `<img>` and `alt` authoring is never taught.* |
| A2 | 1 | Good deliverable, and CSS module builds directly on it. The assignment doesn't say "you'll style this next". |
| A3 ★ | 1 | 5 verifiable items ("exactly one `<h1>`", "at least three `<section>`s", "at least three fields") but "properly associated" and "appropriate" are vague. Not `- [ ]`. |
| A4 | 0 | No starter file, no skeleton (level 3 needed). |
| A5 ★ | 1 | "The content can be about you, a persona, or a project — what's being assessed is the structure" invites a generic answer. The notes prompt ("which section you'd improve first") is a one-sentence reflection. |
| A6 ★ | 1 | Names GitHub URL, deployed URL, notes; Deployed shown as required though the form marks it optional; no at-least-one rule; no resubmit rule; GitHub Pages "quick, free" but never explained. |
| A7 | 1 | No time; no stretch. |
| A8 ★ | 0 | none |
| A9 ★ | 0 | none |
| A10 | 0 | none |
| **Total** | **6 / 20** | |

### 4.3 Draft: terms used before defined
L1: *screen reader, search engine (as reader of markup), markup, divitis (glossed), heading level, element, tag, `<span>`*. L2: *input, attribute, `for`/`id` (explained by effect), `name`, `required`, validation, mobile keyboard, screen reader*. L3: *focus, focus outline, `outline: none` (CSS, untaught), ARIA, tab order, keyboard-only, decorative image*. L4: *markup, section order*. Assignment: *repository, deployed URL, GitHub Pages, `alt`, non-text input type*.

### 4.4 Draft: stuck-points with no recovery
1. **No mechanics** (create/save/open an `.html` file). Same as the seed.
2. **L1 and L3 "Try it" tasks assume work the learner has not done:** "Take a page you'd normally build…", "Tab through a page you've built…". No such page exists. Nothing says what to do instead.
3. **`outline: none` and colour contrast (CSS) appear before CSS is taught,** so the "never do this" advice is unactionable.
4. **GitHub + deploy requirement** (same blocker as the seed).
5. **No `<img>` lesson**, yet the assignment requires images with `alt`, and there is no image source or how-to.
6. **A form that "does nothing" on Send:** the learner will click the button, see a reload, and not know why.
7. **No "what you should see"** anywhere: a beginner cannot tell success from failure.

### 4.5 Draft: factual / outdated issues
- Nothing deprecated is used. `<div>`/`<span>`, `<section>`, `for`/`id`, `alt=""`, `type="email"` are current.
- "One `<h1>` per page" is sound practice (the multiple-`<h1>` outline algorithm was never implemented by browsers). OK.
- "Placeholder… many screen readers won't reliably announce a placeholder as the field's name": overstated; modern screen readers often fall back to the placeholder, but it is not reliable and vanishes on input. **Unverified as worded.**
- "Every input needs a `<label>`": correct as guidance. Missing but not wrong: `autocomplete`, `<fieldset>`, `action`/`method`.
- No good-practice violations presented as good.

## 5. Links and videos

`prisma/media-map.ts` contains **no entries** for the HTML module's slugs (`semantic-html`, `forms-and-labels`, or the draft's would-be `forms`, `accessibility-basics`, `structuring-a-multi-section-page`). The DB `videoUrl` is `null` and the `lesson_resource` list empty for both seed lessons. Neither version links anywhere. Result: **no link or video exists to test.** Adjacent finding: the module has no MDN links at all (L13 = 1).

## 6. Learner evidence (dev database, read-only)

### 6.1 Accounts
Five users: Admin, Mentor (seed), Joseph (MENTOR), and two learners. **"Trainee"** was created at seed time (2026-09-20 02:09) and looks like a seeded test account. **"Praise"** was created 2026-09-20 06:35 and enrolled 07:05, and is presumably the real trainee. Names are as stored, and this is my inference, not verified.

### 6.2 Submissions and reviews
**Zero `Submission` and zero `SubmissionReview` rows exist for either assignment** (also zero `Notification` rows). There is no resubmission or mentor-feedback data. The Orientation assignment has never been submitted.

### 6.3 Developer Orientation progress (LessonProgress)

| When (UTC) | Learner | Lesson | Gap |
|---|---|---|---|
| 09-21 14:16:00 / 14:16:09 | Trainee | `toolchain-basics`, `project-loop` (seed lessons) | 9 s apart: click-through, not reading |
| 09-22 06:43 | Trainee | Welcome | 6 min after the re-import (06:37) |
| 09-23 12:59 | Praise | Welcome | 3 days after account creation |
| 09-23 16:02 | Praise | VS Code install | +3 h 03 m |
| 09-23 16:15 | Praise | Finding your way | +13 m |
| 09-25 14:30 | Praise | Terminal | **+46 h** |
| 09-29 15:32 | Praise | How assignments work | **+97 h**, and out of order |
| 09-29 15:37 | Praise | **Installing Node.js** | +4 m 38 s |

Observations:
- **Praise has finished 6 of 9 required lessons and is not done with Orientation.** Not done: lesson 7 ("A tour of a real project's folders"), and the two orphan lessons `toolchain-basics` / `project-loop` (§7), which sit at the end of the module's lesson list.
- Longest gaps sit around the **Terminal → Node.js** stretch: 97 hours after the terminal lesson, the learner skipped ahead to lesson 6 and returned to the Node.js lesson five minutes later. That pattern is consistent with a stall at the Node install, but timestamps cannot distinguish a stall from time away. "Mark complete" is self-reported. **Unverified.**
- No mentor feedback exists, so no recurring feedback themes can be summarised.
- Praise has not reached HTML Foundations, so **no HTML evidence exists.**

### 6.4 HTML Foundations, current state
| | Trainee (test account) | Praise (presumed real trainee) |
|---|---|---|
| Lesson progress rows for the module | none | none |
| Override | `MARK_COMPLETE` by "Mentor", 2026-09-22 14:26 UTC, no note | none |
| Module status (derived) | **COMPLETED** (override) | **LOCKED** (Orientation incomplete; the lesson pages return `notFound()` for locked modules) |
| Unlocked because of it | **CSS & Responsive UI** (its only prerequisite is HTML). JavaScript needs CSS, so it stays locked. | nothing |

**Premise check:** the request describes the seed version as "the only version the trainee has ever seen". For Praise this cannot be true: the module is locked, and locked modules return `notFound()`. No account has any HTML lesson progress. The only account able to open the seed lessons is the test account, and nothing shows it did. Page views aren't logged, so "seen" is unknowable.

The Trainee is on CSS with **Orientation not complete** (progress on only the welcome lesson and the two seed orphans). The CSS module also carries orphans (§7.1), which the Trainee would also have to mark complete (§7.1).

## 7. Importer risk (`prisma/import-content.ts`)

Nothing was fixed. Function names refer to that file.

### 7.1 Renamed lesson leaves the old row required (`main`, `slugify`)
Lessons are matched by `slugify(title)`. A renamed title upserts a new row; the old one is bumped by the "existingLessons" loop to `order = 10_000 + i` and is never deleted. It keeps `required: true`, and `getEnrolledPathState` counts every required lesson (`pm.module.lessons.filter(l => l.required)`), so **a module completes only once the learner also marks these obsolete lessons complete**.
**This has already happened, twice, in the live DB:** `developer-orientation` still holds `toolchain-basics` (10000) and `project-loop` (10001), and `css-responsive-ui` holds `box-model` (10000) and `responsive-layouts` (10001). They will also appear as lessons 8 and 9 in the learner's list. **Correction:** an earlier version of this report said Praise's Orientation "cannot complete". That overstated it. The stale lessons are listed in the module and open normally, and `setLessonCompletion` has no check that blocks them, so Praise *can* click "Mark complete" on each. They are an obstacle (two obsolete lessons to tick, confusing right after the rewrite), not an impossibility. Same for the Trainee in CSS.
`prisma/cleanup-orientation-lessons.ts` does not fix this: it deletes slugs `your-toolchain` and `project-structure-tour`, which are not in the DB, so it is a no-op. It also cascades and deletes `LessonProgress`.
Related: renaming drops the `media-map.ts` entry, so `videoUrl` becomes `null` (`media?.videoUrl ?? null`).

### 7.2 First-time import of html-foundations next to the seed lessons
- `html-foundations` is **not in `MODULE_SLUGS`**, so `main` never looks at the draft, and prints no skip message either.
- If added, the loop behaves as follows. Seed rows `semantic-html`, `forms-and-labels` are bumped to 10000/10001. The draft's lesson 1 title "Semantic HTML" slugifies to the same `semantic-html`, so that row is **updated in place** (progress kept, back to order 0). "Forms" becomes `forms`, a **new row**, leaving seed `forms-and-labels` behind as an orphan at 10001 (§7.1). "Accessibility Basics" and "Structuring a Multi-Section Page" are new. Result: 4 real lessons + 1 stale required lesson.
- The assignment: `db.assignment.findFirst({ where: { moduleId } })` finds the seed row; the title "Semantic Profile Page" slugs to the same `semantic-profile-page`. It updates in place. Safe here, but instructions are overwritten under any existing submissions with no version history, so old submissions get re-read against new text (none exist today).

### 7.3 `---` inside a code fence truncates a lesson (`parseModuleFile`)
`raw.split(/\n---\n/)` is not fence-aware. A YAML front-matter sample, a Markdown example or a `---` divider in a code sample cuts the lesson there; the remainder becomes a separate block with no `### Lesson` heading, matches nothing, and is **silently dropped**. The run logs only the lesson count, which still looks plausible.

### 7.4 Second assignment block silently overwrites the first (`parseModuleFile`)
`assignment = { … }` is reassigned in the loop; the last `## Assignment:` block wins with no warning. The importer also updates whichever row `findFirst` returns, with no `orderBy`, so a module with two rows updates an arbitrary one.

### 7.5 Other risks
1. **Import overwrites admin edits.** `update` resets `title`, `content`, `order`, `required: true` and `videoUrl` from the file and map. Edits made in `/admin` (`edit-lesson-form.tsx`) are lost silently, and `required: false` is reverted.
2. **Order-collision crash on re-import.** The bump loop uses `db.lesson.findMany` with no `orderBy` and assigns `10_000 + i`. If a real lesson is visited before an existing orphan at 10000, the update collides with `@@unique([moduleId, order])`. Latent and order-dependent; not observed. There is no transaction, so a crash mid-module leaves lessons at 10000+ orders.
3. **CRLF line endings** (Windows editor or `autocrlf`): `/\n---\n/` no longer splits, the whole file is one block, `block.match` returns the first lesson, and every later lesson is merged into it. The files are LF today (0 CRs in the two drafts checked).
4. **Unanchored heading regexes:** `/### Lesson \d+ — (.+)/` and `/## Assignment: (.+)/` match anywhere in a block. Text in a lesson that quotes such a heading, or an assignment block that mentions "### Lesson 3 — …", is misclassified (lesson match wins first).
5. **Resources sync is one-way:** `if (media?.resources)` deletes and recreates only when the map has resources. Removing every resource from the map leaves the old ones in the DB, while removing a video nulls it.
6. **Slug quirks / collisions:** apostrophes produce ugly slugs (`a-tour-of-a-real-project-s-folders`, so in-body links break on any title edit), and two titles that slugify equally silently overwrite each other in one run.
7. **No dry run and no environment guard:** `PrismaClient()` uses whatever `DATABASE_URL` is loaded.
8. **`.env.test` targets the same database as the `DATABASE_URL` in `.env`** (both `localhost:5432/dev_learning_platform`, different user), contradicting CLAUDE.md gotcha #6. **Worse, that is not the database the code uses:** the stale generated client reads `LEARNING_DB_DATABASE_URL`, which `.env` sets to Neon and `.env.test` does not set. Prisma loads `.env` without overriding, so `test:e2e:setup` (seed + import) and Playwright's `next dev` would fall through to **Neon**, the real trainee data. Do not run E2E until fixed.
9. **Every remaining seeded module** (`git-github`, `react-foundations`, …) has seed lessons with different slugs from the drafts, so importing each will create more orphans exactly as §7.1.

## 8. Fix list

### (1) Blockers a beginner cannot get past
1. **Orphan required lessons** in Orientation (`toolchain-basics`, `project-loop`) and CSS (`box-model`, `responsive-layouts`). Praise and the Trainee must tick obsolete lessons to finish Orientation and CSS. Archive them (not delete, so progress survives), then prevent recurrence in the importer.
2. **GitHub and deployment required by the HTML assignment** (both versions) with no teaching and Git in module 5. Either move deployment out of module 2 (submit a `.zip`/screenshot link or code in Notes) or add a "Put your page on the internet" lesson with exact click-paths.
3. **No lesson on creating, saving and previewing an `.html` file.** It is the first thing a zero-experience learner needs, and it is missing from both versions and from Orientation.
4. **Assessed but not taught:** `<img>`/`alt`, heading levels, `<footer>`; the draft's L1/L3 "Try it" tasks assume an existing page.
5. **Windows PowerShell `npm` block** in Orientation (§2): add the fix and a fallback.
6. **`html-foundations` is missing from `MODULE_SLUGS`,** so the draft can't be imported at all. This is the importer change the rewrite depends on.

### (2) Quality gaps
- All ★ criteria failing across the board: outcomes (L1), defined terms (L3), worked → guided → independent (L6), exact steps with "you should see" (L7), symptoms and fixes (L8), check questions with answers (L9), verified date (L14).
- Assignments: outcomes map (A1), help protocol (A8), rubric (A9), personalization and reflection (A5), field-by-field submission text (A6), mentor comment bank (A10), starter scaffold (A4).
- No time estimates, prerequisites or MDN links anywhere. Add `## ` headings in place of bold pseudo-headings.
- Orientation assignment: state a minimum Node version; require evidence of the integrated terminal (e.g. screenshot link); add a reflection prompt and a real `Feeds into HTML` deliverable (create the profile-page folder).
- Importer safeguards (§7.3–7.5): fence-aware split, duplicate-assignment error, transaction, dry run, orphan report.

### (3) Polish
- Remove "not just", "easy". Rename slugs without apostrophes. Add real-scenario "Why this matters" openers. Clarify `type="email"` "free format hints". Fix `.env.test` database name.

## 9. HTML Foundations: is the breakdown right?

**Judgment: the topics are mostly right but incomplete and misordered, and the lessons are the wrong size.** The four draft lessons are each short, but each hides several concepts (L3 has four), while the true beginner prerequisites are absent.

**Missing:** how an HTML file works (tags, elements, attributes, the document skeleton with `<!doctype>`, `<html lang>`, `<head>`, `<title>`, `<meta charset>`, `<meta name="viewport">`); creating, saving and previewing a page; text elements (headings, paragraphs, lists, emphasis); links and images (`<a>`, `<img>`, `alt`, relative paths, folder for assets); `class` / `id` and generic `<div>`/`<span>` (CSS relies on them); tables are optional; browser DevTools (Elements panel) for inspecting; validating markup; publishing.
**Order:** the draft teaches accessibility habits and page structure before the learner can write a page; L3's focus-outline advice depends on CSS.
**Size:** L3 (four concepts) and L1 (landmarks + heading hierarchy) should split; L4 is a planning exercise, not a lesson, and becomes the assignment's starting step.

### Proposed outline (outline only)

| # | Lesson | By the end you can… | Keep from |
|---|---|---|---|
| 1 | Your first web page | create `index.html`, save it, open it in a browser, and change and reload it | new; use Orientation's VS Code lessons |
| 2 | Tags, elements and attributes | write a heading, paragraph and link; name the parts of an element | new |
| 3 | The skeleton of every page | write a page with `<!doctype>`, `lang`, `<title>`, charset and viewport, and explain what each does | new (CSS module needs it) |
| 4 | Text structure: headings, lists, links | build a document with one `<h1>`, ordered headings and a list of links | Draft L1 (heading hierarchy) |
| 5 | Images and alt text | add an image with a specific `alt`, and choose `alt=""` for decoration | Draft L3 (alt text) |
| 6 | Landmarks: header, nav, main, section, footer | rebuild a `<div>` page with landmark elements | Draft L1 (skeleton, divitis), Seed L1 pattern |
| 7 | Forms: labels and inputs | build a form with three labelled fields and one non-text `type`, and predict what the browser does on submit | Draft L2 (form example, placeholder mistake) |
| 8 | Checking accessibility by hand | tab through a page, spot missing focus and labels, and fix them | Draft L3 (keyboard, contrast); no `outline` CSS |
| 9 | `class`, `id` and inspecting a page | add classes to elements and inspect them in DevTools | new (CSS prerequisite) |
| 10 | Publishing your page | put the page online and paste the link into a submission | new; only if deployment stays in scope |
| A | Assignment: profile page | see §10 | Draft assignment requirements; Seed's "no CSS" constraint |

Keep from the **seed:** the objective verbs *choose meaningful elements / connect labels to inputs / use input types intentionally*; the "do not rely on placeholders alone" rule; the "no CSS frameworks" constraint. Keep from the **draft:** the concrete code samples, the four "why this matters" ideas, the mistakes (divitis, placeholder as label, removed outline, coding before planning), and the assignment requirements (1 `<h1>`, 3 sections, 3 labelled fields, alt text, keyboard use). Drop the seed's outline-only lessons and the draft's bold pseudo-headings and CSS-dependent advice.

Whether 10 lessons is too many depends on time estimates (each ≤ 45 min); lessons 1–3 could merge if measured under ~30 min.

## 10. What the next module assumes

Read from `content-drafts/css-responsive-ui.md` (imported, so live):
- **A saved profile page exists as a folder of files.** "Open your semantic profile page from HTML Foundations." Also, "rebuild its layout… same content".
- **It has a `<nav>` with links, a header, main, footer, and repeated items** (for the card grid; "any repeated content you have").
- **The learner can attach a stylesheet.** CSS lesson 1 says "Put this at the top of every stylesheet" but never shows how to create `styles.css` or add `<link rel="stylesheet" href="…">`. HTML must teach the `<head>` and link tag.
- **`<meta name="viewport" content="width=device-width, initial-scale=1">`** is needed for the responsive lesson's media queries to behave on phones. Never mentioned anywhere.
- **`class` and `id`:** all selectors use `.card`, `.nav`; "IDs… for JavaScript hooks and page anchors". Not yet taught.
- **The learner knows what an element and attribute are,** and can use browser **DevTools** ("toggle it off and on in dev tools", "phone-sized viewport in dev tools"). The curriculum description for Orientation lists "browser dev tools" but no Orientation lesson covers them.
- **A GitHub repo and a deployed URL already work:** the CSS assignment allows "the same repo as HTML Foundations" and needs a deployed URL. The learner must have done this once already.
- Later modules (JavaScript DOM lesson; forms in React) reuse ids, classes and form `name` attributes from this page. Not read in full here.

The rewrite should therefore end with a **single-folder `index.html` + `styles.css`-ready page** (classes on repeatable items, `<head>` complete, form with `name` attributes), plus a known-working way to preview and publish it.
