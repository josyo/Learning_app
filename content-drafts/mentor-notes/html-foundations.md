# Mentor notes: HTML Foundations, "Semantic Profile Page"

Mentor-only. This file is never imported (the importer reads only `content-drafts/<module-slug>.md`), so learners cannot see it. The rubric itself is learner-visible in the assignment; this file holds the ready-to-paste review comments.

How to use it: the review form takes one plain-text feedback string and a decision (Approve or Request changes). Paste a comment, put the learner's real values in place of the `<…>` parts, and delete anything that does not apply. Each comment says what is right, what is wrong, the exact fix, and what to resubmit. Keep the tone as it is: specific and encouraging.

To check a submission fast: open the GitHub URL in a private window, open `index.html` and `contact.html` on GitHub (click the file, then use the raw or code view), and paste each into the validator with Validate by Direct Input. Check the rubric items in the order they appear in the assignment.

## Approve

**A1. Approve, all good**
Everything checks out: both pages pass the validator, the structure is right, your three cards and your form are in place, and the repository opens for anyone. Your reflection was specific. You are ready for CSS, which styles these same pages and uses the same repository. Nice work.

**A2. Approve with a note (thin alt text or reflection)**
Approved. Everything required is in place. One small thing for next time: <your alt text "<alt>" could say more about what is in the picture, for example "<better alt>" / your reflection answered question <1 / 2 / 3> in one short phrase>. Nothing to resubmit. Well done.

## One comment per acceptance item

**C1. Skeleton or files incomplete**
Thanks for the submission. In <index.html / contact.html> I could not find <the doctype / lang / charset / the viewport line / a title of your own / the link to styles.css / a leftover TODO was still in the file>. Every page needs all of these from Lesson 3. Open the file, add or replace the missing part, save, and upload the changed file again on GitHub. Please resubmit.

**C2. Navigation links**
The Home and Contact links need to open the other page from both pages, with relative paths. Right now <the Contact link on contact.html is missing / a link is an absolute address / a link opens an error page>. Use href="index.html" and href="contact.html" as in Lesson 6, then upload the changed files and resubmit.

**C3. Headings and sections**
index.html needs one h1 and three sections with the ids about, interests and projects, each starting with its own h2. I found <two h1 / a section with no heading / a missing or repeated id>. Fix it as in Lessons 5, 8 and 9, check the page in the validator, upload the changed file, and resubmit.

**C4. Cards**
The Interests section needs three <article class="card">, each with an h3 and a sentence of your own. I found <only two / no class="card" on the third / starter text that still says TODO or is the example text>. Replace it with your own interests, upload index.html again, and resubmit.

**C5. Absolute link**
The Projects section needs a link to another website whose address starts with https://. <It is missing / the address is "<address>" and has no https://>. Copy the full address from Chrome's address bar into the href, as in Lesson 2. Upload index.html again and resubmit.

**C6. Image and alt text**
Your picture needs a lowercase file name with no spaces, a relative src, and an alt of at least four words that say what is in it. <The picture does not show on GitHub / the file is named "<name>" / the alt is "<alt>">. Rename the file, update the src, and write an alt such as "<example>". Upload the picture and index.html again, and resubmit.

**C7. Form**
contact.html needs three boxes, each with a label whose for matches the box's id, and a name, and one box with type="email". I found <a label whose for does not match / a box with no name / no type="email">. Fix it as in Lesson 10, click each label to test it, upload contact.html again, and resubmit.

**C8. Validator results**
I need to see the validator result for both pages in Notes, saying no errors. <The result for contact.html is missing / index.html still has <error>>. Fix the first error, paste the page into the validator again, check, and paste the new result. Resubmit.

**C9. GitHub repository**
I could not open your repository, or its files are not at the top level. <The link says not found, so the repository is probably private: make it public in its settings / the files are inside a folder called <name>>. Upload index.html, contact.html, styles.css and the images folder at the top level, check the link in a private window, and resubmit.

**C10. Reflection**
Your reflection needs 3 to 5 sentences in your own words, answering all three questions: what took longest, what the validator found, and what you would change next. I found <nothing / one sentence / an answer to only one question>. Add what is missing in Notes and resubmit.

## Likely mistakes

**M1. Uploaded the whole my-site folder, so everything is inside a folder**
Your repository shows one folder called my-site instead of your files. Upload index.html, contact.html, styles.css and the images folder again at the top level, using Add file, then Upload files, with the files and folder dragged from inside my-site. Ask me how to remove the extra folder. Check the link in a private window and resubmit.

**M2. Capital letters or spaces in the picture's file name**
Your picture shows on your computer but not on GitHub, because <Photo.JPG> and <photo.jpg> are different files there. Rename the file to lowercase with no spaces, such as my-photo.jpg, change the src to match exactly, and upload both the picture and index.html again. Resubmit.

**M3. Duplicate id, or a section with no heading**
The validator reports <Duplicate ID "about" / Section lacks heading>. An id can be used once on a page, and every section needs its own h2. Change the repeated id or add the heading, check the page again, upload index.html, and resubmit with the new validator result.

**M4. Label and box do not match**
Clicking the label "<label>" does not move the cursor to its box, because the label says for="<x>" and the box has id="<y>". Make them the same, test by clicking each label, upload contact.html again, and resubmit.

**M5. Copied the starter's TODO text or the example name**
Some text in <file> is still from the starter, for example "<text>". I need your own words in every place that said TODO. Replace it, upload the changed file, and resubmit.

## When a learner submits STUCK

**S1. Reply to a STUCK submission (Request changes)**
(Learners are told to message you on WhatsApp first. Use this when the STUCK arrives through the review form instead.)
Thank you for asking early, that is exactly right. From what you sent, I think <cause in one sentence>. Try this: <one exact step>. You should then see <expected result>. If not, copy the exact text and send it again with STUCK on the first line. Press Resubmit when you have fixed it.
