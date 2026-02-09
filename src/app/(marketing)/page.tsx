import Image from "next/image";
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

const stats = [
  { label: "Jobs posted", value: "2,400+" },
  { label: "Verified taskers", value: "180+" },
  { label: "Avg. response time", value: "2 hours" },
];

const highlights = [
  {
    title: "Verified payments",
    description:
      "Every BSP transfer receipt is reviewed before work begins.",
  },
  {
    title: "Transparent job tracking",
    description: "Know exactly where a job sits at every step.",
  },
  {
    title: "Low-bandwidth friendly",
    description: "Built to work smoothly on any device and connection.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                Trusted local talent
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
                Get local help,{" "}
                <span className="text-primary">fast</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-text-secondary">
                Post any job. Receive bids from skilled locals. Choose the best
                tasker and get work done across Papua New Guinea.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
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
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-bg p-4 shadow-sm">
                    <p className="text-xl font-semibold text-text">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-8 -right-6 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />
              <Image
                src="/assets/hero-placeholder.svg"
                alt="Wok Konek preview"
                width={720}
                height={540}
                className="relative w-full rounded-3xl border border-border bg-white shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-2xl font-bold text-text">
              Popular categories
            </h2>
            <p className="text-sm text-text-secondary">
              From quick fixes to big projects, find the right help.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-bg p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-medium text-text">
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
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-text">
                How Wok Konek works
              </h2>
              <p className="mt-3 text-sm text-text-secondary">
                A simple, secure flow that keeps everyone informed.
              </p>
              <div className="mt-8 space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-4 rounded-2xl border border-border bg-bg p-5 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="/assets/steps-placeholder.svg"
                alt="Job flow preview"
                width={720}
                height={520}
                className="w-full rounded-3xl border border-border bg-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust block ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-text">
                Built for Papua New Guinea
              </h2>
              <p className="mt-4 text-text-secondary">
                Wok Konek uses BSP bank transfers you already know. Every payment
                is verified by our admin team before work begins — so both
                clients and taskers are protected.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-2xl border border-border bg-bg p-5 shadow-sm"
                  >
                    <h3 className="font-semibold text-text">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Image
                src="/assets/trust-placeholder.svg"
                alt="Safety and payment verification"
                width={680}
                height={520}
                className="w-full rounded-3xl border border-border bg-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-bg px-6 py-10 text-center shadow-sm sm:px-12">
            <h2 className="text-3xl font-bold text-text">
              Ready to get started?
            </h2>
            <p className="mt-3 text-text-secondary">
              Post your first job or start bidding in minutes.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                Become a Tasker
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
