"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import { isActiveLink } from "@/components/admin/admin-sidebar";

const links = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Sparkles },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Site Settings", href: "/admin/settings", icon: Settings2 },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Audit Logs", href: "/admin/audit", icon: ScrollText },
];

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between border-b border-borderSoft bg-white px-4 py-3 lg:hidden">
      <Link href="/admin" className="flex items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-brand-600">
          <Image src="/skynex-logo.jpeg" alt="Skynex Consults" fill className="object-cover" />
        </div>
        <span className="font-heading text-sm font-semibold text-text-primary">
          Admin Panel
        </span>
      </Link>

      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex items-center gap-2 rounded-xl border border-borderSoft px-3 py-2 text-sm text-text-body"
      >
        <Menu className="h-4 w-4" />
        Menu
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[80vw] max-w-xs flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-borderSoft p-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-brand-600">
                    <Image
                      src="/skynex-logo.jpeg"
                      alt="Skynex Consults"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-semibold text-text-primary">
                      Admin Panel
                    </div>
                    <div className="text-xs text-text-muted">Skynex Consults</div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-text-muted hover:bg-brand-50 hover:text-brand-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {links.map((link, index) => {
                    const Icon = link.icon;
                    const active = isActiveLink(pathname, link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * index, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                            active
                              ? "bg-brand-600 text-white"
                              : "text-text-body hover:bg-brand-50 hover:text-brand-700"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
