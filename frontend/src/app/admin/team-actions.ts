"use server";

import { revalidatePath } from "next/cache";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { logAuditEvent } from "@/lib/audit";
import { requireAdminOnlySession } from "@/lib/admin-auth";

type ActionResult = { error?: string; success?: boolean };

export async function inviteAdmin(formData: FormData): Promise<ActionResult> {
  let session;
  try {
    session = await requireAdminOnlySession();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Not authorized." };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "viewer");

  if (!email || !password || password.length < 8) {
    return { error: "Provide an email and a password of at least 8 characters." };
  }

  if (role !== "admin" && role !== "viewer") {
    return { error: "Invalid role." };
  }

  const supabase = createServiceRoleSupabase();

  const { data: existing } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return { error: "This email is already an admin user." };
  }

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError) {
    return { error: createError.message };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (supabase.from("admin_users") as any).insert({
    email,
    role,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  await logAuditEvent({
    actorEmail: session.user.email!,
    action: "create",
    entityType: "admin_user",
    entityId: created.user?.id,
    metadata: { email, role },
  });

  revalidatePath("/admin/team");
  return { success: true };
}

export async function updateAdminRole(formData: FormData): Promise<ActionResult> {
  let session;
  try {
    session = await requireAdminOnlySession();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Not authorized." };
  }

  const id = String(formData.get("id") || "");
  const email = String(formData.get("email") || "");
  const role = String(formData.get("role") || "");

  if (!id || (role !== "admin" && role !== "viewer")) {
    return { error: "Invalid parameters." };
  }

  if (email === session.user.email && role === "viewer") {
    return { error: "You cannot demote your own account." };
  }

  const supabase = createServiceRoleSupabase();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("admin_users") as any)
    .update({ role })
    .eq("id", id);

  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: session.user.email!,
    action: "update_role",
    entityType: "admin_user",
    entityId: id,
    metadata: { role },
  });

  revalidatePath("/admin/team");
  return { success: true };
}

export async function removeAdmin(formData: FormData): Promise<ActionResult> {
  let session;
  try {
    session = await requireAdminOnlySession();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Not authorized." };
  }

  const id = String(formData.get("id") || "");
  const email = String(formData.get("email") || "");

  if (!id) return { error: "Missing id." };

  if (email === session.user.email) {
    return { error: "You cannot remove your own account." };
  }

  const supabase = createServiceRoleSupabase();

  const { error } = await supabase.from("admin_users").delete().eq("id", id);
  if (error) return { error: error.message };

  await logAuditEvent({
    actorEmail: session.user.email!,
    action: "delete",
    entityType: "admin_user",
    entityId: id,
    metadata: { email },
  });

  revalidatePath("/admin/team");
  return { success: true };
}
