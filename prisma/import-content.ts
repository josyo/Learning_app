/**
 * Content importer.
 *
 *   npm run import:content               apply content-drafts/*.md to the database
 *   npm run import:content -- --dry-run  write nothing; report what WOULD change
 *
 * Guarantees:
 * - Everything is parsed and validated before the database is touched. Any
 *   error (bad heading, missing/duplicate slug, second assignment, unknown
 *   module file or slug, dangling media-map entry) aborts with a clear list.
 * - Lessons are matched by their declared slug, never by title.
 * - A lesson in the database but absent from its markdown is ARCHIVED, never
 *   deleted; LessonProgress is preserved and archived lessons are hidden and
 *   excluded from completion.
 * - Each module is applied in one transaction: all or nothing.
 * - Unchanged rows are not written at all.
 * - Refuses production unless ALLOW_PRODUCTION_DB_WRITE is set (see lib/db-targets.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { parse as parseEnv } from "dotenv";
import { PrismaClient, type Prisma } from "@prisma/client";
import { checkDbTarget, describeTarget, parseDbTarget, type DbEnv } from "../lib/db-targets";
import { SLOW_TX_OPTIONS, withSlowLinkParams } from "../lib/slow-link";
import { MEDIA_MAP } from "./media-map";
import { MODULE_SLUGS, loadAllModules, slugifyTitle } from "./content-source";
import type { ParsedModule } from "./content-parser";
import {
  planIsEmpty,
  planLessons,
  simulateLearnerImpact,
  type DbLesson,
  type DesiredLesson,
  type LearnerImpact,
  type LearnerModuleFacts,
  type LessonPlan,
} from "./import-plan";

const WRITE_OPERATIONS = new Set([
  "create",
  "createMany",
  "createManyAndReturn",
  "update",
  "updateMany",
  "updateManyAndReturn",
  "upsert",
  "delete",
  "deleteMany",
]);

/** In --dry-run every model write throws, so a bug here cannot write. */
function readOnly(client: PrismaClient): PrismaClient {
  return client.$extends({
    query: {
      $allModels: {
        $allOperations({ operation, model, args, query }) {
          if (WRITE_OPERATIONS.has(operation)) throw new Error(`--dry-run blocked a write: ${model}.${operation}`);
          return query(args);
        },
      },
    },
  }) as unknown as PrismaClient;
}

type AssignmentAction =
  | { kind: "none-in-file"; dbHasOne: boolean }
  | { kind: "create"; title: string; slug: string; instructions: string }
  | { kind: "update"; id: string; title: string; slug: string; instructions: string; changes: string[] }
  | { kind: "unchanged" };

interface ModulePlan {
  moduleSlug: string;
  moduleId: string;
  fileLessonCount: number;
  dbLessonCount: number;
  dbLessons: DbLesson[];
  lessons: LessonPlan;
  assignment: AssignmentAction;
  impact: LearnerImpact[];
}

function assertTarget() {
  const dotEnvPath = path.resolve(__dirname, "..", ".env");
  const dotEnv: DbEnv | null = fs.existsSync(dotEnvPath) ? parseEnv(fs.readFileSync(dotEnvPath)) : null;
  const env = { ...(dotEnv ?? {}), ...process.env } as DbEnv;
  const problems = checkDbTarget({ role: "import", env, dotEnv, vercelEnv: process.env.VERCEL_ENV });
  if (problems.length > 0) {
    console.error(`Import refused. Target: ${describeTarget(parseDbTarget(env.DATABASE_URL))}`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  // The URL the guard just validated is the URL the client will use (below),
  // so the checked target and the connected target cannot differ.
  return { label: describeTarget(parseDbTarget(env.DATABASE_URL)), databaseUrl: env.DATABASE_URL };
}

function desiredLessons(parsed: ParsedModule): DesiredLesson[] {
  return parsed.lessons.map((l, index) => {
    const media = MEDIA_MAP[l.slug];
    return {
      slug: l.slug,
      title: l.title,
      content: l.content,
      order: index,
      videoUrl: media?.videoUrl ?? null,
      // Only lessons with a resources list in the media map have their resources managed here.
      resources: media?.resources ?? null,
    };
  });
}

async function planModule(db: PrismaClient, moduleSlug: string, moduleId: string, parsed: ParsedModule): Promise<ModulePlan> {
  const rows = await db.lesson.findMany({ where: { moduleId }, include: { resources: true }, orderBy: { order: "asc" } });
  const dbLessons: DbLesson[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    content: r.content,
    order: r.order,
    required: r.required,
    videoUrl: r.videoUrl,
    archivedAt: r.archivedAt,
    resources: r.resources.map((x) => ({ label: x.label, url: x.url })),
  }));
  const lessons = planLessons(desiredLessons(parsed), dbLessons);

  const existingAssignment = await db.assignment.findFirst({ where: { moduleId }, orderBy: { order: "asc" } });
  let assignment: AssignmentAction;
  if (!parsed.assignment) {
    assignment = { kind: "none-in-file", dbHasOne: Boolean(existingAssignment) };
  } else {
    const slug = parsed.assignment.slug ?? slugifyTitle(parsed.assignment.title);
    const next = { title: parsed.assignment.title, slug, instructions: parsed.assignment.instructions };
    if (!existingAssignment) assignment = { kind: "create", ...next };
    else {
      const changes: string[] = [];
      if (existingAssignment.title !== next.title) changes.push("title");
      if (existingAssignment.slug !== next.slug) changes.push("slug");
      if (existingAssignment.instructions !== next.instructions) changes.push("instructions");
      assignment = changes.length ? { kind: "update", id: existingAssignment.id, ...next, changes } : { kind: "unchanged" };
    }
  }

  // Learner impact: who is enrolled on a path containing this module.
  const [enrollments, progress, submissions, overrides] = await Promise.all([
    db.enrollment.findMany({
      where: { status: "ACTIVE", path: { pathModules: { some: { moduleId } } } },
      select: { userId: true, user: { select: { name: true } } },
    }),
    db.lessonProgress.findMany({ where: { completed: true, lesson: { moduleId } }, select: { userId: true, lessonId: true } }),
    db.submission.findMany({ where: { assignment: { moduleId } }, orderBy: { createdAt: "desc" }, select: { userId: true, status: true } }),
    db.moduleOverride.findMany({ where: { moduleId }, select: { userId: true, action: true } }),
  ]);
  const hasAssignment = Boolean(existingAssignment || parsed.assignment);
  const learners: LearnerModuleFacts[] = enrollments.map((e) => ({
    userId: e.userId,
    name: e.user.name,
    completedLessonIds: new Set(progress.filter((p) => p.userId === e.userId).map((p) => p.lessonId)),
    hasAssignment,
    latestSubmissionStatus: submissions.find((s) => s.userId === e.userId)?.status ?? null,
    override: overrides.find((o) => o.userId === e.userId)?.action ?? null,
  }));

  return {
    moduleSlug,
    moduleId,
    fileLessonCount: parsed.lessons.length,
    dbLessonCount: dbLessons.length,
    dbLessons,
    lessons,
    assignment,
    impact: simulateLearnerImpact(lessons, dbLessons, learners),
  };
}

