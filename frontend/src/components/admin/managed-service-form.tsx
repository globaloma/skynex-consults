"use client";

import { useTransition } from "react";
import { updateManagedService } from "@/app/admin/cms-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type Props = {
  initialData: {
    id: string;
    title: string;
    slug: string;
    headline: string;
    short_description: string;
    description: string;
    who_its_for: string;
    outcomes: string[];
    cover_image?: string | null;
    published: boolean;
  };
};

export function ManagedServiceForm({ initialData }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await updateManagedService(formData);

          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Service updated successfully");
          }
        });
      }}
      className="grid gap-5"
    >
      <input type="hidden" name="id" value={initialData.id} />

      <Field label="Title">
        <Input name="title" defaultValue={initialData.title} required />
      </Field>

      <Field label="Slug">
        <Input name="slug" defaultValue={initialData.slug} required />
      </Field>

      <Field label="Headline">
        <Input name="headline" defaultValue={initialData.headline} required />
      </Field>

      <ImageUploadField
        name="cover_image"
        label="Cover Image"
        defaultValue={initialData.cover_image}
      />

      <Field label="Short Description">
        <Textarea
          name="short_description"
          defaultValue={initialData.short_description}
          required
        />
      </Field>

      <Field label="Full Description">
        <Textarea
          name="description"
          defaultValue={initialData.description}
          className="min-h-[220px]"
          required
        />
      </Field>

      <Field label="Who It Is For">
        <Textarea
          name="who_its_for"
          defaultValue={initialData.who_its_for}
          required
        />
      </Field>

      <Field label="Outcomes (One per line)">
        <Textarea
          name="outcomes"
          defaultValue={initialData.outcomes.join("\n")}
          className="min-h-[180px]"
          required
        />
      </Field>

      <label className="flex items-center gap-3 text-sm text-text-body">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initialData.published}
        />
        Published
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Update Service"}
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