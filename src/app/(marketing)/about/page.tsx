export const metadata = {
  title: "About Us – Wok Konek",
  description:
    "Learn about Wok Konek's mission to empower local skills and connect communities across Papua New Guinea.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-extrabold text-text mb-6">About Wok Konek</h1>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Wok Konek is a service marketplace designed specifically for Papua New
            Guinea. We connect clients who need work done with skilled local taskers
            who can get the job done. Our platform empowers local talent, supports
            communities, and makes it easy to find trusted help for any task.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Whether you need cleaning, construction, gardening, plumbing, or any
            other service, Wok Konek helps you find the right person for the job —
            all while supporting local businesses and workers across PNG.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">How We Started</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Wok Konek was born from a simple idea: making it easier for people in
            Papua New Guinea to find and hire local service providers. We recognized
            that many skilled workers struggle to find clients, while many people
            need help but don't know where to look.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Our platform bridges this gap by creating a trusted marketplace where
            clients can post jobs, receive competitive bids, and choose the best
            tasker for their needs — all while ensuring secure payments through
            BSP bank transfers.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">What Makes Us Different</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-bg-muted p-6">
              <h3 className="text-lg font-semibold text-text mb-2">
                Built for PNG
              </h3>
              <p className="text-text-secondary">
                We understand the local context. Our payment system uses BSP bank
                transfers that everyone already knows and trusts. Every payment is
                verified by our admin team before work begins.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-muted p-6">
              <h3 className="text-lg font-semibold text-text mb-2">
                Low Bandwidth Friendly
              </h3>
              <p className="text-text-secondary">
                We've designed Wok Konek to work smoothly even on slower internet
                connections. Our platform is lightweight, fast, and accessible on
                any device.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-muted p-6">
              <h3 className="text-lg font-semibold text-text mb-2">
                Transparent & Secure
              </h3>
              <p className="text-text-secondary">
                Every job has clear status tracking. Clients can see exactly where
                their job is in the process, and taskers know when they'll be paid.
                All payments are verified before work starts.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-muted p-6">
              <h3 className="text-lg font-semibold text-text mb-2">
                Supporting Local Talent
              </h3>
              <p className="text-text-secondary">
                We're committed to empowering local workers and businesses. By
                connecting clients with local taskers, we help keep money in local
                communities and support PNG's economy.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>
              <strong className="text-text">Trust:</strong> We verify payments and
              ensure both clients and taskers are protected.
            </li>
            <li>
              <strong className="text-text">Transparency:</strong> Clear job statuses
              and communication at every step.
            </li>
            <li>
              <strong className="text-text">Local Focus:</strong> Supporting PNG
              workers and communities first.
            </li>
            <li>
              <strong className="text-text">Accessibility:</strong> A platform that
              works for everyone, regardless of internet speed or device.
            </li>
            <li>
              <strong className="text-text">Fairness:</strong> Competitive bidding
              ensures taskers get fair pay, and clients get fair prices.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Join Us</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Whether you're a client looking for help or a tasker looking for work,
            Wok Konek is here to connect you. Join our growing community and be part
            of PNG's local service marketplace.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-secondary px-6 py-3 text-base font-semibold text-secondary hover:bg-secondary-light transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
