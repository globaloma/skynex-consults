import { cache } from "react";
import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createServerSupabase, createServiceRoleSupabase } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type AdminUserRow = Database["public"]["Tables"]["admin_users"]["Row"];

type AdminSession = {
  user: User;
  adminUser: AdminUserRow;
};

export const requireAdminUser = cache(async function requireAdminUser(): Promise<AdminSession> {
  const supabase = await createServerSupabase();
  const serviceSupabase = createServiceRoleSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await serviceSupabase
    .from("admin_users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!adminUser) {
    redirect("/admin/login");
  }

  return {
    user,
    adminUser,
  };
});

export const getAdminSession = cache(async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createServerSupabase();
  const serviceSupabase = createServiceRoleSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const { data: adminUser } = await serviceSupabase
    .from("admin_users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!adminUser) return null;

  return { user, adminUser };
});

export async function requireEditorSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("You must be signed in as an admin to do this.");
  }

  if (session.adminUser.role === "viewer") {
    throw new Error("Viewer accounts cannot make changes.");
  }

  return session;
}

export async function requireAdminOnlySession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("You must be signed in as an admin to do this.");
  }

  if (session.adminUser.role !== "admin") {
    throw new Error("Only admins can manage team members.");
  }

  return session;
}

export async function canEditContent(): Promise<boolean> {
  const session = await getAdminSession();
  return session ? session.adminUser.role !== "viewer" : false;
}

export async function requireEditorPage(fallbackPath: string): Promise<AdminSession> {
  const session = await requireAdminUser();

  if (session.adminUser.role === "viewer") {
    redirect(fallbackPath);
  }

  return session;
}

export async function requireAdminRole(): Promise<AdminUserRow> {
  const { adminUser } = await requireAdminUser();

  if (adminUser.role === "viewer") {
    redirect("/admin");
  }

  return adminUser;
}
