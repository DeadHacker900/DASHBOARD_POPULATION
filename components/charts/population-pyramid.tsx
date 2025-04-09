"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface PopulationPyramidData {
  ageGroups: string[]
  male: number[]
  female: number[]
}

export function PopulationPyramid({ data }: { data?: PopulationPyramidData }) {
  // Default data if none is provided
  const defaultData: PopulationPyramidData = {
    ageGroups: [
      "0-4",
      "5-9",
      "10-14",
      "15-19",
      "20-24",
      "25-29",
      "30-34",
      "35-39",
      "40-44",
      "45-49",
      "50-54",
      "55-59",
      "60-64",
      "65-69",
      "70-74",
      "75-79",
      "80+",
    ],
    male: [8.2, 7.8, 7.3, 6.5, 5.7, 4.9, 4.2, 3.5, 2.8, 2.3, 1.9, 1.5, 1.2, 0.9, 0.6, 0.4, 0.3],
    female: [8.0, 7.6, 7.2, 6.4, 5.8, 5.1, 4.4, 3.7, 3.0, 2.5, 2.1, 1.7, 1.4, 1.1, 0.8, 0.5, 0.4],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.ageGroups.map((ageGroup, index) => ({
    ageGroup,
    male: -chartData.male[index], // Negative values for left side of pyramid
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
          <BarChart data={transformedData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              type="number"
              domain={[-10, 10]}
              tickFormatter={(value) => `${Math.abs(value)}%`}
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
            />
            <YAxis
              dataKey="ageGroup"
              type="category"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
            />
            <Tooltip
              formatter={(value) => [`${Math.abs(Number(value))}%`, value < 0 ? "Male" : "Female"]}
              labelFormatter={(label) => `Age Group: ${label}`}
              contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569" }}
              itemStyle={{ color: "#f1f5f9" }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Legend />
            <ReferenceLine x={0} stroke="rgba(255,255,255,0.5)" />
            <Bar dataKey="male" name="Male" fill="var(--color-male)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="female" name="Female" fill="var(--color-female)" radius={[4, 0, 0, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
