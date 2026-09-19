# Module: Developer Orientation

*Editor/IDE, browser dev tools, terminal basics, package managers, project structure, how assignments and reviews work.*

### Lesson 1 — Your Editor and Tools

**Why this matters**

You'll spend more hours in your editor than in almost any other single piece of software in your career. A few minutes of setup now — extensions, shortcuts, a layout you actually understand — pays for itself within the first week and keeps paying for itself for years.

**The core idea**

Install a small set of extensions rather than dozens: a formatter (Prettier), a linter (ESLint), and something that surfaces Git changes inline (GitLens) cover almost everything you need early on. Learn two shortcuts before anything else:

- Quick Open (`Cmd/Ctrl+P`) — jump straight to any file by typing part of its name, no clicking through folders.
- Command Palette (`Cmd/Ctrl+Shift+P`) — run any editor command by name, including ones you don't know the shortcut for yet.

**Try it yourself**

Install your editor and three extensions of your choice. Then, without touching your mouse, use Quick Open to jump to a file, and the Command Palette to rename it.

**A mistake beginners actually make**

Mousing through nested menus for everything because it feels safer than trusting a shortcut. It's slower for the rest of your career if you don't fix it in the first few weeks, while it's actually easy to fix now — the habit compounds either way.

---

### Lesson 2 — Browser DevTools

**Why this matters**

Once you start building anything visual, the browser becomes your primary debugging environment. Almost every frontend bug leaves a trace somewhere in DevTools — you just need to know which tab to check.

**The core idea**

Three panels cover most early debugging:

- **Elements** — inspect the live DOM and CSS, and edit either directly in the browser to test a fix before writing it in your editor.
- **Console** — see `console.log()` output and, critically, error messages. A red error in the Console is almost always the fastest route to understanding what broke.
- **Network** — see every request the page makes, its status code, and its response body. Essential once you start fetching data.

**Try it yourself**

Open DevTools on any website. In Elements, change some text or a color live. In Network, reload the page and find at least one request. Switch on the responsive device toolbar and see the page at a phone-sized viewport.

**A mistake beginners actually make**

Staring at a blank or broken page and guessing at the cause without checking the Console first. It takes five seconds to check and often tells you exactly what's wrong before you've written a single line of new code.

---

### Lesson 3 — The Terminal

**Why this matters**

From here forward, running your dev server, installing packages, and pushing code all happen through the terminal. Getting comfortable with a handful of commands now removes a steady source of friction from every module that follows.

**The core idea**

```bash
pwd                 # print working directory — where am I?
ls                  # list what's in this folder
cd my-project       # move into a folder
cd ..               # move up one folder
mkdir new-folder    # create a folder
touch file.txt      # create a file
```

You'll also need just enough Git to submit your first assignment — we'll go properly deep on branches, commits, and pull requests in the Git & GitHub module, but this is the minimum to get evidence into a repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

**Try it yourself**

Open your terminal, navigate to your Desktop, create a folder called `practice`, create a file inside it, and run `ls` to confirm it's there.

**A mistake beginners actually make**

Naming folders and files with spaces (`my project`), which the terminal treats as two separate arguments unless you quote or escape them. Use dashes (`my-project`) instead — it avoids the whole problem.

---

### Lesson 4 — Package Managers and Project Structure

**Why this matters**

Almost every real project depends on external code written by someone else. A package manager tracks exactly which packages, and which versions of them, your project relies on — without it, "it works on my machine" becomes permanent.

**The core idea**

`package.json` is a project's manifest: its dependencies, its dev-only dependencies, and named scripts you can run.

```bash
npm install              # install everything listed in package.json
npm install some-package # add a new dependency
npm run dev               # run whatever the "dev" script is defined as
```

`package-lock.json` pins exact versions so everyone on a project installs the same thing. `node_modules/` is where the actual package code lives — it's regenerated from `package.json` and should never be edited directly or committed to Git.

A typical project structure separates concerns into folders — for example `app/` for pages and routes, `components/` for reusable UI, `lib/` for shared logic. You'll see this pattern in almost every module from here on.

**Try it yourself**

Open a sample project's `package.json`. Identify two dependencies you don't recognize and look up what each one does. Run one of the scripts listed under `"scripts"` from your terminal.

**A mistake beginners actually make**

Editing files inside `node_modules/` directly to "fix" something. The next `npm install` regenerates that folder from scratch and silently wipes the change — any real fix belongs in your own code or `package.json`.

---

### Lesson 5 — How Assignments and Reviews Work

**Why this matters**

Knowing the loop up front — learn, practice, submit, review, improve — removes the guesswork about what's expected at each stage, and makes "changes requested" feel like a normal step instead of a setback.

**The core idea**

Each module here follows the same shape: work through its lessons, then open its assignment. When you submit (a GitHub link, a deployed URL, a written response, or some combination), your mentor reviews it and either approves it — which counts toward the module's completion — or requests changes, which sends it back to you with feedback attached. You revise and resubmit, and the full history of that back-and-forth stays visible on the assignment. Resubmitting isn't a failure state; it's the normal path for most assignments.

**Try it yourself**

Before opening your editor for an assignment, read its full description once, then write out its explicit requirements as your own short checklist. Referencing your own checklist while you build catches missed requirements earlier than reading the instructions once and working from memory.

**A mistake beginners actually make**

Submitting a bare link with no context, leaving your mentor to guess what you were trying to do and where you were unsure. A short note on what you'd like feedback on gets you sharper, more useful reviews than a link alone ever will.

---

## Assignment: Environment Setup and Reflection

**Instructions:**

Set up your development environment from scratch, and write a short reflection to go with it. There's no code to build yet — this assignment is about your tools and workflow, not a feature.

**Requirements:**
- Editor installed with at least two extensions, each with a one-line note on what it does and why you picked it.
- A `practice` folder created, and navigated into, entirely from the terminal — no file explorer.
- A local Git repository initialized in that folder with at least one commit, pushed to a new GitHub repository (private is fine).
- A written reflection (150–300 words) covering one thing that felt unfamiliar and one specific question you have going into the next module.

**What to submit:**
- Text response containing your reflection.
- GitHub repository URL.
- In your notes: which terminal command took you the most tries to get right, and why.
