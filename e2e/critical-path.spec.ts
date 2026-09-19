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
 * Run these against a freshly seeded database:
 *   npx prisma migrate reset   (drops + re-migrates + reseeds)
 *   npm run dev                (separate terminal, or let Playwright start it)
 *   npx playwright test
 *
 * If you'd rather not reset your working dev database every time,
 * point DATABASE_URL at a separate throwaway database for this run.
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
    await login(page, "trainee");

    await page.goto("/learner/roadmap/developer-orientation");
    await expect(page.getByRole("heading", { name: "Developer Orientation" })).toBeVisible();

    // Complete every lesson listed for this module — the fixture
    // seeds exactly three (your-toolchain, how-assignments-and-reviews-work,
    // project-structure-tour). If lesson content changes, this count
    // needs to change with it.
    const lessonLinks = page.locator('a[href*="/learner/roadmap/developer-orientation/"]');
    const lessonCount = await lessonLinks.count();
    expect(lessonCount).toBeGreaterThan(0);

    for (let i = 0; i < lessonCount; i++) {
      await page.goto("/learner/roadmap/developer-orientation");
      await page.locator('a[href*="/learner/roadmap/developer-orientation/"]').nth(i).click();
      const markButton = page.getByRole("button", { name: /Mark complete/ });
      if (await markButton.isVisible()) {
        await markButton.click();
        await expect(page.getByRole("button", { name: "Mark incomplete" })).toBeVisible();
      }
    }

    // Submit the assignment
    await page.goto("/learner/roadmap/developer-orientation");
    await expect(page.getByText("Assignment: Environment setup")).toBeVisible();
    await page.getByLabel("GitHub URL").fill("https://github.com/example/hello");
    await page.getByPlaceholder(/Anything you want your mentor/).fill("Ready for review.");
    await page.getByRole("button", { name: /^Submit$/ }).click();
    await expect(page.getByText("Awaiting review")).toBeVisible();
  });
});

test.describe("Mentor critical path", () => {
  test("reviews and approves the trainee's Orientation submission", async ({ page }) => {
    await login(page, "mentor");

    await page.goto("/mentor/dashboard");
    await expect(page.getByText(/Environment setup/)).toBeVisible();
    await page.getByText(/Environment setup/).first().click();

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
