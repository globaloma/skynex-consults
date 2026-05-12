import { COMPANY_INFO, SITE_CONFIG } from "@/lib/constants";
import { getPublishedServices } from "@/lib/cms/services";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address,
      addressCountry: "NG",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    url: SITE_CONFIG.url,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address,
      addressCountry: "NG",
    },
    openingHours: "Mo-Fr 09:00-17:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function ServicesSchema() {
  const services = await getPublishedServices();
  const items = services.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.title,
    description: service.short_description,
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  slug,
}: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/insights/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}