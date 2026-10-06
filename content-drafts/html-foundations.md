# Module: HTML Foundations

*Make a real web page, structure it so people and software can understand it, and check it. Builds on Developer Orientation: you start from the empty `my-site` folder you created there. Written for a learner with no prior experience; Windows first, macOS differences noted.*

<!-- Rewritten 2026-10-06 (see docs/plans/html-foundations.md). Lesson 1 was approved by the owner. Lessons 2-11 and the assignment are new and unreviewed by the owner. No lesson has been run on Windows or macOS yet. -->

### Lesson 1 — Your first web page
<!-- slug: your-first-web-page -->

**By the end you can:**

- Create a file named `index.html` in your `my-site` folder from VS Code, and save it.
- Open that file in Chrome from the terminal and from **File Explorer** (Windows) or **Finder** (macOS), the programs that show your folders.
- Predict what Chrome will show after you edit the file, then change the text, save and refresh to check.

**Before you start:** You finished the Developer Orientation module, including the Environment Check assignment. That means VS Code is installed, the empty `my-site` folder is in your Documents folder, and you can open a terminal inside VS Code. Google Chrome must also be installed. On Windows, check by opening the Start menu and typing `Chrome`. If it does not appear, install Chrome first.

**Time:** ~35 min

**Last verified:** 2026-10-06. The page code was checked with the html-validate tool. The steps and screen wording below have **not yet been run** on a Windows or macOS computer, so a button or message may differ slightly from your screen. If a step does not match, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

By the end of this module you will have a small website of your own. Every page of it is a file you create, save and open exactly the way you do today. If saving or opening goes wrong, nothing later works. The two most common problems, an old page that will not change and a page that shows code instead of words, look alarming. You will meet both on purpose here, so they are not frightening later.

## Files, extensions and browsers

A web page is a **file**: a named piece of saved text on your computer. The text is written in **HTML** (HyperText Markup Language), the language that tells a browser what is on a page. HTML is **plain text**: letters you type, with no hidden formatting. A **browser** such as Chrome is a program that reads an HTML file and draws the page you see. It reads the file from your disk each time you open the page or **refresh** it, which means load it again.

The part of a file name after the last dot is its **file extension**. The extension `.html` tells your computer that the file is a web page. Today's file is called `index.html`. That is the standard name for the front page of a site: when your site is online later, visitors reach it without typing the file name.

## Tags in one minute

A **tag** is a word inside angle brackets, such as `<h1>`. Most tags come in pairs: an **opening tag** such as `<h1>` and a **closing tag** such as `</h1>`, which has a slash. The browser shows the text between the pair. A few tags have no closing tag; the setup lines of the page below contain some, so copy them exactly.

- `<h1>` makes a **heading**, the big title of a page.
- `<p>` makes a **paragraph**, a block of ordinary text.
- `<title>` sets the **tab title**, the words on the browser tab at the top of the window.

On most keyboards you type `<` with Shift and the comma key, `>` with Shift and the full stop key, and `/` with the key to the right of the full stop key. Lesson 2 names every part of a tag.

## Worked example

Here is the complete page you will create. Read it first. You will copy it into a file in steps 4 to 6.

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

4. Open this lesson in a browser on your computer, in the same way as on your phone, so that you can copy the code. Do not retype it.

   You should see: this page, with the code box above.
   If you see something else: if you are not signed in, sign in with the same details as on your phone.

5. Point at the start of the code box above, hold the left mouse button down, drag to the end of the code, and release. Then press Ctrl+C on Windows or Cmd+C on macOS.

   You should see: the code highlighted in colour.
   If you see something else: if only part of the code is highlighted, click once anywhere else on the page and try again.

6. Click inside the empty editor and paste. Press Ctrl+V on Windows or Cmd+V on macOS.

   You should see: 12 lines of text in several colours, and a small **dot** on the `index.html` tab where the × (the close button) was. The dot means "changed but not saved". It looks white in VS Code's dark theme and dark in its light theme. If you cannot see the ×, point at the tab.
   If you see something else: if all the text is one colour, the file name probably does not end in `.html`. Rename it as in step 3.

7. Save the file. Press Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the dot on the tab turns back into ×.
   If you see something else: if the dot stays, click inside the editor and press the keys again, or choose File, then Save.

8. Open a terminal inside VS Code: choose Terminal, then New Terminal.

   You should see: a panel at the bottom with a line that ends in `my-site>`. On Windows the line starts with `PS`, which means the terminal is PowerShell. On macOS the line ends in `my-site %`.
   If you see something else: if the line ends in a different folder name, close the panel with the bin icon (a trash can) and open a new terminal. A terminal opened this way starts in the folder VS Code has open.

9. Type `ls` and press Enter. This is the command from Developer Orientation that lists the files in the folder.

   You should see: `index.html`. On Windows it appears in a small table with the columns Mode, LastWriteTime, Length and Name.
   If you see something else:
   - If you see other files and no `index.html`, the terminal is in a different folder. Close the panel with the bin icon and repeat step 8.
   - If nothing is listed, the file is not in `my-site`. Check that the Explorer shows `index.html` under MY-SITE. If it does not, repeat steps 2 and 3 with the mouse over the MY-SITE row.

10. Open the page in Chrome from the terminal.
    - **Windows (PowerShell):** type `start chrome "$PWD\index.html"` and press Enter. The `$PWD\index.html` part is the full path of the file, so Chrome opens it as a file on your computer.
    - **macOS:** type `open -a "Google Chrome" index.html` and press Return.

    You should see: Chrome opens with a tab titled "My first page". In the window, a large bold "Hello, world" has the smaller line "This is my first web page." under it. The **address bar** (the box at the top of Chrome that shows where the page is) starts with `file:///`. That means the page is a file on your own computer, not on the internet.
    If you see something else:
    - If Chrome shows an error page that ends with `ERR_FILE_NOT_FOUND`, read Common mistakes, number 3. If it shows code instead of words, read number 2.
    - If PowerShell prints a red error saying it cannot find `chrome`, that is normal on some computers. Skip to step 11, which does the same job another way.

11. Now open the same file a second way, without the terminal. Close the Chrome tab first. In VS Code, right-click `index.html` in the Explorer and choose **Reveal in File Explorer** on Windows, or **Reveal in Finder** on macOS.

    You should see: a File Explorer or Finder window that shows the `my-site` folder with `index.html` in it. This is the correct folder, wherever your Documents folder really is.
    If you see something else: on Windows the file may be listed as `index`, with no `.html`. Windows hides file extensions by default, which is normal. To see them: on Windows 10 click the **View** tab at the top of the window and tick **File name extensions**. On Windows 11 click **View**, then **Show**, then **File name extensions**. The name should now read `index.html`. If it reads `index.html.txt`, read Common mistakes, number 2.

12. In that window, right-click `index.html` and choose **Open with**, then **Google Chrome**. On macOS choose **Open With**, then **Google Chrome**.

    You should see: the same page as in step 10.
    If you see something else: if **Open with** does not list Chrome, choose **Choose another app** and pick Chrome from the list.

## Guided practice

Now change the words. You will edit one line and decide what Chrome will show before you save.

```html
<h1>Hello, my name is TODO</h1>
```

1. In VS Code, find the line `<h1>Hello, world</h1>`. Change it so it looks like the line above, but write your own first name in place of `TODO`. Keep the `<h1>` and `</h1>` exactly as they are.

   You should see: the line shows your name, and the tab has a dot again.
   If you see something else: if you deleted part of a tag, press Ctrl+Z (Cmd+Z on macOS) to undo, and try again.

2. Predict first: after you refresh Chrome now, will it show the old heading or your new one? Decide your answer before you go on. Then go back to Chrome, open `index.html` again if you closed it (use step 10 above, or steps 11 and 12), and **refresh** the page. Refreshing makes the browser read the file again. Press Ctrl+R on Windows or Cmd+R on macOS, or click the circular arrow to the left of the address bar. The F5 key works on Windows too; on some laptops you must hold the Fn key as well.

   You should see: the old heading, "Hello, world". VS Code has not written your change to the file yet, and Chrome reads the file.
   If you see something else: if you see your new name already, VS Code is set to save automatically. That is fine, and you can go on to step 3.

3. Go back to VS Code and save: Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the dot turns into ×.
   If you see something else: if the dot stays, click inside the editor and press the keys again, or choose File, then Save.

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
- Fix: in VS Code, check the Explorer for the exact file name. Show extensions in File Explorer as in step 11. Rename the file to exactly `index.html`. Windows warns that changing the extension may make the file unusable; click **Yes**. Run `ls` in the terminal to check the name.

**3. Chrome says the file was not found.**

- Symptom: Chrome shows a page with this text:

  ```text
  Your file couldn’t be accessed
  It may have been moved, edited, or deleted.
  ERR_FILE_NOT_FOUND
  ```

  Older versions of Chrome say "Your file was not found" on the first line. The last line is the same.

- Cause: the address Chrome was given does not match a real file. Usually the file name has a typo (for example `index.htm`), the terminal was in a different folder (the line in step 8 should end in `my-site`), or the file was moved or renamed after you opened it.
- Fix: close the terminal panel with the bin icon, open a new one with Terminal, then New Terminal, and run `ls` to see the exact file name. Then run the command in step 10 again with that name. This message is normal after a typo: it tells you exactly what is wrong.

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
3. **(Recall — What Is a Terminal, and How Do You Use One)** Which command lists the files in the folder your terminal is in? What should it list for `my-site` once you have finished steps 1 to 7 of the worked example?
4. **(Predict)** The address bar shows an address starting with `file:///`. A friend types that same address into Chrome on their own computer. Will they see your page? Why or why not?
5. **(Spot the bug)** Sam's second paragraph looks fine in the editor, but Chrome shows extra blank space after it. The line reads `<p>I like maps.</p></p>`. What is wrong?

## Answers

1. Chrome shows `Hello, world`, the old text. Chrome reads the file on disk, and without saving VS Code has not written your change there. The dot on the tab tells you the change is unsaved.
2. The file is most likely named `index.html.txt`: Windows hides the `.txt` ending, and a `.txt` file is shown as plain text. She can check by showing file name extensions in File Explorer (the View tab on Windows 10, or View then Show on Windows 11) or by looking at the exact name in the VS Code Explorer. The fix is to rename the file to `index.html`.
3. The command is `ls`. It should list `index.html`, because that is the only file you created in `my-site` and the terminal is in `my-site`.
4. No. An address that starts with `file:///` points to a file on your own computer. Your friend's computer has no such file, so Chrome would show an error page that ends with `ERR_FILE_NOT_FOUND`. Uploading your files comes at the end of this module; turning them into a live page is an optional extra.
5. There are two closing `</p>` tags and only one opening `<p>`. The editor probably added the first `</p>` automatically and Sam typed the second. The extra `</p>` has nothing to close, so the browser makes an empty paragraph, which is the blank space. The fix is to delete one `</p>`.

## Recap

- You created `index.html` in `my-site` from VS Code and saved it. A dot on the tab means unsaved, and × means saved.
- You opened the file in Chrome from the terminal and from File Explorer or Finder. An address that starts with `file:///` is on your own computer only.
- You edited the text, predicted what Chrome would show, saved, and refreshed to confirm.

Next: [Tags, elements and attributes](/learner/roadmap/html-foundations/tags-elements-and-attributes)

---

### Lesson 2 — Tags, elements and attributes
<!-- slug: tags-elements-and-attributes -->

**By the end you can:**

- Name the opening tag, the content, the closing tag and the attribute of an element.
- Write a heading, a paragraph and a link to another website in `index.html`.
- Fix an element that is missing its closing tag.

**Before you start:** Lesson 1, "Your first web page". You have `index.html` in `my-site`, you can edit it in VS Code, save it, and open or refresh it in Chrome. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~30 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator, and the behaviour of the broken pages was checked in Chromium 141. The steps and screen wording have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Every web page is built from the same small building block. Once you can read one, you can read all of them, and you can find what is wrong when one breaks. A single missing closing tag can turn a whole page into one giant heading. A link with the wrong kind of address goes nowhere. Today you learn the parts well enough to spot what is missing.

## The parts of an element

An **element** is one building block of a page: an opening tag, some content, and a closing tag. In `<p>Hello</p>`, the **opening tag** is `<p>`, the **content** is `Hello`, and the **closing tag** is `</p>`.

Elements can sit inside other elements. This is called **nesting**. In `<p>Read <a href="https://developer.mozilla.org/">MDN</a>.</p>`, the `<a>` element is nested inside the `<p>` element. The inner element must be closed before the outer one.

A few elements have no content and no closing tag, such as `<meta>`. You met them in Lesson 1.

## Attributes and links

An **attribute** is extra information inside an opening tag. It has a **name**, an equals sign, and a **value** in double quotes: `href="https://developer.mozilla.org/"`.

The `<a>` element makes a **link**: text you can click to go to another page. Its `href` attribute holds the address to go to. A link whose address starts with `https://` and names a whole website is an **absolute link**. It works from anywhere, because the address is complete. Lesson 6 covers the other kind.

## Worked example

Here is your page after this step. It is the page from Lesson 1 with one new line, the last `<p>`. Your title and second paragraph may be different from the ones shown, and that is fine.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About me</title>
  </head>
  <body>
    <h1>Hello, world</h1>
    <p>This is my first web page.</p>
    <p>I want to learn how to build websites.</p>
    <p>You can read how the web works on <a href="https://developer.mozilla.org/">MDN Web Docs</a>.</p>
  </body>
</html>
```

In the new line, `<p>` and `</p>` wrap the whole sentence. Inside it, `<a href="https://developer.mozilla.org/">` is the opening tag of the link, `MDN Web Docs` is its content, and `</a>` closes it.

1. In VS Code, open `index.html`. Click its name in the **Explorer** (the file list on the left).

   You should see: your page's text in the editor.
   If you see something else: if the Explorer is hidden, click the top icon in the thin strip of icons on the far left.

2. Click at the end of the last paragraph line, right after its `</p>`, and press Enter to start a new line.

   You should see: the cursor on a new, empty line above `</body>`.

3. Type the new line exactly as in the box above, starting at `<p>You can read`. VS Code may add a closing `</p>` or `</a>` for you when you type the opening tag. If it does, type only the content between the tags and do not type the closing tag again.

   You should see: the line in the editor, with the link text `MDN Web Docs` between `<a href="…">` and `</a>`.
   If you see something else: if the line ends in `</p></p>` or `</a></a>`, delete the extra closing tag. VS Code may also add a closing quote when you type an opening one, so that you see `""`. Delete the extra quote.

4. Save: press Ctrl+S on Windows or Cmd+S on macOS. Then refresh Chrome. If you closed it, open the file again with the command from Lesson 1: on Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. These commands work in the terminal in VS Code that starts with `PS` on Windows, when it is inside `my-site`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12. If Chrome is already open on the page, press the refresh button instead.

   You should see: your page with a new line at the bottom. `MDN Web Docs` is blue and underlined, which is how Chrome shows a link.
   If you see something else: if the new line is missing, check that the tab in VS Code shows no dot, which means saved. If everything after the link is also blue and underlined, a closing `</a>` is missing.

5. Click the link.

   You should see: the MDN Web Docs website opens. Click Chrome's back arrow, at the top left, to return to your page.
   If you see something else: if Chrome shows an error page that ends with `ERR_FILE_NOT_FOUND`, the address after `href=` is missing `https://`. See Common mistakes, number 2.

