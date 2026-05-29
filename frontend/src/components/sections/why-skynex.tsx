import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { WHY_POINTS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";

export function WhySkynex() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid items-stretch gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center">
            <AnimatedSection>
              <SectionHeading
                badge="Why Skynex Consults"
                title="A thoughtful consulting approach built on clarity and outcomes."
                description="We help clients move from uncertainty to structured action through strategy-led support that is practical, tailored, and professionally grounded."
              />
            </AnimatedSection>

            <div className="mt-12 space-y-8">
              {WHY_POINTS.map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  
                  {/* Green icon circle */}
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                    <CheckCircle2
                      className="h-5 w-5 text-brand-600"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-text-heading">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-body">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <AnimatedSection>
            <div className="relative h-full min-h-[500px] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                alt="Executive business meeting discussion"
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}