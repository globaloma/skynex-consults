import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { PackageForm } from "@/components/admin/package-form";
import { requireEditorPage } from "@/lib/admin-auth";

export default async function NewPackagePage() {
  await requireEditorPage("/admin/packages");

  return (
    <div>
      <AdminHeader
        title="Create Package"
        description="Add a new consulting package to the website."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <PackageForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