## Guided practice

Add a link to a website you like. Replace both `TODO` words.

```html
<p>A website I like: <a href="TODO">TODO</a></p>
```

1. Open that website in Chrome. Click the address bar, select all the text in it, and copy it. Press Ctrl+A then Ctrl+C on Windows, or Cmd+A then Cmd+C on macOS.

   You should see: the address highlighted. It starts with `https://`.
   If you see something else: if there is no `https://` at the start, click the address bar once more. Chrome can hide the start of an address until you click it.

2. In VS Code, add a new paragraph under the MDN line, like the line above. Paste the address in place of the first `TODO`. Press Ctrl+V on Windows or Cmd+V on macOS. Type the name of the website in place of the second `TODO`.

   You should see: a line like `<p>A website I like: <a href="https://www.example.org/">Example</a></p>`, but with your own address and name.
   If you see something else: if the address ends up outside the quotes, move it between the two double quotes.

3. Save, refresh Chrome, and click your new link.

   You should see: the website you chose opens.
   If you see something else: if the link does nothing or shows an error page, check that the address starts with `https://` and sits between double quotes.

## Your turn

**Goal:** find and fix a broken element.

1. In `my-site`, create a new file named `practice.html`. You do this the same way as in Lesson 1: point at the MY-SITE row in the Explorer, click the **New File** icon, type the name and press Enter.
2. Copy the page below into `practice.html` and save it.
3. Open `practice.html` in Chrome. On Windows type `start chrome "$PWD\practice.html"` in the terminal, on macOS type `open -a "Google Chrome" practice.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

```text
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Practice page</title>
  </head>
  <body>
    <h1>My practice page
    <p>This paragraph should be normal text.</p>
    <p>So should this one.</p>
  </body>
</html>
```

All the text looks big and bold. Try to find the cause in the page yourself, and fix it. Common mistakes, number 1, explains it if you get stuck. Save, then refresh Chrome.

**Check yourself:** all of these should be true after you refresh:

- [ ] The heading is big and bold.
- [ ] The two paragraphs are in normal-sized text.
- [ ] You changed one line only, by adding something to it.

## Common mistakes

**1. Everything after my heading is big and bold.**

- Symptom: the heading and the paragraphs under it all look the same: large and bold.
- Cause: the heading has no closing tag. Without `</h1>`, Chrome treats everything after the opening `<h1>` as part of the heading.
- Fix: add `</h1>` at the end of the heading text. A missing closing tag does not stop the page from showing, so you only see it by looking at the result. This is normal.

**2. My link shows an error page.**

- Symptom: you click the link and Chrome shows this:

  ```text
  Your file couldn’t be accessed
  It may have been moved, edited, or deleted.
  ERR_FILE_NOT_FOUND
  ```

- Cause: the address in `href` does not start with `https://`. Chrome then looks for a file with that name next to your page on your computer, and there is none.
- Fix: write the complete address, starting with `https://`. Copy it from Chrome's address bar, as in the guided practice.

**3. The rest of my page is blue and underlined.**

- Symptom: after a link, the text below it is also blue and underlined, as if it were all links.
- Cause: the link has no closing `</a>`.
- Fix: add `</a>` straight after the link text, before the `</p>`. Save and refresh.

## Check your understanding

1. **(Recall)** In `<a href="https://example.com/">Example</a>`, name the opening tag, the attribute name, the attribute value, the content and the closing tag.
2. **(Predict)** You write `<p>Visit <a href="https://example.com/">our site</a> today.</p>`. Which words are blue and underlined in Chrome?
3. **(Spot the bug)** Sam wrote `<a href="developer.mozilla.org">MDN</a>`. Clicking it shows an error page that ends with `ERR_FILE_NOT_FOUND`. What is wrong?
4. **(Recall — Your first web page)** The tab in VS Code shows a dot. What does the dot mean, and what must you do before you refresh Chrome?
5. **(Predict)** You forget the closing `</a>` on a link in the first paragraph. What will the second paragraph look like?

## Answers

1. The opening tag is `<a href="https://example.com/">`. The attribute name is `href`. The attribute value is `https://example.com/`. The content is `Example`. The closing tag is `</a>`.
2. Only `our site`. The content between `<a …>` and `</a>` is the link. The words `Visit` and `today.` are outside it.
3. The address has no `https://` at the start, so it is not an absolute link. Chrome looks for a file named `developer.mozilla.org` on Sam's computer and cannot find one. The fix is `href="https://developer.mozilla.org/"`.
4. The dot means the file is changed but not saved. You must save it, with Ctrl+S or Cmd+S, because Chrome reads the saved file from disk.
5. It will probably be blue and underlined too. Without `</a>`, Chrome keeps treating the text after the link as part of a link.

## Recap

- An element is an opening tag, content and a closing tag. An attribute sits inside the opening tag as a name and a value in double quotes.
- You added an absolute link, whose `href` starts with `https://`, to `index.html` and checked it in Chrome.
- A missing closing tag does not stop a page from showing, but it changes how everything after it looks. You found and fixed one.

Next: [The skeleton of every page](/learner/roadmap/html-foundations/the-skeleton-of-every-page)

---

### Lesson 3 — The skeleton of every page
<!-- slug: the-skeleton-of-every-page -->

**By the end you can:**

- Say what each part of a page's skeleton does: doctype, `<html lang>`, `<head>`, charset, viewport, `<title>` and `<body>`.
- Write a complete page from the skeleton, in a new file named `contact.html`.
- Create `styles.css` and link it from the `<head>` of both pages.

**Before you start:** Lessons 1 and 2. You have `index.html` and `practice.html` in `my-site`, and you can create, save and open files. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~35 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator. The steps and screen wording have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

A browser guesses when a page does not tell it what it is. A page without its setup lines can show a different tab name than you meant, be read out in the wrong language for people who use a **screen reader** (a program that reads a page aloud), or look tiny on a phone. Every page you write from now on starts with the same skeleton, so you will write it many times. Learn what each line does, once.

## The skeleton, part by part

The setup lines you pasted in Lesson 1 are the **skeleton** of a page. Each part has one job:

- `<!DOCTYPE html>`: the **doctype**. It tells the browser this page is modern HTML.
- `<html lang="en">`: wraps the whole page. The `lang` attribute names the page's language (`en` is English). Screen readers use it to pick the right voice, and browsers use it to offer translation.
- `<head>`: information about the page. Nothing in it is drawn in the window.
- `<meta charset="utf-8">`: the **character set**, the code that turns stored data into letters. `utf-8` covers almost every language and symbol.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`: tells a phone to use its real screen width, so the page is not shrunk.
- `<title>`: the name on the browser tab and in bookmarks.
- `<body>`: everything shown in the window.

## Linking a stylesheet

**CSS** (Cascading Style Sheets) is a language for how a page looks: colours, sizes and layout. CSS lives in its own file, a **stylesheet**. A `<link>` element in the `<head>` connects it to the page: `<link rel="stylesheet" href="styles.css">`. The `rel` says what the linked file is for. The `href` is only the file's name, because `styles.css` sits in the same folder as the page. The next module teaches CSS. Today you only make the connection and prove it works.

## Worked example

Here is `index.html` after this step. Your title and paragraphs may differ. The only new line is the `<link>` in the `<head>`. Your `index.html` already has the other parts. If it does not, replace the whole file with this page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About me</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hello, world</h1>
    <p>This is my first web page.</p>
    <p>I want to learn how to build websites.</p>
    <p>You can read how the web works on <a href="https://developer.mozilla.org/">MDN Web Docs</a>.</p>
  </body>
</html>
```

1. In VS Code, point at the MY-SITE row in the Explorer and click the **New File** icon. Type `styles.css` and press Enter.

   You should see: `styles.css` in the Explorer, next to `index.html`, and an empty tab named `styles.css`.
   If you see something else: if the file appears inside a folder, drag it onto the MY-SITE row.

2. Click inside the empty editor and type this one line. It is the only CSS you write in this module. It gives the page a pale yellow background, to prove the link works.

   ```text
   body { background-color: lightyellow; }
   ```

   You should see: the line in the editor, in colour. The tab shows a dot.

3. Save the file with Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the dot on the tab disappears.

4. Open the `index.html` tab. Click at the end of the `<title>` line, press Enter, and type the `<link>` line from the box above.

   You should see: the new line inside `<head>`, between `<title>` and `</head>`. VS Code does not add a closing tag, because `<link>` has none.
   If you see something else: if the line is inside `<body>`, move it up into `<head>`.

5. Save, then refresh Chrome. If you closed it, open the file again: on Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: the page background is pale yellow.
   If you see something else: if the background is still white, read Common mistakes, number 1.

6. Now remove the test. Go to the `styles.css` tab, select all the text with Ctrl+A (Cmd+A on macOS), and type this comment instead. Save, and refresh Chrome.

   ```text
   /* My styles. The CSS module starts here. */
   ```

   You should see: the page background is white again. The yellow was only a test, and the CSS module writes the real styles. A **comment**, the text between `/*` and `*/`, is ignored by the browser, so your file is not broken. The `styles.css` file now holds only a comment, and your pages stay linked to it.

## Guided practice

Create a second page, `contact.html`, from the skeleton. Replace the three `TODO` values. You can find the right values for `lang` and `charset` in `index.html`.

```html
<!DOCTYPE html>
<html lang="TODO">
  <head>
    <meta charset="TODO">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TODO</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Contact</h1>
    <p>You can write to me from this page.</p>
  </body>
</html>
```

1. Create a new file named `contact.html` in `my-site`, as you created `styles.css`. Copy the code above into it. Then replace each `TODO` by typing the right value, so that no `TODO` word is left.

   You should see: a complete page, with `en` after `lang=`, `utf-8` after `charset=` and a title of your choice, for example `Contact`.
   If you see something else: if a `TODO` is still in the file, replace it.

