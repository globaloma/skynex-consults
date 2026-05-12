import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {badge ? <Badge>{badge}</Badge> : null}
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-text-body md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}