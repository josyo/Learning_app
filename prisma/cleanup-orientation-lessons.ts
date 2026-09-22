import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * One-time cleanup for the Developer Orientation content rewrite.
 * The new content's lesson titles changed enough that two of the
 * three original lessons got new slugs — the normal import script
 * upserts by slug, so it would create new rows alongside these
 * without ever removing them, leaving orphaned duplicates. This
 * deletes those two specifically, by their known old slugs, before
 * you run the normal import.
 *
 * "how-assignments-and-reviews-work" is deliberately NOT listed here
 * — its slug is unchanged in the new content, so the normal import's
 * upsert already updates it in place and preserves any LessonProgress
 * on it. Only run this once; running it again after the real import
 * is a no-op (the old slugs won't exist to find).
 */
const ORPHANED_SLUGS = ["your-toolchain", "project-structure-tour"];

async function main() {
  const module = await db.module.findUnique({ where: { slug: "developer-orientation" } });
  if (!module) {
    console.error("No developer-orientation module found — nothing to clean up.");
    process.exit(1);
  }

  for (const slug of ORPHANED_SLUGS) {
    const lesson = await db.lesson.findUnique({
      where: { moduleId_slug: { moduleId: module.id, slug } },
      include: { progress: true },
    });

    if (!lesson) {
      console.log(`${slug}: not found — already cleaned up or never existed here.`);
      continue;
    }

    if (lesson.progress.length > 0) {
      console.log(
        `${slug}: deleting — this resets progress for ${lesson.progress.length} learner(s) on this specific lesson (expected, per the content rewrite).`
      );
    }

    await db.lesson.delete({ where: { id: lesson.id } });
    console.log(`${slug}: deleted.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
