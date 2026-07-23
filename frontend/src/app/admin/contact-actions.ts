"use server";

import { revalidatePath } from "next/cache";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { logAuditEvent } from "@/lib/audit";
import { requireEditorSession } from "@/lib/admin-auth";

export async function toggleContactArchived(formData: FormData) {
  let session;
  try {
    session = await requireEditorSession();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Not authorized." };
  }

  const id = String(formData.get("id") || "");
  const archived = formData.get("archived") === "true";

  if (!id) return { error: "Missing id." };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServiceRoleSupabase() as any;

  const { error } = await supabase
    .from("contact_messages")
    .update({ archived: !archived })
    .eq("id", id);

  if (error) {
    return {
      error: error.message.includes("archived")
        ? "Archiving isn't set up yet. Run the SQL in docs/SUPABASE-SQL.md (Contact message archiving section)."
        : error.message,
    };
  }

  await logAuditEvent({
    actorEmail: session.user.email!,
    action: archived ? "unarchive" : "archive",
    entityType: "contact_message",
    entityId: id,
  });

  revalidatePath("/admin/contacts");
  return { success: true };
}
