# Module: Git & GitHub

*Repositories, commits, branches, pull requests, conflicts, review workflow. Builds on JavaScript Fundamentals.*

### Lesson 1 — Repositories & Commits

**Why this matters**

Every project you build from here on lives in Git. A commit history is a project's memory — the ability to see what changed, when, and why, and to undo a mistake cleanly, is what separates a real engineering workflow from a folder full of `final_v2_ACTUALFINAL.js` files.

**The core idea**

A repository tracks changes to a folder over time. The core loop:

```bash
git status              # what's changed since the last commit
git add file.js          # stage a specific change
git add .                 # stage everything changed
git commit -m "Add price formatting helper"
git push                  # send your commits to GitHub
```

Write commit messages as a short sentence describing *what changed and why*, not "fix" or "updates." `"Fix off-by-one error in pagination"` is useful to future-you; `"fix bug"` is not — six months from now you won't remember which bug.

**Try it yourself**

In any existing project, make one small, real change (fix a typo, adjust some text), then run `git status`, `git add`, and `git commit` with a proper descriptive message. Run `git log --oneline` afterward to see your project's history as a clean, readable list.

**A mistake beginners actually make**

Making one giant commit at the end of a work session covering five unrelated changes. Commit often, and keep each commit to one logical change — it makes your history actually useful, and makes it possible to undo one thing without undoing everything else alongside it.

---

### Lesson 2 — Branches & Merging

**Why this matters**

Branches let you work on something new without touching the code that already works. This is what makes it safe to experiment, and it's the foundation of how every real team collaborates without stepping on each other's changes constantly.

**The core idea**

```bash
git checkout -b add-dark-mode   # create and switch to a new branch
# ... make changes, commit them ...
git checkout main                # switch back to main
git merge add-dark-mode          # bring those changes into main
```

`main` should always be in a working state — something you could deploy at any moment. New work happens on a branch, and only merges back once it's done and reviewed.

**Try it yourself**

Create a branch, make a small change, commit it, switch back to `main`, and merge the branch in. Then run `git log --oneline --graph` to see the branch structure visually — it makes the mental model click in a way the individual commands don't.

**A mistake beginners actually make**

Working directly on `main` out of habit, especially once a project feels "solo." The habit matters more than the immediate necessity — build it now, on a project of one, so it's automatic once you're on a team where it actually protects other people's work too.

---

### Lesson 3 — Pull Requests & the Review Workflow

**Why this matters**

This is the actual mechanism behind every assignment review on this platform, and it's how virtually every real engineering team ships code. A pull request (PR) isn't just a formality — it's a proposal for a change, with a place for someone else to ask questions before it becomes permanent.

**The core idea**

Push a branch to GitHub, then open a pull request comparing it against `main`. A good PR description says what changed and why — the same discipline as a good commit message, at a slightly larger scale. A reviewer can leave comments on specific lines, request changes, or approve — the exact same loop you've been using with your mentor throughout this path, just on the platform it's modeled after.

**Try it yourself**

Push a branch to a GitHub repo you own and open a pull request against `main`, even with no one else to review it. Write a real description: what changed, and why. Getting comfortable with the mechanics now — before it matters to a real team — means it's second nature later.

**A mistake beginners actually make**

Writing a PR description that just repeats the commit messages, or leaving it blank entirely. A reviewer who has to reverse-engineer *why* you made a change from the diff alone is going to review it slower and more skeptically than one you've actually explained yourself to.

---

### Lesson 4 — Resolving Merge Conflicts

**Why this matters**

Conflicts happen the moment two people (or two branches) change the same lines of the same file. They're not a sign you did something wrong — they're a normal, expected part of collaborative work, and knowing how to resolve one calmly instead of panicking is a real skill worth building deliberately.

**The core idea**

When Git can't automatically combine two changes, it marks the conflicting section directly in the file:

```
<<<<<<< HEAD
const greeting = "Hello there!";
=======
const greeting = "Welcome!";
>>>>>>> add-dark-mode
```

Everything between `<<<<<<< HEAD` and `=======` is what's currently on your branch; everything between `=======` and `>>>>>>>` is what's coming in. Edit the file to keep whichever version is correct (or a combination of both), delete the conflict markers entirely, then stage and commit the result.

**Try it yourself**

Deliberately create a conflict: on `main`, change one line of a file and commit it. On a separate branch (created *before* that change), change the same line to something different and commit that too. Merge the branch into `main` and resolve the conflict by hand. Doing this once on purpose, with nothing at stake, makes a real one far less stressful.

**A mistake beginners actually make**

Panicking and running `git merge --abort` repeatedly instead of actually reading what conflicted. Conflict markers are just showing you two versions of the same lines — read both, decide what the file should actually say, and it's usually a much smaller problem than it first looks.

---

## Assignment: Branch, PR, and Resolve

**Instructions:**

Using any existing project repo (your GitHub User Lookup project is a good choice):

1. Create a feature branch and make a real, meaningful change on it (a new feature, a visible fix — not a placeholder edit).
2. Meanwhile, make a small, different change directly on `main` that touches the same file, so the two will conflict.
3. Open a pull request from your branch into `main`.
4. Resolve the resulting merge conflict directly in the PR (or locally, then push the resolution), and merge it.

**What to submit:**
- A link to the merged pull request, so your mentor can see the actual conflict and how you resolved it.
- In your notes: briefly describe what the conflict was and which version you kept (and why).
