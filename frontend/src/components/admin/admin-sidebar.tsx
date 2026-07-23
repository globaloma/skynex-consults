"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Package,
  ScrollText,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Overview",
    links: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Leads",
    links: [
      { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
      { label: "Contacts", href: "/admin/contacts", icon: Mail },
    ],
  },
  {
    label: "Content",
    links: [
      { label: "Blog", href: "/admin/blog", icon: FileText },
      { label: "Services", href: "/admin/services", icon: Sparkles },
      { label: "Packages", href: "/admin/packages", icon: Package },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    label: "System",
    links: [
      { label: "Site Settings", href: "/admin/settings", icon: Settings2 },
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Audit Logs", href: "/admin/audit", icon: ScrollText },
    ],
  },
];

export function isActiveLink(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-borderSoft bg-white lg:flex lg:flex-col">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-brand-600">
            <Image
              src="/skynex-logo.jpeg"
              alt="Skynex Consults"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-heading text-base font-semibold text-text-primary">
              Admin Panel
            </div>
            <div className="text-xs text-text-muted">Skynex Consults</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-4 text-[11px] font-semibold uppercase tracking-widest text-text-muted/70">
                {group.label}
              </p>
              <div className="mt-2 space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const active = isActiveLink(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-brand-600 text-white shadow-soft"
                          : "text-text-body hover:bg-brand-50 hover:text-brand-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="p-6 pt-0">
        <div className="rounded-2xl bg-brand-50 p-4">
          <div className="text-sm font-medium text-brand-700">Content + Leads</div>
          <p className="mt-2 text-xs leading-6 text-text-muted">
            Manage inquiries, packages, services, testimonials, insights, and site
            settings from one place.
          </p>
        </div>
      </div>
    </aside>
  );
}
