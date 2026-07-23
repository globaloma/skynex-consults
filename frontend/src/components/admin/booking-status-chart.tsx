"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: { status: string; count: number }[];
};

const COLORS: Record<string, string> = {
  new: "#40916C",
  confirmed: "#2D6A4F",
  completed: "#1A3C2E",
  cancelled: "#C9A84C",
};

const FALLBACK_COLOR = "#74C69D";

export function BookingStatusChart({ data }: Props) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardContent>
        <p className="text-sm font-medium text-text-primary">Booking status breakdown</p>
        <p className="mt-1 text-xs text-text-muted">All-time distribution by status.</p>

        {total === 0 ? (
          <div className="mt-6 flex h-64 items-center justify-center text-sm text-text-muted">
            No bookings yet.
          </div>
        ) : (
          <>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {data.map((entry) => (
                      <Cell
                        key={entry.status}
                        fill={COLORS[entry.status] ?? FALLBACK_COLOR}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #EEEEEE",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {data.map((entry) => (
                <div key={entry.status} className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[entry.status] ?? FALLBACK_COLOR }}
                  />
                  <span className="capitalize text-text-body">{entry.status}</span>
                  <span className="ml-auto text-text-muted">{entry.count}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
