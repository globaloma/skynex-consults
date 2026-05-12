import { AlertCircle } from "lucide-react";

export function FormError({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}