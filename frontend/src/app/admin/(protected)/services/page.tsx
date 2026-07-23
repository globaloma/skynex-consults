import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedServices } from "@/lib/cms/services";
import { TableEmpty } from "@/components/admin/table-empty";
import { PublishToggleForm } from "@/components/admin/publish-toggle-form";
import { Button } from "@/components/ui/button";
import { DeleteItemForm } from "@/components/admin/delete-item-form";
import { deleteManagedService } from "@/app/admin/cms-actions";
import { canEditContent } from "@/lib/admin-auth";

export default async function AdminServicesPage() {
  const [services, canEdit] = await Promise.all([
    getManagedServices(),
    canEditContent(),
  ]);

  return (
    <div>
      <AdminHeader
        title="Managed Services"
        description="Edit the service content displayed on the website."
      />

      <div className="p-6">
        {canEdit ? (
          <div className="mb-6">
            <Link href="/admin/services/new">
              <Button>Create Service</Button>
            </Link>
          </div>
        ) : null}

        <Card>
          <CardContent>
            {services.length === 0 ? (
              <TableEmpty
                title="No managed services found"
                description="Create your first managed service to get started."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Title</th>
                      <th className="pb-3 font-medium text-text-muted">Status</th>
                      <th className="pb-3 font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">
                          {service.title}
                        </td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              service.published
                                ? "bg-brand-50 text-brand-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {service.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            {canEdit ? (
                              <Link href={`/admin/services/${service.id}/edit`}>
                                <Button variant="secondary" size="sm">
                                  Edit
                                </Button>
                              </Link>
                            ) : null}
                            <PublishToggleForm
                              id={service.id}
                              table="managed_services"
                              published={service.published}
                              canEdit={canEdit}
                            />
                            <DeleteItemForm
                              id={service.id}
                              action={deleteManagedService}
                              canEdit={canEdit}
                            />
                          </div>
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