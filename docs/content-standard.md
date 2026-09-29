# Content Standard

The bar for every lesson and assignment. Audience: a learner with **zero programming experience**, mostly studying alone, with a mentor who reviews **asynchronously** (nobody is there to rescue a confusing step).

## Scoring

Score each criterion **0** (missing), **1** (partial, or a fixable defect) or **2** (every condition met). Any non-2 needs a one-line justification naming the passage. ★ criteria must be 2. **Pass** = no 0s, all ★ = 2, total ≥ 85%. `N/A` only where stated. If a criterion's conditions cannot be violated because the thing is absent (e.g. no links at all), score **1**, except L12 (no video and every step in the text = 2).

## What the platform does with your markdown

- **Split:** a module file is split on any line that is exactly `---`, but only outside code fences (``` or ~~~; a longer fence can contain a shorter one). CRLF is normalised. Anything malformed aborts the import with a list of problems instead of being dropped.
- **Lesson:** `### Lesson N — Title` (em dash), then, as the very next line, **`<!-- slug: your-stable-slug -->`** (lowercase, digits, hyphens). `N` is informational; order = position. The slug is the lesson's identity: retitle freely, never change a slug that learners have progress on. Slugs are unique across the whole path (`media-map.ts` is keyed by slug).
- **Removing a lesson archives it:** a lesson missing from the markdown is archived (hidden from learners, excluded from completion, progress kept), never deleted. Bringing the slug back un-archives it.
- **Assignment:** exactly one `## Assignment: Title` block per module (a second aborts the import), optional slug directive. Its body becomes `Assignment.instructions`, shown to the **learner and the mentor**.
- **The markdown is the source of truth:** an import overwrites title, content, order, video and `required` from the files and `media-map.ts`; edits made in `/admin` to imported lessons are lost. Preview any import with `npm run import:content -- --dry-run`.
- **Rendering:** `react-markdown` with GitHub-flavoured markdown (tables, `- [ ]` task lists, strikethrough) and **raw HTML disabled** (no `<details>`, scripts or comments). Images need external URLs.
- **Not stored anywhere:** module outcomes, time, rubrics, lesson prerequisites, verified dates.
- **Video/links:** only `media-map.ts`, keyed by lesson slug: one `videoUrl` (an iframe *above* the body) plus `{label, url}` resources. A key that matches no lesson aborts the import.
- **Submission** stores `githubUrl`, `deployedUrl`, `attachmentUrl` (URLs only, no upload) and `content` ("Notes", plain text). The server requires at least one of the four. Resubmitting is possible only after `CHANGES_REQUESTED`; attempts are kept. A review is a decision plus one plain-text `feedback` string.

| Concept | Lives in |
|---|---|
| Outcomes, time, prerequisites, last-verified | First lines of the lesson body |
| Module outcomes, scaffold, time, stretch, help, rubric | Assignment body |
| Mentor comment bank | `content-drafts/mentor-notes/<module-slug>.md` (never imported; learner-visible would spoil the task) |

## Lesson checklist (max 28)

Body order: `<!-- slug -->` line → header lines → `## Why this matters` → sections → `## Check your understanding` → `## Answers` → `## Recap`. Use `##` headings, never `### Lesson`.

| # | Criterion | 2 when |
|---|---|---|
| L1 ★ | Outcomes | `**By the end you can:**` has 2–4 bullets starting with an observable verb (create, run, open, fix, predict, list), none with understand/know/learn; each is exercised by a task or question. |
| L2 | Prerequisites, time | `**Before you start:**` names lessons/installs; `**Time:** ~N min`, N ≤ 45 including video; longer → split. |
| L3 ★ | Terms defined | Each technical term is **bold** with a plain definition in the same or next sentence at first use in the lesson. Zero *simply, just* (as "only"), *obviously, easy/easily, trivial, of course*. |
| L4 | Reason first | `## Why this matters` comes first, ≤ 80 words, names one concrete situation or consequence, before any theory. |
| L5 | Small sections | Each `##` section: one concept, ≤ 150 words of prose (code and steps excluded). |
| L6 ★ | Worked → guided → independent | Headings in order: `## Worked example` (complete, explained), `## Guided practice` (blanks or TODOs), `## Your turn` (goal + check only). |
| L7 ★ | Exact steps | Numbered, one action each, exact text/control named; `**Windows:**` / `**macOS:**` where they differ; each step has `You should see:` and, if it can fail, `If you see something else:` plus a next action. Screens are described (no image hosting). |
| L8 ★ | Common mistakes | ≥ 2 entries, each with `Symptom:` (verbatim error in a code block, or exact observable behaviour), `Cause:`, `Fix:`; at least one line says the error is normal. |
| L9 ★ | Check questions | 3–5, tagged `(Predict)`, `(Spot the bug)`, `(Recall)`; ≥ 1 Predict and ≥ 1 Spot-the-bug; `## Answers` follows with reasons. |
| L10 | Retrieval | ≥ 1 `(Recall — Lesson <title>)` question on an *earlier* lesson. N/A for the path's first lesson. |
| L11 | Recap, next | `## Recap`: 3–5 bullets, one per outcome; ends with a link `/learner/roadmap/<module-slug>/<next-lesson-slug>` (last lesson: `/…/assignment`). Slugs verified. |
| L12 ★ | Works without video | Every needed step is in the text; body never says "watch the video first/above"; `videoUrl` ≤ 15 min or cut with `?start=&end=` to ≤ 15 min; no full-course video reused across lessons. |
| L13 | Links | ≤ 3; official docs (MDN etc.) preferred; labels say what the page is; specific pages, not homepages. |
| L14 ★ | Correct, current, tone | `**Last verified:** YYYY-MM-DD on <OS + versions>`, ≤ 6 months old, every command run then. Examples model good practice (`alt` on every `<img>`, a `<label>` on every input, semantic elements). Second person; never "the learner"; nothing blames the reader; no step assumes work the learner has not done yet. |

## Assignment checklist (max 20)

Body order: `**Time**` / `**Scaffold**` / `**Builds on → feeds into**` → `## Outcomes assessed` → `## The task` → `## Acceptance checklist` → `## Submit` → `## If you get stuck` → `## How this is reviewed` → `## Stretch (optional)`. L3 and L14 apply too.

| # | Criterion | 2 when |
|---|---|---|
| A1 ★ | Outcomes mapped | Each module outcome listed as `O1…On`; each appears in a task part ("assesses O2") **and** an acceptance item; nothing assessed was untaught. |
| A2 | Small, realistic, buildable | One deliverable a developer would recognise, doable in the stated time; `Builds on:` and `Feeds into:` name modules (or "standalone" + reason). |
| A3 ★ | Spec and self-check | Task states inputs, behaviour, constraints; 5–10 `- [ ]` items, each a yes/no the learner can verify alone by doing something; none says "good", "clean" or "properly". |
| A4 | Scaffold fits position | `**Scaffold:**` level 3 (starter files: modules 1–3), 2 (skeleton + spec), 1 (spec only) or 0 (brief: capstone), and the material is really provided. |
| A5 ★ | Personalized + reflection | ≥ 2 required elements only the learner can supply (own topic and data, a value from their machine, their own screenshot link) plus a 3–5 sentence `Reflection:` from prompts in the assignment, pasted into Notes. |
| A6 ★ | Submission matches model | `## Submit` maps content to **GitHub URL**, **Deployed URL** (optional), **Attachment URL** (a link; says where to host a screenshot) and **Notes** (plain text); says at least one field is required and that resubmit follows "Changes requested". |
| A7 | Time and stretch | `**Time:** ~N h` (≤ 3 unless capstone); stretch under its own heading, never referenced by the checklist or rubric. |
| A8 ★ | Help protocol | Trigger (stuck > 20 min, or same error after 2 fixes), the named channel (the schema has none), and what to include: what you tried, copied error text, screenshot link, OS and versions, step number. |
| A9 ★ | Mentor rubric | `## How this is reviewed`: each acceptance item with `Approve if:` / `Request changes if:` (observable). Rule: all core met → Approve; minor gap → Approve with note; core gap → Request changes naming the items. Learner-visible on purpose. |
| A10 | Feedback bank | Mentor-notes file has ≥ 1 paste-ready comment per acceptance item plus ≥ 3 for likely mistakes; plain text, ≤ 80 words: what is right, what is wrong, exact fix, what to resubmit. |

## Proposed later (schema and importer unchanged)

- Fields: `Lesson.estimatedMinutes`, `Module.outcomes`, `Assignment.estimatedMinutes` and mentor-only `mentorNotes`.
- Rendering: a rubric panel beside the review form.
- Help: an in-app "ask for help" capturing OS, step and error text.
- Media map: `start`/`end` and multiple clips per lesson.
