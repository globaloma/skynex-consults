import { AdminHeader } from "@/components/admin/admin-header";
import { AnalyticsCards } from "@/components/admin/analytics-cards";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = createServiceRoleSupabase();

  const [
    { count: bookingsCount },
    { count: contactsCount },
    { count: publishedPosts },
    { count: publishedServices },
  ] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("managed_services").select("*", { count: "exact", head: true }).eq("published", true),
  ]);

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Overview of leads, content, and published assets."
      />

      <div className="p-6">
        <AnalyticsCards
          bookingsCount={bookingsCount || 0}
          contactsCount={contactsCount || 0}
          publishedPosts={publishedPosts || 0}
          publishedServices={publishedServices || 0}
        />
      </div>
    </div>
  );
}