import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/animated-stagger";
import { getPublishedTestimonials } from "@/lib/cms/testimonials";
import type { Database } from "@/types/supabase";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

export async function Testimonials() {
  let items = TESTIMONIALS;

  try {
    const dbTestimonials = (await getPublishedTestimonials()) as Testimonial[];
    if (dbTestimonials.length > 0) {
      items = dbTestimonials.map((item) => ({
        name: item.name,
        quote: item.quote,
      }));
    }
  } catch {}

  return (
    <section className="section-padding bg-brand-50/40">
      <div className="container-max">
        <AnimatedSection>
          <SectionHeading
            badge="Client Feedback"
            title="Trusted by founders and growing businesses."
            description="Our work focuses on clarity, structure, and practical direction that supports real progress."
          />
        </AnimatedSection>

        <AnimatedStagger className="mt-16 grid gap-8 lg:grid-cols-3">
          {items.map((item) => (
            <AnimatedItem key={item.name}>
              <div className="relative h-full rounded-3xl bg-white p-8 shadow-sm border border-brand-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                {/* Subtle decorative quote mark */}
                <div className="absolute -top-4 left-6 text-7xl leading-none text-brand-100 font-serif">
                  “
                </div>

                <p className="relative text-base leading-8 text-text-body">
                  {item.quote}
                </p>

                <div className="mt-8">
                  <div className="h-px w-12 bg-brand-200 mb-4" />
                  <div className="text-sm font-semibold text-text-heading">
                    {item.name}
                  </div>
                </div>

              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}