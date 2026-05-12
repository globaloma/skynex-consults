import { createMetadata } from "@/lib/metadata";
import { HomeHero } from "@/components/sections/home-hero";
import { IntroSection } from "@/components/sections/intro-section";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhySkynex } from "@/components/sections/why-skynex";
import { Testimonials } from "@/components/sections/testimonials";
import { QuickBooking } from "@/components/sections/quick-booking";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Strategy-led consulting for startups, SMEs, and business owners seeking clarity, structure, and growth support.",
  path: "/",
});

export default function HomePage() {
  return (
    <PageTransition>
      <HomeHero />
      <IntroSection />
      <ServicesOverview />
      <WhySkynex />
      <CtaBanner
        title="Ready to grow your business?"
        description="Book a consultation today and take the next step with strategic clarity."
      />
      <Testimonials />
      <QuickBooking />
    </PageTransition>
  );
}