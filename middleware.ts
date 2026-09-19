import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Route → minimum roles allowed. Checked in order; first match wins.
// Admin is treated as a superset of Mentor for MVP simplicity per
// the BRD's "Mentor and Admin can initially be the same person"
// note — adjust if that assumption changes.
const ROUTE_RULES: { prefix: string; roles: Array<"LEARNER" | "MENTOR" | "ADMIN"> }[] = [
  { prefix: "/admin", roles: ["ADMIN"] },
  { prefix: "/mentor", roles: ["MENTOR", "ADMIN"] },
  { prefix: "/learner", roles: ["LEARNER"] },
];

const PUBLIC_PATHS = ["/", "/login", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role is verified server-side again in each route group's layout —
  // middleware only reads the session cookie's role claim for a fast
  // redirect, it is NOT the authorization boundary by itself.
  const rule = ROUTE_RULES.find((r) => pathname.startsWith(r.prefix));
  if (rule) {
    const role = request.cookies.get("role")?.value;
    if (!role || !rule.roles.includes(role as "LEARNER" | "MENTOR" | "ADMIN")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
