import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireRole("admin");
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: openJobs },
    { count: pendingPayments },
    { count: completedJobs },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("status", "open"),
    supabase
      .from("payment_proofs")
      .select("*", { count: "exact", head: true })
      .eq("status", "submitted"),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("status", "client_confirmed"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
      <p className="mt-1 text-text-secondary">
        Overview of platform activity.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Total Users</p>
          <p className="mt-1 text-3xl font-bold text-text">
            {totalUsers ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Open Jobs</p>
          <p className="mt-1 text-3xl font-bold text-text">
            {openJobs ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">
            Pending Payments
          </p>
          <p className="mt-1 text-3xl font-bold text-warning">
            {pendingPayments ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">
            Completed Jobs
          </p>
          <p className="mt-1 text-3xl font-bold text-success">
            {completedJobs ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/payments"
          className="rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text hover:bg-surface transition-colors"
        >
          Verify Payments
        </Link>
        <Link
          href="/admin/release-payment"
          className="rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text hover:bg-surface transition-colors"
        >
          Release Payments
        </Link>
        <Link
          href="/admin/jobs"
          className="rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text hover:bg-surface transition-colors"
        >
          View All Jobs
        </Link>
      </div>
    </div>
  );
}
