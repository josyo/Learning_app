import { PrismaClient } from "@prisma/client";
import { auth } from "../lib/auth";
import { NO_DATABASE_MESSAGE, describeTarget, noDatabaseConfigured, parseDbTarget } from "../lib/db-targets";
import { FRONTEND_NEXTJS_MODULES } from "./curriculum-data";

const db = new PrismaClient();

async function seedFrontendNextjsPath(traineeId: string, mentorId: string) {
  const path = await db.learningPath.upsert({
    where: { slug: "frontend-nextjs" },
    update: {},
    create: {
      slug: "frontend-nextjs",
      name: "Frontend Development / Next.js",
      description:
        "From fundamentals to practical Next.js development, ending in a mentor-reviewed capstone.",
      published: true,
    },
  });

  // Create modules first, then wire up prerequisites in a second
  // pass — prerequisites reference other modules by slug, so all
  // rows need to exist before any ModulePrerequisite is created.
  const moduleBySlug = new Map<string, { id: string }>();

  for (const [index, m] of FRONTEND_NEXTJS_MODULES.entries()) {
    const moduleRow = await db.module.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        slug: m.slug,
        title: m.title,
        description: m.description,
        published: true,
      },
    });
    moduleBySlug.set(m.slug, moduleRow);

    await db.pathModule.upsert({
      where: { pathId_moduleId: { pathId: path.id, moduleId: moduleRow.id } },
      update: { order: index },
      create: { pathId: path.id, moduleId: moduleRow.id, order: index },
    });
  }

  for (const m of FRONTEND_NEXTJS_MODULES) {
    const moduleRow = moduleBySlug.get(m.slug)!;
    for (const requiredSlug of m.requires) {
      const requiredModule = moduleBySlug.get(requiredSlug)!;
      await db.modulePrerequisite.upsert({
        where: {
          moduleId_requiredModuleId: {
            moduleId: moduleRow.id,
            requiredModuleId: requiredModule.id,
          },
        },
        update: {},
        create: { moduleId: moduleRow.id, requiredModuleId: requiredModule.id },
      });
    }
  }

  // Lessons and assignments are deliberately NOT seeded. Content lives in
  // content-drafts/*.md and is loaded only by `npm run import:content`, which
  // matches lessons by declared slug and archives, never deletes, what is
  // removed. The old seed deleted lessons and assignments (cascading to
  // learner progress and submissions) and re-created retired content, which
  // is how stale lessons ended up in front of learners.

  await db.enrollment.upsert({
    where: { userId_pathId: { userId: traineeId, pathId: path.id } },
    update: {},
    create: { userId: traineeId, pathId: path.id, mentorId, status: "ACTIVE" },
  });

  console.log(
    `Seeded path "${path.name}" with ${FRONTEND_NEXTJS_MODULES.length} modules (no lessons: run npm run import:content) and enrolled the trainee.`
  );
}

/**
 * Creates a seed user via Better Auth's server API (not a raw
 * db.user.create) so passwords are hashed the same way the real
 * sign-in flow expects — but only if the email doesn't already
 * exist. Safe to re-run: on a second run this just fetches and
 * returns the existing user instead of erroring.
 */
async function getOrCreateSeedUser(name: string, email: string, password: string) {
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return existing;

  const created = await auth.api.signUpEmail({ body: { name, email, password } });
  const user = await db.user.findUniqueOrThrow({ where: { id: created.user.id } });
  return user;
}

/**
 * Seed credentials are intentionally environment-driven. A public,
 * hard-coded password is never acceptable in shared or deployed
 * environments, and the seed script should fail fast if a real
 * password has not been provided.
 */
async function main() {
  if (noDatabaseConfigured(process.env)) throw new Error(`Seed refused: ${NO_DATABASE_MESSAGE}`);
  // Host and database only: the URL itself contains the password.
  console.log("Connecting to:", describeTarget(parseDbTarget(process.env.DATABASE_URL)));
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED !== "true") {
    throw new Error(
      "Seed script is disabled in production. Set ALLOW_SEED=true only for an explicitly non-production database."
    );
  }

  const sharedSeedPassword =
    process.env.SEED_USER_PASSWORD ?? process.env.SEED_PASSWORD ?? process.env.SEED_ADMIN_PASSWORD;

  if (!sharedSeedPassword || sharedSeedPassword.length < 8) {
    throw new Error(
      "Missing SEED_USER_PASSWORD. Set a strong, non-public password before running prisma/seed.ts."
    );
  }

  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? sharedSeedPassword;
  const admin = await getOrCreateSeedUser("Admin", "admin@example.com", adminPassword);
  await db.user.update({ where: { id: admin.id }, data: { role: "ADMIN" } });

  const mentorPassword = process.env.SEED_MENTOR_PASSWORD ?? sharedSeedPassword;
  const mentor = await getOrCreateSeedUser("Mentor", "mentor@example.com", mentorPassword);
  await db.user.update({ where: { id: mentor.id }, data: { role: "MENTOR" } });

  const traineePassword = process.env.SEED_TRAINEE_PASSWORD ?? sharedSeedPassword;
  const trainee = await getOrCreateSeedUser("Trainee", "trainee@example.com", traineePassword);
  await db.user.update({
    where: { id: trainee.id },
    data: { role: "LEARNER", mentorId: mentor.id },
  });

  console.log("Seeded: admin@example.com, mentor@example.com, trainee@example.com");

  await seedFrontendNextjsPath(trainee.id, mentor.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
