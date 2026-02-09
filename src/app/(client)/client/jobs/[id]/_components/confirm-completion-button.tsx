"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmCompletion } from "@/lib/actions/progress";

export function ConfirmCompletionButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (
      !confirm(
        "Confirm this job is completed? This will close the job permanently."
      )
    )
      return;

    setLoading(true);
    const result = await confirmCompletion(jobId);

    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="rounded-md bg-success px-6 py-2 text-sm font-semibold text-white hover:bg-success/90 transition-colors disabled:opacity-50"
    >
      {loading ? "Confirming..." : "Confirm Completion"}
    </button>
  );
}
