import { requireAdminUser } from "@/lib/admin-auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUser();

  return (
    <div className="min-h-screen bg-brand-50/20">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <AdminMobileNav />
          {children}
        </div>
      </div>
    </div>
  );
}