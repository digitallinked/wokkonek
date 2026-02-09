"use server";

import { createClient } from "@/lib/supabase/server";

export async function postJobUpdate(jobId: string, message: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Verify user is the assigned tasker and job is in_progress
  const { data: job } = await supabase
    .from("jobs")
    .select("assigned_tasker_id, status")
    .eq("id", jobId)
    .single();

  if (!job) return { error: "Job not found" };
  if (job.assigned_tasker_id !== user.id) return { error: "Not your job" };
  if (job.status !== "in_progress")
    return { error: "Job is not in progress" };

  if (!message.trim()) return { error: "Message cannot be empty" };

  const { error } = await supabase.from("job_updates").insert({
    job_id: jobId,
    author_id: user.id,
    message: message.trim(),
  });

  if (error) return { error: error.message };

  return { success: true };
}

export async function markTaskerCompleted(jobId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: job } = await supabase
    .from("jobs")
    .select("assigned_tasker_id, status")
    .eq("id", jobId)
    .single();

  if (!job) return { error: "Job not found" };
  if (job.assigned_tasker_id !== user.id) return { error: "Not your job" };
  if (job.status !== "in_progress")
    return { error: "Job must be in progress to mark as completed" };

  const { error } = await supabase
    .from("jobs")
    .update({ status: "tasker_completed" })
    .eq("id", jobId);

  if (error) return { error: error.message };

  // Post an automatic update
  await supabase.from("job_updates").insert({
    job_id: jobId,
    author_id: user.id,
    message: "Tasker marked this job as completed. Waiting for client confirmation.",
  });

  return { success: true };
}

export async function confirmCompletion(jobId: string) {
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
  if (job.status !== "tasker_completed")
    return { error: "Tasker has not marked this job as completed" };

  const { error } = await supabase
    .from("jobs")
    .update({ status: "client_confirmed" })
    .eq("id", jobId);

  if (error) return { error: error.message };

  // Post an automatic update
  await supabase.from("job_updates").insert({
    job_id: jobId,
    author_id: user.id,
    message: "Client confirmed job completion. Job is now closed.",
  });

  return { success: true };
}
