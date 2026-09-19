import { describe, it, expect, vi, beforeEach } from "vitest";

// next/headers' headers() requires Next's request-scoped AsyncLocalStorage
// context, which doesn't exist under plain Vitest — mock it to a no-op.
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

const getSessionMock = vi.fn();
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: (...args: unknown[]) => getSessionMock(...args) } },
}));

import { requireAdmin, slugify } from "./require-admin";

describe("requireAdmin", () => {
  beforeEach(() => {
    getSessionMock.mockReset();
  });

  it("throws when there is no session", async () => {
    getSessionMock.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toThrow("Not authenticated");
  });

  it("throws for a LEARNER session", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "u1", role: "LEARNER" } });
    await expect(requireAdmin()).rejects.toThrow("Only admins can manage content");
  });

  it("throws for a MENTOR session — mentoring and content admin are separate permissions", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "u1", role: "MENTOR" } });
    await expect(requireAdmin()).rejects.toThrow("Only admins can manage content");
  });

  it("succeeds and returns the session for an ADMIN session", async () => {
    const session = { user: { id: "u1", role: "ADMIN" } };
    getSessionMock.mockResolvedValue(session);
    await expect(requireAdmin()).resolves.toBe(session);
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Frontend Development / Next.js")).toBe("frontend-development-next-js");
  });

  it("trims leading/trailing hyphens produced by punctuation", () => {
    expect(slugify("  --Hello World!--  ")).toBe("hello-world");
  });

  it("returns an empty string for input with no letters or numbers", () => {
    expect(slugify("!!!")).toBe("");
  });
});
