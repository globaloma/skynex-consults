import { CheckCircle2 } from "lucide-react";

export function FormSuccess({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-600" />
        <div>
          <h4 className="font-medium text-brand-700">{title}</h4>
          <p className="mt-1 text-sm text-text-body">{description}</p>
        </div>
      </div>
    </div>
  );
}