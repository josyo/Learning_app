export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 md:px-8">
      <p className="eyebrow">Pricing</p>
      <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">Choose a plan that supports your learning.</h1>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          ["Starter", "$0", "For learning the fundamentals and exploring the path."],
          ["Pro", "$29/mo", "For ongoing guided learning and deeper product practice."],
          ["Career", "$79/mo", "For structured progression, mentorship, and delivery-focused learning."],
        ].map(([name, price, description]) => (
          <div key={name} className="surface-panel p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">{name}</p>
            <p className="mt-3 text-4xl font-semibold text-ink">{price}</p>
            <p className="mt-3 text-sm leading-6 text-[rgba(24,29,26,0.7)]">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
