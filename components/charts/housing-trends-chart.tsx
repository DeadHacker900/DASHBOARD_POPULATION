"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface HousingTrendsData {
  years: string[]
  improvedHousing: number[]
  waterAccess: number[]
  electricityAccess: number[]
  improvedSanitation: number[]
}

export function HousingTrendsChart({ data }: { data?: HousingTrendsData }) {
  // Default data if none is provided
  const defaultData: HousingTrendsData = {
    years: ["2002", "2012", "2022"],
    improvedHousing: [32.5, 54.5, 62.8],
    waterAccess: [52.3, 68.2, 76.4],
    electricityAccess: [28.5, 42.3, 52.8],
    improvedSanitation: [64.5, 78.2, 86.2],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.years.map((year, index) => ({
    year,
    improvedHousing: chartData.improvedHousing[index],
    waterAccess: chartData.waterAccess[index],
    electricityAccess: chartData.electricityAccess[index],
    improvedSanitation: chartData.improvedSanitation[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          improvedHousing: {
            label: "Improved Housing (%)",
            color: "hsl(var(--chart-1))",
          },
          waterAccess: {
            label: "Clean Water Access (%)",
            color: "hsl(var(--chart-2))",
          },
          electricityAccess: {
            label: "Electricity Access (%)",
            color: "hsl(var(--chart-3))",
          },
          improvedSanitation: {
            label: "Improved Sanitation (%)",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Line
              type="monotone"
              dataKey="improvedHousing"
              stroke="var(--color-improvedHousing)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="waterAccess"
              stroke="var(--color-waterAccess)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="electricityAccess"
              stroke="var(--color-electricityAccess)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="improvedSanitation"
              stroke="var(--color-improvedSanitation)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
