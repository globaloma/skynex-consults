import { LogoutButton } from "@/components/admin/logout-button";

export function AdminHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
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
      <LogoutButton />
    </div>
  );
}