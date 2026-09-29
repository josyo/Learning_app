# Module: Developer Orientation (REWRITE — replaces the original 3-lesson version)

This assumes the learner has never opened a code editor, never used a terminal,
and doesn't know what Node.js or npm are. Every lesson defines its terms before
using them. Videos are linked for anything much easier to watch than read —
installing software and navigating an unfamiliar interface especially.

### Lesson 1 — Welcome: What You're Actually Going to Be Doing
<!-- slug: welcome-what-you-re-actually-going-to-be-doing -->

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
<!-- slug: what-is-a-code-editor-and-installing-vs-code -->

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
<!-- slug: finding-your-way-around-vs-code -->

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
<!-- slug: what-is-a-terminal-and-how-do-you-use-one -->

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
This prints the folder you're
currently "in" — the terminal always has a current location, same as a file
explorer window does.

```
ls
```
This lists the files and folders in your
current location.

Both commands work the same way in the terminal inside VS Code on Windows
(where it runs **PowerShell**, the program that reads your commands) and on
macOS, so you don't need a different command for your computer.

**Try it yourself**

Open a terminal inside VS Code and run both commands above. Notice that
nothing dramatic happens — it just prints text back at you. That's normal;
most terminal commands are this undramatic.

**A mistake beginners actually make**

Being afraid to type anything at all in case it breaks something. The
commands in this lesson are read-only — they only *look* at your computer,
they don't change anything. You genuinely cannot break anything by running
`pwd` or `ls`.

---

### Lesson 5 — Installing Node.js and Running Your First Command
<!-- slug: installing-node-js-and-running-your-first-command -->

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
The number after the `v` should be 22 or higher; if it is lower, download the
LTS version again from nodejs.org and install it.
Then try:

```
npm -v
```

This should also print a version number — npm came bundled with Node
automatically.

**If you see a red error on Windows.** When you run `npm -v` in the VS Code
terminal on Windows, you may see this instead of a version number. It is
common on the first day and it does not mean your computer is broken:

