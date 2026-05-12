import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";

export function IntroSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <AnimatedSection>
          <SectionHeading
            badge="Who We Are"
            title="Clarity, structure, and strategy for ambitious businesses."
            description="Skynex Consults is a strategy-driven consulting firm serving startups, SMEs, and business owners across key growth disciplines. We help clients strengthen decisions, improve positioning, and move forward with practical confidence."
          />
        </AnimatedSection>
      </div>
    </section>
  );
}