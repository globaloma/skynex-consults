export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs ${
        published ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-700"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
