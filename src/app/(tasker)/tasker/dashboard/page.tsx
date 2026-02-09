import Link from "next/link";

export default function TaskerDashboard() {
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
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Assigned Jobs</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Completed</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">Your Assigned Jobs</h2>
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
      </div>
    </div>
  );
}
