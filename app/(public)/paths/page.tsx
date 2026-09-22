import Link from "next/link";

const paths = [
  {
    slug: "full-stack-web-developer",
    title: "Full-Stack Web Developer",
    summary:
      "Build the core skills to ship modern web apps from interface to infrastructure.",
    duration: "180 hours",
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    summary:
      "Deepen your craft in HTML, CSS, JavaScript, React, and product thinking.",
    duration: "120 hours",
  },
  {
    slug: "backend-foundations",
    title: "Backend Foundations",
    summary:
      "Learn how servers, APIs, and data systems power the apps people use every day.",
    duration: "90 hours",
  },
];

export default function PublicPathsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 md:px-8">
      <header className="mb-8">
        <p className="eyebrow">Learning paths</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">
          Choose a path that matches your goals.
        </h1>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paths.map((path) => (
          <Link
            key={path.slug}
            href={`/paths/${path.slug}`}
            className="surface-panel block p-6 transition-transform hover:-translate-y-1"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">
              {path.duration}
            </p>
            <h2 className="mt-3 text-3xl text-ink">{path.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[rgba(24,29,26,0.7)]">
              {path.summary}
            </p>
            <span className="mt-6 inline-flex text-sm font-medium text-[var(--primary)]">
              Explore path →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
