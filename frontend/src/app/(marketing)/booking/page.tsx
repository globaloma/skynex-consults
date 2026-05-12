import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { BookingForm } from "@/components/forms/booking-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = createMetadata({
  title: "Booking",
  description: "Book an online or physical consultation with Skynex Consults.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Schedule a consultation with Skynex Consults."
        description="Choose your consultation type, tell us the service you need, and submit your preferred date and time. We’ll follow up with confirmation details."
      />

      <section className="section-padding bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <CardContent>
              <h2 className="font-heading text-2xl font-semibold">Consultation Booking Form</h2>
              <p className="mt-3 text-text-body">
                Please complete the form below. All fields are required unless marked optional.
              </p>
              <div className="mt-8">
                <BookingForm />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">Consultation Options</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-text-body">
                  <li>• Online consultation via Zoom, Google Meet, or phone</li>
                  <li>• Physical consultation at the office or agreed location</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-heading text-xl font-semibold">What happens next?</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-text-body">
                  <li>• Your request is submitted securely</li>
                  <li>• A confirmation email is sent to you</li>
                  <li>• Our team receives an admin notification</li>
                  <li>• We follow up to confirm the session details</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}