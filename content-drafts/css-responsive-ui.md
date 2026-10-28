# Module: CSS and Responsive UI

*Style the profile site you built in HTML Foundations: type, colour, spacing, layout with Flexbox, phone-sized screens, an accessible form, and a live address on GitHub Pages. Builds on HTML Foundations: you work in the same `my-site` folder, on the same `styles.css` that your pages already link to. Written for a learner with no prior experience; Windows first, macOS differences noted.*

<!-- WORK IN PROGRESS (see docs/plans/css-responsive-ui.md). This file holds ONLY lesson 1. Lessons 2-10, the assignment and the mentor notes are not written yet. DO NOT IMPORT this file until the module is complete: the importer would archive every other CSS lesson the learner has. -->

### Lesson 1 — What CSS is and how a rule works
<!-- slug: what-css-is-and-how-a-rule-works -->

**By the end you can:**

- Write a **CSS rule** (an instruction that styles part of a page) in `styles.css`, save it, and see it change `index.html` in Chrome.
- Name the **selector**, the **property** and the **value** in a rule: the part that picks the elements, the thing to change, and the setting.
- Open Chrome's **Styles pane** (the list of rules that apply to the element you selected) and switch one line of a rule off and on.
- Fix a rule that has no effect by checking the likely causes in a fixed order.

**Before you start:** You finished HTML Foundations. Your `my-site` folder holds `index.html`, `contact.html`, `styles.css` and an `images` folder, and both pages link to `styles.css` in the `<head>`. You can open a page in Chrome (HTML Foundations, "Your first web page").

**Time:** ~40 min

**Last verified:** 2026-10-29 on Windows 10 with Chromium 153 (the engine inside Chrome). Every rule and every "nothing changes" case below was run in the browser. **Not yet run on a real Windows or macOS desktop screen:** the exact look of the panel Chrome opens when you choose Inspect (the small checkbox beside a line, the label "user agent stylesheet") and the shortcut Ctrl+Shift+R. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Your pages work, but they look like every plain page on the internet: black text on white. **CSS**, the language that controls how a page looks, changes that. The first time you write it, though, the biggest problem is rarely the CSS itself. It is a change that does not show, and you cannot tell whether you made a typing mistake or Chrome is showing an old copy. This lesson shows you how to find out in two minutes.

## What CSS is

**CSS** (Cascading Style Sheets) is the language that tells a browser how HTML should look: colours, sizes, spacing and layout. HTML says what is on the page ("this is a heading"). CSS says how it looks ("dark blue, in the middle").

CSS lives in a **stylesheet**, a file whose name ends in `.css`. You already have one: `styles.css`. Your pages load it with the line `<link rel="stylesheet" href="styles.css">` in the `<head>`. Until now it held only a **comment**, a note for people that the browser ignores. A CSS comment starts with `/*` and ends with `*/`.

## The parts of a rule

A **rule** says "find these elements and change them like this". This is one:

```css
h1 {
  color: darkslateblue;
  text-align: center;
}
```

- The **selector** says which elements the rule is for. Here it is `h1`, so the rule applies to every `<h1>` on the page.
- The curly braces `{ }` wrap the **declarations**.
- A **declaration** is one change, such as `color: darkslateblue;`. It has four parts:
  - a **property**, which is what to change (`color` sets the colour of the text);
  - a colon;
  - a **value**, which is the setting (`darkslateblue` is a **colour name**, one of many that Chrome understands);
  - a semicolon that ends the declaration.

The second declaration, `text-align: center;`, puts the text in the middle of its line. CSS property names use American spelling, so the code says `color`, not `colour`. This course writes "colour" in its sentences and `color` in its code.

## Worked example

You will put the rule above into `styles.css` and then look at it inside Chrome. Do these steps on your computer.

1. In VS Code, open the `my-site` folder. In the Explorer (the file list on the left), click `styles.css`.

   You should see: one line, the comment `/* My styles. The CSS module starts here. */`.
   If you see something else:
   - If the file is empty, that is fine. Carry on.
   - If the Explorer has no `styles.css`, create it with **New File**, as in HTML Foundations, "The skeleton of every page", and carry on.

2. Open `index.html` and look in the `<head>` for this line, between `<title>` and `</head>`:

   ```html
   <link rel="stylesheet" href="styles.css">
   ```

   You should see: that line, spelled exactly like this.
   If you see something else: if the line is missing, add it on a new line directly above `</head>` and save. Do the same in `contact.html`. If it says `style.css` or anything else in `href`, change it to `styles.css`.

