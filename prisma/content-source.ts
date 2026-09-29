/**
 * Loads and validates every module file BEFORE the importer touches a
 * database, so a bad file aborts the whole import with a clear message
 * instead of half-applying it.
 */
import fs from "node:fs";
import path from "node:path";
import { ContentParseError, parseModuleFile, type ParsedModule } from "./content-parser";
import { MEDIA_MAP, type MediaEntry } from "./media-map";

/** One file per module in content-drafts/, named exactly like the module slug. */
export const MODULE_SLUGS = [
  "developer-orientation",
  // "html-foundations" is deliberately NOT imported yet: the seed content in the
  // database is being kept until the module is rewritten (the current draft
  // scored 8-9/28 in docs/audits/). It returns to this list with the rewrite.
  // Its draft is still parsed and validated (see HELD_MODULE_SLUGS).
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
] as const;

/**
 * Modules whose draft file exists and is validated on every run, but which the
 * importer neither reads from nor writes to the database. Move a slug back to
 * MODULE_SLUGS to import it.
 */
export const HELD_MODULE_SLUGS = ["html-foundations"] as const;

export const CONTENT_DIR = path.join(__dirname, "..", "content-drafts");

export interface LoadedContent {
  modules: Map<string, ParsedModule>;
  warnings: string[];
  /** Everything wrong, across all files. Empty means safe to proceed. */
  errors: string[];
}

export function slugifyTitle(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function validateMediaMap(media: Record<string, MediaEntry>, modules: Map<string, ParsedModule>): string[] {
  const errors: string[] = [];
  const owner = new Map<string, string>();
  for (const [moduleSlug, parsed] of modules) {
    for (const l of parsed.lessons) {
      const prior = owner.get(l.slug);
      if (prior) {
        errors.push(
          `Lesson slug "${l.slug}" is used in both ${prior} and ${moduleSlug}. media-map.ts is keyed by lesson slug alone, so slugs must be unique across the whole path.`
        );
      }
      owner.set(l.slug, moduleSlug);
    }
  }
  for (const key of Object.keys(media)) {
    if (!owner.has(key)) {
      errors.push(`media-map.ts has an entry for "${key}", but no lesson declares that slug. A rename or typo would silently drop the video.`);
    }
  }
  return errors;
}

export function loadAllModules(
  dir: string = CONTENT_DIR,
  media: Record<string, MediaEntry> = MEDIA_MAP,
  moduleSlugs: readonly string[] = MODULE_SLUGS,
  heldSlugs: readonly string[] = HELD_MODULE_SLUGS
): LoadedContent {
  const errors: string[] = [];
  const warnings: string[] = [];
  const modules = new Map<string, ParsedModule>();

  const onDisk = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  for (const f of onDisk) {
    const slug = f.replace(/\.md$/, "");
    if (!moduleSlugs.includes(slug) && !heldSlugs.includes(slug)) {
      errors.push(`content-drafts/${f} is not a known module slug. Known: ${[...moduleSlugs, ...heldSlugs].join(", ")}. (A misspelt filename would otherwise be ignored.)`);
    }
  }

  // Held modules: validated (so the draft cannot rot) but never imported.
  const held = new Map<string, ParsedModule>();
  for (const slug of heldSlugs) {
    const file = path.join(dir, `${slug}.md`);
    if (!fs.existsSync(file)) continue; // a held module needs no file
    try {
      held.set(slug, parseModuleFile(fs.readFileSync(file, "utf-8"), `content-drafts/${slug}.md (held, not imported)`));
    } catch (e) {
      if (e instanceof ContentParseError) errors.push(e.message);
      else throw e;
    }
  }

  for (const slug of moduleSlugs) {
    const file = path.join(dir, `${slug}.md`);
    if (!fs.existsSync(file)) {
      errors.push(`Missing content-drafts/${slug}.md for module "${slug}".`);
      continue;
    }
    try {
      const parsed = parseModuleFile(fs.readFileSync(file, "utf-8"), `content-drafts/${slug}.md`);
      modules.set(slug, parsed);
      for (const w of parsed.warnings) warnings.push(`${slug}: ${w}`);
    } catch (e) {
      if (e instanceof ContentParseError) errors.push(e.message);
      else throw e;
    }
  }

  // Slug uniqueness and media-map keys are checked across importable AND held modules.
  errors.push(...validateMediaMap(media, new Map([...modules, ...held])));
  return { modules, warnings, errors };
}
