export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-borderSoft bg-brand-50/30 p-10 text-center">
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-3 text-text-body">{description}</p>
    </div>
  );
}