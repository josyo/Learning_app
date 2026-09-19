# Module: Next.js Core

*App Router, layouts, routing, Server/Client Components, navigation, loading/error states, metadata. Builds on React Foundations.*

### Lesson 1 — App Router & File-Based Routing

**Why this matters**

Your React app so far has had one page. Real applications have many, and Next.js turns your folder structure itself into your routing — no router library to configure, no route table to maintain by hand.

**The core idea**

Inside the `app/` folder, each folder is a URL segment, and a `page.tsx` file inside it is what renders at that URL:

```
app/
  page.tsx              → /
  about/
    page.tsx            → /about
  users/
    [username]/
      page.tsx          → /users/:username (dynamic segment)
```

`[username]` with square brackets is a dynamic segment — it matches any value in that position, and you can read it in the page itself:

```tsx
export default function UserPage({ params }: { params: { username: string } }) {
  return <h1>Profile for {params.username}</h1>;
}
```

**Try it yourself**

Create a new Next.js route at `/users/[username]` that just displays the username from the URL. Visit `/users/octocat` and `/users/anyone-else` and confirm the page reflects whatever's actually in the URL.

**A mistake beginners actually make**

Naming the file wrong — it must be exactly `page.tsx` (or `page.js`), not `index.tsx` like some older frameworks use, and not the folder name itself. A folder with no `page.tsx` inside it simply won't have a route, silently.

---

### Lesson 2 — Layouts & Nested Routes

**Why this matters**

Most real apps share a header, navigation, and footer across many pages. Rebuilding that on every single page would be repetitive and error-prone. Layouts let you define shared UI once, and it automatically wraps every page beneath it.

**The core idea**

```tsx
// app/layout.tsx — wraps every single page in the app
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>My Site</nav>
        {children}
        <footer>© 2026</footer>
      </body>
    </html>
  );
}
```

Layouts nest: a layout inside `app/dashboard/layout.tsx` wraps every page under `/dashboard/*`, in addition to the root layout wrapping everything. This is exactly the pattern this very platform uses — separate layouts for the learner, mentor, and admin sections, each adding its own nav on top of the shared root layout.

**Try it yourself**

Add a layout to your `/users/[username]` route (a new `app/users/layout.tsx`) that wraps the page in a styled container with a "Back to search" link. Confirm it only affects routes under `/users/*`, not your homepage.

**A mistake beginners actually make**

Putting page-specific content in a layout, forgetting that a layout doesn't re-render when navigating between pages that share it — state in a layout persists across those page changes, which is usually what you want, but can surprise you if you expected a fresh start on every navigation.

---

### Lesson 3 — Server vs Client Components

**Why this matters**

This is the single biggest conceptual shift from plain React to Next.js. By default, every component in the App Router runs on the *server* — rendered before it ever reaches the browser. That's faster and lets you fetch data directly in a component, but it also means you can't use `useState`, `useEffect`, or click handlers there without an explicit opt-in.

**The core idea**

Server Components (the default) can fetch data directly, with no `useEffect` needed:

```tsx
// This runs on the server — no "use client" needed
async function UserPage({ params }: { params: { username: string } }) {
  const res = await fetch(`https://api.github.com/users/${params.username}`);
  const user = await res.json();
  return <h1>{user.name}</h1>;
}
```

Client Components — anything using state, effects, or event handlers — need an explicit marker at the top of the file:

```tsx
"use client";

import { useState } from "react";

