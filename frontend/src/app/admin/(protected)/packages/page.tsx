import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedPackages } from "@/lib/cms/packages";
import { TableEmpty } from "@/components/admin/table-empty";
import { PublishToggleForm } from "@/components/admin/publish-toggle-form";
import { Button } from "@/components/ui/button";
import { DeleteItemForm } from "@/components/admin/delete-item-form";
import { deletePackage } from "@/app/admin/cms-actions";
import { canEditContent } from "@/lib/admin-auth";

export default async function AdminPackagesPage() {
  let packages: Awaited<ReturnType<typeof getManagedPackages>> = [];
  let loadError: string | null = null;

  const canEdit = await canEditContent();

  try {
    packages = await getManagedPackages();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Failed to load packages. Has the `packages` table been created?";
  }

  return (
    <div>
      <AdminHeader
        title="Packages"
        description="Edit the consulting packages and prices shown on the website."
      />

      <div className="p-6">
        {canEdit ? (
          <div className="mb-6">
            <Link href="/admin/packages/new">
              <Button>Create Package</Button>
            </Link>
          </div>
        ) : null}

        {loadError ? (
          <Card>
            <CardContent>
              <p className="text-sm font-medium text-red-600">Could not load packages</p>
              <p className="mt-2 text-sm text-text-muted">{loadError}</p>
              <p className="mt-2 text-sm text-text-muted">
                Run the SQL in <code>docs/SUPABASE-SQL.md</code> (Packages + Site Settings
                section) in your Supabase SQL editor, then reload this page.
              </p>
            </CardContent>
          </Card>
        ) : (
        <Card>
          <CardContent>
            {packages.length === 0 ? (
              <TableEmpty
                title="No packages found"
                description="Create your first consulting package to get started."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Name</th>
                      <th className="pb-3 font-medium text-text-muted">Price</th>
                      <th className="pb-3 font-medium text-text-muted">Status</th>
                      <th className="pb-3 font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">
                          {pkg.name}
                          {pkg.popular ? (
                            <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                              Popular
                            </span>
                          ) : null}
                        </td>
                        <td className="py-4 text-text-body">{pkg.price_label}</td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              pkg.published
                                ? "bg-brand-50 text-brand-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {pkg.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            {canEdit ? (
                              <Link href={`/admin/packages/${pkg.id}/edit`}>
                                <Button variant="secondary" size="sm">
                                  Edit
                                </Button>
                              </Link>
                            ) : null}
                            <PublishToggleForm
                              id={pkg.id}
                              table="packages"
                              published={pkg.published}
                              canEdit={canEdit}
                            />
                            <DeleteItemForm
                              id={pkg.id}
                              action={deletePackage}
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
        )}
      </div>
    </div>
  );
}
