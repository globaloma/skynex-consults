import { CORE_VALUES } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn more about Skynex Consults, our mission, vision, values, and the strategic thinking behind our work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A consulting firm built around clarity, structure, and growth."
        description="Skynex Consults exists to help startups, SMEs, and business owners make smarter decisions through strategy-led consulting and practical business support."
      />

      <section className="section-padding bg-white">
        <div className="container-max grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              badge="Overview"
              title="Who we are and what we stand for."
              description="Skynex Consults is a modern consulting firm focused on helping businesses think clearly, plan effectively, and present themselves with greater confidence. We support clients across strategy, growth, branding, and digital presence with a business-first mindset."
            />
          </div>
          <div className="grid gap-6">
            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">Our Mission</h3>
                <p className="mt-3 text-text-body">
                  To provide strategic, practical, and credibility-building consulting support
                  that helps businesses make better decisions and grow sustainably.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">Our Vision</h3>
                <p className="mt-3 text-text-body">
                  To become a trusted consulting partner for ambitious businesses seeking
                  clarity, growth, and stronger market positioning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-50/40">
        <div className="container-max">
          <SectionHeading
            badge="Core Values"
            title="The principles that shape our work."
            description="Our values guide how we think, advise, and partner with every client."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {CORE_VALUES.map((value) => (
              <Card key={value.title}>
                <CardContent>
                  <h3 className="font-heading text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-body">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h3 className="font-heading text-2xl font-semibold">What Makes Us Different</h3>
              <ul className="mt-4 space-y-3 text-text-body">
                <li>• Strategy-led and business-driven thinking</li>
                <li>• Tailored support rather than generic advice</li>
                <li>• Strong emphasis on credibility and business positioning</li>
                <li>• Practical outcomes that support decision-making and execution</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-heading text-2xl font-semibold">Brand Positioning</h3>
              <p className="mt-4 text-text-body">
                Skynex Consults is positioned as a professional, modern, and strategy-focused
                consulting firm. Our website and service experience are designed to communicate
                trust, preparedness, and value to founders, business owners, and investor-facing stakeholders.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Need strategic support for your business?"
        description="Let’s discuss your goals, challenges, and the right path forward."
      />
    </>
  );
}