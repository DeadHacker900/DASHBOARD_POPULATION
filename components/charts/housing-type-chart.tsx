"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface HousingTypeData {
  types: string[]
  urban: number[]
  rural: number[]
  national: number[]
}

export function HousingTypeChart({ data }: { data?: HousingTypeData }) {
  // Default data if none is provided
  const defaultData: HousingTypeData = {
    types: ["Modern", "Semi-modern", "Traditional", "Improvised"],
    urban: [42.3, 36.2, 18.5, 3.0],
    rural: [12.5, 25.8, 54.7, 7.0],
    national: [18.5, 28.0, 47.8, 5.7],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.types.map((type, index) => ({
    type,
    urban: chartData.urban[index],
    rural: chartData.rural[index],
    national: chartData.national[index],
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
          national: {
            label: "National (%)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="type" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Bar dataKey="urban" name="Urban" fill="var(--color-urban)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rural" name="Rural" fill="var(--color-rural)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="national" name="National" fill="var(--color-national)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
