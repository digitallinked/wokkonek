import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";

export default async function TaskerDashboard() {
  const { user } = await requireRole("tasker");
  const supabase = await createClient();

  const [
    { count: activeBidsCount },
    { count: assignedCount },
    { count: completedCount },
    { data: assignedJobs },
  ] = await Promise.all([
    supabase
      .from("bids")
      .select("*", { count: "exact", head: true })
      .eq("tasker_id", user.id)
      .eq("status", "submitted"),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("assigned_tasker_id", user.id)
      .in("status", [
        "payment_pending",
        "payment_submitted",
        "in_progress",
        "tasker_completed",
      ]),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("assigned_tasker_id", user.id)
      .eq("status", "client_confirmed"),
    supabase
      .from("jobs")
      .select(
        "id, title, fixed_price, status, created_at, category:categories(name), province:provinces(name)"
      )
      .eq("assigned_tasker_id", user.id)
      .in("status", [
        "payment_pending",
        "payment_submitted",
        "in_progress",
        "tasker_completed",
      ])
      .order("updated_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <Link
          href="/tasker/jobs"
          className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-hover transition-colors"
        >
          Browse Jobs
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Active Bids</p>
          <p className="mt-1 text-3xl font-bold text-text">
            {activeBidsCount ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Assigned Jobs</p>
          <p className="mt-1 text-3xl font-bold text-text">
            {assignedCount ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Completed</p>
          <p className="mt-1 text-3xl font-bold text-text">
            {completedCount ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">Your Assigned Jobs</h2>
        {!assignedJobs || assignedJobs.length === 0 ? (
          <div className="mt-4 rounded-lg border border-border bg-bg p-8 text-center">
            <p className="text-text-secondary">
              No assigned jobs yet.{" "}
              <Link
                href="/tasker/jobs"
                className="text-secondary hover:text-secondary-hover font-medium"
              >
                Browse available jobs
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {assignedJobs.map((job) => (
              <Link
                key={job.id}
                href={`/tasker/assigned/${job.id}`}
                className="block rounded-lg border border-border bg-bg p-4 hover:border-secondary/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text truncate">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {(job.category as unknown as { name: string } | null)
                        ?.name}{" "}
                      &middot;{" "}
                      {(job.province as unknown as { name: string } | null)
                        ?.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-lg font-bold text-text">
                      K{Number(job.fixed_price).toLocaleString()}
                    </span>
                    <JobStatusBadge status={job.status} />
                  </div>
                </div>
              </Link>
            ))}
            <Link
              href="/tasker/assigned"
              className="block text-center text-sm font-medium text-secondary hover:text-secondary-hover py-2"
            >
              View all assigned jobs &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
