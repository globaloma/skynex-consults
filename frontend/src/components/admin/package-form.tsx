"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPackage, updatePackage } from "@/app/admin/cms-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

type PackageFormData = {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price_label: string;
  amount: number;
  description: string;
  features: string[];
  deliverables: string[];
  popular: boolean;
  published: boolean;
  sort_order: number;
};

export function PackageForm({ initialData }: { initialData?: PackageFormData }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const isEdit = Boolean(initialData);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = isEdit
            ? await updatePackage(formData)
            : await createPackage(formData);

          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(isEdit ? "Package updated successfully" : "Package created successfully");
            if (!isEdit) {
              (e.target as HTMLFormElement).reset();
              router.push("/admin/packages");
            }
          }
        });
      }}
      className="grid gap-5"
    >
      {isEdit ? <input type="hidden" name="id" value={initialData!.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Package Name">
          <Input name="name" defaultValue={initialData?.name} required />
        </Field>

        <Field label="Slug">
          <Input
            name="slug"
            defaultValue={initialData?.slug}
            placeholder="auto-generated-if-empty"
          />
        </Field>
      </div>

      <Field label="Subtitle">
        <Input
          name="subtitle"
          defaultValue={initialData?.subtitle}
          placeholder="e.g. Idea-to-Business Package"
          required
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Price Label" hint="What shows on the website, e.g. ₦100,000">
          <Input name="price_label" defaultValue={initialData?.price_label} required />
        </Field>

        <Field label="Charge Amount (₦)" hint="Actual amount charged via Paystack, in Naira">
          <Input
            type="number"
            name="amount"
            min={0}
            step="0.01"
            defaultValue={initialData ? initialData.amount / 100 : undefined}
            required
          />
        </Field>
      </div>

      <Field label="Description">
        <Textarea name="description" defaultValue={initialData?.description} required />
      </Field>

      <Field label="Features (one per line)">
        <Textarea
          name="features"
          defaultValue={initialData?.features.join("\n")}
          className="min-h-[160px]"
          required
        />
      </Field>

      <Field label="Deliverables (one per line)">
        <Textarea
          name="deliverables"
          defaultValue={initialData?.deliverables.join("\n")}
          className="min-h-[120px]"
          required
        />
      </Field>

      <Field label="Display Order" hint="Lower numbers appear first on the packages page">
        <Input
          type="number"
          name="sort_order"
          defaultValue={initialData?.sort_order ?? 0}
        />
      </Field>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 text-sm text-text-body">
          <input type="checkbox" name="popular" defaultChecked={initialData?.popular} />
          Mark as &ldquo;Most Popular&rdquo;
        </label>

        <label className="flex items-center gap-3 text-sm text-text-body">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initialData ? initialData.published : true}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : isEdit ? "Update Package" : "Create Package"}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      {children}
      {hint ? <p className="text-xs text-text-muted">{hint}</p> : null}
    </div>
  );
}
