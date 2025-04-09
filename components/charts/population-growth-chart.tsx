"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PopulationGrowthData {
  years: string[]
  population: number[]
  growthRate: number[]
}

export function PopulationGrowthChart({ data }: { data?: PopulationGrowthData }) {
  // Default data if none is provided
  const defaultData: PopulationGrowthData = {
    years: ["1978", "1991", "2002", "2012", "2022"],
    population: [4.8, 7.1, 8.1, 10.5, 13.2],
    growthRate: [3.7, 3.1, 2.6, 2.9, 2.8],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.years.map((year, index) => ({
    year,
    population: chartData.population[index],
    growthRate: chartData.growthRate[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          population: {
            label: "Population (millions)",
            color: "hsl(var(--chart-1))",
          },
          growthRate: {
            label: "Growth Rate (%)",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, "dataMax + 2"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, 5]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="population"
              stroke="var(--color-population)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="growthRate"
              stroke="var(--color-growthRate)"
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
