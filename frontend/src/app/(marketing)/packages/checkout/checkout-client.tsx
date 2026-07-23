"use client";

import { useState } from "react";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  packageId: string;
  packageName: string;
  amount: number;
  priceLabel: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

export function CheckoutClient({ packageId, packageName, amount, priceLabel }: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const startPayment = () => {
    if (!scriptLoaded) return;
    const paystack = window.PaystackPop;

    if (!paystack) {
      alert("Payment provider failed to load. Please refresh and try again.");
      return;
    }

    setSubmitting(true);

    const handler = paystack.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount,
      currency: "NGN",
      metadata: {
        package_id: packageId,
        package_name: packageName,
        customer_name: name,
      },
      callback: function (response: { reference: string }) {
        window.location.href = `/packages/verify?reference=${response.reference}`;
      },
      onClose: function () {
        setSubmitting(false);
      },
    });

    handler.openIframe();
  };

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-max flex justify-center">
          <Card className="w-full max-w-md">
            <CardContent>
              <h1 className="font-heading text-2xl font-semibold text-gray-900">
                {packageName}
              </h1>
              <p className="mt-1 text-2xl font-bold text-brand-700">{priceLabel}</p>
              <p className="mt-4 text-sm text-gray-600">
                Enter your details to continue to secure payment.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  startPayment();
                }}
                className="mt-6 grid gap-4"
              >
                <Input
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  disabled={!scriptLoaded || submitting}
                  className="w-full"
                >
                  {submitting ? "Opening payment..." : "Proceed to Payment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