2. Save, then open `contact.html` in Chrome. On Windows type `start chrome "$PWD\contact.html"`. On macOS type `open -a "Google Chrome" contact.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: a tab with your title, a heading `Contact` and one paragraph.
   If you see something else: if the tab shows `contact.html` instead of a title, the `<title>` line is empty or missing.

## Your turn

**Goal:** write a complete page from memory.

Open `practice.html`, which you made in Lesson 2. If you do not have it, create it the same way. Select all its text and delete it. Write a new complete page, using the list of parts above only as a reminder, not the files you already have. It needs a title of `Practice`, one heading, one paragraph, and a `<link>` element that connects `styles.css`, not an `<a>` link.

**Check yourself:** save and open it in Chrome. All of these should be true:

- [ ] The Chrome tab says `Practice`.
- [ ] The window shows your heading and your paragraph, and no tags.
- [ ] The file contains all seven parts: doctype, `<html lang>`, `<head>`, charset, viewport, `<title>`, `<body>`.
- [ ] The `<link>` is inside `<head>`, not `<body>`.

## Common mistakes

**1. The stylesheet does not seem to work.**

- Symptom: you added the `<link>` and the yellow test line, but the page is still white. Chrome shows no error.
- Cause: the name in `href` does not match the file, for example `style.css` instead of `styles.css`, or the file is not saved, or it is not in the same folder as the page. Chrome does not report a missing stylesheet.
- Fix: compare the name in `href` with the name in the Explorer, letter for letter. Check that `styles.css` is in the same folder as the page and shows no dot. This is normal: almost everyone mistypes a file name at first.

**2. The tab shows a file name instead of my title.**

- Symptom: the browser tab shows `contact.html` or a long address instead of a title.
- Cause: the page has no `<title>`, or it is empty, or it sits outside `<head>`.
- Fix: add `<title>Contact</title>` inside `<head>`, save, and refresh.

**3. My page looks tiny on a phone.**

- Symptom: you see this later, when the page is on a phone or in the phone-size view in the next module: the text is very small, as if a wide desktop page was shrunk to fit.
- Cause: the `<meta name="viewport" …>` line is missing or mistyped.
- Fix: add `<meta name="viewport" content="width=device-width, initial-scale=1">` inside `<head>`. Copy it exactly.

## Check your understanding

1. **(Recall)** What does the `lang` attribute on `<html>` tell browsers and screen readers?
2. **(Predict)** You delete the viewport `<meta>` line from a page and open the page on a phone. What changes?
3. **(Spot the bug)** The stylesheet is named `styles.css`. The page has `<link rel="stylesheet" href="style.css">`. The background stays white. Why?
4. **(Recall — Tags, elements and attributes)** In `<meta charset="utf-8">`, what is the attribute name and what is its value?
5. **(Predict)** You write a page with no `<title>`. What does the browser tab show?

## Answers

1. It names the language of the page, for example `en` for English. Screen readers use it to choose the right voice and pronunciation, and browsers use it to offer translation.
2. The page looks zoomed out. The phone pretends its screen is wide, like a desktop, and shrinks the page to fit, so the text becomes tiny.
3. The `href` names `style.css`, and no file has that name. Chrome shows no error. It finds no stylesheet, so nothing changes. The fix is `href="styles.css"`.
4. The attribute name is `charset`, and its value is `utf-8`.
5. The tab shows the file's name or address instead of a title, because there is no title to show.

## Recap

- You can say what each skeleton part does: doctype, `lang`, `<head>`, charset, viewport, `<title>` and `<body>`.
- You wrote `contact.html` as a complete page, and wrote a second complete page from memory.
- You created `styles.css`, linked it from the `<head>`, and proved the link works with one test line. It now holds only a comment.

Next: [Checking your HTML](/learner/roadmap/html-foundations/checking-your-html)

---

### Lesson 4 — Checking your HTML
<!-- slug: checking-your-html -->

**By the end you can:**

- Paste a page into the W3C validator and read its result.
- Fix an error, using the line number and the message, and check again.
- Check `index.html` and `contact.html`, and use the validator on every page you write from now on.

**Before you start:** Lessons 1 to 3. You have `index.html`, `contact.html`, `practice.html` and `styles.css` in `my-site`, and an internet connection.

**Time:** ~30 min

**Last verified:** 2026-10-06. The error and warning messages below were produced by the same checking engine that the W3C validator uses, run on the page code in this lesson. The layout of the validator website, its tab and button labels, and its wording for a page with no errors were **not verified**, because the website could not be opened from where this lesson was written. The steps have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Chrome is forgiving. It draws a page even when the HTML has mistakes, so a page can look right and still be wrong. A mistake you cannot see, such as a missing closing tag, can behave differently on another browser or for someone using a screen reader. A checker finds those mistakes without you hunting for them. It is like a spell checker for HTML, and you will use it on every page you write.

## What the validator does

A **validator** is a program that reads HTML and reports where it breaks the rules of the language. The W3C (the group that writes web standards) runs a free one at validator.w3.org. You give it your page, and it answers with a list of **errors**, which are real mistakes, and **warnings**, which are advice. Each message gives a **line number** and a **column number**: the position in your file where the problem was found. Line 6, column 3 means the sixth line, three characters in. VS Code shows the line and column of the cursor at the bottom right of its window.

## How to read a message

Each message has two parts: what is wrong, then where. Read the **first** error first. One mistake often causes several errors, because after the first problem the validator is confused about everything that follows. Fix the first error, check again, and many of the others disappear.

## Worked example

You will check `index.html`, which should have no errors, and then a broken page, to see what errors look like.

1. In VS Code, open `index.html`. Click inside the text, select everything with Ctrl+A (Cmd+A on macOS), and copy it with Ctrl+C (Cmd+C).

   You should see: all the text highlighted.
   If you see something else: if only part is highlighted, click inside the text and try again.

2. In Chrome, open a new tab with Ctrl+T (Cmd+T on macOS), type `validator.w3.org` in the address bar and press Enter.

   You should see: a page with a title that mentions validation and three tabs. One tab is called **Validate by Direct Input**.
   If you see something else: if the page is in another language or has a different layout, look for the tab named **Validate by Direct Input**, or the words "direct input".

3. Click **Validate by Direct Input**.

   You should see: a large empty text box.

4. Click inside the box and paste: Ctrl+V on Windows or Cmd+V on macOS. Then click the **Check** button under the box.

   You should see: a results page. For a page with no problems it says that checking is completed and shows no errors or warnings. If there are problems, each appears as a message starting with **Error** or **Warning**.
   If you see something else: if you see a message about a missing doctype, you pasted only part of the page. Go back to step 1 and select everything.

5. Now open `practice.html` in VS Code, select everything, and replace it with the page below. Save it. Then repeat steps 1 to 4 for this page: copy it, paste it into the validator and click **Check**.

   ```text
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
     </head>
     <body>
       <h1>My practice page</h1>
       <p>Visit <a href="https://developer.mozilla.org/">MDN Web Docs.</p>
     </body>
   </html>
   ```

   You should see: four errors, in this order, each with a line and column:

   ```text
   Error: Element “head” is missing a required instance of child element “title”.
   From line 6, column 3; to line 6, column 9
   Error: End tag “p” seen, but there were open elements.
   From line 9, column 68; to line 9, column 71
   Error: Unclosed element “a”.
   From line 9, column 14; to line 9, column 54
   Error: End tag for  “body” seen, but there were unclosed elements.
   From line 10, column 3; to line 10, column 9
   ```

   If you see something else: the wording may be a little different. Look for the same words, such as "title" in the first message and "Unclosed element" in the third.

6. Read the first error. It says the `<head>` has no `<title>`, and points at line 6, which is the `</head>` line. Fix it: in `practice.html`, add `<title>Practice page</title>` on a new line before `</head>`. Save, copy the whole page again, paste it into the validator, and check again.

   You should see: three errors left. The one about the title is gone.
   If you see something else: if you still see the title error, you pasted the old text. Copy again from VS Code after saving.

## Guided practice

The three errors that remain come from one mistake. The second one says `Unclosed element “a”.` and points at line 10, where the link starts. Fix it by adding the missing closing tag in the place of `TODO`:

```text
<p>Visit <a href="https://developer.mozilla.org/">MDN Web Docs</TODO>.</p>
```

1. In `practice.html`, change the paragraph line so that the link is closed. Write the closing tag where `TODO` is, so the line reads like the one above but with the right tag.

   You should see: `MDN Web Docs</a>.</p>` in the editor.
   If you see something else: if the line still has `TODO` in it, replace it.

2. Save, copy the whole page, paste it into the validator and check again.

   You should see: no errors. One missing tag caused three of the four errors, so fixing it removed them all.
   If you see something else: if errors remain, read the first one and fix that.

## Your turn

**Goal:** check your two real pages, then see a warning for yourself.

1. Validate `index.html` and `contact.html`, each in turn. Fix anything the validator reports, then check again.
2. In `contact.html`, delete ` lang="en"` from the `<html>` line, save it, copy the page and check it. Before you click **Check**, predict whether you will get an error or a warning.
3. Put ` lang="en"` back, save, and check once more.

**Check yourself:** all of these should be true:

- [ ] `index.html` and `contact.html` show no errors.
- [ ] You saw a warning, not an error, when `lang` was missing.
- [ ] After you put `lang` back, `contact.html` showed no errors and no warnings.

## Common mistakes

**1. The validator reports a missing doctype.**

- Symptom: you see this:

  ```text
  Error: Start tag seen without seeing a doctype first. Expected “<!DOCTYPE html>”.
  ```

- Cause: the pasted text does not start with `<!DOCTYPE html>`. You copied only part of the page.
- Fix: in VS Code, click inside the file, press Ctrl+A (Cmd+A on macOS) to select all, copy, and paste again. This is normal: almost everyone copies half a page at some point.

**2. I fixed it, but the same error is still there.**

- Symptom: you changed the page and saved it, you check again, and the list is the same.
- Cause: the validator checks the text you pasted, not the file on your disk. You pasted the old text again, or you did not copy again.
- Fix: after every change, save, select all in VS Code, copy, and paste into the box again.

**3. I have many errors and do not know where to start.**

- Symptom: a long list of errors, many on the same line.
- Cause: one mistake near the top can cause many errors below it.
- Fix: fix the first error only, then check again. Repeat. This is normal, and it is the fastest way.

## Check your understanding

1. **(Recall)** What do the two numbers after "From line" tell you?
2. **(Predict)** A page has no `<title>`. Will the validator report an error or a warning, and what will the message say?
3. **(Spot the bug)** Sam fixed a missing `</a>`, saved the file, and pressed **Check** again on the same text. The same three errors appeared. What did Sam forget to do?
4. **(Recall — The skeleton of every page)** Which part of the skeleton does the message `Element “head” is missing a required instance of child element “title”.` say is missing?
5. **(Predict)** A page has one missing `</a>`, which causes three errors. After you add the `</a>`, how many of those three remain?

## Answers

1. They give the line and the column where the problem was found. For example, line 6, column 3 means the sixth line, three characters in.
2. An error. The message says that the element `head` is missing a required child element, `title`.
3. Sam forgot to copy the saved page again and paste it into the box. The validator checks the pasted text, not the file on the disk, so it checked the old text.
4. The `<title>`. The `<head>` of every page needs one.
5. None. The three errors came from one mistake, so adding the `</a>` removes all of them.

## Recap

- The validator checks pasted HTML and lists errors, which are mistakes, and warnings, which are advice. Each has a line and column.
- Read the first error first, fix it, paste the saved page again, and check again. One mistake can cause several errors.
- You checked `index.html` and `contact.html`. Check every page you write from now on.

Next: [Headings, paragraphs and lists](/learner/roadmap/html-foundations/headings-paragraphs-and-lists)

---

### Lesson 5 — Headings, paragraphs and lists
<!-- slug: headings-paragraphs-and-lists -->

**By the end you can:**

- Build a page with one `<h1>` and headings that follow each other in order.
- Write an unordered list and an ordered list.
- Choose between `<strong>` and `<em>` by what the words mean.

**Before you start:** Lessons 1 to 4. You have `index.html` linked to `styles.css`, and you can check a page in the validator.

**Time:** ~30 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator, and the validator messages below come from that same engine. The steps and screen wording have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

A page that is only a wall of text is hard to scan, for everyone. Headings and lists give a page a shape you can see at a glance. They also give it a shape that software can read: a person using a screen reader can jump from heading to heading, the way you scan a page with your eyes. The profile page you build in the assignment is made of exactly these parts.

## Headings and paragraphs

A **heading** names a part of a page. HTML has six levels: `<h1>` is the most important and `<h6>` the least. Use them like the outline of a school essay. A page has one `<h1>`, its title. Under it come `<h2>` headings for the main parts, and under an `<h2>` come `<h3>` headings for its sub-parts. Never skip a level: an `<h3>` must not follow an `<h1>` directly.

The level says what the heading means, not how big it looks. How big text looks is decided later, in CSS. A **paragraph**, the `<p>` element, holds ordinary text.

## Lists

A **list** groups items that belong together. Each item is a **list item**, the `<li>` element. Two kinds of list wrap the items:

- An **unordered list**, `<ul>`, shows bullet points. Use it when the order does not matter, such as a list of interests.
- An **ordered list**, `<ol>`, shows numbers. Use it when the order matters, such as the steps of a plan.

Only `<li>` elements may sit directly inside a `<ul>` or `<ol>`. Here is a small complete example of each:

```html
<ul>
  <li>Maps</li>
  <li>Football</li>
</ul>
<ol>
  <li>Wake up</li>
  <li>Open VS Code</li>
</ol>
```

## Strong and emphasis

`<strong>` marks words that are important, such as a warning. `<em>` (short for emphasis) marks words you would say with stress, which changes the meaning of the sentence. Browsers show `<strong>` as bold and `<em>` as italic, but choose by meaning, not by looks. In "I am <em>not</em> ready", the stress on "not" is what the sentence is about.

## Worked example

Here is a complete profile page with a title, a section with a paragraph, a bulleted list, and one use of `<strong>` and `<em>`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ada Example | Profile</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Ada Example</h1>
    <p>I am learning to build websites. This is my profile page.</p>
    <h2>About me</h2>
    <p>I live in a small town. <strong>Important:</strong> I am <em>not</em> afraid of mistakes.</p>
    <h2>My interests</h2>
    <ul>
      <li>Maps</li>
      <li>Football</li>
      <li>Cooking</li>
    </ul>
  </body>
</html>
```

1. Open this lesson on your computer, select the page above and copy it with Ctrl+C (Cmd+C on macOS).

   You should see: the code highlighted in colour.
   If you see something else: if only part of the code is highlighted, click once elsewhere and select it again.

2. In VS Code, open `index.html` and make sure its tab is the one you are looking at. Click inside the text, select everything with Ctrl+A (Cmd+A on macOS), and paste with Ctrl+V (Cmd+V). This replaces your earlier practice text.

   You should see: the new page in the editor, with a dot on the tab.
   If you see something else: if you see the old text mixed with the new, select all and paste again.

3. Save: Ctrl+S on Windows or Cmd+S on macOS. Open it in Chrome, or refresh it if it is open. To open it, on Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: a large heading `Ada Example`, a paragraph, a smaller heading `About me`, a paragraph with **Important:** in bold and *not* in italics, a smaller heading `My interests`, and three bullet points.
   If you see something else: if the page has no bullets, check that each `<li>` sits inside `<ul>` and `</ul>`. See Common mistakes, number 1.

## Guided practice

Make the top of the page yours. Replace each `TODO` with your own words.

```html
<h1>TODO your name</h1>
<p>TODO one sentence about what you are learning.</p>
<h2>About me</h2>
<p>TODO two sentences about you.</p>
```

1. In `index.html`, replace the text of the `<h1>`, the first `<p>`, and the paragraph under `About me`, with your own words. Keep every tag as it is. The snippet only shows which words are yours to change. Your file has Ada's words, not `TODO` words, so change Ada's words directly.

   You should see: your name in the heading and your sentences in the paragraphs.
   If you see something else: if some of Ada's words are left, replace them.

2. Change the `<title>` in the `<head>` to your name followed by `| Profile`. The `|` key is usually Shift plus the backslash key. Save and refresh Chrome.

   You should see: your name in the large heading, and your name and `| Profile` on the browser tab.
   If you see something else: if the tab did not change, check that you saved: the tab in VS Code shows no dot.

## Your turn

**Goal:** add an ordered list to your page, and check the whole page.

1. After the closing `</ul>` of the interests list, and before `</body>`, add a heading `<h2>My learning plan</h2>` and below it an ordered list of three steps in your own words, for example the three things you want to learn next. The pattern is:

   ```html
   <h2>My learning plan</h2>
   <ol>
     <li>First step</li>
   </ol>
   ```
2. Change the three bullet points under `My interests` to your own real interests.
3. Check the page in the validator, as in Lesson 4.

**Check yourself:** save and refresh. All of these should be true:

- [ ] The page has exactly one `<h1>`, and every other heading is an `<h2>`, because you have no sub-parts yet, so no level is skipped.
- [ ] Your interests show with bullets and your plan shows with the numbers 1, 2 and 3.
- [ ] Every `<li>` is directly inside a `<ul>` or an `<ol>`.
- [ ] The validator shows no errors for `index.html`.

## Common mistakes

**1. My list items have no bullets or numbers.**

- Symptom: the validator says:

  ```text
  Error: Element “li” not allowed as child of element “body” in this context. (Suppressing further errors from this subtree.)
  ```

  The part in brackets means the validator hides further errors from that part of the page. Chrome shows the items as plain lines.
- Cause: the `<li>` elements are not inside a `<ul>` or `<ol>`.
- Fix: wrap the items in `<ul>` and `</ul>`, or in `<ol>` and `</ol>`. The validator found it for you, which is what it is for. This is normal.

**2. The validator complains about text inside my list.**

- Symptom: you see:

  ```text
  Error: Text not allowed in element “ul” in this context.
  ```

- Cause: you typed words directly inside `<ul>` or `<ol>`, for example a title, instead of inside an `<li>`.
- Fix: move the words out of the list, into a heading or paragraph above it, or wrap them in an `<li>`.

**3. I skipped a heading level to get smaller text.**

- Symptom: the validator says:

  ```text
  Error: The heading “h3” (with computed level 3) follows the heading “h1” (with computed level 1), skipping 1 heading level.
  ```

- Cause: you used `<h3>` straight after `<h1>` because you wanted smaller text. The level is about structure, not size.
- Fix: use `<h2>`. The words "computed level" only mean the heading's level number. Size is the job of CSS, in the CSS module that comes after this one.

## Check your understanding

1. **(Predict)** A page has `<ol>` with three `<li>` items: Wake up, Open VS Code, Write HTML. What does Chrome show next to the items?
2. **(Spot the bug)** A page has an `<h1>`, then an `<h3>` with the text `About me`, then a paragraph. What is wrong, and what is the fix?
3. **(Recall — Checking your HTML)** The validator shows five errors. Which one should you read and fix first, and why?
4. **(Predict)** You write `<p>I am <em>not</em> ready.</p>`. How does Chrome usually show the word `not`, and what does `<em>` tell a screen reader?
5. **(Recall)** Which list element shows bullet points, and which shows numbers?

