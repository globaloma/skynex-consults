import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { getSiteSettings } from "@/lib/cms/settings";
import { canEditContent } from "@/lib/admin-auth";

export default async function AdminSettingsPage() {
  const [settings, canEdit] = await Promise.all([getSiteSettings(), canEditContent()]);

  return (
    <div>
      <AdminHeader
        title="Site Settings"
        description="Manage the social media links displayed on the website footer."
      />

      <div className="p-6">
        <Card className="max-w-2xl">
          <CardContent>
            <SiteSettingsForm initialData={settings} canEdit={canEdit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
