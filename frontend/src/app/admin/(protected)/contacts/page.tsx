import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { TableEmpty } from "@/components/admin/table-empty";
import { SearchInput } from "@/components/shared/search-input";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { ContactArchiveToggle } from "@/components/admin/contact-archive-toggle";
import { getPaginatedContactMessages } from "@/lib/cms/queries";
import { canEditContent } from "@/lib/admin-auth";
import type { Database } from "@/types/supabase";

type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

type Props = {
  searchParams: Promise<{ search?: string; page?: string; view?: string }>;
};

const TABS = [
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
  { label: "All", value: "all" },
] as const;

export default async function AdminContactsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search || "";
  const page = Number(params.page || 1) || 1;
  const view = (params.view as "active" | "archived" | "all") || "active";

  const canEdit = await canEditContent();

  let contacts: ContactMessage[] = [];
  let totalPages = 1;
  let currentPage = 1;
  let archiveSupported = true;

  try {
    const result = await getPaginatedContactMessages({
      page,
      limit: 10,
      search,
      archived: view,
    });
    contacts = result.data;
    totalPages = result.totalPages;
    currentPage = result.currentPage;
  } catch {
    archiveSupported = false;
    const result = await getPaginatedContactMessages({ page, limit: 10, search });
    contacts = result.data;
    totalPages = result.totalPages;
    currentPage = result.currentPage;
  }

  return (
    <div>
      <AdminHeader
        title="Contact Messages"
        description="View and manage messages submitted through the contact form."
      />

      <div className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {archiveSupported ? (
            <div className="flex flex-wrap gap-3">
              {TABS.map((tab) => (
                <Link
                  key={tab.value}
                  href={
                    tab.value === "active"
                      ? "/admin/contacts"
                      : `/admin/contacts?view=${tab.value}`
                  }
                  className={`rounded-full px-4 py-2 text-sm ${
                    view === tab.value
                      ? "bg-brand-600 text-white"
                      : "border border-borderSoft text-text-body hover:bg-brand-50"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted">
              Archiving isn&apos;t set up yet. Run the SQL in{" "}
              <code>docs/SUPABASE-SQL.md</code> (Contact message archiving section) to
              enable it.
            </p>
          )}
        </div>

        <div className="mb-6">
          <SearchInput
            placeholder="Search by name, email, or message..."
            currentValue={search}
            extraParams={view !== "active" ? { view } : {}}
          />
        </div>

        <Card>
          <CardContent>
            {!contacts || contacts.length === 0 ? (
              <TableEmpty
                title="No contact messages found"
                description="Try a different search or view."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-borderSoft">
                      <th className="pb-3 font-medium text-text-muted">Name</th>
                      <th className="pb-3 font-medium text-text-muted">Email</th>
                      <th className="pb-3 font-medium text-text-muted">Phone</th>
                      <th className="pb-3 font-medium text-text-muted">Message</th>
                      <th className="pb-3 font-medium text-text-muted">Date</th>
                      <th className="pb-3 font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-borderSoft align-top">
                        <td className="py-4 text-text-primary">{contact.name}</td>
                        <td className="py-4 text-text-body">{contact.email}</td>
                        <td className="py-4 text-text-body">{contact.phone}</td>
                        <td className="py-4 max-w-xs text-text-body">
                          <p className="line-clamp-3">{contact.message}</p>
                        </td>
                        <td className="py-4 text-text-body">
                          {formatDate(contact.created_at)}
                        </td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={`mailto:${contact.email}?subject=${encodeURIComponent(
                                "Re: Your message to Skynex Consults"
                              )}`}
                              className="rounded-xl border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50"
                            >
                              Reply
                            </a>
                            {archiveSupported ? (
                              <ContactArchiveToggle
                                id={contact.id}
                                archived={Boolean(contact.archived)}
                                canEdit={canEdit}
                              />
                            ) : null}
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

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/admin/contacts"
          extraParams={{
            ...(view !== "active" ? { view } : {}),
            ...(search ? { search } : {}),
          }}
        />
      </div>
    </div>
  );
}
