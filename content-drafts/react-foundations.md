# Module: React Foundations

*Components, props, state, events, effects, forms, composition, reusable UI. Builds on TypeScript Foundations.*

### Lesson 1 — Components & JSX

**Why this matters**

Every UI you built up to this module was one flat page you manipulated directly with `querySelector`. React's core idea is different: break the UI into small, independent, reusable pieces called components, each responsible for one part of the screen. This is the shift that makes large, complex UIs manageable instead of an unmanageable pile of DOM calls.

**The core idea**

A component is a function that returns markup:

```tsx
function Greeting() {
  return <h1>Hello, welcome back!</h1>;
}
```

That markup-looking syntax inside the function is JSX — it looks like HTML, but it's actually JavaScript, which means you can embed real expressions in it with curly braces:

```tsx
function Greeting() {
  const name = "Ada";
  return <h1>Hello, {name}!</h1>;
}
```

Components compose by being used inside each other, same as any HTML element:

```tsx
function Page() {
  return (
    <div>
      <Greeting />
      <p>Good to see you.</p>
    </div>
  );
}
```

**Try it yourself**

Create a `Card` component that renders a title and description inside a styled `<div>`. Use it three times on a page with different hardcoded text each time — you'll see the same component producing three different-looking results just from being placed three times, which is the whole idea of reuse.

**A mistake beginners actually make**

Forgetting that a component must return exactly one root element (or a Fragment `<>...</>` if you don't want an extra wrapping `<div>`). Returning two sibling elements with nothing wrapping them is one of the first errors almost everyone hits, and the fix is always the same: wrap them.

---

### Lesson 2 — Props

**Why this matters**

A `Card` component is only actually reusable if it can show different content each time. Props are how you pass data into a component from the outside — they're what makes a component a genuine, configurable building block instead of a component that only ever does one specific thing.

**The core idea**

```tsx
interface CardProps {
  title: string;
  description: string;
}

function Card({ title, description }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// Used like this:
<Card title="First card" description="Some text here" />
```

Props flow one direction: from parent to child. A component can't reach "up" and change its own props — if something needs to change, that change has to happen in the parent, which is exactly what the next lesson (state) is about.

**Try it yourself**

Rewrite your `Card` component from the last lesson to accept `title` and `description` as typed props instead of hardcoded text. Render it three times with three different sets of real props, and confirm each renders differently using the same component.

**A mistake beginners actually make**

Trying to modify a prop directly inside the component that received it (`title = "new value"`). Props are read-only from the receiving component's side — if you need something to change over time, that's state, which lives in the component and can actually be updated.

---

### Lesson 3 — State & Events

**Why this matters**

Props handle data coming in from outside, but a lot of real UI needs to remember and react to things happening *inside* it — a counter, a toggled menu, text someone's typing. State is how a component holds a value that can change, and re-renders automatically whenever it does.

**The core idea**

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  );
}
```

`useState(0)` gives you two things: the current value (`count`), and a function to update it (`setCount`). Calling `setCount` doesn't just change a variable — it tells React "re-render this component with the new value," which is what makes the displayed count actually update on screen.

**Try it yourself**

Build a small form input that shows the character count live as someone types (hint: `useState("")` for the text, an `onChange` handler on the input that calls `setText(e.target.value)`). Watch the count update on every keystroke without you writing any manual DOM manipulation.

**A mistake beginners actually make**

Updating state based on its own current value using the state variable directly (`setCount(count + 1)`) inside code that runs multiple times quickly — this can use a stale value. The safer pattern is the function form: `setCount((prev) => prev + 1)`, which always gets the truly current value. You won't hit this often as a beginner, but it's worth knowing the safer pattern exists before you need it.

---

### Lesson 4 — useEffect & Side Effects

**Why this matters**

Fetching data, setting a page title, subscribing to something external — these are "side effects," things that reach outside the component itself. `useEffect` is how you tell React "after you've rendered, also do this," which is exactly what you need for the fetch calls from JavaScript Fundamentals, now inside a component.

**The core idea**

```tsx
import { useState, useEffect } from "react";

