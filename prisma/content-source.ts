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
] as const;

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
  moduleSlugs: readonly string[] = MODULE_SLUGS
): LoadedContent {
  const errors: string[] = [];
  const warnings: string[] = [];
  const modules = new Map<string, ParsedModule>();

  const onDisk = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  for (const f of onDisk) {
    const slug = f.replace(/\.md$/, "");
    if (!moduleSlugs.includes(slug)) {
      errors.push(`content-drafts/${f} is not a known module slug. Known: ${moduleSlugs.join(", ")}. (A misspelt filename would otherwise be ignored.)`);
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

  errors.push(...validateMediaMap(media, modules));
  return { modules, warnings, errors };
}
