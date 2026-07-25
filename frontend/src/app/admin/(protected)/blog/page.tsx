import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getManagedBlogPosts } from "@/lib/cms/blog";
import { TableEmpty } from "@/components/admin/table-empty";
import { PublishToggleForm } from "@/components/admin/publish-toggle-form";
import { DeleteItemForm } from "@/components/admin/delete-item-form";
import { deleteBlogPost } from "@/app/admin/cms-actions";
import { canEditContent } from "@/lib/admin-auth";
import { MobileRecordCard, MobileRecordRow } from "@/components/admin/mobile-record-card";
import { StatusBadge } from "@/components/admin/status-badge";

export default async function AdminBlogPage() {
  const [posts, canEdit] = await Promise.all([getManagedBlogPosts(), canEditContent()]);

  return (
    <div>
      <AdminHeader
        title="Blog Posts"
        description="Create and manage insights articles published on the website."
      />

      <div className="p-6">
        {canEdit ? (
          <div className="mb-6">
            <Link href="/admin/blog/new">
              <Button>Create New Post</Button>
            </Link>
          </div>
        ) : null}

        {posts.length === 0 ? (
          <Card>
            <CardContent>
              <TableEmpty
                title="No blog posts yet"
                description="Create your first insight article to get started."
              />
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:hidden">
              {posts.map((post) => (
                <MobileRecordCard
                  key={post.id}
                  title={post.title}
                  badge={<StatusBadge published={post.published} />}
                  actions={
                    <>
                      {canEdit ? (
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                      ) : null}
                      <PublishToggleForm
                        id={post.id}
                        table="blog_posts"
                        published={post.published}
                        canEdit={canEdit}
                      />
                      <DeleteItemForm id={post.id} action={deleteBlogPost} canEdit={canEdit} />
                    </>
                  }
                >
                  <MobileRecordRow label="Category" value={post.category} />
                </MobileRecordCard>
              ))}
            </div>

            <Card className="hidden md:block">
              <CardContent>
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
                            <StatusBadge published={post.published} />
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              {canEdit ? (
                                <Link href={`/admin/blog/${post.id}/edit`}>
                                  <Button variant="secondary" size="sm">
                                    Edit
                                  </Button>
                                </Link>
                              ) : null}
                              <PublishToggleForm
                                id={post.id}
                                table="blog_posts"
                                published={post.published}
                                canEdit={canEdit}
                              />
                              <DeleteItemForm
                                id={post.id}
                                action={deleteBlogPost}
                                canEdit={canEdit}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
