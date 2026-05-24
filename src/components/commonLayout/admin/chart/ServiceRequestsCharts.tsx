// =============================================
// ServiceRequestsChart.tsx
// =============================================
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RequestsData {
  name: string;
  value: number;
}

interface ServiceRequestsChartProps {
  data: RequestsData[];
}

export default function ServiceRequestsChart({ data }: ServiceRequestsChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -5, bottom: 10 }}
          barGap={6}
          barCategoryGap="22%"
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={35}
          />
          <Tooltip
            cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(value: any) =>
              value !== undefined ? [value, "Requests"] : [0, "Requests"]
            }
          />

          <Bar
            dataKey="value"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            maxBarSize={55}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}