import Link from "next/link";

type Props = {
  categories: string[];
  currentCategory?: string;
  basePath: string;
  search?: string;
};

export function CategoryFilter({
  categories,
  currentCategory = "All",
  basePath,
  search,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const params = new URLSearchParams();
        if (category && category !== "All") params.set("category", category);
        if (search) params.set("search", search);

        const href = params.toString() ? `${basePath}?${params.toString()}` : basePath;
        const active =
          currentCategory === category || (!currentCategory && category === "All");

        return (
          <Link
            key={category}
            href={href}
            className={`rounded-full px-4 py-2 text-sm transition ${
              active
                ? "bg-brand-600 text-white"
                : "border border-borderSoft text-text-body hover:bg-brand-50"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}