"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptBid } from "@/lib/actions/jobs";

export function AcceptBidButton({
  jobId,
  bidId,
}: {
  jobId: string;
  bidId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    if (!confirm("Accept this bid? All other bids will be rejected.")) return;

    setLoading(true);
    const result = await acceptBid(jobId, bidId);

    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleAccept}
      disabled={loading}
      className="rounded-md bg-success px-4 py-1.5 text-sm font-semibold text-white hover:bg-success/90 transition-colors disabled:opacity-50"
    >
      {loading ? "Accepting..." : "Accept Bid"}
    </button>
  );
}
