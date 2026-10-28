# Module: CSS and Responsive UI

*Style the profile site you built in HTML Foundations: type, colour, spacing, layout with Flexbox, phone-sized screens, an accessible form, and a live address on GitHub Pages. Builds on HTML Foundations: you work in the same `my-site` folder, on the same `styles.css` that your pages already link to. Written for a learner with no prior experience; Windows first, macOS differences noted.*

<!-- COMPLETE DRAFT (see docs/plans/css-responsive-ui.md): lessons 1-10 and the assignment. Written 2026-10-29, reviewed by simulated learners, NOT yet reviewed by the owner beyond lesson 1, NOT imported anywhere. Import to dev first with a dry run, then production through the workflow, per CLAUDE.md. -->

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
  4. The rule is there but a line in it is crossed out, often with a small warning triangle. Chrome could not read that line. Read mistakes 2 to 5 below.
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

---

### Lesson 2 — Selectors: element, class and id
<!-- slug: selectors-element-class-and-id -->

**By the end you can:**

- Write a rule with a **class selector** (`.card`) and one with an **id selector** (`#projects`), and say which elements each one matches.
- Write a **descendant selector** (`.nav a`), which matches only links inside the navigation, and a **selector list** (`h2, h3`), which gives two kinds of element the same style.
- Choose between a class and an id for a new rule, and give one reason.
- Use the Styles pane to find which selector styled a card, and which did not.

**Before you start:** Lesson 1 of this module (rules, and opening the Styles pane with right-click, **Inspect**) and the HTML Foundations lesson "Classes, ids and DevTools". Your `index.html` is the page from the HTML assignment, so it has the classes `site-name`, `nav` and `card`, and the ids `about`, `interests` and `projects`. Step 1 below checks that. In this module you add rules to the end of `styles.css`. If a rule for the same selector is already in your file, add the new lines to that rule instead of writing a second copy.

**Time:** ~35 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** the exact look of the Styles pane. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

In Lesson 1 the `p` rule coloured every paragraph: the site name at the top, the text in the cards and the footer. Often you want only some of them to change. A **selector** decides exactly which elements a rule touches. If it is too wide, things change that you did not mean to change. If it is too narrow or misspelled, nothing changes at all.

## Three ways to pick elements

You met these names in HTML Foundations. Now they matter for style.

- An **element selector** is a tag name: `p`, `h2`, `footer`. It matches every element of that kind.
- A **class selector** is a dot and a class name: `.card`. It matches every element whose HTML says `class="card"`. Many elements can share one class.
- An **id selector** is a hash sign and an id: `#projects`. It matches the one element whose HTML says `id="projects"`. An id appears once per page.

The name after the dot or the hash must be spelled exactly as in the HTML, capitals included.

## Picking elements inside other elements

Write two selectors with a space between them to match an element **inside** another one. This is a **descendant selector**. `.nav a` means "every `<a>` inside an element with the class `nav`". The element can be nested several levels down; it does not have to be a direct child. A link in the Projects section is not inside `.nav`, so the rule skips it.

A comma means something different. `h2, h3` is a **selector list**: the rule applies to every `<h2>` **and** every `<h3>`. Remember it this way: a space means "inside", a comma means "and".

## Class or id?

Use a **class** for most styling: it can be reused on many elements. Use an **id** for the one element that is special, such as a section you link to. Lesson 3 shows another reason to prefer classes. JavaScript, which you learn in a later module, finds elements with these same selectors, so what you learn here is used again.

## Worked example

You will add three rules and then ask the Styles pane which one styled what. Do these steps on your computer.

1. Check that your page has what these rules need. In VS Code, open `index.html`, press Ctrl+F (Cmd+F on macOS) and search for each of these in turn: `class="card"` (it should be found three times), `class="nav"`, `class="site-name"`, `id="projects"`, `id="interests"`. Then open `contact.html` and search for `rel="stylesheet"`.

   You should see: every search finds the text, and `contact.html` has the line `<link rel="stylesheet" href="styles.css">`.
   If you see something else: if a name is missing, your HTML differs from the assignment. Add the missing attribute to the right element (for example `class="card"` on each of the three cards), save, and go on. If `contact.html` has no stylesheet link, add the line directly above `</head>`.

2. Open `index.html` in Chrome and look at the page. Keep it open next to VS Code.

   You should see: your page as it was at the end of Lesson 1.

3. Predict first: the rules below use a class, an id and a descendant selector. Which parts of your page will change? Decide before you go on. The answer is in step 6.

   ```css
   .card {
     background-color: lightyellow;
   }

   #projects {
     background-color: lightgray;
   }

   .nav a {
     color: darkgreen;
   }
   ```

4. In VS Code, open `styles.css`. Copy the three rules above from this page. Press Ctrl+End (Cmd+Down arrow on macOS) to jump to the end of the file, press Enter twice, and paste them.

   You should see: the new rules under the old ones, with a blank line between rules.
   If you see something else: if the new rules are glued to the last `}`, add a blank line. CSS does not need it, but it is easier to read.