```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm -v
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

Windows has a safety setting called the **execution policy**. It decides
which script files are allowed to run, and the default blocks the script file
that `npm` uses in PowerShell. Pick one fix:

- **Fix A, changes no settings:** type `npm.cmd -v`. It runs the same program
  by a different file name.
- **Fix B, once and for good:** type the line below exactly, and press Enter.

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

If PowerShell asks whether you want to change the policy, type `Y` and press
Enter. This changes the setting for your Windows user only. Close the
terminal, open a new one, and run `npm -v` again. If you see
`Access to the registry key ... is denied`, the part that says
`-Scope CurrentUser` was missing, so type the whole line again.

**Try it yourself**

Run both `node -v` and `npm -v` in a terminal and confirm you get real
version numbers back, not an error. If you get an error, close and reopen
your terminal first (Node sometimes needs a fresh terminal window to be
recognized) before assuming something's wrong. If the error is the red one
about running scripts being disabled, use one of the two fixes above.

**A mistake beginners actually make**

Installing Node, then immediately opening a terminal window that was already
open *before* the install finished. The terminal only picks up newly
installed tools when it starts — always open a *new* terminal after
installing something.

---

### Lesson 6 — How Assignments and Reviews Work
<!-- slug: how-assignments-and-reviews-work -->

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
<!-- slug: a-tour-of-a-real-project-s-folders -->

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
<!-- slug: environment-check -->

**Time:** about 40 minutes
**Scaffold:** Level 3. Every step is written out, and you fill in a template at the end.
**Builds on → feeds into:** Lessons 2–7 of this module → HTML Foundations, where you will make web pages inside the `my-site` folder you create here.
**Last verified:** 2026-09-29 on Windows 10 with VS Code and PowerShell 5.1, using Node.js 25 and npm 11.9.0 (learners install the LTS release, whose output looks the same apart from the numbers). The macOS lines were not re-run.

You will set up the folder you will use in the next module, prove that each tool works by copying its output, and write four short answers in your own words. Do the steps on your computer. You can read this page on your phone, but the terminal output has to come from your computer, and pasting is easiest when you submit from it too.

## Outcomes assessed

By the end of this module you can:

- **O1** Open VS Code.
- **O2** Open a folder in VS Code and point to the Explorer, the editor and the terminal.
- **O3** Open a terminal inside VS Code and run commands in it.
- **O4** Run `node -v` and `npm -v` and read the results.
- **O5** Describe what happens after you submit an assignment.
- **O6** Say what `package.json` is for.

## The task

### Part 1: Make a folder and open it in VS Code (assesses O1, O2)

1. Create a folder named `my-site` inside your Documents folder.
   - **Windows:** open File Explorer, open Documents, right-click an empty space, choose New, then Folder. Type `my-site` and press Enter.
   - **macOS:** open Finder, open Documents, choose File, then New Folder. Type `my-site` and press Return.

   You should see: a folder called `my-site` in Documents.
   If you see something else: if it is called "New folder", right-click it, choose Rename, and type `my-site`. Use lowercase letters and a hyphen, with no spaces.

2. Open VS Code. Choose File, then Open Folder. Select `my-site` (click **Select Folder** on Windows or **Open** on macOS).

   You should see: a question, "Do you trust the authors of the files in this folder?" Click **Yes, I trust the authors**. The **Explorer** (the file list on the left) then shows the name MY-SITE with nothing under it, because the folder is empty.
   If you see something else: if the Explorer says "You have not yet opened a folder", the folder did not open, so repeat step 2. If a pop-up offers to install extensions, close it. You do not need any.

### Part 2: Open the terminal and prove it is inside VS Code (assesses O2, O3)

3. In the menu, choose Terminal, then New Terminal. The **terminal** is the text window where you type commands.

   You should see: a panel at the bottom with a line that ends in `my-site>`. On Windows the line starts with `PS`. That means the terminal is running **PowerShell**, the program that reads your commands on Windows.
   If you see something else: if no panel appears, choose Terminal, then New Terminal again.

4. Type `pwd` and press Enter. The command prints the folder the terminal is in.

   You should see: on Windows, a small table with the heading `Path` and a path that ends in `\my-site`. On macOS, a path that ends in `/my-site`. The path may include the word OneDrive, which is fine.
   If you see something else: if the path ends anywhere else, close the terminal with the bin icon on its panel, check that the Explorer shows MY-SITE, and open a new terminal.

5. Type `ls` and press Enter. The command lists the files in the folder.

   You should see: nothing at all, because `my-site` is empty.
   If you see something else: if files appear, you are in a different folder. Follow the fix in step 4.

6. Type the command that names the program your terminal is running inside.
   - **Windows (PowerShell):** `echo $env:TERM_PROGRAM`
   - **macOS:** `echo $TERM_PROGRAM`

   You should see: `vscode`
   If you see something else: if the line is empty, you are using a terminal that is not inside VS Code, for example one opened from the Start menu. Close it and use Terminal, then New Terminal inside VS Code.

### Part 3: Check Node.js and npm (assesses O4)

7. Type `node -v` and press Enter.

   You should see: a version that starts with `v`, then a number that is 22 or higher, such as `v22.11.0` or `v24.0.0`.
   If you see something else:
   - On Windows you may see `node : The term 'node' is not recognized as the name of a cmdlet, function, script file, or operable program.` On macOS the message is `zsh: command not found: node`. Either way, the terminal cannot find Node.js. Close **every** VS Code window, open VS Code again, open the `my-site` folder, open a new terminal and try again. If it still fails, restart your computer once and try again.
   - If the number after `v` is lower than 22, install the **LTS** version (Long Term Support, the stable one) from nodejs.org again, as in Lesson 5, then open a new terminal.

8. Type `npm -v` and press Enter.

   You should see: a version number such as `10.9.2` or `11.9.0`.
   If you see something else: on Windows you may see this red error. It is common on the first day and it does not mean your computer is broken.

   ```
   npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
   At line:1 char:1
   + npm -v
   + ~~~
       + CategoryInfo          : SecurityError: (:) [], PSSecurityException
       + FullyQualifiedErrorId : UnauthorizedAccess
   ```

   Windows has a safety setting called the **execution policy**. It decides which script files are allowed to run, and the default blocks the script file that `npm` uses in PowerShell. Pick one fix:

   - **Fix A, changes no settings:** type `npm.cmd -v`. It runs the same program by a different file name. If it prints a version number, paste that as your answer for step 8.
   - **Fix B, once and for good:** type the line below exactly, and press Enter.

     ```
     Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
     ```

     If PowerShell asks whether you want to change the policy, type `Y` and press Enter. This changes the setting for your Windows user only. Close the terminal, open a new one with Terminal, then New Terminal, and run `npm -v` again. If you see `Access to the registry key ... is denied`, the part that says `-Scope CurrentUser` was missing, so type the whole line again.

### Part 4: Reflect (assesses O5, O6)

Write one or two sentences for each prompt, in your own words. You will paste them into Notes in the next section.

1. In Lesson 1 you wrote down one question. What was it, and can you answer it now? If you didn't write one down, write a question you have now and answer it.
2. Which step took you longest? What did you do about it?
3. After you press Submit, what happens next? Explain it as if you were telling a friend.
4. What is `package.json` for?

## Acceptance checklist

Check each item yourself before you submit.

- [ ] Notes has the `pwd` output, and the path ends in `my-site` (O2, O3)
- [ ] Notes has the `TERM_PROGRAM` output, and it says `vscode` (O1, O3)
- [ ] Notes has the `node -v` output, and the number after `v` is 22 or higher (O4)
- [ ] Notes has the `npm -v` output, and it is a version number, not an error (O4)
- [ ] Reflection 1 and 2 are answered with something only you could write: your real question and a named step (personal)
- [ ] Reflection 3 describes what happens after Submit, and reflection 4 says what `package.json` is for, both in your own words (O5, O6)

## Submit

Scroll down to the submit form on this page.

- **Notes:** paste the template below and fill it in. Notes is plain text, so no formatting is needed. To copy from the terminal, select the text with your mouse and press Ctrl+C on Windows or Cmd+C on macOS. Then paste it into Notes with Ctrl+V or Cmd+V.
- **GitHub URL and Deployed URL:** leave both empty. This assignment needs no repository and no website.
- **Attachment URL:** leave it empty. It is only for a link to a screenshot, and you do not need one here.
- The form needs at least one field filled in. Notes is enough.
- After you press Submit, your mentor reads it. If the answer is **Changes requested**, read the note, fix what it names, and press **Resubmit**. Your earlier attempts stay visible, and that is normal. You cannot submit again while the status says **Awaiting review**.

```
Windows or macOS:
pwd:
echo TERM_PROGRAM:
node -v:
npm -v:

