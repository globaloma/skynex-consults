import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/animated-stagger";
import { getPublishedServices } from "@/lib/cms/services";

export async function ServicesOverview() {
  let services = SERVICES.map((service) => ({
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
  }));

  try {
    const dbServices = await getPublishedServices();
    if (dbServices.length > 0) {
      services = dbServices.map((service) => ({
        slug: service.slug,
        title: service.title,
        shortDescription: service.short_description,
      }));
    }
  } catch {}

  return (
    <section className="section-padding bg-brand-50/40">
      <div className="container-max">
        <AnimatedSection>
          <SectionHeading
            badge="Services"
            title="Advisory services built around growth, structure, and market confidence."
            description="Our services are designed to help businesses plan better, position clearly, and build the systems needed for credible growth."
          />
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <AnimatedItem key={service.slug}>
              <Link href={`/services/${service.slug}`}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-brand-300">
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <div className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-body">
                      {service.shortDescription}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-600">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}