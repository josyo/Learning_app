# Module: JavaScript Fundamentals

*Variables, functions, arrays, objects, iteration, modules, DOM, async/await, fetch, error handling. Builds on CSS & Responsive UI.*

### Lesson 1 — Variables, Data Types & Functions

**Why this matters**

Everything else in this module — arrays, the DOM, fetching data — is built out of variables and functions. Get comfortable with these two and the rest of JavaScript stops feeling like new syntax and starts feeling like new combinations of things you already know.

**The core idea**

Three ways to declare a variable, and only one you should reach for by default:

```js
let count = 0;      // can be reassigned later — use this when a value will change
const name = "Ada";  // cannot be reassigned — use this by default
var old = "avoid";   // legacy — has confusing scoping rules, don't use it in new code
```

Start with `const` for everything. Only switch to `let` when you hit a case where you genuinely need to reassign the variable (a counter, an accumulator). This isn't a style preference — `const` failing loudly when you accidentally try to reassign something is a real bug-prevention tool.

Functions are named, reusable blocks of logic. The modern way to write one:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function — same thing, more common in modern codebases
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Arrow function, shorthand for a single expression
const greet = (name) => `Hello, ${name}!`;
```

That backtick syntax — `` `Hello, ${name}!` `` — is a template literal. It lets you embed variables directly in a string instead of gluing pieces together with `+`. You'll use this constantly.

**Try it yourself**

Write a function `formatPrice(amount)` that takes a number and returns a string like `"$24.00"` (hint: `.toFixed(2)` rounds a number to 2 decimal places and returns it as a string). Call it with a few different numbers, including one with more than 2 decimal places, and check the output makes sense.

**A mistake beginners actually make**

Using `==` instead of `===`. `==` converts types before comparing (`"5" == 5` is `true`), which causes subtle bugs. `===` compares without converting, and it's what you should use essentially always. If you find yourself needing `==`, that's usually a sign to fix the underlying data instead.

---

### Lesson 2 — Arrays & Objects

**Why this matters**

Almost all real data — a list of users, a product's details, an API response — comes as arrays and objects. Fluency here is what makes everything downstream (rendering lists in React, working with API responses) feel natural instead of like fighting the data.

**The core idea**

An array is an ordered list. An object is a labeled collection of values (key-value pairs):

```js
const fruits = ["apple", "banana", "cherry"];

const user = {
  name: "Ada Lovelace",
  age: 28,
  isAdmin: false,
};
```

The array methods that matter most day to day — `.map()`, `.filter()`, `.find()` — all take a function and run it against every item, without you writing a manual loop:

```js
const prices = [10, 25, 8, 40];

const withTax = prices.map((price) => price * 1.1);      // transforms every item
const expensive = prices.filter((price) => price > 20);   // keeps only matching items
const firstCheap = prices.find((price) => price < 10);    // returns the first match, or undefined
```

These three methods are worth genuinely memorizing the shape of, because you'll write some version of them in nearly every component you ever build in React.

**Try it yourself**

Given this array: `const users = [{name: "Ada", active: true}, {name: "Grace", active: false}, {name: "Alan", active: true}]` — write one line using `.filter()` that returns only the active users, and one line using `.map()` that returns just an array of their names.

**A mistake beginners actually make**

Confusing `.map()` (returns a new array, same length, transformed) with `.forEach()` (runs a function for each item, returns nothing — useful for side effects like logging, not for building a new array). Using `.forEach()` when you meant `.map()` is a common source of "why is this variable undefined" bugs.

---

### Lesson 3 — Loops & Iteration

**Why this matters**

Array methods (`.map()`, `.filter()`) cover most real cases, but you'll still hit situations — iterating over object keys, breaking early out of a search, working with data that isn't an array — where a plain loop is the right tool. Knowing both means picking the clearest option instead of forcing everything into one pattern.

**The core idea**

The loop you'll reach for most:

```js
for (const fruit of fruits) {
  console.log(fruit);
}
```

`for...of` iterates over the values of an array directly — no index-juggling required. You'll see the older `for (let i = 0; i < arr.length; i++)` style in a lot of existing code, and it's still fine to know, but prefer `for...of` in anything you write from scratch.

For objects:

```js
for (const key in user) {
  console.log(key, user[key]);
}
```

**Try it yourself**

Write a `for...of` loop that goes through an array of numbers and logs only the even ones (hint: `number % 2 === 0` checks for even). Then rewrite the same logic using `.filter()` and compare which one reads more clearly to you — there's no wrong answer here, just build the instinct for when each fits.

**A mistake beginners actually make**

Reaching for a manual loop out of habit when `.filter()`/`.map()`/`.find()` would say the same thing in less code and with less room for an off-by-one bug. If you're writing a loop just to build a new filtered array, that's almost always a sign `.filter()` is the better fit.

---

### Lesson 4 — The DOM: Reading and Changing a Page

**Why this matters**

Before React, this is how JavaScript actually changes what's on screen — selecting an element and updating it. Even though you'll mostly let React handle this for you going forward, understanding what's happening underneath is what makes React's model click later instead of feeling like magic.

**The core idea**

Select an element, then read or change it:

```js
const button = document.querySelector("#submit-btn");
const heading = document.querySelector("h1");

