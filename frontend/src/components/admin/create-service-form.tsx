"use client";

import { useTransition } from "react";
import { createManagedService } from "@/app/admin/cms-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export function CreateServiceForm() {
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await createManagedService(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Service created successfully");
            (e.target as HTMLFormElement).reset();
          }
        });
      }}
      className="grid gap-5"
    >
      <Field label="Title">
        <Input name="title" required />
      </Field>

      <Field label="Slug">
        <Input name="slug" placeholder="auto-generated-if-empty" />
      </Field>

      <Field label="Headline">
        <Input name="headline" required />
      </Field>

      <ImageUploadField name="cover_image" label="Cover Image" />

      <Field label="Short Description">
        <Textarea name="short_description" required />
      </Field>

      <Field label="Full Description">
        <Textarea name="description" className="min-h-[220px]" required />
      </Field>

      <Field label="Who It Is For">
        <Textarea name="who_its_for" required />
      </Field>

      <Field label="Outcomes (One per line)">
        <Textarea name="outcomes" className="min-h-[180px]" required />
      </Field>

      <label className="flex items-center gap-3 text-sm text-text-body">
        <input type="checkbox" name="published" defaultChecked />
        Publish immediately
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Create Service"}
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