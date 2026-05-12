import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { CreateServiceForm } from "@/components/admin/create-service-form";

export default function NewManagedServicePage() {
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