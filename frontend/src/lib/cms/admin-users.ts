import type { Database } from "@/types/supabase";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

export type AdminUserRow = Database["public"]["Tables"]["admin_users"]["Row"];

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
