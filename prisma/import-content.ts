import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { MEDIA_MAP } from "./media-map";

const db = new PrismaClient();

/**
 * One file per module, named to match its slug exactly. Content
 * format matches what content-drafts/*.md files actually contain:
 * lessons separated by a "---" line, each starting with
 * "### Lesson N — Title", followed by a final "## Assignment: Title"
 * block. If you add a module file that doesn't follow this shape,
 * parseModuleFile will silently find 0 lessons for it — check the
 * per-module console output after running this.
 */
const MODULE_SLUGS = [
  "developer-orientation",
  "html-foundations",
  "css-responsive-ui",
  "javascript-fundamentals",
  "git-github",
  "typescript-foundations",
  "react-foundations",
  "nextjs-core",
  "data-forms-nextjs",
  "production-frontend-practices",
  "deployment-delivery",
  "capstone",
];

const CONTENT_DIR = path.join(__dirname, "..", "content-drafts");

interface ParsedLesson {
  title: string;
  content: string;
}
interface ParsedAssignment {
  title: string;
  instructions: string;
}

function parseModuleFile(raw: string): {
  lessons: ParsedLesson[];
  assignment: ParsedAssignment | null;
} {
  const blocks = raw.split(/\n---\n/).map((b) => b.trim());

  const lessons: ParsedLesson[] = [];
  let assignment: ParsedAssignment | null = null;

  for (const block of blocks) {
    const lessonMatch = block.match(/### Lesson \d+ — (.+)/);
    if (lessonMatch?.[1]) {
      const title = lessonMatch[1].trim();
      const content = block.slice(block.indexOf(lessonMatch[0]) + lessonMatch[0].length).trim();
      lessons.push({ title, content });
      continue;
    }

    const assignmentMatch = block.match(/## Assignment: (.+)/);
    if (assignmentMatch?.[1]) {
      const title = assignmentMatch[1].trim();
      const instructions = block
        .slice(block.indexOf(assignmentMatch[0]) + assignmentMatch[0].length)
        .trim();
      assignment = { title, instructions };
    }
  }

  return { lessons, assignment };
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  for (const moduleSlug of MODULE_SLUGS) {
    const filePath = path.join(CONTENT_DIR, `${moduleSlug}.md`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping ${moduleSlug} — no file at ${filePath}`);
      continue;
    }

    const moduleRow = await db.module.findUnique({ where: { slug: moduleSlug } });
    if (!moduleRow) {
      console.warn(
        `Skipping ${moduleSlug} — no Module row with this slug exists. Run the curriculum seed first.`
      );
      continue;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { lessons, assignment } = parseModuleFile(raw);

    if (lessons.length === 0) {
      console.warn(`${moduleSlug}: found 0 lessons — check the file's formatting matches the expected shape.`);
    }

    const incomingSlugs = lessons.map((lesson) => slugify(lesson.title));
    const duplicateSlugs = incomingSlugs.filter((slug, index) => incomingSlugs.indexOf(slug) !== index);
    if (duplicateSlugs.length > 0) {
      console.warn(
        `${moduleSlug}: duplicate lesson slugs detected in this file (${[...new Set(duplicateSlugs)].join(", ")}); later rows may overwrite earlier ones.`
      );
    }

    // This script is intentionally idempotent, but a module can have stale
    // rows created by prisma/seed.ts with the same slug as one of the imported
    // lessons while still carrying older order values. In that case a
    // partial "delete stale rows" sweep isn't enough: we must fully resync the
    // module's lesson list before recreating it from the current content file.
    const existingLessons = await db.lesson.findMany({
      where: { moduleId: moduleRow.id },
      select: { id: true, slug: true, order: true },
    });
    const hasOverlappingSlug = existingLessons.some((row) => incomingSlugs.includes(row.slug));
    const hasOutdatedOrder = existingLessons.some((row) => row.order >= lessons.length);
    if (existingLessons.length > 0 && (hasOverlappingSlug || hasOutdatedOrder)) {
      await db.lesson.deleteMany({ where: { moduleId: moduleRow.id } });
    } else {
      await db.lesson.deleteMany({
        where: {
          moduleId: moduleRow.id,
          NOT: {
            slug: { in: incomingSlugs },
          },
        },
      });
    }

    for (const [index, lesson] of lessons.entries()) {
      const lessonSlug = slugify(lesson.title);
      const media = MEDIA_MAP[lessonSlug];

      const savedLesson = await db.lesson.upsert({
        where: { moduleId_slug: { moduleId: moduleRow.id, slug: lessonSlug } },
        update: {
          title: lesson.title,
          content: lesson.content,
          order: index,
          required: true,
          videoUrl: media?.videoUrl ?? null,
        },
        create: {
          moduleId: moduleRow.id,
          slug: lessonSlug,
          title: lesson.title,
          content: lesson.content,
          order: index,
          required: true,
          videoUrl: media?.videoUrl ?? null,
        },
      });

      // Resync resources from the media map — delete and recreate
      // rather than trying to diff, since this script is meant to be
      // safely re-runnable and the resource list here is short.
      if (media?.resources) {
        await db.lessonResource.deleteMany({ where: { lessonId: savedLesson.id } });
        for (const r of media.resources) {
          await db.lessonResource.create({
            data: { lessonId: savedLesson.id, label: r.label, url: r.url },
          });
        }
      }
    }

    if (assignment) {
      const assignmentSlug = slugify(assignment.title);
      // A module should have at most one assignment (the rest of the
      // app assumes this — see the schema comment on Assignment).
      // Look up by moduleId, not by slug, so re-running this script
      // after editing an assignment's title updates the existing row
      // instead of creating a second one with a new slug.
      const existing = await db.assignment.findFirst({ where: { moduleId: moduleRow.id } });
      if (existing) {
        await db.assignment.update({
          where: { id: existing.id },
          data: { title: assignment.title, slug: assignmentSlug, instructions: assignment.instructions },
        });
      } else {
        await db.assignment.create({
          data: {
            moduleId: moduleRow.id,
            slug: assignmentSlug,
            title: assignment.title,
            instructions: assignment.instructions,
            order: 0,
          },
        });
      }
    }

    const withVideo = lessons.filter((l) => MEDIA_MAP[slugify(l.title)]?.videoUrl).length;
    console.log(
      `Imported ${moduleSlug}: ${lessons.length} lesson(s) (${withVideo} with video)${assignment ? ", 1 assignment" : ", no assignment found"}`
    );
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