5. Save with Ctrl+S (Cmd+S on macOS), go to Chrome, and refresh with Ctrl+R (Cmd+R).

   You should see: the three cards on a pale yellow background, the whole Projects section on grey (with the cards' own yellow only on the cards), and the links in the top navigation in dark green.
   If you see something else: read Common mistakes. Check the first three in order.

6. Compare with your prediction. The cards matched `.card`. The one section with `id="projects"` matched `#projects`. Only the links inside the navigation matched `.nav a`: the link in the Projects section (the HTML assignment asked for one) is still its normal blue.

   You should see: the Projects link is blue, not green.
   If you see something else: if it is also green, read Common mistakes, number 4.

7. Right-click the edge of a card (the space inside its border, not the text) and choose **Inspect**. If the Elements panel highlights a `<p>` or `<h3>` line instead, click the line that starts with `<article class="card">`. Look at the Styles pane.

   You should see: your `.card` rule with `background-color: lightyellow;`, with `styles.css` and a line number at its right.
   If you see something else: if you cannot find the Styles pane, scroll the DevTools panel down, or see Lesson 1, step 10.

8. Right-click a link in the top navigation and choose **Inspect**, then do the same for the link in the Projects section, and compare the Styles panes.

   You should see: `.nav a` listed for the navigation link and not for the Projects link.

## Guided practice

Two blanks to fill, each one a selector. Read the comment above each rule: it says which elements the rule must affect.

```css
/* only the paragraphs inside the cards: make them italic */
TODO p {
  font-style: italic;
}

/* only the site name at the top: make it bold */
TODO {
  font-weight: bold;
}
```

1. Predict first: which words on `index.html` should become italic, and which should become bold? Decide before you start.

2. Add the two rules to the end of `styles.css`. Replace each `TODO` with a selector. Hint: the first needs the class of the cards, then a space (the `p` stays); the second needs the class of the site name. Keep the dot in front of a class name. Save and refresh Chrome.

   You should see: the sentences inside the three cards in italics, and the site name at the top in bold. The paragraphs in the About section and the footer are not italic.
   If you see something else: if nothing changes, read Common mistakes, numbers 1 to 3. If everything on the page became italic, you wrote only `p`: the card class must come first, followed by a space.

3. Use the Styles pane on a paragraph inside a card, and then on the About paragraph. Find which paragraph has your italic rule.

   You should see: the rule listed for the card paragraph only.

## Your turn

**Goal:** two more rules, written without a template.

1. On `contact.html`, make the text of every `<label>` bold, using a descendant selector that matches labels only inside a `<form>`.
2. On `index.html`, underline the `<h2>` heading of the Interests section only, using the id of that section and the element `h2` with a space between them. Use `text-decoration: underline;`.
3. Write one rule with a **selector list** (a comma) that sets `text-transform: uppercase;` for both the card headings (`h3`) and the labels (`label`). `text-transform: uppercase` shows text in capital letters without changing the HTML.
4. In a comment in `styles.css`, write one sentence that says whether you would use a class or an id to style a button that appears three times on a page, and why. A CSS comment looks like `/* your sentence */`.

**Check yourself:** save, refresh both pages. All of these should be true:

- [ ] On `contact.html`, the three labels are bold and the heading "Contact" is not.
- [ ] On `index.html`, the Interests heading is underlined and the About and Projects headings are not.
- [ ] The selectors of rules 1 and 2 each contain a space and no comma, and rule 3 contains a comma.
- [ ] The card headings on `index.html` and the labels on `contact.html` are in capital letters.
- [ ] Your comment names class or id and gives a reason.
- [ ] In the Styles pane for the Interests `<h2>`, your id rule is listed with `styles.css` and a line number, and no line in it has a line drawn through it.

Keep `styles.css` as it is. Lesson 3 continues from it.

## Common mistakes

**1. The dot is missing.**

- Symptom: you wrote a rule for the cards, and nothing changes. In the Styles pane for a card, your rule is not listed:

  ```css
  card {
    background-color: lightyellow;
  }
  ```

- Cause: without the dot, `card` is an element selector. It looks for an element called `<card>`, and the page has none. Chrome shows no error.
- Fix: write `.card`. A class needs a dot, an id needs a hash sign. This is normal: almost everyone forgets the dot once.

**2. The wrong symbol for the kind of name.**

- Symptom: a rule for the Projects section does nothing:

  ```css
  .projects {
    background-color: lightgray;
  }
  ```

  In the HTML the section says `id="projects"`.
- Cause: `.projects` looks for a class called `projects`, and the section has an id.
- Fix: look at the HTML. `class="..."` needs a dot, and `id="..."` needs a hash sign, so here the rule is `#projects`.

**3. The name does not match the HTML.**

- Symptom: a rule for the cards does nothing, and the dot is there. In the Styles pane for a card, your rule is not listed:

  ```css
  .Card {
    background-color: lightyellow;
  }
  ```

- Cause: class and id names are case-sensitive. `.Card` is not `.card`. A different spelling, such as `.cards`, fails in the same way.
- Fix: open `index.html`, copy the name from the HTML and compare it letter by letter. Save and refresh.

**4. A comma where a space belongs.**

- Symptom: you wanted only the links in the navigation to be green, but the link in the Projects section is green too:

  ```css
  .nav, a {
    color: darkgreen;
  }
  ```

- Cause: a comma means "and", so this rule applies to everything with the class `nav` and to every link on the page.
- Fix: replace the comma with a space: `.nav a`. Save and refresh.

## Check your understanding

1. **(Predict)** `styles.css` contains `.card p { color: firebrick; }`. Which paragraphs change colour: the ones in the cards, the About paragraph, the footer sentence?
2. **(Spot the bug)** Kofi writes `section { background-color: lightgray; }` hoping to colour only the Projects section. What happens, and which selector would colour only that section?
3. **(Recall — Classes, ids and DevTools)** In HTML, which can appear on many elements of a page, a class or an id? Which one would you use for a rule that must style exactly one element?
4. **(Predict)** Two learners write different rules: Ada writes `.nav a { color: darkgreen; }` and Kofi writes `.nav, a { color: darkgreen; }`. Whose page turns the link in the Projects section green?
5. **(Spot the bug)** Mia's HTML says `<article class="card">`. Her CSS says `#card { padding: 1rem; }`. No card changes. What is wrong?

## Answers

1. Only the paragraphs inside the three cards. `.card p` means a `<p>` inside an element with the class `card`. The About paragraph and the footer sentence are not inside a card.
2. Every `<section>` on the page turns grey, because `section` is an element selector that matches all of them. To colour only the Projects section, use its id: `#projects`.
3. A class can appear on many elements, and an id should appear on only one. A rule that must style exactly one element can use its id, for example `#projects`. For anything that could be repeated later, a class is the safer choice.
4. Kofi's. The comma in `.nav, a` means "and", so it also matches every `<a>`, including the one in the Projects section. In Ada's rule the space means "inside", so only links in the navigation turn green.
5. `#card` is an id selector, but the HTML gives `card` as a class. A class needs a dot: `.card { padding: 1rem; }`.

## Recap

- You can write a class selector (`.card`), an id selector (`#projects`) and an element selector (`p`), and say which elements each matches. Names must match the HTML exactly.
- A space between two selectors means "inside" (`.nav a`), and a comma means "and" (`h2, h3`).
- Use a class for most styling and an id for the one element you also find from a link or from JavaScript.
- The Styles pane shows which selector styled the element you picked, and nothing from a selector that did not match.

Next: [The cascade and specificity](/learner/roadmap/css-responsive-ui/the-cascade-and-specificity)

---

### Lesson 3 — The cascade and specificity
<!-- slug: the-cascade-and-specificity -->

**By the end you can:**

- Predict which of two **conflicting** rules (two rules that set the same property on the same element) wins, using this order: the more **specific** selector first, then the later rule.
- Use the Styles pane to find a crossed-out line, which is a rule that was **overridden** (it lost), and name the rule that won.
- Fix an overridden rule by writing a more specific selector, without `!important`.
- List two properties that a child element **inherits** (receives from its parent) and one that it does not.

**Before you start:** Lessons 1 and 2 of this module. You can open the Styles pane (right-click, **Inspect**; Lesson 1, steps 9 to 11). Your `styles.css` has the rules you wrote there, including a `p` rule with a colour, a `.card` rule with a `lightyellow` background and a `#projects` rule with a `lightgray` background. In your `index.html`, the site name at the top is a `<p class="site-name">`, as in the HTML assignment. "Crossed out" in this lesson means a line drawn through a line of CSS in the Styles pane.

**Time:** ~35 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** the exact look of crossed-out lines in the Styles pane. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Sooner or later you will write a rule that is correct and the page ignores it. In the Styles pane your declaration is crossed out. That is not a bug in Chrome or in your file: another rule won. The browser has a fixed way to decide, and once you know it, you can predict the winner before you refresh instead of guessing.

## Conflicts and the cascade

A **conflict** happens when two rules set the same property on the same element, for example two different `color` values for one paragraph. The **cascade** is the set of tie-break rules the browser uses to pick one. The losing declaration is **overridden**, and the Styles pane draws a line through it.

The browser asks two questions, in this order:

1. Which selector is more **specific**? The more specific rule wins, wherever it sits in the file.
2. If both are equally specific, which rule comes **later** in the file? The later rule wins.

## Specificity

**Specificity** is a score for how precisely a selector points at an element. Count three things in the selector and compare the counts from left to right:

| Selector | ids | classes | elements |
|---|---|---|---|
| `p` | 0 | 0 | 1 |
| `footer p` | 0 | 0 | 2 |
| `.card p` | 0 | 1 | 1 |
| `#projects` | 1 | 0 | 0 |

A dot in front of a name makes it a class and a hash sign makes it an id (Lesson 2).

An id beats any number of classes, and a class beats any number of elements. So `.card p` beats `footer p`, because one class outweighs two elements. If the counts are equal, the later rule wins.

## Inheritance

Some properties pass from a parent element to its children. This is called **inheritance**. `color`, `font-family`, `font-size`, `line-height` and `font-style` are inherited: set them on `body` and everything inside uses them. Others, such as `background-color`, `border`, `margin` and `padding`, are not inherited. A rule written directly for an element always beats a value it only inherits.

## Worked example

You will cause three conflicts on purpose and watch the Styles pane. Do these steps on your computer.

1. In VS Code, open `styles.css`. Click at the end of the first line (the comment, which starts with `/*`), press Enter twice, and paste this rule. It goes **above** your `p` rule on purpose. Then save with Ctrl+S (Cmd+S on macOS).

   ```css
   .site-name {
     color: firebrick;
   }
   ```

   You should see: the new rule near the top of the file, above your `p` rule.

2. Predict first: the site name at the top is a `<p>`, so your `p` rule colours it, and it also has the class `site-name`. The `p` rule is **later** in the file. Which colour will the site name be? Decide before you go on.

3. Refresh Chrome (Ctrl+R, or Cmd+R on macOS).

   You should see: the site name in firebrick, even though the `p` rule is later. The class is more specific than the element.
   If you see something else: if the site name still has your `p` colour, check that the class in `index.html` is exactly `site-name` and that the rule is saved.

4. Right-click the site name, choose **Inspect**, and look at the Styles pane. The pane lists the rule that wins first, which is not always the rule that is first in your file.

   You should see: two rules for this element. `.site-name` is listed first, with `color: firebrick;`. Your `p` rule is listed below it, and its `color` line is crossed out.
   If you see something else: the Styles pane lists the strongest rule at the top. Scroll if the pane is short.

5. Now an equal fight. Paste this rule at the **end** of `styles.css` (Ctrl+End jumps there), below everything else, save, and refresh.

   ```css
   .card {
     background-color: lightgreen;
   }
   ```

   You should see: the cards are light green, not pale yellow. The two `.card` rules have the same specificity, so the later one wins. In the Styles pane for a card, the `lightyellow` line is crossed out.
   If you see something else: if the cards stay yellow, check that the new rule is below the old `.card` rule.

6. One more fight, with an id. Paste this rule at the end of the file, save and refresh:

   ```css
   section {
     background-color: lightblue;
   }
   ```

   You should see: the About and Interests sections turn light blue, but the Projects section stays grey, although the `section` rule is later. The id selector `#projects` beats the element selector `section`.
   If you see something else: if Projects also turned blue, check that your `#projects` rule from Lesson 2 is saved and spelled with a hash sign.

7. Clean up. Delete the last two rules you pasted (`.card` with `lightgreen`, and `section` with `lightblue`) and keep the `.site-name` rule. Save and refresh.

   You should see: the cards pale yellow again, the sections plain, and the site name still firebrick.

## Guided practice

Now inheritance. Add this rule at the end of `styles.css`, and replace `TODO` (the whole word) with a colour name such as `darkgreen`, `navy` or `darkslategray`. Save.

```css
body {
  color: TODO;
}
```

1. Predict first: you will open `contact.html`. It has a heading, three labels, a button and a footer sentence. Which of those will change colour? Decide before you refresh. (Hint: the heading, the footer sentence and the button each have a rule or a built-in colour of their own.)

2. Save, then open `contact.html` in Chrome (or refresh it if it is open).

   You should see: the three labels in your new colour. The heading stays dark blue (it has its own `h1` rule), the footer sentence keeps the colour of your `p` rule, and the Send button keeps its own built-in colours, because form buttons set their own. The labels have no rule of their own, so they inherit from `body`.
   If you see something else: if the labels did not change, check that you spelled the colour name correctly and saved the file.

3. Right-click a label and choose **Inspect**. Look at the Styles pane below the label's own rules.

   You should see: a heading such as "Inherited from body" with your `color` line under it. The pane may also show other "Inherited from" headings; look for the one that names `body`.
   If you see something else: if you do not see it, scroll down in the Styles pane.

## Your turn

**Goal:** make the sentence in the footer a different colour from the other paragraphs. You must not change the `p` rule, and you must not use `!important`. Write one new rule with a selector that is more specific than `p`.

**Check yourself:** save and refresh `index.html`. All of these should be true:

- [ ] The footer sentence has a colour that no other paragraph on the page has, and it is clear to read on the footer's background. A dark colour such as `darkslategray`, `navy` or `firebrick` is a safe choice on a light footer. Lesson 4 teaches how to measure it.
- [ ] Your `p` rule is unchanged, and the word `important` appears nowhere in your file.
- [ ] Your new rule's selector has two parts with a space between them.
- [ ] In the Styles pane for the footer sentence, your new rule is listed first, and the `color` line of the `p` rule is crossed out. (The `color` from `body` is crossed out too; that is correct.)

Keep `styles.css` as it is. Lesson 4 continues from it.

## Common mistakes

**1. My declaration is crossed out.**

- Symptom: you saved a rule, and the page ignores it. In the Styles pane your declaration has a line through it, and another rule from `styles.css` above it does not.
- Cause: another rule matches the same element and wins, either because its selector is more specific or because it has the same specificity and comes later.
- Fix: in the Styles pane, read the winning rule that is listed above yours. Make your selector more specific, for example `.card p` instead of `p`. If the two are equally specific, move your rule below the other one. This is normal: it is how CSS is meant to work.

**2. Moving a rule down does nothing.**

- Symptom: your rule is not winning, so you move it to the bottom of the file, and the page does not change. In the Styles pane your line is still crossed out.
- Cause: order only decides between rules of equal specificity. A less specific rule at the bottom still loses to a more specific rule above it.
- Fix: compare the two selectors by counting ids, classes and elements, as in the table above, and make yours at least as specific.

**3. `!important` as a quick fix.**

- Symptom: your rule finally wins, and it looks like this, but later you cannot override it anywhere:

  ```css
  p {
    color: firebrick !important;
  }
  ```

- Cause: `!important` beats every normal rule, including more specific ones. To override it you would need another `!important`, and soon every rule has one.
- Fix: delete `!important` and write a more specific selector instead. Treat `!important` as a last resort that this module never needs.

**4. A colour set on a parent does not reach a child.**

- Symptom: you set `color` on `body` and the paragraphs do not change.
- Cause: the `p` rule is written directly for the paragraphs, and a rule written for an element beats a value it only inherits.
- Fix: delete the `color` line from the `p` rule, or accept that paragraphs keep their own colour. Lesson 4 does this on purpose.

## Check your understanding

1. **(Predict)** The stylesheet has `p { color: navy; }` first and `.note { color: firebrick; }` after it. A paragraph has `class="note"`. What colour is its text? What if the two rules are written the other way round?
2. **(Predict)** `body { color: darkgreen; }` is set, and nothing else sets a colour for `<label>` elements. What colour is the text of a label, and why?
3. **(Spot the bug)** Mia adds `a { color: firebrick; }` at the very end of her stylesheet to make all links red, but the links in the navigation stay dark green. Her file also has `.nav a { color: darkgreen; }` higher up. Why, and what is one way to fix it?
4. **(Recall — Selectors: element, class and id)** Which symbol goes before a class name in a selector, and which before an id? Which of the two has more specificity?
5. **(Spot the bug)** Kofi's paragraph rule is crossed out in the Styles pane, and he adds `!important` to win. What is the problem with that, and what should he do instead?

## Answers

1. Firebrick, because a class is more specific than an element. The same if the rules are swapped: specificity decides first, and order only breaks a tie.
2. Dark green. `color` is inherited, so a label with no colour rule of its own uses the colour of its parent chain, which ends at `body`.
3. `.nav a` has one class and one element, which outweighs `a` with one element, wherever each sits in the file. One fix is to change the colour in the `.nav a` rule itself. Another is to write a second `.nav a { color: firebrick; }` below it, which has the same specificity and comes later.
4. A dot before a class and a hash sign before an id. An id has more specificity than a class.
5. `!important` beats every normal rule, so later he cannot override it without another `!important`. He should look at the winning rule in the Styles pane and write a selector that is more specific than it, such as `.card p` instead of `p`.

## Recap

- When two rules conflict, the browser picks the more specific selector first, then the later rule if they tie. The loser is crossed out in the Styles pane.
- Specificity is counted as ids, then classes, then elements: an id beats a class, and a class beats elements.
- Some properties (`color`, `font-family`, `font-size`, `line-height`) are inherited by children, and others (`background-color`, `border`) are not. A rule for the element itself beats an inherited value.
- To win a conflict, write a more specific selector. Avoid `!important`.

Next: [Colour and typography](/learner/roadmap/css-responsive-ui/colour-and-typography)

---

### Lesson 4 — Colour and typography
<!-- slug: colour-and-typography -->

**By the end you can:**

- Set the font, text size and line spacing of a whole page from one `body` rule.
- Say what **px** (a fixed pixel size), **rem** (a multiple of the base text size) and **%** (a share of the parent) mean, and choose one for a font size.
- Write a colour as a **hex value** (a `#` followed by six characters), such as `#1f2937`.
- Check the **contrast ratio** (a number that says how different two colours look in brightness) of text against its background in Chrome DevTools, and change a colour until the ratio is at least 4.5.

**Before you start:** Lessons 1 to 3 of this module, and how to open the Styles pane (right-click, **Inspect**; Lesson 1). Your `styles.css` has an `h1` rule, a `p` rule with a colour name, an `h2` rule, a `footer p` rule and a `body` rule with a colour from Lesson 3. Changes you make in DevTools disappear when you refresh, so every colour you choose must also be typed into `styles.css` in VS Code. If a rule for a selector already exists, edit it instead of writing a second copy.

**Time:** ~40 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** the colour picker and its "Contrast ratio" section in DevTools (Chrome's documentation describes them, but their exact look was not checked). If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

A page can be tidy and still be unreadable. Pale grey text on white looks elegant on a good monitor and disappears on a phone in sunlight. Readers also have tired eyes, small screens and different colour vision. This lesson gives you a number to check, so you do not have to trust your own eyes.

## Units: px, rem and %

A size in CSS needs a number and a **unit**. Three are enough for now:

- **px** (pixel) is a fixed size. `1px` is a very thin line, and `16px` is a size that is the same on every screen setting.
- **rem** is a multiple of the page's base text size. Browsers start at `16px`, so `1rem` is `16px` and `2rem` is `32px`. If a reader raises the text size in their browser settings, every `rem` grows with it.
- **%** is a share of something else. For a width it is a share of the parent's width.

A good habit: use `rem` for text sizes and spaces, `px` for thin lines such as borders, and `%` for widths that depend on the parent. A number without a unit, such as `font-size: 18`, is invalid, except for `line-height`, which takes a plain number.

## Colours as hex values

A colour name such as `navy` is clear to read, but there are only about 140. A **hex value** can show any colour. It is a hash sign and six characters from `0` to `9` and `a` to `f`, for example `#1f2937`. The characters are three pairs: red, green and blue. You do not need to work them out. DevTools has a colour picker that writes the value for you.

## Contrast

**Contrast ratio** is a number from 1 to 21 that says how different two colours look in brightness. `1` is the same colour and `21` is black on white. The accessibility guidelines for the web (WCAG, level AA) ask for at least **4.5** for ordinary text. Chrome DevTools can calculate it for you.

## Worked example

You will set the type for the whole page, then fail a contrast check on purpose and fix it. Do these steps on your computer.

1. In VS Code, open `styles.css`. Find the `body` rule from Lesson 3, the one with only a `color` line. Select the whole rule and replace it with this one.

   ```css
   body {
     font-family: system-ui, sans-serif;
     font-size: 1rem;
     line-height: 1.5;
     color: #1f2937;
     background-color: #ffffff;
   }
   ```

   `system-ui` is the font your computer uses for its own screens, and `sans-serif` is the fallback if it is missing. `line-height: 1.5` means each line has 1.5 times the height of the text.

   You should see: one `body` rule with five lines inside it.
   If you see something else: if your file has no `body` rule, paste this one at the end.

2. Make the headings bigger than the text. Find your `h1` rule and add the line `font-size: 2rem;` inside it. Find your `h2` rule from Lesson 1 and add the line `font-size: 1.5rem;` inside it. Then add a new rule for the card headings at the end of the file. Save with Ctrl+S (Cmd+S on macOS).

   ```css
   h3 {
     font-size: 1.25rem;
   }
   ```

   Your `h1` rule should now read like this (your colour may differ):

   ```css
   h1 {
     color: darkslateblue;
     text-align: center;
     font-size: 2rem;
   }
   ```

   You should see: `font-size` lines in your `h1` and `h2` rules, a new `h3` rule at the end, and no dot on the tab.

3. Refresh Chrome (Ctrl+R, or Cmd+R on macOS).

   You should see: the page in a clear modern font with roomier lines, and a main heading of 32 pixels (`2rem`). Headings are now clearly bigger than paragraphs.
   If you see something else: if nothing changed, check that you saved and that you are looking at the right tab, then read Common mistakes, numbers 1 and 2.

4. Now the contrast test. In your `p` rule, change the colour to a very light grey, so that the rule reads like this. Save and refresh.

   ```css
   p {
     color: #999999;
   }
   ```

   You should see: paragraph text in pale grey, hard to read.

5. Right-click a paragraph and choose **Inspect**. In the Styles pane, find your `p` rule. Click the small coloured square next to `#999999`.

   You should see: a small window with a colour palette and sliders. This is the **colour picker**. Look for a part called **Contrast ratio** and click it to expand it if it is closed.
   If you see something else: the contrast row appears only when the element you picked is text. Check that the line selected in the Elements panel is a `<p>` line.

6. Read the contrast ratio.

   You should see: the number **2.85** with a warning mark next to it. The ratio is for grey text on a white page. A number below 4.5 means the text fails the check.
   If you see something else: the exact wording differs between Chrome versions. Look for a number and a warning symbol.

7. Fix it. Close the picker (press Esc, or click elsewhere in DevTools). Then, in VS Code, change the colour in your `p` rule to `#1f2937`, save, and refresh. Check the ratio again with the picker.

   You should see: a ratio of **14.68** with a pass mark on both levels.

8. Delete the `color` line from the `p` rule. If that leaves the `p` rule empty, delete the whole rule; if the rule has other lines, keep them. Save and refresh.

   You should see: the paragraphs look exactly the same. They now inherit `#1f2937` from `body`, so the line is not needed. A rule for the element itself beats an inherited value, which is why the grey in step 4 showed up even though `body` had a dark colour. This is Lesson 3 at work.

## Guided practice

Now use hex colours for your headings and links, and check each one. These four colours all have a contrast ratio above 4.5 on a white page: `#1d4ed8` (blue, 6.70), `#b91c1c` (red, 6.47), `#0f766e` (teal, 5.47) and `#4b5563` (grey, 7.56).

```css
h2, h3 {
  color: TODO;
  font-style: italic;
}

.nav a {
  color: TODO;
}
```

1. In `styles.css`, change the first line of your `h2` rule from Lesson 1 to `h2, h3 {`, so that the card headings match. Keep its `font-size` line. Then set the colour of that rule to `#b91c1c`. In your `.nav a` rule, set the colour to `#1d4ed8`. Your separate `h3` rule from the worked example comes later in the file, so the card headings stay a little smaller. Save and refresh.

   You should see: headings in red, italic, and navigation links in blue.
   If you see something else: if a colour does not change, check for the hash sign and the semicolon, and read Common mistakes, number 1.

2. Check one link and one heading with the colour picker, as in steps 5 and 6 of the worked example.

   You should see: a ratio above 4.5 for each.

3. Check the footer. Right-click the footer sentence, choose **Inspect**, find your `footer p` rule in the Styles pane, and open the picker on its colour.

   You should see: a ratio that tells you whether the colour you chose in Lesson 3 is readable on the footer's background. If it is below 4.5, make the colour darker (or the footer background lighter) in `styles.css` until it passes. Then check the ratio again.

## Your turn

**Goal:** choose a colour scheme of your own for the whole site, and measure it.

1. Choose a light page colour for `body { background-color: ... }` (it can stay `#ffffff`), a dark text colour for `body { color: ... }`, a colour for headings and a colour for links. Use hex values. You can try colours in the picker (click the palette or drag the sliders), but remember that DevTools changes vanish when you refresh: copy the final hex value into `styles.css`.
2. For each of the three text colours (body text, headings, links), measure the contrast against the page colour. Change any colour that scores below 4.5.
3. At the top of `styles.css`, under the first comment, write the three ratios in one new comment with three lines. A comment starts with `/*` and ends with `*/`, for example:

   ```css
   /* text on page: 14.68
      headings on page: 6.70
      links on page: 6.70 */
   ```

   Use your own numbers. You will need them in the assignment.

**Check yourself:** save and refresh both pages. All of these should be true:

- [ ] The `body` rule sets `font-family`, `font-size`, `line-height`, `color` and `background-color`, all with valid values, and the text colours are typed in `styles.css`, not only in DevTools.
- [ ] Every text colour on `index.html` (paragraphs, headings, links, footer) has a contrast ratio of at least 4.5 against the colour behind it.
- [ ] Every font size in the file has a unit (`rem` or `px`), and there is no `font-size` with a bare number.
- [ ] The comment at the top of `styles.css` lists three ratios you measured, in your own numbers.
- [ ] `contact.html` uses the same fonts and colours as `index.html`.

Keep `styles.css` as it is. Lesson 5 continues from it.

## Common mistakes

**1. A hex colour without the hash sign.**

- Symptom: the colour does not change, and in the Styles pane the line is crossed out, usually with a warning triangle:

  ```css
  body {
    color: 1f2937;
  }
  ```

- Cause: a hex value must start with `#`. Chrome does not know `1f2937`, so it drops the line.
- Fix: write `#1f2937`. This is normal and quiet: there is no error message.

**2. A size without a unit.**

- Symptom: the text size does not change, and the Styles pane crosses out the line:

  ```css
  p {
    font-size: 18;
  }
  ```

  A space between number and unit, such as `1.5 rem`, fails in the same way.
- Cause: a size needs a unit, and the unit must follow the number with no space. Only `line-height` may be a plain number.
- Fix: write `18px` or `1.125rem`. Save and refresh.

**3. The text is hard to read, and Chrome reports no error.**

- Symptom: everything is valid and nothing is crossed out, yet some text is hard to read. For example, grey `#6b7280` on a light grey card `#f3f4f6`:

  ```css
  .card {
    background-color: #f3f4f6;
    color: #6b7280;
  }
  ```

- Cause: the contrast ratio is only 4.39, slightly under the 4.5 minimum. The same grey on white scores 4.83 and passes, so the background matters as much as the text.
- Fix: open the colour picker on the text, read the ratio, and darken the text or lighten the background until it is at least 4.5. This is normal: you cannot judge contrast by eye.

## Check your understanding

1. **(Predict)** The browser's base text size is `16px`. What size in pixels is `font-size: 2rem`? What size would it be if the reader changed their browser's base text size to `20px`?
2. **(Spot the bug)** Ada writes `p { font-size: 18; }` and the paragraphs stay the same size. What is wrong?
3. **(Recall — The cascade and specificity)** Your `body` rule sets `color: #1f2937;` and a `p` rule sets `color: #999999;`. What colour are the paragraphs, and why?
4. **(Predict)** The colour picker shows a contrast ratio of 4.39 for your card text. Does the text pass the 4.5 minimum? Name two changes that would raise the ratio.
5. **(Spot the bug)** Mia writes `color: 1d4ed8;` in her `.nav a` rule and the links stay the default blue. What is missing?

## Answers

1. `2rem` is 32 pixels, because `1rem` is the base size of 16 pixels. If the reader's base size is 20 pixels, the same `2rem` becomes 40 pixels. That is the reason to use `rem` for text.
2. The size has no unit. `18` alone is invalid, so Chrome drops the line. Write `18px` or `1.125rem`.
3. `#999999`. A rule written directly for an element beats a value the element only inherits, so the `p` rule wins over `body`. This is why you deleted the `p` rule in the worked example.
4. No: 4.39 is below 4.5. Darken the text colour, or lighten the card's background colour. Either change increases the difference in brightness.
5. The hash sign. A hex colour must start with `#`: `#1d4ed8`.

## Recap

- One `body` rule can set the font, text size, line height and text colour for the whole page, because those properties are inherited.
- `px` is fixed, `rem` is a multiple of the base text size (16 pixels by default), and `%` is a share of the parent. Use `rem` for text sizes and spaces. A size needs a unit.
- A hex colour is a `#` and six characters. Chrome's colour picker writes it for you.
- Contrast ratio is checked in the colour picker. Text needs at least 4.5 against the colour behind it, and a valid, uncrossed rule can still be unreadable.

Next: [The box model](/learner/roadmap/css-responsive-ui/the-box-model-selectors)

---

### Lesson 5 — The box model
<!-- slug: the-box-model-selectors -->

**By the end you can:**

- Name the four layers of a **box** (**content**, **padding**, **border** and **margin**) and point to each one on a card in DevTools.
- Predict an element's width in pixels with and without `box-sizing: border-box`, a setting that makes `width` include the padding and the border.
- Choose `px`, `rem` or `%` for a width or a space, and give a reason.
- Centre a column of text with `max-width` (the widest the element may be) and `margin: 0 auto`.

**Before you start:** Lessons 1 to 4 of this module, and how to open the Styles pane (right-click, **Inspect**; Lesson 1). Your `styles.css` has a `.card` rule with a background colour, a `body` rule, and the type rules from Lesson 4. Your cards are `<article class="card">` elements, as in the HTML assignment. If a rule for a selector already exists in your file (for example `main`), add the new lines to it instead of writing a second copy.

**Time:** ~40 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** where DevTools shows the size of an element (the box diagram on the Computed tab, and the size label when you point at a line in the Elements panel). If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

You set a card to 200 pixels wide, give it some padding and a border, and it ends up wider than 200. Then it sticks out of its section on a phone and the page scrolls sideways. Nearly every layout bug traces back to not knowing which box you are looking at, and how big it really is.

## The four layers

Every element is a rectangular **box**, made of four layers from the inside out:

1. **Content**: the text or image itself.
2. **Padding**: space between the content and the border, inside the box. The background colour fills it.
3. **Border**: a line around the padding.
4. **Margin**: space outside the border, between this box and its neighbours. It is always transparent.

```css
.card {
  padding: 1rem;
  border: 1px solid #9ca3af;
  margin-bottom: 1rem;
}
```

`border: 1px solid #9ca3af;` has three values: width, style and colour. `margin-bottom` sets only the bottom margin. A rule like `margin: 0 auto;` has two values: the first is top and bottom (`0`), the second is left and right (`auto`, which means "share the spare room equally").

## Choosing a unit

You met `px`, `rem` and `%` in Lesson 4. For boxes: use `rem` for padding, margin and `max-width`, because they then grow with the reader's text size and stay in proportion. Use `px` for thin lines such as a 1px border, which should stay thin. Use `%` when a width should be a share of its parent, such as half the column. `1rem` is 16 pixels when the reader has not changed their text size.

## How wide is a box?

By default, `width` sets only the **content**. The padding and the border are added on top. This is called `content-box`, and it surprises almost everyone. A card with `width: 200px`, `padding: 1rem` (16px each side) and `border: 1px` is 200 + 16 + 16 + 1 + 1 = **234px** wide.

`box-sizing: border-box` changes the rule: `width` then includes the padding and the border, so the card is **200px** wide, as you wrote. Nearly every real stylesheet switches this on for everything, and you will too.

## Worked example

You will measure a card, switch on `border-box`, and watch the width change. Do these steps on your computer.

1. In VS Code, open `styles.css` and find your `.card` rule. Add these three lines to it (`width`, `padding` and `border`), so that it reads like this (keep your own `background-color`, and any other lines you have):

   ```css
   .card {
     background-color: lightyellow;
     width: 200px;
     padding: 1rem;
     border: 1px solid #9ca3af;
   }
   ```

   You should see: the rule with four lines inside it, saved.

2. Predict first: how wide in pixels will one card be on the page? Work it out from "How wide is a box?" above, and decide before you go on.

3. Refresh Chrome. Right-click the edge of a card (inside its border, not the text) and choose **Inspect**. In the Elements panel, click the line that starts with `<article class="card">`, so that the card itself is selected, not the text in it. Open the **Computed** tab next to the Styles tab, and look at the diagram of nested boxes at the top.

   You should see: a diagram with the layers labelled margin, border, padding and content, and a number in each. The content number is 200, the padding 16 and the border 1. DevTools does not print the total, so add it yourself: 200 + 16 + 16 + 1 + 1 = 234. If you point at the `<article>` line in the Elements panel, Chrome also shows a small label with the size of the box.
   If you see something else: if the numbers are for a smaller box, you selected the text inside the card; click the `<article>` line. If you cannot find the Computed tab, widen DevTools, because tabs hide when the panel is narrow.

4. Now switch on `border-box` for every element. At the very top of `styles.css`, under the first comment, add this rule. Save and refresh.

   ```css
   * {
     box-sizing: border-box;
   }
   ```

   `*` is the **universal selector**: it matches every element.

   You should see: the cards are narrower, and the Computed diagram now shows 166 for the content, because the padding and the border now come out of the 200. The whole box is 200.
   If you see something else: if the card is still 234 wide, check that the rule is saved and that `box-sizing` is spelled with a hyphen.

5. Centre the column and give the header and footer some room. Add these rules at the end of `styles.css` (if you already have a `main`, `header` or `footer` rule, add the lines to it), save and refresh.

   ```css
   main {
     max-width: 45rem;
     margin: 0 auto;
     padding: 0 1rem;
   }

   header,
   footer {
     padding: 1rem;
   }
   ```

   You should see: on a wide window the text sits in a column in the middle of the page, with space on both sides, and the header and footer have room inside them. On a narrow window the column fills the width, with a small gap at the edges.
   If you see something else: if the column is not centred, make sure `margin: 0 auto;` is in the `main` rule and `max-width` has a unit.

6. Finally, add space between the cards. In the `.card` rule, delete the line `width: 200px;` and add the line `margin-bottom: 1rem;`. Save and refresh.

   ```css
   .card {
     background-color: lightyellow;
     padding: 1rem;
     border: 1px solid #9ca3af;
     margin-bottom: 1rem;
   }
   ```

   You should see: three full-width cards stacked in the column, with a gap between them.
   If you see something else: if the cards touch each other, the margin line is missing or misspelled.

## Guided practice

Try a width in percent. Add this line to your `.card` rule, replacing `TODO` with `50%`.

```css
width: TODO;
```

1. Predict first: the cards are inside a column that is about 700 pixels wide. How wide will a card be if its width is 50%? What happens to the card if you make the Chrome window narrower?

2. Save and refresh. Then drag the right edge of the Chrome window to make it narrower and wider. If the window fills the screen, first click the middle of the three buttons at the top right, which restores a smaller window.

   You should see: each card is half as wide as the column that holds it, and it stays half as wide as the column shrinks. A percent is a share of the parent, not a fixed size.
   If you see something else: if the cards do not change, check that the line is in the `.card` rule and not in another rule.

3. Delete the `width` line again. Save.

   You should see: the cards are full width again.

## Your turn

**Goal:** give the page breathing room using only margin and padding, and measure one box.

1. Add a rule so that each of the three `<section>` elements has a space of `2rem` below it (`margin-bottom`).
2. Make the navigation links easier to click. Write a rule for `.nav a` with `display: inline-block;` and `padding: 0.25rem 0.5rem;`. A link is an **inline** element: its top and bottom padding is drawn but does not make room. `inline-block` makes the padding count in all four directions. Remember that a pair of values means top and bottom first, then left and right.
3. In DevTools, select one `<section>` element (click its `<section>` line in the Elements panel) and read the margin numbers in the Computed diagram. Write what you read in a comment in `styles.css`. A comment starts with `/*` and ends with `*/`, for example `/* my section margin-bottom is N */`, with the real number in place of N.

**Check yourself:** save and refresh `index.html`. All of these should be true:

- [ ] `* { box-sizing: border-box; }` is in the file, and in step 4 the card measured 200 wide (not 234) with the same padding and border.
- [ ] The three sections have clear space between them, and the column is centred on a wide window.
- [ ] Each link in the navigation has space around its text, and the `.nav a` rule contains `display: inline-block`.
- [ ] Every width, padding and margin value in the file has a unit, except the zeros.
- [ ] The comment shows a number that matches the Computed diagram.

Keep `styles.css` as it is. Lesson 6 continues from it.

## Common mistakes

**1. The box is wider than I asked.**

- Symptom: you set `width: 200px` and the Computed diagram shows a larger box, or the box sticks out of its parent and the window gets a sideways scroll bar.
- Cause: without `box-sizing: border-box`, the padding and the border are added to the width.
- Fix: add `* { box-sizing: border-box; }` at the top of the stylesheet. This is normal. The browser's default is `content-box`, and most developers switch `border-box` on, on the first line of every project.

**2. Margin auto does not centre the column.**

- Symptom: you wrote `margin: 0 auto;` on `main` and the text still fills the whole window:

  ```css
  main {
    margin: 0 auto;
  }
  ```

- Cause: a block element is already as wide as its parent, so there is no spare room to share. `auto` needs a width or a `max-width` that is smaller than the parent.
- Fix: add `max-width: 45rem;` as well. Save and refresh.

**3. Padding and margin mixed up.**

- Symptom: you want the card's background to reach further from the text, and you add `margin`. The text does not move away from the edge of the colour, and the cards move apart instead.
- Cause: padding is inside the border, where the background shows. Margin is outside the border, and is always transparent.
- Fix: use `padding` for space inside a box, and `margin` for space between boxes.

**4. The two values are in the wrong order.**

- Symptom: `padding: 0.5rem 0.25rem;` gives links more space above and below than at the sides, and you wanted the opposite.
- Cause: with two values, the first is top and bottom, and the second is left and right.
- Fix: swap the values: `padding: 0.25rem 0.5rem;`.

## Check your understanding

1. **(Predict)** A card has `width: 300px; padding: 20px; border: 2px solid black;` and no `box-sizing` rule. How wide is the card on the page? What if `* { box-sizing: border-box; }` is added?
2. **(Spot the bug)** Kofi writes `main { margin: 0 auto; }` and the page text still starts at the left edge. What is missing?
3. **(Recall — Colour and typography)** You write `padding: 1rem` in one rule and `padding: 16px` in another. How many pixels is each, by default, and why might `rem` be better?
4. **(Predict)** A card has `width: 50%` inside a parent that is 600px wide, and `box-sizing: border-box`. How wide is the card? What happens when the parent shrinks to 400px?
5. **(Spot the bug)** Mia wants more space between her three cards. She adds `padding: 2rem;` to `.card`. The cards get taller and fatter, but they stay as close together as before. Which property should she use?

## Answers

1. Without the rule: 300 + 20 + 20 + 2 + 2 = 344px. With `border-box`: 300px, because the width includes padding and border.
2. A width or `max-width` smaller than the parent. A block element already fills its parent, so `auto` margins have no spare room to share. Add `max-width: 45rem;`.
3. Both are 16 pixels with the browser's default text size. `rem` is better because it grows when a reader raises their browser's text size, so spaces stay in proportion to the text. A `px` value stays fixed.
4. 300px (half of 600px). When the parent shrinks to 400px, the card shrinks to 200px: a percent is a share of the parent.
5. `margin`, such as `margin-bottom: 2rem;`. Padding is inside the border, so it makes each card bigger. Margin is the space between cards.

## Recap

- Every element is a box: content, padding, border and margin, from the inside out. Padding is inside the border and shows the background. Margin is outside and is transparent.
- By default, padding and border are added to `width`. `* { box-sizing: border-box; }` makes `width` include them, so a 200px card is 200px.
- `px` is fixed, `rem` follows the reader's text size, and `%` is a share of the parent. A column is centred with `max-width` and `margin: 0 auto`.
- DevTools' Computed tab draws the box and its numbers, so you can measure instead of guess.

Next: [Flexbox: the header and the navigation](/learner/roadmap/css-responsive-ui/flexbox-for-one-dimensional-layouts)

---

### Lesson 6 — Flexbox: the header and the navigation
<!-- slug: flexbox-for-one-dimensional-layouts -->

**By the end you can:**

- Turn an element into a **flex container** (a parent whose children are laid out in a row or a column) with `display: flex`, and say which elements become **flex items** (its direct children).
- Put the navigation links in a row with `gap` (space between items), and put the site name on the left and the links on the right.
- Predict what `flex-direction: column` does to `justify-content` and `align-items`.
- Fix a flex layout that does nothing, by finding which element holds the items.

**Before you start:** Lessons 1 to 5 of this module. You can open the Styles pane (right-click, **Inspect**; Lesson 1). Your `index.html` has a `<header>` that holds a `<p class="site-name">` and a `<nav class="nav">` with a list of links, as in the HTML assignment. Two rules can style the same element and their lines combine (Lesson 3), but if you already have a plain `header` rule, add new lines to it.

**Time:** ~35 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** the look of the Styles pane. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Your navigation is a bulleted list standing in a column, and the site name sits above it. Almost every website shows its name on the left and its links in a row on the right. Before Flexbox, lining things up in a row took tricks that nobody enjoyed. Now it takes a few lines.

## Flex containers and flex items

**Flexbox** is a way to lay out elements in one line, either a row or a column. You switch it on for a parent element with `display: flex`. That parent is the **flex container**. Its **direct children** become **flex items**, and only they. Grandchildren are not affected.

Look at your header: the `<header>` is the parent of the site name and the `<nav>`. The `<nav>` is the parent of the `<ul>`, and the `<ul>` is the parent of the `<li>` items. Each `display: flex` affects one level.

## The two axes

A flex container lays its items along a **main axis**. The default main axis is a row, left to right. The **cross axis** runs across it, top to bottom.

- `justify-content` places items along the **main** axis. `space-between` pushes the first item to one end and the last to the other.
- `align-items` places items along the **cross** axis. `center` lines them up in the middle.
- `gap` puts space between items, so you do not need margins.
- `flex-direction: column` turns the main axis downwards. The two properties do not change: `justify-content` still follows the main axis and `align-items` still follows the cross axis. But the main axis now points down, so they act in the other directions.

## Worked example

You will build the header row, then the link row. Do these steps on your computer.

1. Predict first: if you write `display: flex` on `header`, which elements become flex items: the `<p>` and the `<nav>`, the `<ul>`, or the `<li>` items? Decide before you go on. The answer is in step 3.

2. Open `styles.css`. Your `header, footer` rule from Lesson 5 can stay as it is. At the end of the file (Ctrl+End), add these two rules, then save.

   ```css
   header {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }

   .nav ul {
     display: flex;
     gap: 1rem;
     list-style: none;
     margin: 0;
     padding: 0;
   }
   ```

   `list-style: none` removes the bullets. `margin: 0` and `padding: 0` remove the space the browser gives a list.

   You should see: both rules saved at the end of the file.

3. Refresh Chrome (Ctrl+R, or Cmd+R on macOS).

   You should see: your name at the left of the header and your links ("Home" and "Contact" in the assignment) at the right, on one line, with a gap between them and no bullets. The `<p>` and the `<nav>` are the two flex items of the header. The `<ul>` is the flex container for the links.
   If you see something else: read Common mistakes. Check numbers 1 and 2 first.

4. Right-click the "Home" link and choose **Inspect**. In the Elements panel, click the `<header>` line. It is a few lines above the `<nav>` line; click the small triangles to open parts of the page if you cannot see it.

   You should see: in the Styles pane, your `header` rule with `display: flex`.
   If you see something else: if you only see rules for the link, you selected the link. Click the `<header>` line.

5. Now see the axes swap. In the `header` rule, add one line, save, and refresh.

   ```css
   flex-direction: column;
   ```

   You should see: the name sits above the links, and both are centred from left to right. The main axis is now vertical, so `align-items: center` centres the items horizontally.
   If you see something else: if nothing changes, check that the line is inside the `header` rule, between the braces.

6. Delete the `flex-direction` line. Save and refresh.

   You should see: the row layout again.

## Guided practice

Add a thin line under the header, and then switch one flex line off to see what it does.

```css
header {
  border-bottom: 1px solid TODO;
}
```

1. Predict first: when you switch off the `justify-content` line of your `header` rule in step 3 below, where will the name and the links go? Decide before you do it.

2. In your `header` rule (the one with `display: flex`), add a `border-bottom` line like the one above. Replace `TODO` with `#9ca3af`. Save and refresh.

   You should see: a thin grey line under the header.
   If you see something else: if the line is missing, check that the line is inside the `header` rule, between its braces.

3. In DevTools, select the `<header>` line, find the `justify-content` line in your `header` rule in the Styles pane, and switch it off with its checkbox (Lesson 1, step 11).

   You should see: the name and the links move next to each other at the left. Without `space-between`, flex items sit at the start of the main axis. Switch the line back on.

## Your turn

**Goal:** put the footer text in the middle of the footer. Use Flexbox, not `text-align`.

1. Write a rule for `footer` that makes it a flex container and centres its content along the main axis. Use `display: flex` and `justify-content: center`. Your `header, footer` rule can stay; the lines combine. If your file has `text-align: center` on the footer, delete it, so that Flexbox does the work.
2. Spread the links further apart: change the `gap` in your `.nav ul` rule to `2rem`, and look at the result.

**Check yourself:** save and refresh `index.html` and `contact.html`. All of these should be true:

- [ ] On both pages the site name is on the left and the links are in a row on the right, with no bullets.
- [ ] The `display: flex` of the links is on the `ul`, not on the `nav`.
- [ ] The footer sentence is in the middle of the footer, and your `footer` rule contains `display: flex`.
- [ ] In the Styles pane for the header, no line has a line drawn through it.

Keep `styles.css` as it is. Lesson 7 continues from it.

## Common mistakes

**1. Flex is switched on for the wrong element.**

- Symptom: you wrote `display: flex` and the links still stand in a column:

  ```css
  .nav {
    display: flex;
    gap: 1rem;
  }
  ```

- Cause: the direct child of `<nav class="nav">` is the `<ul>`, so the `ul` is its one flex item. The links are inside the `<ul>`, not directly inside the `<nav>`.
- Fix: put `display: flex` on the element that **directly contains** the things you want in a row. Here that is `.nav ul`. This is normal: it is the most common Flexbox mistake.

**2. `justify-content` does nothing.**

- Symptom: you wrote `justify-content: space-between` and the items do not move:

  ```css
  header {
    justify-content: space-between;
  }
  ```

- Cause: `justify-content` works only on a flex container, and this rule never says `display: flex`.
- Fix: add `display: flex;` to the same rule.

**3. Bullets or a left indent remain.**

- Symptom: the links are in a row, but each one has a dot in front of it and the first link is indented.
- Cause: the browser's built-in style gives a list bullets and padding.
- Fix: add `list-style: none;` and `padding: 0;` to the `.nav ul` rule (and `margin: 0;` if there is extra space above).

**4. `align-items` seems to do the wrong thing.**

- Symptom: after adding `flex-direction: column`, `align-items: center` centres the items left to right, not up and down.
- Cause: the axes swapped. `align-items` always works on the cross axis, and in a column the cross axis is horizontal.
- Fix: that is the correct behaviour. To centre vertically in a column, use `justify-content: center` and give the container some height, for example `min-height: 10rem;`.

## Check your understanding

1. **(Predict)** `header { display: flex; }` is the only flex rule in the stylesheet. Which elements become flex items, and do the `<li>` links go in a row?
2. **(Spot the bug)** Ada wrote `.nav { display: flex; }` and her links are still stacked. Which element should she use instead, and why?
3. **(Predict)** A flex container has `flex-direction: row; justify-content: space-between; align-items: center;` with two items. Where do the items go? What changes if `flex-direction` becomes `column`?
4. **(Recall — The cascade and specificity)** Your `header, footer` rule sets padding and your `header` rule sets `display: flex`. Both match the header. Is there a conflict, and which one wins?
5. **(Spot the bug)** Kofi's row of links has a bullet in front of each link. Which line of CSS fixes it, and on which selector?

## Answers

1. The `<p>` and the `<nav>`, the two direct children of the `<header>`. The `<li>` items are not flex items of the header, so they stay in a column until the `ul` becomes a flex container too.
2. The `<ul>` inside it: `.nav ul`. The direct child of the `<nav>` is the `ul`, so `.nav { display: flex; }` only makes the `ul` an item. The `li` elements are children of the `ul`.
3. In a row, the first item is at the left, the second at the right, both centred vertically. In a column, the main axis is vertical, so `space-between` spreads the items up and down (only visible if the container is tall) and `align-items: center` centres them left to right.
4. No conflict. They set different properties (`padding` and `display`), so both apply. A conflict needs the same property on the same element.
5. `list-style: none;` on the `ul`, for example in `.nav ul`.

## Recap

- `display: flex` turns an element into a flex container, and its direct children become flex items.
- `justify-content` works along the main axis, `align-items` along the cross axis, and `gap` adds space between items. `flex-direction: column` swaps the axes.
- The header holds two items (the name and the nav), and the `ul` holds the links, so there are two flex containers.
- When a flex layout does nothing, look for the element that directly contains the items.

Next: [Flexbox: a wrapping row of cards](/learner/roadmap/css-responsive-ui/wrapping-cards-with-flexbox)

---

### Lesson 7 — Flexbox: a wrapping row of cards
<!-- slug: wrapping-cards-with-flexbox -->

**By the end you can:**

- Turn the `.card-grid` into a row of cards that **wraps** (moves cards onto a new line when there is no room), using `flex-wrap` and `gap`.
- Say in one sentence each what **flex-grow**, **flex-shrink** and **flex-basis** do, and write them as `flex: 1 1 12rem`.
- Predict how many cards fit in a row at a given window width.
- Fix cards that squash, overflow or stay in a column.

**Before you start:** Lessons 5 and 6 of this module (the box model, flex container, flex items, `gap`). If a rule for `.card` or `.card-grid` already exists in your file, add the new lines to it instead of writing a second copy. Your `index.html` has a `<div class="card-grid">` that holds three `<article class="card">` elements, as in the HTML assignment.

**Time:** ~35 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** pressing the zoom keys in Chrome, and the look of the Styles pane. If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Three cards stacked in one tall column waste a wide screen. Three cards squeezed into one row become unreadable on a phone. You want a layout that decides by itself: three in a row when there is room, two when there is less, one on a small screen. Flexbox can do that with no extra code for each screen size.

## Wrapping

By default, a flex container keeps all its items on **one line**, and shrinks them to fit. `flex-wrap: wrap` lets items move onto a new line when they do not fit. Together with `gap` for the space between them, it gives a row that wraps.

## Grow, shrink and basis

Each flex item has three settings, and `flex` writes all three in one declaration.

- **`flex-basis`** is the size the item would like to be before anything is shared out. We use `12rem`, which is 12 × 16 = 192 pixels (Lesson 4).
- **`flex-grow`** says whether the item may become wider than its basis to use up spare room on its line. `1` means yes, and equal numbers share the room equally. `0` means no.
- **`flex-shrink`** says whether the item may become narrower than its basis when there is not enough room. `1` means yes.

So `flex: 1 1 12rem` reads: "grow if there is spare room, shrink if there is too little, and start from 12rem." A line holds as many items as fit at their basis, and the rest wrap.

## Worked example

You will switch on wrapping and then change the window width to watch the cards move. Do these steps on your computer.

1. Open `styles.css`. Find your `.card` rule. Delete its `margin-bottom` line (whatever value it has), because `gap` will space the cards. Keep your other lines and add `flex: 1 1 12rem;`, so that the rule reads like this (your background colour and other lines may differ):

   ```css
   .card {
     background-color: lightyellow;
     padding: 1rem;
     border: 1px solid #9ca3af;
     flex: 1 1 12rem;
   }
   ```

   You should see: the `.card` rule with `flex: 1 1 12rem;` and without a margin line.

2. At the end of the file add this rule (or add its lines to your `.card-grid` rule if you already have one). Save.

   ```css
   .card-grid {
     display: flex;
     flex-wrap: wrap;
     gap: 1rem;
   }
   ```

   You should see: both rules saved.

3. Predict first: your `main` is at most 45rem (720 pixels) wide with 16 pixels of padding on each side (Lesson 5), so the column on a wide window is about 690 pixels wide. Each card wants 192 pixels, and there is a 16-pixel gap between cards. How many cards fit in one row: one, two or three? Decide before you go on.

4. Refresh Chrome (Ctrl+R, or Cmd+R on macOS) with the window wide and the zoom at 100%.

   You should see: the three cards in one row, sharing the space equally. Three cards at 192 pixels plus two gaps is 608 pixels, which fits in 690.
   If you see something else: read Common mistakes. If the cards are still stacked, check number 2 first. If they are squeezed into one row, check number 1.

5. Make the page behave as if the window were narrower, using zoom. Click on the page, hold Ctrl and press the plus key (the key with `=` and `+`) until the address bar shows 200%. That is four presses. On macOS use Cmd and plus. (You can also drag the edge of the window, but Chrome will not go much narrower than about 500 pixels.)

   You should see: two cards in the first line, and the third card alone on the second line, as wide as the whole line. At 200% the window behaves like one half as wide.
   If you see something else: if nothing changes, click on the page first so that Chrome receives the keys.

6. Zoom further, to 300% (two more presses).

   You should see: all three cards stand in one column, the way they would on a phone. A card that is alone on its line is as wide as the line.

7. Reset the zoom: press Ctrl+0 (zero), or Cmd+0 on macOS.

   You should see: three cards in a row again.

## Guided practice

Change the size the cards want, and watch what happens to the count in a row. You will change the last value of the `flex` line in your `.card` rule: first to `16rem`, then to `9rem`.

1. Predict first: with a basis of `16rem` (256 pixels), how many cards fit in a 690-pixel column? With `9rem` (144 pixels)?

2. In the `.card` rule, change `12rem` to `16rem`. Save and refresh at 100% zoom.

   You should see: two cards on the first line and the third card alone on the second line, stretched to the full width of the column. The lonely card is wide because `flex-grow: 1` lets it use the spare room on its line.
   If you see something else: if you still see three in a row, check that you changed the number in the `.card` rule and saved.

3. Change the basis to `9rem` and refresh.

   You should see: three cards in one row at 100% zoom. At 250% zoom (a narrow window, about 410 pixels wide) you should see two per line, because 144 pixels is a small basis.

4. Put the basis back to `12rem`, save, and reset the zoom with Ctrl+0.

## Your turn

**Goal:** a card row that shows two cards per line on a normal window and one card per line on a phone, with no media query (you learn media queries in the next lesson).

1. Choose a basis, the last value in the `flex` line of your `.card` rule, so that at 100% zoom two cards fit in a 690-pixel column but three do not. Hint: any basis from `14rem` to `20rem` works, because three cards of 14rem need 3 × 224 + 32 = 704 pixels, which is more than 690, and two cards of 20rem need 2 × 320 + 16 = 656 pixels, which fits.
2. Check it at 100% zoom, and then at 300% zoom.

**Check yourself:** save and refresh. All of these should be true:

- [ ] At 100% zoom you see two cards in the first line and one in the second.
- [ ] At 300% zoom, the cards stand in one column.
- [ ] The spacing between cards comes from `gap`, and the `.card` rule has no `margin` line.
- [ ] Your `.card-grid` rule contains `display: flex` and `flex-wrap: wrap`.
- [ ] Your `.card` rule has a `flex` line whose last value has a unit.

Keep `styles.css` as it is. Lesson 8 continues from it.

## Common mistakes

**1. The cards squash into one narrow row.**

- Symptom: on a narrow window the three cards stay in one row and each becomes very thin, with the text broken into short lines.
- Cause: `flex-wrap: wrap` is missing. Without it, a flex container keeps everything on one line and shrinks the items.
- Fix: add `flex-wrap: wrap;` to the `.card-grid` rule.

**2. Flex is on the wrong element.**

- Symptom: you wrote the flex rules, and the cards still stand in a column:

  ```css
  .card {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 12rem;
  }
  ```

- Cause: the container must be the parent of the items. `display: flex` on `.card` makes each card a container for its own text, not a row of cards.
- Fix: put `display: flex` and `flex-wrap: wrap` on `.card-grid`, and keep `flex: 1 1 12rem` on `.card`.

**3. The last card is wider than the others.**

- Symptom: on a medium window, two cards share the first line and the third is stretched across the whole second line.
- Cause: `flex-grow: 1` lets every card use the spare room on its own line. The last line has only one card, so it takes all of it.
- Fix: this is normal and often looks fine. If you want equal cards, give `.card` a `max-width`, for example `max-width: 20rem;`, or use CSS Grid (an optional extra in the assignment).

**4. The gaps are too big.**

- Symptom: there is extra space under the cards, in addition to the `gap`.
- Cause: the `margin-bottom` line that you added to `.card` in Lesson 5 is still there, so the space is counted twice.
- Fix: delete `margin-bottom` from `.card` and let `gap` do the spacing.

## Check your understanding

1. **(Predict)** The container is 690 pixels wide, `gap` is 16 pixels, and each card has `flex: 1 1 12rem` (192 pixels). How many cards fit in one line? What if `flex: 1 1 16rem`?
2. **(Spot the bug)** Ada's cards shrink to thin strips on a phone instead of wrapping. Which line is missing, and in which rule?
3. **(Recall — Flexbox: the header and the navigation)** In your header, which element is the flex container and which are the flex items? What is the container of the nav links?
4. **(Predict)** The window is narrowed so that two cards fit per line, and there are three cards. What does the third card look like, and which setting causes it?
5. **(Spot the bug)** Kofi put `display: flex; flex-wrap: wrap;` in the `.card` rule and `flex: 1 1 12rem` in `.card-grid`. The cards stay stacked. What should he swap?

## Answers

1. Three: 3 × 192 + 2 × 16 = 608 pixels, which fits in 690. With 256 pixels (`16rem`), three need 800, which does not fit, so two fit and one wraps.
2. `flex-wrap: wrap;` in the `.card-grid` rule. Without it the items are kept on one line and shrunk.
3. The `<header>` is the flex container, and the `<p class="site-name">` and the `<nav>` are the flex items. The links are in the `<ul>`, so `.nav ul` is the container of the links.
4. It sits alone on the second line and is stretched across the whole line. `flex-grow: 1`, the first number in `flex: 1 1 12rem`, lets it use the spare room.
5. He should swap the declarations. `display: flex` and `flex-wrap: wrap` belong on the parent `.card-grid`, and `flex: 1 1 12rem` belongs on the children `.card`.

## Recap

- `display: flex` and `flex-wrap: wrap` on `.card-grid`, with `gap`, give a row of cards that wraps when it runs out of room.
- `flex: 1 1 12rem` means grow if there is spare room, shrink if there is too little, and start at 12rem. A line holds as many cards as fit at their basis.
- Use `gap` for space between flex items and do not add margins as well.
- A lone last card grows to fill its line. That is normal.

Next: [Mobile-first, media queries and reusable values](/learner/roadmap/css-responsive-ui/responsive-design-reusable-styling-habits)

---

### Lesson 8 — Mobile-first, media queries and reusable values
<!-- slug: responsive-design-reusable-styling-habits -->

**By the end you can:**

- Open Chrome's **device toolbar** (a mode that shows the page at a phone's width), set the width to 320 pixels, and find the element that makes a page scroll sideways.
- Make an image fit its column with `max-width: 100%` and `height: auto`.
- Write mobile styles first (**mobile-first**), then add a **media query** (a block of rules that applies only at certain widths) with `min-width`, which changes the header from a column to a row.
- Replace repeated spacing values with **custom properties** (names you invent for values), such as `var(--space-2)`.

**Before you start:** Lessons 1 to 7 of this module, and how to open the Styles pane (right-click, **Inspect**; Lesson 1). Your `<head>` has the line `<meta name="viewport" content="width=device-width, initial-scale=1">` from HTML Foundations, and your `index.html` has an image with `width="300"`. Your `styles.css` has a `header` rule with `display: flex` from Lesson 6, a `header, footer` rule with padding from Lesson 5, and `.card` and `.card-grid` rules from Lesson 7. If a rule for a selector already exists, edit it instead of writing a second copy.

**Time:** ~40 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule, every measurement at 320, 375, 640 and 768 pixels and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** the look of Chrome's device toolbar (Chrome's documentation names the **Toggle device toolbar** icon, the **Dimensions** menu and **Responsive**, but their exact look was not checked). If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

