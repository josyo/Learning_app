import Link from "next/link";
import { notFound } from "next/navigation";

const pathMap = {
  "full-stack-web-developer": {
    title: "Full-Stack Web Developer",
    summary: "Build a complete product skill set from interface to database and deployment.",
    duration: "180 hours",
    outcome: "Ship modern web apps with confidence and clarity.",
    modules: ["Web foundations", "JavaScript", "TypeScript", "React", "Next.js", "Data and APIs", "Production engineering"],
  },
  "frontend-engineer": {
    title: "Frontend Engineer",
    summary: "Turn design and product thinking into polished, accessible interfaces.",
    duration: "120 hours",
    outcome: "Craft performant, resilient, acutely usable interfaces.",
    modules: ["HTML and CSS", "Responsive design", "JavaScript", "React patterns", "Accessibility", "Testing"],
  },
  "backend-foundations": {
    title: "Backend Foundations",
    summary: "Learn the server-side systems that support modern apps and services.",
    duration: "90 hours",
    outcome: "Understand APIs, data layers, and application workflows.",
    modules: ["HTTP and services", "Databases", "APIs", "Auth and security", "Deployment basics"],
  },
} as const;

export default async function PublicPathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = pathMap[slug as keyof typeof pathMap];

  if (!path) notFound();

  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-8 md:px-8">
      <Link href="/paths" className="text-sm font-medium text-[var(--primary)] hover:underline">← Back to paths</Link>
      <p className="eyebrow mt-6">Learning path</p>
      <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">{path.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[rgba(24,29,26,0.72)]">{path.summary}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Duration</p>
          <p className="mt-3 text-2xl font-semibold text-ink">{path.duration}</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Focus</p>
          <p className="mt-3 text-2xl font-semibold text-ink">Product skill</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Outcome</p>
          <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">{path.outcome}</p>
        </div>
      </div>

      <section className="mt-10 surface-panel p-6">
        <p className="eyebrow">Modules</p>
        <ul className="mt-5 space-y-3">
          {path.modules.map((module, index) => (
            <li key={module} className="flex items-start gap-3 rounded-2xl border border-[rgba(24,29,26,0.08)] bg-white/50 p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(33,79,70,0.08)] text-xs font-semibold text-[var(--primary)]">{index + 1}</span>
              <span className="text-base text-[rgba(24,29,26,0.76)]">{module}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
