import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/shared/schema";
import { SiteScripts } from "@/components/shared/site-script";
import { AnalyticsListener } from "@/components/shared/analytics-listener";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <SiteScripts gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      <AnalyticsListener />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}