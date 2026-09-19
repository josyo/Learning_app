# Module: Production Frontend Practices

*Authentication concepts, state choices, accessibility, performance, testing, environment variables, error handling. Builds on Data & Forms in Next.js.*

### Lesson 1 — Authentication Concepts

**Why this matters**

Almost every real application needs to know who's using it — this platform is a working example of exactly that, with roles, sessions, and protected routes. Understanding the concepts (not just copying a library) is what lets you actually reason about whether an app is secure.

**The core idea**

Three ideas that get confused with each other constantly, and are worth keeping distinct:

- **Authentication** — verifying who someone is (logging in).
- **Authorization** — deciding what they're allowed to do once you know who they are (roles, permissions).
- **Session** — the mechanism that remembers someone's logged in across multiple requests, usually a cookie holding a token that maps to their identity on the server.

This platform's own middleware and per-layout `requireRole` checks are a real, working example: middleware does a fast authentication check (is there a valid session at all), and each role-gated layout does the actual authorization check (does this specific session's role allow this specific area) — deliberately as two separate steps, not one.

**Try it yourself**

Without touching any code, trace through what happens when a logged-out person tries to visit a page that requires being logged in as a mentor, in this exact platform. Write out the steps in order — this is a genuinely useful exercise for understanding a real system rather than a toy example.

**A mistake beginners actually make**

Treating "the user is logged in" and "the user is allowed to do this specific thing" as the same check. They're not — a logged-in learner is authenticated, but still isn't authorized to see mentor-only pages. Conflating the two is a common source of real security bugs, not just a theoretical distinction.

---

### Lesson 2 — Choosing State Solutions

**Why this matters**

`useState` handles state inside one component. Real apps have state that needs to be shared across many components, or that lives on the server rather than the client — and reaching for the wrong tool for each case leads to either over-complicated code or genuine bugs.

**The core idea**

A rough decision guide, roughly in order of how often you'll actually need each one:

- **Local component state** (`useState`) — state only one component (and maybe its direct children, via props) cares about. Default to this.
- **Server state** — data that actually lives in a database and is fetched, not truly "owned" by the client at all. This is most of what a Server Component handles by just fetching directly, no client state needed.
- **URL state** — state that should survive a page refresh or be shareable via a link, like a search query or a selected filter. Put it in the URL (search params), not in `useState`.
- **Global client state** (Context, or a library like Zustand) — state genuinely needed across many unrelated components, like a shopping cart. Reach for this last, not first — it's the most complex tool on this list, and a lot of apps that use it don't actually need to.

**Try it yourself**

Look back at your Notes app from the last module. Is the current list of notes actually client state, or is it more accurately server state you're just re-fetching after a mutation? There's no single right answer — the exercise is in reasoning about which category it belongs to.

**A mistake beginners actually make**

Reaching for global state management (Context, or a full library) the moment two components need to share something, without first checking whether "lift the state up to their common parent and pass it down as props" would just work. For most small-to-medium apps, it does.

---

### Lesson 3 — Accessibility in Practice

**Why this matters**

You already covered the basics in HTML Foundations — this lesson is about applying them under real, messier conditions: interactive components, dynamic content, and the kind of things that only show up once an app has real functionality, not just static markup.

**The core idea**

A few patterns that come up constantly once an app is interactive:

- **Focus management** — when a modal opens, focus should move into it; when it closes, focus should return to whatever triggered it. Without this, keyboard and screen reader users lose their place entirely.
- **Live regions** — dynamic content that appears without a page reload (like a form's success message) needs `aria-live="polite"` so screen readers actually announce it, since nothing else tells them something changed.
- **Keyboard operability** — anything clickable needs to also be reachable and operable via keyboard alone. A `<div onClick>` fails this by default; a real `<button>` handles it for free, which is worth remembering before reaching for a styled `<div>` out of habit.

**Try it yourself**

Take an interactive element from any project you've built so far — a button, a form, a toggle — and try operating it using only your keyboard (Tab to move focus, Enter/Space to activate). If you can't reach it or trigger it without a mouse, that's a real, fixable accessibility gap, not a hypothetical one.

**A mistake beginners actually make**

Treating accessibility as a final pass done once a feature is "finished," instead of a property checked as you build. Retrofitting it later is real, valuable work — but building the keyboard-operable, semantic version from the start is genuinely less total effort than fixing it after the fact.

---

### Lesson 4 — Performance Basics

**Why this matters**

A slow app loses users before they ever see what it does. A handful of habits catch the large majority of real performance problems, well before you need to reach for advanced profiling.

**The core idea**

- **Images** — use Next.js's `<Image>` component instead of a plain `<img>`; it handles sizing, lazy loading, and format optimization automatically, for close to zero extra effort.
- **Don't over-fetch** — only request the fields you actually use. `Promise.all` for independent requests (from Data & Forms) is a performance habit as much as a correctness one.
- **Code splitting** — Next.js already splits your app by route automatically; you mostly don't need to think about this unless a single page has an unusually heavy piece (a big charting library, for instance) that most visitors never actually use.
- **Measure before optimizing** — your browser's dev tools (the Performance and Network tabs) show you what's actually slow. Guessing what's slow and fixing that instead wastes effort on something that may not have mattered.

**Try it yourself**

Open your Next.js GitHub Lookup app's Network tab and look at what's actually being loaded and how long it takes. Swap any plain `<img>` tags for Next.js's `<Image>` component and compare.

**A mistake beginners actually make**

Optimizing something that was never actually slow, based on a guess rather than a measurement. Check the Network and Performance tabs first — they'll tell you where the real time is going, which is very often not where you'd have guessed.

---

### Lesson 5 — Testing Your Code

**Why this matters**

Manually re-clicking through your app after every change doesn't scale, and it's easy to miss that a change broke something unrelated. Automated tests catch that regression for you, instantly, every time — this platform's own `compute-module-statuses` logic is tested for exactly this reason, because it's exactly the kind of logic where a silent regression would be genuinely bad.

**The core idea**

A unit test checks one function in isolation:

```ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("formats a whole number with two decimal places", () => {
    expect(formatPrice(24)).toBe("$24.00");
  });

  it("rounds to two decimal places", () => {
    expect(formatPrice(24.567)).toBe("$24.57");
  });
});
```

You're not trying to test everything — focus on logic that's easy to get subtly wrong (calculations, conditional branching, edge cases like an empty array) rather than simple, obviously-correct code. A function that just returns a hardcoded string doesn't need a test; one with several conditional branches genuinely does.

**Try it yourself**

Write two or three Vitest tests for a function from any earlier project — your `formatPrice` helper from JavaScript Fundamentals is a good candidate. Include at least one edge case (an empty input, a negative number, whatever's relevant to that specific function).

**A mistake beginners actually make**

Only testing the "happy path" — the case where everything goes right — and skipping edge cases entirely. The happy path is usually the least likely place for a real bug to hide; it's the edges (empty input, unexpected type, a boundary value) where actual bugs tend to live.

---

### Lesson 6 — Environment Variables & Config

**Why this matters**

Secrets — API keys, database URLs — should never be hardcoded into your source code, especially not committed to a public GitHub repo. Environment variables are how you keep configuration and secrets separate from code, and how the same code can run with different settings in development versus production.

**The core idea**

```
# .env.local — never commit this file
DATABASE_URL="postgresql://..."
API_SECRET_KEY="abc123"
```

```ts
const apiKey = process.env.API_SECRET_KEY;
```

In Next.js specifically, a variable is only available in the browser if it's prefixed with `NEXT_PUBLIC_` — everything else stays server-only, which is a deliberate safety boundary, not an arbitrary naming rule. Real secrets should never carry that prefix.

**Try it yourself**

Add a `.env.local` file to a project with one fake variable, read it with `process.env`, and confirm your `.gitignore` actually excludes `.env.local` from being committed (check `git status` after creating it — it shouldn't show up as a new file to commit).

**A mistake beginners actually make**

Committing a real API key or secret to a public repo, even briefly. If this ever happens, the fix isn't just deleting the file in a later commit — the key is already in the Git history, and often already scraped. The key itself needs to be rotated (regenerated), not just hidden.

---

## Assignment: Harden an Existing Project

**Instructions:**

Pick a project you've already built in this path (the Next.js GitHub Lookup or the Notes app are good candidates) and improve it against the following checklist. This assignment doesn't add new features — it makes what already exists more production-ready.

**Requirements:**
- At least one genuine accessibility fix you can point to and explain (not just "I checked" — something specific you found and changed).
- At least one Next.js `<Image>` usage if your project has any images at all.
- At least two real Vitest tests on a function that has actual logic in it (not a trivial one).
- Confirm no secrets or API keys are hardcoded anywhere in your source — move anything that should be a secret into `.env.local`, even if it wasn't technically sensitive before.

**What to submit:**
- A GitHub repo link showing the changes (a PR against your project's `main` is a great way to show this clearly).
- In your notes: one thing on this checklist you're least confident you did correctly. Naming it yourself is more useful to your mentor than guessing what to ask about.