const list = (xs: string[]) => (xs.length ? xs.join(", ") : "(none)");
const state = (s: { completed: boolean; started: boolean }) => (s.completed ? "complete" : s.started ? "in progress" : "not started");

function report(p: ModulePlan): string {
  const l = p.lessons;
  const out: string[] = [];
  out.push(`\n== ${p.moduleSlug}   (${p.fileLessonCount} lessons in file, ${p.dbLessonCount} rows in database)`);
  out.push(`  create:    ${list(l.create.map((c) => c.slug))}`);
  out.push(`  update:    ${l.update.length ? l.update.map((u) => `${u.slug} [${u.changes.join(", ")}]`).join("; ") : "(none)"}`);
  out.push(`  archive:   ${l.archive.length ? l.archive.map((a) => `${a.slug} (progress kept)`).join(", ") : "(none)"}`);
  out.push(`  untouched: ${l.unchanged.length} lesson(s)${l.stillArchived.length ? `; already archived: ${l.stillArchived.join(", ")}` : ""}`);
  const a = p.assignment;
  out.push(
    `  assignment: ${
      a.kind === "create" ? `create "${a.title}"`
      : a.kind === "update" ? `update "${a.title}" [${a.changes.join(", ")}]`
      : a.kind === "unchanged" ? "untouched"
      : a.dbHasOne ? "none in file; the database one is left as is"
      : "none in file or database"
    }`
  );
  const changed = p.impact.filter((i) => i.changes);
  if (p.impact.length === 0) out.push("  learners:  no active enrollments");
  else if (changed.length === 0) out.push(`  learners:  no change for any of ${p.impact.length} enrolled learner(s) (${p.impact.map((i) => `${i.name}: ${state(i.after)}`).join("; ")})`);
  else {
    out.push(`  learners:  ${changed.length} of ${p.impact.length} would change:`);
    for (const i of changed) out.push(`    - ${i.name}: ${state(i.before)} -> ${state(i.after)}`);
    const same = p.impact.filter((i) => !i.changes);
    if (same.length) out.push(`    unchanged: ${same.map((i) => `${i.name} (${state(i.after)})`).join("; ")}`);
  }
  return out.join("\n");
}