function UserProfile({ username }: { username: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, [username]); // re-run this effect whenever username changes

  if (!user) return <p>Loading...</p>;
  return <h2>{user.name}</h2>;
}
```

That array at the end — `[username]` — is the dependency array. It tells React exactly when to re-run the effect: only when one of the listed values changes. Get this wrong (an empty array when it should track something, or missing it entirely) and you get either stale data or an infinite fetch loop — both are common early mistakes, not a sign you're doing something unusually wrong.

**Try it yourself**

Turn your GitHub User Lookup logic into a component that fetches automatically whenever the `username` prop changes, using `useEffect` with `[username]` as the dependency array. Confirm it re-fetches when you change the prop, and doesn't fetch repeatedly when nothing has changed.

**A mistake beginners actually make**

Leaving the dependency array off entirely, which makes the effect run after every single render — including ones caused by the effect's own state update, which can spiral into a fetch loop that hammers an API repeatedly. If you're not sure what belongs in the array, your editor's ESLint React Hooks plugin will usually tell you.

---

### Lesson 5 — Forms in React

**Why this matters**

Forms are everywhere in real applications, and React handles them differently than plain HTML — you're usually keeping the input's value in state ("controlled" inputs), which is what makes validation, conditional submission, and dynamic behavior possible.

**The core idea**

```tsx
function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the browser's default full-page reload
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}
```

`onSearch` here is a function passed in as a prop — the child form doesn't need to know what happens with the search query, it just reports it upward. This pattern (data up via callback, data down via props) is the core communication model in React, and it'll come up constantly.

**Try it yourself**

Turn your GitHub username input into a real controlled form: state holding the current text, a submit handler that prevents the default page reload, and a callback prop that tells the parent component what was searched.

**A mistake beginners actually make**

Forgetting `e.preventDefault()` in the submit handler, and watching the whole page reload the moment the form submits — wiping out all component state in the process. It's an easy line to forget and an easy one to remember once you've seen what happens without it.

---

### Lesson 6 — Composition & Reusable UI

**Why this matters**

This is where the earlier lessons combine into the actual payoff: small, focused, well-typed components that compose into a real feature, instead of one large component trying to do everything at once.

**The core idea**

Break a feature into pieces by responsibility, not by how the screen looks:

```tsx
function UserLookupPage() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState("");

  return (
    <div>
      <SearchForm onSearch={setSubmitted} />
      {submitted && <UserProfile username={submitted} />}
    </div>
  );
}
```

`UserLookupPage` doesn't know how the form works internally, and it doesn't know how the profile fetches its data — it just coordinates them. Each piece can be tested, understood, and changed independently. This is the actual goal of components: not just "reusable," but genuinely easier to reason about individually.

**Try it yourself**

Assemble your `SearchForm` and `UserProfile` components (from the last two lessons) into one page component that coordinates them, matching the pattern above. This is effectively your capstone assignment for this module — see below.

**A mistake beginners actually make**

Building one large component that fetches, renders the form, and displays results all in one function. It'll work, but it's harder to read, harder to test, and harder to change later. If a component is doing three visibly different jobs, that's usually a sign it should be three components.

---

## Assignment: React GitHub Lookup

**Instructions:**

Rebuild your GitHub User Lookup as a React app — same functionality as the JavaScript Fundamentals version, but properly component-based this time.

**Requirements:**
- At least three components: a search form, a result display, and a parent that coordinates them.
- Uses `useState` for the input and the submitted query.
- Uses `useEffect` to fetch whenever the submitted username changes.
- Shows a loading state and a "not found" state, both driven by component state — no manual DOM manipulation anywhere.
- Fully typed with TypeScript (interfaces for props, typed state).

**What to submit:**
- A GitHub repo link.
- A deployed URL.
- In your notes: which of your components do you think is doing too much, if any? (Being able to spot this yourself is more valuable than getting it perfect on the first try.)
