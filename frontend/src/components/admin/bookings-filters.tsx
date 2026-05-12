import Link from "next/link";

type Props = {
  currentStatus?: string;
};

const statuses = ["all", "new", "confirmed", "completed", "cancelled"];

export function BookingsFilters({ currentStatus = "all" }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {statuses.map((status) => {
        const href =
          status === "all" ? "/admin/bookings" : `/admin/bookings?status=${status}`;
        const active = currentStatus === status;

        return (
          <Link
            key={status}
            href={href}
            className={`rounded-full px-4 py-2 text-sm ${
              active
                ? "bg-brand-600 text-white"
                : "border border-borderSoft text-text-body hover:bg-brand-50"
            }`}
          >
            {status}
          </Link>
        );
      })}
    </div>
  );
}