import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Skynex Consults for inquiries, support, and consultation requests.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your business goals."
        description="If you have a question, need support, or would like to discuss an engagement, send us a message and our team will get back to you."
      />

      <section className="section-padding bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardContent>
              <h2 className="font-heading text-2xl font-semibold">Send us a message</h2>
              <p className="mt-3 text-text-body">We’d be glad to hear from you.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">Contact Information</h3>
                <div className="mt-4 space-y-3 text-sm text-text-body">
                  <p><strong>Email:</strong> {COMPANY_INFO.email}</p>
                  <p><strong>Phone:</strong> {COMPANY_INFO.phone}</p>
                  <p>
                    <strong>WhatsApp:</strong>{" "}
                    <a
                      className="text-brand-600 hover:underline"
                      href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Click to chat
                    </a>
                  </p>
                  <p><strong>Address:</strong> {COMPANY_INFO.address}</p>
                  <p><strong>Office Hours:</strong> {COMPANY_INFO.officeHours}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">Social Media</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-brand-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-brand-600 hover:underline"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_LINKS.x}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-brand-600 hover:underline"
                  >
                    X (Twitter)
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}