import type { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { getPaginatedPublishedBlogPosts } from "@/lib/cms/queries";
import { getPublishedServices } from "@/lib/cms/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/booking",
    "/packages",
    "/contact",
    "/insights",
    "/privacy-policy",
  ].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  let services: { slug: string }[];
  try {
    services = await getPublishedServices();
  } catch {
    services = SERVICES;
  }

  const serviceRoutes = services.map((service) => ({
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getPaginatedPublishedBlogPosts({ page: 1, limit: 100 });
    blogRoutes = posts.data.map((post) => ({
      url: `${SITE_CONFIG.url}/insights/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}