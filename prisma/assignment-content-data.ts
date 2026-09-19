/**
 * One assignment per module with lesson content so far. Same rule
 * as lesson-content-data.ts: real enough to validate the submission
 * → review → resubmit → approve loop, not the final curriculum.
 */
export const ASSIGNMENT_CONTENT: Record<
  string,
  { slug: string; title: string; instructions: string }
> = {
  "developer-orientation": {
    slug: "environment-setup",
    title: "Environment setup",
    instructions: `Set up your development environment and prove it works end to end.

**What to submit:**
- A link to a GitHub repository containing a single \`hello.md\` file with a short paragraph about what you're looking forward to in this path.
- Confirmation (in the submission notes) that you can run \`npm run dev\` on a Next.js project without errors — you'll use this exact setup starting next module.

**Acceptance criteria:**
- Repository is public or the mentor has been added as a collaborator.
- Commit history shows at least one real commit (not just an initial GitHub-generated one).
- \`hello.md\` is present and non-empty.`,
  },
  "html-foundations": {
    slug: "semantic-profile-page",
    title: "Semantic profile page",
    instructions: `Build a single static HTML page: a short personal or project profile.

**Requirements:**
- Use semantic elements throughout — \`<header>\`, \`<main>\`, \`<nav>\` if you have internal links, \`<footer>\`, appropriate heading levels.
- Include at least one form (even something simple, like a "contact me" form) with properly associated \`<label>\` elements.
- Every image needs a meaningful \`alt\` (or \`alt=""\` if purely decorative).
- No CSS frameworks — plain HTML only for this one; styling comes next module.

**What to submit:**
- A GitHub repo link.
- A deployed URL (GitHub Pages, Vercel, or Netlify are all fine — pick whichever you find simplest).`,
  },
};
