import type { Database } from "@/types/supabase";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { TableEmpty } from "@/components/admin/table-empty";

type AuditLogRow = Database["public"]["Tables"]["audit_logs"]["Row"];

export default async function AdminAuditPage() {
  const supabase = createServiceRoleSupabase();

  const { data } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const logs = (data ?? []) as AuditLogRow[];

  return (
    <div>
      <AdminHeader
        title="Audit Logs"
        description="Recent administrative actions taken within the system."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            {logs.length === 0 ? (
              <TableEmpty
                title="No audit logs yet"
                description="Administrative activity will appear here."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Actor</th>
                      <th className="pb-3 font-medium text-text-muted">Action</th>
                      <th className="pb-3 font-medium text-text-muted">Entity</th>
                      <th className="pb-3 font-medium text-text-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">
                          {log.actor_email}
                        </td>
                        <td className="py-4 text-text-body">
                          {log.action}
                        </td>
                        <td className="py-4 text-text-body">
                          {log.entity_type}
                        </td>
                        <td className="py-4 text-text-body">
                          {formatDate(log.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}