import { db } from "@/lib/db";

export interface AdminPathSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  published: boolean;
  moduleCount: number;
  enrollmentCount: number;
}

export async function getAdminPaths(): Promise<AdminPathSummary[]> {
  const paths = await db.learningPath.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { pathModules: true, enrollments: true } },
    },
  });

  return paths.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    published: p.published,
    moduleCount: p._count.pathModules,
    enrollmentCount: p._count.enrollments,
  }));
}

export interface AdminPathDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  published: boolean;
  enrollmentCount: number;
  modules: { id: string; slug: string; title: string; order: number; published: boolean }[];
}

export async function getAdminPathDetail(pathId: string): Promise<AdminPathDetail | null> {
  const path = await db.learningPath.findUnique({
    where: { id: pathId },
    include: {
      _count: { select: { enrollments: true } },
      pathModules: {
        orderBy: { order: "asc" },
        include: { module: true },
      },
    },
  });

  if (!path) return null;

  return {
    id: path.id,
    name: path.name,
    slug: path.slug,
    description: path.description,
    published: path.published,
    enrollmentCount: path._count.enrollments,
    modules: path.pathModules.map((pm) => ({
      id: pm.module.id,
      slug: pm.module.slug,
      title: pm.module.title,
      order: pm.order,
      published: pm.module.published,
    })),
  };
}
