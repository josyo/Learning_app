import { describe, expect, it } from "vitest";
import { SLOW_TX_OPTIONS, withSlowLinkParams } from "./slow-link";

describe("SLOW_TX_OPTIONS", () => {
  it("is far above Prisma's 5s transaction default and 2s start wait", () => {
    expect(SLOW_TX_OPTIONS.timeout).toBe(60_000);
    expect(SLOW_TX_OPTIONS.maxWait).toBe(30_000);
  });
});

describe("withSlowLinkParams", () => {
  const base = "postgresql://u:secret@ep-x.c-10.us-east-1.aws.neon.tech/neondb";

  it("adds connect_timeout and pool_timeout", () => {
    const u = new URL(withSlowLinkParams(base) as string);
    expect(u.searchParams.get("connect_timeout")).toBe("30");
    expect(u.searchParams.get("pool_timeout")).toBe("30");
  });

  it("keeps existing parameters and the credentials intact", () => {
    const out = withSlowLinkParams(`${base}?sslmode=require&channel_binding=require`) as string;
    const u = new URL(out);
    expect(u.searchParams.get("sslmode")).toBe("require");
    expect(u.searchParams.get("channel_binding")).toBe("require");
    expect(u.username).toBe("u");
    expect(u.password).toBe("secret");
    expect(u.hostname).toBe("ep-x.c-10.us-east-1.aws.neon.tech");
    expect(u.pathname).toBe("/neondb");
  });

  it("never overrides a value the URL already sets", () => {
    const u = new URL(withSlowLinkParams(`${base}?connect_timeout=90`) as string);
    expect(u.searchParams.get("connect_timeout")).toBe("90");
    expect(u.searchParams.get("pool_timeout")).toBe("30");
  });

  it("is idempotent", () => {
    const once = withSlowLinkParams(base) as string;
    expect(withSlowLinkParams(once)).toBe(once);
  });

  it("passes through a missing or unparseable URL untouched", () => {
    expect(withSlowLinkParams(undefined)).toBeUndefined();
    expect(withSlowLinkParams("")).toBe("");
    expect(withSlowLinkParams("not a url")).toBe("not a url");
  });
});
