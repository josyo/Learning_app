export const LESSON_CONTENT: Record<
  string,
  {
    slug: string;
    title: string;
    required: boolean;
    content: string;
    videoUrl?: string;
    resources?: { label: string; url: string }[];
  }[]
> = {
  "developer-orientation": [
    {
      slug: "toolchain-basics",
      title: "Toolchain basics",
      required: true,
      content:
        "## Learning objectives\n- explain the frontend toolchain\n- use the terminal with confidence\n- run project scripts with purpose\n- diagnose startup problems more efficiently\n\n## Why this matters\nA frontend app depends on more than HTML, CSS, and JavaScript. It depends on the editor, terminal, runtime, package manager, and browser tooling that make the code work in practice.\n\n## Core workflow\n1. open the project\n2. install dependencies\n3. run the dev script\n4. inspect the output\n5. fix the root cause\n\n## Quick check\nWhy is reading the first error line often more useful than reading the last line?\n\n## Key takeaway\nThe toolchain is part of product work, not a side topic.",
    },
    {
      slug: "project-loop",
      title: "Project loop",
      required: true,
      content:
        "## Learning objectives\n- understand the normal development loop\n- organize work into small steps\n- separate source files from generated files\n- debug with a clear workflow\n\n## Why this matters\nReal product work is iterative. Good developers make a small change, run it, inspect the result, and adjust based on evidence.\n\n## Good habits\n- keep edits narrow\n- read the error before changing more code\n- keep the project structure predictable\n- test the real behavior you changed\n\n## Key takeaway\nA steady loop of change and verification is more reliable than large speculative edits.",
    },
  ],
  "html-foundations": [
    {
      slug: "semantic-html",
      title: "Semantic HTML",
      required: true,
      content:
        "## Learning objectives\n- explain semantic HTML\n- choose meaningful elements\n- improve accessibility with structure\n- understand why meaning matters in content\n\n## Why this matters\nSemantic HTML communicates structure to browsers, assistive technology, and developers. It helps content stay understandable even when styling changes.\n\n## Key pattern\nUse nav, main, article, aside, header, and footer when they match the meaning of the content. Generic wrappers are useful, but they are not a substitute for real structure.\n\n## Quick check\nWhy do semantic elements help both accessibility and maintainability?\n\n## Key takeaway\nGood structure is part of good product design.",
    },
    {
      slug: "forms-and-labels",
      title: "Forms and labels",
      required: true,
      content:
        "## Learning objectives\n- build a clear form\n- connect labels to inputs\n- use input types intentionally\n- validate with user-friendly patterns\n\n## Why this matters\nForms are one of the main ways users send information to an app. If the form is confusing, the product fails even when the backend is fine.\n\n## Common rules\n- use a label for every field\n- choose the correct input type\n- provide useful validation messaging\n- do not rely on placeholders alone\n\n## Quick check\nWhy is a real label more useful than placeholder text?\n\n## Key takeaway\nAccessible forms are more usable for everyone.",
    },
  ],
  "css-responsive-ui": [
    {
      slug: "box-model",
      title: "Box model",
      required: true,
      content:
        "## Learning objectives\n- describe the box model\n- identify padding, border, and margin\n- understand why sizing feels tricky at first\n- make layout debugging more predictable\n\n## Why this matters\nCSS layout is based on spacing and sizing rules. When a box looks wider than expected, the issue is usually the box model.\n\n## Good habit\nUse a consistent sizing model so width calculations are easier to reason about. Many teams use border-box for simpler layout decisions.\n\n## Quick check\nWhy do width and visual size sometimes differ in CSS?\n\n## Key takeaway\nThe box model is the mental model behind layout.",
    },
    {
      slug: "responsive-layouts",
      title: "Responsive layouts",
      required: true,
      content:
        "## Learning objectives\n- explain responsive design\n- choose Flexbox or Grid appropriately\n- design for different screen widths\n- avoid brittle fixed layouts\n\n## Why this matters\nUsers experience products on many screen sizes. A layout that only works at one width is fragile.\n\n## Practical pattern\nUse Flexbox for one-dimensional alignment and Grid for two-dimensional arrangement. Let content wrap and adapt rather than forcing exact sizes.\n\n## Quick check\nWhen is Grid more helpful than Flexbox?\n\n## Key takeaway\nResponsiveness is about usability across conditions, not just a single desktop width.",
    },
  ],
  "javascript-fundamentals": [
    {
      slug: "variables-and-types",
      title: "Variables and types",
      required: true,
      content:
        "## Learning objectives\n- define variables and values\n- explain primitive types\n- use const and let correctly\n- understand why scope matters\n\n## Why this matters\nJavaScript programs work by storing data and transforming it over time. Variables are the main tool for that process.\n\n## Core idea\nA variable is a label for a value. The value can change while the variable name stays the same.\n\n## Quick check\nWhy is const usually the better default in modern JavaScript?\n\n## Key takeaway\nUnderstanding variables and types is the foundation of programming in JavaScript.",
    },
    {
      slug: "functions-and-scope",
      title: "Functions and scope",
      required: true,
      content:
        "## Learning objectives\n- explain what a function is\n- use parameters and return values\n- understand scope\n- avoid common function bugs\n\n## Why this matters\nFunctions let developers break logic into reusable pieces. They are essential for keeping code readable and maintainable.\n\n## Important idea\nScope controls where a variable is visible. Variables defined inside a function usually do not exist outside it.\n\n## Quick check\nWhy does scope matter when debugging behavior?\n\n## Key takeaway\nFunctions and scope determine how code organizes data and behavior.",
    },
  ],
  "git-github": [
    {
      slug: "version-control",
      title: "Version control",
      required: true,
      content:
        "## Learning objectives\n- explain why version control matters\n- describe commits and branches\n- understand collaborative workflow\n- use Git to manage change safely\n\n## Why this matters\nVersion control is how teams keep track of change over time. It prevents accidental overwrite and makes changes reviewable.\n\n## Core workflow\n- create a branch\n- make focused edits\n- commit them\n- review and merge\n\n## Quick check\nWhy are small, clear commits easier to review?\n\n## Key takeaway\nGit is not only backup storage. It is a tool for deliberate change management.",
    },
    {
      slug: "branching-and-review",
      title: "Branching and review",
      required: true,
      content:
        "## Learning objectives\n- explain pull requests\n- understand review feedback\n- resolve conflicts carefully\n- keep branches focused\n\n## Why this matters\nTeams do not usually work in one giant branch. Branches and review make work easier to understand and safer to merge.\n\n## Good practice\nKeep each branch focused on one change. That makes the code easier to review and less risky to merge.\n\n## Quick check\nWhy does a narrow branch usually review faster than a broad one?\n\n## Key takeaway\nReview is not a punishment. It is a quality system.",
    },
  ],
  "typescript-foundations": [
    {
      slug: "types-and-interfaces",
      title: "Types and interfaces",
      required: true,
      content:
        "## Learning objectives\n- explain what a type is\n- describe simple TypeScript types\n- use interfaces for object shapes\n- improve safety in app code\n\n## Why this matters\nTypeScript helps developers communicate intent and catch bugs before runtime. That makes onboarding and maintenance easier.\n\n## Core idea\nA type says what kind of value a variable or object should hold. That reduces ambiguity and helps tools guide you.\n\n## Quick check\nHow does TypeScript help before the app even runs?\n\n## Key takeaway\nTypes are a tool for clarity and safety.",
    },
    {
      slug: "unions-and-narrowing",
      title: "Unions and narrowing",
      required: true,
      content:
        "## Learning objectives\n- explain union types\n- describe narrowing\n- handle multiple shapes safely\n- use type guards effectively\n\n## Why this matters\nReal application data often has more than one possible shape. TypeScript helps describe that complexity clearly.\n\n## Good habit\nNarrow values before using them as if they had a single shape, especially when APIs or user input are involved.\n\n## Quick check\nWhy is narrowing important in real-world application code?\n\n## Key takeaway\nType safety is about handling uncertainty carefully, not eliminating it.",
    },
  ],
  "react-foundations": [
    {
      slug: "components-and-props",
      title: "Components and props",
      required: true,
      content:
        "## Learning objectives\n- define a React component\n- pass data through props\n- build small reusable UI units\n- understand composition\n\n## Why this matters\nReact apps are built by composing components. Reusable components make interfaces easier to understand and maintain.\n\n## Core idea\nProps are data passed from a parent component to its child. They let components stay reusable without hard-coding every value.\n\n## Quick check\nWhy is composition usually better than one giant component?\n\n## Key takeaway\nComponents are the building blocks of a React interface.",
    },
    {
      slug: "state-and-events",
      title: "State and events",
      required: true,
      content:
        "## Learning objectives\n- define state in React\n- handle user events\n- understand re-rendering\n- keep state simple\n\n## Why this matters\nInteractivity depends on state and events. The UI is usually responding to user actions, not just static markup.\n\n## Good habit\nStore only values that matter to the current view. Derive values when you can instead of duplicating state unnecessarily.\n\n## Quick check\nWhy is state often the source of complexity in React interfaces?\n\n## Key takeaway\nClear state management is essential to predictable UI behavior.",
    },
  ],
  "nextjs-core": [
    {
      slug: "routing-and-layouts",
      title: "Routing and layouts",
      required: true,
      content:
        "## Learning objectives\n- explain route structure\n- understand layouts\n- map file structure to app structure\n- think clearly about app organization\n\n## Why this matters\nNext.js routes and layouts help organize the app around real user flows, not random files.\n\n## Core idea\nA route tree is a map of screens and sections. Layouts let shared structure wrap several pages.\n\n## Quick check\nWhy does route organization matter for maintainability?\n\n## Key takeaway\nThe route tree is part of the product design.",
    },
    {
      slug: "server-client-boundaries",
      title: "Server and client boundaries",
      required: true,
      content:
        "## Learning objectives\n- distinguish server and client code\n- choose the correct layer for work\n- understand data fetching and interaction boundaries\n- reduce unnecessary client logic\n\n## Why this matters\nNot every task belongs in the browser. Some work is more secure and efficient on the server.\n\n## Quick check\nWhen should logic stay on the server instead of the client?\n\n## Key takeaway\nThe server and client boundary is a key product design decision.",
    },
  ],
  "data-forms-nextjs": [
    {
      slug: "data-fetching",
      title: "Data fetching",
      required: true,
      content:
        "## Learning objectives\n- explain data flow in app interfaces\n- handle loading and error states\n- understand mutation patterns\n- reason clearly about data updates\n\n## Why this matters\nMost apps are data-driven. People expect the interface to reflect current information and respond to user actions in a clear way.\n\n## Good habit\nAlways handle loading, empty, and error states before assuming the data is ready to show.\n\n## Quick check\nWhy are loading and empty states important in real interfaces?\n\n## Key takeaway\nProduct trust comes from clear data behavior.",
    },
    {
      slug: "forms-and-validation",
      title: "Forms and validation",
      required: true,
      content:
        "## Learning objectives\n- connect form inputs to data actions\n- validate user input clearly\n- explain the value of frontend and backend checks\n- design safe form flows\n\n## Why this matters\nA form is a product action point. Good validation and feedback make the app easier to trust and easier to use.\n\n## Quick check\nWhy should validation happen in the interface and at the server boundary?\n\n## Key takeaway\nClear form feedback creates better user trust.",
    },
  ],
  "production-frontend-practices": [
    {
      slug: "accessibility-and-performance",
      title: "Accessibility and performance",
      required: true,
      content:
        "## Learning objectives\n- explain why accessibility matters\n- identify performance concerns\n- maintain quality in production\n- treat product quality as a system, not a final detail\n\n## Why this matters\nA frontend app is not done when it looks good in one viewport. It also needs to be understandable, usable, and resilient under real conditions.\n\n## Quick check\nWhy can a polished interface still fail real users?\n\n## Key takeaway\nProduction quality includes usability, performance, and clarity.",
    },
    {
      slug: "errors-and-observability",
      title: "Errors and observability",
      required: true,
      content:
        "## Learning objectives\n- explain why error handling matters\n- design clear failure states\n- think about observability\n- improve recovery flows\n\n## Why this matters\nErrors are part of product reality. Good systems communicate what happened and help the user or developer recover.\n\n## Quick check\nWhy is a vague failure message costly for users and teams?\n\n## Key takeaway\nGood error handling is part of product trust.",
    },
  ],
  "deployment-delivery": [
    {
      slug: "deployment-basics",
      title: "Deployment basics",
      required: true,
      content:
        "## Learning objectives\n- explain deployment as a separate process\n- understand build and runtime differences\n- recognize environment mismatch risks\n- think about release safety\n\n## Why this matters\nProjects that work locally can still fail in production because of differences in environment, configuration, and deploy pipeline.\n\n## Quick check\nWhy is it risky to assume local behavior matches production behavior exactly?\n\n## Key takeaway\nDeployment is a professional delivery practice, not a one-time event.",
    },
    {
      slug: "release-practices",
      title: "Release practices",
      required: true,
      content:
        "## Learning objectives\n- explain the value of reviewable releases\n- plan for rollback and debugging\n- identify release risks\n- treat delivery as part of product work\n\n## Why this matters\nA release is not just a command. It is a point where product changes become visible to real users.\n\n## Quick check\nWhat makes a release safer: more changes or better review and recovery planning?\n\n## Key takeaway\nGood delivery reduces risk and improves confidence.",
    },
  ],
  "capstone": [
    {
      slug: "capstone-planning",
      title: "Capstone planning",
      required: true,
      content:
        "## Learning objectives\n- define a realistic product scope\n- reason about clear user flow\n- make implementation decisions intentionally\n- evaluate trade-offs in a capstone project\n\n## Why this matters\nA capstone proves judgment, not just coding speed. The strongest projects show coherent product thinking under constraints.\n\n## Good project traits\n- clear user goal\n- manageable scope\n- understandable architecture\n- clear feedback and validation\n\n## Quick check\nWhat is stronger: an overloaded feature list or a clear product flow?\n\n## Key takeaway\nGood capstones show product thinking and implementation discipline.",
    },
    {
      slug: "capstone-delivery",
      title: "Capstone delivery",
      required: true,
      content:
        "## Learning objectives\n- turn a capstone plan into action\n- sequence work effectively\n- test the complete flow\n- present the result clearly\n\n## Why this matters\nExecution matters as much as the idea. Good capstones are planned, tested, and presented with clarity.\n\n## Useful approach\n1. define the user journey\n2. build the core flow\n3. add validation and polish\n4. test the whole experience\n5. explain the trade-offs\n\n## Quick check\nWhy does sequencing the work matter in a capstone?\n\n## Key takeaway\nThe best capstones show clear thinking from concept to delivery.",
    },
  ],
};
