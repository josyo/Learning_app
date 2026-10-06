# Module: HTML Foundations

*Make a real web page, structure it so people and software can understand it, and check it. Builds on Developer Orientation: you start from the empty `my-site` folder you created there. Written for a learner with no prior experience; Windows first, macOS differences noted.*

<!-- REWRITE IN PROGRESS (see docs/plans/html-foundations.md). Lesson 1 is written and awaiting the owner's approval. Lessons 2-11 and the assignment are not written yet. This module is HELD: it is validated but never imported. -->

### Lesson 1 — Your first web page
<!-- slug: your-first-web-page -->

**By the end you can:**

- Create a file named `index.html` in your `my-site` folder from VS Code, and save it.
- Open that file in Chrome from the terminal and from File Explorer.
- Predict what Chrome will show after you edit the file, then change the text, save and refresh to check.

**Before you start:** You finished the Developer Orientation module, including the Environment Check assignment. That means VS Code is installed, the empty `my-site` folder is in your Documents folder, and you can open a terminal inside VS Code. Google Chrome must also be installed on your computer.

**Time:** ~30 min

**Last verified:** 2026-10-06. The page code was checked with html-validate 11 on Node.js 22 (Linux). The Windows and macOS steps, the Chrome wording and the two terminal commands that open Chrome were written from documentation and were **not run** on those systems, so treat the wording of a button or message as close, not exact. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

By the end of this module you will have a small website of your own. Every page of it is a file you create, save and open exactly the way you do today. If saving or opening goes wrong, nothing later works. The two most common problems, an old page that will not change and a page that shows code instead of words, look alarming. You will meet both on purpose here, so they are not frightening later.

## Files, extensions and browsers

A web page is a **file**: a named piece of saved text on your computer. The text is written in **HTML** (HyperText Markup Language), the language that tells a browser what is on a page. HTML is **plain text**: letters you type, with no hidden formatting. A **browser** such as Chrome is a program that reads an HTML file and draws the page you see.

The part of a file name after the last dot is its **file extension**. The extension `.html` tells your computer that the file is a web page. Today's file is called `index.html`. That is the standard name for the front page of a site: when your site is online later, visitors reach it without typing the file name.

## Tags in one minute

A **tag** is a word inside angle brackets, such as `<h1>`. Most tags come in pairs: an **opening tag** such as `<h1>` and a **closing tag** such as `</h1>`, which has a slash. The browser shows the text between the pair.

- `<h1>` makes a **heading**, the big title of a page.
- `<p>` makes a **paragraph**, a block of ordinary text.
- `<title>` sets the **tab title**, the words on the browser tab at the top of the window.

Lesson 2 names every part of a tag. For now, copy the pattern: opening tag, your text, closing tag.

## Worked example

Here is the complete page you will create. Read it first. You will paste it into a file in step 4.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, world</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

The lines from `<!DOCTYPE html>` to `</head>` are setup lines: they describe the page and are not shown on it, except the `<title>` text, which appears on the browser tab. The `<body>` holds everything the browser shows in the window. Copy the setup lines exactly; Lesson 3 explains each one. Today you edit only the words inside `<title>`, `<h1>` and `<p>`.

Do these steps on your computer.

1. In VS Code, look at the **Explorer** (the file list on the left). It should show the folder `my-site`.

   You should see: the name MY-SITE at the top of the list, with nothing under it.
   If you see something else: if it says "You have not yet opened a folder", choose File, then Open Folder, pick `my-site` in Documents, and click **Select Folder** on Windows or **Open** on macOS. If Documents appears under OneDrive in the list on the left, open that one.

2. Move the mouse over the MY-SITE row in the Explorer. Small icons appear on the right of the row. Click the first one, which looks like a page with a plus sign. Its label is **New File**.

   You should see: a text box inside the Explorer, where you can type a name.
   If you see something else: if no icons appear, right-click an empty space under MY-SITE and choose **New File**.

3. Type `index.html` and press Enter. Use lowercase letters, with no spaces.

   You should see: `index.html` listed under MY-SITE, and an empty tab named `index.html` open in the editor.
   If you see something else: if the name is wrong, right-click the file in the Explorer, choose **Rename**, type `index.html` and press Enter.

