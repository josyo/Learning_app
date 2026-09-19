import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * All content-management actions are ADMIN-only — unlike review
 * actions, mentors don't get access here. Content CRUD and
 * mentoring are deliberately separate permissions even though the
 * BRD notes one person can hold both roles early on.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");

  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN") throw new Error("Only admins can manage content");

  return session;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
