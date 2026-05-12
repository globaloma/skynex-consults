export function TableEmpty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-borderSoft bg-white p-10 text-center">
      <h3 className="font-heading text-lg font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </div>
  );
}