4. Click inside the empty editor. Copy the code from the box above and paste it. Paste with Ctrl+V on Windows or Cmd+V on macOS.

   You should see: 12 lines of text in several colours, and a white dot on the `index.html` tab where the × was. The dot means "changed but not saved".
   If you see something else: if all the text is one colour, the file name probably does not end in `.html`. Rename it as in step 3.

5. Save the file. Press Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the white dot on the tab turns back into ×.
   If you see something else: if the dot stays, click inside the editor and press the keys again, or choose File, then Save.

6. Open a terminal inside VS Code: choose Terminal, then New Terminal.

   You should see: a panel at the bottom with a line that ends in `my-site>` on Windows, or a line that ends in `my-site %` on macOS.
   If you see something else: if the line ends in a different folder name, close the panel with the bin icon and open a new terminal. A terminal opened this way starts in the folder VS Code has open.

7. Type `ls` and press Enter. This is the command from Developer Orientation that lists the files in the folder.

   You should see: `index.html`. On Windows it appears in a small table with the columns Mode, LastWriteTime, Length and Name.
   If you see something else: if nothing is listed, the file is not in `my-site`. Check that the Explorer shows `index.html` under MY-SITE, then repeat step 6.

8. Open the page in Chrome from the terminal.
   - **Windows (PowerShell):** type `start chrome index.html` and press Enter.
   - **macOS:** type `open -a "Google Chrome" index.html` and press Return.

   You should see: Chrome opens with a tab titled "My first page". In the window, a large bold "Hello, world" has the smaller line "This is my first web page." under it. The **address bar** (the box at the top of Chrome that shows where the page is) starts with `file:///`. That means the page is a file on your own computer, not on the internet.
   If you see something else: if Chrome shows "Your file was not found", read Common mistakes, number 3. If it shows code instead of words, read number 2.

9. Now open the same file a second way, without the terminal. Close the Chrome tab first.
   - **Windows:** open File Explorer (the Windows program that shows your folders), open Documents, then open `my-site`. Right-click `index.html`, choose **Open with**, then **Google Chrome**.
   - **macOS:** open Finder, open Documents, then open `my-site`. Right-click `index.html` (or hold Control and click), choose **Open With**, then **Google Chrome**.

   You should see: the same page as in step 8.
   If you see something else: on Windows the file may be listed as `index`, with no `.html`, because Windows hides file extensions by default. That is normal, and the file is still `index.html`. If "Open with" does not list Chrome, choose **Choose another app** and pick Chrome from the list.

## Guided practice

Now change the words. You will edit one line and check your prediction before you save.

```html
<h1>Hello, my name is TODO</h1>
```

1. In VS Code, find the line `<h1>Hello, world</h1>`. Change it so it looks like the line above, but write your own first name in place of `TODO`. Keep the `<h1>` and `</h1>` exactly as they are.

   You should see: the line shows your name, and the tab has a white dot again.
   If you see something else: if you deleted part of a tag, press Ctrl+Z (Cmd+Z on macOS) to undo, and try again.

2. Predict first: after you refresh Chrome now, will it show the old heading or your new one? Say your answer out loud. Then go back to Chrome, open `index.html` again if you closed it (use step 8 or 9), and **refresh** the page. To refresh, press F5 (Ctrl+R on Windows, Cmd+R on macOS) or click the circular arrow to the left of the address bar.

   You should see: the old heading, "Hello, world". VS Code has not written your change to the file yet, and Chrome reads the file.
   If you see something else: if you see your new name already, VS Code is set to save automatically. That is fine, and you can go on to step 3.

3. Go back to VS Code and save: Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the white dot turns into ×.

4. Go back to Chrome and refresh again.

   You should see: "Hello, my name is" followed by your name.
   If you see something else: check that the tab in VS Code is `index.html` and that it shows ×, not a dot. Then check that both `<h1>` and `</h1>` are on the line. If the page shows tags as text, read Common mistakes, number 2.

## Your turn

**Goal:** make the page say something about you, using only what you did above.

1. Change the words between `<title>` and `</title>` to a title of your choice, for example `About me`.
2. Add a second paragraph under the first one. It should say one thing you want to learn. Use the same pattern as the existing paragraph: `<p>`, your sentence, `</p>`.

