import { describe, expect, it } from "vitest";
import { resolveAuthOrigins } from "./auth-origins";

describe("resolveAuthOrigins", () => {
  it("local: falls back to localhost and trusts nothing else", () => {
    expect(resolveAuthOrigins({})).toEqual({ baseURL: "http://localhost:3000", trustedOrigins: [] });
  });

  it("production: identical to the previous behaviour (BETTER_AUTH_URL is the base URL)", () => {
    const r = resolveAuthOrigins({
      VERCEL_ENV: "production",
      BETTER_AUTH_URL: "https://learningapp-zeta.vercel.app",
      VERCEL_URL: "learningapp-abc123.vercel.app",
      VERCEL_BRANCH_URL: "learningapp-git-main-x.vercel.app", // ignored in production
    });
    expect(r.baseURL).toBe("https://learningapp-zeta.vercel.app");
    expect(r.trustedOrigins).toEqual(["https://learningapp-zeta.vercel.app", "https://learningapp-abc123.vercel.app"]);
  });

  it("production: extra origins are still honoured and de-duplicated", () => {
    const r = resolveAuthOrigins({
      VERCEL_ENV: "production",
      BETTER_AUTH_URL: "https://a.example",
      BETTER_AUTH_TRUSTED_ORIGINS: "https://a.example, https://b.example",
    });
    expect(r.trustedOrigins).toEqual(["https://a.example", "https://b.example"]);
  });

  it("preview: the branch URL is the base URL and both hosts are trusted", () => {
    const r = resolveAuthOrigins({
      VERCEL_ENV: "preview",
      VERCEL_BRANCH_URL: "learningapp-git-remote-setup-check-x.vercel.app",
      VERCEL_URL: "learningapp-abc123-x.vercel.app",
    });
    expect(r.baseURL).toBe("https://learningapp-git-remote-setup-check-x.vercel.app");
    expect(r.trustedOrigins).toEqual([
      "https://learningapp-git-remote-setup-check-x.vercel.app",
      "https://learningapp-abc123-x.vercel.app",
    ]);
  });

  it("preview: a fixed BETTER_AUTH_URL (e.g. the production URL) is neither base URL nor trusted", () => {
    const r = resolveAuthOrigins({
      VERCEL_ENV: "preview",
      BETTER_AUTH_URL: "https://learningapp-zeta.vercel.app",
      VERCEL_URL: "learningapp-abc123-x.vercel.app",
    });
    expect(r.baseURL).toBe("https://learningapp-abc123-x.vercel.app");
    expect(r.trustedOrigins).not.toContain("https://learningapp-zeta.vercel.app");
  });

  it("preview without any Vercel host (e.g. a local run with VERCEL_ENV set) falls back like local", () => {
    expect(resolveAuthOrigins({ VERCEL_ENV: "preview", BETTER_AUTH_URL: "http://localhost:3000" }).baseURL).toBe("http://localhost:3000");
  });
});
