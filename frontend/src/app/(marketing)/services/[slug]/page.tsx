import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getPublishedServiceBySlug, getPublishedServices } from "@/lib/cms/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const dbServices = await getPublishedServices();
    if (dbServices.length > 0) {
      return dbServices.map((service) => ({ slug: service.slug }));
    }
  } catch {}

  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const dbService = await getPublishedServiceBySlug(slug);
  if (dbService) {
    return createMetadata({
      title: dbService.title,
      description: dbService.short_description,
      path: `/services/${slug}`,
    });
  }

  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) {
    return createMetadata({ title: "Service Not Found", path: `/services/${slug}` });
  }

  return createMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const dbService = await getPublishedServiceBySlug(slug);

  if (dbService) {
    return (
      <>
        <PageHero
          eyebrow="Service Detail"
          title={dbService.title}
          description={dbService.headline}
        />

        <section className="section-padding bg-white">
          <div className="container-max grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
            <div>
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/services" },
                  { label: dbService.title },
                ]}
              />

              <Card>
                <CardContent>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <div className="h-3 w-3 rounded-full bg-brand-600" />
                  </div>

                  <h2 className="mt-6 font-heading text-2xl font-semibold">
                    What this service entails
                  </h2>
                  <p className="mt-4 text-text-body leading-8">{dbService.description}</p>

                  <h3 className="mt-8 font-heading text-xl font-semibold">Who it is for</h3>
                  <p className="mt-3 text-text-body leading-8">{dbService.who_its_for}</p>

                  <h3 className="mt-8 font-heading text-xl font-semibold">
                    Key outcomes and deliverables
                  </h3>
                  <ul className="mt-4 space-y-3 text-text-body">
                    {dbService.outcomes.map((outcome: string) => (
                      <li key={outcome}>• {outcome}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">Talk to a Consultant</h3>
                <p className="mt-3 text-sm leading-7 text-text-body">
                  If this service aligns with your current business needs, book a
                  consultation and let us discuss the best next step.
                </p>
                <div className="mt-6 grid gap-3">
                  <Link href="/booking">
                    <Button className="w-full">Book This Service</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="secondary" className="w-full">
                      Ask a Question
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return notFound();

  return (
    <>
      <PageHero
        eyebrow="Service Detail"
        title={service.title}
        description={service.headline}
      />

      <section className="section-padding bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title },
              ]}
            />

            <Card>
              <CardContent>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <div className="h-3 w-3 rounded-full bg-brand-600" />
                </div>

                <h2 className="mt-6 font-heading text-2xl font-semibold">What this service entails</h2>
                <p className="mt-4 text-text-body leading-8">{service.description}</p>

                <h3 className="mt-8 font-heading text-xl font-semibold">Who it is for</h3>
                <p className="mt-3 text-text-body leading-8">{service.whoItsFor}</p>

                <h3 className="mt-8 font-heading text-xl font-semibold">
                  Key outcomes and deliverables
                </h3>
                <ul className="mt-4 space-y-3 text-text-body">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent>
              <h3 className="font-heading text-xl font-semibold">Talk to a Consultant</h3>
              <p className="mt-3 text-sm leading-7 text-text-body">
                If this service aligns with your current business needs, book a consultation
                and let us discuss the best next step.
              </p>
              <div className="mt-6 grid gap-3">
                <Link href="/booking">
                  <Button className="w-full">Book This Service</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full">
                    Ask a Question
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}