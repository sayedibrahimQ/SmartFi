"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Asset {
  name: string
  value: number
  type: "stock" | "gold"
}

export default function PortfolioPieChart({ assets }: { assets: Asset[] }) {
  const data = assets.map((asset) => ({
    name: asset.name,
    value: asset.value,
  }))

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  return (
    <ChartContainer
      config={{
        ...Object.fromEntries(
          assets.map((asset, index) => [asset.name, { label: asset.name, color: COLORS[index % COLORS.length] }]),
        ),
      }}
      className="h-[400px] w-full"
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            innerRadius="40%"
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

