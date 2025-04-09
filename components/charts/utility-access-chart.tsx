"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface UtilityAccessData {
  utilities: string[]
  urban: number[]
  rural: number[]
}

export function UtilityAccessChart({ data }: { data?: UtilityAccessData }) {
  // Default data if none is provided
  const defaultData: UtilityAccessData = {
    utilities: ["Clean Water", "Electricity", "Improved Sanitation", "Cooking Fuel", "Internet"],
    urban: [92.3, 96.8, 94.5, 72.3, 48.5],
    rural: [72.5, 42.3, 84.2, 12.5, 8.2],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.utilities.map((utility, index) => ({
    utility,
    urban: chartData.urban[index],
    rural: chartData.rural[index],
    gap: chartData.urban[index] - chartData.rural[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          urban: {
            label: "Urban (%)",
            color: "hsl(var(--chart-1))",
          },
          rural: {
            label: "Rural (%)",
            color: "hsl(var(--chart-2))",
          },
          gap: {
            label: "Urban-Rural Gap (%)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="utility" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Bar dataKey="urban" name="Urban" fill="var(--color-urban)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rural" name="Rural" fill="var(--color-rural)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gap" name="Urban-Rural Gap" fill="var(--color-gap)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
