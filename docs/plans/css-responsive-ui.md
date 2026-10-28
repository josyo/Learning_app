# Plan: rewrite the CSS & Responsive UI module

**Status (2026-10-29): outline APPROVED by the owner (2026-10-28/29). Lesson 1 is WRITTEN and awaiting the owner's review; lessons 2-10, the assignment and the mentor notes are not started.** `content-drafts/css-responsive-ui.md` now holds ONLY lesson 1 under a "do not import" comment (the old four lessons are gone from the draft; they are still in git history and in the databases). Step 1 is still only partly done: after the owner reset dev from `main`, the dev data is unchanged (see "Step 1 evidence"), so time estimates and the HTML fix list stay provisional.

**Owner decisions (approved):** Grid is dropped as a lesson (assignment stretch only); two Flexbox lessons; the Deployed URL is required, with the four Pages conditions below. **Additions requested with the approval, now part of the outline:**
- Lessons 1 and 10: a "my CSS change doesn't show" section. Lesson 1 has it (Common mistakes 1: saved, right file, file loaded, crossed-out line, then hard refresh Ctrl+Shift+R / Cmd+Shift+R). Lesson 10 repeats it for the live site and adds the delay before GitHub Pages shows an upload (wording to verify on docs.github.com).
- Lesson 8: `max-width: 100%` (with `height: auto`) for images, because the assignment's image has `width="300"`.
- Units (`px`, `rem`, `%`) at beginner level in lessons 4 (typography) and 5 (box model).
- Lesson 4: check text contrast with Chrome DevTools (colour picker contrast ratio; wording to verify).

Read with: `CLAUDE.md` ("Remote working"), `docs/content-standard.md`, `docs/plans/html-foundations.md` (the model for this pipeline), `content-drafts/css-responsive-ui.md` (the current, old-style module), `content-drafts/html-foundations.md` (what the learner built).

Files this rewrite will touch: `content-drafts/css-responsive-ui.md` (replace), `content-drafts/mentor-notes/css-responsive-ui.md` (new), `prisma/media-map.ts` (the four CSS entries, see below). No schema or importer change.

## Step 1 evidence (dev branch `ep-noisy-pond-auxnlxg5`, read-only, identity verified live)

