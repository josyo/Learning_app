import Link from "next/link";

const pathCards = [
  { title: "Frontend Foundations", description: "HTML, CSS, responsiveness, accessibility, and UI craft." },
  { title: "JavaScript Core", description: "Logic, functions, data flow, async thinking, and debugging." },
  { title: "React + Next.js", description: "Components, routing, state, performance, and product architecture." },
  { title: "Professional Practice", description: "Testing, production quality, deployment, and delivery discipline." },
];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 md:px-8 lg:px-10">
      <header className="rounded-[2rem] border border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.55)] px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="brand-mark">DP</span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-ink">DevPath</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[rgba(24,29,26,0.52)]">Academy</p>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-[rgba(24,29,26,0.7)] md:flex">
            <Link href="/paths">Paths</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          <Link href="/login" className="primary-button whitespace-nowrap">
            Log in
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="eyebrow">Developer learning platform</p>
          <h1 className="mt-4 max-w-xl text-5xl tracking-tight text-ink md:text-6xl">
            Become a stronger developer by building real skills in sequence.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[rgba(24,29,26,0.72)]">
            Learn web development through a structured path of lessons, practical assignments, and milestone projects designed to build professional momentum.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/login" className="primary-button">
              Start learning
            </Link>
            <Link href="/paths" className="secondary-button">
              Explore paths
            </Link>
          </div>
        </div>

        <div className="surface-panel p-5">
          <div className="rounded-[1.5rem] border border-[rgba(24,29,26,0.08)] bg-[linear-gradient(180deg,#f7f3ef,#fff)] p-5">
            <div className="flex items-center justify-between text-sm text-[rgba(24,29,26,0.7)]">
              <span>Current focus</span>
              <span className="pill">JavaScript</span>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Module 4</p>
              <h2 className="mt-2 text-3xl text-ink">Functions and scope</h2>
              <p className="mt-2 text-sm leading-6 text-[rgba(24,29,26,0.7)]">
                Understand how logic becomes reusable, maintainable code, and how professional developer thinking starts with small, intentional concepts.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-[rgba(24,29,26,0.68)]">
                <span>Progress</span>
                <span>42%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(24,29,26,0.08)]">
                <div className="h-full w-[42%] rounded-full bg-[var(--primary)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Learning methodology</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            "Learn fundamental concepts with clear structure.",
            "Practice through guided lessons and examples.",
            "Build portfolio-ready milestones.",
            "Review progress and keep momentum with direction.",
          ].map((item) => (
            <div key={item} className="surface-panel p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(33,79,70,0.08)] text-[var(--primary)]">✓</div>
              <p className="text-base leading-7 text-[rgba(24,29,26,0.76)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Pathways</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pathCards.map((card) => (
            <article key={card.title} className="surface-panel p-5">
              <h3 className="text-2xl text-ink">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[rgba(24,29,26,0.7)]">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
