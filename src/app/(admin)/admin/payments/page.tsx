import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { VerifyPaymentActions } from "./_components/verify-payment-actions";

export default async function AdminPaymentsPage() {
  await requireRole("admin");
  const supabase = await createClient();

  // Get all payment proofs with job and uploader info
  const { data: proofs } = await supabase
    .from("payment_proofs")
    .select(
      "*, job:jobs!inner(id, title, fixed_price, commission_percent, status), uploader:profiles!payment_proofs_uploader_id_fkey(display_name, phone)"
    )
    .order("created_at", { ascending: false });

  const pendingProofs = proofs?.filter((p) => p.status === "submitted") ?? [];
  const processedProofs = proofs?.filter((p) => p.status !== "submitted") ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Payment Verification</h1>
      <p className="mt-1 text-text-secondary">
        Review and verify payment receipts from clients.
      </p>

      {/* Pending queue */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">
          Pending Verification ({pendingProofs.length})
        </h2>

        <div className="mt-4 space-y-4">
          {pendingProofs.length === 0 ? (
            <div className="rounded-lg border border-border bg-bg p-6 text-center">
              <p className="text-text-secondary">No pending payments to verify.</p>
            </div>
          ) : (
            pendingProofs.map((proof) => {
              const job = proof.job as unknown as {
                id: string;
                title: string;
                fixed_price: number;
                commission_percent: number;
                status: string;
              };
              const uploader = proof.uploader as unknown as {
                display_name: string;
                phone: string | null;
              };

              return (
                <div
                  key={proof.id}
                  className="rounded-lg border-2 border-warning bg-bg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-text">{job.title}</h3>
                      <p className="text-sm text-text-secondary">
                        Uploaded by: {uploader?.display_name}
                      </p>
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="mt-1 inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                      >
                        View job &rarr;
                      </Link>
                      <p className="text-sm text-text-muted">
                        Amount: K{Number(proof.amount).toLocaleString()} &middot;
                        File: {proof.original_filename}
                        {proof.bank_reference &&
                          ` · Ref: ${proof.bank_reference}`}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Submitted:{" "}
                        {new Date(proof.created_at).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-warning-light text-warning px-2.5 py-0.5 text-xs font-semibold">
                      Pending
                    </span>
                  </div>

                  <div className="mt-4">
                    <ViewReceiptLink
                      storagePath={proof.storage_path}
                    />
                  </div>

                  <div className="mt-3">
                    <VerifyPaymentActions proofId={proof.id} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Processed */}
      {processedProofs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-text">
            Recently Processed ({processedProofs.length})
          </h2>

          <div className="mt-4 space-y-3">
            {processedProofs.map((proof) => {
              const job = proof.job as unknown as {
                id: string;
                title: string;
              };

              return (
                <div
                  key={proof.id}
                  className="rounded-lg border border-border bg-bg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-text">{job.title}</h3>
                      <p className="text-sm text-text-muted">
                        K{Number(proof.amount).toLocaleString()}
                        {proof.reject_reason &&
                          ` · Reason: ${proof.reject_reason}`}
                      </p>
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="mt-1 inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                      >
                        View job &rarr;
                      </Link>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        proof.status === "verified"
                          ? "bg-success-light text-success"
                          : "bg-danger-light text-danger"
                      }`}
                    >
                      {proof.status === "verified" ? "Verified" : "Rejected"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

async function ViewReceiptLink({ storagePath }: { storagePath: string }) {
  const supabase = await createClient();

  const { data } = await supabase.storage
    .from("receipts")
    .createSignedUrl(storagePath, 3600); // 1 hour

  if (!data?.signedUrl) {
    return <span className="text-sm text-text-muted">Receipt unavailable</span>;
  }

  return (
    <a
      href={data.signedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors"
    >
      View Receipt &rarr;
    </a>
  );
}
