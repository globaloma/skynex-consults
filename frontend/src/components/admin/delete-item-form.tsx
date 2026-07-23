"use client";

import { useTransition } from "react";
import { toast } from "@/components/ui/sonner";

export function DeleteItemForm({
  id,
  action,
  label = "Delete",
  canEdit = true,
}: {
  id: string;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>;
  label?: string;
  canEdit?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  if (!canEdit) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await action(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Item deleted successfully");
          }
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
      >
        {pending ? "Deleting..." : label}
      </button>
    </form>
  );
}