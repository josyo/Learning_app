# Module: TypeScript Foundations

*Types, interfaces, unions, narrowing, generics basics, typing functions and objects. Builds on Git & GitHub.*

### Lesson 1 — Why TypeScript & Basic Types

**Why this matters**

In plain JavaScript, a typo in a property name or passing the wrong kind of value to a function fails silently or crashes at runtime — often far from where the actual mistake was made. TypeScript catches an enormous number of these mistakes while you're still writing the code, before a user (or your mentor) ever sees them.

**The core idea**

TypeScript adds type annotations on top of JavaScript. Most of the time, it can figure types out on its own (called inference), but you can also be explicit:

```ts
let age: number = 28;
let name: string = "Ada";
let isActive: boolean = true;
let tags: string[] = ["frontend", "typescript"];
```

In practice, you'll write `let age = 28;` most of the time and let TypeScript infer `number` on its own — explicit annotations matter most on function parameters and return values, which the next lesson covers.

**Try it yourself**

In a `.ts` file, declare a few variables without type annotations, then hover over each one in your editor. You'll see TypeScript has already inferred a type for every one of them — that's the inference this lesson is about, working automatically in the background.

**A mistake beginners actually make**

Annotating everything explicitly out of habit, including things TypeScript already infers correctly, which just adds noise. Let inference do the obvious work, and save explicit annotations for the places that actually need them — function signatures, and anything TypeScript genuinely can't guess.

---

### Lesson 2 — Interfaces & Typing Objects

**Why this matters**

Real data is almost always an object — a user, a product, an API response. An interface describes the shape that object must have, so if you misspell a property or forget one entirely, TypeScript tells you immediately instead of leaving it for you to discover when something breaks.

**The core idea**

```ts
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  bio?: string; // the ? marks this field optional
}

function greetUser(user: User) {
  return `Hello, ${user.name}!`;
}
```

Now if you call `greetUser({ id: "1", name: "Ada" })`, TypeScript flags it immediately — `email` and `isAdmin` are missing. That immediate, specific feedback is the entire value proposition of typing your objects.

**Try it yourself**

Write an interface for a `Repo` matching what GitHub's API actually returns for a repository (fields like `name`, `stargazers_count`, `html_url`) — you don't need every field, just the ones you'd actually use. Then write a function that takes a `Repo` and returns a formatted string like `"my-project — 42 stars"`.

**A mistake beginners actually make**

Marking too many fields optional (`?`) just to make TypeScript stop complaining, rather than fixing the actual data. This defeats the entire point — you're back to not knowing what's actually there, just with extra syntax around it.

---

### Lesson 3 — Union Types & Narrowing

**Why this matters**

Real values are often "one of several possible things" — a request is loading, succeeded, or failed; a field is a string or `null`. Union types let you say that precisely, and narrowing is how you safely handle each case without TypeScript (correctly) refusing to let you treat an uncertain value as if it were certain.

**The core idea**

```ts
type Status = "loading" | "success" | "error";

function getMessage(status: Status) {
  if (status === "loading") return "Loading...";
  if (status === "error") return "Something went wrong.";
  return "Done!";
}
```

Narrowing is TypeScript tracking, inside each `if` branch, which possibilities are still on the table. Inside `if (status === "loading")`, TypeScript knows `status` can only be `"loading"` there — that's narrowing happening automatically as you write ordinary conditional code.

**Try it yourself**

Write a type `Result` that's either `{ status: "success"; data: string }` or `{ status: "error"; message: string }`. Write a function that takes a `Result` and returns the right string depending on which shape it actually is — TypeScript should stop you from accessing `data` inside the error branch, since it isn't there.

**A mistake beginners actually make**

Reaching for `as` to force a type (`value as User`) to silence an error instead of actually narrowing it with a real check. This tells TypeScript "trust me," which defeats the safety you're using TypeScript for in the first place — it should be a rare, deliberate escape hatch, not a habit.

---

### Lesson 4 — Typing Functions & Basic Generics

**Why this matters**

Typing a function's parameters and return value is where TypeScript pays off the most directly — it catches the exact class of bug where you call something with the wrong arguments. Generics extend this to functions that work the same way regardless of what type of data they're handling.

**The core idea**

```ts
function double(n: number): number {
  return n * 2;
}

// Generic — works for any type T, and TypeScript still knows exactly which one
function firstItem<T>(items: T[]): T {
  return items[0];
}

firstItem([1, 2, 3]);        // TypeScript knows this returns a number
firstItem(["a", "b", "c"]);  // TypeScript knows this returns a string
```

The `<T>` is a placeholder for "whatever type gets passed in." You don't need to write many generic functions yourself yet — but you'll use generic types constantly (React's `useState<string>()` is one you'll meet very soon), so recognizing the syntax matters more right now than mastering it.

**Try it yourself**

Write a typed function `getProperty(user: User, key: keyof User)` that safely returns a property from a `User` object. Don't worry if `keyof` feels unfamiliar — look it up, try it, and see what TypeScript does when you pass a key that doesn't exist on `User`.

**A mistake beginners actually make**

Avoiding generics entirely because the syntax looks intimidating, even in cases (like a reusable helper function) where they're the actual right tool. You'll get comfortable with them mostly by reading other people's generic code before you write much of your own — that's a normal way in, not a shortcut.

---

## Assignment: Convert GitHub User Lookup to TypeScript

**Instructions:**

Take your GitHub User Lookup project from JavaScript Fundamentals and convert it to TypeScript.

**Requirements:**
- Rename your JS file(s) to `.ts` and get it compiling with no type errors.
- Write a real interface for the shape of data GitHub's API actually returns (at minimum: `login`, `name`, `bio`, `public_repos`, `avatar_url`).
- Type your fetch function's return value using that interface — don't leave it as `any`.
- Handle the "not found" case using a union type or explicit narrowing, not just an untyped `if`.

**What to submit:**
- A GitHub repo link (same repo, new commits, is fine).
- A deployed URL if your setup supports it, otherwise confirmation it builds and runs locally with no type errors.
- In your notes: one place where TypeScript caught a real mistake you didn't know you'd made while converting.
