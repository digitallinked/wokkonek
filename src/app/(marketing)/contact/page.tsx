"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // In a real app, you'd send this to an API endpoint or email service
    // For MVP, we'll just show a success message
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text mb-4">Contact Us</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Have a question, suggestion, or need help? We'd love to hear from you.
          Get in touch and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* ─── Contact Info ─── */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-text mb-6">Get in Touch</h2>
            <p className="text-text-secondary mb-6">
              We're here to help! Whether you have questions about using Wok Konek,
              need support with your account, or want to provide feedback, we're
              listening.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-bg-muted p-4">
              <h3 className="font-semibold text-text mb-1">General Inquiries</h3>
              <p className="text-sm text-text-secondary">
                For general questions about Wok Konek, how it works, or account
                support.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-bg-muted p-4">
              <h3 className="font-semibold text-text mb-1">Payment Issues</h3>
              <p className="text-sm text-text-secondary">
                Having trouble with payment verification or receipt uploads? We can
                help.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-bg-muted p-4">
              <h3 className="font-semibold text-text mb-1">Technical Support</h3>
              <p className="text-sm text-text-secondary">
                Experiencing technical issues? Let us know and we'll investigate.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-bg-muted p-4">
              <h3 className="font-semibold text-text mb-1">Feedback & Suggestions</h3>
              <p className="text-sm text-text-secondary">
                We're always improving. Share your ideas and feedback with us.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Contact Form ─── */}
        <div className="rounded-lg border border-border bg-bg p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-light mb-4">
                <svg
                  className="h-8 w-8 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Message Sent!
              </h3>
              <p className="text-text-secondary mb-6">
                Thank you for contacting us. We'll get back to you as soon as
                possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-bg px-4 py-2 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-bg px-4 py-2 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-bg px-4 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="payment">Payment Issue</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-bg px-4 py-2 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {error && (
                <div className="rounded-md bg-danger-light border border-danger p-3">
                  <p className="text-sm text-danger">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ─── FAQ Section ─── */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-bg-muted p-6">
            <h3 className="font-semibold text-text mb-2">
              How long does payment verification take?
            </h3>
            <p className="text-sm text-text-secondary">
              Our admin team typically verifies payment receipts within 24 hours
              during business days. Once verified, the tasker can begin work
              immediately.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-bg-muted p-6">
            <h3 className="font-semibold text-text mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-sm text-text-secondary">
              Currently, we use BSP bank transfers. Clients make the transfer and
              upload a receipt, which our admin team verifies before work begins.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-bg-muted p-6">
            <h3 className="font-semibold text-text mb-2">
              Can I cancel a job after accepting a bid?
            </h3>
            <p className="text-sm text-text-secondary">
              If payment hasn't been verified yet, you can cancel. Once payment is
              verified and work begins, cancellation policies apply. Contact us for
              specific situations.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-bg-muted p-6">
            <h3 className="font-semibold text-text mb-2">
              How do I become a tasker?
            </h3>
            <p className="text-sm text-text-secondary">
              Simply sign up and choose "Tasker" as your role. You can then browse
              available jobs and start bidding on work that matches your skills.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
