import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
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
        name: item.role ? `${item.name}, ${item.role}` : item.name,
        quote: item.quote,
      }));
    }
  } catch {}

  return (
    <section className="section-padding bg-brand-50/40">
      <div className="container-max">
        <AnimatedSection>
          <SectionHeading
            badge="Social Proof"
            title="Built to inspire confidence and trust."
            description="At launch, these testimonials can serve as placeholders until live client reviews are added."
          />
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <AnimatedItem key={item.name}>
              <Card>
                <CardContent>
                  <p className="text-base leading-8 text-text-body">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 text-sm font-medium text-text-primary">
                    {item.name}
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}