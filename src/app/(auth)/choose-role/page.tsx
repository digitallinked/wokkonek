"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getDefaultDashboard } from "@/lib/auth/utils";

const roles = [
  {
    id: "client" as const,
    title: "I need work done",
    subtitle: "Client",
    description: "Post jobs, review bids, and hire skilled taskers.",
  },
  {
    id: "tasker" as const,
    title: "I want to earn",
    subtitle: "Tasker",
    description: "Browse jobs, submit bids, and get paid for your skills.",
  },
];

function ChooseRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [isClient, setIsClient] = useState(false);
  const [isTasker, setIsTasker] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isClient && !isTasker) {
      setError("Please select at least one option.");
      return;
    }

    if (!displayName.trim()) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    // Primary role for default dashboard: client when both or client-only, tasker when tasker-only
    const primaryRole = isClient ? "client" : "tasker";

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        role: primaryRole,
        is_client: isClient,
        is_tasker: isTasker,
        display_name: displayName.trim(),
        phone: phone.trim() || null,
        status: "active",
      },
      { onConflict: "id" }
    );

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    const canAccess =
      redirectTo?.startsWith("/") &&
      ((redirectTo.startsWith("/tasker") && isTasker) ||
        (redirectTo.startsWith("/client") && isClient) ||
        redirectTo.startsWith("/admin"));
    const dest =
      canAccess && redirectTo
        ? redirectTo
        : getDefaultDashboard({ role: primaryRole, is_client: isClient, is_tasker: isTasker });
    router.push(dest);
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-bg rounded-xl border border-border shadow-sm p-8">
        <h1 className="text-2xl font-bold text-text text-center">
          Set up your profile
        </h1>
        <p className="mt-2 text-sm text-text-secondary text-center">
          How do you want to use Wok Konek? You can choose both.
        </p>

        {error && (
          <div className="mt-4 rounded-md bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Role selection - multi-select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => {
              const isSelected =
                (role.id === "client" && isClient) ||
                (role.id === "tasker" && isTasker);
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    role.id === "client"
                      ? setIsClient((v) => !v)
                      : setIsTasker((v) => !v)
                  }
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    isSelected
                      ? role.id === "client"
                        ? "border-primary bg-primary-light"
                        : "border-secondary bg-secondary-light"
                      : "border-border hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                        isSelected
                          ? role.id === "client"
                            ? "border-primary bg-primary"
                            : "border-secondary bg-secondary"
                          : "border-border"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {role.subtitle}
                      </p>
                      <p className="mt-1 text-base font-semibold text-text">
                        {role.title}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Profile fields */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-text"
            >
              Full name
            </label>
            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text"
            >
              Phone number{" "}
              <span className="text-text-muted">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="+675 ..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || (!isClient && !isTasker)}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Setting up..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ChooseRolePage() {
  return (
    <Suspense fallback={<div className="w-full max-w-lg rounded-xl border border-border bg-bg p-8 animate-pulse" />}>
      <ChooseRoleContent />
    </Suspense>
  );
}
