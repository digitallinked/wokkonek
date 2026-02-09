export const metadata = {
  title: "Terms & Conditions – Wok Konek",
  description:
    "Terms and conditions for using Wok Konek. Read our terms of service before using the platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-extrabold text-text mb-6">
          Terms & Conditions
        </h1>
        <p className="text-text-secondary mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-text mb-4">1. Acceptance of Terms</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            By accessing and using Wok Konek ("Service," "Platform," "we," "our," or
            "us"), you accept and agree to be bound by these Terms & Conditions. If
            you do not agree to these terms, please do not use our Service.
          </p>
          <p className="text-text-secondary leading-relaxed">
            We reserve the right to modify these terms at any time. Your continued
            use of the Service after changes are posted constitutes acceptance of
            the modified terms.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">2. Description of Service</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Wok Konek is a service marketplace platform that connects clients who
            need work done with skilled taskers who can perform the work. The
            Platform facilitates job postings, bidding, payment verification, and job
            completion tracking.
          </p>
          <p className="text-text-secondary leading-relaxed">
            We act as an intermediary platform and do not directly provide services
            or employ taskers. All work is performed by independent taskers, and all
            agreements are between clients and taskers.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">3. User Accounts</h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">3.1 Registration</h3>
              <p>
                To use certain features of the Service, you must register for an
                account. You agree to provide accurate, current, and complete
                information during registration and to update such information as
                necessary.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">3.2 Account Security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You agree to notify us immediately of any unauthorized use
                of your account.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">3.3 Eligibility</h3>
              <p>
                You must be at least 18 years old to use the Service. By using the
                Service, you represent and warrant that you meet this age requirement
                and have the legal capacity to enter into these Terms.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">4. User Roles</h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">4.1 Clients</h3>
              <p>
                Clients post jobs, review bids, accept bids, make payments via BSP
                bank transfer, and confirm job completion. Clients are responsible
                for accurately describing jobs, making timely payments, and
                confirming completion when work is done satisfactorily.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">4.2 Taskers</h3>
              <p>
                Taskers browse jobs, submit bids, perform work after payment
                verification, post progress updates, and mark jobs as complete.
                Taskers are responsible for performing work competently, maintaining
                professional standards, and completing work as agreed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">4.3 Role Selection</h3>
              <p>
                You may select your role (client or tasker) during registration.
                You may not use multiple accounts to circumvent platform rules or
                restrictions.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">5. Job Postings & Bidding</h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">5.1 Job Postings</h3>
              <p>
                Clients may post jobs describing work needed, budget, location, and
                other relevant details. Job postings must be accurate, legal, and
                not violate any laws or third-party rights. We reserve the right to
                remove any job posting that violates these Terms.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">5.2 Bidding</h3>
              <p>
                Taskers may submit bids on jobs. Bids must be genuine and reflect
                the tasker's intent to perform the work at the proposed price. Once
                a bid is accepted, both parties are expected to fulfill their
                obligations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">5.3 Acceptance</h3>
              <p>
                Clients may accept any bid at their discretion. Once a bid is
                accepted, the client must make payment via BSP bank transfer and
                upload a receipt for verification.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">6. Payments</h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">6.1 Payment Method</h3>
              <p>
                Payments are made via BSP bank transfer. Clients are responsible for
                making timely payments after accepting a bid.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">6.2 Payment Verification</h3>
              <p>
                Clients must upload a payment receipt after making the transfer. Our
                admin team verifies receipts before work begins. Work may not start
                until payment is verified.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">6.3 Payment Disputes</h3>
              <p>
                If payment verification fails or is rejected, the client may
                re-upload a corrected receipt. Disputes regarding payments should be
                reported to us through the contact form.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">6.4 Refunds</h3>
              <p>
                Refund policies depend on the specific circumstances and job status.
                Refunds are handled on a case-by-case basis. Contact us for
                assistance with refund requests.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">7. Job Completion</h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">7.1 Work Performance</h3>
              <p>
                Taskers are responsible for performing work competently and in
                accordance with the job description and agreed terms. Taskers should
                post progress updates and communicate with clients throughout the
                job.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">7.2 Completion</h3>
              <p>
                Taskers mark jobs as complete when work is finished. Clients then
                review the work and confirm completion. Once confirmed, the job
                status is updated to completed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">7.3 Disputes</h3>
              <p>
                If there is a dispute regarding job completion or quality, both
                parties should attempt to resolve it directly. If resolution is not
                possible, contact us for assistance.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">8. Prohibited Conduct</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>Post false, misleading, or fraudulent information</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Attempt to circumvent payment verification or platform rules</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Create multiple accounts to evade restrictions</li>
            <li>Impersonate any person or entity</li>
            <li>Collect or harvest user information without consent</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">9. Limitation of Liability</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Wok Konek acts as an intermediary platform. We are not responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>The quality, safety, or legality of work performed by taskers</li>
            <li>The accuracy of job descriptions or bids</li>
            <li>Disputes between clients and taskers</li>
            <li>Payment disputes or issues between users</li>
            <li>Any damages or losses resulting from use of the Service</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mt-4">
            To the maximum extent permitted by law, Wok Konek's liability is
            limited to the amount you paid to use the Service, if any.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">10. Indemnification</h2>
          <p className="text-text-secondary leading-relaxed">
            You agree to indemnify and hold harmless Wok Konek, its officers,
            directors, employees, and agents from any claims, damages, losses,
            liabilities, and expenses (including legal fees) arising from your use
            of the Service, violation of these Terms, or infringement of any rights
            of another party.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">11. Termination</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We reserve the right to suspend or terminate your account at any time
            for violation of these Terms, fraudulent activity, or any other reason we
            deem necessary. You may also delete your account at any time through
            your account settings.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Upon termination, your right to use the Service immediately ceases. We
            may delete your account and associated data, subject to our data
            retention policies.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">12. Governing Law</h2>
          <p className="text-text-secondary leading-relaxed">
            These Terms shall be governed by and construed in accordance with the
            laws of Papua New Guinea. Any disputes arising from these Terms or the
            Service shall be subject to the exclusive jurisdiction of the courts of
            Papua New Guinea.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-text mb-4">13. Contact Information</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you have any questions about these Terms & Conditions, please contact
            us:
          </p>
          <div className="rounded-lg border border-border bg-bg-muted p-6">
            <p className="text-text-secondary">
              <strong className="text-text">Wok Konek</strong>
              <br />
              Use our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact form
              </a>{" "}
              for inquiries about these Terms.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
