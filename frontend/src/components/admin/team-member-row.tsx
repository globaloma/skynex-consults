"use client";

import { useTransition } from "react";
import { updateAdminRole, removeAdmin } from "@/app/admin/team-actions";
import { toast } from "@/components/ui/sonner";
import { formatDate } from "@/lib/utils";

export function TeamMemberRow({
  id,
  email,
  role,
  createdAt,
  isSelf,
}: {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  isSelf: boolean;
}) {
  const [pending, startTransition] = useTransition();

  const changeRole = (nextRole: string) => {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("email", email);
    formData.set("role", nextRole);

    startTransition(async () => {
      const result = await updateAdminRole(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Role updated");
      }
    });
  };

  const remove = () => {
    if (!window.confirm(`Remove ${email} from the admin dashboard?`)) return;

    const formData = new FormData();
    formData.set("id", id);
    formData.set("email", email);

    startTransition(async () => {
      const result = await removeAdmin(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Team member removed");
      }
    });
  };

  return (
    <tr className="border-b border-borderSoft">
      <td className="py-4 text-text-primary">
        {email}
        {isSelf ? <span className="ml-2 text-xs text-text-muted">(you)</span> : null}
      </td>
      <td className="py-4">
        <select
          value={role}
          disabled={pending || isSelf}
          onChange={(e) => changeRole(e.target.value)}
          className="h-9 rounded-lg border border-borderSoft bg-white px-2 text-sm capitalize outline-none focus:border-brand-500 disabled:opacity-60"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      </td>
      <td className="py-4 text-text-body">{formatDate(createdAt)}</td>
      <td className="py-4">
        <button
          onClick={remove}
          disabled={pending || isSelf}
          className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
