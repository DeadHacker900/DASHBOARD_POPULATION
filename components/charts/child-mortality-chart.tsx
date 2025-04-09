"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChildMortalityData {
  years: string[]
  neonatal: number[]
  infant: number[]
  under5: number[]
}

export function ChildMortalityChart({ data }: { data?: ChildMortalityData }) {
  // Default data if none is provided
  const defaultData: ChildMortalityData = {
    years: ["2000", "2005", "2010", "2015", "2020", "2022"],
    neonatal: [44, 37, 28, 20, 18, 16],
    infant: [107, 86, 59, 32, 29, 26],
    under5: [196, 152, 76, 50, 45, 43],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.years.map((year, index) => ({
    year,
    neonatal: chartData.neonatal[index],
    infant: chartData.infant[index],
    under5: chartData.under5[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          neonatal: {
            label: "Neonatal Mortality (per 1,000)",
            color: "hsl(var(--chart-1))",
          },
          infant: {
            label: "Infant Mortality (per 1,000)",
            color: "hsl(var(--chart-2))",
          },
          under5: {
            label: "Under-5 Mortality (per 1,000)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, "dataMax + 20"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Line
              type="monotone"
              dataKey="neonatal"
              stroke="var(--color-neonatal)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="infant"
              stroke="var(--color-infant)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="under5"
              stroke="var(--color-under5)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center mt-2">
        <div className="bg-slate-800/50 px-3 py-1 rounded-full text-xs text-slate-400">
          <span className="font-medium text-slate-300">Note:</span> Deaths per 1,000 live births
        </div>
      </div>
    </div>
  )
}
