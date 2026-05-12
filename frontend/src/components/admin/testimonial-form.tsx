"use client";

import { useTransition } from "react";
import { createTestimonial, updateTestimonial } from "@/app/admin/cms-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type Props = {
  initialData?: {
    id: string;
    name: string;
    role: string | null;
    quote: string;
    avatar_image?: string | null;
    published: boolean;
  };
};

export function TestimonialForm({ initialData }: Props) {
  const [pending, startTransition] = useTransition();
  const isEdit = !!initialData;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = isEdit
            ? await updateTestimonial(formData)
            : await createTestimonial(formData);

          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(isEdit ? "Testimonial updated" : "Testimonial created");
          }
        });
      }}
      className="grid gap-5"
    >
      {isEdit ? <input type="hidden" name="id" value={initialData.id} /> : null}

      <Field label="Name">
        <Input name="name" defaultValue={initialData?.name} required />
      </Field>

      <Field label="Role / Title (Optional)">
        <Input name="role" defaultValue={initialData?.role || ""} />
      </Field>

      <ImageUploadField
        name="avatar_image"
        label="Avatar Image"
        defaultValue={initialData?.avatar_image}
      />

      <Field label="Quote">
        <Textarea
          name="quote"
          defaultValue={initialData?.quote}
          required
          className="min-h-[180px]"
        />
      </Field>

      <label className="flex items-center gap-3 text-sm text-text-body">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initialData?.published ?? true}
        />
        Publish immediately
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : isEdit ? "Update Testimonial" : "Create Testimonial"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      {children}
    </div>
  );
}