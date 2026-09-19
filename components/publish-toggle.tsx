"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function PublishToggle({
  id,
  published,
  onToggle,
}: {
  id: string;
  published: boolean;
  onToggle: (id: string, published: boolean) => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await onToggle(id, !published);
          router.refresh();
        })
      }
      disabled={isPending}
      className={`rounded-full px-2.5 py-1 text-xs font-medium disabled:opacity-50 ${
        published ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"
      }`}
    >
      {isPending ? "…" : published ? "Published" : "Draft"}
    </button>
  );
}
