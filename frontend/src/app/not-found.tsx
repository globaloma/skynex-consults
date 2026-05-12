import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">
          404 Error
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-text-primary md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-text-body">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/booking">
            <Button variant="secondary">Book a Consultation</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}