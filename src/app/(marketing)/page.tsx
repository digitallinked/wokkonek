import Link from "next/link";

const categories = [
  { name: "Cleaning", icon: "🧹" },
  { name: "Building & Construction", icon: "🏗️" },
  { name: "Gardening", icon: "🌿" },
  { name: "Painting", icon: "🎨" },
  { name: "Plumbing", icon: "🔧" },
  { name: "Electrician", icon: "⚡" },
  { name: "Delivery", icon: "🚚" },
  { name: "Handyman", icon: "🛠️" },
];

const steps = [
  {
    number: "1",
    title: "Post your job",
    description: "Describe what you need, set your budget, and publish.",
  },
  {
    number: "2",
    title: "Receive bids",
    description: "Skilled taskers in your area will send you their best offers.",
  },
  {
    number: "3",
    title: "Get it done",
    description:
      "Choose the right tasker, pay via BSP bank transfer, and confirm when complete.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Get local help,{" "}
            <span className="text-primary">fast</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-text-secondary">
            Post any job. Receive bids from skilled locals. Choose the best
            tasker and get work done across Papua New Guinea.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
            >
              Post a Job
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-lg border-2 border-secondary px-8 py-3 text-base font-semibold text-secondary hover:bg-secondary-light transition-colors"
            >
              Find Work
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text text-center">
            Popular categories
          </h2>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-bg p-6 hover:border-primary hover:shadow-sm transition-all cursor-pointer"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-medium text-text-secondary">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text text-center">
            How Wok Konek works
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust block ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-text">
            Built for Papua New Guinea
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-text-secondary">
            Wok Konek uses BSP bank transfers you already know. Every payment is
            verified by our admin team before work begins — so both clients and
            taskers are protected.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-text">Verified Payments</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Admin verifies every BSP transfer receipt before work starts.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-text">Local & Accessible</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Designed for low bandwidth. Works on any device, any connection.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-text">Clear Job Tracking</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Every job has a clear status — from posting to completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
