"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin, slugify } from "@/modules/admin/require-admin";

async function uniqueModuleSlug(name: string) {
  const baseSlug = slugify(name);
  if (!baseSlug) throw new Error("Title must contain at least one letter or number");

  let slug = baseSlug;
  let suffix = 2;
  while (await db.module.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }
  return slug;
}

async function nextOrderInPath(pathId: string) {
  const last = await db.pathModule.findFirst({ where: { pathId }, orderBy: { order: "desc" } });
  return (last?.order ?? -1) + 1;
}

/** Creates a standalone module in the library — not placed in any path yet. */
export async function createModule(title: string, description: string) {
  await requireAdmin();
  if (!title.trim()) throw new Error("Title is required");

  const slug = await uniqueModuleSlug(title);
  const module = await db.module.create({
    data: { title: title.trim(), slug, description: description.trim() || null, published: false },
  });

  revalidatePath("/admin/modules");
  return module.id;
}

/** Creates a new module and places it in the given path in one step — the common case. */
export async function createModuleAndPlaceInPath(
  pathId: string,
  title: string,
  description: string
) {
  await requireAdmin();
  if (!title.trim()) throw new Error("Title is required");

  const slug = await uniqueModuleSlug(title);
  const order = await nextOrderInPath(pathId);

  const module = await db.module.create({
    data: { title: title.trim(), slug, description: description.trim() || null, published: false },
  });
  await db.pathModule.create({ data: { pathId, moduleId: module.id, order } });

  revalidatePath(`/admin/paths/${pathId}`);
  revalidatePath("/admin/modules");
  return module.id;
}

export async function updateModule(
  moduleId: string,
  data: { title: string; description: string }
) {
  await requireAdmin();
  if (!data.title.trim()) throw new Error("Title is required");

  await db.module.update({
    where: { id: moduleId },
    data: { title: data.title.trim(), description: data.description.trim() || null },
  });

  revalidatePath(`/admin/modules/${moduleId}`);
  revalidatePath("/admin/modules");
  // A module can appear in several paths — the title renders on all of them.
  const paths = await db.pathModule.findMany({ where: { moduleId }, select: { pathId: true } });
  for (const p of paths) revalidatePath(`/admin/paths/${p.pathId}`);
  revalidatePath("/learner/roadmap");
}

export async function setModulePublished(moduleId: string, published: boolean) {
  await requireAdmin();
  await db.module.update({ where: { id: moduleId }, data: { published } });

  revalidatePath(`/admin/modules/${moduleId}`);
  revalidatePath("/admin/modules");
  const paths = await db.pathModule.findMany({ where: { moduleId }, select: { pathId: true } });
  for (const p of paths) revalidatePath(`/admin/paths/${p.pathId}`);
}

export async function deleteModule(moduleId: string) {
  await requireAdmin();

  const module = await db.module.findUnique({
    where: { id: moduleId },
    include: {
      _count: {
        select: { pathModules: true, requiredByModule: true },
      },
    },
  });
  if (!module) throw new Error("Not found");

  if (module._count.pathModules > 0) {
    throw new Error(
      `Can't delete — this module is used in ${module._count.pathModules} path(s). Remove it from all paths first.`
    );
  }

  // ModulePrerequisite cascade-deletes on either side. Without this
  // check, deleting a module that other modules require would
  // silently strip that requirement off them — they'd unlock as if
  // the prerequisite had never existed, with no warning to the admin.
  if (module._count.requiredByModule > 0) {
    throw new Error(
      `Can't delete — ${module._count.requiredByModule} other module(s) require this one as a prerequisite. Remove those prerequisite links first.`
    );
  }

  await db.module.delete({ where: { id: moduleId } });
  revalidatePath("/admin/modules");
  redirect("/admin/modules");
}

export async function placeModuleInPath(pathId: string, moduleId: string) {
  await requireAdmin();

  const order = await nextOrderInPath(pathId);
  await db.pathModule.create({ data: { pathId, moduleId, order } });

  revalidatePath(`/admin/paths/${pathId}`);
  revalidatePath("/learner/roadmap");
}

/**
 * Removing a module from a path only deletes the PathModule
 * placement row — the Module itself, and any LessonProgress or
 * Submission history tied to it, are untouched. If it's re-added
 * later, that history reappears. This is intentional: a path's
 * module list is just "which reusable modules, in what order," not
 * ownership of the module's content or a learner's history with it.
 */
export async function removeModuleFromPath(pathId: string, moduleId: string) {
  await requireAdmin();

  await db.pathModule.deleteMany({ where: { pathId, moduleId } });

  revalidatePath(`/admin/paths/${pathId}`);
  revalidatePath("/learner/roadmap");
}

export async function moveModuleInPath(
  pathId: string,
  moduleId: string,
  direction: "up" | "down"
) {
  await requireAdmin();

  const pathModules = await db.pathModule.findMany({
    where: { pathId },
    orderBy: { order: "asc" },
  });
  const index = pathModules.findIndex((pm) => pm.moduleId === moduleId);
  if (index === -1) throw new Error("Module not found in this path");

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= pathModules.length) return; // already at the edge, no-op

  const current = pathModules[index];
  const swapWith = pathModules[swapIndex];
  if (!current || !swapWith) return;

  // order has a unique constraint per path, so a direct two-row swap
  // would collide mid-transaction — stage through a temporary value.
  await db.$transaction([
    db.pathModule.update({ where: { id: current.id }, data: { order: -1 } }),
    db.pathModule.update({ where: { id: swapWith.id }, data: { order: current.order } }),
    db.pathModule.update({ where: { id: current.id }, data: { order: swapWith.order } }),
  ]);

  revalidatePath(`/admin/paths/${pathId}`);
  revalidatePath("/learner/roadmap");
}
