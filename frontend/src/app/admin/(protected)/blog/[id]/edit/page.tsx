import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { BlogForm } from "@/components/admin/blog-form";
import { getManagedBlogPostById } from "@/lib/cms/blog";
import { requireEditorPage } from "@/lib/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  await requireEditorPage("/admin/blog");
  const { id } = await params;
  const post = await getManagedBlogPostById(id);

  if (!post) return notFound();

  return (
    <div>
      <AdminHeader
        title="Edit Blog Post"
        description="Update article content and publishing state."
      />

      <div className="p-6">
        <Card>
          <CardContent>
            <BlogForm initialData={post} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}