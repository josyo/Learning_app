# Mentor notes: Developer Orientation, "Environment Check"

Mentor-only. This file is never imported (the importer reads only `content-drafts/<module-slug>.md`), so learners cannot see it. The rubric itself is learner-visible in the assignment; this file holds the ready-to-paste review comments.

How to use it: the review form takes one plain-text feedback string and a decision (Approve or Request changes). Paste a comment, put the learner's real values in place of the `<…>` parts, and delete anything that does not apply. Each comment says what is right, what is wrong, the exact fix, and what to resubmit. Keep the tone as it is: specific and encouraging.

## Approve

**A1. Approve, all good**
Everything checks out: your `pwd` ends in `my-site`, the terminal reports `vscode`, and node and npm both print version numbers. Your reflection was specific and in your own words. You are ready for HTML Foundations, and you will use the `my-site` folder there. Nice work.

**A2. Approve with a note (one thin answer)**
Approved. Your outputs are all correct. One small thing for next time: your answer to question <2 / 3 / 4> was very short. A sentence about what you actually did or noticed helps me help you. Nothing to resubmit. Well done.

**A3. Approve, learner used the npm.cmd workaround**
Approved. Using `npm.cmd -v` is a valid way around the PowerShell execution policy error. If you want plain `npm` to work everywhere, run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once and open a new terminal. Otherwise keep typing `npm.cmd`. Good problem solving.

## One comment per acceptance item

**C1. `pwd` missing or wrong folder**
Thanks for the outputs. The `pwd` line is <missing / shows <path>>, and it needs to end in `my-site`. That tells me you opened the terminal inside the right folder. To fix it: check that the Explorer shows MY-SITE, close the terminal with the bin icon, open a new one with Terminal, New Terminal, run `pwd` again, and paste what it prints. Resubmit with that line.

**C2. `TERM_PROGRAM` not `vscode`**
Your `TERM_PROGRAM` line is <empty / an error / <value>>. I need to see `vscode`, which shows the terminal is the one inside VS Code, not one opened from Windows. To fix it: in VS Code choose Terminal, New Terminal, type `echo $env:TERM_PROGRAM` (macOS: `echo $TERM_PROGRAM`), and paste the result. Resubmit with that line.

**C3. `node -v` missing, too old, or an error**
Your `node -v` line is <missing / <version>, which is older than 22 / an error>. I need a version starting with v and a number of 22 or higher. To fix it: install the LTS version from nodejs.org, close every VS Code window, reopen it, open a new terminal, run `node -v` and paste the result. Resubmit with that line.

**C4. `npm -v` missing or the execution policy error**
Your `npm -v` line shows <nothing / the red "running scripts is disabled" error>. That is a common Windows first-day error, and you did the right thing by pasting it. To fix it: type `npm.cmd -v`, or run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` and open a new terminal. Then run npm -v and paste the version. Resubmit with that line.

**C5. Reflection 1 or 2 empty or copied**
Your answer to question <1 / 2> is <empty / the question repeated>. I am looking for your own words: for 1, the question you wrote down in Lesson 1 (or one you have now, if you did not write one) and whether you can answer it; for 2, the step that took you longest and what you did. Even "the Node step, I restarted my computer" is a good answer. Please add it and resubmit.

**C6. Reflection 3 or 4 off target**
Thanks for answering. For question 3, I am looking for what happens after you press Submit: I review it, then I approve it or request changes, and you resubmit. For question 4, `package.json` is a file that lists what a project depends on and the commands you can run. Please rewrite <3 / 4> in your own words and resubmit.

## Likely mistakes

**M1. Terminal opened outside VS Code (path ends in system32 or the user folder)**
Your `pwd` shows <path>, which means this terminal is not the one inside VS Code, and that is a very common slip. In VS Code choose Terminal, New Terminal, then run `pwd` and `echo $env:TERM_PROGRAM` again. You should see a path ending in `my-site` and the word `vscode`. Resubmit with both lines.

**M2. Typed the outputs from memory instead of copying**
Your outputs look typed rather than copied, and I can't tell whether they came from your computer. Please run each command again, select the output with your mouse, press Ctrl+C (macOS: Cmd+C), and paste it into Notes. It takes two minutes and it removes doubt. Resubmit with the pasted lines.

**M3. Pasted the command but not its output**
You pasted the commands (`node -v`) but not what they printed. I need the answer line, for example `v24.0.0`. Run each command, copy the line the terminal prints under it, and put that after the label in Notes. Resubmit with the printed lines.

**M4. Installed Node while VS Code was open, and the terminal still cannot find it**
This happens because a terminal only notices new tools when it starts. Close every VS Code window, open VS Code again, open the `my-site` folder, open a new terminal and run `node -v`. If it still fails, restart your computer once and try again. Paste the new output and resubmit.

## When a learner submits STUCK

**S1. Reply to a STUCK submission (Request changes)**
(Learners are told to message you on WhatsApp first. Use this when the STUCK arrives through the review form instead.)
Thank you for asking early, that is exactly right. From what you sent, I think <cause in one sentence>. Try this: <one exact step or command>. You should then see <expected result>. If not, copy the exact text and send it again with STUCK on the first line. Press Resubmit when you have the outputs.
