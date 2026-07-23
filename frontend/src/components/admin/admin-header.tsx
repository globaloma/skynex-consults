import { LogoutButton } from "@/components/admin/logout-button";
import { getAdminSession } from "@/lib/admin-auth";

export async function AdminHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const session = await getAdminSession();

  return (
    <div className="flex flex-col gap-4 border-b border-borderSoft bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-text-primary">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-text-primary">{session.user.email}</p>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs capitalize text-brand-700">
              {session.adminUser.role}
            </span>
          </div>
        ) : null}
        <LogoutButton />
      </div>
    </div>
  );
}