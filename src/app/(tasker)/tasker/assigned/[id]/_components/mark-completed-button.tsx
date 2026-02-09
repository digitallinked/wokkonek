"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markTaskerCompleted } from "@/lib/actions/progress";

export function MarkCompletedButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleComplete() {
    if (
      !confirm(
        "Mark this job as completed? The client will need to confirm before the job is closed."
      )
    )
      return;

    setLoading(true);
    const result = await markTaskerCompleted(jobId);

    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      className="rounded-md bg-success px-6 py-2 text-sm font-semibold text-white hover:bg-success/90 transition-colors disabled:opacity-50"
    >
      {loading ? "Completing..." : "Mark as Completed"}
    </button>
  );
}
