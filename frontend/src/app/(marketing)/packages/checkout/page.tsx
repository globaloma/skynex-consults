import { PACKAGES } from "@/lib/packages";
import { getPublishedPackageById } from "@/lib/cms/packages";
import { CheckoutClient } from "./checkout-client";

type Props = {
  searchParams: Promise<{ package?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const packageId = params.package;

  if (!packageId) return <p className="p-10 text-center">Invalid package.</p>;

  const dbPackage = await getPublishedPackageById(packageId);

  if (dbPackage) {
    return (
      <CheckoutClient
        packageId={dbPackage.id}
        packageName={dbPackage.name}
        amount={dbPackage.amount}
        priceLabel={dbPackage.price_label}
      />
    );
  }

  const staticPackage = PACKAGES.find((pkg) => pkg.id === packageId);

  if (!staticPackage) {
    return <p className="p-10 text-center">Invalid package.</p>;
  }

  return (
    <CheckoutClient
      packageId={staticPackage.id}
      packageName={staticPackage.name}
      amount={staticPackage.amount}
      priceLabel={staticPackage.price}
    />
  );
}