**Check yourself:** save, then refresh Chrome. All of these should be true:

- [ ] Chrome shows your heading, then two separate paragraphs.
- [ ] The Chrome tab shows your new title.
- [ ] Every opening tag you wrote has a matching closing tag.
- [ ] The tab in VS Code shows ×, not a dot.

If the second paragraph does not appear, check that it sits between `<body>` and `</body>` and that it has both its `<p>` and its `</p>`. Keep this file as it is when you finish. Lesson 2 continues from it.

## Common mistakes

**1. The page did not change after I edited it.**

- Symptom: you changed the text in VS Code and refreshed Chrome, and Chrome still shows the old text. The tab in VS Code shows a white dot instead of ×.
- Cause: the change is not saved. Chrome reads the file from your disk, and VS Code has not written your change there yet.
- Fix: click in the editor, press Ctrl+S (Cmd+S on macOS) until the dot turns into ×, then refresh Chrome. This happens to every developer, often, so it is normal.

**2. Chrome shows code instead of a page.**

- Symptom: Chrome shows the tags themselves as plain text, in one font, starting like this:

  ```text
  <!DOCTYPE html>
  <html lang="en">
    <head>
  ```

- Cause: the file's extension is not `.html`. Most often the file is really named `index.html.txt`, because Windows hides extensions and the name looks right. This happens if the file was made as a text document in File Explorer or in Notepad.
- Fix: in VS Code, check the Explorer for the exact file name. On Windows you can also show extensions: in File Explorer choose View, then Show, then **File name extensions**. Rename the file to exactly `index.html` and confirm the warning about changing the extension. Run `ls` in the terminal to check the name.

**3. Chrome says the file was not found.**

- Symptom: Chrome shows a page with this text:

  ```text
  Your file was not found
  It may have been moved, edited, or deleted.
  ERR_FILE_NOT_FOUND
  ```

- Cause: the address Chrome was given does not match a real file. Usually the file name has a typo (for example `index.htm`), the terminal was in a different folder, or the file was moved or renamed after you opened it.
- Fix: close the terminal panel with the bin icon, open a new one with Terminal, then New Terminal, and run `ls` to see the exact file name. Then run the command in step 8 again with that name. This message is normal after a typo: it tells you exactly what is wrong.

## Check your understanding

1. **(Predict)** You change `Hello, world` to `Hello, Ada` in VS Code and press F5 in Chrome without saving. What does Chrome show, and why?
2. **(Spot the bug)** Ada opens her page and Chrome shows `<!DOCTYPE html>` and the other tags as plain text. In File Explorer her file is listed as `index`, with no `.html`. What is the most likely cause, and how would she check?
3. **(Recall — What Is a Terminal, and How Do You Use One)** Which command lists the files in the folder your terminal is in? What should it show right after step 5 of the worked example?
4. **(Predict)** The address bar shows an address starting with `file:///`. A friend types that same address into Chrome on their own computer. Will they see your page? Why or why not?

## Answers

1. Chrome shows `Hello, world`, the old text. Chrome reads the file on disk, and without saving VS Code has not written your change there. The white dot on the tab tells you the change is unsaved.
2. The file is most likely named `index.html.txt`: Windows hides the `.txt` ending, and a `.txt` file is shown as plain text. She can check by showing file name extensions (View, then Show, then File name extensions in File Explorer) or by looking at the exact name in the VS Code Explorer. The fix is to rename the file to `index.html`.
3. The command is `ls`. It should show `index.html`, because the file is saved in `my-site` and the terminal is in `my-site`.
4. No. An address that starts with `file:///` points to a file on your own computer. Your friend's computer has no such file, so Chrome would show "Your file was not found". Putting a page on the internet comes at the end of this module.

## Recap

- You created `index.html` in `my-site` from VS Code and saved it. The white dot on the tab means unsaved, and × means saved.
- You opened the file in Chrome from the terminal and from File Explorer or Finder. An address that starts with `file:///` is on your own computer only.
- You edited the text, predicted what Chrome would show, saved, and refreshed to confirm.

Next: [Tags, elements and attributes](/learner/roadmap/html-foundations/tags-elements-and-attributes)
