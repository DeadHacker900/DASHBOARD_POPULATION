"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MaternalHealthData {
  years: string[]
  maternalMortality: number[]
  skilledBirthAttendance: number[]
  antenatalCare: number[]
}

export function MaternalHealthChart({ data }: { data?: MaternalHealthData }) {
  // Default data if none is provided
  const defaultData: MaternalHealthData = {
    years: ["2000", "2005", "2010", "2015", "2020", "2022"],
    maternalMortality: [1071, 750, 476, 290, 248, 203],
    skilledBirthAttendance: [31, 39, 69, 91, 96, 98],
    antenatalCare: [92, 94, 98, 99, 99, 99],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.years.map((year, index) => ({
    year,
    maternalMortality: chartData.maternalMortality[index],
    skilledBirthAttendance: chartData.skilledBirthAttendance[index],
    antenatalCare: chartData.antenatalCare[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          maternalMortality: {
            label: "Maternal Mortality (per 100,000)",
            color: "hsl(var(--chart-1))",
          },
          skilledBirthAttendance: {
            label: "Skilled Birth Attendance (%)",
            color: "hsl(var(--chart-2))",
          },
          antenatalCare: {
            label: "Antenatal Care (%)",
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
              yAxisId="left"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, 1200]}
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

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="maternalMortality"
              stroke="var(--color-maternalMortality)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="skilledBirthAttendance"
              stroke="var(--color-skilledBirthAttendance)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="antenatalCare"
              stroke="var(--color-antenatalCare)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center mt-2">
        <div className="bg-slate-800/50 px-3 py-1 rounded-full text-xs text-slate-400">
          <span className="font-medium text-slate-300">Note:</span> Maternal mortality per 100,000 live births; other
          indicators in percentages
        </div>
      </div>
    </div>
  )
}
