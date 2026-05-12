const required = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "BOOKING_ADMIN_EMAIL",
  "CONTACT_ADMIN_EMAIL",
];

const optional = [
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "RESEND_FROM_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_CALENDAR_ID",
  "GOOGLE_PROJECT_ID",
];

console.log("Checking required environment variables...\n");

let missing = 0;

for (const key of required) {
  if (!process.env[key]) {
    console.log(`❌ Missing: ${key}`);
    missing++;
  } else {
    console.log(`✅ ${key}`);
  }
}

console.log("\nChecking optional environment variables...\n");

for (const key of optional) {
  if (!process.env[key]) {
    console.log(`⚠️ Optional missing: ${key}`);
  } else {
    console.log(`✅ ${key}`);
  }
}

if (missing > 0) {
  console.log(`\n${missing} required environment variable(s) missing.`);
  process.exit(1);
}

console.log("\nAll required environment variables are present.");