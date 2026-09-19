"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin, slugify } from "@/modules/admin/require-admin";

export async function createLearningPath(name: string, description: string) {
  await requireAdmin();

  if (!name.trim()) throw new Error("Name is required");

  const baseSlug = slugify(name);
  if (!baseSlug) throw new Error("Name must contain at least one letter or number");

  // Guard against slug collisions from similar names rather than
  // letting the unique constraint throw an opaque Prisma error.
  let slug = baseSlug;
  let suffix = 2;
  while (await db.learningPath.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }

  const path = await db.learningPath.create({
    data: { name: name.trim(), slug, description: description.trim() || null, published: false },
  });

  revalidatePath("/admin/paths");
  return path.id;
}

export async function updateLearningPath(
  pathId: string,
  data: { name: string; description: string }
) {
  await requireAdmin();

  if (!data.name.trim()) throw new Error("Name is required");

  await db.learningPath.update({
    where: { id: pathId },
    data: { name: data.name.trim(), description: data.description.trim() || null },
  });

  revalidatePath("/admin/paths");
  revalidatePath(`/admin/paths/${pathId}`);
  // Published paths are visible to enrolled learners' roadmaps —
  // a name/description edit doesn't change unlock logic, but the
  // roadmap page does render the path name.
  revalidatePath("/learner/roadmap");
}

export async function setPathPublished(pathId: string, published: boolean) {
  await requireAdmin();

  await db.learningPath.update({ where: { id: pathId }, data: { published } });

  revalidatePath("/admin/paths");
  revalidatePath(`/admin/paths/${pathId}`);
  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
}

export async function deleteLearningPath(pathId: string) {
  await requireAdmin();

  const path = await db.learningPath.findUnique({
    where: { id: pathId },
    include: { _count: { select: { enrollments: true } } },
  });
  if (!path) throw new Error("Not found");

  // Enrollment.path has onDelete: Cascade — deleting a path with
  // active enrollments would silently delete those enrollment rows
  // too. Refuse rather than let that happen invisibly; an admin who
  // really wants this has to remove the enrollments first.
  if (path._count.enrollments > 0) {
    throw new Error(
      `Can't delete — ${path._count.enrollments} learner(s) are enrolled in this path.`
    );
  }

  await db.learningPath.delete({ where: { id: pathId } });

  revalidatePath("/admin/paths");
  redirect("/admin/paths");
}
