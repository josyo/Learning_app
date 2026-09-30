# Plan: rewrite the HTML Foundations module

**Status (2026-09-30):** outline **APPROVED with changes** (below). No lesson is written yet. The next step is **Stop point 2: write lesson 1 only**, review it with a subagent, score it, show it to the owner, and stop.

This file exists so a cloud session (fresh clone, no chat history) can continue. Read it fully, then read `CLAUDE.md` (especially "Remote working"), `docs/content-standard.md` and `docs/audits/orientation-assignment-and-html-foundations.md`.

Files involved: `content-drafts/html-foundations.md` (currently the old, never-imported 4-lesson draft: replace it), `content-drafts/mentor-notes/html-foundations.md` (new), `prisma/media-map.ts`, `prisma/content-source.ts` (`HELD_MODULE_SLUGS` / `MODULE_SLUGS`), `prisma/content-source.test.ts` (asserts html-foundations is held: update with the move).

## The learner

- Zero prior experience. Has just finished Orientation: VS Code, a PowerShell terminal, Node 22+, and an **empty `my-site` folder in Documents** (created in the Orientation assignment). Lesson 1 starts from it.
- Praise works on **Windows (Chrome)** and also reads lessons on an **Android phone**. Hands-on work happens on the computer. Windows is first-class; give macOS differences where they exist.
- Help channel is **WhatsApp**, same wording as the Orientation assignment (`content-drafts/developer-orientation.md`, "If you get stuck").
- Praise reaches this module right after the Orientation assignment, so this is urgent.

## Submission decision: GitHub through the website, no Git commands

Git is taught in module 5, so this module never uses git on the command line. Lesson 11 covers: creating a GitHub account (if needed), **email verification**, a possible **two-factor authentication** prompt, creating a **public** repository, and uploading files through the website ("Add file" then "Upload files"), including an `images` folder and re-uploading a changed file. One short paragraph says the Git module teaches the proper way later. The assignment is submitted as the repository link in the **GitHub URL** field, plus the reflection in **Notes**. **GitHub Pages (a live URL) is an optional stretch**, not required.

