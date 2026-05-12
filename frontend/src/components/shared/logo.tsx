import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/skynex-logo.jpeg"
        alt={SITE_CONFIG.name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-md object-contain"
        priority
      />
      <div className="leading-tight">
        <div className="font-heading text-base font-semibold text-text-primary">
          {SITE_CONFIG.name}
        </div>
        <div className="text-xs text-text-muted">{SITE_CONFIG.tagline}</div>
      </div>
    </Link>
  );
}