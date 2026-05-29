import Link from "next/link";
import { COMPANY_INFO, FOOTER_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { LogoDark } from "../shared/logo-dark";

export function Footer() {
  return (
    <footer className="bg-brand-600 text-white">
      <div className="container-max py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <LogoDark />   
            <p className="mt-3 max-w-md text-sm text-white/80">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>{COMPANY_INFO.email}</p>
              <p>{COMPANY_INFO.phone}</p>
              <p>{COMPANY_INFO.address}</p>
            </div>
          </div>

          <div>
            <h5 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h5>
            <div className="mt-4 flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Socials
            </h5>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer">
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/70">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}