/**
 * Every videoUrl and resource URL below was found via a real web
 * search while building this content, not guessed or invented.
 * Where a module has a comprehensive full-course video, it's applied
 * to every lesson in that module — a single strong "CSS Full Course"
 * genuinely serves four separate CSS lessons better than searching
 * for four disconnected micro-clips would. Where I couldn't find a
 * genuinely well-fitting video for a specific lesson (several in
 * Production Frontend Practices, all of Capstone, a couple of
 * Deployment lessons), it's left empty rather than forced — an
 * absent video is honest; a mismatched one isn't.
 *
 * Embed format: YouTube URLs are converted from watch?v=ID to
 * embed/ID, since that's what the lesson page's <iframe> needs.
 */

export interface MediaEntry {
  videoUrl?: string;
  resources?: { label: string; url: string }[];
}

const YT = (id: string) => `https://www.youtube.com/embed/${id}`;

// Module-level videos — applied to every lesson slug in that module below.
const CSS_VIDEO = YT("ieTHC78giGQ"); // freeCodeCamp — CSS Full Course (incl. Flexbox & Grid)
const JS_VIDEO = YT("jS4aFq5-91M"); // freeCodeCamp — JavaScript Programming, Full Course
const GIT_VIDEO = YT("mAFoROnOfHs"); // freeCodeCamp — Git & GitHub Crash Course for Beginners
const TS_VIDEO = YT("SpwzRDUQ1GI"); // Learn TypeScript — Full Course for Beginners
const REACT_VIDEO = YT("4UZrsTqkcW4"); // freeCodeCamp — React Crash Course
const NEXTJS_VIDEO = YT("I1V9YWqRIeI"); // Next.js 16 Full Course — build & deploy a full-stack app

const CODESANDBOX_REACT = "https://codesandbox.io/examples/package/react";
const CODESANDBOX_TS = "https://codesandbox.io/examples/package/typescript";
const CODESANDBOX_HOME = "https://codesandbox.io/"; // generic fallback — no verified specific template for these stacks

