"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface UrbanRuralComparisonData {
  categories: string[]
  urban: number[]
  rural: number[]
  gap: number[]
}

export function UrbanRuralComparisonChart({ data }: { data?: UrbanRuralComparisonData }) {
  // Default data if none is provided
  const defaultData: UrbanRuralComparisonData = {
    categories: ["Housing Quality", "Water Access", "Electricity", "Sanitation", "Cooking Fuel", "Internet"],
    urban: [78.5, 92.3, 96.8, 94.5, 72.3, 48.5],
    rural: [58.2, 72.5, 42.3, 84.2, 12.5, 8.2],
    gap: [20.3, 19.8, 54.5, 10.3, 59.8, 40.3],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.categories.map((category, index) => ({
    category,
    urban: chartData.urban[index],
    rural: chartData.rural[index],
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
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={transformedData}>
            <PolarGrid stroke="rgba(255,255,255,0.2)" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              stroke="rgba(255,255,255,0.2)"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              name="Urban"
              dataKey="urban"
              stroke="var(--color-urban)"
              fill="var(--color-urban)"
              fillOpacity={0.5}
            />
            <Radar
              name="Rural"
              dataKey="rural"
              stroke="var(--color-rural)"
              fill="var(--color-rural)"
              fillOpacity={0.5}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center mt-2">
        <div className="bg-slate-800/50 px-3 py-1 rounded-full text-xs text-slate-400">
          <span className="font-medium text-slate-300">Note:</span> Values represent percentage of households with
          access
        </div>
      </div>
    </div>
  )
}
