import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import { SERVICES, TESTIMONIALS } from "../src/lib/constants";
import { PACKAGES } from "../src/lib/packages";

const postsDirectory = path.join(process.cwd(), "src/content/blog/posts");

function mdxBodyToHtml(body: string): string {
  const blocks = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim());
      const isList = lines.every((line) => line.startsWith("- "));

      if (isList) {
        const items = lines.map((line) => `<li>${line.slice(2)}</li>`).join("");
        return `<ul>${items}</ul>`;
      }

      return `<p>${lines.join(" ")}</p>`;
    })
    .join("");
}

function getLocalPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        category: data.category as string,
        author: data.author as string,
        content: mdxBodyToHtml(content),
        published: true,
      };
    });
}

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const services = SERVICES.map((service) => ({
    slug: service.slug,
    title: service.title,
    headline: service.headline,
    short_description: service.shortDescription,
    description: service.description,
    who_its_for: service.whoItsFor,
    outcomes: service.outcomes,
    published: true,
  }));

  const testimonials = TESTIMONIALS.map((testimonial) => ({
    name: testimonial.name,
    quote: testimonial.quote,
    published: true,
  }));

  const packages = PACKAGES.map((pkg, index) => ({
    slug: pkg.id,
    name: pkg.name,
    subtitle: pkg.subtitle,
    price_label: pkg.price,
    amount: pkg.amount,
    description: pkg.description,
    features: pkg.features,
    deliverables: pkg.deliverables,
    popular: Boolean(pkg.popular),
    published: true,
    sort_order: index,
  }));

  const posts = getLocalPosts();

  const { error: servicesError } = await supabase
    .from("managed_services")
    .upsert(services, { onConflict: "slug" });

  if (servicesError) {
    console.error("Failed to seed services:", servicesError.message);
    process.exit(1);
  }
  console.log(`Seeded ${services.length} services.`);

  const { data: existingTestimonials } = await supabase
    .from("testimonials")
    .select("name");
  const existingNames = new Set((existingTestimonials ?? []).map((t) => t.name));
  const newTestimonials = testimonials.filter((t) => !existingNames.has(t.name));

  if (newTestimonials.length > 0) {
    const { error: testimonialsError } = await supabase
      .from("testimonials")
      .insert(newTestimonials);

    if (testimonialsError) {
      console.warn("Testimonials seed warning:", testimonialsError.message);
    } else {
      console.log(`Seeded ${newTestimonials.length} testimonials.`);
    }
  }

  const { error: packagesError } = await supabase
    .from("packages")
    .upsert(packages, { onConflict: "slug" });

  if (packagesError) {
    console.error("Failed to seed packages:", packagesError.message);
    process.exit(1);
  }
  console.log(`Seeded ${packages.length} packages.`);

  // Remove the placeholder post from an earlier seed run that didn't match any real article.
  await supabase
    .from("blog_posts")
    .delete()
    .eq("slug", "why-clarity-matters-in-business-growth");

  if (posts.length > 0) {
    const { error: postsError } = await supabase
      .from("blog_posts")
      .upsert(posts, { onConflict: "slug" });

    if (postsError) {
      console.warn("Posts seed warning:", postsError.message);
    } else {
      console.log(`Seeded ${posts.length} blog posts.`);
    }
  }

  const { error: settingsError } = await supabase.from("site_settings").upsert(
    {
      id: "00000000-0000-0000-0000-000000000001",
      linkedin_url: "https://linkedin.com/company/skynexconsults",
      instagram_url: "https://instagram.com/skynexconsults",
      x_url: "https://x.com/skynexconsults",
    },
    { onConflict: "id", ignoreDuplicates: true }
  );

  if (settingsError) {
    console.warn("Site settings seed warning:", settingsError.message);
  } else {
    console.log("Seeded default site settings.");
  }

  console.log("Seed content completed.");
}

main();
