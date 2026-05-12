import type { Database } from "@/types/supabase";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

export async function getManagedBlogPosts(): Promise<BlogPostRow[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getManagedBlogPostById(
  id: string
): Promise<BlogPostRow | null> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getPublishedBlogPostBySlug(
  slug: string
): Promise<BlogPostRow | null> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data;
}

export async function getPublishedBlogPosts(): Promise<BlogPostRow[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}