import Link from "next/link";
import { notFound } from "next/navigation";

const courseMap = {
  "javascript-fundamentals": {
    title: "JavaScript Fundamentals",
    difficulty: "Beginner",
    duration: "18 hours",
    summary: "Build a strong foundation in the language that powers modern interfaces and product logic.",
    whatYoullLearn: ["Variables and types", "Functions and scope", "Objects and flow", "Real debugging habits"],
  },
  "react-foundations": {
    title: "React Foundations",
    difficulty: "Intermediate",
    duration: "22 hours",
    summary: "Learn component composition, state, and modern frontend patterns used in product development.",
    whatYoullLearn: ["Components and props", "Stateful UI", "Event handling", "Data flow"],
  },
  "nextjs-core": {
    title: "Next.js Core",
    difficulty: "Intermediate",
    duration: "20 hours",
    summary: "Understand app structure, rendering decisions, and route architecture in a production framework.",
    whatYoullLearn: ["Routing", "Layouts", "Server/client boundaries", "Application structure"],
  },
  "production-frontend-practices": {
    title: "Production Frontend Practices",
    difficulty: "Advanced",
    duration: "16 hours",
    summary: "Learn the standards that separate working interfaces from professional, durable product experiences.",
    whatYoullLearn: ["Accessibility", "Performance", "Observability", "Release thinking"],
  },
} as const;

export default async function PublicCourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseMap[slug as keyof typeof courseMap];

  if (!course) notFound();

  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-8 md:px-8">
      <Link href="/courses" className="text-sm font-medium text-[var(--primary)] hover:underline">← Back to courses</Link>
      <p className="eyebrow mt-6">Course</p>
      <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">{course.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[rgba(24,29,26,0.72)]">{course.summary}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="pill bg-[rgba(33,79,70,0.06)] text-[var(--primary)]">{course.difficulty}</span>
        <span className="pill">{course.duration}</span>
      </div>

      <section className="mt-10 surface-panel p-6">
        <p className="eyebrow">What you&apos;ll learn</p>
        <ul className="mt-5 space-y-3">
          {course.whatYoullLearn.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-[rgba(24,29,26,0.08)] bg-white/50 p-4">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              <span className="text-base text-[rgba(24,29,26,0.76)]">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
