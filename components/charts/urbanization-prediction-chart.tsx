"use client"

import { useState, useEffect } from "react"
import { Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LoadingSpinner } from "@/components/loading-spinner"

interface UrbanizationPredictionChartProps {
  predictionYear: string
  modelType: string
  urbanizationRate: number
}

export function UrbanizationPredictionChart({
  predictionYear,
  modelType,
  urbanizationRate,
}: UrbanizationPredictionChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true)

    // Generate historical data (2000-2022)
    const historicalData = [
      { year: 2000, urban: 13.8, rural: 86.2, type: "historical" },
      { year: 2005, urban: 16.9, rural: 83.1, type: "historical" },
      { year: 2010, urban: 19.1, rural: 80.9, type: "historical" },
      { year: 2015, urban: 21.8, rural: 78.2, type: "historical" },
      { year: 2020, urban: 24.6, rural: 75.4, type: "historical" },
      { year: 2022, urban: 25.7, rural: 74.3, type: "historical" },
    ]

    // Generate prediction data based on model type and urbanization rate
    const predictionData = []
    const endYear = Number.parseInt(predictionYear)
    let lastUrban = 25.7 // 2022 urban percentage

    // Different models have slightly different growth patterns
    const getGrowthFactor = () => {
      switch (modelType) {
        case "linear":
          return urbanizationRate / 100
        case "arima":
          return (urbanizationRate * 1.03) / 100
        case "prophet":
          return (urbanizationRate * 0.97) / 100
        case "neural":
          return (urbanizationRate * 1.01) / 100
        case "ensemble":
        default:
          return (urbanizationRate * 1.0) / 100
      }
    }

    const growthFactor = getGrowthFactor()

    for (let year = 2023; year <= endYear; year++) {
      // Apply growth with diminishing returns as urbanization increases
      const diminishingFactor = 1 - (lastUrban / 100) * 0.5
      lastUrban = lastUrban + growthFactor * diminishingFactor + (Math.random() * 0.3 - 0.15)
      lastUrban = Math.min(lastUrban, 100) // Cap at 100%

      predictionData.push({
        year,
        urban: Number.parseFloat(lastUrban.toFixed(1)),
        rural: Number.parseFloat((100 - lastUrban).toFixed(1)),
        type: "prediction",
      })
    }

    // Add confidence intervals for ensemble model
    if (modelType === "ensemble") {
      predictionData.forEach((item) => {
        const uncertainty = (item.year - 2022) * 0.2 // Uncertainty increases with time
        item.upperBound = Math.min(Number.parseFloat((item.urban + uncertainty).toFixed(1)), 100)
        item.lowerBound = Number.parseFloat((item.urban - uncertainty).toFixed(1))
      })
    }

    // Combine historical and prediction data
    setTimeout(() => {
      setData([...historicalData, ...predictionData])
      setIsLoading(false)
    }, 500)
  }, [predictionYear, modelType, urbanizationRate])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        urban: {
          label: "Urban Population (%)",
          color: "hsl(var(--chart-1))",
        },
        rural: {
          label: "Rural Population (%)",
          color: "hsl(var(--chart-2))",
        },
        upperBound: {
          label: "Upper Bound",
          color: "hsl(var(--chart-3))",
          dashed: true,
        },
        lowerBound: {
          label: "Lower Bound",
          color: "hsl(var(--chart-4))",
          dashed: true,
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="urban"
            stackId="1"
            stroke="var(--color-urban)"
            fill="var(--color-urban)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="rural"
            stackId="1"
            stroke="var(--color-rural)"
            fill="var(--color-rural)"
            fillOpacity={0.6}
          />
          {modelType === "ensemble" && (
            <>
              <Line
                type="monotone"
                dataKey="upperBound"
                stroke="var(--color-upperBound)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lowerBound"
                stroke="var(--color-lowerBound)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