**Rerun 2026-10-29 (after the owner reset dev from `main`).** Endpoint unchanged (`ep-noisy-pond-auxnlxg5`, checked in `.env` and live with `neon.endpoint_id`). The compute had just restarted. **The data is identical to the first run:** newest `lesson_progress` 2026-10-20, 14 progress rows, zero `submission`, `submission_review` and `notification` rows, HTML lessons 6-11 and every CSS lesson without progress for the real trainee. The only session newer than 10-20 belongs to the seed learner (2026-10-28, probably the E2E warm-up). Two `module_override` rows exist, both created 2026-10-06 (probably how the trainee reached HTML without an Orientation submission). So either the reset did not pull newer data, or `main` itself holds nothing newer. The trainee's HTML submission, reviews and later timings are therefore **still not available**, and the calibration and HTML-fix list below are unchanged. Next step for the owner: confirm in the Neon console when dev was last reset and from which parent, and whether production holds the trainee's later activity (for example by looking at the trainee's progress page in the app).

**What the dev copy holds.** Latest `lesson_progress` update and latest session: 2026-10-20. Zero rows in `submission`, `submission_review` and `notification`. So it was copied from production before the trainee finished HTML, and it carries no submission history at all (not even Orientation's). It cannot answer: the Notes and validator results, the GitHub URL, mentor comments, or timings for HTML lessons 6-11. Production was not queried (no credentials, and the rules forbid it).

**What it does show** (completion timestamps only; there is no "started" timestamp, so a gap between two completions is an upper bound that includes any break):

| HTML lesson | Estimate | Gap since previous completion | Ratio |
|---|---|---|---|
| 1 Your first web page | 35 min | n/a (completed 2026-10-13) | n/a |
| 2 Tags, elements, attributes | 30 min | 7 days after lesson 1 | unknown |
| 3 Skeleton of every page | 35 min | 40 min | 1.14 |
| 4 Checking your HTML | 30 min | 35 min | 1.17 |
| 5 Headings, paragraphs, lists | 30 min | 37 min | 1.23 |

Reading: on the three measurable lessons the estimates ran 14-23% short. That is three data points, so the calibration used below is a rule of thumb: **a stated "N min" lands near 1.2 x N**. The 7-day gap between lessons 1 and 2 has no explanation in the data (availability, or lesson 1 itself?). It needs a question to the mentor or the trainee. Lessons 2-5 on 10-20 were done in one sitting of about 2 hours, so the pace once started is steady.

**Still needed from the owner** (any one of): refresh the dev branch from production (a dev write: the owner's OK and the owner's hand), or paste/export for the real trainee: the CSS lesson progress, the HTML assignment submission(s) (GitHub URL, Notes, status), the review comments, and the HTML lesson completion times for lessons 6-11. The read-only script is in the session scratchpad and can be rerun in minutes. Also needed: whether the trainee's repository is public (only then can its file structure be read), and **where the trainee is in the old CSS lessons right now** (see "Risk: the trainee is mid-module").

## Step 2: audit of the current CSS module

Scored against `docs/content-standard.md` (lesson max 28, assignment max 20). Pass needs no 0s, all star criteria = 2, and >= 85%. All five items fail.

| Item | Score | Star criteria failing |
|---|---|---|
| Lesson 1 The Box Model & Selectors | 6 / 28 | L1, L3, L6, L7, L8, L9, L12, L14 |
| Lesson 2 Flexbox | 5 / 28 | L1, L3, L6, L7, L8, L9, L12, L14 |
| Lesson 3 CSS Grid | 5 / 28 | same as lesson 2 |
| Lesson 4 Responsive Design & Habits | 6 / 28 | L1, L3, L6, L7, L8, L9, L12, L14 |
| Assignment Responsive Layout Upgrade | 4 / 20 | A1, A3, A4, A5, A6, A8, A9 |

Why (passages named):
- **Old four-part template, no standard structure.** Every lesson is "Why this matters / core idea / Try it yourself / mistake". No `By the end you can` (L1), no `Before you start` or `Time` (L2), no Worked example / Guided practice / Your turn (L6), no check questions or Answers (L9, L10), no Recap or next-lesson link (L11), no `Last verified` (L14).
- **Steps (L7).** Only the DevTools additions in lessons 1 and 4 are numbered with `You should see`. Everything else is a paragraph ("Take the navigation section... and lay it out with Flexbox"). No Windows/macOS split, no recovery.
- **Mistakes (L8).** One unlabelled paragraph per lesson, no Symptom/Cause/Fix. Lesson 1's margin-collapse entry mixes parent/child with sibling margins and gives no observable symptom.
- **Terms (L3).** `selector`, `class`, `padding`, `margin`, `specificity`, `Flexbox`, `fr`, `media query` are used before or without definition. Lesson 1 opens a stylesheet with `*, *::before, *::after` and never explains `*` or `::before`. "it's just a rule" (lesson 1) uses a banned word.
- **Video (L12).** All four lessons point at the same freeCodeCamp "CSS Full Course" (`CSS_VIDEO` in `prisma/media-map.ts`), uncut: the exact thing L12 forbids. Lesson 1's only resource is the CodeSandbox homepage (L13: a homepage, not a specific page).
- **Assumes work not done (L14).** Lesson 2: "or add one if you don't have it yet". Lesson 3: "Rebuild your page's overall structure... instead of stacked `<div>`s with margins" (the HTML assignment has no stacked divs; it has header/nav/main/section/footer). Lesson 4 presents the device toolbar as "a real mobile viewport"; it is an emulation (no real address bar or touch).
- **Assignment.** Requirements are partly vague ("look intentional", "consistent spacing values reused, not one-off pixel values", "meaningfully improved") and unchecklisted (A3). No outcomes list O1..On (A1), no scaffold or starter (A4), no time or stretch (A7), the reflection is one prompt and not 3-5 sentences (A5), Submit omits Attachment URL, the one-field-required rule and the resubmit rule (A6), no help protocol (A8), no rubric (A9), no mentor notes file (A10).

What the module must set up for **later modules** (checked in `content-drafts/*.md`):
- **JavaScript Fundamentals** (next; "Builds on CSS & Responsive UI"): its assignment is **plain HTML/CSS/JS with a required deployed URL**, but Git (module 5) and Vercel (module 11) come later. Nothing before JS teaches the learner to get a plain site online. This is the strongest reason for the Pages lesson. Its DOM lesson says `querySelector` takes "any CSS selector" (`#id`, `.class`, `tag`), so the selectors lessons should name that bridge. Its assignment needs a loading state, a not-found message and a results area to look right, so the module should leave the learner able to style a state class and a disabled button.
- **React Foundations** uses `className="card"` and "a styled div"; **Next.js Core** asks for "a styled container". Nothing after CSS teaches where CSS lives in a React or Next project (the drafts never mention Tailwind or CSS Modules). Out of scope here; reported as a gap, not fixed.
- **Production Frontend Practices, lesson 3** teaches keyboard operability and focus. This module should leave the learner with visible focus and the habit of tabbing through a page, and with "style a real `<button>`, not a `<div>`".
- **Git & GitHub** reuses "any existing project repo". The `my-site` repo, updated by website upload until then, is that repo. **Capstone** expects "responsive UI" from this module.

## Step 3: proposed outline

Builds on the exact files HTML Foundations produced (assignment starter text): `index.html` and `contact.html` in `my-site`, each with `<link rel="stylesheet" href="styles.css">`; `styles.css` holds one comment; an `images/` folder. Hooks already in the markup: `header > p.site-name + nav.nav > ul > li > a`; `main` with `h1`, one `img` (`width="300"`), `section#about`, `section#interests` containing `div.card-grid > article.card` x3, `section#projects`; `contact.html` has `form > div > label + input/textarea` and a `button`; `footer > p`. **No HTML edit is needed for any lesson**, so every lesson works on the files as submitted. Update loop is GitHub's website upload (replace a file by uploading the same name), as taught in HTML lesson 11. Git stays a later module.

Rules carried over from the HTML plan: complete runnable examples (scratch folder, validate, delete), no invented URLs, no video unless verified (none proposed), `Last verified` honest, Windows first-class, WhatsApp help channel, no `outline: none` advised.

Stated times are what the lesson will say; with the 1.2 factor, expect about 35-50 min real time, so each stays <= 40 stated (L2 limit is 45 including video).

| # | Title | Slug | By the end you can... | Time |
|---|---|---|---|---|
| 1 | What CSS is and how a rule works | `what-css-is-and-how-a-rule-works` (new) **WRITTEN** | write a CSS rule in `styles.css`, save it and see it change `index.html`; name the selector, property and value and the declaration; open the Styles pane and switch one declaration off and on (the change lives only in the browser); fix a rule with no effect by checking the causes in order (saved, right file, file loaded, crossed-out line, hard refresh Ctrl+Shift+R) | ~35 |
| 2 | Selectors: element, class and id | `selectors-element-class-and-id` (new) | select by element, by class (`.card`) and by id (`#about`); style a link inside the nav with a descendant selector (`.nav a`); say when to use a class and when an id (and that JavaScript's `querySelector` uses these same selectors) | ~35 |
| 3 | The cascade and specificity | `the-cascade-and-specificity` (new) | predict which of two conflicting rules wins (later rule; class beats element; id beats class); use the Styles pane to find the crossed-out declaration and say why it lost; fix a rule that is being overridden without `!important` | ~35 |
| 4 | Colour and typography | `colour-and-typography` (new) | set text and background colour with hex values; choose a system font stack, `font-size` in `rem`, `line-height`; say what `px`, `rem` and `%` mean and choose between them; read the contrast ratio of a text/background pair in the DevTools colour picker and pick a pair that passes 4.5:1 | ~35 |
| 5 | The box model | `the-box-model-selectors` (reuse; retitle) | name content, padding, border and margin on a card; set `box-sizing: border-box` and predict an element's rendered width in `px`; choose `px`, `rem` or `%` for a width or a space and say why; use margin and padding to space the header, sections and cards | ~40 |
| 6 | Flexbox: the header and nav | `flexbox-for-one-dimensional-layouts` (reuse) | put the nav links in a row with `display: flex` and `gap`; put `.site-name` left and the nav right with `justify-content` and `align-items`; predict what `flex-direction: column` does to those two properties | ~35 |
| 7 | Flexbox: a wrapping row of cards | `wrapping-cards-with-flexbox` (new) | turn `.card-grid` into a row of cards that wrap with `flex-wrap`, `gap` and `flex: 1 1 <width>`; explain grow, shrink and basis in one sentence each; fix cards that overflow or squash | ~35 |
| 8 | Mobile-first, media queries and reusable values | `responsive-design-reusable-styling-habits` (reuse) | open the DevTools device toolbar at 375 px and find where the layout breaks; write mobile styles first and add one or two `min-width` media queries (header row, card row); make the image fit with `max-width: 100%` and `height: auto` (the assignment image has `width="300"` and overflows a 320 px screen); replace repeated colours and spacing with custom properties (`--space-2`, `--color-text`) | ~40 |
| 9 | Styling the form so everyone can use it | `styling-the-form-accessibly` (new) | size and space the labels, fields and button; give every link and control a visible focus style with `:focus-visible` (never `outline: none`); tab through both pages and tick off a keyboard-and-contrast checklist | ~40 |
| 10 | Publishing your site with GitHub Pages | `publishing-with-github-pages` (new) | turn on Pages for the `my-site` repository and open the live address in a private window and on a phone; change a file, re-upload it and see the live site update (including a forced refresh); say why a lowercase, relative-path site works online and `C:\` paths and capitals do not; fix "my change does not show on the live site" (wait for GitHub to rebuild, then hard refresh Ctrl+Shift+R) | ~35 |

Total stated: 365 min (about 6 h; about 7.3 h with the 1.2 factor). HTML Foundations was 385 min stated and was completed, so this is in range.

**Grid.** The brief's required list has no Grid. Recommendation: **drop the Grid lesson** and archive `css-grid-for-two-dimensional-layouts` (the importer archives it automatically; progress is kept). Grid is not needed by any later module, and the wrapping card row is done with Flexbox. Offer one Grid example as an assignment stretch. The importer sets `required: true` for every imported lesson (`prisma/import-content.ts`), so an "optional" Grid lesson is not possible without importer work; keeping it means a 35-min required lesson 11. Owner's call.

**Slug reuse.** Reused: `the-box-model-selectors` (lesson 5; the name now overstates "selectors", which only shows in the URL), `flexbox-for-one-dimensional-layouts` (6), `responsive-design-reusable-styling-habits` (8), and the assignment `responsive-layout-upgrade`. New slugs for 1-4, 7, 9, 10. Archived: `css-grid-for-two-dimensional-layouts` (and the two already-archived seed lessons stay archived). `prisma/media-map.ts`: the four `CSS_VIDEO` entries and the `CSS_VIDEO` constant are **removed (done with lesson 1)** because the importer aborts on a key that matches no lesson and `validate:content` would fail. No video is proposed unless a specific, verified clip is found. **Still to do when lessons 5, 6 and 8 reuse their old slugs:** add `resources: []` for each, otherwise the importer leaves the old CodeSandbox link on the existing rows (it manages resources only for slugs that have a `resources` list).

### Assignment: Responsive Layout Upgrade (retitle "Style and Publish Your Profile Site"), about 3 h, scaffold level 3

- **Module outcomes assessed:** O1 write rules with element, class and id selectors and predict which wins; O2 set readable colour and type with measured contrast; O3 space elements with the box model; O4 lay out the header and cards with Flexbox; O5 make the site mobile-first with `min-width` media queries, checked at 375 px; O6 style the form with visible focus and enough contrast, checked by keyboard; O7 find and toggle a rule in DevTools; O8 publish with GitHub Pages and update it.
- **Scaffold (level 3):** a commented starter `styles.css` pasted from the assignment (sections: box-sizing, `:root` custom properties with `TODO` values, type, header/nav, cards, form, one marked media-query block). No download. The HTML is untouched.
- **Personalised (A5):** the learner's own palette and font choice, their measured contrast ratios pasted into Notes, their own 375 px screenshot (uploaded to a `screenshots/` folder in the repo as in HTML, link in Attachment URL), their own live address, plus a 3-5 sentence reflection from three prompts.
- **Submit:** GitHub URL (repo), **Deployed URL required** (the live Pages address), Notes (contrast values, reflection), Attachment URL (screenshot, optional); resubmit follows "Changes requested".
- **Acceptance (about 9 yes/no items):** live URL opens in a private window; no `TODO` left; header nav uses Flexbox; cards wrap with Flexbox; at 375 px there is no horizontal scrollbar; at least one `min-width` media query; every link and form control shows a visible focus ring when tabbed; body text contrast >= 4.5:1 (value in Notes); no `outline: none`; reflection present.
- **Mentor review** is easier with a live URL: a mentor can open it on a phone, whereas source on GitHub shows nothing visual. Rubric, help protocol (WhatsApp wording from Orientation) and `content-drafts/mentor-notes/css-responsive-ui.md` follow the HTML pattern.
- **Stretch (not referenced by checklist or rubric):** a Grid version of the card row; a hover style; `prefers-color-scheme: dark`.

### Does the GitHub Pages ending fit? Yes, with four conditions

1. **It fills a real gap.** The JavaScript module's assignment requires a deployed URL, and nothing before it (Git is module 5, Vercel module 11) teaches how to get a plain site online. The CSS finish is the natural place.
2. **Making the Deployed URL required needs a fallback.** If Pages fails for an account reason, the learner is blocked from approval. The help protocol covers it (`STUCK` in Notes); the mentor can approve the code part with a note.
3. **A live site is public in a way a public repo is not** (searchable). The lesson must say: first name only, no phone number, address, school or workplace, and a photo only if the trainee is comfortable with it being public.
4. **Wording is unverifiable here.** The GitHub Pages settings wording must be checked against docs.github.com at writing time (the HTML stretch text was explicitly "written from memory"). Anything unconfirmed gets described without quoting button text and listed in the final summary.

It also gives a real-phone check (the trainee reads on an Android phone): open the live address on it, which the device toolbar cannot replace.

### Risk: the trainee is mid-module

The brief says the trainee is **now in CSS**. If they have started or finished old lessons 1-4 in production, importing this rewrite changes content under them: reused slugs keep progress on changed lessons, new slugs show as not started, the archived Grid lesson disappears. The importer's dry-run reports exactly which learners' completion would change. Decision needed before any import: finish the old CSS content first and apply the rewrite after, or import when they are between lessons. The learner-facing app must keep working throughout (CLAUDE.md, gotcha 12).

### HTML Foundations fixes suggested so far (LIST ONLY, nothing edited; provisional until Step 1 data arrives)

1. **Time estimates.** Lessons 3, 4 and 5 ran 14-23% over (n=3). Candidate: raise to 40, 35, 35 and re-check lessons 1, 2, 6-11 once their timestamps are available.
2. **Remove the HTML assignment's GitHub Pages stretch** ("written from memory and not verified"). The CSS module now owns publishing; two versions of the instructions will conflict. Replace with one line pointing forward.
3. **Clear the "not yet run on Windows or macOS" disclaimers** in all 11 lessons and the assignment, and set real `Last verified` dates, once the owner confirms which steps needed correcting (the trainee has run it on Windows). This is what moves criterion L14 from 1 to 2.
4. **Investigate the 7-day gap between lessons 1 and 2** (cause unknown); if it was lesson 1's Windows steps (`start chrome "$PWD\index.html"`), fix them first.
5. **Check Notes / reflection / mentor comments** (not available) for any lesson-specific trouble, and the mentor-notes file against the comments the mentor really wrote.
6. No HTML change is needed for CSS: the markup already carries every hook this plan uses. (`<img width="300">` can overflow a 320 px screen; lesson 8 handles it in CSS.)

## Decisions needed from the owner

1. Approve, or change, the outline (especially: Grid dropped, two Flexbox lessons, Deployed URL required).
2. Provide the missing Step 1 data (refresh dev from production, or export), and say whether the trainee's repository is public.
3. Where is the trainee in the old CSS lessons, and when may the rewrite replace them?

## Process after approval

Same as `docs/plans/html-foundations.md`: audit the outline against the standard; write **lesson 1 only**, run a zero-experience subagent review, score it, show the owner the full lesson and **stop**; after approval write lessons 2-10, the assignment and the mentor notes (subagent review and scoring each); update `prisma/media-map.ts`; `npm run validate:content`; owner runs "Import content to dev" with `dry_run` on; branch and PR only, never `main`; production import is a separate owner step.

## Lesson 1: review and score (2026-10-29)

`content-drafts/css-responsive-ui.md` holds lesson 1 only (marked "do not import"). `npm run validate:content`, `npm run typecheck` and `npm test` pass (178 tests). Every rule and every failure case was run in Chromium 153 on Windows 10 (Playwright, Chrome's own style data), the starter pages were validated with html-validate, and the CSS with csstree-validator. Two facts found that way and used in the text: a missing semicolon drops **both** lines (not one), and a missing `}` swallows the **next** rule.

**Zero-experience subagent review** (given only the lesson text). Fixed: the Windows-only terminal command for opening Chrome (replaced by File Explorer "Open with"), "dot vs x" explained, step 5 split (copy, paste, save), the Styles pane and checkbox described more exactly, the long "Last verified" jargon removed, outcomes and Why now define their terms, `text-align` and `color` vs `background-color` explained, colour list repeated for "Your turn", assumptions about the learner's pages stated, a misspelled colour name added as mistake 5, Q5 changed to `centre` (it duplicated mistake 4), time raised from 35 to 40 min (reviewer estimated 45 min if all goes well, 60-90 for a true first-timer, much of it the terminal step now removed). Not fixed, by design: no screenshots (the platform has no image hosting; the Styles pane is described in words), "where to type `*` and `/`".

**Score (lesson checklist, max 28): 26 / 28 = 93%.** All 2 except: **L11 = 1** (the Next link points at `selectors-element-class-and-id`, which does not exist yet; verify when lesson 2 is written) and **L14 = 1** (star criterion: the Chrome DevTools wording, the per-line checkbox and the Ctrl+Shift+R shortcut have not been run on a real Windows or macOS desktop, the same position as HTML lesson 1). So the lesson **does not pass until L14 is 2**: the trainee, who is on Windows, can test it and the owner can then update `Last verified`. L13 = 2 (two verified official pages, in `prisma/media-map.ts`: MDN "What is CSS?" and Chrome "View and change CSS"; the Chrome page does not mention the per-declaration checkbox).

**Rules carried into lessons 2-10:** no terminal commands for opening pages (File Explorer "Open with" only); state which parts of the learner's HTML a task relies on and what to do if theirs differ; put the British spelling traps in the mistakes (`colour`, `centre`); define every term before or where it first appears, including in the outcomes; one gesture per step.
