"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function uploadPaymentProof(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const jobId = formData.get("job_id") as string;
  const file = formData.get("receipt") as File;
  const bankReference = (formData.get("bank_reference") as string) || null;

  if (!jobId || !file) return { error: "Missing required fields" };

  // Validate file
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (!allowedTypes.includes(file.type)) {
    return { error: "File must be JPG, PNG, WebP, or PDF" };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File must be under 5MB" };
  }

  // Verify the job belongs to this user and is in payment_pending status
  const { data: job } = await supabase
    .from("jobs")
    .select("client_id, status, fixed_price, commission_percent")
    .eq("id", jobId)
    .single();

  if (!job) return { error: "Job not found" };
  if (job.client_id !== user.id) return { error: "Not your job" };
  if (job.status !== "payment_pending" && job.status !== "payment_rejected") {
    return { error: "Job is not awaiting payment" };
  }

  // Upload file to storage
  const ext = file.name.split(".").pop() || "jpg";
  const storagePath = `${user.id}/${jobId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) return { error: `Upload failed: ${uploadError.message}` };

  // Calculate total with commission
  const totalAmount =
    Number(job.fixed_price) *
    (1 + Number(job.commission_percent) / 100);

  // Create payment proof record
  const { error: proofError } = await supabase
    .from("payment_proofs")
    .insert({
      job_id: jobId,
      uploader_id: user.id,
      storage_path: storagePath,
      original_filename: file.name,
      mime_type: file.type,
      amount: totalAmount,
      bank_reference: bankReference,
      status: "submitted",
    });

  if (proofError) return { error: proofError.message };

  // Update job status
  const { error: jobError } = await supabase
    .from("jobs")
    .update({ status: "payment_submitted" })
    .eq("id", jobId);

  if (jobError) return { error: jobError.message };

  redirect(`/client/jobs/${jobId}`);
}

export async function verifyPayment(
  proofId: string,
  action: "verify" | "reject",
  reason?: string
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Verify admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Not authorized" };

  // Get payment proof
  const { data: proof } = await supabase
    .from("payment_proofs")
    .select("*, job:jobs!inner(id, status)")
    .eq("id", proofId)
    .single();

  if (!proof) return { error: "Payment proof not found" };
  if (proof.status !== "submitted")
    return { error: "Payment proof already processed" };

  const jobId = (proof.job as unknown as { id: string }).id;

  if (action === "verify") {
    // Verify the payment
    await supabase
      .from("payment_proofs")
      .update({
        status: "verified",
        verified_by: user.id,
        verified_at: new Date().toISOString(),
      })
      .eq("id", proofId);

    // Update job to in_progress
    await supabase
      .from("jobs")
      .update({ status: "in_progress" })
      .eq("id", jobId);

    // Log admin action
    await supabase.from("admin_actions").insert({
      admin_id: user.id,
      action_type: "verify_payment",
      entity_type: "payment_proof",
      entity_id: proofId,
      metadata: { job_id: jobId },
    });
  } else {
    // Reject the payment
    await supabase
      .from("payment_proofs")
      .update({
        status: "rejected",
        verified_by: user.id,
        verified_at: new Date().toISOString(),
        reject_reason: reason || "Payment verification failed",
      })
      .eq("id", proofId);

    // Update job back to payment_rejected
    await supabase
      .from("jobs")
      .update({ status: "payment_rejected" })
      .eq("id", jobId);

    // Log admin action
    await supabase.from("admin_actions").insert({
      admin_id: user.id,
      action_type: "reject_payment",
      entity_type: "payment_proof",
      entity_id: proofId,
      metadata: { job_id: jobId, reason: reason || "" },
    });
  }

  return { success: true };
}
