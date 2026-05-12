import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPostMeta } from "@/types";

const postsDirectory = path.join(process.cwd(), "src/content/blog/posts");

export type LocalBlogPost = {
  meta: BlogPostMeta;
  content: string;
};

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        author: data.author,
        date: data.date,
      } satisfies BlogPostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): LocalBlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      category: data.category,
      author: data.author,
      date: data.date,
    } satisfies BlogPostMeta,
    content,
  };
}