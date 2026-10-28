import { request, type FullConfig } from "@playwright/test";

/**
 * Warm-up for the cold `next dev` server Playwright starts.
 *
 * The first request to each route compiles it on demand, which on a slow
 * machine can eat most of a test's timeout and made the first spec flaky. This
 * signs in as each seeded role and GETs the routes the specs use, so the
 * compiles happen here instead. Read-only: it only creates sessions, and none
 * of these pages writes. Best effort: a failure is logged, never thrown, so a
 * problem here shows up as the real test failure rather than hiding it.
 */

const seedPassword = process.env.SEED_USER_PASSWORD ?? process.env.SEED_PASSWORD ?? "set-a-strong-seed-password";
const REQUEST_TIMEOUT = 180_000;

const ROLES = [
  {
    email: "trainee@example.com",
    paths: ["/learner/dashboard", "/learner/roadmap", "/learner/roadmap/developer-orientation"],
    // Linked from the module page, so the slugs never need to be listed here.
    follow: ["/learner/roadmap/developer-orientation/"],
  },
  { email: "mentor@example.com", paths: ["/mentor/dashboard"], follow: [] as string[] },
  { email: "admin@example.com", paths: ["/admin/dashboard"], follow: [] as string[] },
];

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL;
  if (!baseURL) return;
  const started = Date.now();
  const failures: string[] = [];

  const warm = async (ctx: Awaited<ReturnType<typeof request.newContext>>, p: string) => {
    const res = await ctx.get(p, { timeout: REQUEST_TIMEOUT });
    if (!res.ok()) failures.push(`${p} -> ${res.status()}`);
    return res.ok() ? await res.text() : "";
  };

  const anon = await request.newContext({ baseURL });
  try {
    await warm(anon, "/login");
  } catch (e) {
    failures.push(`/login -> ${(e as Error).message}`);
  }
  await anon.dispose();

  for (const role of ROLES) {
    const ctx = await request.newContext({ baseURL, extraHTTPHeaders: { origin: baseURL } });
    try {
      const login = await ctx.post("/api/auth/sign-in/email", {
        data: { email: role.email, password: seedPassword },
        timeout: REQUEST_TIMEOUT,
      });
      if (!login.ok()) {
        failures.push(`sign-in ${role.email} -> ${login.status()}`);
        continue;
      }
      let moduleHtml = "";
      for (const p of role.paths) moduleHtml = (await warm(ctx, p)) || moduleHtml;
      for (const prefix of role.follow) {
        const links = [...moduleHtml.matchAll(/href="([^"]+)"/g)].flatMap((m) => (m[1] ? [m[1]] : [])).filter((h) => h.startsWith(prefix));
        const lesson = links.find((h) => !h.endsWith("/assignment"));
        const assignment = links.find((h) => h.endsWith("/assignment"));
        for (const h of [lesson, assignment]) if (h) await warm(ctx, h);
      }
    } catch (e) {
      failures.push(`${role.email}: ${(e as Error).message}`);
    } finally {
      await ctx.dispose();
    }
  }

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    failures.length
      ? `[e2e warm-up] ${secs}s, problems (tests will still run):\n  ${failures.join("\n  ")}`
      : `[e2e warm-up] routes compiled in ${secs}s`
  );
}
