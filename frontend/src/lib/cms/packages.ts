import type { Database } from "@/types/supabase";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

export type PackageRow = Database["public"]["Tables"]["packages"]["Row"];

export async function getManagedPackages(): Promise<PackageRow[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getManagedPackageById(id: string): Promise<PackageRow | null> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getPublishedPackages(): Promise<PackageRow[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPublishedPackageById(id: string): Promise<PackageRow | null> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error) return null;
  return data;
}
