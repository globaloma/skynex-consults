import { AdminHeader } from "@/components/admin/admin-header";
import { AnalyticsCards } from "@/components/admin/analytics-cards";
import { BookingsTrendChart } from "@/components/admin/bookings-trend-chart";
import { BookingStatusChart } from "@/components/admin/booking-status-chart";
import { RecentActivity } from "@/components/admin/recent-activity";
import { QuickActions } from "@/components/admin/quick-actions";
import { getDashboardData } from "@/lib/cms/dashboard";

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Overview of leads, content, and published assets."
      />

      <div className="grid gap-6 p-6">
        <AnalyticsCards
          bookingsCount={data.bookingsCount}
          contactsCount={data.contactsCount}
          publishedPosts={data.publishedPosts}
          publishedServices={data.publishedServices}
          bookingsTrend={data.bookingsTrend}
          contactsTrend={data.contactsTrend}
        />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <BookingsTrendChart data={data.bookingsByDay} />
          <BookingStatusChart data={data.bookingStatusBreakdown} />
        </div>

        <QuickActions />

        <RecentActivity
          recentBookings={data.recentBookings}
          recentContacts={data.recentContacts}
        />
      </div>
    </div>
  );
}
