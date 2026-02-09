import Link from "next/link";

export default function ClientDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <Link
          href="/client/jobs/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          Post a Job
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Open Jobs</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">In Progress</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Completed</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">Recent Jobs</h2>
        <div className="mt-4 rounded-lg border border-border bg-bg p-8 text-center">
          <p className="text-text-secondary">
            No jobs yet.{" "}
            <Link
              href="/client/jobs/new"
              className="text-primary hover:text-primary-hover font-medium"
            >
              Post your first job
            </Link>{" "}
            to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