export function SearchBox() {
  const [query, setQuery] = useState("");
  // ...
}
```

The practical rule: default to Server Components for anything that just displays data. Reach for `"use client"` only for the specific pieces that need interactivity — a form, a button with an `onClick`, anything using `useState`.

**Try it yourself**

Rewrite your `/users/[username]` page to fetch the GitHub user directly in the Server Component (no `useEffect`, no loading state needed — the page just doesn't render until the data's ready). Then add a small "Refresh" button as a separate Client Component nested inside it.

**A mistake beginners actually make**

Adding `"use client"` to everything out of habit, which throws away the actual benefit of Server Components. If a component doesn't use state, effects, or browser-only APIs, it doesn't need it — and most of a typical page genuinely doesn't.

---

### Lesson 4 — Navigation with Link & useRouter

**Why this matters**

A plain `<a href>` reloads the entire page on every click — slow, and it throws away all your app's state. Next.js's `<Link>` component navigates without a full reload, keeping your app feeling instant.

**The core idea**

```tsx
import Link from "next/link";

<Link href="/users/octocat">View octocat's profile</Link>
```

For navigation triggered by code rather than a click — after a form submits, for example — use the `useRouter` hook from a Client Component:

```tsx
"use client";
import { useRouter } from "next/navigation";

function SearchForm() {
  const router = useRouter();

  function handleSubmit(username: string) {
    router.push(`/users/${username}`);
  }
  // ...
}
```

**Try it yourself**

Replace any plain `<a>` tags in your project with `<Link>`, and wire your search form's submit handler to navigate to `/users/[whatever-was-typed]` using `router.push`.

**A mistake beginners actually make**

Importing `useRouter` from `next/router` instead of `next/navigation` — that's the old Pages Router API, and it doesn't work the same way (or at all) in the App Router. If navigation silently does nothing, this is worth checking first.

---

### Lesson 5 — Loading & Error States

**Why this matters**

A page fetching real data takes time, and things genuinely fail — a network blip, a bad username, a server error. Next.js gives you a built-in, file-based way to handle both cases cleanly, which you've already seen in action throughout this very platform.

**The core idea**

Add a `loading.tsx` file next to a `page.tsx`, and Next.js shows it automatically while that page's data is being fetched:

```tsx
// app/users/[username]/loading.tsx
export default function Loading() {
  return <p>Loading profile...</p>;
}
```

Add an `error.tsx` for when something throws:

```tsx
"use client"; // error boundaries must be Client Components

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Try it yourself**

Add a `loading.tsx` to your `/users/[username]` route. Then deliberately throw an error in the page (fetch a malformed URL, or `throw new Error("test")`) to confirm your `error.tsx` catches it, and that the "Try again" button actually re-renders the page.

**A mistake beginners actually make**

Forgetting `"use client"` on `error.tsx` — error boundaries require it, since they need interactivity (the reset button) even though most of your other pages don't.

---

### Lesson 6 — Metadata

**Why this matters**

The `<title>` tag and meta description matter for search engines, link previews, and just basic professionalism — a page that shows "localhost:3000" as its title in every browser tab looks unfinished, because it is.

**The core idea**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Look up any GitHub user's public profile.",
};
```

For dynamic pages where the title depends on the data (like showing the actual username), use `generateMetadata` instead of a static export:

```tsx
export async function generateMetadata({ params }: { params: { username: string } }) {
  return { title: `${params.username}'s Profile` };
}
```

**Try it yourself**

Add static metadata to your homepage, and dynamic metadata to your `/users/[username]` page so the browser tab shows the actual username being viewed.

**A mistake beginners actually make**

Exporting `metadata` from a Client Component — it only works in Server Components. If your page needs `"use client"` for some other reason, put the metadata export in a parent layout or a separate server-rendered file instead.

---

## Assignment: Next.js GitHub Lookup

**Instructions:**

Convert your React GitHub Lookup into a real Next.js app using the App Router.

**Requirements:**
- A dynamic route at `/users/[username]` that fetches and displays that user's profile.
- The profile fetch happens in a Server Component — no client-side `useEffect` for the initial load.
- A `loading.tsx` and an `error.tsx` for that route.
- Dynamic metadata showing the username in the browser tab title.
- Navigation using `<Link>`, not plain `<a>` tags.

**What to submit:**
- A GitHub repo link.
- A deployed URL.
- In your notes: which parts of your app ended up as Server Components vs. Client Components, and why you split it that way.
