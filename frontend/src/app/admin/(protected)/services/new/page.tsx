import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { CreateServiceForm } from "@/components/admin/create-service-form";
import { requireEditorPage } from "@/lib/admin-auth";

export default async function NewManagedServicePage() {
  await requireEditorPage("/admin/services");

  return (
    <div>
      <AdminHeader
        title="Create Service"
        description="Add a new service to the website."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <CreateServiceForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}