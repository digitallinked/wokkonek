import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; highlight?: string }>;
}) {
  await requireRole("admin");
  const { status: statusFilter, highlight } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("jobs")
    .select(
      "id, title, fixed_price, status, created_at, client:profiles!jobs_client_id_fkey(display_name), assigned_tasker:profiles!jobs_assigned_tasker_id_fkey(display_name), category:categories(name)"
    )
    .order("created_at", { ascending: false });

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  const { data: jobs } = await query;

  const statusCounts = await (async () => {
    const { data: all } = await supabase
      .from("jobs")
      .select("status");
    const counts: Record<string, number> = {};
    all?.forEach((j) => {
      counts[j.status] = (counts[j.status] ?? 0) + 1;
    });
    return counts;
  })();

  const statuses = [
    "open",
    "payment_pending",
    "payment_submitted",
    "payment_rejected",
    "in_progress",
    "tasker_completed",
    "client_confirmed",
    "cancelled",
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">All Jobs</h1>
      <p className="mt-1 text-text-secondary">
        View and monitor all jobs across the platform.
      </p>

      {/* Status filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/admin/jobs"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !statusFilter
              ? "bg-primary text-white"
              : "bg-surface text-text-secondary hover:bg-border"
          }`}
        >
          All
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/jobs?status=${s}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === s
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary hover:bg-border"
            }`}
          >
            {s.replace(/_/g, " ")} ({statusCounts[s] ?? 0})
          </Link>
        ))}
      </div>

      {/* Job list */}
      <div className="mt-6 space-y-4">
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-bg p-8 text-center">
            <p className="text-text-secondary">No jobs found.</p>
          </div>
        ) : (
          jobs.map((job) => {
            const client = job.client as unknown as {
              display_name: string | null;
            } | null;
            const tasker = job.assigned_tasker as unknown as {
              display_name: string | null;
            } | null;
            const category = job.category as unknown as {
              name: string | null;
            } | null;
            const isHighlighted = highlight === job.id;

            return (
              <div
                key={job.id}
                className={`rounded-lg border bg-bg p-4 transition-colors ${
                  isHighlighted
                    ? "border-2 border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text">{job.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {category?.name ?? "—"} &middot; Client:{" "}
                      {client?.display_name ?? "—"}
                      {tasker && ` · Tasker: ${tasker.display_name ?? "—"}`}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {new Date(job.created_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-text">
                      K{Number(job.fixed_price).toLocaleString()}
                    </span>
                    <JobStatusBadge status={job.status} />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <Link
                    href={`/admin/jobs/${job.id}`}
                    className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    View details &rarr;
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
