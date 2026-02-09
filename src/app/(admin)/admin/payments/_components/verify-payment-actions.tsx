"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyPayment } from "@/lib/actions/payments";

export function VerifyPaymentActions({ proofId }: { proofId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  async function handleVerify() {
    if (!confirm("Approve this payment? The job will move to In Progress."))
      return;

    setLoading(true);
    const result = await verifyPayment(proofId, "verify");

    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  async function handleReject() {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    setLoading(true);
    const result = await verifyPayment(proofId, "reject", rejectReason);

    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div>
      {!showRejectForm ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleVerify}
            disabled={loading}
            className="rounded-md bg-success px-4 py-1.5 text-sm font-semibold text-white hover:bg-success/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Approve"}
          </button>
          <button
            onClick={() => setShowRejectForm(true)}
            disabled={loading}
            className="rounded-md bg-danger px-4 py-1.5 text-sm font-semibold text-white hover:bg-danger/90 transition-colors disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={2}
            className="block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-danger focus:outline-none focus:ring-1 focus:ring-danger"
            placeholder="Reason for rejection..."
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              disabled={loading}
              className="rounded-md bg-danger px-4 py-1.5 text-sm font-semibold text-white hover:bg-danger/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Rejecting..." : "Confirm Reject"}
            </button>
            <button
              onClick={() => setShowRejectForm(false)}
              className="rounded-md border border-border px-4 py-1.5 text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
