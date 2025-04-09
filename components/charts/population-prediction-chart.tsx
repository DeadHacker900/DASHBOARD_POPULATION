"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LoadingSpinner } from "@/components/loading-spinner"

interface PopulationPredictionChartProps {
  predictionYear: string
  modelType: string
  growthRate: number
}

export function PopulationPredictionChart({ predictionYear, modelType, growthRate }: PopulationPredictionChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true)

    // Generate historical data (2000-2022)
    const historicalData = [
      { year: 2000, population: 8.1, type: "historical" },
      { year: 2005, population: 9.2, type: "historical" },
      { year: 2010, population: 10.4, type: "historical" },
      { year: 2015, population: 11.9, type: "historical" },
      { year: 2020, population: 13.3, type: "historical" },
      { year: 2022, population: 13.9, type: "historical" },
    ]

    // Generate prediction data based on model type and growth rate
    const predictionData = []
    const endYear = Number.parseInt(predictionYear)
    let lastPopulation = 13.9 // 2022 population

    // Different models have slightly different growth patterns
    const getGrowthFactor = () => {
      switch (modelType) {
        case "linear":
          return growthRate / 100
        case "arima":
          return (growthRate * 1.05) / 100
        case "prophet":
          return (growthRate * 0.98) / 100
        case "neural":
          return (growthRate * 1.02) / 100
        case "ensemble":
        default:
          return (growthRate * 1.01) / 100
      }
    }

    const growthFactor = getGrowthFactor()

    for (let year = 2023; year <= endYear; year++) {
      // Apply compound growth with some randomness
      lastPopulation = lastPopulation * (1 + growthFactor + (Math.random() * 0.005 - 0.0025))

      predictionData.push({
        year,
        population: Number.parseFloat(lastPopulation.toFixed(1)),
        type: "prediction",
      })
    }

    // Add confidence intervals for ensemble model
    if (modelType === "ensemble") {
      predictionData.forEach((item) => {
        item.upperBound = Number.parseFloat((item.population * 1.05).toFixed(1))
        item.lowerBound = Number.parseFloat((item.population * 0.95).toFixed(1))
      })
    }

    // Combine historical and prediction data
    setTimeout(() => {
      setData([...historicalData, ...predictionData])
      setIsLoading(false)
    }, 500)
  }, [predictionYear, modelType, growthRate])

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
        population: {
          label: "Population (millions)",
          color: "hsl(var(--chart-1))",
        },
        upperBound: {
          label: "Upper Bound",
          color: "hsl(var(--chart-2))",
          dashed: true,
        },
        lowerBound: {
          label: "Lower Bound",
          color: "hsl(var(--chart-3))",
          dashed: true,
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
            tickFormatter={(value) => `${value}M`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="population"
            stroke="var(--color-population)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.type === "historical") {
                return <circle cx={cx} cy={cy} r={4} fill="var(--color-population)" />
              }
              return null
            }}
            activeDot={{ r: 6 }}
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
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
