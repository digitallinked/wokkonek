import Link from "next/link";

export const metadata = {
  title: "How It Works – Wok Konek",
  description:
    "Learn how Wok Konek connects clients with skilled taskers in Papua New Guinea. Simple, secure, and transparent.",
};

const clientSteps = [
  {
    number: "1",
    title: "Post Your Job",
    description:
      "Create a job posting with details about what you need done, your budget, and location. Be specific to attract the right taskers.",
    details: [
      "Choose a category (cleaning, construction, gardening, etc.)",
      "Describe the work needed",
      "Set your budget",
      "Specify your location",
      "Publish your job",
    ],
  },
  {
    number: "2",
    title: "Receive Bids",
    description:
      "Skilled taskers in your area will review your job and submit competitive bids. You'll see their profiles and proposed prices.",
    details: [
      "Review bids from qualified taskers",
      "Compare prices and profiles",
      "Ask questions if needed",
      "Choose the best fit for your job",
    ],
  },
  {
    number: "3",
    title: "Accept a Bid & Pay",
    description:
      "Once you accept a bid, you'll pay via BSP bank transfer. Upload your receipt, and our admin team will verify it before work begins.",
    details: [
      "Accept the tasker's bid",
      "Make payment via BSP bank transfer",
      "Upload your payment receipt",
      "Wait for admin verification (usually within 24 hours)",
    ],
  },
  {
    number: "4",
    title: "Work Begins",
    description:
      "After payment is verified, the tasker starts working. You'll receive updates on progress throughout the job.",
    details: [
      "Tasker begins work",
      "Receive progress updates",
      "Communicate with your tasker",
      "Track job status in real-time",
    ],
  },
  {
    number: "5",
    title: "Confirm Completion",
    description:
      "When the tasker marks the job as complete, review their work and confirm completion. Once confirmed, the job is finished!",
    details: [
      "Tasker marks job as complete",
      "Review the completed work",
      "Confirm if everything is done correctly",
      "Job status updates to completed",
    ],
  },
];

const taskerSteps = [
  {
    number: "1",
    title: "Browse Open Jobs",
    description:
      "Search through available jobs in your area. Filter by category, location, and budget to find jobs that match your skills.",
    details: [
      "Browse job listings",
      "Filter by category and location",
      "Review job details and budgets",
      "Find jobs that match your expertise",
    ],
  },
  {
    number: "2",
    title: "Submit Your Bid",
    description:
      "Submit a competitive bid for jobs you're interested in. Include your proposed price and any relevant information about your experience.",
    details: [
      "Review job requirements",
      "Submit your bid amount",
      "Add any relevant notes",
      "Wait for client to review",
    ],
  },
  {
    number: "3",
    title: "Get Assigned",
    description:
      "If the client accepts your bid, you'll be notified. Once they upload and verify their payment receipt, you can start working.",
    details: [
      "Client accepts your bid",
      "Client makes payment via BSP",
      "Admin verifies payment receipt",
      "Job status changes to 'in progress'",
    ],
  },
  {
    number: "4",
    title: "Complete the Work",
    description:
      "Do the work professionally and keep the client updated. Post progress updates and mark the job complete when finished.",
    details: [
      "Start working on the job",
      "Post progress updates",
      "Communicate with the client",
      "Mark job as complete when done",
    ],
  },
  {
    number: "5",
    title: "Get Confirmed",
    description:
      "The client will review your work and confirm completion. Once confirmed, the job is complete and payment is verified.",
    details: [
      "Client reviews your work",
      "Client confirms completion",
      "Job status updates to completed",
      "Payment is already verified",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text mb-4">
          How Wok Konek Works
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          A simple, secure way to connect clients with skilled taskers across
          Papua New Guinea. Here's how it works for both sides.
        </p>
      </div>

      {/* ─── For Clients ─── */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-2">For Clients</h2>
          <p className="text-text-secondary">
            Post a job, receive bids, choose a tasker, and get work done.
          </p>
        </div>

        <div className="space-y-8">
          {clientSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col sm:flex-row gap-6 rounded-lg border border-border bg-bg p-6 hover:border-primary transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary mb-4">{step.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── For Taskers ─── */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-2">For Taskers</h2>
          <p className="text-text-secondary">
            Browse jobs, submit bids, get assigned, complete work, and get paid.
          </p>
        </div>

        <div className="space-y-8">
          {taskerSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col sm:flex-row gap-6 rounded-lg border border-border bg-bg p-6 hover:border-secondary transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary mb-4">{step.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Payment & Security ─── */}
      <section className="bg-bg-muted rounded-lg border border-border p-8 mb-8">
        <h2 className="text-2xl font-bold text-text mb-4 text-center">
          Payment & Security
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-text mb-2">BSP Bank Transfer</h3>
            <p className="text-text-secondary text-sm">
              We use BSP bank transfers that everyone in PNG already knows and
              trusts. No need for new payment methods or complicated setups.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">Admin Verification</h3>
            <p className="text-text-secondary text-sm">
              Every payment receipt is verified by our admin team before work
              begins. This protects both clients and taskers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">Clear Status Tracking</h3>
            <p className="text-text-secondary text-sm">
              Every job has a clear status — from posting to completion. You always
              know where things stand.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">Transparent Process</h3>
            <p className="text-text-secondary text-sm">
              No hidden fees. No surprises. You see exactly what you're paying for
              and when work will start.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-text mb-4">Ready to Get Started?</h2>
        <p className="text-text-secondary mb-6">
          Join Wok Konek today and start connecting with skilled taskers or find
          work opportunities.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Sign Up Now
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-secondary px-8 py-3 text-base font-semibold text-secondary hover:bg-secondary-light transition-colors"
          >
            Have Questions?
          </Link>
        </div>
      </section>
    </div>
  );
}
