import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  title,
  description,
  primaryHref = "/booking",
  primaryLabel = "Book a Consultation",
  secondaryHref = "/services",
  secondaryLabel = "Explore Services",
}: {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="rounded-3xl bg-brand-600 px-6 py-10 text-white md:px-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-heading text-2xl font-semibold md:text-3xl">
                {title}
              </h3>
              <p className="mt-3 text-white/80">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={primaryHref}>
                <Button className="bg-white text-brand-700 hover:bg-brand-50">
                  {primaryLabel}
                </Button>
              </Link>
              <Link href={secondaryHref}>
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-white/10"
                >
                  {secondaryLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}