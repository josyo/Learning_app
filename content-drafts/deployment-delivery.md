# Module: Deployment & Delivery

*Build process, environment config, deployment, debugging production issues, PR review. Builds on Production Frontend Practices.*

### Lesson 1 — The Build Process

**Why this matters**

Everything you've run so far with `npm run dev` is a development server — it prioritizes fast feedback over speed, and includes tools (detailed error overlays, unminified code) that should never reach real users. Understanding what actually happens when you build for production is what makes deployment something you understand, not just a button you press.

**The core idea**

```bash
npm run build   # produces an optimized production build
npm run start   # runs that production build locally
```

The build step does real work: it minifies your JavaScript (shrinks it by removing whitespace and shortening variable names), pre-renders what it can, and catches type errors and build failures that `npm run dev` would happily let slide. A project that runs fine in dev but fails `npm run build` is not actually ready to ship — this is a genuinely common and useful thing to check before you believe a feature is "done."

**Try it yourself**

Run `npm run build` on any of your existing Next.js projects. Read the output — it tells you the size of every route, and whether each one is static or server-rendered. This output is worth understanding, not just skimming past.

**A mistake beginners actually make**

Only ever testing with `npm run dev` and assuming a working dev server means a working production deploy. Run `npm run build` locally before you ever push something you're about to deploy — it catches a real category of problems dev mode simply doesn't surface.

---

### Lesson 2 — Environment Config for Production

**Why this matters**

Your local `.env.local` file never leaves your machine — a deployed app needs its own environment variables configured on whatever platform is hosting it, and it's an easy, common step to forget entirely until something mysteriously breaks in production but not locally.

**The core idea**

Every environment variable your app reads (`DATABASE_URL`, auth secrets, API keys) needs to be set in your hosting platform's dashboard, not just in your local `.env.local`. Different environments often need genuinely different values — your production database is not, and should never be, the same one you've been developing against locally.

A practical habit: keep a `.env.example` file in your repo (safe to commit — no real values, just the variable names) documenting exactly what a fresh deployment needs configured. This platform's own `.env.example` is a real, working instance of exactly this pattern.

**Try it yourself**

Look at any project's `.env.local` file and write a matching `.env.example` with the same variable names but placeholder values (`DATABASE_URL="postgresql://user:password@host:5432/dbname"` rather than your real connection string). Commit only the example file.

**A mistake beginners actually make**

Deploying an app and being confused why it crashes immediately, without checking whether the hosting platform actually has the required environment variables configured yet. This is one of the most common real deployment failures, and the fix is almost always just setting the missing variable — worth checking first, before assuming something more complicated is wrong.

---

### Lesson 3 — Deploying to Vercel

**Why this matters**

Building something is one thing — putting it somewhere other people can actually reach is what makes it real. Vercel (made by the same team as Next.js) is the simplest path from a GitHub repo to a live URL, which is exactly why it's this path's default recommendation.

**The core idea**

The typical flow: connect a GitHub repo to Vercel, configure environment variables in its dashboard, and every push to `main` deploys automatically. Every pull request also gets its own preview deployment — a real, working URL for that specific branch, which is genuinely useful for a mentor reviewing your work without needing to run it locally themselves.

**Try it yourself**

Deploy any project from this path to Vercel if you haven't already. Open a pull request against `main` on that repo and find the preview deployment URL Vercel generates for it automatically — that's a real, live version of your branch's changes, separate from your main deployment.

**A mistake beginners actually make**

Forgetting to add environment variables in Vercel's dashboard before the first deploy, then being confused why a feature that works locally is broken on the live URL. Set them before your first deploy, not after something breaks because of their absence.

---

### Lesson 4 — Debugging Production Issues

**Why this matters**

Something will eventually break in production that never showed up locally — different data, different environment, a real user doing something you didn't anticipate. Knowing how to actually investigate this, rather than just guessing, is a distinct skill from writing the original code.

**The core idea**

A practical process, roughly in order:

1. **Reproduce it** — can you make it happen again, reliably? If not, you need more information before you can even start.
2. **Check logs** — your hosting platform's dashboard shows server-side errors and console output. This is often where the real answer is sitting, unread.
3. **Compare environments** — is this a difference between dev and production specifically (an env variable, a data difference), or does it happen everywhere?
4. **Isolate the change** — if this worked recently, what actually changed since then? Your Git history (from the Git & GitHub module) is a genuinely useful tool here, not just a formality.

**Try it yourself**

Deliberately break something in a deployed project (comment out an environment variable, introduce an obvious bug) and walk through this process to find it, as if you didn't already know the cause. Doing this once, on purpose, with nothing real at stake, builds the instinct for when it happens for real.

**A mistake beginners actually make**

Changing several things at once while trying to fix a production issue, then being unable to tell which change actually fixed it (or whether something else fixed it and the original cause is still there, unaddressed). Change one thing, retest, and only then change the next.

---

## Assignment: Deploy & Document

**Instructions:**

Deploy your most complete project from this path (the Notes app or your hardened project from Production Frontend Practices are strong choices) to Vercel, if it isn't live already.

**Requirements:**
- A working, live deployed URL, with all required environment variables configured on the hosting platform.
- A `.env.example` file committed to the repo, documenting every environment variable a fresh deploy needs.
- Confirm `npm run build` succeeds locally with no errors before considering this done.
- Write a short incident-style note (a few sentences is enough) describing one real thing that went wrong during this deployment — a missing env var, a build failure, anything genuine. If nothing went wrong, describe what you specifically checked to make sure nothing would.

**What to submit:**
- The live deployed URL.
- A GitHub repo link, including the `.env.example` file.
- Your incident note, as part of your submission notes.
