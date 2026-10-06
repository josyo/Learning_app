# Module: HTML Foundations

*Make a real web page, structure it so people and software can understand it, and check it. Builds on Developer Orientation: you start from the empty `my-site` folder you created there. Written for a learner with no prior experience; Windows first, macOS differences noted.*

<!-- REWRITE IN PROGRESS (see docs/plans/html-foundations.md). Lesson 1 is written and awaiting the owner's approval. Lessons 2-11 and the assignment are not written yet. This module is HELD: it is validated but never imported. -->

### Lesson 1 — Your first web page
<!-- slug: your-first-web-page -->

**By the end you can:**

- Create a file named `index.html` in your `my-site` folder from VS Code, and save it.
- Open that file in Chrome from the terminal and from File Explorer.
- Predict what Chrome will show after you edit the file, then change the text, save and refresh to check.

**Before you start:** You finished the Developer Orientation module, including the Environment Check assignment. That means VS Code is installed, the empty `my-site` folder is in your Documents folder, and you can open a terminal inside VS Code. Google Chrome must also be installed. On Windows, check by opening the Start menu and typing `Chrome`. If it does not appear, install Chrome first.

**Time:** ~35 min

**Last verified:** 2026-10-06. The page code was checked with the html-validate tool. The steps and screen wording below have **not yet been run** on a Windows or macOS computer, so a button or message may differ slightly from your screen. If a step does not match, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

By the end of this module you will have a small website of your own. Every page of it is a file you create, save and open exactly the way you do today. If saving or opening goes wrong, nothing later works. The two most common problems, an old page that will not change and a page that shows code instead of words, look alarming. You will meet both on purpose here, so they are not frightening later.

## Files, extensions and browsers

A web page is a **file**: a named piece of saved text on your computer. The text is written in **HTML** (HyperText Markup Language), the language that tells a browser what is on a page. HTML is **plain text**: letters you type, with no hidden formatting. A **browser** such as Chrome is a program that reads an HTML file and draws the page you see. It reads the file from your disk each time you open or refresh the page.

The part of a file name after the last dot is its **file extension**. The extension `.html` tells your computer that the file is a web page. Today's file is called `index.html`. That is the standard name for the front page of a site: when your site is online later, visitors reach it without typing the file name.

## Tags in one minute

A **tag** is a word inside angle brackets, such as `<h1>`. Most tags come in pairs: an **opening tag** such as `<h1>` and a **closing tag** such as `</h1>`, which has a slash. The browser shows the text between the pair. A few tags have no closing tag; the setup lines of the page below contain some, so copy them exactly.

- `<h1>` makes a **heading**, the big title of a page.
- `<p>` makes a **paragraph**, a block of ordinary text.
- `<title>` sets the **tab title**, the words on the browser tab at the top of the window.

On most keyboards you type `<` with Shift and the comma key, `>` with Shift and the full stop key, and `/` with the key to the right of the full stop key. Lesson 2 names every part of a tag.

## Worked example

Here is the complete page you will create. Read it first. You will copy it into a file in steps 4 and 5.

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
   If you see something else:
   - If the left side shows no file list, click the top icon in the thin strip of icons on the far left. It looks like two overlapping pages.
   - If it says "You have not yet opened a folder", choose File, then Open Folder, pick `my-site` in Documents, and click **Select Folder** on Windows or **Open** on macOS. If VS Code asks "Do you trust the authors of the files in this folder?", click **Yes, I trust the authors**.

2. Move the mouse over the MY-SITE row in the Explorer. Small icons appear on the right of the row. Click the first one, which looks like a page with a plus sign. Its label is **New File**.

   You should see: a text box inside the Explorer, where you can type a name.
   If you see something else: if no icons appear, right-click an empty space under MY-SITE and choose **New File**.

3. Type `index.html` and press Enter. Use lowercase letters, with no spaces.

   You should see: `index.html` listed under MY-SITE, and an empty tab named `index.html` open in the **editor** (the large area in the middle of VS Code where the text of a file appears).
   If you see something else: if the name is wrong, right-click the file in the Explorer, choose **Rename**, type `index.html` and press Enter.

4. Copy the code. Do this on your computer: open this lesson in a browser on it, in the same way as on your phone, so that you can copy. Do not retype the code. Point at the start of the code box above, hold the left mouse button down, drag to the end of the code, and release. Then press Ctrl+C on Windows or Cmd+C on macOS.

   You should see: the code highlighted in colour.
   If you see something else: if only part of the code is highlighted, click once anywhere else on the page and try again.

5. Click inside the empty editor and paste. Press Ctrl+V on Windows or Cmd+V on macOS.

   You should see: 12 lines of text in several colours, and a small **dot** on the `index.html` tab where the × (the close button) was. The dot means "changed but not saved". It looks white in VS Code's dark theme and dark in its light theme. If you cannot see the ×, point at the tab.
   If you see something else: if all the text is one colour, the file name probably does not end in `.html`. Rename it as in step 3.

6. Save the file. Press Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the dot on the tab turns back into ×.
   If you see something else: if the dot stays, click inside the editor and press the keys again, or choose File, then Save.