**Verify the current GitHub website wording for every button you reference** (fetch GitHub's docs, e.g. docs.github.com). If a label cannot be verified, describe the step without quoting button text and list it in your final summary.

## Approved lesson list (11 lessons, then the assignment)

Each lesson is <= 45 minutes including any video. All build on the same `my-site` folder.

| # | Title | Slug | By the end you can... | Time |
|---|---|---|---|---|
| 1 | Your first web page | `your-first-web-page` | create `index.html` in `my-site` from VS Code and save it; open it in Chrome from the terminal or File Explorer; change the text, save and refresh to see the change | ~30 min |
| 2 | Tags, elements and attributes | `tags-elements-and-attributes` | name the opening tag, content, closing tag and attribute of an element; write an `<h1>`, a `<p>` and a link to another website (absolute link); fix a missing closing tag | ~30 min |
| 3 | The skeleton of every page | `the-skeleton-of-every-page` | write a complete page (doctype, `<html lang>`, `<head>`, charset, viewport, `<title>`, `<body>`); say what each part does; create `styles.css` and link it from `<head>` | ~35 min |
| 4 | Checking your HTML | `checking-your-html` | paste a page into validator.w3.org ("Validate by Direct Input") and read the result; fix an error from its message; check every page from now on | ~25 min |
| 5 | Headings, paragraphs and lists | `headings-paragraphs-and-lists` | build a page with one `<h1>` and headings in order; write an unordered and an ordered list; choose between `<strong>` and `<em>` | ~30 min |
| 6 | Links between pages | `links-and-relative-paths` | link two of your own files with a relative path; link into and out of a subfolder (`pages/`, `../`); tell an absolute link from a relative one and predict which breaks when a file moves | ~35 min |
| 7 | Images and alt text | `images-and-alt-text` | put an image in an `images/` folder and show it with a relative `src`; write specific `alt` text; choose `alt=""` for a decorative image; **name files in lowercase with no spaces**; **get a photo from a phone to the PC**; **shrink a very large photo** | ~40 min |
| 8 | Page structure with landmarks | `semantic-html` (keep slug) | rebuild a `<div>`-only page with header, nav, main, section and footer; say what each landmark is for; give each `<section>` its own heading | ~35 min |
| 9 | Classes, ids and DevTools | `classes-ids-and-devtools` | add `class` to repeated items and `id` to one unique element; open Chrome DevTools and find an element in the **Elements** panel; explain when to use a class and when an id | ~30 min |
| 10 | Forms: labels and inputs | `forms-and-labels` (keep slug) | build a form with three labelled fields and one non-text input type; predict what happens on Submit (nothing useful yet, and why); tab through the form and click a label to check it works | ~40 min |
| 11 | Putting your site on GitHub | `putting-your-site-on-github` | create a GitHub account (with email verification and a possible 2FA prompt) and a public repository; upload `index.html`, `contact.html`, `styles.css` and an `images/` folder from the website; copy the repository link and re-upload a changed file | <= 45 min (split into two lessons if it will not fit) |

Notes on placement and order:
- The GitHub lesson is last: the learner has files worth uploading and the assignment's submit step is the very next thing. It also covers re-uploading a changed file, because the CSS module reuses the same repo and Git comes after CSS.
- The validator comes early (lesson 4) so every later lesson can end with "validate it" and the messages become a teaching tool.
- Keyboard and accessibility-by-hand checks ("Tab through it") are folded into lessons 7, 8 and 10. No CSS (`outline: none`) is used or advised.
- No lesson may refer to "a page you've built" before the learner has built one. Lessons 1-3 create their own pages.
- Reuse the slugs `semantic-html` and `forms-and-labels` (they exist in the database). The other old slugs (`forms`, `accessibility-basics`, `structuring-a-multi-section-page`) never reached the database. Old seed lessons that are not in the new markdown get archived by the importer.

### Approved changes to specific lessons

- **Lesson 7 (images):**
  - File names are **lowercase with no spaces** (`my-photo.jpg`). Explain that **Windows ignores upper/lower case in file names but GitHub Pages (and most servers) do not**, so `Photo.JPG` may work on the learner's PC and break online.
  - **Moving a photo from phone to PC:** WhatsApp Web, or emailing it to themselves. Verify current steps before writing; do not quote menu text you cannot verify.
  - **Shrinking very large photos** (phone photos are several MB). Pick a tool the learner already has on Windows if possible; verify its current wording; keep it short.
  - Provide a no-photo fallback (a small `.svg` created by pasting text) so a learner without a usable photo can still finish.
- **Lesson 11 (GitHub):** cover **GitHub email verification** (the emailed code/link) and a possible **two-factor authentication** prompt, and what to do if either appears. Verify wording. Warn that the username is public. This lesson is the most likely to overrun 45 minutes; split it if so.

## Assignment: Semantic Profile Page (keep slug `semantic-profile-page`)

About 3 hours, scaffold level 3, per `docs/content-standard.md` (assignment checklist A1-A10).

The learner builds a **two-page profile site** in `my-site`:
- `index.html`: header with a `<nav>` linking both pages; `<main>` with three `<section>`s (About, Interests, Projects); the Interests section has **three repeated items, each `class="card"`**; one image with specific `alt`; a footer.
- `contact.html`: same header/nav/footer, and a form with **three labelled fields, one of them a non-text type**, each with a `name` attribute.
- `styles.css`: empty (a comment only) but **already linked** from both pages.
- `images/` folder with one image.
- Both pages pass the W3C validator.

**The skeleton must be copy-paste text inside the assignment body: no downloads, no attachments.** Give each starter file as a code block the learner pastes into a new file in VS Code, with a step-by-step for creating the files and the `images` folder. Assignment body is rendered from markdown, shown to the learner and the mentor, and must work when read on a phone.

Personalization (A5): the topic, the image and the card contents must be the learner's own, plus a 3-5 sentence reflection pasted into Notes with the validator result. Help protocol uses the Orientation WhatsApp wording. Submit: repository link in **GitHub URL**, Notes with reflection; Deployed URL **optional** (only if they did the Pages stretch). At least one field required; resubmit follows "Changes requested". Mentor rubric in `## How this is reviewed`; feedback bank in `content-drafts/mentor-notes/html-foundations.md` (see `mentor-notes/developer-orientation.md` for the format). GitHub Pages is the stretch and is never referenced by the checklist or rubric.

## The CSS module: what it assumes, and what was changed (2026-09-30)

The CSS module (`content-drafts/css-responsive-ui.md`) builds directly on this assignment. It assumes: a saved profile page in a folder; a `<nav>` with links, header/main/footer; repeated items for a card grid; classes such as `.card` and `.nav`; the learner can link a stylesheet; the viewport meta tag; DevTools; and a repo the learner can update.

Minimal edits **already made** (do not redo, and do not change the CSS module further without asking the owner):
1. The CSS assignment's **deployed URL is now optional** (only if GitHub Pages was enabled), and it says to upload changed files through the GitHub website again.
2. CSS lesson 1 now says to **open the `styles.css` from HTML Foundations** in `my-site`.
3. The DevTools **Styles pane** and **device toolbar** steps now live in the CSS module (lessons 1 and 4). **HTML lesson 9 therefore teaches only the Elements panel** (right-click, Inspect, find the element). Do not teach the Styles pane or device toolbar here.

The CSS module's device-toolbar step tells the learner to add the viewport meta line "from HTML Foundations" if it is missing, so lesson 3 must teach `<meta name="viewport" content="width=device-width, initial-scale=1">` and lesson 3 / the skeleton must create and link `styles.css` (`<link rel="stylesheet" href="styles.css">`).

Import ordering: the CSS edits are only in the markdown. They reach learners when the CSS module is imported. Because they refer to files that the **new** HTML module creates, import the two modules **together** (dev first, then production via the workflow).

## Content rules (from the owner, keep all of them)

- Follow `docs/content-standard.md` and audit against it before writing. Score every lesson and the assignment.
- Must cover, at minimum: creating, saving and opening an `.html` file in the browser; document structure (doctype, html lang, head, meta charset/viewport, title, body); headings and paragraphs; links (absolute and relative); images with relative paths and meaningful alt text; lists; semantic page structure (header, nav, main, section, footer); forms with properly labelled inputs (say clearly that **nothing happens on submit yet**, since that needs later modules); checking a page with the W3C validator (validator.w3.org, "Validate by Direct Input").
- Modern, standards-correct HTML. Accessibility built in from lesson one. No deprecated elements, no layout via `<br>` or tables.
- **Every code example must be complete and runnable as-is.** Create each one in a scratch folder, validate it with `npx html-validate`, then delete the scratch folder.
- Links: MDN first. Videos only if verified to exist and fit; otherwise no video, and list it in the final summary. **Never invent URLs.** Update `prisma/media-map.ts` to match.
- Avoid "just", "simply", "obviously", "easy".
- Every lesson declares its slug on the line after its heading. Body order per the standard (`## Why this matters` ... `## Recap`).
- Windows is first-class, macOS differences noted. Help channel: WhatsApp.

## Process

1. ~~**Stop point 1: outline.**~~ Done and approved (this file).
2. **Stop point 2: first lesson.** Write **lesson 1 only**. Then spawn a subagent to play a zero-experience learner: give it **only the lesson markdown**, have it list every point where it would be confused, stuck or forced to guess, and attempt the check-for-understanding questions. Fix what it finds, score the lesson against the standard yourself, and show the owner the **full lesson plus scores**. **Then STOP** and wait for approval.
3. **After the owner approves lesson 1:** write the remaining lessons the same way (subagent review and scoring for each, no stopping), then the assignment and the mentor-notes file. Then:
   1. Move `html-foundations` from `HELD_MODULE_SLUGS` back into `MODULE_SLUGS` (`prisma/content-source.ts`) and update `prisma/content-source.test.ts`.
   2. **In the cloud session (test branch only, `ep-green-bread-aue0kwbf`):** run `npm run test:e2e:setup` (resets, seeds, imports) and show the importer output; run the unit tests and `npm run test:e2e`. This proves the markdown parses and imports cleanly on seeded data. It is not a check against real learners.
   3. **Dry-run against DEV** is done by the **owner**, through the "Import content to dev" workflow (`dry_run` on) on the pushed branch: a cloud session has no dev credentials. Tell the owner the branch name and what to expect: the new lessons created or updated, any old seed lessons for this module archived, and **no learner-state changes**. Include the CSS module. After the owner reports the dry-run is as expected and asks for it, they run the real dev import and check Praise's view with `scripts/verify-learner-view.ts` themselves (it needs real learner data).
   4. Commit on a **branch** and push the **branch** (never `main`; see CLAUDE.md "Remote working"). **Do not touch dev or production.** The production import is a separate step the owner runs through the "Import content to production" workflow (from `main`, dry run first).
4. Final summary: what changed, lessons without video, anything that could not be verified (including any GitHub or phone-transfer wording).

Superseded: the original brief said "commit, do NOT push". With cloud sessions, work must be pushed to a branch to survive the session, so **push the branch, never `main`**.
