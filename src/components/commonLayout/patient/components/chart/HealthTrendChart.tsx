// components/commonLayout/patient/components/chart/HealthTrendChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartLine {
  key: string;
  color: string;
  name: string;
}

interface ChartData {
  week: string;
  [key: string]: number | string | null;
}

interface HealthTrendChartProps {
  data: ChartData[];
  lines: ChartLine[];
  title: string;
}

export function HealthTrendChart({
  data,
  lines,
  title,
}: HealthTrendChartProps) {
  // Check if data is valid
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[380px] flex items-center justify-center border rounded-lg">
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[380px] pt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false} 
          />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            domain={[
              0,
              (dataMax: number) =>
                isFinite(dataMax) && !isNaN(dataMax) ? Math.round(dataMax + 10) : 100,
            ]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: '12px',
            }}
          />
          
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 2, stroke: line.color, fill: "white" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              name={line.name}
              connectNulls
            />
          ))}
          
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px',
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div>
          
      </div>
    </div>
  );
}