import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getManagedTestimonialById } from "@/lib/cms/testimonials";
import { requireEditorPage } from "@/lib/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTestimonialPage({ params }: Props) {
  await requireEditorPage("/admin/testimonials");
  const { id } = await params;
  const testimonial = await getManagedTestimonialById(id);

  if (!testimonial) return notFound();

  return (
    <div>
      <AdminHeader
        title="Edit Testimonial"
        description="Update testimonial content and publishing state."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <TestimonialForm initialData={testimonial} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}