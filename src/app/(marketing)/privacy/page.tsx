export const metadata = {
  title: "Privacy Policy – Wok Konek",
  description:
    "Wok Konek's privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-extrabold text-text mb-6">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-text mb-4">Introduction</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Wok Konek ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our service marketplace platform
            ("Service").
          </p>
          <p className="text-text-secondary leading-relaxed">
            By using Wok Konek, you agree to the collection and use of information
            in accordance with this policy. If you do not agree with our policies
            and practices, please do not use our Service.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">
            Information We Collect
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text mb-2">
              Information You Provide
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                <strong className="text-text">Account Information:</strong> Name,
                email address, phone number, and role (client/tasker/admin)
              </li>
              <li>
                <strong className="text-text">Profile Information:</strong> Profile
                details, skills, location, and any other information you choose to
                provide
              </li>
              <li>
                <strong className="text-text">Job Information:</strong> Job
                postings, descriptions, budgets, locations, and related details
              </li>
              <li>
                <strong className="text-text">Bid Information:</strong> Bids you
                submit or receive, including amounts and messages
              </li>
              <li>
                <strong className="text-text">Payment Information:</strong> Payment
                receipts and related documents you upload
              </li>
              <li>
                <strong className="text-text">Communications:</strong> Messages,
                updates, and other communications sent through the platform
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text mb-2">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>
                <strong className="text-text">Usage Data:</strong> Information about
                how you access and use the Service, including pages viewed, time
                spent, and actions taken
              </li>
              <li>
                <strong className="text-text">Device Information:</strong> Device
                type, operating system, browser type, IP address, and similar
                technical information
              </li>
              <li>
                <strong className="text-text">Log Data:</strong> Server logs
                containing IP addresses, access times, and error information
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>To provide, maintain, and improve our Service</li>
            <li>To process and manage job postings, bids, and assignments</li>
            <li>To verify payments and process transactions</li>
            <li>To communicate with you about your account, jobs, and the Service</li>
            <li>To send you updates, notifications, and important information</li>
            <li>To detect, prevent, and address technical issues and fraud</li>
            <li>To comply with legal obligations and enforce our terms</li>
            <li>To analyze usage patterns and improve user experience</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">
            How We Share Your Information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We do not sell your personal information. We may share your information
            in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>
              <strong className="text-text">With Other Users:</strong> Your profile
              information and job postings are visible to other users as necessary
              for the Service to function
            </li>
            <li>
              <strong className="text-text">With Service Providers:</strong> We may
              share information with third-party service providers who help us
              operate the Service (e.g., hosting, analytics)
            </li>
            <li>
              <strong className="text-text">For Legal Reasons:</strong> We may
              disclose information if required by law or to protect our rights and
              safety
            </li>
            <li>
              <strong className="text-text">With Your Consent:</strong> We may share
              information with your explicit consent
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Data Security</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect
            your personal information. However, no method of transmission over the
            internet or electronic storage is 100% secure. While we strive to use
            commercially acceptable means to protect your information, we cannot
            guarantee absolute security.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Payment receipts and sensitive documents are stored securely and are
            only accessible to authorized administrators for verification purposes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Your Rights</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>Access and review your personal information</li>
            <li>Update or correct your information through your account settings</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of certain communications (while maintaining essential service communications)</li>
            <li>Request a copy of your data</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mt-4">
            To exercise these rights, please contact us using the information
            provided in the Contact section below.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Data Retention</h2>
          <p className="text-text-secondary leading-relaxed">
            We retain your personal information for as long as necessary to provide
            the Service and fulfill the purposes outlined in this Privacy Policy.
            When you delete your account, we will delete or anonymize your personal
            information, except where we are required to retain it for legal,
            regulatory, or legitimate business purposes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Children's Privacy</h2>
          <p className="text-text-secondary leading-relaxed">
            Our Service is not intended for individuals under the age of 18. We do
            not knowingly collect personal information from children. If you become
            aware that a child has provided us with personal information, please
            contact us, and we will take steps to delete such information.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you
            of any changes by posting the new Privacy Policy on this page and
            updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">Contact Us</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <div className="rounded-lg border border-border bg-bg-muted p-6">
            <p className="text-text-secondary">
              <strong className="text-text">Wok Konek</strong>
              <br />
              Email: <a href="/contact" className="text-primary hover:underline">Contact Form</a>
              <br />
              <br />
              For privacy-related inquiries, please use our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact form
              </a>{" "}
              and select "General Inquiry" or "Privacy Question" as the subject.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