## Answers

1. The numbers 1, 2 and 3, one in front of each item. An `<ol>` is an ordered list, and the browser numbers the items for you.
2. The `<h3>` skips the `<h2>` level. The fix is to change it to `<h2>`. Heading levels must follow each other in order. Size is a job for CSS.
3. The first one. One mistake near the top often causes the errors below it, so fixing it often clears several. Then check again.
4. In italics. `<em>` tells a screen reader that the word is spoken with stress, which changes the meaning of the sentence.
5. `<ul>` shows bullet points, and `<ol>` shows numbers.

## Recap

- A page has one `<h1>`, and its headings go in order: `h1`, then `h2` for main parts, then `h3` for sub-parts. The level shows structure, not size.
- Use `<ul>` for items in no special order and `<ol>` when the order matters. Only `<li>` sits directly inside either.
- Use `<strong>` for important words and `<em>` for stressed words, chosen by meaning. You built a page using all of these and checked it in the validator.

Next: [Links between pages](/learner/roadmap/html-foundations/links-and-relative-paths)

---

### Lesson 6 — Links between pages
<!-- slug: links-and-relative-paths -->

**By the end you can:**

- Link two of your own pages together with a relative path.
- Link into a subfolder and back out of it, using `pages/` and `../`.
- Tell an absolute link from a relative link, and predict which one breaks when a file moves.

**Before you start:** Lessons 1 to 5. You have `index.html` and `contact.html` in `my-site`, and you can validate a page. Your `index.html` still has the link to MDN from Lesson 2. If it does not, add one. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~35 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator, and the link behaviour below was checked in Chromium 141. The steps and screen wording have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

A website is a set of pages that lead to each other. When you move or rename a file, the links that point at it can break, and nothing tells you until someone clicks. Chrome shows an error page. If you know how a link finds its file, you can predict which links a move will break, and fix them in a minute instead of an hour.

## Paths

A **path** is the route to a file: the folders to pass through and the file's name. A **folder** can hold files and other folders. A folder inside another is a **subfolder**.

A **relative link** gives a path starting from the page that contains the link:

- `contact.html` means a file in the same folder as this page.
- `pages/notes.html` means go into the subfolder `pages`, then find `notes.html`.
- `../index.html` means go up one folder, using `..`, then find `index.html`.

An **absolute link**, from Lesson 2, starts with `https://` and holds the complete address. Always write links with forward slashes (`/`), on Windows as well. Here is the folder you will build in this lesson:

```text
my-site
├── index.html
├── contact.html
├── styles.css
└── pages
    └── notes.html
```

From `notes.html`, the folder above is `my-site`, so `..` leads to `index.html`, `contact.html` and `styles.css`.

## What breaks when a file moves

A relative link describes where two files are in relation to each other. If you move one of them, the description is wrong. An absolute link names a place on the internet that does not depend on where your files are, so moving your files does not break it. Renaming a file breaks the links to it in the same way as moving it. If you move two files together, the links between them keep working.

## Worked example

You will link `index.html` and `contact.html` to each other. Here is the complete `contact.html` after this step. Your title may differ.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Contact</h1>
    <p>You can write to me from this page.</p>
    <p><a href="index.html">Back to the home page</a></p>
  </body>
</html>
```

In `index.html`, you add this line at the bottom of the `<body>`, above `</body>`:

```html
<p><a href="contact.html">Contact me</a></p>
```

1. In VS Code, open `contact.html`. Add the line `<p><a href="index.html">Back to the home page</a></p>` above `</body>`, as in the page above. Save.

   You should see: the new line in the editor, and no dot on the tab.
   If you see something else: if the line ends with `</p></p>`, delete the extra `</p>`.

2. Open `index.html`. Add the line `<p><a href="contact.html">Contact me</a></p>` above `</body>`. Save.

   You should see: the new line, and no dot on the tab.

3. Open `index.html` in Chrome, or refresh it. On Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12. Click `Contact me`.

   You should see: the contact page opens, and the address bar shows a path ending in `contact.html`.
   If you see something else: if Chrome shows an error page that ends with `ERR_FILE_NOT_FOUND`, the name in `href` does not match the file. Check the spelling in the Explorer.

4. Click `Back to the home page`.

   You should see: your home page again.

5. Now make a subfolder. In the Explorer, point at the MY-SITE row. Small icons appear when you point at it, and the second one is **New Folder**. Click it, type `pages` and press Enter. You can also right-click the MY-SITE row and choose **New Folder**.

   You should see: a folder named `pages` in the Explorer, under `my-site`.
   If you see something else: if you made a file by mistake, right-click it, choose **Delete**, and try again.

6. Right-click the `pages` folder and choose **New File**. Type `notes.html` and press Enter. Copy this page into it, and save.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>My notes</title>
       <link rel="stylesheet" href="../styles.css">
     </head>
     <body>
       <h1>My notes</h1>
       <p><a href="../index.html">Back to the home page</a></p>
     </body>
   </html>
   ```

   You should see: `notes.html` inside `pages` in the Explorer. The page has two paths that begin with `../`, one in the `<link>` and one in the `<a>`, because `styles.css` and `index.html` are one folder up.
   If you see something else: if `notes.html` is not inside `pages`, drag it onto the `pages` folder.

7. In `index.html`, add the line `<p><a href="pages/notes.html">My notes</a></p>` above `</body>`. Save, refresh Chrome, click `My notes`, then click `Back to the home page`.

   You should see: the notes page, and then your home page again.
   If you see something else: if either click shows an error page, compare the `href` with the examples above, character by character.

## Guided practice

You will add one more link in each direction. Replace the two `TODO` values with the right relative paths.

```html
<p><a href="TODO">Contact me</a></p>
```

1. In `pages/notes.html`, add the line above, right before `</body>`. A page inside `pages` must go up one folder before it can find `contact.html`. Write the right path in place of `TODO`.

   You should see: a link on the notes page that opens the contact page.
   If you see something else: if you get an error page, you probably wrote `contact.html` without `../`. A page in `pages` looks for files in `pages`.

2. In `contact.html`, add a link to the notes page. Replace `TODO` in the line below with the right path, add it above `</body>`, and save.

   ```html
   <p><a href="TODO">My notes</a></p>
   ```

   You should see: a link on the contact page that opens the notes page, and a link on the notes page that opens the contact page.
   If you see something else: if either link fails, check the `TODO` values against the three examples in the Paths section.

## Your turn

**Goal:** predict what breaks when a file moves, then fix it.

1. Move `notes.html` out of the `pages` folder into `my-site`, so that it sits next to `index.html`. Drag it onto the MY-SITE row. If VS Code asks you to confirm, click **Move**. If dragging is difficult, right-click `notes.html`, choose **Cut**, then right-click the MY-SITE row and choose **Paste**.
2. Before you open Chrome, write down which of these you think now fail: the `My notes` link on the home page, the `My notes` link on the contact page, the three paths inside `notes.html` (`../index.html`, `../contact.html` and `../styles.css`), and the MDN link.
3. Refresh the home page and click each link to test your prediction. The stylesheet path is not a link you can click, so check whether `notes.html` still has its styles.
4. Fix everything that broke. You can change the paths to match the new place, or move `notes.html` back into `pages`. Either is correct. Then check `index.html`, `contact.html` and `notes.html` in the validator.

**Check yourself:** all of these should be true:

- [ ] You wrote your prediction down before you tested.
- [ ] After the fix, every link on every page opens the page it names, and `notes.html` has its styles.
- [ ] You can say why the MDN link kept working while the others broke.
- [ ] The validator shows no errors for `index.html`, `contact.html` and `notes.html`.

## Common mistakes

**1. A link to the home page from a subfolder fails.**

- Symptom: you click `Back to the home page` on `pages/notes.html` and Chrome shows:

  ```text
  Your file couldn’t be accessed
  It may have been moved, edited, or deleted.
  ERR_FILE_NOT_FOUND
  ```

- Cause: the link says `index.html`, with no `../`. A page in `pages` looks for `index.html` inside `pages`, and the file is one folder up.
- Fix: write `../index.html`. This message is normal: it means the path points at a place where there is no file.

**2. A link without `.html` fails.**

- Symptom: the same error page appears when you click a link written as `contact`.
- Cause: the file's name is `contact.html`. The extension is part of the name, and the link must include it.
- Fix: write `contact.html`.

## Check your understanding

1. **(Predict)** `pages/notes.html` contains `<a href="../index.html">`. Which file does it open?
2. **(Predict)** You rename `contact.html` to `contact-me.html`. Which links stop working: `<a href="contact.html">`, `<a href="https://developer.mozilla.org/">`, or both?
3. **(Spot the bug)** On `pages/notes.html`, Sam wrote `<link rel="stylesheet" href="styles.css">` and the page has no styles. Why?
4. **(Recall — Tags, elements and attributes)** What makes a link absolute, and what makes a link relative?
5. **(Recall)** What do the two dots in `../` mean?

## Answers

1. It opens `index.html` in the folder above `pages`, which is `my-site`. The `..` means "go up one folder".
2. Only `<a href="contact.html">`. It is a relative link and the file it names no longer exists under that name. The MDN link is absolute and does not depend on your files.
3. The stylesheet is in `my-site`, not in `pages`. From `pages/notes.html` the path must be `../styles.css`. Chrome shows no error for a missing stylesheet; the page has no styles.
4. A link is absolute when its address starts with `https://` and is complete. A link is relative when it describes the file's place starting from the current page, such as `contact.html` or `../index.html`.
5. They mean the folder above the current one.

## Recap

- A relative link gives a path from the current page: `contact.html` is in the same folder, `pages/notes.html` goes into a subfolder, and `../index.html` goes up one.
- An absolute link starts with `https://` and does not depend on your files. A relative link breaks when either file moves.
- You linked your pages together in both directions, moved a file on purpose, predicted what broke, and fixed it.

Next: [Images and alt text](/learner/roadmap/html-foundations/images-and-alt-text)

---

### Lesson 7 — Images and alt text
<!-- slug: images-and-alt-text -->

**By the end you can:**

- Show an image from an `images` folder with `<img>`, a relative `src` and specific `alt` text.
- Name an image file so it works on any server, and mark a purely decorative image with `alt=""`.
- Get a photo from your phone to your computer and shrink it if it is very large.

**Before you start:** Lessons 1 to 6. You have `index.html` in `my-site`, you can use relative paths, and you can check a page in the validator. A photo of your choice on your phone is useful, but you can finish the lesson without one. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~40 min

**Last verified:** 2026-10-06. The page code and the SVG file were checked with html-validate, the W3C Nu validator and an XML parser, and the validator message below comes from that engine. The steps for moving a photo from a phone to a computer and for shrinking it were written from memory and were **not verified**, because the websites and programs involved could not be opened from where this lesson was written. No step has been run on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Your profile page needs a picture of you or of something you care about. Pictures bring two problems. Not everyone can see them: a person using a screen reader hears a description instead, and anyone on a slow connection sees the description first. And a photo from a phone can be several megabytes, which makes a page slow to open. Today you add a picture that works for everyone and loads quickly.

## The img element

An **image** is a picture file such as `.jpg`, `.png` or `.svg`. The `<img>` element shows one. It has no closing tag. Two attributes are required:

- `src` (short for source) is the path to the image file, written like a relative link from Lesson 6.
- `alt` (short for alternative text) is a written description of the image.

Browsers show the `alt` text when the image cannot load, and screen readers read it aloud. Search engines use it too.

## Writing alt text

Write what the image shows, in the way you would describe it to a friend on the phone, in a few words. Be specific: "Ada holding a football trophy" is useful, and "image" or `photo.jpg` is not. Do not start with "picture of", because screen readers already say it is an image.

Some images are only **decoration**: a pattern or a line that adds no information. Give those an empty `alt=""`. Keep the attribute, with nothing between the quotes, so that screen readers skip the image. If you leave `alt` out entirely, a screen reader may read the file name instead.

## File names

Name image files in lowercase, with no spaces: letters, digits and hyphens only, such as `my-photo.jpg`. **Windows ignores upper and lower case in file names**, but most web **servers** do not. A server is a computer that holds a website's files and sends them to visitors, and GitHub Pages is one. So `Photo.JPG` can work on your computer and break after you put the site online. A space in a name becomes `%20` in an address, which is a common source of mistakes.

## Worked example

Everyone can do this part without a photo. You will make a small picture from text. A `.svg` file is an image written as text, so you can create it like any other file.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#ffe28a"/>
  <circle cx="100" cy="100" r="60" fill="#2a6fdb"/>
</svg>
```

Here is a page that shows it, so you can see where the `<img>` goes. You add only the `<img>` line to your own `index.html`, not the whole page. The `<img>` has `width` and `height` too, so the browser keeps room for the picture while it loads.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Image practice</title>
  </head>
  <body>
    <h1>Image practice</h1>
    <img src="images/my-shape.svg" alt="A blue circle on a yellow square" width="200" height="200">
  </body>
</html>
```

1. In VS Code, point at the MY-SITE row in the Explorer. Small icons appear, and the second one is **New Folder**. Click it, type `images` and press Enter.

   You should see: a folder named `images` under `my-site`.

2. Right-click the `images` folder, choose **New File**, type `my-shape.svg` and press Enter. Copy the SVG text above into it, and save.

   You should see: coloured text in the editor, and `my-shape.svg` inside `images`.
   If you see something else: if the file is not inside `images`, drag it onto the `images` folder.

3. Open `index.html`. Under the `<h1>`, add the line `<img src="images/my-shape.svg" alt="A blue circle on a yellow square" width="200" height="200">`. Save, then open or refresh it in Chrome. On Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: a yellow square with a blue circle in it, under your heading.
   If you see something else: if you see a small broken-picture icon with your alt text next to it, the path in `src` is wrong. See Common mistakes, number 1.

## Guided practice

Now use a real photo. If you have no photo you want to use, skip to step 8 and use the line given there for `my-shape.svg`.

1. Get the photo to your computer. You have two ways, and you only need one.
   - **WhatsApp Web:** in Chrome on your computer, open WhatsApp Web (search for it) and follow the instructions on screen to link your phone, which usually means scanning a code with your phone. Then send the photo from your phone to yourself, open it on the computer, and use the download option. The email way is simpler and more reliable.
   - **Email:** on your phone, email the photo to yourself. On your computer, open the email and download the attachment.

   You should see: the photo in your computer's **Downloads** folder.
   If you see something else: if you cannot find it, open File Explorer (Finder on macOS) and look in Downloads. Sort by date to find the newest file.