You built your site on a wide laptop screen. Most people who open it will use a phone, often a small one. If you design for the wide screen first and fix the phone afterwards, you fight your own CSS the whole way. In this lesson you check the narrowest case first, and you will find that your own picture, 300 pixels wide, does not fit on it.

## The viewport and the device toolbar

The **viewport** is the part of the window where the page is drawn. Your `<meta name="viewport">` line tells phones to use the real screen width instead of pretending to be 980 pixels wide. Chrome DevTools has a **device toolbar** that makes the page render at a phone's width, so you can test narrow screens on your computer. It is an approximation: it does not reproduce a real phone's address bar or touch screen. Lesson 10 shows you how to check on a real phone.

## Mobile first

**Mobile-first** means that your ordinary rules describe the small screen, and you add rules for bigger screens afterwards. A **media query** is a block that applies its rules only when a condition is true. A **breakpoint** is the width at which the layout changes.

```css
@media (min-width: 640px) {
  header {
    flex-direction: row;
  }
}
```

`min-width: 640px` means "when the viewport is at least 640 pixels wide". Everything inside the braces then applies, and rules outside it apply always. The breakpoint here is 640 pixels.

## Worked example

You will find the break, fix it, and restructure the header. Do these steps on your computer.

1. Open `index.html` in Chrome. Right-click the page and choose **Inspect**. In the action bar at the top of DevTools, click the **Toggle device toolbar** icon, which looks like a phone next to a tablet. Click it again later to turn the toolbar off.

   You should see: the page shrinks into a narrower frame, with a bar of size controls above it. The **Dimensions** menu in the bar shows **Responsive**.
   If you see something else: if you cannot find the icon, widen the DevTools panel, because icons hide when the panel is narrow.

