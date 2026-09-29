/**
 * READ-ONLY check of what a learner sees in one module, using the app's own
 * read path (getModuleDetailForUser / getEnrolledPathState). It never logs in
 * as the learner and never writes.
 *
 *   npx tsx scripts/verify-learner-view.ts --user Praise --module developer-orientation \
 *       [--hidden toolchain-basics,project-loop]
 *
 * Prints the module's status, the lessons the learner would see (with their
 * completion), whether they can submit the assignment, and how the assignment
 * markdown renders (same GFM + no-raw-HTML configuration as components/markdown.tsx).
 * Exits 1 if the module is locked or missing, or if any --hidden slug is visible.
 *
 * Against production, lib/db.ts's tripwire refuses unless the target is
 * explicitly allowed; set ALLOW_PRODUCTION_DB_WRITE=<production host> for that
 * one command (this script only reads).
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { describeTarget, parseDbTarget } from "@/lib/db-targets";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

async function main() {
  const userName = arg("user");
  const moduleSlug = arg("module");
  const hidden = (arg("hidden") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!userName || !moduleSlug) {
    console.error("usage: verify-learner-view.ts --user <name> --module <module-slug> [--hidden slug1,slug2]");
    process.exit(2);
  }

  const rows = await db.$queryRawUnsafe<{ ep: string | null }[]>("select current_setting('neon.endpoint_id', true) as ep");
  console.log(`target: ${describeTarget(parseDbTarget(process.env.DATABASE_URL))} (server endpoint ${rows[0]?.ep ?? "unknown"})`);

  const users = await db.user.findMany({ where: { name: userName }, select: { id: true, role: true } });
  if (users.length !== 1) throw new Error(`Expected exactly one user named "${userName}", found ${users.length}.`);
  const user = users[0]!;

  const state = await getEnrolledPathState(user.id);
  const mod = state?.modules.find((m) => m.slug === moduleSlug);
  if (!mod) throw new Error(`Module "${moduleSlug}" is not visible to ${userName} (no active enrollment, or unpublished).`);

  let failed = false;
  console.log(`\n${userName} (${user.role}) / ${mod.title}: status ${mod.status}`);
  if (mod.status === "LOCKED") {
    console.log("  LOCKED: the learner gets a 404 on this module's pages.");
    failed = true;
  }
  console.log(`lessons visible: ${mod.lessons.length}`);
  for (const l of mod.lessons) console.log(`  ${l.completed ? "[x]" : "[ ]"} ${l.slug}`);
  for (const slug of hidden) {
    const visible = mod.lessons.some((l) => l.slug === slug);
    console.log(`  hidden check ${slug}: ${visible ? "VISIBLE (bad)" : "hidden (good)"}`);
    if (visible) failed = true;
  }

  const a = mod.assignment;
  if (!a) {
    console.log("\nassignment: none");
  } else {
    console.log(`\nassignment: "${a.title}" | submissions so far: ${a.submissions.length} | latest: ${a.submissions[0]?.status ?? "none"}`);
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], skipHtml: true }, a.instructions));
    const count = (re: RegExp) => (html.match(re) ?? []).length;
    console.log(`rendered: ${a.instructions.split(/\s+/).length} words | h2 ${count(/<h2>/g)} | h3 ${count(/<h3>/g)} | code blocks ${count(/<pre>/g)} | checkboxes ${count(/type="checkbox"/g)}`);
    console.log(`h2: ${[...html.matchAll(/<h2>(.*?)<\/h2>/g)].map((x) => x[1]).join(" | ")}`);
    const leaked = /&lt;!--|<!--|slug:/.test(html);
    console.log(`leaked slug directive or HTML comment: ${leaked ? "YES (bad)" : "no"}`);
    if (leaked) failed = true;
  }

  console.log(failed ? "\nRESULT: PROBLEMS FOUND" : "\nRESULT: ok");
  await db.$disconnect();
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error("ERR", String(e?.message ?? e).replace(/postgres(ql)?:\/\/\S+/g, "<url-redacted>"));
  process.exit(1);
});
