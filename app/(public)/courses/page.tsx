import Link from "next/link";

const courses = [
  {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    difficulty: "Beginner",
    duration: "18 hours",
    summary:
      "Build strong fundamentals in logic, functions, scope, and data flow.",
  },
  {
    slug: "react-foundations",
    title: "React Foundations",
    difficulty: "Intermediate",
    duration: "22 hours",
    summary:
      "Learn how components, state, and props create interactive product experiences.",
  },
  {
    slug: "nextjs-core",
    title: "Next.js Core",
    difficulty: "Intermediate",
    duration: "20 hours",
    summary:
      "Understand the app architecture that powers production-grade web experiences.",
  },
  {
    slug: "production-frontend-practices",
    title: "Production Frontend Practices",
    difficulty: "Advanced",
    duration: "16 hours",
    summary:
      "Learn the practices that make apps reliable, accessible, and production-ready.",
  },
];

export default function PublicCoursesPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 md:px-8">
      <header className="mb-8">
        <p className="eyebrow">Course catalog</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">
          Explore the curriculum.
        </h1>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {[
          "Beginner",
          "Intermediate",
          "Advanced",
          "Frontend",
          "React",
          "TypeScript",
          "Databases",
          "Security",
        ].map((filter) => (
          <span key={filter} className="pill">
            {filter}
          </span>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="surface-panel block p-6 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="pill bg-[rgba(33,79,70,0.06)] text-[var(--primary)]">
                {course.difficulty}
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">
                {course.duration}
              </span>
            </div>
            <h2 className="mt-4 text-3xl text-ink">{course.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[rgba(24,29,26,0.7)]">
              {course.summary}
            </p>
            <span className="mt-6 inline-flex text-sm font-medium text-[var(--primary)]">
              View course →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