2. Rename the photo so it is lowercase, with no spaces, and ends in `.jpg`, for example `my-photo.jpg`. In File Explorer, click the file, press F2, type the new name and press Enter. On macOS, click the file and press Return.

   You should see: the new name. If you cannot see the `.jpg` ending, show extensions as in Lesson 1, step 11. If the file already ends in `.jpeg`, that is fine: use `.jpeg` in your `src`. Do not rename a `.png` file to `.jpg`, because renaming does not convert a picture.
   If you see something else: if the name ends `.jpg.jpg`, remove the extra ending.

3. Check its size. On Windows, right-click the file, choose **Properties**, and read **Size**, not Size on disk. KB means kilobytes, and 1000 KB is about 1 MB. On macOS, click the file and press Cmd+I. A phone photo is often 2 to 6 MB. Aim for under about 500 KB.

   You should see: a size in KB or MB.
   If you see something else: if the size is under 500 KB, skip to step 7.

4. Open the photo in a picture editor. On Windows, right-click the file, choose **Open with**, then **Paint**. If Paint is not in the list, choose **Choose another app** and pick Paint. On macOS, open the photo in Preview.

   You should see: the photo in a window.
   If you see something else: if Paint does not open, open Paint from the Start menu, choose File, then Open, and pick the photo. If you cannot open it at all, use a smaller photo and skip to step 7.

5. Make the photo smaller. On Windows in Paint, choose **Resize**, pick **Pixels**, set the horizontal size to `1000`, keep **Maintain aspect ratio** ticked, and click **OK**. On macOS in Preview, choose Tools, then **Adjust Size**, set the width to `1000` pixels, and click **OK**.

   You should see: the photo looks the same, but its size in pixels is smaller.
   If you see something else: if the menus differ on your computer, look for any option that sets the width in pixels.

6. Save the smaller photo with the same name. On Windows in Paint, choose File, then **Save as**, then **JPEG picture**, and keep the same name. Windows may ask whether to replace the file; choose to replace it. On macOS, press Cmd+S.

   You should see: a smaller size when you check the file's properties again, as in step 3.
   If you see something else: if the size did not change, repeat step 5 and save again.

7. Move the photo into `my-site\images`. Put the File Explorer window and the VS Code window side by side, then drag the file onto the `images` folder in the VS Code Explorer. Dragging copies the file, so the original stays in Downloads.

   You should see: `my-photo.jpg` inside `images` in the VS Code Explorer.

8. In `index.html`, replace the image line with one for your own picture. Write a specific description in place of `TODO`. Save and refresh Chrome.

   ```html
   <img src="images/my-photo.jpg" alt="TODO" width="400">
   ```

   If you have no photo, use this line instead, with your own description in place of `TODO`: `<img src="images/my-shape.svg" alt="TODO" width="200" height="200">`. Giving only a `width`, as in the photo line, is fine: the browser works out the height.

   You should see: your picture on the page.
   If you see something else: if you see a broken-picture icon, compare the file name and extension in `src` with the Explorer, letter for letter.

## Your turn

**Goal:** give every image the right alt text, and see what alt text does.

1. Your page now has your own picture. Add `my-shape.svg` as a second image, as pure decoration, so it has `alt=""`. If you used the shape as your main picture, add it a second time. The same picture needs a description when it carries information and an empty `alt` when it only decorates.
2. Check `index.html` in the validator, as in Lesson 4.
3. See what alt text is for: change `my-photo.jpg` in `src` to `my-photo-x.jpg`, save and refresh. Look at the page. The alt text can be small or cut off in a narrow box, and that is normal. Then change it back, save and refresh.

**Check yourself:** all of these should be true:

- [ ] Your picture shows, and its `alt` describes what is in it in a few specific words.
- [ ] The decorative image has `alt=""` with nothing between the quotes.
- [ ] Both file names are lowercase with no spaces.
- [ ] When the file name was wrong, you saw your `alt` text on the page in place of the picture.
- [ ] The validator shows no errors for `index.html`.

## Common mistakes

**1. The picture does not show.**

- Symptom: Chrome shows a small broken-picture icon, usually with your alt text beside it, where the image should be.
- Cause: the path in `src` does not lead to a real file. Common reasons: the file is not in `images`, the name or extension is spelled differently, or the extension is hidden and the name is `my-photo.jpg.jpg`.
- Fix: compare the `src` with the file in the Explorer, letter for letter, including the folder and the ending. Fix whichever is wrong. This is normal: a wrong path looks exactly like this.

**2. The validator says the image has no alt text.**

- Symptom: you see:

  ```text
  Error: An “img” element must have an “alt” attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.
  ```

- Cause: the `<img>` has no `alt` attribute at all.
- Fix: add `alt="your description"`, or `alt=""` if the image is only decoration.

**3. The picture shows on my computer but not after I upload it.**

- Symptom: you will see this in Lesson 11, when your files are on a server: the picture is missing, although it worked on your computer.
- Cause: the file name and the name in `src` differ only in upper and lower case, such as `Photo.JPG` and `photo.jpg`. Windows accepts that, and most servers do not.
- Fix: use lowercase for every file name and every `src`, so they always match.

## Check your understanding

1. **(Predict)** A page has `<img src="images/Photo.JPG" alt="Me">` and the file is named `photo.jpg`. It works in Chrome on your Windows computer. Will it work after you put it online? Why?
2. **(Spot the bug)** Sam wrote `<img src="images/me.jpg" alt="image">` for a photo of Sam at a desk. What is wrong with the `alt`?
3. **(Predict)** A screen reader reaches `<img src="images/line.svg" alt="">`. What does it do?
4. **(Recall — Links between pages)** The page is `pages/notes.html` and the image is `images/me.jpg`. What `src` does the page need?
5. **(Spot the bug)** A file is named `My Photo.JPG`. Give two reasons to rename it.

## Answers

1. It may not. Windows ignores case in file names, so it works on your computer. Most servers, including GitHub Pages, treat `Photo.JPG` and `photo.jpg` as different files, so the picture would be missing.
2. The `alt` is not specific. "image" tells a screen reader user nothing the screen reader does not already say. Something like "Sam working at a desk with a laptop" is better.
3. It skips the image, because the empty `alt` says the image is decoration.
4. `../images/me.jpg`. The page is inside `pages`, so the path goes up one folder first.
5. It has a space, which becomes `%20` in an address and often causes mistakes. It also has capital letters, which can break on a server that treats upper and lower case as different. Use `my-photo.jpg`.

## Recap

- `<img>` needs `src`, the relative path to the file, and `alt`, a short specific description. Decorative images get `alt=""`.
- Name image files in lowercase with no spaces, because most servers treat upper and lower case as different.
- You made an image from text, got a photo to your computer, shrank it, and added it with the right `alt`.

Next: [Page structure with landmarks](/learner/roadmap/html-foundations/semantic-html)

---

### Lesson 8 — Page structure with landmarks
<!-- slug: semantic-html -->

**By the end you can:**

- Rebuild a page made only of `<div>` elements with `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>`.
- Say what each of those elements is for.
- Give every `<section>` its own heading, and check that the Tab key reaches each link in order.

**Before you start:** Lessons 1 to 7. You have `index.html`, `contact.html` and `practice.html` (from Lesson 2) in `my-site`. The first two link to each other, and your picture is in `images`. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~35 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator, and the validator messages below come from that same engine. The steps and screen wording have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Two pages can look identical and still be very different to use. A person who cannot see the screen moves around by jumping between the main parts of a page: the navigation, the main content, the footer. That only works if the page says which part is which, and a page built only from `<div>` elements says nothing. The right elements also give the CSS module, which comes after this one and makes pages look good, clear parts to arrange.

## Semantic elements

**Semantic** elements are named for what their content means, not for how it looks. A **`<div>`** is a generic box with no meaning. Use it only when no other element fits. These elements each mark one part of a page. Screen readers call them **landmarks** and let users jump between them:

- `<header>`: the introduction at the top of a page, such as the site name and its navigation.
- `<nav>`: a group of links for moving around the site.
- `<main>`: the main content of the page. A page has exactly one.
- `<section>`: a group of content about one theme. Give each one a heading.
- `<footer>`: the closing part of a page, such as who made it.

## Moving with the keyboard

Many people use the **Tab** key instead of a mouse. Each press moves the **focus**, the marker for "this is the item you are on", to the next link or button. Chrome draws an outline around the focused item. Press **Enter** to follow a focused link. Never remove that outline.

## Worked example

Here is a page made only of `<div>` elements. It looks like a real page, but nothing says what any part is.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Divs practice</title>
  </head>
  <body>
    <div class="top">
      <p class="site-name">Ada Example</p>
      <div class="links">
        <a href="index.html">Home</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
    <div class="content">
      <h1>Hello, I am Ada</h1>
      <div class="part">
        <h2>About me</h2>
        <p>I am learning to build websites.</p>
      </div>
      <div class="part">
        <h2>My interests</h2>
        <p>Maps, football and cooking.</p>
      </div>
    </div>
    <div class="bottom">
      <p>Made by Ada Example.</p>
    </div>
  </body>
</html>
```

And here is the same page rebuilt with landmarks. Each `<div>` became the element that says what it is: `top` became `<header>`, `links` became `<nav>`, `content` became `<main>`, each `part` became `<section>`, and `bottom` became `<footer>`. The links are in a list, as navigation links usually are.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Landmarks practice</title>
  </head>
  <body>
    <header>
      <p class="site-name">Ada Example</p>
      <nav class="nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>Hello, I am Ada</h1>
      <section>
        <h2>About me</h2>
        <p>I am learning to build websites.</p>
      </section>
      <section>
        <h2>My interests</h2>
        <p>Maps, football and cooking.</p>
      </section>
    </main>
    <footer>
      <p>Made by Ada Example.</p>
    </footer>
  </body>
</html>
```

1. Open `practice.html` in VS Code. If you do not have it, create it as in Lesson 2. Select everything and replace it with the `<div>` page above, which replaces whatever was in it. Save it and open it in Chrome. On Windows type `start chrome "$PWD\practice.html"` in the terminal, on macOS type `open -a "Google Chrome" practice.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: a heading, two headings with a line each, and two links near the top.
   If you see something else: if you see tags as text, read Lesson 1, Common mistakes, number 2.

2. Replace everything in `practice.html` with the landmark page above. Save and refresh Chrome.

   You should see: almost the same page. The two links now have bullets, because they are in a list. The look has hardly changed, but the meaning has: a screen reader can now jump to the header, the navigation, the main content and the footer.
   If you see something else: if the page looks exactly as before and you see no bullets, check that you saved and refreshed.

3. Click inside the page, press the **Tab** key once, and look for an outline.

   You should see: an outline around `Home`. Press Tab again and it moves to `Contact`. Tab works the same on the `<div>` version: landmarks change what screen readers announce, not how Tab moves. After the last link the focus moves to Chrome's own buttons and the address bar. Press Shift+Tab to go back.
   If you see something else: if nothing is outlined, click on the page's empty space first, then press Tab.

## Guided practice

Now give `index.html` the same structure. This is the shape of its `<body>`. Replace each `TODO` with the name of the element that fits.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ada Example | Profile</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <TODO>
      <p class="site-name">Ada Example</p>
      <TODO class="nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </TODO>
    </TODO>
    <TODO>
      <h1>Hello, I am Ada</h1>
      <TODO>
        <h2>About me</h2>
        <p>I am learning to build websites.</p>
      </TODO>
      <TODO>
        <h2>My interests</h2>
        <ul>
          <li>Maps</li>
          <li>Football</li>
        </ul>
      </TODO>
    </TODO>
    <TODO>
      <p>Made by Ada Example.</p>
    </TODO>
  </body>
</html>
```

`TODO` is a placeholder, not a real element. Each wrapper has an opening and a closing `TODO`, and both need the same name. The names to use are `header`, `nav`, `main`, `section` (used twice) and `footer`; work out which goes where. From the top, the wrappers are: the introduction at the top, the navigation, the main content, two themed groups, and the closing part.

1. Restructure `index.html` this way, using your own content. Wrap the site name and links in a `<header>`, with the links in a `<nav>` that has `class="nav"`. Put your `<h1>` and your sections inside one `<main>`, with each part under its own `<h2>` inside a `<section>`. Put a short line, such as who made the page, in a `<footer>`. Keep your picture inside `<main>`, above the first section. Use your own name where the page says Ada Example. Your page may have other parts too, such as a link to another website or a learning plan. Put each one inside a `<section>` with its own `<h2>`, or delete it if you no longer need it.

   You should see: your page looks nearly the same as before, with the navigation links in a list.
   If you see something else: if a part of your page is missing, check that every opening tag still has its closing tag.

2. Save, refresh Chrome, and press Tab a few times.

   You should see: the outline moves from `Home` to `Contact`, then to your other links in the order they appear on the page.
   If you see something else: if the outline skips a link, check that the link is an `<a>` with an `href`.

## Your turn

**Goal:** give `contact.html` the same landmarks.

1. In `contact.html`, add a `<header>` with a site name and the same `<nav>` as `index.html`. Put the contact content in a `<main>` with a `<h1>`. Add a `<footer>`.
2. Check both pages in the validator, as in Lesson 4.
3. On each page, press Tab through the links and use Enter to follow one.

**Check yourself:** all of these should be true:

- [ ] Both pages have one `<header>`, one `<nav>`, one `<main>` and one `<footer>`.
- [ ] Every `<section>` on `index.html` starts with its own heading.
- [ ] Each page has one `<h1>`, inside `<main>`.
- [ ] Tab reaches `Home` and `Contact` on both pages, and Enter follows them.
- [ ] The validator shows no errors for both pages, and no warning about a section without a heading.

## Common mistakes

**1. The validator warns about a section with no heading.**

- Symptom: you see:

  ```text
  Warning: Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.
  ```

- Cause: a `<section>` has no heading in it.
- Fix: add an `<h2>` as the first thing in the section. If the group needs no heading at all, use a `<div>` instead. A warning is advice and not an error, and it is normal to get one.

**2. The validator says there is more than one main.**

- Symptom: you see:

  ```text
  Error: A document must not include more than one visible “main” element.
  ```

- Cause: the page has two `<main>` elements.
- Fix: keep one `<main>` around all the main content, and move the other content inside it as sections.

**3. The page looks the same after I changed the `<div>`s.**

- Symptom: you rebuilt a page with landmarks and Chrome shows the same page, apart from bullets in the links.
- Cause: nothing is wrong. Landmarks change the meaning of the page, not how it looks.
- Fix: nothing to fix. Check the structure with the validator and the Tab key. The next module changes how it looks.

## Check your understanding

