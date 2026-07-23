"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/actions";
import { toast } from "@/components/ui/sonner";

const statuses = ["new", "confirmed", "completed", "cancelled"];

export function BookingStatusForm({
  id,
  currentStatus,
  canEdit = true,
}: {
  id: string;
  currentStatus: string;
  canEdit?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  if (!canEdit) {
    return (
      <span className="rounded-full border border-borderSoft px-3 py-2 text-sm capitalize text-text-body">
        {currentStatus}
      </span>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await updateBookingStatus(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Booking status updated");
          }
        });
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={currentStatus}
        className="h-10 rounded-xl border border-borderSoft bg-white px-3 text-sm outline-none focus:border-brand-500"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}