import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";

export default async function TaskerAssignedJobsPage() {
  const { user } = await requireRole("tasker");
  const supabase = await createClient();

  const { data: jobs } = await supabase
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
      "client_confirmed",
    ])
    .order("updated_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Assigned Jobs</h1>
      <p className="mt-1 text-text-secondary">
        Jobs you&apos;ve been assigned to. Track progress and update status.
      </p>

      <div className="mt-6 space-y-4">
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-bg p-8 text-center">
            <p className="text-text-secondary">
              No assigned jobs yet.{" "}
              <Link
                href="/tasker/jobs"
                className="text-secondary hover:text-secondary-hover font-medium"
              >
                Browse available jobs
              </Link>
            </p>
          </div>
        ) : (
          jobs.map((job) => (
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
                    {(job.category as unknown as { name: string } | null)?.name} &middot;{" "}
                    {(job.province as unknown as { name: string } | null)?.name}
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
          ))
        )}
      </div>
    </div>
  );
}
