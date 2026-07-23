"use client";

import { useTransition } from "react";
import { toggleContactArchived } from "@/app/admin/contact-actions";
import { toast } from "@/components/ui/sonner";

export function ContactArchiveToggle({
  id,
  archived,
  canEdit = true,
}: {
  id: string;
  archived: boolean;
  canEdit?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  if (!canEdit) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await toggleContactArchived(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(archived ? "Message restored" : "Message archived");
          }
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="archived" value={String(archived)} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50 disabled:opacity-60"
      >
        {pending ? "Saving..." : archived ? "Restore" : "Archive"}
      </button>
    </form>
  );
}
