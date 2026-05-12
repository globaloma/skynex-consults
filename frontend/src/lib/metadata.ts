import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

type CreateMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title,
  description,
  path = "",
}: CreateMetadataProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;

  const pageDescription = description || SITE_CONFIG.description;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [SITE_CONFIG.ogImage],
    },
  };
}