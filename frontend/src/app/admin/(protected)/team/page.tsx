import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminUsers } from "@/lib/cms/admin-users";
import { requireAdminRole } from "@/lib/admin-auth";
import { TeamInviteForm } from "@/components/admin/team-invite-form";
import { TeamMemberRow } from "@/components/admin/team-member-row";

export default async function AdminTeamPage() {
  const currentAdmin = await requireAdminRole();
  const members = await getAdminUsers();

  return (
    <div>
      <AdminHeader
        title="Team"
        description="Manage who can access the admin dashboard and what they can do."
      />

      <div className="grid gap-6 p-6">
        <Card>
          <CardContent>
            <p className="text-sm font-medium text-text-primary">Add a team member</p>
            <p className="mt-1 text-xs text-text-muted">
              Admins can create and edit everything. Viewers can see the dashboard but
              cannot make changes.
            </p>
            <div className="mt-5">
              <TeamInviteForm />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-sm font-medium text-text-primary">Team members</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-borderSoft">
                    <th className="pb-3 font-medium text-text-muted">Email</th>
                    <th className="pb-3 font-medium text-text-muted">Role</th>
                    <th className="pb-3 font-medium text-text-muted">Added</th>
                    <th className="pb-3 font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <TeamMemberRow
                      key={member.id}
                      id={member.id}
                      email={member.email}
                      role={member.role}
                      createdAt={member.created_at}
                      isSelf={member.email === currentAdmin.email}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
