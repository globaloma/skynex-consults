import { Card, CardContent } from "@/components/ui/card";

export function AnalyticsCards({
  bookingsCount,
  contactsCount,
  publishedPosts,
  publishedServices,
}: {
  bookingsCount: number;
  contactsCount: number;
  publishedPosts: number;
  publishedServices: number;
}) {
  const items = [
    { label: "Bookings", value: bookingsCount },
    { label: "Messages", value: contactsCount },
    { label: "Published Posts", value: publishedPosts },
    { label: "Published Services", value: publishedServices },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent>
            <p className="text-sm text-text-muted">{item.label}</p>
            <h3 className="mt-2 font-heading text-3xl font-semibold text-text-primary">
              {item.value}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}