import Link from "next/link";
import { COMPANY_INFO, CTA_LABELS, FOOTER_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-brand-600 text-white">
      <div className="container-max py-14">
        <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-white">
              Ready to grow your business with clarity?
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Book a consultation with Skynex Consults and take the next
              strategic step with confidence.
            </p>
          </div>
          <Link href="/booking">
            <Button className="bg-white text-brand-700 hover:bg-brand-50">
              {CTA_LABELS.primary}
            </Button>
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h4 className="font-heading text-xl font-semibold">
              {SITE_CONFIG.name}
            </h4>
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