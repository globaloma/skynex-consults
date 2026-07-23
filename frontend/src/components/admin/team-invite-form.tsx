"use client";

import { useTransition } from "react";
import { inviteAdmin } from "@/app/admin/team-actions";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

export function TeamInviteForm() {
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const result = await inviteAdmin(formData);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Admin user created successfully");
            (e.target as HTMLFormElement).reset();
          }
        });
      }}
      className="grid gap-4 md:grid-cols-[1.3fr_1fr_0.8fr_auto] md:items-end"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium text-text-primary">Email</label>
        <Input name="email" type="email" required />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-text-primary">Temporary password</label>
        <Input name="password" type="text" minLength={8} required />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-text-primary">Role</label>
        <select
          name="role"
          defaultValue="viewer"
          className="h-11 rounded-xl border border-borderSoft bg-white px-3 text-sm outline-none focus:border-brand-500"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-xl bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Adding..." : "Add Team Member"}
      </button>
    </form>
  );
}