3. Open `index.html` in Chrome. In VS Code, right-click `index.html` in the Explorer and choose **Reveal in File Explorer** on Windows, or **Reveal in Finder** on macOS. In the window that opens, right-click `index.html`, choose **Open with**, then **Google Chrome**. (This is the way from HTML Foundations lesson 1. If you prefer the terminal command from that lesson, use it.)

   You should see: your page in a Chrome window, in plain black and white, with the `<h1>` heading at the left.
   If you see something else: if the page opened in another browser such as Edge, close it and repeat with **Open with**, then **Google Chrome**. Keep both Chrome and VS Code open from now on, and switch between them with Alt+Tab on Windows or Cmd+Tab on macOS.

4. Predict first: after you add the `h1` rule and refresh, which text on the page will change? Decide your answer before you go on. Step 8 tells you what really happens, so check your prediction against it.

5. Go back to VS Code. Copy the code below from this page: drag across it with the mouse, then press Ctrl+C (Cmd+C on macOS).

   ```css
   /* My styles. The CSS module starts here. */

   h1 {
     color: darkslateblue;
     text-align: center;
   }
   ```

   You should see: the code highlighted on this page.
   If you see something else: if only part of it is highlighted, click once elsewhere on the page and drag again.

6. Click in `styles.css`, select everything (Ctrl+A on Windows, Cmd+A on macOS) and paste (Ctrl+V, or Cmd+V).

   You should see: the comment and the rule in several colours, and a **dot** on the `styles.css` tab. VS Code shows a dot while a file has changes that are not saved.
   If you see something else: if the text is all one colour, check that the tab is named `styles.css`.

7. Save: press Ctrl+S on Windows or Cmd+S on macOS.

   You should see: the dot on the tab turns into an **×** (the close button), which means saved.
   If you see something else: if the dot stays, click in the editor and press the keys again.

8. Go to Chrome and refresh: press Ctrl+R on Windows or Cmd+R on macOS, which is a normal refresh.

   You should see: the main heading in dark blue and in the middle of the line. Everything else is unchanged, because only the `<h1>` matched the selector. If you predicted that only the heading changes, you were right.
   If you see something else: read Common mistakes, number 1. It lists the causes in the order to check them.

9. Right-click the heading in Chrome and choose **Inspect**.

   You should see: a panel opens inside the Chrome window, at the right or at the bottom. This is **DevTools**, tools built into Chrome for looking inside a page. The **Elements** tab is selected and the line with `<h1>` is highlighted.
   If you see something else: if no panel opens, right-click directly on the heading text, not on blank space.

10. Find the **Styles pane**: the part of DevTools that lists the CSS rules that apply to the selected element. It is a tab named **Styles**, next to the `<h1>` line when DevTools is wide, or under it when DevTools is narrow, so scroll down if you do not see it.

    You should see: a rule that starts `h1 {` and holds your two declarations, with `styles.css:3` at its right. That is the file name and the line number where the rule starts. If your file has a different number of blank lines, the number differs; that is fine. Further down there are greyed rules labelled **user agent stylesheet**. That is the browser's own built-in style, and it is the reason an `<h1>` is big and bold before you write any CSS. You may also see other groups; ignore them for now.
    If you see something else: if no rule from `styles.css` is listed, read Common mistakes, number 1, item 3.

11. Move the mouse over the line `color: darkslateblue;` in your rule. A small checkbox appears in the space to the left of the property name. Click it.

    You should see: the checkbox empty and the text of that line struck through (a line drawn through it), and the heading turns black at once. Click the checkbox again and the blue returns. This changes only the copy of the page inside Chrome. Your file is not touched, and refreshing the page undoes every change made in DevTools.
    If you see something else: if no checkbox appears, move the mouse slowly across the line from the left edge of the rule towards the property name, until the box shows.

12. Close DevTools with the **×** at the top right of its panel.

    You should see: the page fills the window again.

## Guided practice

Now you add two rules of your own, with blanks to fill. The colour names you can use are `darkgreen`, `firebrick`, `navy`, `darkslategray`, `lightgray` and `lightyellow`. `color` sets the colour of text, and `background-color` sets the colour behind it. Choose a dark colour (`darkgreen`, `firebrick`, `navy` or `darkslategray`) for the text and a light one (`lightgray` or `lightyellow`) for the background, so that the text stays readable.

