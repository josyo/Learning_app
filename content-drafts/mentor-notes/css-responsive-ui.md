# Mentor notes: CSS and Responsive UI, "Style and Publish Your Profile Site"

Mentor-only. This file is never imported (the importer reads only `content-drafts/<module-slug>.md`), so learners cannot see it. The rubric itself is learner-visible in the assignment; this file holds the ready-to-paste review comments.

How to use it: the review form takes one plain-text feedback string and a decision (Approve or Request changes). Paste a comment, put the learner's real values in place of the `<…>` parts, and delete anything that does not apply. Each comment says what is right, what is wrong, the exact fix, and what to resubmit. Keep the tone as it is: specific and encouraging.

To check a submission fast, in this order:
1. Open the Deployed URL in a private window. Check the styled home page, the picture, and the Contact link.
2. Open Chrome DevTools, click **Toggle device toolbar**, and check 320, 375 and the learner's breakpoint plus 100 pixels on both pages: no sideways scrolling, header column then row.
3. Click on an empty part of the page and press Tab through both pages: every link, box and the button must show a ring.
4. Open `styles.css` on GitHub: six section comments, no `TODO`, a class, an id and a descendant selector, a `min-width` media query, no `outline: none`.
5. Compare the four ratios in Notes with a colour picker reading on the live page for one or two of them.

## Approve

**A1. Approve, all good**
Everything checks out: your site is live, it works at phone width, the keyboard ring shows on every stop, your colours pass the contrast check, and your reflection was specific. Nice work. You are ready for JavaScript, where you will add behaviour to a page like this one.

**A2. Approve with a note (small gap)**
Approved. Everything required is in place. One small thing for next time: <a ratio is 4.4 on the footer text, which is just under 4.5: darken the text a little / your reflection answered question <1 / 2 / 3> in one short phrase / the media query uses a breakpoint of <n>px that leaves the header cramped at <width>>. Nothing to resubmit. Well done.

## One comment per acceptance item

**C1. Live site**
I could not see your styled site. <The address does not open / it opens without styles / the picture is missing / the Contact link gives an error>. Check Settings, then Pages (source: Deploy from a branch, branch main, folder /(root)), that the repository is public, and that the file names match in lowercase. Wait a few minutes, hard refresh with Ctrl+Shift+R, and resubmit the new address.

**C2. Selectors and structure**
Please check styles.css against the starter: it needs the six numbered section comments in order, no TODO, and at least one class selector, one id selector and one descendant selector. I found <a TODO still in the file / section <n> missing / no id selector>. Fix it, upload styles.css again, wait for the site to update, and resubmit.

**C3. Colour and contrast**
Your Notes and the top comment of styles.css need four measured contrast ratios, each at least 4.5, and :root needs six colour names and three space names. I found <a ratio missing / <text> on <background> is <ratio>, under 4.5 / only <n> colour names>. Open the colour picker on that text (Lesson 4), change the colour until it passes, update the comment and Notes, and resubmit.

**C4. Boxes**
I could not find <box-sizing: border-box / a centred main with max-width and margin: 0 auto / padding and a border on the cards>. Add it as in Lesson 5, save, upload styles.css again, check a wide window, and resubmit.

**C5. Flexbox layout**
The layout needs Flexbox in three places: header, .nav ul and .card-grid with flex-wrap: wrap. I found <the links are still a bulleted column / the cards do not wrap / display: flex is on .nav, not .nav ul>. Fix it as in Lessons 6 and 7, upload styles.css, and resubmit.

**C6. Responsive**
At <320 / 375 / your breakpoint plus 100> pixels on <index.html / contact.html>, the page scrolls sideways because of <the picture / a form box / a long word>. Check the img rule (max-width: 100%; height: auto) and the widths of the boxes, as in Lesson 8. Also confirm there is a min-width media query. Upload the fix, check again, and resubmit.

**C7. Keyboard and focus**
When I press Tab, I cannot see where the focus is on <the links / the message box / the button>. <The file has outline: none in a rule for <selector> / the :focus-visible rule has a misspelled selector>. Replace it with a visible ring as in Lesson 9, check by tabbing through both pages, upload styles.css, and resubmit.

**C8. Form**
On contact.html at 320 pixels, <a box sticks out of the page / the labels are beside the boxes / the boxes use a different font>. Use width: 100% with max-width, display: block on labels, and font: inherit on controls, as in Lesson 9. Upload styles.css and resubmit.

**C9. Notes: DevTools and publishing**
Notes needs two things: one rule you switched off in the Styles pane and what happened, and the number of minutes a change took to appear on the live site. I found <only the first / only the second / neither>. Try it once (Lessons 1 and 10), add both to Notes, and resubmit.

**C10. Reflection**
Your reflection needs 3 to 5 sentences in your own words, answering all three questions: which layout decision you were least sure about, what you noticed using only the keyboard, and what you would change next. I found <nothing / one sentence / an answer to only one question>. Add what is missing in Notes and resubmit.

## Likely mistakes

**M1. Old version still showing on the live site**
Your repository has the new styles.css, but the live site still shows the old one. GitHub can take up to ten minutes to publish, and Chrome may hold a stored copy. Wait, then hard refresh with Ctrl+Shift+R, and check again. If it is still old after ten minutes, open styles.css on GitHub and check that the upload replaced it. Resubmit when the live site matches.

**M2. Capital letters in a file name, or an absolute path**
Your site works on your computer but not online. <Images/Photo.JPG> and <images/photo.jpg> are different files on GitHub, and a path that starts with a slash points to the top of the whole domain. Use lowercase names and relative paths like images/my-photo.jpg, upload the fixed files, and resubmit.

**M3. A rule that is crossed out or overridden**
In the Styles pane, your <selector> rule is crossed out because <a more specific rule wins>. Do not use !important. Write a more specific selector, such as <.card p> instead of <p>, as in Lesson 3. Check the Styles pane shows your rule without a line through it, upload styles.css, and resubmit.

**M4. Contrast passes on one background and fails on another**
Your <grey> text passes on the white page but scores <4.39> on the <card / footer> colour. Contrast depends on the colour behind the text. Darken the text or lighten that background until the picker shows at least 4.5, update Notes, and resubmit.

**M5. Lesson work lost when the starter was pasted**
I can see the starter sections but no rules inside them. Copy your rules from old-styles.txt into the right sections, using var(--color-...) and var(--space-...) where values repeat. If you deleted old-styles.txt, use the lessons to rebuild each rule. Upload styles.css and resubmit.

## When a learner submits STUCK

**S1. Reply to a STUCK submission (Request changes)**
(Learners are told to message you on WhatsApp first. Use this when the STUCK arrives through the review form instead.)
Thank you for asking early, that is exactly right. From what you sent, I think <cause in one sentence>. Try this: <one exact step>. You should then see <expected result>. If not, copy the exact text and send it again with STUCK on the first line. Press Resubmit when you have fixed it.

**S2. GitHub Pages will not turn on**
Thank you for asking early. From what you sent, I think <the repository is private (Pages needs a public repository on a free account) / there is no main branch with files yet>. Try this: <Settings, then General, change visibility to public after checking nothing private is in the files / upload the three files first, then choose Deploy from a branch, main, /(root), Save>. Resubmit when the address opens. Until then, the rest of your work still counts.
