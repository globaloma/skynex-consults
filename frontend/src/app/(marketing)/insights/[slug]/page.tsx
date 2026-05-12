import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/content/blog/get-posts";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { formatDate } from "@/lib/utils";
import { ArticleSchema } from "@/components/shared/schema";
import { SocialShare } from "@/components/shared/social-share";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getPublishedBlogPostBySlug } from "@/lib/cms/blog";
import { getPaginatedPublishedBlogPosts } from "@/lib/cms/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const localPosts = getAllPosts().map((post) => ({ slug: post.slug }));

  try {
    const dbPosts = await getPaginatedPublishedBlogPosts({ page: 1, limit: 100 });
    const dbParams = dbPosts.data.map((post) => ({ slug: post.slug }));

    const merged = [...localPosts, ...dbParams];
    const unique = Array.from(new Map(merged.map((item) => [item.slug, item])).values());

    return unique;
  } catch {
    return localPosts;
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const dbPost = await getPublishedBlogPostBySlug(slug);
  if (dbPost) {
    return createMetadata({
      title: dbPost.title,
      description: dbPost.description,
      path: `/insights/${slug}`,
    });
  }

  const post = getPostBySlug(slug);
  if (!post) {
    return createMetadata({ title: "Insight Not Found", path: `/insights/${slug}` });
  }

  return createMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/insights/${slug}`,
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;

  const dbPost = await getPublishedBlogPostBySlug(slug);

  if (dbPost) {
    return (
      <>
        <ArticleSchema
          title={dbPost.title}
          description={dbPost.description}
          datePublished={dbPost.created_at}
          slug={dbPost.slug}
        />

        <PageHero
          eyebrow={dbPost.category}
          title={dbPost.title}
          description={dbPost.description}
        />

        <section className="section-padding bg-white">
          <article className="container-max max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: dbPost.title },
              ]}
            />

            <div className="mb-8 text-sm text-text-muted">
              {dbPost.author} • {formatDate(dbPost.created_at)}
            </div>

            <div
              className="prose prose-neutral max-w-none prose-headings:font-heading prose-a:text-brand-600"
              dangerouslySetInnerHTML={{ __html: dbPost.content }}
            />

            <SocialShare title={dbPost.title} slug={dbPost.slug} />
          </article>
        </section>
      </>
    );
  }

  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <>
      <ArticleSchema
        title={post.meta.title}
        description={post.meta.description}
        datePublished={post.meta.date}
        slug={post.meta.slug}
      />

      <PageHero
        eyebrow={post.meta.category}
        title={post.meta.title}
        description={post.meta.description}
      />

      <section className="section-padding bg-white">
        <article className="container-max max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: post.meta.title },
            ]}
          />

          <div className="mb-8 text-sm text-text-muted">
            {post.meta.author} • {formatDate(post.meta.date)}
          </div>

          <div className="prose-custom whitespace-pre-line">
            {post.content}
          </div>

          <SocialShare title={post.meta.title} slug={post.meta.slug} />
        </article>
      </section>
    </>
  );
}