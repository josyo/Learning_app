"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  Compass,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { NotificationBell } from "@/components/notification-bell";
import { signOutUser } from "@/lib/auth-client";
import type { NotificationItem } from "@/modules/notifications/get-notifications";

const LEARNER_SECONDARY_NAV = [
  { href: "/learner/profile", label: "Profile", icon: UserRound },
  { href: "/learner/settings", label: "Settings", icon: Settings },
  { href: "/logout", label: "Logout", icon: LogOut },
];

const LEARNER_MOBILE_NAV = [
  { href: "/learner/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/learner/my-learning", label: "Learning", icon: BookOpen },
  { href: "/learner/roadmap", label: "Paths", icon: Compass },
  { href: "/learner/extra", label: "Projects", icon: FolderKanban },
  { href: "/learner/profile", label: "Profile", icon: UserRound },
];

const LEARNER_NAV_ICONS: Record<string, typeof LayoutDashboard> = {
  "/learner/dashboard": LayoutDashboard,
  "/learner/my-learning": BookOpen,
  "/learner/roadmap": Compass,
  "/learner/progress": BarChart3,
  "/learner/extra": FolderKanban,
};

export function AppShellClient({
  role,
  navItems,
  userName,
  notifications,
  unreadCount,
  children,
}: {
  role: "learner" | "mentor" | "admin";
  navItems: { href: string; label: string }[];
  userName: string;
  notifications: NotificationItem[];
  unreadCount: number;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLearner = role === "learner";

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  async function handleLogout() {
    await signOutUser();
    router.push("/login");
    router.refresh();
  }

  return (
    <div
      className={
        isLearner ? "learner-theme min-h-screen" : "min-h-screen bg-background"
      }
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {isLearner ? (
          <aside className="hidden w-[260px] shrink-0 border-r border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.42)] px-5 py-6 md:flex md:flex-col">
            <div className="flex items-center gap-3 px-2">
              <span className="brand-mark">DP</span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-ink">
                  DevPath
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[rgba(24,29,26,0.52)]">
                  Academy
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(24,29,26,0.5)]">
                  Learn
                </p>
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon =
                      LEARNER_NAV_ICONS[item.href] ?? LayoutDashboard;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        className="learner-nav-item text-sm font-medium"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div>
                <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(24,29,26,0.5)]">
                  Account
                </p>
                <nav className="space-y-1.5">
                  {LEARNER_SECONDARY_NAV.map((item) => {
                    const Icon = item.icon;
                    if (item.href === "/logout") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={handleLogout}
                          className="learner-nav-item text-left text-sm font-medium"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{item.label}</span>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        className="learner-nav-item text-sm font-medium"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.54)] p-3">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[rgba(24,29,26,0.5)]">
                Profile
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(33,79,70,0.12)] text-sm font-semibold text-[var(--primary)]">
                    {userName
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{userName}</p>
                    <p className="text-[11px] text-[rgba(24,29,26,0.56)]">
                      Learner
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className="h-4 w-4 text-[rgba(24,29,26,0.5)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </aside>
        ) : (
          <aside className="hidden w-56 shrink-0 border-r border-border bg-background px-4 py-6 md:flex md:flex-col">
            <div className="text-sm font-semibold tracking-tight text-foreground">
              {role === "mentor" ? "Mentor" : "Admin"}
            </div>
            <nav className="mt-6 flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {isLearner ? (
            <header className="border-b border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.38)] px-4 py-3 backdrop-blur md:px-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 md:hidden">
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(24,29,26,0.08)] bg-white/60 text-ink"
                    aria-label="Open navigation"
                  >
                    <Menu className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="brand-mark">DP</span>
                </div>

                <label className="search-input relative hidden flex-1 items-center gap-2 rounded-full px-3 py-2 md:flex">
                  <Search
                    className="h-4 w-4 text-[rgba(24,29,26,0.55)]"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    readOnly
                    aria-label="Search"
                    placeholder="Search lessons, paths and concepts"
                    className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-[rgba(24,29,26,0.45)]"
                  />
                </label>

                <div className="ml-auto flex items-center gap-2 md:gap-3">
                  <button className="hidden items-center gap-2 rounded-full border border-[rgba(24,29,26,0.08)] bg-white/60 px-3 py-2 text-sm text-ink md:flex">
                    <HelpCircle className="h-4 w-4" aria-hidden="true" />
                    Help
                  </button>
                  <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(24,29,26,0.08)] bg-white/60 text-ink">
                    <Bell className="h-4 w-4" aria-hidden="true" />
                    {unreadCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[9px] font-semibold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <div className="hidden items-center gap-3 rounded-full border border-[rgba(24,29,26,0.08)] bg-white/60 px-2 py-1.5 md:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(33,79,70,0.12)] text-xs font-semibold text-[var(--primary)]">
                      {userName
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-ink">
                      {userName}
                    </span>
                  </div>
                </div>
              </div>
            </header>
          ) : (
            <header className="flex items-center justify-end border-b border-border bg-background px-8 py-3">
              <NotificationBell
                items={notifications}
                unreadCount={unreadCount}
              />
            </header>
          )}

          <main
            className={
              isLearner
                ? "flex-1 px-4 py-6 md:px-8 md:py-8"
                : "flex-1 px-4 py-6 md:px-8 md:py-8"
            }
          >
            {children}
          </main>

          {isLearner && (
            <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.86)] px-2 py-2 backdrop-blur md:hidden">
              <ul className="grid grid-cols-5 gap-2">
                {LEARNER_MOBILE_NAV.map((item) => {
                  const Icon = item.icon;
                  const active = isCurrent(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={
                          active
                            ? "flex flex-col items-center gap-1 rounded-xl bg-[rgba(33,79,70,0.08)] px-2 py-2 text-[11px] font-semibold text-[var(--primary)]"
                            : "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-[rgba(24,29,26,0.65)]"
                        }
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {isLearner && drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/35 md:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute left-0 top-0 flex h-full w-[280px] flex-col justify-between bg-[var(--bg)] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="brand-mark">DP</span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-ink">
                      DevPath
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[rgba(24,29,26,0.52)]">
                      Academy
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(24,29,26,0.08)] bg-white/60 text-ink"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-8 space-y-2">
                {navItems.map((item) => {
                  const Icon = LEARNER_NAV_ICONS[item.href] ?? LayoutDashboard;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className="learner-nav-item text-sm font-medium"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2">
              {LEARNER_SECONDARY_NAV.map((item) => {
                const Icon = item.icon;
                if (item.href === "/logout") {
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={handleLogout}
                      className="learner-nav-item text-left text-sm font-medium"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="learner-nav-item text-sm font-medium"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