```css
p {
  color: TODO;
}

footer {
  background-color: TODO;
}
```

1. Your `index.html` from the HTML assignment has paragraphs and a `<footer>` that holds a `<p>`, so both rules have something to match. In `styles.css`, add these two rules under the `h1` rule, with a blank line between rules. Replace each `TODO` with a colour name from the list. Delete the word `TODO` itself. Save.

   You should see: the tab shows ×.
   If you see something else: if a `TODO` is left in, Chrome ignores that declaration. Replace it and save again.

2. Predict first: which text on `index.html` will change colour, and what will change in the footer? Decide before you refresh.

3. Refresh Chrome.

   You should see: every paragraph in your text colour, including the site name at the top and the sentence in the footer, because all of them are `<p>` elements in the page you built. The footer has a coloured strip behind its text. The headings are unchanged.
   If you see something else: if the text is hard to read, choose another pair of colours. Lesson 4 shows you how to measure whether text is readable.

4. Right-click one paragraph, choose **Inspect**, and find your `p` rule in the Styles pane. Switch its `color` declaration off and on with the checkbox, as in step 11 above. Close DevTools.

   You should see: the paragraph text changes between your colour and black.

## Your turn

**Goal:** make the three `<h2>` headings on `index.html` (one for each section of your page) a different colour from the paragraphs, and italic. You write the rule yourself. Use the element selector `h2`, the property `color` with any colour name from the list above, and the property `font-style` with the value `italic`. Your headings can have your own words; the check is about their colour and style.

Then open `contact.html` in Chrome and refresh it.

**Check yourself:** save and refresh. All of these should be true:

- [ ] Your new rule starts with `h2 {` and ends with `}`, and each declaration inside it ends with a semicolon.
- [ ] On `index.html`, the three `<h2>` headings have a new colour and are italic, and the main `<h1>` is still dark blue and in the middle.
- [ ] In the Styles pane for one of the `<h2>` headings, your rule is listed with `styles.css` and a line number, and nothing in it is crossed out.
- [ ] In `contact.html`, the "Contact" heading is also dark blue and in the middle. One stylesheet styles both pages.
- [ ] The `styles.css` tab in VS Code shows ×, not a dot.

Keep `styles.css` as it is when you finish. Lesson 2 continues from it.

## Common mistakes

**1. My CSS change does not show.**

- Symptom: you saved a rule and refreshed Chrome, and the page looks the same.
- Cause: one of five things, listed here in the order to check them. Most often it is number 1.
- Fix: go down the list and stop at the first one that applies. This happens to every developer, so it is normal.
  1. The file is not saved. If the `styles.css` tab shows a dot, press Ctrl+S (Cmd+S on macOS), then refresh.
  2. You edited the wrong file. The tab must be named `styles.css`, and the file must be the one inside `my-site`, not a copy in another folder such as Downloads.
  3. Chrome is not loading your file. Right-click the element, choose **Inspect**, and look at the Styles pane. If you see no rule from `styles.css` at all, only greyed "user agent stylesheet" rules, check the `<link>` line in `<head>`: `href` must be exactly `styles.css`.
  4. The rule is there but a line in it is crossed out, often with a small warning triangle. Chrome could not read that line. Read mistakes 2, 3 and 4 below.
  5. The Styles pane shows the old text of your rule, not what you saved. Chrome keeps a stored copy of files, called the **cache**, so pages load faster, and a normal refresh can reuse the stored `styles.css`. Do a **hard refresh**, which tells Chrome to download everything again: Ctrl+Shift+R on Windows (Ctrl+F5 also works), Cmd+Shift+R on macOS. This is uncommon for files on your own computer. It is the usual reason a live website looks out of date, and you will meet it again in the lesson about publishing your site.

**2. A semicolon is missing.**

- Symptom: the rule is in the file, but neither of its lines has an effect. With this rule the heading is not navy and not in the middle:

  ```css
  h1 {
    color: navy
    text-align: center;
  }
  ```

  In the Styles pane the two lines appear as one crossed-out line.
- Cause: without the semicolon after `navy`, Chrome reads the two lines as one long, invalid declaration and drops both.
- Fix: end every declaration with a semicolon. Save and refresh. This is normal: every developer forgets one.

**3. A property is spelled the British way.**

- Symptom: the heading stays black although you wrote a colour. It may still be centred, because only the misspelled line is dropped:

  ```css
  h1 {
    colour: navy;
    text-align: center;
  }
  ```

  In the Styles pane, `colour: navy;` is crossed out, usually with a warning triangle.
