import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/shared/cta-banner";
import { ServicesSchema } from "@/components/shared/schema";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getPublishedServices } from "@/lib/cms/services";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Explore Skynex Consults services across business strategy, growth consulting, branding, and digital presence.",
  path: "/services",
});

type ServiceCard = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  whoItsFor: string;
  outcomes: string[];
};

export default async function ServicesPage() {
  let services: ServiceCard[] = SERVICES.map((service) => ({
    slug: service.slug,
    title: service.title,
    headline: service.headline,
    description: service.description,
    whoItsFor: service.whoItsFor,
    outcomes: service.outcomes,
  }));

  try {
    const dbServices = await getPublishedServices();
    if (dbServices.length > 0) {
      services = dbServices.map((service) => ({
        slug: service.slug,
        title: service.title,
        headline: service.headline,
        description: service.description,
        whoItsFor: service.who_its_for,
        outcomes: service.outcomes,
      }));
    }
  } catch (error) {
    console.error("Failed to load services from DB:", error);
  }

  return (
    <>
      <ServicesSchema />

      <PageHero
        eyebrow="Our Services"
        title="Consulting services designed around business outcomes."
        description="Each service is built to help clients improve clarity, strengthen positioning, and make decisions that support long-term growth."
      />

      <section className="section-padding bg-white">
        <div className="container-max">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />

          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.slug}>
                <CardContent className="grid gap-6 lg:grid-cols-[80px_1fr_auto] lg:items-start">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <div className="h-3 w-3 rounded-full bg-brand-600" />
                  </div>

                  <div>
                    <h2 className="font-heading text-2xl font-semibold">{service.title}</h2>
                    <p className="mt-2 text-brand-600">{service.headline}</p>
                    <p className="mt-4 text-text-body">{service.description}</p>

                    <div className="mt-4">
                      <h3 className="font-medium text-text-primary">Who it is for</h3>
                      <p className="mt-2 text-sm leading-7 text-text-body">
                        {service.whoItsFor}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-medium text-text-primary">Key outcomes</h3>
                      <ul className="mt-2 space-y-2 text-sm leading-7 text-text-body">
                        {service.outcomes.map((outcome) => (
                          <li key={outcome}>• {outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href={`/services/${service.slug}`}>
                      <Button variant="secondary" className="w-full whitespace-nowrap">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/booking">
                      <Button className="w-full whitespace-nowrap">Book This Service</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not sure which service fits your business best?"
        description="Book a consultation and we’ll help you identify the right starting point."
      />
    </>
  );
}