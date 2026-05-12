import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-brand-600 text-white">
      <div className="container-max py-20 md:py-24">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Badge className="bg-white/10 text-white">{eyebrow}</Badge>
          ) : null}
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/85">{description}</p>
        </div>
      </div>
    </section>
  );
}