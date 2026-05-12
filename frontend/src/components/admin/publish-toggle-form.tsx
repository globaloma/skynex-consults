"use client";

import { useTransition } from "react";
import { togglePublishedState } from "@/app/admin/cms-actions";
import { toast } from "@/components/ui/sonner";

export function PublishToggleForm({
  id,
  table,
  published,
}: {
  id: string;
  table: "blog_posts" | "testimonials" | "managed_services";
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await togglePublishedState(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(
              `Item ${published ? "unpublished" : "published"} successfully`
            );
          }
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="published" value={String(published)} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50 disabled:opacity-60"
      >
        {pending ? "Updating..." : published ? "Unpublish" : "Publish"}
      </button>
    </form>
  );
}