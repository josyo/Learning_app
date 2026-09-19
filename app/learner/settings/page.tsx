export default function LearnerSettingsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <p className="eyebrow">Settings</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink">Learning preferences</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-panel p-6">
          <h2 className="text-2xl text-ink">Notifications</h2>
          <ul className="mt-4 space-y-3 text-sm text-[rgba(24,29,26,0.72)]">
            <li>Mentor review updates</li>
            <li>Assignment reminders</li>
            <li>Learning streak updates</li>
          </ul>
        </section>

        <section className="surface-panel p-6">
          <h2 className="text-2xl text-ink">Schedule</h2>
          <ul className="mt-4 space-y-3 text-sm text-[rgba(24,29,26,0.72)]">
            <li>Daily plan emails</li>
            <li>Weekly progress summaries</li>
            <li>Learning goal nudges</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
