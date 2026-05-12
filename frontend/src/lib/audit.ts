import { createServiceRoleSupabase } from "@/lib/supabase/server";

export async function logAuditEvent({
  actorEmail,
  action,
  entityType,
  entityId,
  metadata,
}: {
  actorEmail: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createServiceRoleSupabase();

  await supabase.from("audit_logs").insert({
    actor_email: actorEmail,
    action,
    entity_type: entityType,
    entity_id: entityId || null,
    metadata: metadata || null,
  });
}