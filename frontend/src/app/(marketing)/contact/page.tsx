import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Skynex Consults for inquiries, support, and consultation requests.",
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
          {/* Contact Form */}
          <Card className="shadow-sm border border-brand-100">
            <CardContent>
              <h2 className="font-heading text-2xl font-semibold">
                Send us a message
              </h2>
              <p className="mt-3 text-text-body">
                We’d be glad to hear from you.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <div className="grid gap-6">
            {/* Contact Information */}
            <Card className="shadow-sm border border-brand-100">
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">
                  Contact Information
                </h3>

                <div className="mt-6 space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-brand-50"
                  >
                    <Mail className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        Email
                      </p>
                      <p className="text-sm text-text-body group-hover:text-brand-700">
                        {COMPANY_INFO.email}
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-brand-50"
                  >
                    <Phone className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        Phone
                      </p>
                      <p className="text-sm text-text-body group-hover:text-brand-700">
                        {COMPANY_INFO.phone}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-brand-50"
                  >
                    <MessageCircle className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        WhatsApp
                      </p>
                      <p className="text-sm text-text-body group-hover:text-brand-700">
                        Chat on WhatsApp
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      COMPANY_INFO.address,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-brand-50"
                  >
                    <MapPin className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        Address
                      </p>
                      <p className="text-sm text-text-body group-hover:text-brand-700">
                        {COMPANY_INFO.address}
                      </p>
                    </div>
                  </a>

                  {/* Office Hours (not clickable) */}
                  <div className="flex items-center gap-4 rounded-2xl p-4">
                    <Clock className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        Office Hours
                      </p>
                      <p className="text-sm text-text-body">
                        {COMPANY_INFO.officeHours}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-sm border border-brand-100">
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">
                  Social Media
                </h3>

                <div className="mt-6 space-y-4 text-sm">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-brand-600 hover:text-brand-700 transition"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>

                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-brand-600 hover:text-brand-700 transition"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>

                  <a
                    href={SOCIAL_LINKS.x}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-brand-600 hover:text-brand-700 transition"
                  >
                    <Twitter className="h-5 w-5" />X
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
