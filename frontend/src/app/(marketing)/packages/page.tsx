import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { PACKAGES } from "@/lib/packages";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Packages",
  description: "Consulting packages structured for every stage of growth.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Packages"
        title="Structured for every stage of growth"
        description="Choose the consulting package that fits your current stage and growth ambition."
      />

      {/* Light background like Booking page */}
      <section className="section-padding bg-gray-50">
        <div className="container-max grid gap-8 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                pkg.popular
                  ? "border-brand-600"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}

              {/* Title */}
              <h3 className="font-heading text-2xl font-semibold text-gray-900">
                {pkg.name}
              </h3>

              <p className="mt-1 text-sm text-brand-600">
                {pkg.subtitle}
              </p>

              {/* Price */}
              <p className="mt-4 text-2xl font-bold text-brand-700">
                {pkg.priceRange}
              </p>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600">
                {pkg.description}
              </p>

              {/*  Features */}
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button (matches booking page style) */}
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