# Module: Developer Orientation (REWRITE — replaces the original 3-lesson version)

This assumes the learner has never opened a code editor, never used a terminal,
and doesn't know what Node.js or npm are. Every lesson defines its terms before
using them. Videos are linked for anything much easier to watch than read —
installing software and navigating an unfamiliar interface especially.

### Lesson 1 — Welcome: What You're Actually Going to Be Doing

**Why this matters**

Starting something totally new is intimidating, especially when everyone around
you already seems to know the vocabulary. This lesson has no technical content
at all — it's just here to tell you plainly what you're about to do, so
everything after this makes sense as steps toward something, not just a pile
of unconnected new words.

**The core idea**

A website — any website — is built from three things working together:

- **HTML** — the actual content: the words, images, buttons, and structure of
  a page. Think of it as the skeleton.
- **CSS** — how it looks: colors, spacing, layout. The skin and clothing.
- **JavaScript** — what it does: what happens when you click something, type
  something, or the page needs to change without a full reload. The muscles
  and nervous system.

You're going to learn all three, then a tool called **React** (a way of
building the "does something" parts more manageably), then **Next.js** (a
complete system built on top of React that real companies use to build real
websites — this very platform you're using right now is built with it).

Every module in this path builds on the one before it. You won't be asked to
do anything you haven't been taught. If something feels confusing, that's
useful information for your mentor, not a sign you're behind — say so.

**Try it yourself**

Nothing to do yet except read this again if any part of it felt unclear, and
write down (anywhere — paper is fine) one question you have right now. You'll
likely be able to answer it yourself by the end of this module.

**A mistake beginners actually make**

Assuming everyone else "just gets it" and you're the only one confused. Every
single developer, including your mentor, was once completely new to a
terminal and had no idea what "npm" meant. That confusion is the normal first
step, not a sign you picked the wrong path.

---

### Lesson 2 — What Is a Code Editor, and Installing VS Code

**Why this matters**

You can't write code in a word processor like Microsoft Word — it adds
invisible formatting that breaks everything. A **code editor** is software
built specifically for writing code: it understands the structure of what
you're typing and helps you avoid mistakes as you go. **VS Code** (Visual
Studio Code) is the one we use — it's free, made by Microsoft, and it's what
the vast majority of professional web developers actually use day to day.

**The core idea**

