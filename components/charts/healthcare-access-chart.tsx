"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface HealthcareAccessData {
  regions: string[]
  distances: number[]
  facilities: number[]
  satisfaction: number[]
}

export function HealthcareAccessChart({ data }: { data?: HealthcareAccessData }) {
  // Default data if none is provided
  const defaultData: HealthcareAccessData = {
    regions: ["Kigali", "Eastern", "Southern", "Western", "Northern"],
    distances: [1.2, 4.8, 5.2, 6.1, 3.9],
    facilities: [8.2, 3.1, 2.8, 2.5, 3.6],
    satisfaction: [78, 62, 58, 55, 65],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.regions.map((region, index) => ({
    region,
    distance: chartData.distances[index],
    facilities: chartData.facilities[index],
    satisfaction: chartData.satisfaction[index],
  }))

  // Colors for the bars
  const colors = {
    distance: "var(--color-distance)",
    facilities: "var(--color-facilities)",
    satisfaction: "var(--color-satisfaction)",
  }

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          distance: {
            label: "Avg. Distance to Facility (km)",
            color: "hsl(var(--chart-1))",
          },
          facilities: {
            label: "Facilities per 100,000 people",
            color: "hsl(var(--chart-2))",
          },
          satisfaction: {
            label: "Patient Satisfaction (%)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="region" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, 10]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Bar
              yAxisId="left"
              dataKey="distance"
              name="Distance to Facility (km)"
              fill={colors.distance}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="facilities"
              name="Facilities per 100,000"
              fill={colors.facilities}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="satisfaction"
              name="Satisfaction (%)"
              fill={colors.satisfaction}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
