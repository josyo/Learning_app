import type { ModuleStatus } from "@/modules/progress/compute-module-statuses";
import { Lock, Circle, CircleDot, Eye, RotateCcw, CheckCircle2 } from "lucide-react";

const STATUS_CONFIG: Record<
  ModuleStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  LOCKED: {
    label: "Locked",
    className: "bg-muted text-muted-foreground",
    icon: Lock,
  },
  AVAILABLE: {
    label: "Available",
    className: "bg-blue-50 text-blue-700",
    icon: Circle,
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-amber-50 text-amber-700",
    icon: CircleDot,
  },
  AWAITING_REVIEW: {
    label: "Awaiting review",
    className: "bg-violet-50 text-violet-700",
    icon: Eye,
  },
  NEEDS_CHANGES: {
    label: "Needs changes",
    className: "bg-red-50 text-red-700",
    icon: RotateCcw,
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-50 text-green-700",
    icon: CheckCircle2,
  },
};

export function ModuleStatusBadge({ status }: { status: ModuleStatus }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {config.label}
    </span>
  );
}
