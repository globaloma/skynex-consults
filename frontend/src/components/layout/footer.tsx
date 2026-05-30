import Link from "next/link";
import {
  COMPANY_INFO,
  FOOTER_LINKS,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { LogoDark } from "../shared/logo-dark";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-700 text-white">
      <div className="container-max py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="scale-110">
              <LogoDark />
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-6 space-y-4 text-sm">

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-white/75 hover:text-white transition"
              >
                <Mail className="h-4 w-4" />
                {COMPANY_INFO.email}
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 text-white/75 hover:text-white transition"
              >
                <Phone className="h-4 w-4" />
                {COMPANY_INFO.phone}
              </a>

              <div className="flex items-center gap-3 text-white/75">
                <MapPin className="h-4 w-4" />
                {COMPANY_INFO.address}
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-heading text-xs font-semibold uppercase tracking-widest text-white/60">
              Quick Links
            </h5>

            <div className="mt-6 flex flex-col gap-4">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/75 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h5 className="font-heading text-xs font-semibold uppercase tracking-widest text-white/60">
              Connect
            </h5>

            <div className="mt-6 flex items-center gap-4">

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>

              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Twitter className="h-4 w-4 text-white" />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/60 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <p className="text-white/40">
            Clarity in every decision.
          </p>

        </div>
      </div>
    </footer>
  );
}