2. In the bar, click the box with the width (the first number) and type `320`, then press Enter. Chrome also offers a preset called **Mobile S**, which is 320 pixels.

   You should see: the page at 320 pixels wide. 320 is about the narrowest phone you need to plan for.
   If you see something else: if the page looks tiny and zoomed out, your `<head>` is missing the viewport meta line. Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to `index.html` and `contact.html` and refresh. If the page is drawn small, check the zoom menu in the bar and choose 100%.

3. Look for the break. Scroll the framed page to the right with the mouse wheel while holding Shift, or drag the scroll bar at the bottom of the frame.

   You should see: the picture runs past the right edge, and the whole page scrolls sideways. The picture is 300 pixels wide, and the column at this width is about 270.
   If you see something else: if there is no sideways scrolling, your picture is smaller than 300 pixels. You can still do step 4: the rule does no harm.

4. Fix it. In `styles.css`, add this rule at the end (Ctrl+End), save, and refresh the page.

   ```css
   img {
     max-width: 100%;
     height: auto;
   }
   ```

   `max-width: 100%` stops the picture from being wider than the space it is in. `height: auto` keeps its proportions when it shrinks. The `width="300"` in the HTML still sets its normal size on wide screens.

   You should see: the picture now fits inside the column at 320 pixels, and the page no longer scrolls sideways.
   If you see something else: if it still overflows, check that the file is saved and that the rule says `img`.