heading.textContent = "Updated!";
button.addEventListener("click", () => {
  heading.textContent = "You clicked it!";
});
```

`querySelector` takes any CSS selector — `#id`, `.class`, `tag` — and returns the first match. `addEventListener` is how you respond to things happening: clicks, form submissions, key presses.

**Try it yourself**

Add a button to any HTML page and a paragraph below it. Write JavaScript that increments a counter and updates the paragraph's text every time the button is clicked. This exact pattern — state that changes, UI that updates in response — is the entire idea behind React, just done manually.

**A mistake beginners actually make**

Trying to select an element before the page has finished loading, getting `null` back, and then getting a confusing error trying to call a method on it. Put your `<script>` tag at the end of the `<body>`, or wrap your code in a `DOMContentLoaded` listener, so the elements actually exist by the time your JavaScript runs.

---

### Lesson 5 — Async JavaScript: Promises, async/await & fetch

**Why this matters**

Fetching data from a server takes time — you can't just wait around, freezing the whole page while you do it. Async JavaScript is how you say "go get this, and run this code once it's back" without blocking everything else. This is the single most important concept for anything you'll build with real data, including every Next.js app from here on.

**The core idea**

`fetch` makes a network request and returns a Promise — a placeholder for a value that isn't ready yet:

```js
async function getUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}
```

`async` marks a function as one that can use `await` inside it. `await` pauses that function (not the whole page) until the Promise resolves. This is the same idea as the old `.then()` chaining syntax you might see in older code — `async`/`await` is just a cleaner way to write it.

**Try it yourself**

Write an async function that fetches data from `https://api.github.com/users/octocat` and logs the user's `name` and `public_repos` to the console. Run it and confirm you get real data back.

**A mistake beginners actually make**

Forgetting `await` in front of `fetch` or `.json()`, and then trying to use the result immediately — you get a Promise object instead of the actual data, and confusing errors follow. If something looks like `Promise {<pending>}` in your console, that's the tell.

---

### Lesson 6 — Error Handling

**Why this matters**

Networks fail. APIs go down. Users type invalid input. Code that only works in the happy path breaks the moment it meets the real world — and unhandled errors in async code fail silently in ways that are genuinely hard to debug without knowing what to look for.

**The core idea**

Wrap anything that can fail in `try`/`catch`:

```js
async function getUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null;
  }
}
```

Notice the `response.ok` check — `fetch` only rejects (triggers `catch`) on genuine network failure. A 404 or 500 response is still a "successful" fetch as far as `fetch` is concerned, so you have to check the status yourself.

**Try it yourself**

Take your GitHub-fetching function from the last lesson and add error handling: fetch a username that doesn't exist (like `"this-user-should-not-exist-12345"`) and confirm your `catch` block runs and handles it gracefully instead of crashing.

**A mistake beginners actually make**

Catching an error and doing nothing with it (an empty `catch` block), which makes real bugs invisible. At minimum, log what happened — silently swallowing errors is worse than not handling them at all, because it hides the problem instead of surfacing it.

---

## Assignment: GitHub User Lookup

**Instructions:**

Build a small interactive page: a text input where someone types a GitHub username, a button, and a results area that shows that user's avatar, name, bio, and public repo count once fetched.

**Requirements:**
- Uses `fetch` with `async`/`await` against the real GitHub API (`https://api.github.com/users/{username}` — no auth needed for basic lookups).
- Shows a loading state while the request is in flight.
- Handles the "user not found" case gracefully — a real message, not a broken page or a console error the user never sees.
- Uses `.map()`, `.filter()`, or `.find()` at least once somewhere in the logic (even something small, like filtering out empty fields before displaying them).
- Plain HTML/CSS/JavaScript only — no framework yet, that's next module.

**What to submit:**
- A GitHub repo link.
- A deployed URL.
- In your notes: what happens in your app right now if someone submits an empty username? If you haven't handled that case, that's fine — just tell your mentor you know it's a gap.
