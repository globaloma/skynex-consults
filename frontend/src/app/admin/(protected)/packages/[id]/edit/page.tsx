import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { PackageForm } from "@/components/admin/package-form";
import { getManagedPackageById } from "@/lib/cms/packages";
import { requireEditorPage } from "@/lib/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPackagePage({ params }: Props) {
  await requireEditorPage("/admin/packages");
  const { id } = await params;
  const pkg = await getManagedPackageById(id);

  if (!pkg) return notFound();

  return (
    <div>
      <AdminHeader title="Edit Package" description="Update this package's content and price." />

      <div className="p-6">
        <Card>
          <CardContent>
            <PackageForm initialData={pkg} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
