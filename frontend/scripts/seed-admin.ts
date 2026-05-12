import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const email = process.env.SEED_ADMIN_EMAIL || "admin@skynexconsult.com";

  const { data: existing } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single();

  if (existing) {
    console.log(`Admin already exists for ${email}`);
    return;
  }

  const { error } = await supabase.from("admin_users").insert({
    email,
    role: "admin",
  });

  if (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }

  console.log(`Admin seeded successfully for ${email}`);
}

main();