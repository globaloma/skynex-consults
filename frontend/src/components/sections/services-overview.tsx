import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Briefcase, Globe, LineChart, Target, LayoutDashboard } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/animated-stagger";
import { getPublishedServices } from "@/lib/cms/services";

export async function ServicesOverview() {
  let services: { slug: string; title: string; shortDescription: string }[];

  try {
    const dbServices = await getPublishedServices();
    services = dbServices.map((service) => ({
      slug: service.slug,
      title: service.title,
      shortDescription: service.short_description,
    }));
  } catch {
    services = SERVICES.map((service) => ({
      slug: service.slug,
      title: service.title,
      shortDescription: service.shortDescription,
    }));
  }

  const icons = [
    BarChart3,
    Briefcase,
    Globe,
    LineChart,
    Target,
    LayoutDashboard,
  ];

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

        {/* Supporting visual */}
        <AnimatedSection>
          <div className="relative mt-12 overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
              alt="Business strategy session"
              width={1600}
              height={900}
              className="h-[320px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </AnimatedSection>

        <AnimatedStagger className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
              <AnimatedItem key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <Card className="h-full border border-brand-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>

                      <h3 className="mt-5 font-heading text-xl font-semibold text-text-heading">
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
            );
          })}
        </AnimatedStagger>
      </div>
    </section>
  );
}