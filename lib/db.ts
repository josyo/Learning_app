import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL && process.env.LEARNING_DB_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.LEARNING_DB_DATABASE_URL;
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