1. **(Predict)** You replace the `<div>` boxes of a page with `<header>`, `<main>` and `<footer>` and change nothing else. Does the page look very different in Chrome?
2. **(Spot the bug)** A page has `<section><p>Hello</p></section>` and the validator shows a warning. What is the warning about, and what is the fix?
3. **(Recall — Images and alt text)** What does `alt=""` tell a screen reader?
4. **(Predict)** A page has a header with two links and a main with one link. You press Tab three times, starting from the top. In what order does the focus move?
5. **(Recall)** Which element holds the main content of a page, and how many of them can a page have?

## Answers

1. No. Landmarks change what the parts mean, not how they look. You may see small differences, such as bullets in a list, but the layout is almost the same.
2. The section has no heading. Add an `<h2>` to it, or use a `<div>` if it needs no heading.
3. That the image is only decoration, so it should skip it.
4. The two header links first, in the order they appear, then the link in the main. The focus follows the order of the page.
5. `<main>`. A page has exactly one.

## Recap

- `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>` say what each part of a page is, and screen readers can jump between them. A `<div>` has no meaning and is for when nothing else fits.
- Each `<section>` needs its own heading, and each page has one `<main>` and one `<h1>`.
- You rebuilt a `<div>` page with landmarks, gave both of your pages the same structure, and checked that the Tab key reaches every link in order.

Next: [Classes, ids and DevTools](/learner/roadmap/html-foundations/classes-ids-and-devtools)

---

### Lesson 9 — Classes, ids and DevTools
<!-- slug: classes-ids-and-devtools -->

**By the end you can:**

- Add a `class` to repeated items and an `id` to one unique element.
- Open Chrome DevTools and find an element in the Elements panel.
- Explain when to use a class and when to use an id.

**Before you start:** Lessons 1 to 8. Your `index.html` has a `<header>`, a `<main>` with sections, and a `<footer>`. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~30 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator, and the validator messages below come from that same engine. The Chrome DevTools steps, menu labels and keyboard shortcuts were written from memory and were **not verified**, because DevTools could not be opened from where this lesson was written. No step has been run on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Soon you will want to change how three similar boxes look, or point at one special part of a page. For that you need names for the parts. Classes and ids are those names, and the next module uses them to style your cards. Today you add them, and you learn to look inside a page with DevTools, which is how developers find out why a page does not look right.

## Classes and ids

A **class** is a label you can give to as many elements as you like. Elements that are alike, such as three cards, share one class: `class="card"`. An element can have several classes, separated by spaces: `class="card featured"`.

An **id** is a name for one single element. No two elements on a page may have the same id: `id="about"`. Ids also let a link jump to that part of a page, as in `index.html#about`.

So: **many alike things get a class, and one unique thing gets an id.** Write both in lowercase, using hyphens instead of spaces, and name them for what the thing is (`card`), not how it looks (`blue-box`).

## Wrappers and articles

A **wrapper** is an element whose job is to hold other elements. In the example, `<div class="card-grid">` holds the three cards, so that CSS can arrange them as a group. An `<article>` is a self-contained piece of content, such as one card. The classes `site-name` and `nav` come from Lesson 8, so keep them. Use a class even for a wrapper that appears once, because CSS styles things with classes.

## DevTools and the Elements panel

**DevTools** is a set of tools built into Chrome for looking inside a page. Its **Elements panel** shows the page's HTML as Chrome understands it, and highlights the matching part of the page when you point at a line. DevTools has other panels. You only need the Elements panel today.

Changes you make in DevTools affect only the copy of the page in your browser. They are not saved to your file, and they vanish when you refresh.

## Worked example

Here is a complete page where the interests are three cards. Each card has `class="card"`, the cards sit in a wrapper with `class="card-grid"`, and the sections have ids. Your content will differ.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ada Example | Profile</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <p class="site-name">Ada Example</p>
      <nav class="nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>Hello, I am Ada</h1>
      <section id="about">
        <h2>About me</h2>
        <p>I am learning to build websites.</p>
      </section>
      <section id="interests">
        <h2>My interests</h2>
        <div class="card-grid">
          <article class="card">
            <h3>Maps</h3>
            <p>I like finding places I have never been.</p>
          </article>
          <article class="card">
            <h3>Football</h3>
            <p>I play on Saturdays with friends.</p>
          </article>
          <article class="card">
            <h3>Cooking</h3>
            <p>I am learning to cook new dishes.</p>
          </article>
        </div>
      </section>
    </main>
    <footer>
      <p>Made by Ada Example.</p>
    </footer>
  </body>
</html>
```

1. In `index.html`, replace your old interests list with cards, so each interest is its own `<article class="card">` with an `<h3>` and a `<p>`, inside a `<div class="card-grid">`, as above. Give the section `id="interests"` and your About section `id="about"`. Save and refresh Chrome. To open it, on Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: your interests, each with a small heading and a line of text. The page looks plain, because styling comes in the next module.
   If you see something else: if an interest is missing, check that every `<article>` has its closing `</article>`.

2. In Chrome, right-click one of the card headings and choose **Inspect**.

   You should see: a panel opens, on the right or at the bottom of the window, with a tab called **Elements** selected. One line of HTML is highlighted.
   If you see something else: if the panel shows another tab, such as Console, click **Elements**. If you do not see **Inspect** in the menu, press F12 on Windows, or Cmd+Option+I on macOS.

3. In the Elements panel, find the line `<article class="card">`. It is a few lines above the `<h3>` you right-clicked. Point at it with the mouse, without clicking.

   You should see: the whole card is highlighted in the page, in a coloured overlay.
   If you see something else: if the line is not visible, click the small triangles next to the lines above it to open them.

4. Point at the other two `<article class="card">` lines one after the other, then at `<section id="interests">`.

   You should see: each card lights up in turn, and the section lights up with all three cards inside it.

5. Close DevTools: click the **×** at the top right of the panel, or press F12 again.

   You should see: the page fills the window again.

## Guided practice

Add a class to your repeated items. Replace each `TODO` with the right value.

```html
<section id="TODO">
  <h2>About me</h2>
  <p>I am learning to build websites.</p>
</section>
<article class="TODO">
  <h3>Maps</h3>
  <p>I like finding places I have never been.</p>
</article>
```

1. Fill in the first `TODO` with the id for the About section, and the second with the class that the three cards share. Then check your own `index.html` has the same.

   You should see: an id on your About section and the same class on every card, using the words from the worked example.
   If you see something else: if you used a space or capital letters, change them to lowercase with hyphens.

2. Open DevTools on your page, and in the Elements panel, find each of your cards. Count them.

   You should see: as many `<article class="card">` lines as you have interests (three in the worked example), and each one lights up its own card.
   If you see something else: if one is missing, check that you typed `class="card"` on that article.

## Your turn

**Goal:** add a Projects section, and check ids and classes in DevTools.

1. In `index.html`, below your Interests section and still inside `<main>`, add a third section with `id="projects"`, an `<h2>` called `My projects`, and a list or a paragraph about something you want to build. If your page has a `My learning plan` section, you can keep it or delete it. The assignment at the end of this module needs three sections: About, Interests and Projects. `My learning plan` is the ordered list from Lesson 5, if you still have it.
2. Open DevTools and find your `projects` section in the Elements panel. Point at it and see it light up.
3. In the Elements panel, double-click the words of one `<h3>` line, which are the text between the tags and not the tag name, and change a letter. Look at the page, then refresh.
4. Check the page in the validator, as in Lesson 4.

**Check yourself:** all of these should be true:

- [ ] Your three cards each have `class="card"`. Cards do not need an id.
- [ ] Your three sections have the ids `about`, `interests` and `projects`, each used once.
- [ ] After you refreshed, the change you made in DevTools was gone, and you can say why.
- [ ] The validator shows no errors for `index.html`.

## Common mistakes

**1. The validator reports a duplicate id.**

- Symptom: you see:

  ```text
  Error: Duplicate ID “about”.
  ```

- Cause: two elements have the same `id`. An id names one element only.
- Fix: give each element its own id. If several elements are alike, they need a `class`, and not an `id`. This is normal: copying a section is the usual way it happens.

**2. My change in DevTools disappeared.**

- Symptom: you changed text in the Elements panel, the page changed, and after a refresh it went back.
- Cause: DevTools changes only the copy of the page in the browser. Your file is not touched.
- Fix: make the change in VS Code, and save. Use DevTools to look and to try things.

**3. I gave a class two words with a space.**

- Symptom: you wrote `class="my card"`, and DevTools shows the element with two classes, `my` and `card`, not one.
- Cause: a space separates classes, so `my card` is two classes, `my` and `card`.
- Fix: use a hyphen for one name: `class="my-card"`.

## Check your understanding

1. **(Predict)** You give three cards `class="card"` and one section `id="interests"`. Can you also give another section `id="interests"`?
2. **(Spot the bug)** The validator says `Error: Duplicate ID “about”.` Your page has two sections that both start with `<section id="about">`. What is the fix?
3. **(Recall — Page structure with landmarks)** What must every `<section>` have, and what does the validator say if it does not?
4. **(Predict)** You edit a heading in the Elements panel and then refresh the page. What do you see, and why?
5. **(Recall)** When do you use a class, and when an id?

## Answers

1. No. An id must be unique on the page. Another section needs its own id.
2. Change one of the ids so they differ, for example `about` and `projects`. If several elements are alike, give them a shared class instead of an id.
3. A heading of its own, such as an `<h2>`. Without one, the validator shows a warning: `Section lacks heading`.
4. You see the original heading. DevTools changes only the browser's copy of the page. Refreshing loads your saved file again.
5. Use a class for things that are alike and repeated, such as cards. Use an id for one unique thing, such as one section.

## Recap

- A `class` labels many alike elements, such as three cards. An `id` names one unique element, and no two elements on a page may share an id.
- DevTools lets you look inside a page. Right-click, choose Inspect, and point at lines in the Elements panel to see what they are. Changes there are lost on refresh.
- You gave your cards a shared class and your sections their own ids, and found them with DevTools.

Next: [Forms: labels and inputs](/learner/roadmap/html-foundations/forms-and-labels)

---

### Lesson 10 — Forms: labels and inputs
<!-- slug: forms-and-labels -->

**By the end you can:**

- Build a form with three labelled fields, one of them a non-text input type.
- Predict what happens when someone presses the Send button.
- Tab through a form and click a label to check that it works.

**Before you start:** Lessons 1 to 9. Your `contact.html` has a header, a `<nav>`, a `<main>` and a footer, and you can check a page in the validator. To copy code from a lesson, open the lesson on your computer, select the code with the mouse and press Ctrl+C (Cmd+C on macOS), as in Lesson 1, steps 4 and 5. Typing it in yourself is fine if you copy it exactly.

**Time:** ~40 min

**Last verified:** 2026-10-06. The page code was checked with html-validate and the W3C Nu validator, and the validator message below comes from that engine. What a form does when you press Send, the built-in email check, label clicks and the Tab order were checked in Chromium 141. The steps and screen wording have **not yet been run** on a Windows or macOS computer. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Almost every real site needs a way for visitors to send something back: a message, a sign-up, an order. A form is the standard way. It is also where accessibility goes wrong most often. A box with no label is a mystery to someone using a screen reader, and it is a tiny target for someone using a phone. If you label every box properly from the start, you get those problems solved for free.

## The parts of a form

A **form** is the `<form>` element. It wraps the boxes a visitor fills in and the button that sends them. Inside it:

- An **input** is a box to fill in. The `<input>` element has no closing tag. Its `type` attribute chooses the kind of box: `text` for short text, `email` for an email address.
- A **textarea** is a larger box for several lines of text.
- A **label** is the visible words that name a box. A `<label>` is connected to its box when its `for` attribute equals the box's `id`. Then clicking the words puts the cursor in the box, and screen readers announce the words with the box.
- A **button** with `type="submit"` is the Send button.

## The name attribute, and what Send does

Every box needs a `name` attribute. It is the name the box's value is sent under, such as `email`. A box with no `name` is left out.

**Nothing useful happens when you press Send yet.** A form sends its values to a server, which is a computer that receives and stores them, and your pages have no server. When you press Send from a file on your computer, Chrome loads the page again, adds the values to the end of the address, and empties the boxes. Nothing is stored or sent anywhere. Receiving form data needs the modules that come later in this course.

## Worked example

Here is the complete `contact.html` with a form: a text box, an email box and a textarea, each with a label.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact | Ada Example</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <p class="site-name">Ada Example</p>
      <nav class="nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>Contact</h1>
      <form>
        <div>
          <label for="name">Your name</label>
          <input type="text" id="name" name="name">
        </div>
        <div>
          <label for="email">Your email</label>
          <input type="email" id="email" name="email">
        </div>
        <div>
          <label for="message">Your message</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </main>
    <footer>
      <p>Made by Ada Example.</p>
    </footer>
  </body>
</html>
```

1. Open this lesson on your computer, copy the page above, and paste it over everything in `contact.html` in VS Code.

   You should see: the new page in the editor, with a dot on the tab.
   If you see something else: if you see the old and new text mixed, select everything with Ctrl+A (Cmd+A on macOS) and paste again.

2. Change `Ada Example` to your own name in the three places it appears: the `<title>`, the site name in the header and the footer. Ctrl+F finds them. Then save.

   You should see: your name in all three places, and no dot on the tab.
   If you see something else: if you still find `Ada` in the file, change that one too.

3. Open `contact.html` in Chrome, or refresh it. On Windows type `start chrome "$PWD\contact.html"` in the terminal, on macOS type `open -a "Google Chrome" contact.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12.

   You should see: the heading `Contact`, three labelled boxes and a `Send` button.
   If you see something else: if a label has no box next to it, check that the `<input>` is still inside its `<div>`.

4. Click the words `Your email`.

   You should see: the cursor appears in the email box. That is the label working.
   If you see something else: if nothing happens, the `for` of that label and the `id` of the box do not match. See Common mistakes, number 1.

5. Fill in all three boxes with test words, using a real-looking email address such as `test@example.com`. Then click **Send**.

   You should see: the page reloads, the boxes are empty, and the address bar now ends with something like `contact.html?name=Ada&email=test%40example.com&message=Hello`. Nothing was sent to anyone. The address holds the values, each under the `name` you gave the box. If you typed several words, each space shows as a `+`, and `%40` stands for the `@` sign. That is normal.
   If you see something else: if one value is missing from the address, that box has no `name` attribute.

6. Click on an empty part of the page, then press **Tab** repeatedly, watching the outline.

   You should see: the focus moves through `Home` and `Contact` in the header, then the name box, the email box, the message box and the Send button, in that order. After the Send button it moves to Chrome's own buttons.
   If you see something else: if the order looks wrong, check that the boxes appear in the file in the order you want.

## Guided practice

Here is the email part again, with blanks. Fill in each `TODO` so that the label, the box, and the value that is sent all use the same word. Use the same word in all four places: the one that says what the box is for.

```html
<div>
  <label for="TODO">Your email</label>
  <input type="TODO" id="TODO" name="TODO">
