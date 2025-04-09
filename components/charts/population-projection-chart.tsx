"use client"

import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PopulationProjectionData {
  years: number[]
  lowVariant: number[]
  mediumVariant: number[]
  highVariant: number[]
}

export function PopulationProjectionChart({ data }: { data?: PopulationProjectionData }) {
  // Default data if none is provided
  const defaultData: PopulationProjectionData = {
    years: [2022, 2025, 2030, 2035, 2040, 2045, 2050],
    lowVariant: [13.2, 14.1, 15.5, 16.8, 18.0, 19.1, 20.0],
    mediumVariant: [13.2, 14.3, 16.0, 17.7, 19.4, 21.0, 22.5],
    highVariant: [13.2, 14.5, 16.5, 18.6, 20.8, 23.0, 25.2],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.years.map((year, index) => ({
    year,
    lowVariant: chartData.lowVariant[index],
    mediumVariant: chartData.mediumVariant[index],
    highVariant: chartData.highVariant[index],
  }))

  // Find the index where historical data ends and projections begin
  const projectionStartIndex = 1 // Assuming first data point is historical, rest are projections

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          lowVariant: {
            label: "Low Variant (millions)",
            color: "hsl(var(--chart-1))",
          },
          mediumVariant: {
            label: "Medium Variant (millions)",
            color: "hsl(var(--chart-2))",
          },
          highVariant: {
            label: "High Variant (millions)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="lowVariantGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lowVariant)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-lowVariant)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="mediumVariantGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mediumVariant)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mediumVariant)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="highVariantGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-highVariant)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-highVariant)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={[0, "dataMax + 5"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Area
              type="monotone"
              dataKey="lowVariant"
              stroke="var(--color-lowVariant)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#lowVariantGradient)"
              activeDot={{ r: 6 }}
            />

            <Area
              type="monotone"
              dataKey="mediumVariant"
              stroke="var(--color-mediumVariant)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#mediumVariantGradient)"
              activeDot={{ r: 6 }}
            />

            <Area
              type="monotone"
              dataKey="highVariant"
              stroke="var(--color-highVariant)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#highVariantGradient)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center mt-2">
        <div className="bg-slate-800/50 px-3 py-1 rounded-full text-xs text-slate-400">
          <span className="font-medium text-slate-300">Note:</span> Projections based on UN World Population Prospects
        </div>
      </div>
    </div>
  )
}
