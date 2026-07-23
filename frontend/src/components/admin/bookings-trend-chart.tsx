"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: { date: string; count: number }[];
};

export function BookingsTrendChart({ data }: Props) {
  const chartData = data.map((point) => ({
    ...point,
    label: new Date(point.date).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <Card>
      <CardContent>
        <p className="text-sm font-medium text-text-primary">Bookings, last 14 days</p>
        <p className="mt-1 text-xs text-text-muted">
          New consultation requests received per day.
        </p>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A3C2E" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1A3C2E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#555555" }}
                axisLine={false}
                tickLine={false}
                interval={1}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "#555555" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #EEEEEE",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#0D0D0D", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Bookings"
                stroke="#1A3C2E"
                strokeWidth={2}
                fill="url(#bookingsFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