</div>
```

1. Compare this with your own `contact.html`. Write the value for each `TODO`, then check that your page has the same in its email box.

   You should see: `email` in all four places.
   If you see something else: if you used `text` for the type, the box works but loses the email check. Change it to `email`.

2. In Chrome, type `ada` in the email box, fill the other boxes, and click **Send**.

   You should see: Chrome does not send. It shows a small message near the email box that says an `@` is missing. This is Chrome's own check, which comes with `type="email"`.
   If you see something else: if the page reloads without a message, the `type` of the box is `text`, not `email`.

## Your turn

**Goal:** add one more labelled field, and check the whole form with the keyboard.

1. Add a fourth field of your choice that uses a type you have not used yet, such as `type="tel"` for a phone number. Write its label, give it an `id` and a `name`, and add it before the Send button. The `id` must be different from the other ids on the page, and the label's `for` must match it. A `tel` box shows no check on a laptop, and that is normal.
2. Check the page in the validator, as in Lesson 4.
3. Using only the keyboard, press Tab to reach each box and the Send button. Then click each label to check that it moves the cursor to its own box.

**Check yourself:** all of these should be true:

- [ ] Every box has a `<label>` whose `for` matches the box's `id`.
- [ ] Every box has a `name`, and the form has at least three labelled boxes, one of them not `type="text"`.
- [ ] Tab reaches every box and the Send button in a sensible order.
- [ ] Clicking each label puts the cursor in its own box.
- [ ] The validator shows no errors for `contact.html`.

## Common mistakes

**1. Clicking a label does nothing.**

- Symptom: you click `Your email` and the cursor does not move to the box. The validator reports:

  ```text
  Error: The value of the “for” attribute of the “label” element must be the ID of a non-hidden form control.
  ```

- Cause: the `for` of the label does not match the `id` of any box, for example `for="mail"` and `id="email"`.
- Fix: make them identical. The validator found it for you, which is what it is for. This is normal.

**2. A value is missing from the address after Send.**

- Symptom: you press Send and the address shows one value fewer than the number of boxes.
- Cause: the third box has no `name` attribute, so its value is not sent.
- Fix: add `name="message"` or a name that fits. The `id` is not enough.

**3. Send does nothing useful.**

- Symptom: you press Send, the page reloads, the boxes empty, and you receive no message.
- Cause: nothing is wrong with the form. It has no server to send to yet.
- Fix: none for now. This is expected. A later module covers receiving the data.

## Check your understanding

1. **(Predict)** You fill in all three boxes of your form and press Send. What do you see in the window and in the address bar?
2. **(Spot the bug)** A form has `<label for="mail">Your email</label>` and `<input type="email" id="email" name="email">`. Clicking the label does nothing. What is wrong, and what is the fix?
3. **(Recall — Classes, ids and DevTools)** An `id` must be unique on a page. How does a label use an `id`?
4. **(Predict)** You type `ada` in a `type="email"` box and press Send. What does Chrome do?
5. **(Recall)** Which attribute decides the name under which a box's value is sent?

## Answers

1. The page reloads and the boxes are empty. The address bar ends with a question mark and the three values, each under its box's `name`. Nothing is sent to anyone, because there is no server.
2. The `for` and the `id` differ. Change the label to `for="email"`, or the box's `id` to `mail`. They must match.
3. The label's `for` attribute holds the same text as one box's `id`. That connects them, so a click on the label focuses the box and a screen reader reads the label with the box.
4. It does not send. It shows a small message near the box saying that an `@` is missing. The `email` type comes with this built-in check.
5. The `name` attribute.

## Recap

- A form holds boxes and a Send button. Every box needs a `<label>` whose `for` matches its `id`, and a `name` so its value is sent.
- Nothing useful happens on Send yet, because your pages have no server: Chrome reloads the page, puts the values in the address, and clears the boxes.
- You built a form with three labelled boxes and one `type="email"`, checked it with the Tab key and by clicking labels, and validated it.

Next: [Putting your site on GitHub](/learner/roadmap/html-foundations/putting-your-site-on-github)

---

### Lesson 11 — Putting your site on GitHub
<!-- slug: putting-your-site-on-github -->

**By the end you can:**

- Create a GitHub account, including the email check, and a public repository.
- Upload `index.html`, `contact.html`, `styles.css` and the `images` folder from the GitHub website.
- Copy the link to your repository, and upload a changed file again.

**Before you start:** Lessons 1 to 10. Your site folder `my-site` has `index.html`, `contact.html`, `styles.css` and an `images` folder, and you have an email address you can open on your computer.

**Time:** ~45 min (about 30 min if you already have a GitHub account). You can stop after step 5 and carry on later.

**Last verified:** 2026-10-06. **The wording of the GitHub website was not verified**, because GitHub could not be opened from where this lesson was written. The button names, links and screens below come from memory of how GitHub works, and GitHub changes its pages from time to time. Where a name below does not match your screen, look for the same idea, or message your mentor on WhatsApp and say which step number you are on. Nothing here has been run on a Windows or macOS computer.

## Why this matters

So far your site exists only on your computer. To show it to your mentor, it has to be stored somewhere they can reach. GitHub is a website that stores project files, and developers keep their work there. Your mentor reviews your assignment, at the end of this module, from the link you submit. Today you upload your files through the website. A later module teaches the proper way, with Git commands.

## Accounts, repositories and commits

**GitHub** is a website that stores copies of project files. A **repository** is a project's folder on GitHub. A **public** repository can be seen by anyone on the internet. Your GitHub **username** is public too, so choose one you are happy to show to employers.

A **commit** is one saved change to a repository, with a short message that says what changed. When you upload files on the website, GitHub makes a commit for you. Nothing is stored until you commit.

## Email check and two-factor authentication

GitHub checks that your email address is yours. It sends you a **verification code**, a short number, which you type into the website. It may also ask you to set up **two-factor authentication**, an extra check when you sign in, such as a code from an app or a text message. If it asks, follow the screens. Keep the recovery codes it shows in a safe place, because they are the way back in if you lose your phone.

## Worked example

Do this on your computer. If you already have a GitHub account, sign in, then go to step 6 to create the repository.

1. In Chrome, open `github.com` and click **Sign up**.

   You should see: a form asking for your email address.
   If you see something else: if you see a sign-in form instead, look for the link to create an account.

2. Enter your email address, a password and a username, and continue. Pick a username that is professional, because it is public.

   You should see: GitHub asks you to confirm that you are a person, often with a small puzzle.
   If you see something else: if the username is taken, GitHub suggests another one. Pick one you are happy to show to employers.

3. Complete the puzzle, if there is one.

   You should see: GitHub says it is sending a verification code to your email.
   If you see something else: if the puzzle does not work, try again, or use another browser tab and start from step 1.

4. Open your email in a new tab, find the message from GitHub, and type its code into GitHub.

   You should see: GitHub accepts the code and takes you on.
   If you see something else: if no email arrives within a few minutes, look in your spam folder, then use the option on the page to send it again.

5. GitHub may show a short survey. Skip it if there is a skip option. It may also ask you to set up two-factor authentication, now or later. If you can choose later, you may. If it is required, follow the screens. Choose the authenticator app if you have one, or text messages if you do not. Download the recovery codes and also take a photo of them, and keep both somewhere only you can reach.

   You should see: your GitHub home page, with your username near the top right.
   If you see something else: if you are stuck on a screen, take a photo of it and message your mentor on WhatsApp with the step number.

6. Click the **+** at the top right of GitHub, then **New repository**.

   You should see: a form for a new repository.
   If you see something else: if you cannot find the **+**, look for a green **New** button.

7. In the form, type `my-site` as the name and choose **Public**.

   You should see: the name `my-site` in the box, and **Public** selected.
   If you see something else: if GitHub complains about the name, check that it has no spaces.

8. Leave the optional extras, such as adding a README file, unticked. Click **Create repository**.

   You should see: an empty repository page with a short "quick setup" message and a link about uploading an existing file.
   If you see something else: if there is no such link, go on to step 9 and use **Add file**.

9. Click the link that says **uploading an existing file**. If you cannot see it, click **Add file** and then **Upload files**.

   You should see: a large area that says to drag files here.
   If you see something else: if you see a code editor, you opened the wrong option. Go back and look for **Upload files**.

10. In VS Code, right-click `index.html` in the Explorer and choose **Reveal in File Explorer** (**Reveal in Finder** on macOS).

    You should see: a window that shows your `my-site` folder.
    If you see something else: if the folder shows many extra files, that is fine. You will pick only four items.

11. In that window, select `index.html`, `contact.html`, `styles.css` and the `images` folder together, by holding Ctrl (Cmd on macOS) and clicking each one.

    You should see: all four items highlighted.
    If you see something else: if one is missing from the selection, hold Ctrl (Cmd) and click it.

12. Put the File Explorer window and the Chrome window side by side, then drag the four selected items onto the GitHub page. If dragging does not work, click the link on the page for choosing your files and select them there, then ask your mentor on WhatsApp how to add the `images` folder.

    You should see: GitHub lists the files, including the files inside `images` with the folder name in front, for example `images/my-photo.jpg`.
    If you see something else: if you do not see the contents of `images`, drag the `images` folder again.

13. Scroll down to the box under the file list. Leave the commit message as it is, and leave the option to commit to the `main` branch as it is. A **branch** is a line of saved versions of your project, and `main` is the one every project starts with. Click **Commit changes**.

    You should see: the repository page, listing `index.html`, `contact.html`, `styles.css` and `images`.
    If you see something else: if the repository still looks empty, you did not click the button. Go back and click **Commit changes**.

14. Click the folder `images` on GitHub.

    You should see: your picture, and every file name in lowercase.
    If you see something else: if a file name has capital letters or spaces, rename it on your computer, as in Lesson 7, update the `src`, and upload both again.

15. Copy the link to your repository. It is in the address bar, and looks like `https://github.com/` followed by your username, a slash, and `my-site`. Select it and copy it with Ctrl+C (Cmd+C on macOS). Paste it into a note on your phone or computer to keep.

    You should see: the full address.
    If you see something else: if the address ends in something after `my-site`, remove it.

## Guided practice

Now change a file and upload it again. You will also write a short message that says what you changed.

1. On your computer, change the footer text in `index.html`, for example by adding the year. Save the file.

   You should see: no dot on the tab in VS Code.

2. On your GitHub repository page, click **Add file**, then **Upload files**. Drag `index.html` onto the page. In the commit message box, type a short message that says what you changed, for example `Update footer text`. Click **Commit changes**.

   You should see: the repository page again, with your message next to `index.html`. Uploading a file with the same name replaces the old one, so it is not listed twice.
   If you see something else: if the file is listed twice, or an error appears, make sure the file name is exactly `index.html`.

3. On GitHub, click `index.html` to open it.

   You should see: your page's code, with the change you made.
   If you see something else: if you still see the old code, refresh the page.

## Your turn

**Goal:** see your repository the way a stranger sees it.

1. Open a private window in Chrome, which Chrome calls an Incognito window: press Ctrl+Shift+N on Windows or Cmd+Shift+N on macOS.
2. Paste your repository link into it and press Enter.
3. Check that you can see your files without signing in. Click `index.html` and `images` to be sure.
4. Look at every file once, as a stranger would, and decide whether you are happy for anyone to read it.

**Check yourself:** all of these should be true:

- [ ] The repository link opens in the private window, without signing in.
- [ ] The repository has `index.html`, `contact.html`, `styles.css` and `images` at the top level, not inside another folder.
- [ ] The latest change to `index.html` shows when you open the file on GitHub.
- [ ] Nothing in the files is private: no phone number, address, or photo of someone who has not agreed.

## Common mistakes

**1. The verification email does not arrive.**

- Symptom: you wait a few minutes after step 4 and nothing appears in your inbox.
- Cause: the email went to spam, you mistyped the address, or it is delayed.
- Fix: look in your spam folder, check the address you typed, and use the option on the page to send the code again. This is normal and happens often.

**2. My files are not in the repository.**

- Symptom: you dropped files onto the upload page, then opened the repository and found it empty.
- Cause: dropping files only adds them to the upload page. They are stored when you click **Commit changes**.
- Fix: upload again, and scroll down to click **Commit changes**.

**3. My files are inside a folder.**

- Symptom: the repository shows one folder called `my-site` instead of `index.html` and the other files.
- Cause: you dragged the whole `my-site` folder onto the page, not the files inside it.
- Fix: upload `index.html`, `contact.html`, `styles.css` and `images` again at the top level. To remove the extra folder, open each file inside it on GitHub, click the trash can icon or the menu with three dots, choose to delete the file, and commit the change.

**4. My mentor says the link shows "not found".**

- Symptom: you open your repository link in a private window and see a "not found" page, although it works when you are signed in.
- Cause: the repository is private, so only you can see it.
- Fix: in the repository, open its settings, find the option to change its visibility near the bottom of the page, make it public, and confirm. Check the link again in a private window.

## Check your understanding

1. **(Predict)** You drop four items onto the upload page and close the tab without clicking anything else. What does your repository contain?
2. **(Spot the bug)** You send your mentor the link, and they say it shows "404" or "not found". Your repository was created as private. What do you change?
3. **(Recall — Images and alt text)** Why does it matter that `images/photo.jpg` is lowercase when the files are on GitHub?
4. **(Predict)** You change `index.html` on your computer and save it, but do not upload it. Does the copy on GitHub change?
5. **(Recall)** What does the word commit mean on GitHub, and who sees your username?

## Answers

1. Nothing. Files are stored only when you click **Commit changes**.
2. Make the repository public: open its settings, find the option to change its visibility near the bottom, and confirm. Or create a public one. A mentor who is not signed in to your account can only see public repositories.
3. GitHub and most servers treat upper and lower case as different. If the name in your HTML and the file differ in case, the picture will not load, even if it works on your computer.
4. No. GitHub holds its own copy. You must upload the changed file, and commit it, for the copy to change.
5. A commit is one saved change to a repository, with a message. Your username is public: anyone can see it, including on your repositories.

## Recap

- You made a GitHub account, confirmed your email with a verification code, and created a public repository for your site.
- You uploaded your files and the `images` folder through the website, copied the repository link, and checked it in a private window.
- You changed a file and uploaded it again with a short commit message. Nothing on GitHub changes until you upload and commit.

Next: [Semantic Profile Page](/learner/roadmap/html-foundations/assignment)

---

## Assignment: Semantic Profile Page
<!-- slug: semantic-profile-page -->

