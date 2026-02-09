export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Total Users</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">Open Jobs</p>
          <p className="mt-1 text-3xl font-bold text-text">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">
            Pending Payments
          </p>
          <p className="mt-1 text-3xl font-bold text-warning">0</p>
        </div>
        <div className="rounded-lg border border-border bg-bg p-6">
          <p className="text-sm font-medium text-text-muted">
            Completed Jobs
          </p>
          <p className="mt-1 text-3xl font-bold text-success">0</p>
        </div>
      </div>
    </div>
  );
}
