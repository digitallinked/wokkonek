const statusConfig: Record<string, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-accent-light text-accent",
  },
  assigned: {
    label: "Assigned",
    className: "bg-secondary-light text-secondary",
  },
  payment_pending: {
    label: "Payment Pending",
    className: "bg-warning-light text-warning",
  },
  payment_submitted: {
    label: "Payment Submitted",
    className: "bg-warning-light text-warning",
  },
  payment_verified: {
    label: "Payment Verified",
    className: "bg-success-light text-success",
  },
  payment_rejected: {
    label: "Payment Rejected",
    className: "bg-danger-light text-danger",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-secondary-light text-secondary",
  },
  tasker_completed: {
    label: "Tasker Completed",
    className: "bg-success-light text-success",
  },
  client_confirmed: {
    label: "Completed",
    className: "bg-success-light text-success",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-surface text-text-muted",
  },
};

export function JobStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-surface text-text-muted",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
