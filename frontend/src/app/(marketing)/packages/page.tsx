import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { PACKAGES } from "@/lib/packages";
import { getPublishedPackages } from "@/lib/cms/packages";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Packages",
  description: "Consulting packages structured for every stage of growth.",
  path: "/packages",
});

type PackageCard = {
  id: string;
  name: string;
  subtitle: string;
  priceLabel: string;
  description: string;
  features: string[];
  popular: boolean;
};

export default async function PackagesPage() {
  let packages: PackageCard[];

  try {
    const dbPackages = await getPublishedPackages();
    packages = dbPackages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      subtitle: pkg.subtitle,
      priceLabel: pkg.price_label,
      description: pkg.description,
      features: pkg.features,
      popular: pkg.popular,
    }));
  } catch (error) {
    console.error("Failed to load packages from DB, using fallback content:", error);
    packages = PACKAGES.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      subtitle: pkg.subtitle,
      priceLabel: pkg.price,
      description: pkg.description,
      features: pkg.features,
      popular: Boolean(pkg.popular),
    }));
  }

  return (
    <>
      <PageHero
        eyebrow="Our Packages"
        title="Structured for every stage of growth"
        description="Choose the consulting package that fits your current stage and growth ambition."
      />

      <section className="section-padding bg-gray-50">
        <div className="container-max grid gap-8 md:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                pkg.popular ? "border-brand-600" : "border-gray-200"
              }`}
            >
              {pkg.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}

              <h3 className="font-heading text-2xl font-semibold text-gray-900">
                {pkg.name}
              </h3>

              <p className="mt-1 text-sm text-brand-600">{pkg.subtitle}</p>

              <p className="mt-4 text-2xl font-bold text-brand-700">
                {pkg.priceLabel}
              </p>

              <p className="mt-4 text-sm text-gray-600">{pkg.description}</p>

              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link href={`/packages/checkout?package=${pkg.id}`}>
                  <Button className="w-full bg-brand-700 hover:bg-brand-800 text-white">
                    Proceed to Payment
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