Reflection
1.
2.
3.
4.
```

## If you get stuck

- **When to ask:** ask after 20 minutes on one step, or when the same error is still there after two fixes. Being stuck early is useful information for your mentor, not a failure.
- **What to send, wherever you ask:**
  - the step number you are on
  - what you tried
  - the exact error text, copied from the terminal (do not retype it)
  - whether you are on Windows 10, Windows 11 or macOS
  - your `node -v` and `npm -v` output, if they worked
  - a screenshot, if you can make one (a photo of the screen taken with your phone is fine)
- **Where to ask:**
  1. **First choice:** message your mentor on WhatsApp and send the details above. You can send the screenshot or a photo of your screen straight in the chat.
  2. **If you cannot reach your mentor, or you want it on record here:** submit anyway. Write the word `STUCK` on the first line of Notes, add the same details, and put a link to the screenshot in the Attachment URL box only if you know how to make one.
- Your mentor replies with help. If you asked in the review, the reply arrives as **Changes requested**. Follow it, then press **Resubmit**.

## How this is reviewed

Your mentor checks each item below. You can use the same list to check yourself.

- **`pwd` output**
  - Approve if: it shows a path whose last part is `my-site`.
  - Request changes if: it is missing, or the path ends somewhere else.
- **`TERM_PROGRAM` output**
  - Approve if: it says `vscode`.
  - Request changes if: it is empty, it is an error, or it says anything else.
- **`node -v` output**
  - Approve if: it starts with `v` and the number is 22 or higher.
  - Request changes if: it is missing, it is lower than 22, or it is an error message.
- **`npm -v` output**
  - Approve if: it is a version number. Output from `npm.cmd -v` counts.
  - Request changes if: it is missing, or it is the red execution policy error.
- **Reflection 1 and 2**
  - Approve if: both are answered specifically, in your own words.
  - Request changes if: either is empty or copies the prompt.
- **Reflection 3 and 4**
  - Approve if: 3 mentions your mentor reviewing it and then approval or changes requested, and 4 says that `package.json` lists what the project depends on and the commands you can run.
  - Request changes if: an answer describes something else.

How the decision is made: if every item is met, you are approved. If there is a small gap, such as a thin answer, you are approved with a note. If any of the four outputs is missing or wrong, your mentor requests changes and names the items. A `STUCK` submission gets help, not a mark against you.

## Stretch (optional, not reviewed)

Make your first file. In the Explorer, hover over MY-SITE and click the New File icon. Name the file `hello.txt`, type one sentence, and press Ctrl+S (Windows) or Cmd+S (macOS) to save. Run `ls` in the terminal and look at the result. You will do this again in HTML Foundations.