**Time:** about 3 hours
**Scaffold:** Level 3. Starter files are written out below for you to copy, and you fill in the blanks with your own content.
**Builds on → feeds into:** Lessons 1–11 of this module → CSS and Responsive UI, where you style these same pages and update the same GitHub repository.
**Last verified:** 2026-10-06. The starter pages were checked with html-validate and the W3C Nu validator, with the blanks filled in. The steps and the wording of Chrome, VS Code, the validator website and GitHub have **not yet been run** on a Windows or macOS computer, and the wording of the GitHub and validator websites was not verified. If a step does not match your screen, use "If you get stuck" below.

You will build a small two-page profile site about yourself, check it with the W3C validator, and put it on GitHub. Do the steps on your computer, in the `my-site` folder. You can read this page on your phone, but open it on your computer when you copy the starter files.

## Outcomes assessed

By the end of this module you can:

- **O1** Create, save and open an HTML file in Chrome.
- **O2** Write a complete page skeleton: doctype, `lang`, charset, viewport, `<title>` and a linked stylesheet.
- **O3** Use headings, paragraphs and links, both absolute and relative.
- **O4** Add an image from an `images` folder with a relative path, a lowercase file name and specific `alt` text.
- **O5** Structure a page with `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>`, and use `class` and `id`.
- **O6** Build a form with labelled fields.
- **O7** Check a page in the W3C validator and fix its errors.
- **O8** Upload your files to a public GitHub repository and share the link.

## The task

The site has two pages, `index.html` and `contact.html`, one stylesheet, `styles.css`, and an `images` folder. Anything marked `TODO` is for you to replace with your own words. Replace the words that say `TODO` and keep everything else: for example, `TODO your name | Profile` becomes your name followed by ` | Profile`. Choose your own topic: you, or something you care about, such as a hobby or a place.

### Part 1: Set up the three files (assesses O1, O2)

1. In VS Code, open `my-site`. Open `index.html`, select everything, and replace it with the starter below. Save.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>TODO your name | Profile</title>
       <link rel="stylesheet" href="styles.css">
     </head>
     <body>
       <header>
         <p class="site-name">TODO your name</p>
         <nav class="nav">
           <ul>
             <li><a href="index.html">Home</a></li>
             <li><a href="contact.html">Contact</a></li>
           </ul>
         </nav>
       </header>
       <main>
         <h1>TODO page heading</h1>
         <img src="images/TODO" alt="TODO describe your picture in a few specific words" width="300">
         <section id="about">
           <h2>About me</h2>
           <p>TODO two or three sentences about you.</p>
         </section>
         <section id="interests">
           <h2>My interests</h2>
           <div class="card-grid">
             <article class="card">
               <h3>TODO first interest</h3>
               <p>TODO one sentence about it.</p>
             </article>
             <article class="card">
               <h3>TODO second interest</h3>
               <p>TODO one sentence about it.</p>
             </article>
             <article class="card">
               <h3>TODO third interest</h3>
               <p>TODO one sentence about it.</p>
             </article>
           </div>
         </section>
         <section id="projects">
           <h2>My projects</h2>
           <p>TODO a sentence about something you have made or want to make. <a href="TODO full address starting with https://">TODO name of a website about it</a></p>
         </section>
       </main>
       <footer>
         <p>TODO Made by your name.</p>
       </footer>
     </body>
   </html>
   ```

   You should see: the starter in the editor, with no dot on the tab after saving.
   If you see something else: if your earlier lesson work is mixed in, select all and paste again. Your earlier text is replaced, so copy anything you want to keep first.

2. Open `contact.html`, select everything, and replace it with the starter below. Save.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>Contact | TODO your name</title>
       <link rel="stylesheet" href="styles.css">
     </head>
     <body>
       <header>
         <p class="site-name">TODO your name</p>
         <nav class="nav">
           <ul>
             <li><a href="index.html">Home</a></li>
             <li><a href="contact.html">Contact</a></li>
           </ul>
         </nav>
       </header>
       <main>
         <h1>Contact</h1>
         <form>
           <div>
             <label for="TODO-id-1">TODO label for a text box</label>
             <input type="text" id="TODO-id-1" name="TODO-name-1">
           </div>
           <div>
             <label for="TODO-id-2">TODO label for an email box</label>
             <input type="email" id="TODO-id-2" name="TODO-name-2">
           </div>
           <div>
             <label for="TODO-id-3">TODO label for a message box</label>
             <textarea id="TODO-id-3" name="TODO-name-3" rows="4"></textarea>
           </div>
           <button type="submit">Send</button>
         </form>
       </main>
       <footer>
         <p>TODO Made by your name.</p>
       </footer>
     </body>
   </html>
   ```

   You should see: the starter in the editor, with no dot on the tab after saving.

3. Open `styles.css`, select everything, and replace it with this one line. It stays this way until the CSS module. Save.

   ```text
   /* My styles. The CSS module starts here. */
   ```

   You should see: the comment only.
   If you see something else: if `styles.css` does not exist, create it as in Lesson 3.

4. Open `index.html` in Chrome. On Windows type `start chrome "$PWD\index.html"` in the terminal, on macOS type `open -a "Google Chrome" index.html`. If that fails, open the file from File Explorer or Finder as in Lesson 1, steps 11 and 12. Then open `contact.html` the same way.

   You should see: two plain pages that still show `TODO` words. The links in the top navigation work in both directions.
   If you see something else: if a link fails, check its path against Lesson 6.

### Part 2: Make `index.html` yours (assesses O3, O4, O5)

1. Replace every `TODO` in `index.html` with your own words. Write about yourself or about your topic. The three interests must be real ones, each with its own sentence. The name in the `<title>`, the site name and the footer should be your own.
2. Get a picture into the `images` folder, as in Lesson 7: a photo of your choice, shrunk and named in lowercase with no spaces, such as `my-photo.jpg`. If you have no photo, use the `my-shape.svg` file from Lesson 7. Keep `images/` in the `src` and replace `TODO` with your file's name and ending, such as `my-photo.jpg`. Keep the `width`, which keeps the picture a sensible size. Replace the `alt` text with a specific description of the picture, for example "A blue circle on a yellow square", which has six words. Only the picture you use needs to be in `images`.
3. In the Projects section, write a sentence about something you have made or want to make. Replace the `href` with the real address of a website about it, copied from Chrome's address bar, and write the website's name as the link text. Any website you like will do. The address must start with `https://`.
4. Save, refresh Chrome, and look at the page.

You should see: your name, your picture, your text, three interest cards, and a link in Projects that opens the website you chose.
If you see something else: if the picture does not show, compare `src` with the file name, letter for letter. See Lesson 7.

### Part 3: Make `contact.html` yours (assesses O6)

1. Replace every `TODO` in `contact.html`. For each of the three boxes, write a label, and choose an `id` and a `name`. The `for` of each label must equal the `id` of its box, and the three ids must be different from each other. For example, a box for your name could use the id `name` and the name `name`.
2. Save and refresh. Click each label to check that it moves the cursor to its own box, and press Tab through the form.

You should see: three labelled boxes and a Send button. Clicking each label focuses its box.
If you see something else: if a label does nothing when clicked, its `for` and the box's `id` differ.

### Part 4: Check both pages with the validator (assesses O7)

1. Copy all of `index.html` and check it in the W3C validator with **Validate by Direct Input**, as in Lesson 4. Read the first error and fix it. Check again until there are no errors. Do the same for `contact.html`.
2. Copy the result for each page into Notes, as described under Submit. Copy the line that tells you the result, such as `Document checking completed. No errors or warnings to show.` If a warning or an information message appears, copy it too. Warnings are fine, but errors are not.

You should see: a result that says each page was checked and shows no errors.
If you see something else: fix the first error first, as in Lesson 4, then copy the page again.

### Part 5: Put it on GitHub (assesses O8)

1. Follow Lesson 11: create a public repository named `my-site`, or use the one from the lesson, and upload `index.html`, `contact.html`, `styles.css` and the `images` folder. Upload the files that are in the folder, not the folder `my-site` itself. If you already uploaded earlier versions, upload the new ones again. Uploading a file with the same name replaces the old one.
2. Open your repository link in a private window, which Chrome calls an Incognito window (Ctrl+Shift+N on Windows, Cmd+Shift+N on macOS), without signing in, and check that you see your files.

You should see: your four items at the top level of the repository, and a link that opens without signing in.
If you see something else: if the link says "not found", the repository is private. Make it public.

## Acceptance checklist

Check each item yourself before you submit.

- [ ] Both pages open in Chrome from your computer, and each has `<!DOCTYPE html>`, `<html lang="en">`, a charset, the viewport line, a `<title>` in your own words, and a `<link>` to `styles.css`, which holds only a comment, and no `TODO` word is left in either file (O1, O2)
- [ ] The `Home` and `Contact` links in the `<nav>` of both pages open the other page, using relative paths (O3, O5)
- [ ] `index.html` has exactly one `<h1>` and three `<section>` elements, with the ids `about`, `interests` and `projects`, each starting with its own `<h2>` (O3, O5)
- [ ] The Interests section has three `<article class="card">` items, each with an `<h3>` and a sentence of your own (O5)
- [ ] The Projects section has a link to another website, with an address that starts with `https://` (O3)
- [ ] The picture that `index.html` shows is in `images`, with a lowercase file name and no spaces and a relative `src`, and its `alt` has at least four words that describe what is in it, for example "A blue circle on a yellow square" (O4)
- [ ] `contact.html` has three boxes, each with a `<label>` whose `for` matches the box's `id` and a `name`, and one of the boxes is `type="email"` (O6)
- [ ] Notes has the validator result for `index.html` and for `contact.html`, and each says no errors (O7)
- [ ] The GitHub URL opens a public repository, without signing in, and `index.html`, `contact.html`, `styles.css` and `images` are at its top level (O8)
- [ ] Notes has your reflection of 3 to 5 sentences, in your own words, that answers the three prompts below (personal)

## Submit

Scroll down to the submit form on this page.

- **GitHub URL:** paste the link to your repository. It looks like `https://github.com/` followed by your username, a slash, and the repository name.
- **Notes:** paste the template below and fill it in. Notes is plain text, so no formatting is needed.
- **Deployed URL:** leave it empty. It is only for a live website address. Fill it in only if you did the optional extra at the end.
- **Attachment URL:** leave it empty unless you want to share a screenshot. It takes a link, not a file. To make one, upload the screenshot to your GitHub repository in a folder named `screenshots`, open it there, and copy the address.
- The form needs at least one field filled in. The GitHub URL and Notes are what your mentor needs.
- After you press Submit, your mentor reads it. If the answer is **Changes requested**, read the note, fix what it names, upload the changed files again, and press **Resubmit**. Your earlier attempts stay visible, and that is normal. You cannot submit again while the status says **Awaiting review**.

```text
Computer (Windows 10, Windows 11 or macOS):
Validator result, index.html:
Validator result, contact.html:

Reflection (3 to 5 sentences in all; answer each question in one or two sentences):
1. Which part took you longest, and what did you do about it?
2. What did the validator find in your pages, and how did you fix it?
3. What is one thing you would change about your site next?
```

## If you get stuck

- **When to ask:** ask after 20 minutes on one step, or when the same error is still there after two fixes. Being stuck early is useful information for your mentor, not a failure.
- **What to send, wherever you ask:**
  - the step number you are on, for example "Part 3, step 2"
  - what you tried
  - the exact error text, copied from the validator or the terminal (do not retype it)
  - whether you are on Windows 10, Windows 11 or macOS, and your Chrome version if you know it
  - a screenshot, if you can make one (a photo of the screen taken with your phone is fine)
- **Where to ask:**
  1. **First choice:** message your mentor on WhatsApp and send the details above. You can send the screenshot or a photo of your screen straight in the chat.
  2. **If you cannot reach your mentor, or you want it on record here:** submit anyway. Write the word `STUCK` on the first line of Notes, add the same details, and put a link to the screenshot in the Attachment URL box only if you know how to make one.
- Your mentor replies with help. If you asked in the review, the reply arrives as **Changes requested**. Follow it, then press **Resubmit**.

## How this is reviewed

Your mentor checks each item below. You can use the same list to check yourself.

- **Skeleton and files**
  - Approve if: both pages have the doctype, `lang`, charset, viewport, a `<title>` of your own words, and a `<link>` to `styles.css`, and `styles.css` holds only a comment.
  - Request changes if: any of those is missing, or a `TODO` is left in either file.
- **Navigation**
  - Approve if: `Home` and `Contact` in the `<nav>` of both pages open the other page, with relative paths.
  - Request changes if: a link is missing, broken, or an absolute address.
- **Headings and sections**
  - Approve if: `index.html` has one `<h1>`, three sections with the ids `about`, `interests` and `projects`, and each section starts with its own `<h2>`.
  - Request changes if: there are two `<h1>`, a section has no heading, or an id is missing or repeated.
- **Cards**
  - Approve if: there are three `<article class="card">`, each with an `<h3>` and a sentence that is not copied from the starter.
  - Request changes if: there are fewer than three, the class is missing, or a card still holds starter text.
- **Absolute link**
  - Approve if: the Projects section has a link whose `href` starts with `https://`.
  - Request changes if: the link is missing, or its address does not start with `https://`.
- **Image**
  - Approve if: the picture shows on GitHub, its file is in `images` with a lowercase name and no spaces, the `src` is relative, and the `alt` has at least four words that describe what is in it.
  - Request changes if: the picture does not show on GitHub, the name has capitals or spaces, or the `alt` is empty, says only "image" or "photo", or is the starter text.
- **Form**
  - Approve if: three boxes, each with a `<label>` whose `for` matches its `id` and a `name`, and one box is `type="email"`.
  - Request changes if: a label does not match, a `name` is missing, or no box is `type="email"`.
- **Validator results**
  - Approve if: Notes holds a result for each page that says no errors.
  - Request changes if: a result is missing, or it shows errors.
- **GitHub repository**
  - Approve if: the link opens a public repository with the four items at its top level.
  - Request changes if: the link does not open without signing in, or the files are inside another folder.
- **Reflection**
  - Approve if: 3 to 5 sentences, in your own words, that answer all three prompts specifically.
  - Request changes if: it is missing, is much shorter, or does not answer the prompts.

How the decision is made: if every item is met, you are approved. If there is a small gap, such as a thin reflection or an `alt` that could be more specific, you are approved with a note. If any item above is missing or wrong, your mentor requests changes and names the items. A `STUCK` submission gets help, not a mark against you.

## Stretch (optional, not reviewed)

Turn your repository into a live website with GitHub Pages. In your repository, open **Settings**, then **Pages**, and choose to publish from the `main` branch. After a minute or two, GitHub shows the address of your site. Open it and check that your pictures show, then paste the address into **Deployed URL**. The exact names on the GitHub pages may differ from these, which were written from memory and not verified.
