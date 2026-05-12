import { createServiceRoleSupabase } from "@/lib/supabase/server";

export type ManagedService = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  who_its_for: string;
  outcomes: string[];
  cover_image?: string | null;
  published: boolean;
};

export async function getManagedServices(): Promise<ManagedService[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("managed_services")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ManagedService[];
}

export async function getManagedServiceById(
  id: string
): Promise<ManagedService | null> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("managed_services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ManagedService;
}

export async function getPublishedServices(): Promise<ManagedService[]> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("managed_services")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ManagedService[];
}

export async function getPublishedServiceBySlug(
  slug: string
): Promise<ManagedService | null> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("managed_services")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data as ManagedService;
}