import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, createAccessControl } from "better-auth/plugins";
import { db } from "@/lib/db";

const authBaseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const authTrustedOrigins = Array.from(
  new Set(
    [
      process.env.BETTER_AUTH_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
      ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",").map((origin) => origin.trim()) ?? []),
    ].filter(Boolean) as string[]
  )
);

const appAccess = createAccessControl({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "set-email",
    "get",
    "update",
  ],
  session: ["list", "revoke", "delete"],
});

// Central auth config. Authorization (who can do what) is kept out
// of here deliberately — this file only establishes identity and
// session. Route-level role checks live in middleware.ts and in
// each route group's server components/actions.
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: authBaseURL,
  trustedOrigins: authTrustedOrigins,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "LEARNER",
        input: false, // role is set by an admin, never by the user at signup
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day of activity
  },
  plugins: [
    admin({
      defaultRole: "LEARNER",
      adminRoles: ["ADMIN"],
      roles: {
        LEARNER: appAccess.newRole({ user: [], session: [] }),
        MENTOR: appAccess.newRole({ user: ["get", "list"], session: ["list"] }),
        ADMIN: appAccess.newRole({
          user: [
            "create",
            "list",
            "set-role",
            "ban",
            "impersonate",
            "delete",
            "set-password",
            "set-email",
            "get",
            "update",
          ],
          session: ["list", "revoke", "delete"],
        }),
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
