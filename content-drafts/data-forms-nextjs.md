# Module: Data & Forms in Next.js

*Data fetching, mutations/server functions where appropriate, forms, validation, API consumption, route handlers. Builds on Next.js Core.*

### Lesson 1 — Data Fetching in Server Components

**Why this matters**

You've already fetched data in a Server Component in the last module — this lesson goes deeper into doing it well: handling failure, avoiding duplicate requests, and fetching multiple things at once without them blocking each other unnecessarily.

**The core idea**

Fetch directly in an `async` Server Component, and always handle the failure case explicitly:

```tsx
async function getUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
  return res.json();
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  return <h1>{user.name}</h1>;
}
```

Throwing here isn't a dead end — it's caught automatically by the route's `error.tsx` from the last module. Server Components and error boundaries are designed to work together this way.

When you need more than one piece of data, fetch them together instead of one after another, so the wait time doesn't stack up:

```tsx
const [user, repos] = await Promise.all([
  getUser(username),
  getRepos(username),
]);
```

**Try it yourself**

Add a second fetch to your user profile page — the person's public repos (`https://api.github.com/users/{username}/repos`) — using `Promise.all` so both requests happen at the same time rather than one after the other.

**A mistake beginners actually make**

Fetching sequentially with two separate `await` calls when the two requests don't depend on each other's results. It works, but it's slower than it needs to be for no benefit — `Promise.all` is the fix whenever the fetches are independent.

---

### Lesson 2 — Server Actions & Mutations

**Why this matters**

So far you've only read data. Real apps also need to write it — submit a form, save a change — and Server Actions are Next.js's way to do that directly from a form or a button, without hand-building an API endpoint for every single mutation. This platform's own submit/review/override features are all built this way.

**The core idea**

A Server Action is an async function marked `"use server"`, callable directly from a form:

```tsx
// app/actions.ts
"use server";

export async function saveNote(formData: FormData) {
  const text = formData.get("text") as string;
  // save it somewhere — a database, in a real app
  console.log("Saving:", text);
}
```

```tsx
import { saveNote } from "./actions";

export default function NoteForm() {
  return (
    <form action={saveNote}>
      <input name="text" />
      <button type="submit">Save</button>
    </form>
  );
}
```

No `onSubmit`, no `fetch`, no manually serializing the form — passing the function directly as the form's `action` is what wires it up. This works even before any JavaScript has loaded in the browser, which is a genuinely different model from a typical React form submission.

**Try it yourself**

Create a Server Action that accepts a form submission and just logs the submitted value to your server's terminal (not the browser console — Server Actions run on the server, so `console.log` shows up there). Confirm you see it appear in your terminal when you submit.

**A mistake beginners actually make**

Forgetting `"use server"` at the top of the file (or function), and getting a confusing error about the function not being callable from a Client Component. That directive is what makes the function callable from the browser while still actually running on the server.

---

### Lesson 3 — Forms & Validation

**Why this matters**

Never trust data from a form, even your own — a user can submit anything, including nothing, malformed input, or something deliberately malicious. Validating on the server, not just the client, is what actually protects your app; client-side validation is just a nicer user experience layered on top.

**The core idea**

Zod (the validation library this platform itself uses) lets you describe what valid data looks like, and checks real input against it:

```ts
import { z } from "zod";

const noteSchema = z.object({
  text: z.string().min(1, "Note can't be empty").max(500, "Note is too long"),
});

export async function saveNote(formData: FormData) {
  const result = noteSchema.safeParse({ text: formData.get("text") });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  // result.data.text is now guaranteed to be a valid string
  console.log("Saving:", result.data.text);
  return { success: true };
}
```

`safeParse` (rather than `parse`) returns a result object instead of throwing, which is usually what you want in a Server Action — you can show the validation error back to the user instead of crashing.

**Try it yourself**

Add validation to your note-saving Server Action: require the text field to be non-empty and under 200 characters. Submit an empty form and confirm you get a real validation error back instead of silently "succeeding" with nothing.

**A mistake beginners actually make**

Validating only in the browser (disabling a submit button until a field is filled) and skipping server-side validation entirely, on the assumption the client-side check is enough. It isn't — anyone can submit a request directly, bypassing your UI completely, which is exactly why the server has to check too.

---

### Lesson 4 — Route Handlers (API Routes)

**Why this matters**

Server Actions cover most form-driven mutations, but sometimes you need a genuine API endpoint — for an external service to call, or for a request that isn't a form submission at all. Route Handlers are how you build that in the App Router.

**The core idea**

A `route.ts` file inside `app/` exports functions named after HTTP methods:

```ts
// app/api/users/[username]/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const res = await fetch(`https://api.github.com/users/${params.username}`);
  if (!res.ok) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
```

This is now a real API endpoint at `/api/users/[username]` that returns JSON — callable from your own frontend, or from anywhere else that can make an HTTP request.

**Try it yourself**

Build a Route Handler at `/api/users/[username]` that wraps the GitHub API call and returns just the fields your app actually uses (name, bio, repo count) — visit it directly in your browser and confirm you get back real JSON.

**A mistake beginners actually make**

Reaching for a Route Handler for something a Server Action would handle more simply — most form submissions and simple mutations don't need a dedicated API route. Route Handlers earn their place when something outside your own app's forms needs to call in, or when you need fine control over the raw request/response.

---

## Assignment: Notes App with Server Actions

**Instructions:**

Build a small full-stack feature: a page where someone can add short text notes, and see the list of notes they've added, all within one session (in-memory storage is fine — you don't need a real database for this assignment).

**Requirements:**
- A form that submits via a Server Action, not client-side `fetch`.
- Server-side validation with Zod — empty notes and notes over 200 characters should be rejected with a real error message shown to the user.
- The list of notes re-renders to show the new note immediately after a successful submission.
- At least one Route Handler exposing the current notes as JSON at `/api/notes` (even if nothing else in your app calls it — this is practice with the pattern itself).

**What to submit:**
- A GitHub repo link.
- A deployed URL.
- In your notes: what did you use to make the list update after submitting — and if you're not sure that's the "right" way, say so. That's a genuinely useful thing for your mentor to know before reviewing.