export const MEDIA_MAP: Record<string, MediaEntry> = {
  // Developer Orientation (rewritten for genuinely zero prior experience)
  "what-is-a-code-editor-and-installing-vs-code": {
    videoUrl: YT("6tQ6MS8cHMk"), // "How to Use VS Code: The Ultimate Beginner's Guide" — explicitly for "even if you've never opened it before"
    resources: [{ label: "Official VS Code getting started docs", url: "https://code.visualstudio.com/docs/introvideos/basics" }],
  },
  "what-is-a-terminal-and-how-do-you-use-one": {
    videoUrl: YT("mABpAI-pCw0"), // "Command Line Basics for Beginners - Full Course"
    resources: [{ label: "Command Line for Beginners (freeCodeCamp)", url: "https://www.freecodecamp.org/news/command-line-for-beginners/" }],
  },
  "installing-node-js-and-running-your-first-command": {
    videoUrl: YT("ddD7JkzKWus"), // "How to Install Node.js (2026 Tutorial) - Setup for Beginners" — covers Windows and Mac
  },
  // welcome-what-you-re-actually-going-to-be-doing, finding-your-way-around-vs-code,
  // how-assignments-and-reviews-work, a-tour-of-a-real-project-s-folders: no video —
  // these are conceptual/tour lessons with nothing to install or watch happen on screen.

  // CSS & Responsive UI
  "the-box-model-selectors": { videoUrl: CSS_VIDEO, resources: [{ label: "Live CSS playground", url: CODESANDBOX_HOME }] },
  "flexbox-for-one-dimensional-layouts": { videoUrl: CSS_VIDEO },
  "css-grid-for-two-dimensional-layouts": { videoUrl: CSS_VIDEO },
  "responsive-design-reusable-styling-habits": { videoUrl: CSS_VIDEO },

  // JavaScript Fundamentals
  "variables-data-types-functions": { videoUrl: JS_VIDEO, resources: [{ label: "Live JS playground", url: CODESANDBOX_HOME }] },
  "arrays-objects": { videoUrl: JS_VIDEO },
  "loops-iteration": { videoUrl: JS_VIDEO },
  "the-dom-reading-and-changing-a-page": { videoUrl: JS_VIDEO },
  "async-javascript-promises-async-await-fetch": { videoUrl: JS_VIDEO },
  "error-handling": { videoUrl: JS_VIDEO },

  // Git & GitHub
  "repositories-commits": { videoUrl: GIT_VIDEO },
  "branches-merging": { videoUrl: GIT_VIDEO },
  "pull-requests-the-review-workflow": { videoUrl: GIT_VIDEO },
  "resolving-merge-conflicts": { videoUrl: GIT_VIDEO },

  // TypeScript Foundations
  "why-typescript-basic-types": { videoUrl: TS_VIDEO, resources: [{ label: "Live TypeScript playground", url: CODESANDBOX_TS }] },
  "interfaces-typing-objects": { videoUrl: TS_VIDEO },
  "union-types-narrowing": { videoUrl: TS_VIDEO },
  "typing-functions-basic-generics": { videoUrl: TS_VIDEO },

  // React Foundations
  "components-jsx": { videoUrl: REACT_VIDEO, resources: [{ label: "Live React playground", url: CODESANDBOX_REACT }] },
  props: { videoUrl: REACT_VIDEO },
  "state-events": { videoUrl: REACT_VIDEO },
  "useeffect-side-effects": { videoUrl: REACT_VIDEO },
  "forms-in-react": { videoUrl: REACT_VIDEO },
  "composition-reusable-ui": { videoUrl: REACT_VIDEO },

  // Next.js Core
  "app-router-file-based-routing": { videoUrl: NEXTJS_VIDEO, resources: [{ label: "Official Next.js Learn course (App Router)", url: "https://nextjs.org/learn/dashboard-app" }] },
  "layouts-nested-routes": { videoUrl: NEXTJS_VIDEO },
  "server-vs-client-components": { videoUrl: NEXTJS_VIDEO },
  "navigation-with-link-userouter": { videoUrl: NEXTJS_VIDEO },
  "loading-error-states": { videoUrl: NEXTJS_VIDEO },
  metadata: { videoUrl: NEXTJS_VIDEO },

  // Data & Forms in Next.js — same full-stack build course, it covers this ground too
  "data-fetching-in-server-components": { videoUrl: NEXTJS_VIDEO },
  "server-actions-mutations": { videoUrl: NEXTJS_VIDEO },
  "forms-validation": { videoUrl: NEXTJS_VIDEO },
  "route-handlers-api-routes": { videoUrl: NEXTJS_VIDEO },

  // Production Frontend Practices — only the two lessons where a genuinely well-fitting video exists
  "accessibility-in-practice": { videoUrl: YT("e2nkq3h1P68") }, // Learn Accessibility — Full a11y Tutorial
  "testing-your-code": { videoUrl: YT("CxSL0knFxAs") }, // React Vite Testing Tutorial — Vitest Crash Course
  // authentication-concepts, choosing-state-solutions, performance-basics,
  // environment-variables-config: no video — none found that fit well
  // enough to include rather than just pad this out.

  // Deployment & Delivery — only the two lessons with a specific, well-matched video
  "environment-config-for-production": { videoUrl: YT("lo2GmBahoyI") }, // Deploying Next.js to Vercel with Environment Variables
  "deploying-to-vercel": { videoUrl: YT("f8nrw6fdMeM") }, // How to Deploy on Vercel — Next.js step-by-step
  // the-build-process, debugging-production-issues: no video found that
  // specifically matches rather than just generically mentions deployment.

  // Capstone — deliberately no videos; this module is a planning brief,
  // not a taught skill, so a video wouldn't add anything here.
};
