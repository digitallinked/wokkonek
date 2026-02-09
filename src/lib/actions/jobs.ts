"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateJobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category_id: z.string().uuid("Please select a category"),
  province_id: z.string().uuid("Please select a province"),
  district_id: z.string().uuid("Please select a district").optional(),
  fixed_price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .max(1000000, "Price cannot exceed 1,000,000"),
});

export type CreateJobState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export async function createJob(
  _prevState: CreateJobState,
  formData: FormData
): Promise<CreateJobState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "You must be logged in." };
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    province_id: formData.get("province_id"),
    district_id: formData.get("district_id") || undefined,
    fixed_price: formData.get("fixed_price"),
  };

  const parsed = CreateJobSchema.safeParse(rawData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // Get current commission rate
  const { data: commission } = await supabase
    .from("commission_settings")
    .select("percent")
    .order("effective_from", { ascending: false })
    .limit(1)
    .single();

  const { error } = await supabase.from("jobs").insert({
    client_id: user.id,
    title: parsed.data.title,
    description: parsed.data.description,
    category_id: parsed.data.category_id,
    province_id: parsed.data.province_id,
    district_id: parsed.data.district_id || null,
    fixed_price: parsed.data.fixed_price,
    commission_percent: commission?.percent ?? 25,
    status: "open",
  });

  if (error) {
    return { message: error.message };
  }

  redirect("/client/jobs");
}

export async function acceptBid(jobId: string, bidId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Get the bid to find the tasker
  const { data: bid } = await supabase
    .from("bids")
    .select("*, job:jobs!inner(client_id, status)")
    .eq("id", bidId)
    .single();

  if (!bid) return { error: "Bid not found" };
  if (bid.job.client_id !== user.id) return { error: "Not your job" };
  if (bid.job.status !== "open") return { error: "Job is not open" };

  // Accept this bid
  const { error: bidError } = await supabase
    .from("bids")
    .update({ status: "accepted" })
    .eq("id", bidId);

  if (bidError) return { error: bidError.message };

  // Reject all other bids for this job
  await supabase
    .from("bids")
    .update({ status: "rejected" })
    .eq("job_id", jobId)
    .neq("id", bidId)
    .eq("status", "submitted");

  // Update job status and assign tasker
  const { error: jobError } = await supabase
    .from("jobs")
    .update({
      status: "payment_pending",
      assigned_tasker_id: bid.tasker_id,
    })
    .eq("id", jobId);

  if (jobError) return { error: jobError.message };

  return { success: true };
}

export async function cancelJob(jobId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: job } = await supabase
    .from("jobs")
    .select("client_id, status")
    .eq("id", jobId)
    .single();

  if (!job) return { error: "Job not found" };
  if (job.client_id !== user.id) return { error: "Not your job" };
  if (!["open", "assigned"].includes(job.status))
    return { error: "Job cannot be cancelled at this stage" };

  const { error } = await supabase
    .from("jobs")
    .update({ status: "cancelled" })
    .eq("id", jobId);

  if (error) return { error: error.message };

  return { success: true };
}
