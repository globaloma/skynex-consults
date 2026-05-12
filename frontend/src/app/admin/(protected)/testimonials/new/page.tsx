import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
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