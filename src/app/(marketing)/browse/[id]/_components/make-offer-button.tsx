"use client";

import Link from "next/link";

export function MakeOfferButton({
  jobId,
  isLoggedIn,
  isTasker,
}: {
  jobId: string;
  isLoggedIn: boolean;
  isTasker: boolean;
}) {
  if (!isLoggedIn) {
    return (
      <div className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-text">Make an offer</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Sign in or create an account to make an offer on this task.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href={`/sign-in?redirect=/tasker/jobs/${jobId}`}
            className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Log in
          </Link>
          <Link
            href={`/sign-up?redirect=/tasker/jobs/${jobId}`}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  if (!isTasker) {
    return (
      <div className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-text">Make an offer</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Create a tasker profile to make offers on tasks. You can be both a
          client and a tasker.
        </p>
        <Link
          href="/choose-role"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          Set up tasker profile
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={`/tasker/jobs/${jobId}`}
      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
    >
      Make an offer
    </Link>
  );
}
