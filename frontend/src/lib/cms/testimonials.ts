import { createServiceRoleSupabase } from "@/lib/supabase/server";

export async function getManagedTestimonials() {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getManagedTestimonialById(id: string) {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getPublishedTestimonials() {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}