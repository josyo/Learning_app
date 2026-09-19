export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-8 md:px-8">
      <p className="eyebrow">About</p>
      <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">Build professional developer skills with direction.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[rgba(24,29,26,0.72)]">
        DevPath Academy is designed for learners who want more than scattered tutorials. We structure learning around clear paths, practical milestones, and deliberate progress.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ["Structured learning", "Every topic builds on prior understanding so learners can move with confidence instead of jumping between disconnected tutorials."],
          ["Real product thinking", "Lessons emphasize how developers reason, build, and ship software in professional environments."],
          ["Momentum", "From daily focus to milestone completion, the product helps learners keep moving with clarity and intention."],
        ].map(([title, text]) => (
          <div key={title} className="surface-panel p-6">
            <h2 className="text-2xl text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[rgba(24,29,26,0.7)]">{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
