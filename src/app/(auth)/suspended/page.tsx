import Link from "next/link";

export default function SuspendedPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-bg rounded-xl border border-danger/30 shadow-sm p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger-light">
          <span className="text-2xl">🚫</span>
        </div>
        <h1 className="mt-4 text-xl font-bold text-text">
          Account Suspended
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Your account has been suspended by an administrator. If you believe
          this is an error, please contact support.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
