import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { TableEmpty } from "@/components/admin/table-empty";
import { Database } from "@/types/supabase";

type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];
export default async function AdminContactsPage() {
  const supabase = createServiceRoleSupabase();

  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

    const contacts = (data ?? []) as ContactMessage[];
  return (
    <div>
      <AdminHeader
        title="Contact Messages"
        description="View all messages submitted through the contact form."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            {!contacts || contacts.length === 0 ? (
              <TableEmpty
                title="No contact messages yet"
                description="Messages submitted from the website will appear here."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Name</th>
                      <th className="pb-3 font-medium text-text-muted">Email</th>
                      <th className="pb-3 font-medium text-text-muted">Message</th>
                      <th className="pb-3 font-medium text-text-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">{contact.name}</td>
                        <td className="py-4 text-text-body">{contact.email}</td>
                        <td className="py-4 text-text-body">{contact.message}</td>
                        <td className="py-4 text-text-body">
                          {formatDate(contact.created_at)}
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