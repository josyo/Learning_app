import { PrismaClient } from "@prisma/client";
import { checkRuntimeTarget } from "./db-targets";

// Tripwire: production data is reachable only from a Vercel Production
// deployment. Preview deployments and local `next dev` / `next start` must
// point at the dev branch, so a mis-set DATABASE_URL fails loudly here
// instead of quietly reading or writing real trainee data.
const targetProblems = checkRuntimeTarget(process.env, process.env.VERCEL_ENV);
if (targetProblems.length > 0) {
  throw new Error(`Database target refused: ${targetProblems.join(" ")}`);
}

// Standard Next.js dev-mode singleton — prevents exhausting the
// Postgres connection pool from hot-reload creating a new
// PrismaClient on every file change.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