async function applyModule(db: PrismaClient, p: ModulePlan): Promise<void> {
  const hasLessonWork = !planIsEmpty(p.lessons);
  const assignmentWork = p.assignment.kind === "create" || p.assignment.kind === "update";
  if (!hasLessonWork && !assignmentWork) return;

  await db.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const plan = p.lessons;
      const now = new Date();

      // (moduleId, order) is unique: park every row that will move on a
      // negative order first, so no intermediate state can collide.
      // Updates that only change resources never touch the lesson row or its order.
      const rowUpdates = plan.update.filter((u) => u.changes.some((c) => c !== "resources"));
      const moving = [...new Set([...rowUpdates.map((u) => u.id), ...plan.archiveOrders.keys()])];
      for (const [i, id] of moving.entries()) await tx.lesson.update({ where: { id }, data: { order: -(i + 1) } });

      for (const a of plan.archive) {
        await tx.lesson.update({ where: { id: a.id }, data: { archivedAt: now, order: plan.archiveOrders.get(a.id) as number } });
      }
      for (const [id, order] of plan.archiveOrders) {
        if (!plan.archive.some((a) => a.id === id)) await tx.lesson.update({ where: { id }, data: { order } });
      }

      for (const u of plan.update) {
        const d = u.desired;
        if (rowUpdates.includes(u)) {
          await tx.lesson.update({
            where: { id: u.id },
            data: { title: d.title, content: d.content, order: d.order, videoUrl: d.videoUrl, required: true, archivedAt: null },
          });
        }
        if (d.resources !== null && u.changes.includes("resources")) {
          await tx.lessonResource.deleteMany({ where: { lessonId: u.id } });
          for (const r of d.resources) await tx.lessonResource.create({ data: { lessonId: u.id, label: r.label, url: r.url } });
        }
      }

      for (const d of plan.create) {
        const created = await tx.lesson.create({
          data: { moduleId: p.moduleId, slug: d.slug, title: d.title, content: d.content, order: d.order, videoUrl: d.videoUrl, required: true },
        });
        for (const r of d.resources ?? []) await tx.lessonResource.create({ data: { lessonId: created.id, label: r.label, url: r.url } });
      }

      const a = p.assignment;
      if (a.kind === "create") {
        await tx.assignment.create({ data: { moduleId: p.moduleId, slug: a.slug, title: a.title, instructions: a.instructions, order: 0 } });
      } else if (a.kind === "update") {
        await tx.assignment.update({ where: { id: a.id }, data: { title: a.title, slug: a.slug, instructions: a.instructions } });
      }
    },
    // Explicit limits for a slow link (lib/slow-link.ts): every statement here
    // is a network round trip, and Prisma's default is 5 s for the whole thing.
    SLOW_TX_OPTIONS
  );
}

async function main() {
  const args = process.argv.slice(2);
  const unknown = args.filter((a) => a !== "--dry-run");
  if (unknown.length) {
    console.error(`Unknown argument(s): ${unknown.join(" ")}\nUsage: import-content.ts [--dry-run]`);
    process.exit(2);
  }
  const dryRun = args.includes("--dry-run");

  const { label: target, databaseUrl } = assertTarget();
  console.log(`${dryRun ? "DRY RUN (nothing will be written)" : "IMPORT"} -> ${target}`);

  // 1. Validate everything before any database access.
  const loaded = loadAllModules();
  for (const w of loaded.warnings) console.warn(`warning: ${w}`);
  if (loaded.errors.length > 0) {
    console.error(`\nAborting: ${loaded.errors.length} problem(s) in the content files. Nothing was read from or written to the database.\n`);
    for (const e of loaded.errors) console.error(e + "\n");
    process.exit(1);
  }

  // datasourceUrl = the guard-checked URL, with connect/pool timeouts raised.
  const base = new PrismaClient({ datasourceUrl: withSlowLinkParams(databaseUrl) });
  const db = dryRun ? readOnly(base) : base;
  try {
    // 2. Every module slug must exist in the database.
    const rows = await db.module.findMany({ where: { slug: { in: [...MODULE_SLUGS] } }, select: { id: true, slug: true } });
    const idBySlug = new Map(rows.map((r) => [r.slug, r.id]));
    const missing = MODULE_SLUGS.filter((s) => !idBySlug.has(s));
    if (missing.length) {
      console.error(`\nAborting: unknown module slug(s) with no Module row in the database: ${missing.join(", ")}. Run the curriculum seed first. Nothing was written.`);
      process.exit(1);
    }

    // 3. Plan every module (read-only), then report.
    const plans: ModulePlan[] = [];
    for (const slug of MODULE_SLUGS) {
      const parsed = loaded.modules.get(slug) as ParsedModule;
      const plan = await planModule(db, slug, idBySlug.get(slug) as string, parsed);
      plans.push(plan);
      console.log(report(plan));
    }

    const total = (f: (p: ModulePlan) => number) => plans.reduce((n, p) => n + f(p), 0);
    console.log(
      `\nSummary: create ${total((p) => p.lessons.create.length)}, update ${total((p) => p.lessons.update.length)}, archive ${total((p) => p.lessons.archive.length)}, untouched ${total((p) => p.lessons.unchanged.length)} lesson(s); ` +
        `${total((p) => p.impact.filter((i) => i.changes).length)} learner/module state change(s).`
    );

    if (dryRun) {
      console.log("\nDry run complete. Nothing was written.");
      return;
    }

    // 4. Apply, one transaction per module.
    for (const p of plans) {
      await applyModule(db, p);
      console.log(`applied ${p.moduleSlug}`);
    }
    console.log("\nImport complete.");
  } finally {
    await base.$disconnect();
  }
}

main().catch((e) => {
  console.error(String(e?.message ?? e).replace(/postgres(ql)?:\/\/\S+/g, "<url-redacted>"));
  process.exit(1);
});
