"use client";

import { useTransition } from "react";
import { createBlogPost, updateBlogPost } from "@/app/admin/cms-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type Props = {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    author: string;
    content: string;
    cover_image?: string | null;
    published: boolean;
  };
};

export function BlogForm({ initialData }: Props) {
  const [pending, startTransition] = useTransition();
  const isEdit = !!initialData;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = isEdit
            ? await updateBlogPost(formData)
            : await createBlogPost(formData);

          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(isEdit ? "Blog post updated" : "Blog post created");
          }
        });
      }}
      className="grid gap-5"
    >
      {isEdit ? <input type="hidden" name="id" value={initialData.id} /> : null}

      <Field label="Title">
        <Input name="title" defaultValue={initialData?.title} required />
      </Field>

      <Field label="Slug">
        <Input
          name="slug"
          defaultValue={initialData?.slug}
          placeholder="auto-generated-if-empty"
        />
      </Field>

      <Field label="Description">
        <Textarea
          name="description"
          defaultValue={initialData?.description}
          required
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Category">
          <Input name="category" defaultValue={initialData?.category} required />
        </Field>

        <Field label="Author">
          <Input
            name="author"
            defaultValue={initialData?.author || "Skynex Consults"}
            required
          />
        </Field>
      </div>

      <ImageUploadField
        name="cover_image"
        label="Cover Image"
        defaultValue={initialData?.cover_image}
      />

      <div className="grid gap-2">
        <label className="text-sm font-medium text-text-primary">Content</label>
        <RichTextEditor
          name="content"
          defaultValue={initialData?.content || ""}
          placeholder="Write the article content here..."
        />
      </div>

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
        {pending ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
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