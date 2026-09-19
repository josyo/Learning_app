import { db } from "@/lib/db";

export interface ModuleLibraryItem {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  pathCount: number; // how many paths currently use this module — reuse, made visible
}

export async function getModuleLibrary(): Promise<ModuleLibraryItem[]> {
  const modules = await db.module.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { pathModules: true } } },
  });

  return modules.map((m) => ({
    id: m.id,
    title: m.title,
    slug: m.slug,
    published: m.published,
    pathCount: m._count.pathModules,
  }));
}

/** Modules not already placed in the given path, for the "add existing module" picker. */
export async function getModulesNotInPath(pathId: string): Promise<ModuleLibraryItem[]> {
  const all = await getModuleLibrary();
  const inPath = await db.pathModule.findMany({ where: { pathId }, select: { moduleId: true } });
  const inPathIds = new Set(inPath.map((pm) => pm.moduleId));
  return all.filter((m) => !inPathIds.has(m.id));
}

export interface AdminModuleDetail {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  published: boolean;
  usedInPaths: { pathId: string; pathName: string }[];
  lessonCount: number;
  hasAssignment: boolean;
  prerequisites: { id: string; title: string }[];
  requiredBy: { id: string; title: string }[];
}

export async function getAdminModuleDetail(moduleId: string): Promise<AdminModuleDetail | null> {
  const module = await db.module.findUnique({
    where: { id: moduleId },
    include: {
      pathModules: { include: { path: true } },
      _count: { select: { lessons: true, assignments: true } },
      requiresModules: { include: { requiredModule: true } },
      requiredByModule: { include: { module: true } },
    },
  });

  if (!module) return null;

  return {
    id: module.id,
    title: module.title,
    slug: module.slug,
    description: module.description,
    published: module.published,
    usedInPaths: module.pathModules.map((pm) => ({
      pathId: pm.path.id,
      pathName: pm.path.name,
    })),
    lessonCount: module._count.lessons,
    hasAssignment: module._count.assignments > 0,
    prerequisites: module.requiresModules.map((r) => ({
      id: r.requiredModule.id,
      title: r.requiredModule.title,
    })),
    requiredBy: module.requiredByModule.map((r) => ({
      id: r.module.id,
      title: r.module.title,
    })),
  };
}

/** Modules that could be added as a prerequisite — everything except itself and current prerequisites. Doesn't filter out choices that would create a cycle; that's checked at write time with a specific error instead, so the picker doesn't need to know the whole graph shape. */
export async function getPrerequisiteCandidates(moduleId: string): Promise<ModuleLibraryItem[]> {
  const all = await getModuleLibrary();
  const current = await db.modulePrerequisite.findMany({
    where: { moduleId },
    select: { requiredModuleId: true },
  });
  const excluded = new Set([moduleId, ...current.map((c) => c.requiredModuleId)]);
  return all.filter((m) => !excluded.has(m.id));
}
