import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getManagedBlogPosts } from "@/lib/cms/blog";
import { TableEmpty } from "@/components/admin/table-empty";
import { PublishToggleForm } from "@/components/admin/publish-toggle-form";
import { DeleteItemForm } from "@/components/admin/delete-item-form";
import { deleteBlogPost } from "@/app/admin/cms-actions";

export default async function AdminBlogPage() {
  const posts = await getManagedBlogPosts();

  return (
    <div>
      <AdminHeader
        title="Blog Posts"
        description="Create and manage insights articles published on the website."
      />

      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/blog/new">
            <Button>Create New Post</Button>
          </Link>
        </div>

        <Card>
          <CardContent>
            {posts.length === 0 ? (
              <TableEmpty
                title="No blog posts yet"
                description="Create your first insight article to get started."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Title</th>
                      <th className="pb-3 font-medium text-text-muted">Category</th>
                      <th className="pb-3 font-medium text-text-muted">Status</th>
                      <th className="pb-3 font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-borderSoft">
                        <td className="py-4 text-text-primary">{post.title}</td>
                        <td className="py-4 text-text-body">{post.category}</td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              post.published
                                ? "bg-brand-50 text-brand-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <Link href={`/admin/blog/${post.id}/edit`}>
                              <Button variant="secondary" size="sm">
                                Edit
                              </Button>
                            </Link>
                            <PublishToggleForm
                              id={post.id}
                              table="blog_posts"
                              published={post.published}
                            />
                            <DeleteItemForm id={post.id} action={deleteBlogPost} />
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