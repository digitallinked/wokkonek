"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createBid, type CreateBidState } from "@/lib/actions/bids";
import { useEffect } from "react";

export function BidForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<CreateBidState, FormData>(
    createBid,
    {}
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="job_id" value={jobId} />

      {state.message && !state.success && (
        <div className="rounded-md bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
          {state.message}
        </div>
      )}

      {state.success && (
        <div className="rounded-md bg-success-light border border-success/20 px-4 py-3 text-sm text-success">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-text">
          Your price (PGK)
        </label>
        <div className="mt-1 relative">
          <span className="absolute left-3 top-2 text-sm text-text-muted">
            K
          </span>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="1"
            required
            className="block w-full rounded-md border border-border bg-bg pl-8 pr-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="0.00"
          />
        </div>
        {state.errors?.amount && (
          <p className="mt-1 text-sm text-danger">{state.errors.amount[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-text"
        >
          Message to client
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          placeholder="Explain your experience and why you're right for this job..."
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-danger">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending || state.success}
        className="w-full rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Submitting..." : "Submit Bid"}
      </button>
    </form>
  );
}