- Cause: CSS property names use American spelling. Chrome does not know a property called `colour`.
- Fix: write `color`. Only the property name is affected: colour *names* such as `navy` are fine. This is normal, and the error is quiet.

**4. A closing brace is missing.**

- Symptom: the first rule works, but the rule written straight after it has no effect. With this file the heading is navy and in the middle, but the paragraphs stay black:

  ```css
  h1 {
    color: navy;
    text-align: center;

  p {
    color: firebrick;
  }
  ```

- Cause: the `}` that closes the `h1` rule is missing, so Chrome treats the `p` rule as part of the `h1` rule. No error message appears.
- Fix: add the missing `}` on its own line after the last declaration of the first rule. Save and refresh.

**5. A colour name is misspelled or does not exist.**

- Symptom: the heading keeps its old colour, although the rule is there and the other line works. With this rule the heading stays black but is still centred:

  ```css
  h1 {
    color: darkslatebue;
    text-align: center;
  }
  ```

  In the Styles pane, the `color` line is crossed out, usually with a warning triangle.
- Cause: Chrome does not know a colour called `darkslatebue`, so it drops that line. Chrome gives no other message. Names such as `teal-blue` do not exist either.
- Fix: compare the name with the list in Guided practice, letter by letter, and correct it. Save and refresh. This is normal: a crossed-out line in the Styles pane is Chrome telling you it rejected the value.

## Check your understanding

1. **(Predict)** `styles.css` contains `h2 { color: firebrick; }`. `index.html` has one `<h1>`, three `<h2>` headings and several paragraphs. `contact.html` has an `<h1>`, a form and no `<h2>`. Which elements change colour, and does anything change on `contact.html`?
2. **(Spot the bug)** Kofi writes this rule, saves, and refreshes. His paragraphs are neither navy nor italic. What is wrong, and what will the Styles pane show?

   ```css
   p {
     color: navy
     font-style: italic;
   }
   ```

3. **(Recall — The skeleton of every page)** Which line in the `<head>` makes a page use `styles.css`? If its `href` said `style.css`, what would you see in the Styles pane?
4. **(Predict)** You switch off a declaration with its checkbox in DevTools and then press Ctrl+R. What does the page show, and has `styles.css` changed?
5. **(Spot the bug)** Mia wants her heading navy and in the middle. It turns navy, but it stays at the left. What is wrong, and how can she see it in the Styles pane?

   ```css
   h1 {
     color: navy;
     text-align: centre;
   }
   ```

## Answers

1. The three `<h2>` headings turn firebrick, and nothing else changes: the selector `h2` matches only `<h2>` elements. `contact.html` has no `<h2>`, so nothing changes there.
2. A semicolon is missing after `navy`. Chrome reads `navy font-style: italic` as one invalid value and drops both lines, so neither takes effect. The Styles pane shows the two lines as one crossed-out line. The fix is `color: navy;` with a semicolon.
3. The line is `<link rel="stylesheet" href="styles.css">`. With `style.css` in `href`, Chrome cannot find the file, so the Styles pane lists only the greyed "user agent stylesheet" rules and none from your file.
4. Pressing Ctrl+R reloads the page, so Chrome reads your files again and the DevTools change disappears: the page shows your saved styles. `styles.css` never changed, because DevTools edits only the copy of the page inside Chrome.
5. The value is spelled the British way. CSS says `center`, so Chrome rejects `centre` and drops that one line; the `color` line still works. In the Styles pane the `text-align: centre;` line is crossed out, usually with a warning triangle. The fix is `text-align: center;`.

## Recap

- A CSS rule has a selector, then declarations in curly braces; each declaration is a property, a colon, a value and a semicolon. You wrote rules in `styles.css` and saw them change both pages.
- You named the parts of a rule: `h1` is the selector, `color` the property, `darkslateblue` the value, and the whole line `color: darkslateblue;` is a declaration.
- In Chrome you right-click, choose **Inspect**, and use the Styles pane to see which rules apply and to switch a declaration off and on. A refresh undoes DevTools changes.
- When a change does not show, check in this order: saved, right file, file loaded, no crossed-out line (a typo, a missing semicolon or brace, or a misspelled value), then hard refresh with Ctrl+Shift+R (Cmd+Shift+R on macOS).

Next: [Selectors: element, class and id](/learner/roadmap/css-responsive-ui/selectors-element-class-and-id)
