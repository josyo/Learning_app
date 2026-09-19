import Link from "next/link";
import { Check, Clock3, Lock, TriangleAlert } from "lucide-react";
import type { ModuleStatus } from "@/modules/progress/compute-module-statuses";

export interface TrailModule {
  moduleId: string;
  slug: string;
  title: string;
  description: string | null;
  status: ModuleStatus;
}

const STATUS_META: Record<
  ModuleStatus,
  { label: string; tone: string; icon: typeof Check }
> = {
  LOCKED: { label: "Locked", tone: "bg-[rgba(221,214,198,0.35)] text-[rgba(34,38,31,0.7)]", icon: Lock },
  AVAILABLE: { label: "Available", tone: "bg-[rgba(62,86,65,0.12)] text-[var(--moss)]", icon: Check },
  IN_PROGRESS: { label: "In progress", tone: "bg-[rgba(184,134,47,0.12)] text-[var(--ochre)]", icon: Clock3 },
  AWAITING_REVIEW: { label: "Awaiting review", tone: "bg-[rgba(34,38,31,0.06)] text-[var(--ink)]", icon: Clock3 },
  NEEDS_CHANGES: { label: "Needs changes", tone: "bg-[rgba(166,91,68,0.12)] text-[var(--clay-muted)]", icon: TriangleAlert },
  COMPLETED: { label: "Completed", tone: "bg-[rgba(62,86,65,0.12)] text-[var(--moss)]", icon: Check },
};

function StatusBadge({ status }: { status: ModuleStatus }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <span className={`status-pill ${meta.tone}`}>
      <span className="status-dot bg-current/15" aria-hidden="true" />
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <strong>{meta.label}</strong>
    </span>
  );
}

export function RoadmapTrail({ modules }: { modules: TrailModule[] }) {
  return (
    <ol className="flex flex-col gap-6">
      {modules.map((m, i) => {
        const clickable = m.status !== "LOCKED";
        const row = (
          <div className="roadmap-step roadmap-animate" data-status={m.status} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex gap-4">
              <div className="roadmap-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1 pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl leading-tight text-ink">{m.title}</h2>
                    {m.description && (
                      <p className="mt-2 max-w-[70ch] text-sm leading-6 text-[rgba(34,38,31,0.72)]">
                        {m.description}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={m.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

        return (
          <li key={m.moduleId}>
            {clickable ? (
              <Link href={`/learner/roadmap/${m.slug}`} className="block text-inherit">
                {row}
              </Link>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ol>
  );
}
