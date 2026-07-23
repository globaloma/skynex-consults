import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, FileText, Mail, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import type { Trend } from "@/lib/cms/dashboard";

export function AnalyticsCards({
  bookingsCount,
  contactsCount,
  publishedPosts,
  publishedServices,
  bookingsTrend,
  contactsTrend,
}: {
  bookingsCount: number;
  contactsCount: number;
  publishedPosts: number;
  publishedServices: number;
  bookingsTrend: Trend;
  contactsTrend: Trend;
}) {
  const items = [
    {
      label: "Bookings",
      value: bookingsCount,
      icon: CalendarDays,
      trend: bookingsTrend,
      helper: "vs. previous 7 days",
    },
    {
      label: "Messages",
      value: contactsCount,
      icon: Mail,
      trend: contactsTrend,
      helper: "vs. previous 7 days",
    },
    {
      label: "Published Posts",
      value: publishedPosts,
      icon: FileText,
    },
    {
      label: "Published Services",
      value: publishedServices,
      icon: Sparkles,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent>
            <div className="flex items-start justify-between">
              <p className="text-sm text-text-muted">{item.label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <item.icon className="h-4 w-4" />
              </span>
            </div>

            <h3 className="mt-3 font-heading text-3xl font-semibold text-text-primary">
              {item.value}
            </h3>

            {item.trend ? (
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    item.trend.direction === "up" && "bg-brand-50 text-brand-700",
                    item.trend.direction === "down" && "bg-red-50 text-red-600",
                    item.trend.direction === "flat" && "bg-gray-100 text-gray-600"
                  )}
                >
                  {item.trend.direction === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : item.trend.direction === "down" ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  {item.trend.direction === "flat" ? "No change" : `${item.trend.percent}%`}
                </span>
                <span className="text-xs text-text-muted">{item.helper}</span>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
