import { Card, CardContent } from "@/components/ui/card";

export function StatsCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-text-muted">{label}</p>
        <h3 className="mt-2 font-heading text-3xl font-semibold text-text-primary">
          {value}
        </h3>
        {helper ? <p className="mt-2 text-xs text-text-muted">{helper}</p> : null}
      </CardContent>
    </Card>
  );
}