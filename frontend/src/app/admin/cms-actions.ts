"use server";

import { revalidatePath } from "next/cache";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { logAuditEvent } from "@/lib/audit";
import { SITE_SETTINGS_ID } from "@/lib/cms/settings";
import { requireEditorSession } from "@/lib/admin-auth";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

const PUBLISHABLE_TABLES = [
  "blog_posts",
  "testimonials",
  "managed_services",
  "packages",
] as const;

type ActionResult = { error?: string; success?: boolean };

async function authorize(): Promise<
  { ok: true; actorEmail: string } | { ok: false; error: string }
> {
  try {
    const session = await requireEditorSession();
    return { ok: true, actorEmail: session.user.email! };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Not authorized.",
    };
  }
}

export async function createBlogPost(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

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
    actorEmail: auth.actorEmail,
    action: "create",
    entityType: "blog_post",
    entityId: data?.id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  return { success: true };
}

export async function updateBlogPost(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

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
    actorEmail: auth.actorEmail,
    action: "update",
    entityType: "blog_post",
    entityId: id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  return { success: true };
}

export async function deleteBlogPost(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "delete",
    entityType: "blog_post",
    entityId: id,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  return { success: true };
}

export async function createTestimonial(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

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
    actorEmail: auth.actorEmail,
    action: "create",
    entityType: "testimonial",
    entityId: data?.id,
    metadata: { name },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

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
    actorEmail: auth.actorEmail,
    action: "update",
    entityType: "testimonial",
    entityId: id,
    metadata: { name },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "delete",
    entityType: "testimonial",
    entityId: id,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function createManagedService(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const headline = String(formData.get("headline") || "");
  const shortDescription = String(formData.get("short_description") || "");
  const description = String(formData.get("description") || "");
  const whoItsFor = String(formData.get("who_its_for") || "");
  const coverImage = String(formData.get("cover_image") || "") || null;
  const outcomesRaw = String(formData.get("outcomes") || "");
  const published = formData.get("published") === "on";

  const outcomes = parseLines(outcomesRaw);

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
    actorEmail: auth.actorEmail,
    action: "create",
    entityType: "service",
    entityId: data?.id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function updateManagedService(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

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

  const outcomes = parseLines(outcomesRaw);

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
    actorEmail: auth.actorEmail,
    action: "update",
    entityType: "service",
    entityId: id,
    metadata: { title, slug },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function deleteManagedService(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase
    .from("managed_services")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "delete",
    entityType: "service",
    entityId: id,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true };
}

export async function createPackage(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

  const name = String(formData.get("name") || "");
  const slug = slugify(String(formData.get("slug") || name));
  const subtitle = String(formData.get("subtitle") || "");
  const priceLabel = String(formData.get("price_label") || "");
  const amountNaira = Number(formData.get("amount") || 0);
  const description = String(formData.get("description") || "");
  const features = parseLines(String(formData.get("features") || ""));
  const deliverables = parseLines(String(formData.get("deliverables") || ""));
  const popular = formData.get("popular") === "on";
  const published = formData.get("published") === "on";
  const sortOrder = Number(formData.get("sort_order") || 0);

  const { data, error } = await supabase
    .from("packages")
    .insert({
      name,
      slug,
      subtitle,
      price_label: priceLabel,
      amount: Math.round(amountNaira * 100),
      description,
      features,
      deliverables,
      popular,
      published,
      sort_order: sortOrder,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "create",
    entityType: "package",
    entityId: data?.id,
    metadata: { name, slug },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { success: true };
}

export async function updatePackage(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const slug = slugify(String(formData.get("slug") || name));
  const subtitle = String(formData.get("subtitle") || "");
  const priceLabel = String(formData.get("price_label") || "");
  const amountNaira = Number(formData.get("amount") || 0);
  const description = String(formData.get("description") || "");
  const features = parseLines(String(formData.get("features") || ""));
  const deliverables = parseLines(String(formData.get("deliverables") || ""));
  const popular = formData.get("popular") === "on";
  const published = formData.get("published") === "on";
  const sortOrder = Number(formData.get("sort_order") || 0);

  const { error } = await supabase
    .from("packages")
    .update({
      name,
      slug,
      subtitle,
      price_label: priceLabel,
      amount: Math.round(amountNaira * 100),
      description,
      features,
      deliverables,
      popular,
      published,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "update",
    entityType: "package",
    entityId: id,
    metadata: { name, slug },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { success: true };
}

export async function deletePackage(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  const supabase = createServiceRoleSupabase();
  const id = String(formData.get("id") || "");

  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "delete",
    entityType: "package",
    entityId: id,
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { success: true };
}

export async function updateSiteSettings(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

  const facebookUrl = String(formData.get("facebook_url") || "").trim() || null;
  const instagramUrl = String(formData.get("instagram_url") || "").trim() || null;
  const xUrl = String(formData.get("x_url") || "").trim() || null;
  const tiktokUrl = String(formData.get("tiktok_url") || "").trim() || null;
  const linkedinUrl = String(formData.get("linkedin_url") || "").trim() || null;

  const { error } = await supabase.from("site_settings").upsert(
    {
      id: SITE_SETTINGS_ID,
      facebook_url: facebookUrl,
      instagram_url: instagramUrl,
      x_url: xUrl,
      tiktok_url: tiktokUrl,
      linkedin_url: linkedinUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "update",
    entityType: "site_settings",
    entityId: SITE_SETTINGS_ID,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");

  return { success: true };
}

export async function togglePublishedState(formData: FormData): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return { error: auth.error };

  const table = String(formData.get("table") || "");
  const id = String(formData.get("id") || "");
  const published = formData.get("published") === "true";

  if (!id || !PUBLISHABLE_TABLES.includes(table as (typeof PUBLISHABLE_TABLES)[number])) {
    return { error: "Missing or invalid parameters" };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

  const { error } = await supabase
    .from(table)
    .update({
      published: !published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: auth.actorEmail,
    action: "toggle_publish",
    entityType: table,
    entityId: id,
    metadata: { published: !published },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/services");
  revalidatePath("/admin/packages");
  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath("/services");
  revalidatePath("/packages");

  return { success: true };
}
