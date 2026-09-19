"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NotificationBell } from "@/components/notification-bell";
import { signOutUser } from "@/lib/auth-client";
import type { NotificationItem } from "@/modules/notifications/get-notifications";

const NAV_ITEMS = [
  { href: "/learner/dashboard", label: "Dashboard" },
  { href: "/learner/roadmap", label: "Roadmap" },
  { href: "/learner/progress", label: "Progress" },
  { href: "/learner/extra", label: "Extra exercises" },
];

export function LearnerShellClient({
  userName,
  notifications,
  unreadCount,
  children,
}: {
  userName: string;
  notifications: NotificationItem[];
  unreadCount: number;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOutUser();
    router.push("/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setDrawerOpen(false)}
            className="relative py-2 pl-4 text-[15px] transition-colors"
            style={{ color: active ? "var(--lp-ink)" : "var(--lp-ink-muted)" }}
          >
            {active && (
              <span
                className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2"
                style={{ background: "var(--lp-moss)" }}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="learner-theme flex min-h-screen flex-col md:flex-row">
      {/* Desktop rail */}
      <aside
        className="hidden w-60 shrink-0 flex-col justify-between px-6 py-8 md:flex"
        style={{ borderRight: "1px solid var(--lp-line)" }}
      >
        <div className="flex flex-col gap-10">
          <Link
            href="/learner/dashboard"
            className="text-[15px] font-medium tracking-tight"
          >
            Dev Learning Platform
          </Link>
          {nav}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs" style={{ color: "var(--lp-ink-muted)" }}>
            {userName}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-left text-xs font-medium text-primary hover:underline"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 md:hidden"
        style={{ borderBottom: "1px solid var(--lp-line)" }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="flex h-8 w-8 items-center justify-center"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="text-sm font-medium">Dev Learning Platform</span>
        <NotificationBell items={notifications} unreadCount={unreadCount} />
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="absolute left-0 top-0 flex h-full w-64 flex-col justify-between px-6 py-8"
            style={{ background: "var(--lp-paper)" }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Dev Learning Platform
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {nav}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs" style={{ color: "var(--lp-ink-muted)" }}>
                {userName}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-left text-xs font-medium text-primary hover:underline"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        <div
          className="hidden items-center justify-end px-10 py-4 md:flex"
          style={{ borderBottom: "1px solid var(--lp-line)" }}
        >
          <NotificationBell items={notifications} unreadCount={unreadCount} />
        </div>
        <div className="px-5 py-8 md:px-10 md:py-12">{children}</div>
      </div>
    </div>
  );
}