A code editor is sometimes also called an **IDE** ("Integrated Development
Environment") — you'll hear both terms and they mean roughly the same thing
for our purposes: one program where you write code, see your project's files,
and run commands, all in one window instead of switching between separate
apps.

Watch the video above before doing anything else — it walks through the
install itself, step by step, on screen. Then follow these steps yourself:

1. Go to **code.visualstudio.com** in your browser.
2. Click the big download button — it should automatically detect whether
   you're on Windows or Mac and offer the right version.
3. Open the downloaded file and click through the installer (the defaults are
   fine — you don't need to change any settings).
4. Once it's installed, open VS Code. You should see a **Welcome** tab —
   that confirms it's working.

**Try it yourself**

Open VS Code and leave it open. Don't worry about doing anything inside it
yet — the next lesson is entirely about what you're looking at.

**A mistake beginners actually make**

Downloading "Visual Studio" instead of "Visual Studio Code" — these are two
completely different pieces of software from the same company, and only Code
(the free, smaller one) is what we use here. If the download page mentions
".NET" or looks like a huge, complicated installer, you're on the wrong page.

---

### Lesson 3 — Finding Your Way Around VS Code

**Why this matters**

An empty editor window is confusing if you don't know what each part is for.
This lesson is a tour, not a task — by the end, the icons and panels you'll
be looking at all day will feel familiar instead of like an unlabeled control
panel.

**The core idea**

When VS Code is open, you're looking at a few key areas:

- **The sidebar** (far left, a thin strip of icons) — clicking each icon
  changes what shows in the panel next to it. The top icon (usually looks
  like two overlapping pages) opens the **File Explorer** — a list of every
  file and folder in whatever project you have open.
- **The editor** (the large area in the middle) — this is where the actual
  content of a file you've clicked on appears, and where you type.
- **The terminal** (hidden by default — the next lesson covers opening and
  using it) — a text-based way to run commands, which lives at the bottom of
  the window once you open it.
- **The Extensions icon** (usually looks like four small squares, one
  separated) — this is where you install add-ons that give VS Code extra
  abilities. You'll install a couple of these later in this module.

**Try it yourself**

Click through each icon in the left sidebar one at a time, just to see what
each panel looks like. You don't need to understand everything you see — just
get used to the idea that different icons show different things.

**A mistake beginners actually make**

Panicking when a new panel or tab appears unexpectedly and closing VS Code
entirely to "start over." Almost everything in VS Code can be closed and
reopened safely — an unfamiliar panel is never something you've broken.

---

### Lesson 4 — What Is a Terminal, and How Do You Use One

**Why this matters**

A lot of what you'll do in this path — starting your project, installing
tools, using Git — happens by typing commands rather than clicking buttons.
This feels strange at first. It stops feeling strange faster than you'd
expect.

**The core idea**

A **terminal** is a plain text window where you type instructions for your
computer, one line at a time, and press Enter to run them. There's no menu,
no buttons — just typed commands and the computer's text response.

This full course, linked above as this lesson's video, is a genuinely good,
patient introduction if you want more than the rest of this lesson covers.

To open a terminal **inside VS Code** specifically (this is how you'll almost
always do it in this path):

1. At the top of VS Code, click **Terminal** in the menu bar.
2. Click **New Terminal**.
3. A panel opens at the bottom of the window with a blinking cursor — that's
   it, that's the terminal.

A couple of commands to try right now, typing each one and pressing Enter:

```
pwd
```
(On Windows, use `cd` instead of `pwd`.) This prints the folder you're
currently "in" — the terminal always has a current location, same as a file
explorer window does.

```
ls
```
(On Windows, use `dir` instead.) This lists the files and folders in your
current location.

**Try it yourself**

Open a terminal inside VS Code and run both commands above. Notice that
nothing dramatic happens — it just prints text back at you. That's normal;
most terminal commands are this undramatic.

**A mistake beginners actually make**

Being afraid to type anything at all in case it breaks something. The
commands in this lesson are read-only — they only *look* at your computer,
they don't change anything. You genuinely cannot break anything by running
`pwd`, `cd`, `ls`, or `dir`.

---

### Lesson 5 — Installing Node.js and Running Your First Command

**Why this matters**

Every project you build from here on — starting with your very first
assignment in the next module — needs a tool called **Node.js** installed on
your computer to run at all. Without it, commands like `npm run dev` (which
you'll type constantly) simply won't work.

**The core idea**

**Node.js** lets JavaScript run directly on your computer, outside a web
browser — which is what lets you run a whole project locally before it's
ever put on the internet. **npm** ("Node Package Manager") comes bundled with
it, and it's the tool that downloads and manages all the external code
libraries a project depends on.

Watch the video above — it walks through the actual install. Then:

1. Go to **nodejs.org**.
2. Download the version labeled **LTS** (this means "Long Term Support" — the
   stable, recommended version, not the newest experimental one).
3. Run the installer, clicking through with the default settings.
4. Open a terminal (Lesson 4) and type:

```
node -v
```

If Node installed correctly, this prints a version number, like `v22.11.0`.
Then try:

```
npm -v
```

This should also print a version number — npm came bundled with Node
automatically.

**Try it yourself**

Run both `node -v` and `npm -v` in a terminal and confirm you get real
version numbers back, not an error. If you get an error, close and reopen
your terminal first (Node sometimes needs a fresh terminal window to be
recognized) before assuming something's wrong.

**A mistake beginners actually make**

Installing Node, then immediately opening a terminal window that was already
open *before* the install finished. The terminal only picks up newly
installed tools when it starts — always open a *new* terminal after
installing something.

---

### Lesson 6 — How Assignments and Reviews Work

**Why this matters**

Knowing the actual process — what happens after you submit something —
removes a lot of unnecessary anxiety about doing it "right" the first time.

**The core idea**

Every module from here on (after this one) includes an assignment. Here's
what happens, in order:

1. You read the assignment's requirements — they double as your checklist for
   what "done" looks like.
2. You submit your work — usually a link to your code and sometimes a link to
   a live, deployed version of it.
3. Your mentor looks at it and either approves it, or asks you to make
   changes with specific feedback about what to fix.
4. If changes are requested, you fix what was mentioned and submit again.
   Your first attempt and your mentor's notes both stay visible — this is
   completely normal, not something to be embarrassed about. Almost nobody's
   first submission is approved immediately.
5. Once it's approved, the next module unlocks.

**Try it yourself**

Nothing to submit yet. Just notice: "changes requested" is an expected,
ordinary step in this process, not a failure.

**A mistake beginners actually make**

Treating a "changes requested" review as a bad result and feeling discouraged
by it. It's the single most normal outcome of a first submission — it means
your mentor read your work carefully enough to have specific, actionable
feedback, which is exactly what you want from them.

---

### Lesson 7 — A Tour of a Real Project's Folders

**Why this matters**

The first time you open a real coding project, it can look like an
overwhelming wall of unfamiliar folders. Knowing roughly what a few of them
are for in advance makes it feel like a map instead of a maze.

**The core idea**

You'll see folder and file names like these constantly from here on:

- **`app/`** or **`src/`** — where the actual pages and features you're
  building live.
- **`components/`** — small, reusable pieces of a page (a button, a card, a
  form) that get combined to build bigger pages.
- **`package.json`** — a file listing everything your project depends on,
  and the commands you can run (like the `npm run dev` you'll use to start a
  project).
- **`node_modules/`** — a folder npm creates automatically, full of code your
  project depends on. You'll never open or edit anything inside it directly.

You don't need to memorize this. You'll absorb it naturally by working inside
real projects starting next module.

**Try it yourself**

If you have any project open in VS Code already (even an empty test folder),
look at its File Explorer panel and see whether any of these names appear.
If nothing's open yet, that's completely fine — this is here so the names
feel familiar when you do see them.

**A mistake beginners actually make**

Trying to open and understand every single file in `node_modules/` out of
thoroughness. This folder can contain thousands of files and is not meant to
be read by you directly — it's there for the computer, not for you.

---

## Assignment: Environment Check

**Instructions:**

Confirm your development environment is fully set up and working, using
everything from this module.

**Requirements:**
- VS Code is installed and you can open it.
- Running `node -v` in a terminal shows a real version number.
- Running `npm -v` in a terminal shows a real version number.
- You've successfully opened a terminal *inside* VS Code at least once
  (not a separate terminal app).

**What to submit:**
- In the notes field: paste the exact output you got from running `node -v`
  and `npm -v`. That's your proof everything's actually installed and
  working — there's no repo or deployed link needed for this one, since
  there's no code to write yet.
- If anything from this module didn't make sense, or a step didn't work the
  way it was described, say so here directly. This is exactly the kind of
  thing your mentor wants to know before you move further.
