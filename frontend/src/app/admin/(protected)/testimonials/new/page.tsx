import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { requireEditorPage } from "@/lib/admin-auth";

export default async function NewTestimonialPage() {
  await requireEditorPage("/admin/testimonials");

  return (
    <div>
      <AdminHeader
        title="Create Testimonial"
        description="Add a new testimonial for the website."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <TestimonialForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}