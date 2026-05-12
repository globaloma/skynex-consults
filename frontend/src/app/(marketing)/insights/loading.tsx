import { Skeleton } from "@/components/shared/skeleton";

export default function InsightsLoading() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-borderSoft p-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="mt-4 h-8 w-4/5" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <Skeleton className="mt-6 h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}