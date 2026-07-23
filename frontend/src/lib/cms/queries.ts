import type { Database } from "@/types/supabase";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
type ManagedServiceRow = Database["public"]["Tables"]["managed_services"]["Row"];
type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type ContactMessageRow = Database["public"]["Tables"]["contact_messages"]["Row"];

type BlogCategoryRow = Pick<BlogPostRow, "category">;

export type PaginatedResponse<T> = {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
};

export async function getPaginatedPublishedBlogPosts({
  page = 1,
  limit = 6,
  category,
  search,
}: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<PaginatedResponse<BlogPostRow>> {
  const supabase = createServiceRoleSupabase();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,content.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as BlogPostRow[],
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}

export async function getBlogCategories(): Promise<string[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("published", true);

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as BlogCategoryRow[];

  const categories = Array.from(
    new Set(rows.map((item) => item.category))
  ).filter((category): category is string => Boolean(category));

  return ["All", ...categories];
}

export async function getPaginatedManagedBlogPosts({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<BlogPostRow>> {
  const supabase = createServiceRoleSupabase();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as BlogPostRow[],
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}

export async function getPaginatedManagedTestimonials({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<TestimonialRow>> {
  const supabase = createServiceRoleSupabase();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("testimonials")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as TestimonialRow[],
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}

export async function getPaginatedBookings({
  page = 1,
  limit = 10,
  status,
  search,
}: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<PaginatedResponse<BookingRow>> {
  const supabase = createServiceRoleSupabase();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (search) {
    const term = search.replace(/[%,]/g, "");
    query = query.or(
      `full_name.ilike.%${term}%,email.ilike.%${term}%,service_interest.ilike.%${term}%`
    );
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as BookingRow[],
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}

export async function getPaginatedContactMessages({
  page = 1,
  limit = 10,
  search,
  archived,
}: {
  page?: number;
  limit?: number;
  search?: string;
  archived?: "active" | "archived" | "all";
}): Promise<PaginatedResponse<ContactMessageRow>> {
  const supabase = createServiceRoleSupabase();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("contact_messages")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) {
    const term = search.replace(/[%,]/g, "");
    query = query.or(
      `name.ilike.%${term}%,email.ilike.%${term}%,message.ilike.%${term}%`
    );
  }

  if (archived === "archived") {
    query = query.eq("archived", true);
  } else if (archived === "active" || archived === undefined) {
    query = query.or("archived.is.null,archived.eq.false");
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as ContactMessageRow[],
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}

export async function getPaginatedManagedServices({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<ManagedServiceRow>> {
  const supabase = createServiceRoleSupabase();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("managed_services")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as ManagedServiceRow[],
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}