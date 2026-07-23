import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableEmpty } from "@/components/admin/table-empty";
import { getManagedTestimonials } from "@/lib/cms/testimonials";
import { PublishToggleForm } from "@/components/admin/publish-toggle-form";
import { DeleteItemForm } from "@/components/admin/delete-item-form";
import { deleteTestimonial } from "@/app/admin/cms-actions";
import { Database } from "@/types/supabase";
import { canEditContent } from "@/lib/admin-auth";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

export default async function AdminTestimonialsPage() {
  const [testimonials, canEdit] = await Promise.all([
    getManagedTestimonials() as Promise<Testimonial[]>,
    canEditContent(),
  ]);

  return (
    <div>
      <AdminHeader
        title="Testimonials"
        description="Create and manage client testimonials shown on the website."
      />

      <div className="p-6">
        {canEdit ? (
          <div className="mb-6">
            <Link href="/admin/testimonials/new">
              <Button>Create Testimonial</Button>
            </Link>
          </div>
        ) : null}

        <Card>
          <CardContent>
            {testimonials.length === 0 ? (
              <TableEmpty
                title="No testimonials yet"
                description="Add testimonials to strengthen social proof on the website."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Name</th>
                      <th className="pb-3 font-medium text-text-muted">Status</th>
                      <th className="pb-3 font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map((item) => (
                      <tr key={item.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">{item.name}</td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              item.published
                                ? "bg-brand-50 text-brand-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {item.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            {canEdit ? (
                              <Link href={`/admin/testimonials/${item.id}/edit`}>
                                <Button variant="secondary" size="sm">
                                  Edit
                                </Button>
                              </Link>
                            ) : null}
                            <PublishToggleForm
                              id={item.id}
                              table="testimonials"
                              published={item.published}
                              canEdit={canEdit}
                            />
                            <DeleteItemForm
                              id={item.id}
                              action={deleteTestimonial}
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