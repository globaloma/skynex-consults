import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Settings2,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Settings2,
  },
  {
    label: "Audit Logs",
    href: "/admin/audit",
    icon: BarChart3,
  },
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 border-r border-borderSoft bg-white lg:block">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
            S
          </div>
          <div>
            <div className="font-heading text-base font-semibold text-text-primary">
              Admin Panel
            </div>
            <div className="text-xs text-text-muted">Skynex Consults</div>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-6">
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-body transition hover:bg-brand-50 hover:text-brand-700"
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto px-6 pb-6">
        <div className="rounded-2xl bg-brand-50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <BarChart3 className="h-4 w-4" />
            Content + Leads
          </div>
          <p className="mt-2 text-xs leading-6 text-text-muted">
            Manage inquiries, services, testimonials, insights, and audit visibility from one place.
          </p>
        </div>
      </div>
    </aside>
  );
}