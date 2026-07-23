import type { Database } from "@/types/supabase";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export const SITE_SETTINGS_ID = "00000000-0000-0000-0000-000000000001";

const EMPTY_SETTINGS: SiteSettings = {
  id: SITE_SETTINGS_ID,
  facebook_url: null,
  instagram_url: null,
  x_url: null,
  tiktok_url: null,
  linkedin_url: null,
  updated_at: new Date(0).toISOString(),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", SITE_SETTINGS_ID)
    .single();

  if (error || !data) return EMPTY_SETTINGS;
  return data;
}
