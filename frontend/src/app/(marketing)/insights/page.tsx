import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/content/blog/get-posts";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { getBlogCategories, getPaginatedPublishedBlogPosts } from "@/lib/cms/queries";
import { CategoryFilter } from "@/components/shared/category-filter";
import { SearchInput } from "@/components/shared/search-input";
import { PaginationControls } from "@/components/shared/pagination-controls";

export const metadata = createMetadata({
  title: "Insights",
  description: "Business insights, strategy perspectives, and practical articles from Skynex Consults.",
  path: "/insights",
});

type Props = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
};

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const category = params.category || "All";
  const search = params.search || "";

  let posts = getAllPosts();
  let totalPages = 1;
  let currentPage = 1;
  let categories = ["All"];

  try {
    const result = await getPaginatedPublishedBlogPosts({
      page,
      limit: 6,
      category,
      search,
    });

    const dbCategories = await getBlogCategories();

    if (result.data.length > 0 || search || category !== "All") {
      posts = result.data.map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        author: post.author,
        date: post.created_at,
        cover_image: post.cover_image,
      }));
      totalPages = result.totalPages;
      currentPage = result.currentPage;
      categories = dbCategories;
    }
  } catch {}

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Thoughts, insights, and practical guidance for growing businesses."
        description="Explore articles on business strategy, finance, marketing, startup growth, and market positioning."
      />

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mb-8 grid gap-5">
            <SearchInput
              currentValue={search}
              extraParams={category && category !== "All" ? { category } : {}}
              placeholder="Search articles..."
            />

            <CategoryFilter
              categories={categories}
              currentCategory={category}
              basePath="/insights"
              search={search}
            />
          </div>

          {posts.length === 0 ? (
            <EmptyState
              title="No insights found"
              description="Try adjusting your search or category filter."
            />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/insights/${post.slug}`}>
                    <Card className="h-full overflow-hidden transition hover:-translate-y-1">
                      {"cover_image" in post && post.cover_image ? (
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : null}

                      <CardContent>
                        <Badge>{post.category}</Badge>
                        <h2 className="mt-4 font-heading text-xl font-semibold">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-text-body">
                          {post.description}
                        </p>
                        <div className="mt-6 text-xs text-text-muted">
                          {post.author} • {formatDate(post.date)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/insights"
                extraParams={{
                  ...(category && category !== "All" ? { category } : {}),
                  ...(search ? { search } : {}),
                }}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}