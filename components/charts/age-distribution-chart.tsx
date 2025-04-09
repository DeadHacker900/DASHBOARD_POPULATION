"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AgeDistributionData {
  male: number[]
  female: number[]
  ageGroups: string[]
}

export function AgeDistributionChart({ data }: { data?: AgeDistributionData }) {
  // Default data if none is provided
  const defaultData: AgeDistributionData = {
    male: [15, 14, 12, 10, 8, 6, 4, 3, 2, 1],
    female: [14, 13, 12, 10, 8, 7, 5, 4, 3, 2],
    ageGroups: ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-39", "40-49", "50-59", "60+"],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.ageGroups.map((ageGroup, index) => ({
    ageGroup,
    male: chartData.male[index],
    female: chartData.female[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          male: {
            label: "Male (%)",
            color: "hsl(var(--chart-1))",
          },
          female: {
            label: "Female (%)",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="ageGroup" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, "dataMax + 2"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Bar dataKey="male" name="Male" fill="var(--color-male)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="female" name="Female" fill="var(--color-female)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
