"use client";

import { useState } from "react";
import { uploadPaymentProof } from "@/lib/actions/payments";

export function PaymentUploadForm({ jobId }: { jobId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await uploadPaymentProof(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success, the server action redirects
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="job_id" value={jobId} />

      {error && (
        <div className="rounded-md bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="receipt"
          className="block text-sm font-medium text-text"
        >
          Payment Receipt
        </label>
        <p className="text-xs text-text-muted mb-2">
          Upload a photo or PDF of your BSP transfer receipt. Max 5MB.
        </p>
        <input
          id="receipt"
          name="receipt"
          type="file"
          required
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover file:cursor-pointer"
        />
        {selectedFile && (
          <p className="mt-1 text-xs text-text-muted">
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="bank_reference"
          className="block text-sm font-medium text-text"
        >
          Bank Reference Number{" "}
          <span className="text-text-muted">(optional)</span>
        </label>
        <input
          id="bank_reference"
          name="bank_reference"
          type="text"
          className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="e.g. BSP12345678"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !selectedFile}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Uploading..." : "Upload Receipt"}
      </button>
    </form>
  );
}
