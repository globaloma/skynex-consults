"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, CTA_LABELS } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borderSoft bg-white/95 backdrop-blur">
      <div className="container-max flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-body transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/booking">
            <Button>{CTA_LABELS.primary}</Button>
          </Link>
        </div>

        <button
          className="inline-flex md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <X className="h-6 w-6 text-brand-600" />
          ) : (
            <Menu className="h-6 w-6 text-brand-600" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-borderSoft bg-white md:hidden">
          <div className="container-max flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-text-body"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setOpen(false)}>
              <Button className="w-full">{CTA_LABELS.primary}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}