7. Open a terminal inside VS Code: choose Terminal, then New Terminal.

   You should see: a panel at the bottom with a line that ends in `my-site>`. On Windows the line starts with `PS`, which means the terminal is PowerShell. On macOS the line ends in `my-site %`.
   If you see something else: if the line ends in a different folder name, close the panel with the bin icon (a trash can) and open a new terminal. A terminal opened this way starts in the folder VS Code has open.

8. Type `ls` and press Enter. This is the command from Developer Orientation that lists the files in the folder.

   You should see: `index.html`. On Windows it appears in a small table with the columns Mode, LastWriteTime, Length and Name.
   If you see something else:
   - If you see other files and no `index.html`, the terminal is in a different folder. Close the panel with the bin icon and repeat step 7.
   - If nothing is listed, the file is not in `my-site`. Check that the Explorer shows `index.html` under MY-SITE. If it does not, repeat steps 2 and 3 with the mouse over the MY-SITE row.

9. Open the page in Chrome from the terminal.
   - **Windows (PowerShell):** type `start chrome index.html` and press Enter.
   - **macOS:** type `open -a "Google Chrome" index.html` and press Return.

   You should see: Chrome opens with a tab titled "My first page". In the window, a large bold "Hello, world" has the smaller line "This is my first web page." under it. The **address bar** (the box at the top of Chrome that shows where the page is) starts with `file:///`. That means the page is a file on your own computer, not on the internet.
   If you see something else:
   - If Chrome shows "Your file was not found", read Common mistakes, number 3. If it shows code instead of words, read number 2.
   - If PowerShell prints a red error saying it cannot find `chrome`, that is normal on some computers. Skip to step 10, which does the same job another way.

10. Now open the same file a second way, without the terminal. Close the Chrome tab first. In VS Code, right-click `index.html` in the Explorer and choose **Reveal in File Explorer** on Windows, or **Reveal in Finder** on macOS. This opens the correct folder, wherever your Documents folder really is. Then right-click `index.html` in that window and choose **Open with** and then **Google Chrome** (on macOS: **Open With**, then **Google Chrome**).

    You should see: the same page as in step 9. **File Explorer** is the Windows program that shows your folders, and **Finder** is the macOS one.
    If you see something else:
    - If **Open with** does not list Chrome, choose **Choose another app** and pick Chrome from the list.
    - On Windows the file may be listed as `index`, with no `.html`. Windows hides file extensions by default, which is normal. To see them: on Windows 10 click the **View** tab at the top of the window and tick **File name extensions**. On Windows 11 click **View**, then **Show**, then **File name extensions**. The name should now read `index.html`. If it reads `index.html.txt`, read Common mistakes, number 2.

## Guided practice

Now change the words. You will edit one line and decide what Chrome will show before you save.

```html
<h1>Hello, my name is TODO</h1>
```

1. In VS Code, find the line `<h1>Hello, world</h1>`. Change it so it looks like the line above, but write your own first name in place of `TODO`. Keep the `<h1>` and `</h1>` exactly as they are.

   You should see: the line shows your name, and the tab has a dot again.
   If you see something else: if you deleted part of a tag, press Ctrl+Z (Cmd+Z on macOS) to undo, and try again.

2. Predict first: after you refresh Chrome now, will it show the old heading or your new one? Decide your answer before you go on. Then go back to Chrome, open `index.html` again if you closed it (use step 9 or 10 above), and **refresh** the page. Refreshing makes the browser read the file again. Press Ctrl+R on Windows or Cmd+R on macOS, or click the circular arrow to the left of the address bar. The F5 key works on Windows too; on some laptops you must hold the Fn key as well.

   You should see: the old heading, "Hello, world". VS Code has not written your change to the file yet, and Chrome reads the file.
   If you see something else: if you see your new name already, VS Code is set to save automatically. That is fine, and you can go on to step 3.

3. Go back to VS Code and save: Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the dot turns into ×.

4. Go back to Chrome and refresh again.

   You should see: "Hello, my name is" followed by your name.
   If you see something else: check that the tab in VS Code is `index.html` and that it shows ×, not a dot. Then check that both `<h1>` and `</h1>` are on the line. If the page shows tags as text, read Common mistakes, number 2.

## Your turn

**Goal:** make the page say something about you, using only what you did above.

1. Change the words between `<title>` and `</title>` to a title of your choice, for example `About me`.
2. Add a second paragraph under the first one. It should say one thing you want to learn. Click at the end of the line `<p>This is my first web page.</p>`, press Enter to start a new line, and write the new paragraph on that line, before `</body>`. Use the same pattern as the first paragraph: `<p>`, your sentence, `</p>`.

VS Code may type the closing `</p>` for you as soon as you type `<p>`. If it does, type your sentence between the two tags and do not type `</p>` again. If a small list of suggestions pops up, press Esc before you press Enter.

**Check yourself:** save, then refresh Chrome. All of these should be true:

- [ ] Chrome shows your heading, then two separate paragraphs.
- [ ] The Chrome tab shows your new title.
- [ ] Every opening tag you wrote has a matching closing tag, and no closing tag appears twice in a row.
- [ ] The tab in VS Code shows ×, not a dot.

If the second paragraph does not appear, check that it sits between `<body>` and `</body>` and that it has both its `<p>` and its `</p>`. Keep this file as it is when you finish. Lesson 2 continues from it.

## Common mistakes

**1. The page did not change after I edited it.**

- Symptom: you changed the text in VS Code and refreshed Chrome, and Chrome still shows the old text. The tab in VS Code shows a dot instead of ×.
- Cause: the change is not saved. Chrome reads the file from your disk, and VS Code has not written your change there yet.
- Fix: click in the editor, press Ctrl+S (Cmd+S on macOS) until the dot turns into ×, then refresh Chrome. This happens to every developer, often, so it is normal.

**2. Chrome shows code instead of a page.**

- Symptom: Chrome shows the tags themselves as plain text, in one font, starting like this:

  ```text
  <!DOCTYPE html>
  <html lang="en">
    <head>
  ```

- Cause: the file's extension is not `.html`. Most often the file is really named `index.html.txt`. Windows hides extensions, so the name looks right. This happens if the file was made as a text document in File Explorer or in Notepad.
- Fix: in VS Code, check the Explorer for the exact file name. Show extensions in File Explorer as in step 10. Rename the file to exactly `index.html`. Windows warns that changing the extension may make the file unusable; click **Yes**. Run `ls` in the terminal to check the name.

**3. Chrome says the file was not found.**

- Symptom: Chrome shows a page with this text:

  ```text
  Your file was not found
  It may have been moved, edited, or deleted.
  ERR_FILE_NOT_FOUND
  ```

- Cause: the address Chrome was given does not match a real file. Usually the file name has a typo (for example `index.htm`), the terminal was in a different folder (the line in step 7 should end in `my-site`), or the file was moved or renamed after you opened it.
- Fix: close the terminal panel with the bin icon, open a new one with Terminal, then New Terminal, and run `ls` to see the exact file name. Then run the command in step 9 again with that name. This message is normal after a typo: it tells you exactly what is wrong.

**4. There is an empty gap after my new paragraph.**

- Symptom: Chrome shows extra blank space under your second paragraph, and in VS Code the line ends like this:

  ```text
  <p>I want to learn how to build websites.</p></p>
  ```

- Cause: VS Code typed the closing `</p>` for you, and you typed it again. The second `</p>` has no opening tag, and the browser turns it into an empty paragraph.
- Fix: delete the extra `</p>` so each paragraph has exactly one opening tag and one closing tag. Save and refresh. This is normal: almost everyone does it once.

## Check your understanding

1. **(Predict)** You change `Hello, world` to `Hello, Ada` in VS Code and press Ctrl+R in Chrome without saving. What does Chrome show, and why?
2. **(Spot the bug)** Ada opens her page and Chrome shows `<!DOCTYPE html>` and the other tags as plain text. In File Explorer her file is listed as `index`, with no `.html`. What is the most likely cause, and how would she check?
3. **(Recall — What Is a Terminal, and How Do You Use One)** Which command lists the files in the folder your terminal is in? What should it list for `my-site` once you have finished steps 1 to 6 of the worked example?
4. **(Predict)** The address bar shows an address starting with `file:///`. A friend types that same address into Chrome on their own computer. Will they see your page? Why or why not?
5. **(Spot the bug)** Sam's second paragraph looks fine in the editor, but Chrome shows extra blank space after it. The line reads `<p>I like maps.</p></p>`. What is wrong?

## Answers

1. Chrome shows `Hello, world`, the old text. Chrome reads the file on disk, and without saving VS Code has not written your change there. The dot on the tab tells you the change is unsaved.
2. The file is most likely named `index.html.txt`: Windows hides the `.txt` ending, and a `.txt` file is shown as plain text. She can check by showing file name extensions in File Explorer (the View tab on Windows 10, or View then Show on Windows 11) or by looking at the exact name in the VS Code Explorer. The fix is to rename the file to `index.html`.
3. The command is `ls`. It should list `index.html`, because that is the only file you created in `my-site` and the terminal is in `my-site`.
4. No. An address that starts with `file:///` points to a file on your own computer. Your friend's computer has no such file, so Chrome would show "Your file was not found". Putting a page on the internet comes at the end of this module.
5. There are two closing `</p>` tags and only one opening `<p>`. The editor probably added the first `</p>` automatically and Sam typed the second. The extra `</p>` has nothing to close, so the browser makes an empty paragraph, which is the blank space. The fix is to delete one `</p>`.

## Recap

- You created `index.html` in `my-site` from VS Code and saved it. A dot on the tab means unsaved, and × means saved.
- You opened the file in Chrome from the terminal and from File Explorer or Finder. An address that starts with `file:///` is on your own computer only.
- You edited the text, predicted what Chrome would show, saved, and refreshed to confirm.

Next: [Tags, elements and attributes](/learner/roadmap/html-foundations/tags-elements-and-attributes)
