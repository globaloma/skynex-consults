import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminHeader
        title="Create Blog Post"
        description="Add a new insight article for the website."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <BlogForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}