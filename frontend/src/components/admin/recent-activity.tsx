import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Database } from "@/types/supabase";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-brand-50 text-brand-700",
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-50 text-red-600",
};

export function RecentActivity({
  recentBookings,
  recentContacts,
}: {
  recentBookings: Booking[];
  recentContacts: ContactMessage[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-primary">Recent bookings</p>
            <Link href="/admin/bookings" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="mt-6 text-sm text-text-muted">No bookings yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-xl border border-borderSoft px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {booking.full_name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {booking.service_interest} &middot; {formatDate(booking.created_at)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs capitalize ${
                      STATUS_STYLES[booking.status || "new"] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status || "new"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-primary">Recent messages</p>
            <Link href="/admin/contacts" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>

          {recentContacts.length === 0 ? (
            <p className="mt-6 text-sm text-text-muted">No messages yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="rounded-xl border border-borderSoft px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary">{contact.name}</p>
                    <p className="text-xs text-text-muted">{formatDate(contact.created_at)}</p>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-text-muted">
                    {contact.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
