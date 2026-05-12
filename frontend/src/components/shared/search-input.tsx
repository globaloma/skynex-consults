"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  placeholder?: string;
  searchParamKey?: string;
  currentValue?: string;
  extraParams?: Record<string, string>;
};

export function SearchInput({
  placeholder = "Search...",
  searchParamKey = "search",
  currentValue = "",
  extraParams = {},
}: Props) {
  const pathname = usePathname();

  const buildHref = (value: string) => {
    const params = new URLSearchParams();

    Object.entries(extraParams).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });

    if (value) params.set(searchParamKey, value);

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <form action={pathname} className="flex flex-col gap-3 md:flex-row">
      <input
        type="text"
        name={searchParamKey}
        defaultValue={currentValue}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-borderSoft px-4 text-sm outline-none focus:border-brand-500"
      />

      {Object.entries(extraParams).map(([key, val]) =>
        val ? <input key={key} type="hidden" name={key} value={val} /> : null
      )}

      <button
        type="submit"
        className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
      >
        Search
      </button>

      {currentValue ? (
        <Link
          href={buildHref("")}
          className="inline-flex items-center justify-center rounded-xl border border-borderSoft px-5 py-3 text-sm text-text-body hover:bg-brand-50"
        >
          Clear
        </Link>
      ) : null}
    </form>
  );
}