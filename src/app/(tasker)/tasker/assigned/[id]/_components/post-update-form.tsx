"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postJobUpdate } from "@/lib/actions/progress";

export function PostUpdateForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await postJobUpdate(jobId, message);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setMessage("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="rounded-md bg-danger-light border border-danger/20 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        required
        className="block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        placeholder="Post a progress update..."
      />

      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="rounded-md bg-secondary px-4 py-1.5 text-sm font-semibold text-white hover:bg-secondary-hover transition-colors disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Update"}
      </button>
    </form>
  );
}
