import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { TableEmpty } from "@/components/admin/table-empty";
import { BookingStatusForm } from "@/components/admin/booking-status-form";
import { BookingsFilters } from "@/components/admin/bookings-filters";
import { SearchInput } from "@/components/shared/search-input";
import { PaginationControls } from "@/components/shared/pagination-controls";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { canEditContent } from "@/lib/admin-auth";
import { getPaginatedBookings } from "@/lib/cms/queries";

type Props = {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
};

export default async function AdminBookingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const status = params.status || "all";
  const search = params.search || "";
  const page = Number(params.page || 1) || 1;

  const [{ data: bookings, totalPages, currentPage }, canEdit] = await Promise.all([
    getPaginatedBookings({ page, limit: 10, status, search }),
    canEditContent(),
  ]);

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

        <div className="mb-6">
          <SearchInput
            placeholder="Search by name, email, or service..."
            currentValue={search}
            extraParams={status !== "all" ? { status } : {}}
          />
        </div>

        <Card>
          <CardContent>
            {!bookings || bookings.length === 0 ? (
              <TableEmpty
                title="No bookings found"
                description="Try a different search or status filter."
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
                            canEdit={canEdit}
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

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/admin/bookings"
          extraParams={{
            ...(status !== "all" ? { status } : {}),
            ...(search ? { search } : {}),
          }}
        />
      </div>
    </div>
  );
}
