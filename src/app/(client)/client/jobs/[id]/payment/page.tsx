import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { PaymentUploadForm } from "./_components/payment-upload-form";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await requireRole("client");
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, fixed_price, commission_percent, status, client_id")
    .eq("id", id)
    .eq("client_id", user.id)
    .single();

  if (!job) notFound();

  // Only allow payment upload for payment_pending or payment_rejected
  if (job.status !== "payment_pending" && job.status !== "payment_rejected") {
    redirect(`/client/jobs/${id}`);
  }

  const commission =
    Number(job.fixed_price) * (Number(job.commission_percent) / 100);
  const totalAmount = Number(job.fixed_price) + commission;

  return (
    <div>
      <Link
        href={`/client/jobs/${id}`}
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        &larr; Back to Job
      </Link>

      <div className="mt-4 max-w-xl">
        <h1 className="text-2xl font-bold text-text">Upload Payment Receipt</h1>
        <p className="mt-1 text-text-secondary">
          Transfer the payment via BSP bank transfer, then upload your receipt.
        </p>

        {job.status === "payment_rejected" && (
          <div className="mt-4 rounded-md bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
            Your previous payment was rejected. Please upload a new receipt.
          </div>
        )}

        {/* Payment details */}
        <div className="mt-6 rounded-lg border border-border bg-bg p-6">
          <h2 className="font-semibold text-text">Payment Details</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Job Price</span>
              <span className="text-sm font-medium text-text">
                K{Number(job.fixed_price).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">
                Commission (25%)
              </span>
              <span className="text-sm font-medium text-warning">
                K{commission.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-sm font-semibold text-text">
                Total to Transfer
              </span>
              <span className="text-lg font-bold text-primary">
                K{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* BSP instructions */}
        <div className="mt-4 rounded-lg border-2 border-primary/20 bg-primary-light p-6">
          <h3 className="font-semibold text-text">BSP Bank Transfer</h3>
          <div className="mt-3 space-y-2 text-sm text-text-secondary">
            <p>
              <strong>Bank:</strong> BSP (Bank of South Pacific)
            </p>
            <p>
              <strong>Account Name:</strong> Wok Konek Ltd
            </p>
            <p>
              <strong>Account Number:</strong> 1234567890
            </p>
            <p>
              <strong>Branch:</strong> Waigani, NCD
            </p>
            <p>
              <strong>Reference:</strong> WK-{id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Upload form */}
        <div className="mt-6">
          <PaymentUploadForm jobId={id} />
        </div>
      </div>
    </div>
  );
}
