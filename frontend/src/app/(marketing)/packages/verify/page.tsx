"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!reference) return;

    fetch(`/api/paystack/verify?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("Payment Successful ✅");
        } else {
          setStatus("Payment Failed ❌");
        }
      });
  }, [reference]);

  return <div className="p-10 text-center text-xl">{status}</div>;
}