"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const ROLE_HOME: Record<string, string> = {
  LEARNER: "/learner/dashboard",
  MENTOR: "/mentor/dashboard",
  ADMIN: "/admin/dashboard",
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(
        signInError.message ??
          "Couldn't sign in. Check your details and try again.",
      );
      return;
    }

    const role =
      (data?.user as { role?: string } | undefined)?.role ?? "LEARNER";

    router.push(ROLE_HOME[role] ?? "/learner/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: Learning platform branding */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          {/* Decorative gradients */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950 shadow-lg">
                  L
                </div>

                <span className="text-xl font-semibold tracking-tight text-white">
                  DevPath
                </span>
              </div>
            </div>

            {/* Main message */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Your learning journey continues here
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Learn something new.
                <br />
                <span className="text-indigo-300">Build something great.</span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Access your courses, track your progress, connect with mentors,
                and keep moving toward your learning goals.
              </p>

              {/* Feature cards */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                    ✓
                  </div>
                  <p className="text-sm font-medium text-white">
                    Track your progress
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    See how far you've come.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
                    ✦
                  </div>
                  <p className="text-sm font-medium text-white">
                    Learn with mentors
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Get guidance when you need it.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Learn at your pace · Grow with purpose
            </p>
          </div>
        </section>

        {/* Right: Login */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white">
                L
              </div>

              <span className="text-xl font-semibold tracking-tight text-slate-950">
                DevPath
              </span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-indigo-600">
                Welcome back
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Continue learning.
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to pick up right where you left off.
              </p>
            </div>

            {/* Login card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                        />
                      </svg>
                      Signing you in…
                    </>
                  ) : (
                    <>
                      Log in
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a1 1 0 0 1 1-1h9.586l-3.293-3.293a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L13.586 11H4a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-400">Secure access</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a5 5 0 0 0-5 5v2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 7V6a3 3 0 0 0-6 0v2h6Zm-3 3a1.5 1.5 0 0 1 .75 2.799V16a.75.75 0 0 1-1.5 0v-2.201A1.5 1.5 0 0 1 10 11Z"
                    clipRule="evenodd"
                  />
                </svg>
                Your account and learning data are protected
              </div>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="font-medium text-slate-600 hover:text-slate-900"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-medium text-slate-600 hover:text-slate-900"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
