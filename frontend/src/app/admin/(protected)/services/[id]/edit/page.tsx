import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { ManagedServiceForm } from "@/components/admin/managed-service-form";
import { getManagedServiceById } from "@/lib/cms/services";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditManagedServicePage({ params }: Props) {
  const { id } = await params;
  const service = await getManagedServiceById(id);

  if (!service) return notFound();

  return (
    <div>
      <AdminHeader
        title="Edit Service"
        description="Update service copy, outcomes, and publishing state."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <ManagedServiceForm initialData={service} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}