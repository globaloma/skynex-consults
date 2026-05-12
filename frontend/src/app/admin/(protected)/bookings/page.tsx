import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { TableEmpty } from "@/components/admin/table-empty";
import { BookingStatusForm } from "@/components/admin/booking-status-form";
import { BookingsFilters } from "@/components/admin/bookings-filters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
type Props = {
  searchParams: Promise<{ status?: string }>;
};
type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export default async function AdminBookingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const status = params.status || "all";

  const supabase = createServiceRoleSupabase();

  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data } = await query;

const bookings: Booking[] = data ?? [];

  return (
    <div>
      <AdminHeader
        title="Bookings"
        description="Manage consultation requests and update their status."
      />

      <div className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <BookingsFilters currentStatus={status} />
          <Link href="/admin/bookings/export">
            <Button variant="secondary">Export CSV</Button>
          </Link>
        </div>

        <Card>
          <CardContent>
            {!bookings || bookings.length === 0 ? (
              <TableEmpty
                title="No bookings yet"
                description="Consultation requests will appear here when submitted."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Name</th>
                      <th className="pb-3 font-medium text-text-muted">Email</th>
                      <th className="pb-3 font-medium text-text-muted">Service</th>
                      <th className="pb-3 font-medium text-text-muted">Date</th>
                      <th className="pb-3 font-medium text-text-muted">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">{booking.full_name}</td>
                        <td className="py-4 text-text-body">{booking.email}</td>
                        <td className="py-4 text-text-body">{booking.service_interest}</td>
                        <td className="py-4 text-text-body">
                          {formatDate(booking.preferred_date)}
                        </td>
                        <td className="py-4">
                          <BookingStatusForm
                            id={booking.id}
                            currentStatus={booking.status || "new"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}