"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const CreateBidSchema = z.object({
  job_id: z.string().uuid(),
  amount: z.coerce
    .number()
    .positive("Bid amount must be greater than 0")
    .max(1000000, "Bid amount cannot exceed 1,000,000"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type CreateBidState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export async function createBid(
  _prevState: CreateBidState,
  formData: FormData
): Promise<CreateBidState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "You must be logged in." };
  }

  const rawData = {
    job_id: formData.get("job_id"),
    amount: formData.get("amount"),
    message: formData.get("message"),
  };

  const parsed = CreateBidSchema.safeParse(rawData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // Check job is open
  const { data: job } = await supabase
    .from("jobs")
    .select("status, client_id")
    .eq("id", parsed.data.job_id)
    .single();

  if (!job) return { message: "Job not found" };
  if (job.status !== "open") return { message: "This job is no longer accepting bids" };
  if (job.client_id === user.id) return { message: "You cannot bid on your own job" };

  // Check if already bid
  const { data: existingBid } = await supabase
    .from("bids")
    .select("id")
    .eq("job_id", parsed.data.job_id)
    .eq("tasker_id", user.id)
    .single();

  if (existingBid) return { message: "You have already placed a bid on this job" };

  const { error } = await supabase.from("bids").insert({
    job_id: parsed.data.job_id,
    tasker_id: user.id,
    amount: parsed.data.amount,
    message: parsed.data.message,
    status: "submitted",
  });

  if (error) {
    return { message: error.message };
  }

  return { success: true, message: "Bid submitted successfully!" };
}

export async function withdrawBid(bidId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("bids")
    .update({ status: "withdrawn" })
    .eq("id", bidId)
    .eq("tasker_id", user.id)
    .eq("status", "submitted");

  if (error) return { error: error.message };

  return { success: true };
}
