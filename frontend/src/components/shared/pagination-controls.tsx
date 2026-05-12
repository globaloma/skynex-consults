import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  extraParams?: Record<string, string>;
};

export function PaginationControls({
  currentPage,
  totalPages,
  basePath,
  extraParams = {},
}: Props) {
  if (totalPages <= 1) return null;

  const createHref = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(extraParams).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });

    if (page > 1) {
      params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {currentPage > 1 ? (
        <Link
          href={createHref(currentPage - 1)}
          className="rounded-xl border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50"
        >
          Previous
        </Link>
      ) : null}

      <div className="text-sm text-text-muted">
        Page {currentPage} of {totalPages}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createHref(currentPage + 1)}
          className="rounded-xl border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50"
        >
          Next
        </Link>
      ) : null}
    </div>
  );
}