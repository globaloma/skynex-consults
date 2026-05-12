import { NextResponse } from "next/server";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServiceRoleSupabase();

    // ✅ Lightweight DB query
    await supabase.from("bookings").select("id").limit(1);

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Database not reachable" },
      { status: 500 }
    );
  }
}