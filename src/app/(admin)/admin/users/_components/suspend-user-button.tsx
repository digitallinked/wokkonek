"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleUserSuspend } from "@/lib/actions/admin";

export function SuspendUserButton({
  userId,
  isSuspended,
}: {
  userId: string;
  isSuspended: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    const action = isSuspended ? "unsuspend" : "suspend";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    setLoading(true);
    const result = await toggleUserSuspend(userId, !isSuspended);

    if (result.error) {
      alert(result.error);
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`text-xs font-medium px-3 py-1 rounded-md transition-colors disabled:opacity-50 ${
        isSuspended
          ? "text-success hover:bg-success-light"
          : "text-danger hover:bg-danger-light"
      }`}
    >
      {loading ? "..." : isSuspended ? "Unsuspend" : "Suspend"}
    </button>
  );
}
