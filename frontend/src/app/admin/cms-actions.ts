"use server";

import { revalidatePath } from "next/cache";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { logAuditEvent } from "@/lib/audit";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

const ACTOR_EMAIL = "system@skynexconsult.com";

export async function createBlogPost(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const description = String(formData.get("description") || "");
  const category = String(formData.get("category") || "");
  const author = String(formData.get("author") || "Skynex Consults");
  const content = String(formData.get("content") || "");
  const coverImage = String(formData.get("cover_image") || "") || null;
  const published = formData.get("published") === "on";

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      description,
      category,
      author,
      content,
      cover_image: coverImage,
      published,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "create",
    entityType: "blog_post",
    entityId: data?.id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  return { success: true };
}

export async function updateBlogPost(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const description = String(formData.get("description") || "");
  const category = String(formData.get("category") || "");
  const author = String(formData.get("author") || "Skynex Consults");
  const content = String(formData.get("content") || "");
  const coverImage = String(formData.get("cover_image") || "") || null;
  const published = formData.get("published") === "on";

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      description,
      category,
      author,
      content,
      cover_image: coverImage,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "update",
    entityType: "blog_post",
    entityId: id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  return { success: true };
}

export async function deleteBlogPost(formData: FormData) {
  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "delete",
    entityType: "blog_post",
    entityId: id,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  return { success: true };
}

export async function createTestimonial(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const name = String(formData.get("name") || "");
  const role = String(formData.get("role") || "");
  const quote = String(formData.get("quote") || "");
  const avatarImage = String(formData.get("avatar_image") || "") || null;
  const published = formData.get("published") === "on";

  const { data, error } = await supabase
    .from("testimonials")
    .insert({
      name,
      role,
      quote,
      avatar_image: avatarImage,
      published,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "create",
    entityType: "testimonial",
    entityId: data?.id,
    metadata: { name },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const role = String(formData.get("role") || "");
  const quote = String(formData.get("quote") || "");
  const avatarImage = String(formData.get("avatar_image") || "") || null;
  const published = formData.get("published") === "on";

  const { error } = await supabase
    .from("testimonials")
    .update({
      name,
      role,
      quote,
      avatar_image: avatarImage,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "update",
    entityType: "testimonial",
    entityId: id,
    metadata: { name },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "delete",
    entityType: "testimonial",
    entityId: id,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function createManagedService(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const headline = String(formData.get("headline") || "");
  const shortDescription = String(formData.get("short_description") || "");
  const description = String(formData.get("description") || "");
  const whoItsFor = String(formData.get("who_its_for") || "");
  const coverImage = String(formData.get("cover_image") || "") || null;
  const outcomesRaw = String(formData.get("outcomes") || "");
  const published = formData.get("published") === "on";

  const outcomes = outcomesRaw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const { data, error } = await supabase
    .from("managed_services")
    .insert({
      title,
      slug,
      headline,
      short_description: shortDescription,
      description,
      who_its_for: whoItsFor,
      outcomes,
      cover_image: coverImage,
      published,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "create",
    entityType: "service",
    entityId: data?.id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function updateManagedService(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const headline = String(formData.get("headline") || "");
  const shortDescription = String(formData.get("short_description") || "");
  const description = String(formData.get("description") || "");
  const whoItsFor = String(formData.get("who_its_for") || "");
  const coverImage = String(formData.get("cover_image") || "") || null;
  const outcomesRaw = String(formData.get("outcomes") || "");
  const published = formData.get("published") === "on";

  const outcomes = outcomesRaw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("managed_services")
    .update({
      title,
      slug,
      headline,
      short_description: shortDescription,
      description,
      who_its_for: whoItsFor,
      outcomes,
      cover_image: coverImage,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "update",
    entityType: "service",
    entityId: id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function deleteManagedService(formData: FormData) {
  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase
    .from("managed_services")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "delete",
    entityType: "service",
    entityId: id,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function togglePublishedState(formData: FormData) {
  const supabase = createServiceRoleSupabase();

  const table = String(formData.get("table") || "");
  const id = String(formData.get("id") || "");
  const published = formData.get("published") === "true";

  if (!table || !id) {
    return { error: "Missing parameters" };
  }

  const { error } = await supabase
    .from(table as "blog_posts" | "testimonials" | "managed_services")
    .update({
      published: !published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: ACTOR_EMAIL,
    action: "toggle_publish",
    entityType: table,
    entityId: id,
    metadata: { published: !published },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath("/services");

  return { success: true };
}