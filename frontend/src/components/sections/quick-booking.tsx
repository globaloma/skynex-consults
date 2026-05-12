import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { CTA_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";

export function QuickBooking() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <AnimatedSection>
          <div className="rounded-3xl border border-borderSoft bg-brand-50/40 p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-semibold md:text-3xl">
                  Ready to take the next strategic step?
                </h3>
                <p className="mt-4 max-w-xl text-text-body">
                  Book an online or physical consultation and tell us what your
                  business needs. We will review your request and follow up promptly.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-soft">
                <div className="space-y-4 text-sm text-text-body">
                  <div>✓ Online or physical consultation options</div>
                  <div>✓ Service-specific booking selection</div>
                  <div>✓ Confirmation email after submission</div>
                  <div>✓ Fast follow-up from the Skynex Consults team</div>
                </div>
                <Link href="/booking" className="mt-6 block">
                  <Button className="w-full">{CTA_LABELS.primary}</Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}