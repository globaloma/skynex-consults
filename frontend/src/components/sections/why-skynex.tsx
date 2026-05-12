import { WHY_POINTS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/animated-stagger";

export function WhySkynex() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <AnimatedSection>
          <SectionHeading
            badge="Why Skynex Consults"
            title="A thoughtful consulting approach built on clarity and outcomes."
            description="We help clients move from uncertainty to structured action through strategy-led support that is practical, tailored, and professionally grounded."
          />
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-6 md:grid-cols-2">
          {WHY_POINTS.map((point) => (
            <AnimatedItem key={point.title}>
              <Card>
                <CardContent>
                  <h3 className="font-heading text-xl font-semibold">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-text-body">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}