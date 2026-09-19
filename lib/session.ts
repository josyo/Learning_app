import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type Role = "LEARNER" | "MENTOR" | "ADMIN";

/**
 * The real authorization boundary. Middleware handles the fast
 * redirect; every role-gated layout calls this too so a route is
 * never protected by the cookie check alone.
 */
export async function requireRole(allowed: Role[]) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as { role?: Role }).role;
  if (!role || !allowed.includes(role)) {
    redirect("/unauthorized");
  }

  return session;
}

export async function signOutAndRedirectToLogin() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
