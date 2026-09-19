/**
 * The 12-stage Frontend/Next.js curriculum from the MVP scope doc,
 * section 6. Each module lists the prerequisite module slugs it
 * depends on — this seed is what compute-module-statuses.ts reads
 * (via Enrollment/PathModule/ModulePrerequisite) at runtime.
 *
 * Kept as data, not inline in seed.ts, so a second path can reuse
 * individual modules later (e.g. "javascript-fundamentals" and
 * "git-github" will likely be shared with a Backend path) without
 * touching the seeding logic itself.
 */
export const FRONTEND_NEXTJS_MODULES = [
  {
    slug: "developer-orientation",
    title: "Developer Orientation",
    description:
      "Editor/IDE, browser dev tools, terminal basics, package managers, project structure, how assignments and reviews work.",
    requires: [] as string[],
  },
  {
    slug: "html-foundations",
    title: "HTML Foundations",
    description: "Semantic HTML, forms, accessibility basics, page structure.",
    requires: ["developer-orientation"],
  },
  {
    slug: "css-responsive-ui",
    title: "CSS & Responsive UI",
    description:
      "Selectors, box model, Flexbox, Grid, responsive design, reusable styling habits.",
    requires: ["html-foundations"],
  },
  {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Variables, functions, arrays, objects, iteration, modules, DOM, async/await, fetch, error handling.",
    requires: ["css-responsive-ui"],
  },
  {
    slug: "git-github",
    title: "Git & GitHub",
    description: "Repositories, commits, branches, pull requests, conflicts, review workflow.",
    requires: ["javascript-fundamentals"],
  },
  {
    slug: "typescript-foundations",
    title: "TypeScript Foundations",
    description:
      "Types, interfaces, unions, narrowing, generics basics, typing functions and objects.",
    requires: ["git-github"],
  },
  {
    slug: "react-foundations",
    title: "React Foundations",
    description:
      "Components, props, state, events, effects, forms, composition, reusable UI.",
    requires: ["typescript-foundations"],
  },
  {
    slug: "nextjs-core",
    title: "Next.js Core",
    description:
      "App Router, layouts, routing, Server/Client Components, navigation, loading/error states, metadata.",
    requires: ["react-foundations"],
  },
  {
    slug: "data-forms-nextjs",
    title: "Data & Forms in Next.js",
    description:
      "Data fetching, mutations/server functions where appropriate, forms, validation, API consumption, route handlers.",
    requires: ["nextjs-core"],
  },
  {
    slug: "production-frontend-practices",
    title: "Production Frontend Practices",
    description:
      "Authentication concepts, state choices, accessibility, performance, testing, environment variables, error handling.",
    requires: ["data-forms-nextjs"],
  },
  {
    slug: "deployment-delivery",
    title: "Deployment & Delivery",
    description:
      "Build process, environment config, deployment, debugging production issues, PR review.",
    requires: ["production-frontend-practices"],
  },
  {
    slug: "capstone",
    title: "Capstone",
    description:
      "Combine design, data, forms, authentication/API usage and deployment in a realistic project.",
    requires: ["deployment-delivery"],
  },
];
