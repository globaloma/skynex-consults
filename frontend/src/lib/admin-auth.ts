import { redirect } from "next/navigation";
import { createServerSupabase, createServiceRoleSupabase } from "@/lib/supabase/server";

export async function requireAdminUser() {
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
}