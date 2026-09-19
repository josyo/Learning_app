# Module: HTML Foundations

*Semantic HTML, forms, accessibility basics, page structure. Builds on Developer Orientation.*

### Lesson 1 — Semantic HTML

**Why this matters**

Browsers, screen readers, and search engines all rely on meaning, not just appearance. A page built entirely out of generic `<div>`s can look correct visually while communicating nothing about what any part of it actually is — which becomes a real problem the moment anyone other than a sighted mouse user needs to navigate it.

**The core idea**

```html
<header>...</header>
<nav>...</nav>
<main>
  <section>
    <h2>About</h2>
    <p>...</p>
  </section>
</main>
<footer>...</footer>
```

`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` each describe what their content *is*, not just where it sits. Headings form a hierarchy — one `<h1>` per page, then `<h2>` for major sections, `<h3>` within those — and that order should reflect actual structure, never a shortcut for making text bigger.

**Try it yourself**

Take a page you'd normally build out of `<div>`s and rebuild its skeleton using `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`, with exactly one `<h1>`.

**A mistake beginners actually make**

Reaching for `<div>` and `<span>` for everything ("divitis"), or skipping a heading level to get a specific font size. If a heading looks the wrong size, that's a job for CSS — the heading level itself should always reflect the document's actual structure.

---

### Lesson 2 — Forms

**Why this matters**

Nearly every real product needs a way for someone to send information back — a form is the standard mechanism, and setting it up correctly gets you validation, accessibility, and better mobile keyboards essentially for free.

**The core idea**

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message"></textarea>

  <button type="submit">Send</button>
</form>
```

Every input needs a `<label>` connected by matching `for`/`id` attributes — clicking the label then focuses the input, and screen readers announce the two together. Using the right `type` (`email`, `tel`, `number`, `date`) gives you free format hints and, on mobile, the right on-screen keyboard.

**Try it yourself**

Build a small contact form with name, email, and message fields, each with a properly associated label, and at least one field using a non-text input type.

**A mistake beginners actually make**

Using `placeholder` text as a substitute for a real `<label>`. Placeholder text disappears the instant someone starts typing, so anyone who looks away mid-form loses the field's meaning entirely — and many screen readers won't reliably announce a placeholder as the field's name at all.

---

### Lesson 3 — Accessibility Basics

**Why this matters**

A meaningful share of real users navigate by keyboard alone or with a screen reader. Semantic HTML plus a handful of habits from this lesson get you most of the way to an accessible page before you'd ever need to reach for ARIA attributes.

**The core idea**

- **Alt text**: every meaningful image needs a short, specific `alt` description; purely decorative images get `alt=""` so screen readers skip them entirely.
- **Color contrast**: text needs enough contrast against its background to stay readable — this is a common and easy thing to miss with light gray-on-white text.
- **Focus visibility**: never remove the default focus outline with `outline: none` without providing a clearly visible replacement.
- **Tab order**: should follow the same order a sighted user would read the page in — top to bottom, left to right.

**Try it yourself**

Tab through a page you've built using only your keyboard — no mouse. Note anywhere the focus outline disappears or the order jumps somewhere unexpected.

**A mistake beginners actually make**

Removing the focus outline for aesthetic reasons and not replacing it with anything. This makes the page effectively unusable for anyone navigating by keyboard — they have no way to see where they are.

---

### Lesson 4 — Structuring a Multi-Section Page

**Why this matters**

Real pages combine everything from this module into one coherent document. This lesson is where the individual pieces come together, right before you apply them all in the assignment.

**The core idea**

Before writing any markup, plan the page's structure: list its sections top to bottom (for example: header/nav, an intro, an about section, a projects or skills section, a contact form, a footer), decide each section's heading level up front, and sketch it — on paper or in a plain text file — before opening the editor.

**Try it yourself**

Outline, in plain text, the section-by-section structure of a simple personal profile page before writing any HTML for it.

**A mistake beginners actually make**

Starting to write markup before deciding on section order. Reshuffling large chunks of HTML afterward is far more error-prone — and far slower — than spending five minutes planning the outline first.

---

## Assignment: Semantic Profile Page

**Instructions:**

Build a personal profile page using everything from this module: semantic structure, a working form, and basic accessibility habits. The content can be about you, a persona, or a project — what's being assessed is the structure, not the subject matter.

**Requirements:**
- Semantic layout: `<header>`, `<nav>`, `<main>` containing at least three `<section>`s, and a `<footer>`.
- Exactly one `<h1>` for the page, with a logical heading hierarchy below it and no skipped levels.
- A contact form with at least three fields, each with a properly associated `<label>`, and at least one non-text input type.
- All images include appropriate `alt` text (or `alt=""` if purely decorative).
- The full page is navigable using only the keyboard, with focus always visible.

**What to submit:**
- A GitHub repository URL.
- A deployed URL (GitHub Pages is a quick, free way to publish a static page).
- In your notes: which section you'd improve first if you had another hour on it.