5. Make the header mobile-first. Find your `header` rule from Lesson 6, the one with `display: flex`, `justify-content` and `align-items`, and replace the whole rule with these two blocks. If your rule also had other lines, such as `border-bottom`, keep those lines in the first block. Your `header, footer` rule stays. Save and refresh.

   ```css
   header {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
   }

   @media (min-width: 640px) {
     header {
       flex-direction: row;
       justify-content: space-between;
       align-items: center;
     }
   }
   ```

   You should see: at 320 pixels, the name sits above the links.
   If you see something else: if both widths look the same, check that the media query is outside the first block, with its own closing brace.

6. Click the width box again, type `700`, and press Enter.

   You should see: the name and the links side by side, with the name at the left and the links at the right. At 600 pixels you would still see them stacked, because the breakpoint is 640.
   If you see something else: if the header stays stacked at 700, read Common mistakes, number 3.

## Guided practice

Now name your spacing. A **custom property** is a name you invent for a value, so you write the value once. It starts with two hyphens, is defined inside `:root` (a selector that means the whole page), and is used with `var()`:

```css
:root {
  --space-1: TODO;
  --space-2: TODO;
  --space-3: TODO;
}
```

1. At the top of `styles.css`, under the first comment, add this block. Replace the three `TODO` words with `0.5rem`, `1rem` and `1.5rem`, in that order.

   You should see: the block saved, and the page looking the same as before.
   If you see something else: if the page changed, a value was mistyped; compare with the list above.

2. Predict first: after the replacements below, will the page look different? Decide, then do the replacements.

3. Replace these values, one by one. Save after the last one and refresh.

   | Rule | Replace | With |
   |---|---|---|
   | `.card` | `padding: 1rem;` | `padding: var(--space-2);` |
   | `.card-grid` | `gap: 1rem;` | `gap: var(--space-2);` |
   | `header, footer` | `padding: 1rem;` | `padding: var(--space-2);` |
   | `header` | `gap: 0.5rem;` (the line you typed in step 5) | `gap: var(--space-1);` |

   You should see: the page looks exactly the same, because the values are the same. If you now change `--space-2` to `1.5rem`, the cards, the gaps and the header all get roomier together. Change it back.
   If you see something else: if a gap or padding disappears, you misspelled a name. A `var()` with a name that does not exist makes the whole line invalid.

## Your turn

**Goal:** find one more problem at 320 pixels, and add a media query of your own.

1. In the device toolbar at 320 pixels, scroll through `index.html` and then `contact.html`. To find an element that sticks out, hover over lines in the Elements panel: Chrome colours the matching part of the page, and the one that reaches past the right edge is the one to fix. If nothing is broken, say so in a comment and carry on.
2. If you found something, fix it with a rule of your own. Use `var(--space-...)` where it fits.
3. At the end of `styles.css`, add a second media query of your own, for a width between `700px` and `900px`, that makes one thing bigger or roomier on wide screens, such as the `h1` font size or the `main` padding.
4. Turn the device toolbar off, and check that the page still looks right on your wide window.

**Check yourself:** all of these should be true:

- [ ] At 320, 375 and 700 pixels there is no sideways scrolling on either page.
- [ ] The header is a column at 320 and a row at 700, and the rules for the row are inside a `@media (min-width: ...)` block.
- [ ] The `img` rule has `max-width: 100%` and `height: auto`.
- [ ] `:root` defines three `--space-` names, and at least four places in the file use `var(--space-...)`.
- [ ] Your file has two `@media (min-width: ...)` blocks, and both sit below the rules they change.

Keep `styles.css` as it is. Lesson 9 continues from it.

## Common mistakes

**1. The page scrolls sideways on a phone.**

- Symptom: at 320 pixels the page can be dragged to the right, and something sticks out. Often it is the picture.
- Cause: an element is wider than the space it sits in. Your picture is 300 pixels wide, and a phone column can be narrower than that.
- Fix: add `img { max-width: 100%; height: auto; }`. To find any other element that sticks out, hover over lines in the Elements panel and look for the part that reaches past the right edge. This is normal on every site at first.

**2. The page is tiny and zoomed out on a phone.**

- Symptom: the page looks like a shrunken desktop page, and the text is too small to read.
- Cause: the viewport meta line is missing from the `<head>`, so phones pretend to be 980 pixels wide and your media queries do not apply.
- Fix: add `<meta name="viewport" content="width=device-width, initial-scale=1">` to each page's `<head>`.

