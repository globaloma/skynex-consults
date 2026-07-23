import Link from "next/link";
import { CalendarDays, FileText, MessageSquareQuote, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ACTIONS = [
  { label: "New Blog Post", href: "/admin/blog/new", icon: FileText },
  { label: "New Package", href: "/admin/packages/new", icon: Package },
  { label: "New Testimonial", href: "/admin/testimonials/new", icon: MessageSquareQuote },
  { label: "Review Bookings", href: "/admin/bookings", icon: CalendarDays },
];

export function QuickActions() {
  return (
    <Card>
      <CardContent>
        <p className="text-sm font-medium text-text-primary">Quick actions</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-borderSoft px-4 py-3 text-sm font-medium text-text-body transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <action.icon className="h-4 w-4" />
              </span>
              {action.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
