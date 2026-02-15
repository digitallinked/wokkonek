"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getDefaultDashboard } from "@/lib/auth/utils";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, display_name, is_client, is_tasker")
        .eq("id", user.id)
        .single();

      const hasDisplayName = profile?.display_name?.trim?.();
      const hasRole =
        profile?.is_client || profile?.is_tasker || profile?.role === "admin";

      if (hasDisplayName && hasRole) {
        const canAccess =
          redirectTo?.startsWith("/") &&
          ((redirectTo.startsWith("/tasker") && profile?.is_tasker) ||
            (redirectTo.startsWith("/client") && profile?.is_client) ||
            (redirectTo.startsWith("/admin") && profile?.role === "admin"));
        const dest =
          canAccess && redirectTo
            ? redirectTo
            : getDefaultDashboard(profile);
        router.push(dest);
      } else {
        router.push("/choose-role");
      }
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-text text-center">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-text-secondary text-center">
          Log in to your Wok Konek account to get tasks done.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 animate-pulse" />}>
      <SignInContent />
    </Suspense>
  );
}
