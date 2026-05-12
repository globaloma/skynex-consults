"use client";

import { SITE_CONFIG } from "@/lib/constants";

export function SocialShare({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const url = `${SITE_CONFIG.url}/insights/${slug}`;

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-text-primary">Share:</span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50"
      >
        LinkedIn
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-borderSoft px-4 py-2 text-sm text-text-body hover:bg-brand-50"
      >
        X
      </a>
    </div>
  );
}