**3. The media query does nothing.**

- Symptom: the header stays a column at 700 pixels, although you wrote a media query:

  ```css
  @media (min-width: 640px) {
    header {
      flex-direction: row;
    }
  }
  ```

- Cause: the rule in the query and the base `header` rule have the same priority (Lesson 3), so the one written later wins. If the base `header` rule is below the media query, it overrides the query.
- Fix: put the media query below the rules it changes. In the Styles pane, look for a crossed-out `flex-direction: row`.

**4. A custom property name does not match.**

- Symptom: a padding or gap vanishes after you change it to `var(--space-2)`. In the Styles pane the line is crossed out.

  ```css
  .card {
    padding: var(--space2);
  }
  ```

- Cause: `--space2` is not `--space-2`. A name that does not exist makes the whole line invalid, and Chrome gives no other message.
- Fix: compare the name letter by letter with the one in `:root`.

## Check your understanding

1. **(Predict)** The device toolbar is set to 600 pixels, and the stylesheet has `header { flex-direction: column; }` and `@media (min-width: 640px) { header { flex-direction: row; } }` below it. Is the header a column or a row? What about at 700?
2. **(Spot the bug)** Ada's picture has `width="300"` and spills out of the page on a 320-pixel phone. Which rule fixes it, and why is `height: auto` there?
3. **(Recall — The box model)** A card has `width: 100%` and `padding: 1rem`. With the default `box-sizing`, is the card wider than its parent? What changes with `* { box-sizing: border-box; }`?
4. **(Predict)** `:root` defines `--space-2: 1rem;`. You change it to `1.5rem`. What happens to a card whose padding is `var(--space-2)`, and what happens to one whose padding is the plain value `1rem`?
5. **(Spot the bug)** Kofi wrote `@media (max-width: 640px)` for his row layout, and the row appears on phones and disappears on laptops. What should he change?

## Answers

1. A column at 600, because the query needs at least 640 pixels. A row at 700.
2. `img { max-width: 100%; height: auto; }`. `max-width: 100%` stops the picture from being wider than its container, and `height: auto` keeps its proportions as it shrinks. The `width="300"` still gives it its normal size on a wide page.
3. With the default `content-box`, yes: the padding is added on top of 100%, so the card is 2rem (32 pixels) wider than its parent. With `border-box`, the padding is included in the 100%, so the card fits.
4. The card with `var(--space-2)` gets padding of `1.5rem`, because the value is read from one place. The card with the plain `1rem` is unchanged. That is why repeated values should be named.
5. He should use `min-width: 640px`. Mobile-first uses `min-width`: the small-screen rules are the default, and the query adds rules for wider screens. `max-width` does the opposite.

## Recap

- The device toolbar shows your page at a phone's width. Test 320 pixels first, because it is the narrowest case, and remember it is an approximation of a real phone.
- `img { max-width: 100%; height: auto; }` stops a picture from overflowing its column.
- Write the small-screen rules first, then add `@media (min-width: ...)` blocks for wider screens, below the rules they change.
- Custom properties (`--space-2`, used with `var()`) let you write a value once and reuse it.

Next: [Styling the form so everyone can use it](/learner/roadmap/css-responsive-ui/styling-the-form-accessibly)

---

### Lesson 9 — Styling the form so everyone can use it
<!-- slug: styling-the-form-accessibly -->

**By the end you can:**

- Style the labels, the text fields and the button of `contact.html` so they have clear spacing and a readable size.
- Give every link and form control a visible **focus ring** (the outline that shows which element the keyboard is on) with `:focus-visible`, without using `outline: none`.
- Press Tab through both pages and check that you can always see where the focus is.
- Check the contrast of the button text and of a field's border in DevTools.

**Before you start:** Lessons 1 to 8 of this module. Your `contact.html` has a form with three labelled boxes (a text box, an email box and a message box) and a Send button, as in the HTML assignment, with each label and box pair inside its own `<div>`. If your pairs are not in a `<div>`, the rule `form div` below matches nothing; write the same `margin-bottom` on `label` instead. Your `styles.css` has `* { box-sizing: border-box; }` from Lesson 5 and a `:root` block with the `--space-1`, `--space-2` and `--space-3` names from Lesson 8. If a rule for a selector already exists, add the lines to it.

**Time:** ~40 min

**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). Every rule and every "nothing changes" case below was run there. **Not yet run on a real Windows or macOS screen:** the look of the focus ring in Chrome on your computer, and Chrome's colour picker with its contrast section (the number may show as 6.7 instead of 6.70). If a step does not match your screen, message your mentor on WhatsApp and say which step number you are on.

## Why this matters

Some visitors never touch a mouse. They move through a page with the Tab key, and the only thing that tells them where they are is the **focus ring**: the outline that appears around the link or box they are on. Many sites remove it because it looks untidy, and the result is a page that people who rely on the keyboard cannot use. Your form should look good and stay usable.

## Form controls need their own rules

Form controls, such as `<input>`, `<textarea>` and `<button>`, do not inherit your font the way paragraphs do. The browser gives them its own small font and its own sizes. A rule like `font: inherit` tells them to use the page's font. You also give each field a width, some padding and a border, and a button some padding and a colour.

## Focus and `:focus-visible`

An element has **focus** when it is the one that receives the keyboard. Pressing Tab moves focus to the next link, field or button. The browser already draws a focus ring, but you may want a stronger one that matches your colours.

`:focus-visible` is a **pseudo-class**: a keyword after a selector that matches an element in a particular state. `a:focus-visible` matches a link that has focus when the browser decides the ring should be visible, which is mostly when someone uses the keyboard (Chrome also shows it when you click into a text box). Never write `outline: none` on a focused element unless you replace it with something that is at least as clear. In a list of selectors separated by commas, one misspelled selector makes the whole rule invalid, so check each one letter by letter.

## Worked example

You will style the form, then tab through the page. Do these steps on your computer.

1. In `styles.css`, add these rules at the end of the file. Replace nothing: they are new. Save.

   ```css
   form div {
     margin-bottom: var(--space-2);
   }

   label {
     display: block;
     margin-bottom: var(--space-1);
     font-weight: bold;
   }

   input,
   textarea {
     width: 100%;
     max-width: 30rem;
     padding: var(--space-1);
     border: 1px solid #6b7280;
     font: inherit;
   }

   button {
     padding: var(--space-1) var(--space-3);
     border: 0;
     background-color: #1d4ed8;
     color: #ffffff;
     font: inherit;
     cursor: pointer;
   }
   ```

   `display: block` makes each label sit above its box. `cursor: pointer` shows the hand pointer over the button.

   You should see: the rules at the end of the file, and no dot on the tab after you save.

2. Open `contact.html` in Chrome and refresh (Ctrl+R, or Cmd+R on macOS).

   You should see: each label above its box, bold, with space between the groups. The boxes are as wide as the page allows, up to 30rem (480 pixels), and the text you type is in the same font as the page. The button is blue with white text.
   If you see something else: if the labels are still beside the boxes, check `display: block`. If the groups are not spaced, see "Before you start" about the `<div>`.

3. Check the button's contrast. Right-click the Send button, choose **Inspect**, find the `color: #ffffff` line in your `button` rule in the Styles pane, and click the small coloured square next to it. Expand **Contrast ratio** if it is closed.

   You should see: a ratio of about **6.70** (Chrome may write 6.7), with a pass mark for the level we need, called AA. A cross next to a higher level (AAA, which needs 7) does not matter here.
   If you see something else: if the ratio is missing, click the `<button>` line in the Elements panel and try again. If a ratio is ever below 4.5, darken the background or lighten the text in `styles.css` until it passes (Lesson 4).

4. Add the hover and focus rules at the end of the file. Save.

   ```css
   button:hover {
     background-color: #1e3a8a;
   }

   a:focus-visible,
   input:focus-visible,
   textarea:focus-visible,
   button:focus-visible {
     outline: 3px solid #b45309;
     outline-offset: 2px;
   }
   ```

   `outline-offset: 2px` leaves a small gap between the ring and the element, so the ring does not melt into the button.

   You should see: the rules saved. Pointing at the button turns it a darker blue.

5. Now the keyboard test. Reload `contact.html`, then press **Tab** repeatedly without clicking anything, and watch the screen.

   You should see: an amber ring that moves from one thing to the next: first the links in the header (and the site name, if it is a link), then the first box, the second, the third and the Send button. Press **Shift+Tab** to go back one step.
   If you see something else: if you cannot see any ring on some element, read Common mistakes, number 1.

6. Try the same on `index.html`.

   You should see: the ring goes through the navigation links and then through any other links on the page, such as the one in the Projects section. Every stop is clearly visible.

## Guided practice

Make the Send button look different when it is **disabled**. A disabled button is switched off. In a later module, JavaScript will disable it while a message is being sent. Use a grey with a good contrast against white text. Replace `TODO` with `#6b7280`.

```css
button:disabled {
  background-color: TODO;
  cursor: not-allowed;
}
```

1. Predict first: the white text on `#6b7280` has a contrast ratio of 4.83. Does it pass the 4.5 minimum? Decide before you go on.

2. Add the rule at the end of `styles.css` and save. Then, in `contact.html`, add the word `disabled` inside the opening tag of your button, so that it looks like `<button type="submit" disabled>`. Keep the rest of your button as it is. Save and refresh.

   You should see: a grey button. The mouse pointer shows a "not allowed" sign over it, and pressing Tab skips the button. White on `#6b7280` is 4.83, so it passes.
   If you see something else: if it is still blue, check that `disabled` is inside the opening tag.

3. Remove the word `disabled` from the HTML again. Save.

## Your turn

**Goal:** make the form yours, and check it by keyboard.

1. Change the button colour and the focus ring colour to colours of your own. The button's text and background must have a contrast ratio of at least 4.5. A focus ring colour needs a ratio of at least 3 against the page. To measure a colour that is not text, use this trick in DevTools only: select a paragraph, type your ring colour as its `color` in the Styles pane, open the picker on it and read the ratio. The change vanishes when you refresh, which is what you want.
2. Make the box you are typing in look different. Add a new rule at the end of `styles.css`: `input:focus-visible, textarea:focus-visible { background-color: #fef3c7; }`, or a pale colour of your own. Check that the text you type is still readable on it (the dark text colour `#1f2937` on `#fef3c7` is clear to read).
3. Tab through `contact.html` without clicking first, and count the presses it takes to reach the Send button. Write the number in a comment in `styles.css`. A comment starts with `/*` and ends with `*/`, for example `/* Tab presses to reach Send: N */`, with your own number in place of N.

**Check yourself:** all of these should be true:

- [ ] Each label sits above its box, and the boxes use the same font as the page.
- [ ] Pressing Tab shows a visible ring on every link, every box and the button, on both pages.
- [ ] The word `outline` appears in your file only with a visible style (a colour and a width), never as `outline: none`.
- [ ] The button's text has a contrast ratio of at least 4.5 against its background (read it in the colour picker).
- [ ] You measured your box border colour with the trick in step 1, and the ratio is at least 3.
- [ ] The comment in `styles.css` has your own Tab count.

Keep `styles.css` as it is. Lesson 10 publishes the result.

## Common mistakes

**1. I cannot see where the focus is.**

- Symptom: you press Tab and the page does not show where you are. A rule like this is in the file:

  ```css
  input:focus {
    outline: none;
  }
  ```

- Cause: `outline: none` removes the focus ring. A person using the keyboard no longer sees where they are. This rule has the same specificity as `input:focus-visible` (Lesson 3), so if it is written below your ring rule, it wins. A plain `input { outline: none; }` also removes the browser's own ring when you have no ring rule of your own.
- Fix: delete the line, or replace it with a visible `:focus-visible` rule as in step 4. This is normal: it is a common mistake on real websites.

**2. One bad selector breaks the whole rule.**

- Symptom: your focus ring rule has no effect on any element. In the Styles pane for a link, the rule is not listed:

  ```css
  a:focus-visibel,
  input:focus-visible,
  button:focus-visible {
    outline: 3px solid #b45309;
  }
  ```

- Cause: in a list of selectors, one that Chrome does not know makes the whole rule invalid, so even the correct selectors are dropped.
- Fix: check every selector in the list letter by letter: `:focus-visible`. Save and refresh.

**3. The box text is in a different font.**

- Symptom: your page uses one font, and the text you type in the boxes looks different and smaller.
- Cause: form controls do not inherit the page's font by default.
- Fix: add `font: inherit;` to the `input`, `textarea` and `button` rules.

**4. The box is wider than its column.**

- Symptom: on a phone, or in a narrow window, a box sticks out of the page at the right edge.
- Cause: the box has a width plus padding and a border, and `box-sizing: border-box` is missing, so the extra is added on top.
- Fix: check that `* { box-sizing: border-box; }` is still at the top of your file. Then the `width: 100%` includes the padding and border.

## Check your understanding

1. **(Predict)** A visitor presses Tab on `contact.html` with your finished stylesheet. In what order does the focus move, and what do they see at each stop? (Use your own page: how many links are in the header?)
2. **(Spot the bug)** Ada has no focus rule of her own. She adds `button { outline: none; }` because the browser's ring looked ugly on her button. What problem does this cause, and what should she do?
3. **(Recall — Colour and typography)** The button text is `#ffffff` on `#1d4ed8`. What does the colour picker show, and does it meet the 4.5 minimum? What would you do if it showed 3.2?
4. **(Predict)** The rule `a:focus-visible, input:focus-visibel { outline: 3px solid #b45309; }` has a spelling mistake in its second selector. Do links get the ring?
5. **(Spot the bug)** Mia's text boxes use a tiny font that does not match the page. Which declaration is missing from her `input` rule?

## Answers

1. First the links in the header (for example Home, then Contact), then the three boxes in order, then the Send button. At each stop an amber ring (3 pixels wide) appears around the element.
2. Keyboard users cannot see where the focus is. She should delete `outline: none` and keep a visible `:focus-visible` ring, or change the ring's colour to fit her design.
3. 6.70, which passes. If it showed 3.2, the button would fail: she should darken the background or change the text colour until the ratio is at least 4.5.
4. No. In a selector list, one selector that Chrome does not understand invalidates the whole rule, so the correct `a:focus-visible` is dropped too.
5. `font: inherit;`. Without it, form controls use the browser's own font.

## Recap

- Style form controls with explicit rules: labels above boxes, `width` with `max-width`, `padding`, a `border` and `font: inherit`.
- `:focus-visible` draws a ring when the keyboard is used. Never remove the outline without a clear replacement.
- Press Tab and Shift+Tab to test the order and the ring on every page. Check contrast of button text and of borders in the colour picker.
- A misspelled selector inside a list drops the whole rule.

Next: [Publishing your site with GitHub Pages](/learner/roadmap/css-responsive-ui/publishing-with-github-pages)

---

### Lesson 10 — Publishing your site with GitHub Pages
<!-- slug: publishing-with-github-pages -->

