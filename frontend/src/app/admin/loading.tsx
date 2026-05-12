import { Skeleton } from "@/components/shared/skeleton";

export default function AdminLoading() {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-64" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="mt-8 h-[400px] w-full" />
    </div>
  );
}