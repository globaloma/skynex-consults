"use client";

import { useTransition } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { updateSiteSettings } from "@/app/admin/cms-actions";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { XIcon, TikTokIcon } from "@/components/shared/social-icons";
import type { SiteSettings } from "@/lib/cms/settings";

export function SiteSettingsForm({
  initialData,
  canEdit = true,
}: {
  initialData: SiteSettings;
  canEdit?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await updateSiteSettings(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Social links updated successfully");
          }
        });
      }}
      className="grid gap-5"
    >
      <fieldset disabled={!canEdit} className="grid gap-5">
        <Field label="Facebook" icon={<Facebook className="h-4 w-4" />}>
          <Input
            name="facebook_url"
            type="url"
            placeholder="https://facebook.com/yourpage"
            defaultValue={initialData.facebook_url ?? ""}
          />
        </Field>

        <Field label="Instagram" icon={<Instagram className="h-4 w-4" />}>
          <Input
            name="instagram_url"
            type="url"
            placeholder="https://instagram.com/yourhandle"
            defaultValue={initialData.instagram_url ?? ""}
          />
        </Field>

        <Field label="X (Twitter)" icon={<XIcon className="h-4 w-4" />}>
          <Input
            name="x_url"
            type="url"
            placeholder="https://x.com/yourhandle"
            defaultValue={initialData.x_url ?? ""}
          />
        </Field>

        <Field label="TikTok" icon={<TikTokIcon className="h-4 w-4" />}>
          <Input
            name="tiktok_url"
            type="url"
            placeholder="https://tiktok.com/@yourhandle"
            defaultValue={initialData.tiktok_url ?? ""}
          />
        </Field>

        <Field label="LinkedIn" icon={<Linkedin className="h-4 w-4" />}>
          <Input
            name="linkedin_url"
            type="url"
            placeholder="https://linkedin.com/company/yourcompany"
            defaultValue={initialData.linkedin_url ?? ""}
          />
        </Field>
      </fieldset>

      <p className="text-xs text-text-muted">
        {canEdit
          ? "Leave a field empty to hide that icon from the website footer. Add a link and it appears automatically — no code changes needed."
          : "Your account is a viewer and cannot edit social links."}
      </p>

      {canEdit ? (
        <button
          type="submit"
          disabled={pending}
          className="w-fit rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Social Links"}
        </button>
      ) : null}
    </form>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          {icon}
        </span>
        {label}
      </label>
      {children}
    </div>
  );
}
