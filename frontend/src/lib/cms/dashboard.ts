import { createServiceRoleSupabase } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

export type TrendDirection = "up" | "down" | "flat";

export type Trend = {
  direction: TrendDirection;
  percent: number;
};

export type DashboardData = {
  bookingsCount: number;
  contactsCount: number;
  publishedPosts: number;
  publishedServices: number;
  bookingsTrend: Trend;
  contactsTrend: Trend;
  bookingsByDay: { date: string; count: number }[];
  bookingStatusBreakdown: { status: string; count: number }[];
  recentBookings: Booking[];
  recentContacts: ContactMessage[];
};

function computeTrend(current: number, previous: number): Trend {
  if (previous === 0) {
    return { direction: current > 0 ? "up" : "flat", percent: current > 0 ? 100 : 0 };
  }

  const percent = Math.round(((current - previous) / previous) * 100);
  if (percent > 0) return { direction: "up", percent };
  if (percent < 0) return { direction: "down", percent: Math.abs(percent) };
  return { direction: "flat", percent: 0 };
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createServiceRoleSupabase();

  const now = new Date();
  const last7Start = new Date(now);
  last7Start.setDate(now.getDate() - 7);
  const prev7Start = new Date(now);
  prev7Start.setDate(now.getDate() - 14);
  const last14Start = startOfDay(new Date(now));
  last14Start.setDate(last14Start.getDate() - 13);

  const [
    { count: bookingsCount },
    { count: contactsCount },
    { count: publishedPosts },
    { count: publishedServices },
    { count: bookingsLast7 },
    { count: bookingsPrev7 },
    { count: contactsLast7 },
    { count: contactsPrev7 },
    { data: recentBookingWindow },
    { data: allBookingsForStatus },
    { data: recentBookings },
    { data: recentContacts },
  ] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("managed_services")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte("created_at", last7Start.toISOString()),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prev7Start.toISOString())
      .lt("created_at", last7Start.toISOString()),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .gte("created_at", last7Start.toISOString()),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prev7Start.toISOString())
      .lt("created_at", last7Start.toISOString()),
    supabase
      .from("bookings")
      .select("created_at")
      .gte("created_at", last14Start.toISOString()),
    supabase.from("bookings").select("status"),
    supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const bookingsByDayMap = new Map<string, number>();
  for (let i = 0; i < 14; i++) {
    const d = new Date(last14Start);
    d.setDate(d.getDate() + i);
    bookingsByDayMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of recentBookingWindow ?? []) {
    const key = String((row as { created_at: string }).created_at).slice(0, 10);
    if (bookingsByDayMap.has(key)) {
      bookingsByDayMap.set(key, (bookingsByDayMap.get(key) ?? 0) + 1);
    }
  }
  const bookingsByDay = Array.from(bookingsByDayMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  const statusCounts = new Map<string, number>();
  for (const row of allBookingsForStatus ?? []) {
    const status = (row as { status: string | null }).status || "new";
    statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);
  }
  const bookingStatusBreakdown = Array.from(statusCounts.entries()).map(
    ([status, count]) => ({ status, count })
  );

  return {
    bookingsCount: bookingsCount ?? 0,
    contactsCount: contactsCount ?? 0,
    publishedPosts: publishedPosts ?? 0,
    publishedServices: publishedServices ?? 0,
    bookingsTrend: computeTrend(bookingsLast7 ?? 0, bookingsPrev7 ?? 0),
    contactsTrend: computeTrend(contactsLast7 ?? 0, contactsPrev7 ?? 0),
    bookingsByDay,
    bookingStatusBreakdown,
    recentBookings: (recentBookings ?? []) as Booking[],
    recentContacts: (recentContacts ?? []) as ContactMessage[],
  };
}
