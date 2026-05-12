import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Booking Successful",
  description: "Your consultation request has been submitted successfully.",
  path: "/booking/success",
});

export default function BookingSuccessPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-2xl">
        <div className="rounded-3xl border border-brand-100 bg-brand-50/40 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-semibold text-text-primary">
            Booking request submitted
          </h1>
          <p className="mt-4 text-text-body">
            Thank you for booking a consultation with Skynex Consults. A confirmation
            email has been sent, and our team will follow up shortly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary">Explore Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}