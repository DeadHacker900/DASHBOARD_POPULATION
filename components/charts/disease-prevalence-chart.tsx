"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DiseasePrevalenceData {
  diseases: string[]
  prevalence: number[]
  mortality: number[]
  trend: number[]
}

export function DiseasePrevalenceChart({ data }: { data?: DiseasePrevalenceData }) {
  // Default data if none is provided
  const defaultData: DiseasePrevalenceData = {
    diseases: ["Malaria", "HIV/AIDS", "Tuberculosis", "Respiratory Infections", "Diarrheal Diseases"],
    prevalence: [7.5, 3.0, 0.6, 12.3, 8.7],
    mortality: [2.1, 1.8, 0.4, 3.2, 2.5],
    trend: [-0.8, -0.2, -0.1, -0.3, -0.5],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.diseases.map((disease, index) => ({
    disease,
    prevalence: chartData.prevalence[index],
    mortality: chartData.mortality[index],
    trend: chartData.trend[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          prevalence: {
            label: "Prevalence (%)",
            color: "hsl(var(--chart-1))",
          },
          mortality: {
            label: "Mortality Rate (%)",
            color: "hsl(var(--chart-2))",
          },
          trend: {
            label: "Trend",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="disease" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Bar dataKey="prevalence" name="Prevalence" fill="var(--color-prevalence)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="mortality" name="Mortality" fill="var(--color-mortality)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
