"use client";

import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

interface ChartData {
  name: string;
  value: number;
}

interface ChartProps {
  data: ChartData[];
}

export function BarChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatCurrency}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className='p-2'>
                  <div className='grid grid-cols-2 gap-2'>
                    <span className='font-medium'>
                      {payload[0].payload.name}
                    </span>
                    <span className='font-medium'>
                      {formatCurrency(payload[0].value as number)}
                    </span>
                  </div>
                </Card>
              );
            }
            return null;
          }}
        />
        <Bar dataKey='value' fill='hsl(var(--primary))' radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
