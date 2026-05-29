"use client";

import { useSearchParams } from "next/navigation";
import { PACKAGES } from "@/lib/packages";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");

  const [scriptLoaded, setScriptLoaded] = useState(false);

  const selectedPackage = PACKAGES.find((p) => p.id === packageId);

  useEffect(() => {
    if (!scriptLoaded) return;
    if (!selectedPackage) return;

    const paystack = (window as any).PaystackPop;

    if (!paystack) {
      console.error("Paystack failed to load");
      return;
    }

    const handler = paystack.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: "customer@example.com",
      amount: selectedPackage.amount,
      currency: "NGN",
      callback: function (response: any) {
        window.location.href = `/packages/verify?reference=${response.reference}`;
      },
      onClose: function () {
        alert("Transaction cancelled.");
      },
    });

    handler.openIframe();
  }, [scriptLoaded, selectedPackage]);

  if (!selectedPackage) return <p>Invalid package.</p>;

  return (
    <>
      {/*  Load Paystack safely */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      <p>Redirecting to payment...</p>
    </>
  );
}