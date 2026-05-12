import { createServiceRoleSupabase } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceRoleSupabase();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return new Response("Failed to export bookings", { status: 500 });
  }

  const headers = [
    "id",
    "full_name",
    "email",
    "phone",
    "consultation_type",
    "service_interest",
    "preferred_date",
    "preferred_time",
    "additional_notes",
    "status",
    "created_at",
  ];

  const rows = (data || []).map((item) =>
    headers.map((header) => JSON.stringify(item[header as keyof typeof item] ?? "")).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="bookings.csv"',
    },
  });
}