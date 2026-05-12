"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="max-w-xl text-center">
        <h1 className="font-heading text-3xl font-semibold text-text-primary">
          Admin page failed to load
        </h1>
        <p className="mt-4 text-text-body">
          Please try again or refresh the page.
        </p>
        <div className="mt-6">
          <Button onClick={() => reset()}>Try Again</Button>
        </div>
      </div>
    </main>
  );
}