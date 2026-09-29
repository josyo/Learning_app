import { test, expect, type Page } from "@playwright/test";

/**
 * IMPORTANT PREREQUISITE — read before running this file.
 *
 * These tests are NOT idempotent: they submit real assignments and
 * approve/request-changes on real submissions against whatever
 * database `npm run dev` is pointed at. Running them twice against
 * the same database will behave differently the second time (e.g.
 * an assignment that's already Approved won't show a submission
 * form anymore) and some assertions will fail — that's expected,
 * not a bug in the test.
 *
 * They run only against the Neon "test" branch (see env.test.example):
 *   npm run test:e2e:setup   (guard, migrate, wipe/seed, import: test branch only)
 *   npm run test:e2e         (Playwright starts its own server on .env.test)
 *
 * Never use `prisma migrate reset` for this: it drops whatever database the
 * environment points at. The guards refuse production and the dev target.
 */

const seedPassword = process.env.SEED_USER_PASSWORD ?? process.env.SEED_PASSWORD ?? "set-a-strong-seed-password";

const CREDENTIALS = {
  trainee: { email: "trainee@example.com", password: seedPassword },
  mentor: { email: "mentor@example.com", password: seedPassword },
  admin: { email: "admin@example.com", password: seedPassword },
};

async function login(page: Page, role: keyof typeof CREDENTIALS) {
  const { email, password } = CREDENTIALS[role];
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL(/\/(learner|mentor|admin)\/dashboard/);
}

test.describe("Learner critical path", () => {
  test("completes Developer Orientation's lessons and submits its assignment", async ({ page }) => {
    // One page load per lesson (7 today) plus a cold dev-mode compile of the
    // lesson route: the default 60s is too tight, and it grows with the module.
    test.setTimeout(300_000);
    await login(page, "trainee");

    await page.goto("/learner/roadmap/developer-orientation");
    await expect(page.getByRole("heading", { name: "Developer Orientation" })).toBeVisible();

    // Complete every lesson the module lists. The count comes from the page
    // (content comes from content-drafts via import:content), so adding or
    // removing a lesson never needs a change here. The assignment link shares
    // the URL prefix, so exclude it.
    const lessonSelector = 'a[href*="/learner/roadmap/developer-orientation/"]:not([href$="/assignment"])';
    const lessonCount = await page.locator(lessonSelector).count();
    expect(lessonCount).toBeGreaterThan(0);

    for (let i = 0; i < lessonCount; i++) {
      await page.goto("/learner/roadmap/developer-orientation");
      await page.locator(lessonSelector).nth(i).click();
      // Wait for the page to settle on one of the two states BEFORE branching.
      // `isVisible()` does not wait: on a slow load it returned false, the
      // click was skipped and no lesson was ever completed (this loop was a
      // silent no-op until the test asserted on the outcome).
      const markButton = page.getByRole("button", { name: /Mark complete/ });
      const markedButton = page.getByRole("button", { name: /Mark incomplete/ });
      await expect(markButton.or(markedButton)).toBeVisible({ timeout: 30_000 });
      if (await markButton.isVisible()) {
        await markButton.click();
        await expect(markedButton).toBeVisible({ timeout: 30_000 });
      }
    }

    // Submit the assignment
    await page.goto("/learner/roadmap/developer-orientation");
    await expect(page.getByText("Assignment: Environment Check")).toBeVisible();
    // In the redesigned learner UI the submission form lives on its own page.
    await page.getByRole("link", { name: "Open assignment" }).click();
    await page.waitForURL(/\/learner\/roadmap\/developer-orientation\/assignment$/);
    await page.getByLabel("GitHub URL").fill("https://github.com/example/hello");
    await page.getByPlaceholder(/Anything you want your mentor/).fill("Ready for review.");
    await page.getByRole("button", { name: /^Submit$/ }).click();
    // The server action (insert, notification, revalidations) round-trips to a
    // remote database, so allow well over the default 5s.
    //
    // Assert on the "Submission history" section, NOT on the text "Awaiting
    // review": the assignment instructions themselves mention that phrase, so
    // a text match passes before anything was submitted (this test was a false
    // pass once the instructions were rewritten). That heading is rendered only
    // when at least one submission exists.
    await expect(page.getByRole("heading", { name: "Submission history" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Attempt 1")).toBeVisible();
  });
});

test.describe("Mentor critical path", () => {
  test("reviews and approves the trainee's Orientation submission", async ({ page }) => {
    await login(page, "mentor");

    await page.goto("/mentor/dashboard");
    await expect(page.getByText(/Environment Check/)).toBeVisible();
    await page.getByText(/Environment Check/).first().click();

    await page.waitForURL(/\/mentor\/submissions\//);
    await page.getByLabel("Feedback").fill("Nice work, welcome aboard.");
    await page.getByRole("button", { name: "Approve" }).click();
    await page.waitForURL("/mentor/dashboard");
  });
});

test.describe("Learner sees the outcome", () => {
  test("Orientation shows Completed and HTML Foundations unlocks", async ({ page }) => {
    await login(page, "trainee");
    await page.goto("/learner/roadmap");

    const orientationRow = page.locator("li", { hasText: "Developer Orientation" });
    await expect(orientationRow.getByText("Completed")).toBeVisible();

    const htmlRow = page.locator("li", { hasText: "HTML Foundations" });
    await expect(htmlRow.getByText("Locked")).not.toBeVisible();
  });
});

test.describe("Permission boundaries", () => {
  test("a learner cannot reach mentor or admin routes", async ({ page }) => {
    await login(page, "trainee");

    await page.goto("/mentor/dashboard");
    await expect(page).toHaveURL(/\/unauthorized/);

    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(/\/unauthorized/);
  });

  test("a mentor cannot reach admin routes", async ({ page }) => {
    await login(page, "mentor");

    await page.goto("/admin/paths");
    await expect(page).toHaveURL(/\/unauthorized/);
  });

  test("an unauthenticated visitor is redirected to login", async ({ page }) => {
    await page.goto("/learner/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});
