"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Contacts", href: "/admin/contacts" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Services", href: "/admin/services" },
  { label: "Audit Logs", href: "/admin/audit" },
];

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-borderSoft bg-white p-4 lg:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-borderSoft px-4 py-2 text-sm text-text-body"
      >
        <Menu className="h-4 w-4" />
        Menu
      </button>

      {open ? (
        <div className="mt-4 grid gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-text-body hover:bg-brand-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}