**By the end you can:**

- Upload your changed files to your `my-site` repository on GitHub and turn on **GitHub Pages** (a free service that turns a repository into a website) for it.
- Open your live site in a private window and on your phone, and check that the styles and the picture load.
- Change a file, upload it, wait, and see the change on the live site, using a **hard refresh** (reloading without Chrome's stored copy) when the old version shows.
- Say why a site with lowercase file names and **relative** links (written from the file's own folder, like `images/photo.jpg`) works online, and one with capital letters or `C:\` paths does not.

**Before you start:** Lessons 1 to 9 of this module, and the HTML Foundations lesson "Putting your site on GitHub". You have a GitHub account and a **public** repository named `my-site` with `index.html`, `contact.html`, `styles.css` and an `images` folder at its top level.

**Time:** ~35 min

**Last verified:** 2026-10-29. The steps follow GitHub's own documentation page "Configuring a publishing source for your GitHub Pages site", read on that date; the 10-minute delay and the rule that a Free account needs a public repository are quoted from it. The relative-path claims were tested on a local web server. **Not yet run on a real Windows or macOS computer, and not checked on GitHub's screens:** the exact look of Settings and Pages, what is shown while the site is publishing, and the text of GitHub's "404" page. If a name below does not match your screen, look for the same idea, or message your mentor on WhatsApp and say which step number you are on.

## Why this matters

So far only you and your mentor can see your site, and only if your mentor opens your files. A live address works on any phone, with no files to download. It is also the only way your next assignments can ask for a "deployed URL". GitHub offers a free service for this, called GitHub Pages, and your files are already on GitHub.

## What GitHub Pages is

**GitHub Pages** is a free service that turns the files in a repository into a website that anyone can open with a link. You choose which **branch** of the repository to publish: the `main` branch is the one your uploaded files are on. GitHub shows your site at `https://` followed by your username, `.github.io/` and the repository name, with a slash at the end. It looks for a file named `index.html` at the top of the repository.

**Before you publish, think about what you put on the internet.** A public site can be found by search engines and read by anyone. Use your first name or a nickname, and leave out your phone number, your home address, your school or workplace, and photos of other people. If you want the site taken down later, tell your mentor, or delete the repository, which removes the site.

## Paths that work online

A live site lives in a subfolder of GitHub's domain, so your links must be **relative** and your file names must match exactly. Compare:

```html
<!-- works online -->
<img src="images/my-photo.jpg" alt="A blue circle on a yellow square">
<a href="contact.html">Contact</a>

<!-- breaks online -->
<img src="/images/my-photo.jpg" alt="A blue circle on a yellow square">
<img src="C:\Users\Ada\Documents\my-site\images\my-photo.jpg" alt="A blue circle on a yellow square">
<img src="Images/My-Photo.JPG" alt="A blue circle on a yellow square">
<a href="/contact.html">Contact</a>
```

A path that starts with `/` points at the top of the whole domain, not at your project. A path that starts with `C:\` points at your own computer. Capital letters count online, so `Images/My-Photo.JPG` is a different file from `images/my-photo.jpg`.

## Worked example

Do these steps on your computer.

1. Check your files before you publish. In VS Code, press Ctrl+Shift+F (Cmd+Shift+F on macOS), which searches every file. Search for `href="/` and then `src="/` and then `C:`. Look at the file names in your `images` folder and in your HTML: they should be lowercase with no spaces.

   You should see: no results for the three searches.
   If you see something else: change each path that starts with `/` or `C:` to a relative one, as in the examples above, and rename any file with capitals or spaces, in the folder and in the HTML. Save.

2. Read your two pages once as a stranger would. Check that there is no phone number, home address, school or workplace, and no photo of someone who has not agreed.

   You should see: only things you are happy to have on the internet.
   If you see something else: delete them, save, and read again.

3. Upload every file you changed since your last upload: `styles.css`, `index.html` and `contact.html`, and any new picture. In Chrome, go to your `my-site` repository on GitHub. Click **Add file**, then **Upload files**. In VS Code, right-click `styles.css` in the Explorer on the left and choose **Reveal in File Explorer** (**Reveal in Finder** on macOS). Put the File Explorer window and the Chrome window side by side, and drag the files onto the large area on the GitHub page that says to drag files there. If dragging does not work, click the link on that area for choosing your files. A new picture goes inside the `images` folder: drag the `images` folder itself. Uploading a file with the same name replaces the old one.

   You should see: the file names listed under the large area.
   If you see something else: if an error appears, check that the names are exactly `styles.css`, `index.html` and `contact.html`.

4. Scroll down. In the box for the change, type a short message such as `Add styles`. Leave the choice to commit to the `main` branch as it is, and click **Commit changes**.

   You should see: the repository page again, with your message next to the three files.
   If you see something else: if the repository still looks as before, you did not click the button. Go back and click **Commit changes**.

5. Open the repository's **Settings**. It is a tab in the row above the file list, with a gear icon. If you cannot see it, open the **More** menu (three dots) in that row first.

   You should see: a page with a menu down the left.
   If you see something else: if you cannot find Settings, you may not be signed in as the owner of the repository. Sign in and try again.

6. In the menu on the left, click **Pages**. It is in the section called "Code, planning, and automation".

   You should see: a page with the title **GitHub Pages** and a section called **Build and deployment**.
   If you see something else: if you cannot see Pages, scroll the menu down.

7. Under **Build and deployment**, under **Source**, choose **Deploy from a branch** from the drop-down menu.

   You should see: two drop-down menus appear below, one for the branch and one for the folder.
   If you see something else: if you see only a message about an upgrade, the repository may be private. Free accounts need a public repository for Pages. Make it public: in Settings, on the General page, scroll to the bottom to the section called Danger Zone, choose **Change visibility**, and follow the screens (GitHub asks you to type the repository name to confirm). Do this only after step 2. Then try again.

8. In the branch menu (which may say **None** at first) choose `main`. In the folder menu leave **/(root)**. Click **Save**.

   You should see: the page reloads or shows a message that your site is being published.
   If you see something else: if there is no `main` in the menu, upload your files first (steps 1 and 2).

9. Wait. GitHub says it can take up to 10 minutes for a change to your site to publish. Every few minutes, reload the Pages settings page.

   You should see: your site's address and a **Visit site** button once it is ready. While it is publishing, GitHub may show a message that the site is being built; that is normal.
   If you see something else: if it is still not ready after 10 minutes, read Common mistakes, number 1.

10. Click **Visit site**, or copy the address, and open it in a private window in Chrome (Ctrl+Shift+N on Windows, Cmd+Shift+N on macOS).

    You should see: your styled home page with its picture. The address starts with `https://` and ends with `.github.io/my-site/`.
    If you see something else: if the page loads without styles, or the picture is missing, read Common mistakes, numbers 2 and 3.

11. Open the same address on your phone. Send the address to yourself in a WhatsApp or email message and tap it.

    You should see: your site at phone width, with the header in a column and the cards in one column.
    If you see something else: if the phone shows an old version, read Common mistakes, number 4.

## Guided practice

Change something, publish it, and see it arrive. You will meet the delay and the hard refresh on purpose.

1. In `styles.css`, change the colour of your main heading (the `h1` rule) to a different colour, and check in the colour picker (Lesson 4) that the contrast ratio is at least 4.5. If your `h1` colour is a variable such as `var(--color-heading)`, change the variable instead. Save, and check it in Chrome on your computer.

   You should see: the new colour on your own copy.

2. Upload `styles.css` to the repository again: **Add file**, then **Upload files**, drag the file, and **Commit changes**, as in steps 3 and 4.

   You should see: your message next to `styles.css` on the repository page.

3. Predict first: you open the live address right now. Will you see the new colour? Decide before you try.

4. Open the live address and refresh normally.

   You should see: probably the old colour. GitHub needs a minute or more to publish a change, and Chrome may also show a stored copy. This delay is normal.
   If you see something else: if you see the new colour already, GitHub was quick. Go on to step 5 anyway, so that you practise the hard refresh.

5. Do not skip this step, even if you saw the new colour in step 4. Wait two minutes, then do a **hard refresh** of the live page: press Ctrl+Shift+R on Windows, Cmd+Shift+R on macOS.

   You should see: the new colour.
   If you see something else: wait five more minutes and try the hard refresh again. If the old colour is still there after 10 minutes, read Common mistakes, number 4.

6. Change the colour back if you like, upload again, and wait.

## Your turn

**Goal:** see your site the way a stranger and a phone see it.

1. Open the live address in a private window and in your phone's browser.
2. In the private window, click every link and look at every page. On the phone, turn it to landscape (lying down) and back, and check that nothing breaks.
3. Copy the live address and keep it in a note on your phone or computer. You will submit it in the assignment.

**Check yourself:** all of these should be true:

- [ ] The live address opens in a private window without signing in, and shows your styled page and your picture.
- [ ] The contact page opens from the navigation link, with its styled form.
- [ ] The site works on your phone, with no sideways scrolling.
- [ ] You have changed a file, uploaded it, waited, and seen the change on the live site.
- [ ] Nothing on the site is private: no phone number, address or photo of someone who has not agreed.

## Common mistakes

**1. The page says there is no site yet.**

- Symptom: you open your address and GitHub shows a page that says the site cannot be found (a "404" page):

  ```text
  404
  There isn't a GitHub Pages site here.
  ```

- Cause: the site has not been published yet, or Pages is pointed at a branch with no files, or the repository is private.
- Fix: wait up to 10 minutes. Then check Settings, then Pages: the source is **Deploy from a branch**, the branch is `main` with **/(root)**, and the repository is public. This is normal in the first minutes.

**2. The page loads, but it has no styles.**

- Symptom: the live page is plain black and white, although it looks fine on your computer.
- Cause: `styles.css` was not uploaded, or the `<link>` points at a different name. On GitHub, file names must match exactly, capital letters included. Your own computer ignores upper and lower case, GitHub does not: `Styles.css` and `styles.css` are different files there.
- Fix: open your repository and check that `styles.css` is in the top level with that exact name. Check the `href` in both pages, upload the fixed file, wait, and hard refresh.

**3. The picture is missing.**

- Symptom: the live page shows a small broken-picture icon where your photo should be.
- Cause: the file name in the HTML does not match the name in the `images` folder letter by letter, or the path starts with a slash or with `C:\`. A path such as `/images/photo.jpg` points at the top of the whole domain, not your project, and `C:\Users\...` points at your own computer. Your project lives under `/my-site/`, so only a relative path like `images/photo.jpg` works.
- Fix: use lowercase names and a relative `src` such as `images/my-photo.jpg`. Upload both the fixed HTML and the image.

**4. I changed a file and the live site still shows the old one.**

- Symptom: you uploaded a new `styles.css` and the live page looks the same, even after a refresh.
- Cause: GitHub takes a minute or more to publish (up to 10), and Chrome may show a stored copy of the old file.
- Fix: wait a couple of minutes, then do a hard refresh with Ctrl+Shift+R (Cmd+Shift+R on macOS). If the old version is still there after 10 minutes, click the file in your repository on GitHub and check that its code shows your latest change and a recent time. This is normal for every site, and it is why developers say "wait and hard refresh".

## Check your understanding

1. **(Predict)** You edit `styles.css`, upload it and open the live address a few seconds later. What do you probably see, and what are the two things you can do?
2. **(Spot the bug)** Ada's site works on her laptop but the live page has no picture. Her HTML says `src="Images/Photo.JPG"` and the folder on GitHub is `images` with a file `photo.jpg`. Why does it work on her laptop and not online?
3. **(Recall — Mobile-first, media queries and reusable values)** Your live site on a phone looks like a shrunken desktop page. Which line in the `<head>` is probably missing?
4. **(Predict)** Your site's address is `https://yourname.github.io/my-site/`. A link in your HTML says `href="/contact.html"`. Where does it point, and does it work? (See "Paths that work online".)
5. **(Spot the bug)** Kofi sets Pages to publish from `main`, but the repository is private and he is on a Free account. What does he see, and what should he do?

## Answers

1. Probably the old version: GitHub needs a minute or more to publish, and Chrome may show a stored copy. Wait a few minutes, then do a hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on macOS).
2. Windows ignores upper and lower case in file names, but GitHub Pages does not. `Images/Photo.JPG` is not `images/photo.jpg` there. Use lowercase everywhere.
3. The viewport line: `<meta name="viewport" content="width=device-width, initial-scale=1">`. Without it, phones pretend to be about 980 pixels wide.
4. It points at `https://yourname.github.io/contact.html`, the top of the whole domain, not your project, so it fails. A relative link, `href="contact.html"`, works because it stays inside `/my-site/`.
5. He cannot publish: GitHub says a Free account needs a public repository for Pages. He should make the repository public in its settings, after checking that nothing private is in it, and try again.

## Recap

- GitHub Pages turns a repository into a website. Choose **Deploy from a branch**, the `main` branch and **/(root)**, then **Save**. The address ends in `.github.io/my-site/`.
- Publishing takes a minute or more (up to 10), so wait. Then do a hard refresh with Ctrl+Shift+R (Cmd+Shift+R on macOS) if you still see the old version.
- File names must match exactly in lowercase, and links must be relative, because GitHub treats capitals as different and your site lives in a subfolder of its domain.
- Check the live site in a private window and on your phone. Do not publish anything private.

Next: [Assignment: style and publish your profile site](/learner/roadmap/css-responsive-ui/assignment)

---

## Assignment: Style and Publish Your Profile Site
<!-- slug: responsive-layout-upgrade -->

**Time:** about 3 hours
**Scaffold:** Level 3. A starter `styles.css` is written out below for you to copy. It gives you the structure and the names. You write the rules and choose the values.
**Builds on → feeds into:** Lessons 1–10 of this module and the two pages from HTML Foundations → JavaScript Fundamentals, where you add behaviour to a page and need a live address, and Git and GitHub, which reuses the same repository.
**Last verified:** 2026-10-29 on Windows 10, in Chromium 153 (the open-source browser that Chrome is built on). The starter file was checked with a CSS validator, and a complete worked solution built from it was tested in the browser at widths 320, 375, 700 and 1024 pixels. **Not yet run on a real Windows or macOS computer:** the steps on GitHub's website and in DevTools. If a step does not match your screen, use "If you get stuck" below.

You will take the two pages you built in HTML Foundations and style them, test them on a phone-sized screen and by keyboard, and put them online. You do the work in `my-site`, on your computer. You can read this page on your phone, but open it on your computer when you copy the starter file.

## Outcomes assessed

By the end of this module you can:

- **O1** Write rules with element, class, id and descendant selectors, and predict which of two rules wins.
- **O2** Set readable type and colour: a font, sizes in `rem`, hex colours, and a measured contrast ratio of at least 4.5.
- **O3** Size and space boxes with padding, border and margin, with `box-sizing: border-box`, and centre a column with `max-width` and `margin: 0 auto`.
- **O4** Lay out the header, the navigation and the cards with Flexbox.
- **O5** Make a page work from 320 pixels up: mobile-first, with a `min-width` media query and images that fit.
- **O6** Style a form and show a visible focus ring, checked with the keyboard.
- **O7** Use the Styles pane in DevTools to find, switch off and read a rule.
- **O8** Publish a site with GitHub Pages and update it.

## The task

The pages are the ones you made in HTML Foundations, with the same file names, the same classes (`site-name`, `nav`, `card-grid`, `card`) and the same ids (`about`, `interests`, `projects`). You do not need to change the HTML. If your class or id names are different, use yours in the rules. Anything marked `TODO` is for you to replace with your own choice. Make the site yours: your colours, your type sizes, your breakpoint.

### Part 1: Set up the stylesheet (assesses O1)

1. In VS Code, right-click the `my-site` folder in the Explorer, choose **New File**, and name it `old-styles.txt`. Open `styles.css`, select everything (Ctrl+A, or Cmd+A on macOS), copy, and paste into `old-styles.txt`. Save it. This is your backup of the rules from the lessons. You will copy rules from it, and delete it only at the end of Part 7.

   You should see: `old-styles.txt` in the Explorer. Scroll to the bottom of it: the last rule should be the last rule of your `styles.css`.
   If you see something else: if the backup is empty or short, do not go on. Paste again from `styles.css`.

2. Open `styles.css`, select everything and paste the starter below over it. Save.

   ```css
   /* My site styles.
      Sections: 1 Variables, 2 Base, 3 Header and navigation, 4 Cards, 5 Form and focus, 6 Larger screens.
      Contrast ratios I measured:
      body text on page: TODO
      headings on page: TODO
      links on page: TODO
      button text on button: TODO
   */

   /* 1. Variables */
   :root {
     --color-text: TODO;
     --color-page: TODO;
     --color-heading: TODO;
     --color-link: TODO;
     --color-button: TODO;
     --color-border: TODO;
     --space-1: 0.5rem;
     --space-2: 1rem;
     --space-3: 1.5rem;
   }

   /* 2. Base: box-sizing, body, headings, links, images, main */
   /* TODO: your rules go here. Use var(--color-...) and var(--space-...). Include
      a class rule, an id rule and a descendant rule somewhere in sections 2 to 5. */

   /* 3. Header and navigation: small screen first */
   /* TODO */

   /* 4. Cards: .card-grid and .card */
   /* TODO */

   /* 5. Form and focus */
   /* TODO */

   /* 6. Larger screens: at least one min-width media query */
   /* TODO */
   ```

   You should see: the starter in the editor, saved. Your pages now look plain again, because the rules are gone from `styles.css` until you copy them back.
   If you see something else: if the starter did not paste in full, paste it again over everything. If you ever paste the wrong thing, press Ctrl+Z (Cmd+Z) to undo, or copy your rules back from `old-styles.txt`.

### Part 2: Colour and type (assesses O2)

1. Choose six colours as hex values and replace the six `TODO` values in `:root`: text, page, heading, link, button and border. You may use your colours from Lesson 4 and Lesson 9.
2. In section 2, write the `body` rule (font, size in `rem`, line height, text colour, page colour), the heading sizes in `rem`, and the link colour, using the variables.
3. Contrast rules for your choices: the text, heading and link colours need a ratio of at least 4.5 on your page colour; the button's text needs at least 4.5 on the button colour; the card text needs at least 4.5 on the card colour; the border colour needs at least 3 on the page. You will measure and write the four ratios of the top comment in Part 5, when the button exists.

You should see: your colours and type on both pages once you copy the rest of the rules back.
If you see something else: if a colour does not appear, look for a crossed-out line in the Styles pane.

### Part 3: Boxes and layout (assesses O3, O4)

1. In section 2, add `* { box-sizing: border-box; }`, the `main` rule with `max-width` and `margin: 0 auto`, and the `img` rule with `max-width: 100%` and `height: auto`. Add a rule that uses an id selector, for example `#projects` with a background colour or a border, to mark the Projects section.
2. In section 3, write the `header` rule with Flexbox, in the small-screen form from Lesson 8 (a column), and the `.nav ul` rule (a row of links, no bullets, with `gap`). Pad the header and, if your page has one, the footer with a space variable.
3. In section 4, write the `.card-grid` rule (`display: flex`, `flex-wrap: wrap`, `gap`) and the `.card` rule (padding, a border using the border colour, a background colour of your choice, and a `flex` line such as `flex: 1 1 12rem`). The card text must keep a contrast ratio of at least 4.5 on the card colour.
4. Copy rules from `old-styles.txt` where you can. Replace plain values with `var(...)` where they repeat. Do not copy any rule that has `outline: none`, and do not copy a rule twice.

You should see: both pages styled, with a centred column, a header that stacks, a row of links and wrapping cards.
If you see something else: if a layout does not work, compare it with the lesson for that rule (Lessons 5, 6 and 7).

### Part 4: Phones (assesses O5)

1. In section 6, add a `@media (min-width: ...)` block that turns the header into a row (name on the left, links on the right). Choose the width yourself, between `600px` and `800px`.
2. Open the device toolbar (Lesson 8, choose **Responsive** and type the width). Check `index.html` and `contact.html` at 320, 375 and at your breakpoint plus 100. Then turn the toolbar off and check a wide window (1000 pixels or more): the `main` column should be centred.

You should see: no sideways scrolling at any of them, a header column below your breakpoint and a header row above it, and a picture that fits.
If you see something else: look for the element that sticks out, and read Lesson 8, "Common mistakes".

### Part 5: Form and keyboard (assesses O6, O2)

1. In section 5, style the form in `contact.html`: labels above the boxes, boxes that fit the column (`width` with `max-width` on `input` and `textarea`), the page font in every control (`font: inherit` on `input`, `textarea` and `button`), and a button with your button colour.
2. In section 5, add a `:focus-visible` rule for links, boxes, the message box and the button, with an outline at least 3 pixels wide in a colour that stands out on your page. Do not use `outline: none` anywhere.
3. Tab through both pages. Every stop must show the ring.
4. Now measure. In the colour picker (Lesson 4), read the contrast ratio of your body text, a heading, a link and the button text, and replace the four `TODO` values in the top comment with the numbers. If one is below 4.5, change the colour in `:root` and measure again. Also check your card text on your card colour.

You should see: a visible ring on every link, every box and the button, in order, and four ratios of at least 4.5 in the comment.
If you see something else: if a stop shows no ring, read Lesson 9, "Common mistakes".

### Part 6: Check with DevTools (assesses O7, O1)

1. On `index.html`, right-click a card, choose **Inspect**, and find your `.card` rule in the Styles pane. Switch one line off, watch the page change, and switch it back on. Remember the line and what happened.
2. Find a place where two of your rules set the same property on one element, so that one is crossed out in the Styles pane. Write down which rule won and why (Lesson 3: specificity, or order).

You should see: the page change when you switch the line off, and change back when you switch it on.
If you see something else: if you cannot find a crossed-out line, check a paragraph inside a card, or switch off a rule and look at what the next rule shows.

### Part 7: Publish (assesses O8)

1. Follow Lesson 10: upload `index.html`, `contact.html` and `styles.css` (and any new picture in `images`) to your `my-site` repository. GitHub Pages should still be switched on from Lesson 10; check that **Settings**, then **Pages**, still shows your address.
2. Wait, then open the live address in a private window and on your phone. Hard refresh (Ctrl+Shift+R) if you see an old version. Note how many minutes it took from your upload until the live site showed it.
3. Optional: make a screenshot of the home page at 375 pixels (Windows: Win+Shift+S), upload it to your repository with **Add file**, then **Upload files**, open it on GitHub, and copy the address of that page.
4. When the live site works, delete `old-styles.txt` from `my-site` (right-click it in the Explorer, **Delete**). It was never uploaded, so GitHub is not affected.

You should see: your styled site at your live address, with your picture, in the private window and on your phone.
If you see something else: if the page has no styles or the picture is missing, read Lesson 10, "Common mistakes".

## Acceptance checklist

Check each item yourself before you submit.

- [ ] Your live address opens in a private window without signing in, shows your styled home page and your picture, and the Contact link opens the styled contact page (O8)
- [ ] `styles.css` has the six section comments in order, no `TODO` word is left in it, and it contains at least one class selector, one id selector (such as `#projects`) and one descendant selector (O1)
- [ ] The comment at the top lists four measured ratios, each at least 4.5; the card text on the card colour is at least 4.5; the `:root` block defines six `--color-` names and three `--space-` names; and sizes in `body` and the headings use `rem` (O2)
- [ ] `* { box-sizing: border-box; }` is in the file, the `main` column is centred on a wide window with `max-width` and `margin: 0 auto`, and every card has padding and a border (O3)
- [ ] The header uses `display: flex`, the links use `display: flex` on the `ul`, and `.card-grid` uses `display: flex` with `flex-wrap: wrap` (O4)
- [ ] There is at least one `@media (min-width: ...)` block; at 320, 375 and at your breakpoint plus 100 pixels there is no sideways scrolling on either page; the `img` rule has `max-width: 100%` (O5)
- [ ] Tabbing through both pages shows a visible ring at least 3 pixels wide on every link, every box and the button, and the word `outline` never appears with `none` (O6)
- [ ] The labels sit above their boxes, the boxes fit the column at 320 pixels and use the page font (O6)
- [ ] Notes names one line you switched off in the Styles pane and what happened, one place where two rules disagreed and which won and why, and how many minutes a change took to appear on the live site (O1, O7, O8)
- [ ] Notes has your reflection of 3 to 5 sentences, in your own words, that answers the three prompts below (personal)

## Submit

Scroll down to the submit form on this page.

- **GitHub URL:** paste the link to your repository. It looks like `https://github.com/` followed by your username, a slash, and the repository name.
- **Deployed URL:** paste your live address. It looks like `https://` followed by your username, `.github.io/my-site/`. This one is required in this assignment, because your mentor checks the layout on the live site.
- **Attachment URL:** leave it empty unless you made the optional screenshot. It takes a link, not a file: the address of the screenshot's page on GitHub.
- **Notes:** paste the template below and fill it in. Notes is plain text, so no formatting is needed.
- The form needs at least one field filled in, but your mentor will ask for changes if the GitHub URL, the Deployed URL or Notes is missing.
- After you press Submit, your mentor reads it. If the answer is **Changes requested**, read the note, fix what it names, upload the changed files again, wait for the live site to update, and press **Resubmit**. Your earlier attempts stay visible, and that is normal. You cannot submit again while the status says **Awaiting review**.

```text
Computer (Windows 10, Windows 11 or macOS): ___
Contrast ratios: body text ___, headings ___, links ___, button text ___
A line I switched off in the Styles pane, and what happened:
A place where two of my rules disagreed, which one won, and why:
Minutes a change took to appear on the live site:

Reflection (3 to 5 sentences in all, covering all three questions):
1. Which layout decision were you least sure about, and why?
2. What did you notice when you used only the keyboard?
3. What would you change next on your site?
```

## If you get stuck

- **When to ask:** ask after 20 minutes on one step, or when the same error is still there after two fixes. Being stuck early is useful information for your mentor, not a failure.
- **What to send, wherever you ask:**
  - the step number you are on, for example "Part 4, step 2"
  - what you tried
  - the exact error text, copied (do not retype it), or what you see on the screen
  - whether you are on Windows 10, Windows 11 or macOS, and your Chrome version if you know it
  - a screenshot, if you can make one (a photo of the screen taken with your phone is fine)
- **Where to ask:**
  1. **First choice:** message your mentor on WhatsApp and send the details above. You can send the screenshot or a photo of your screen straight in the chat.
  2. **If you cannot reach your mentor, or you want it on record here:** submit anyway. Write the word `STUCK` on the first line of Notes, add the same details, and put a link to the screenshot in the Attachment URL box only if you know how to make one.
- Your mentor replies with help. If you asked in the review, the reply arrives as **Changes requested**. Follow it, then press **Resubmit**.

## How this is reviewed

Your mentor checks each item below on your live site and in your repository. You can use the same list to check yourself.

- **Live site**
  - Approve if: the Deployed URL opens without signing in, shows a styled home page and picture, and the Contact link opens the styled contact page.
  - Request changes if: the address fails, shows an unstyled page, or has a missing picture.
- **Selectors and structure**
  - Approve if: `styles.css` has the six section comments in order, no `TODO`, and a class, an id (matching an element in the HTML) and a descendant selector.
  - Request changes if: a `TODO` is left, a section is missing, or one of the three kinds of selector is missing or matches nothing.
- **Colour and contrast**
  - Approve if: the top comment lists four ratios of at least 4.5, the card text is at least 4.5 on its card colour, `:root` defines six colour names and three space names, sizes use `rem`, and the colours on the live site match the variables.
  - Request changes if: a ratio is missing or below 4.5, a name is missing, or a size has no unit.
- **Boxes**
  - Approve if: `box-sizing: border-box`, a centred `main` with `max-width`, and cards with padding and a border are all there.
  - Request changes if: any of them is missing, or the column is not centred on a wide window.
- **Flexbox layout**
  - Approve if: the header and `.nav ul` use `display: flex`, and `.card-grid` uses `display: flex` with `flex-wrap: wrap`.
  - Request changes if: any of the three is missing, or the links are still in a bulleted column.
- **Responsive**
  - Approve if: there is a `min-width` media query, and at 320, 375 and the breakpoint plus 100 pixels (device toolbar) there is no sideways scroll on either page; `img` has `max-width: 100%`.
  - Request changes if: there is no media query, or a page scrolls sideways at any of those widths.
- **Keyboard and focus**
  - Approve if: Tab shows a ring at least 3 pixels wide on every link, box and the button, and `outline: none` does not appear.
  - Request changes if: any stop shows no ring, or `outline: none` is in the file.
- **Form**
  - Approve if: the labels are above the boxes, the boxes fit at 320 pixels, and the controls use the page font.
  - Request changes if: a box sticks out at 320 pixels, or the labels are beside the boxes without reason.
- **Notes: DevTools and publishing**
  - Approve if: Notes names a line switched off and what happened, a place where two rules disagreed with the winner and the reason, and a number of minutes.
  - Request changes if: any of the three is missing.
- **Reflection**
  - Approve if: 3 to 5 sentences, in your own words, that answer all three prompts specifically.
  - Request changes if: it is missing, is much shorter, or does not answer the prompts.

How the decision is made: if every item is met, you are approved. If there is a small gap, such as a thin reflection or a reflection that answers one question in a short phrase, you are approved with a note. If any item above is missing or wrong, your mentor requests changes and names the items. A `STUCK` submission gets help, not a mark against you.

## Stretch (optional, not reviewed)

- Rebuild the card row with CSS Grid: replace `display: flex` and `flex-wrap` on `.card-grid` with `display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: var(--space-2);`, and remove `flex` from `.card`.
- Add a dark colour scheme for people whose computer is set to dark mode: a `@media (prefers-color-scheme: dark)` block that redefines the colour variables in `:root`. Remember to measure the contrast again.
- Add a hover style for the cards and the links.
