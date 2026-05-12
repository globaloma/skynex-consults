import { COMPANY_INFO } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Skynex Consults.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Your privacy matters to us."
        description="This page explains how Skynex Consults collects, uses, and protects personal information submitted through this website."
      />

      <section className="section-padding bg-white">
        <div className="container-max max-w-3xl space-y-8 text-text-body">
          <section>
            <h2 className="font-heading text-2xl font-semibold">1. Information We Collect</h2>
            <p className="mt-3">
              We may collect information you provide through our booking forms, contact forms,
              and other website interactions. This may include your name, email address,
              phone number, consultation preferences, and any additional details you choose to share.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="mt-3">
              We use your information to respond to inquiries, manage consultation bookings,
              communicate with you, and improve our services. We do not sell your information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold">3. Data Storage and Security</h2>
            <p className="mt-3">
              We take reasonable steps to protect the information submitted through our website.
              However, no digital transmission or storage system can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold">4. Third-Party Services</h2>
            <p className="mt-3">
              We may use secure third-party tools for hosting, email delivery, analytics, and form
              processing. These providers may process data only as required to support our website operations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold">5. Your Rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your personal data by contacting us at {COMPANY_INFO.email}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold">6. Contact</h2>
            <p className="mt-3">
              For questions regarding this Privacy Policy, please contact us at {COMPANY_INFO.email}.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}