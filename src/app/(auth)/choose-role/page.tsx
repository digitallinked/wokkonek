"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const roles = [
  {
    id: "client" as const,
    title: "I need work done",
    subtitle: "Client",
    description: "Post jobs, review bids, and hire skilled taskers.",
    color: "primary",
  },
  {
    id: "tasker" as const,
    title: "I want to earn",
    subtitle: "Tasker",
    description: "Browse jobs, submit bids, and get paid for your skills.",
    color: "secondary",
  },
];

export default function ChooseRolePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"client" | "tasker" | null>(
    null
  );
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedRole) {
      setError("Please select a role.");
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

    // Upsert profile
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        role: selectedRole,
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

    router.push(`/${selectedRole}/dashboard`);
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-bg rounded-xl border border-border shadow-sm p-8">
        <h1 className="text-2xl font-bold text-text text-center">
          Set up your profile
        </h1>
        <p className="mt-2 text-sm text-text-secondary text-center">
          Tell us how you want to use Wok Konek.
        </p>

        {error && (
          <div className="mt-4 rounded-md bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Role selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  selectedRole === role.id
                    ? role.id === "client"
                      ? "border-primary bg-primary-light"
                      : "border-secondary bg-secondary-light"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {role.subtitle}
                </p>
                <p className="mt-1 text-base font-semibold text-text">
                  {role.title}
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {role.description}
                </p>
              </button>
            ))}
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
            disabled={loading || !selectedRole}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Setting up..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
