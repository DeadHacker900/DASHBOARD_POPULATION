"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LoadingSpinner } from "@/components/loading-spinner"

interface HousingTrendPredictionChartProps {
  predictionYear: string
  modelType: string
  housingInvestment: number
}

export function HousingTrendPredictionChart({
  predictionYear,
  modelType,
  housingInvestment,
}: HousingTrendPredictionChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true)

    // Generate historical data (2000-2022)
    const historicalData = [
      {
        year: 2000,
        improvedHousing: 28.4,
        electricityAccess: 39.5,
        waterAccess: 61.2,
        type: "historical",
      },
      {
        year: 2005,
        improvedHousing: 35.6,
        electricityAccess: 47.3,
        waterAccess: 67.8,
        type: "historical",
      },
      {
        year: 2010,
        improvedHousing: 46.2,
        electricityAccess: 59.7,
        waterAccess: 74.5,
        type: "historical",
      },
      {
        year: 2015,
        improvedHousing: 58.9,
        electricityAccess: 70.2,
        waterAccess: 82.3,
        type: "historical",
      },
      {
        year: 2020,
        improvedHousing: 68.7,
        electricityAccess: 79.8,
        waterAccess: 87.6,
        type: "historical",
      },
      {
        year: 2022,
        improvedHousing: 72.4,
        electricityAccess: 83.5,
        waterAccess: 89.2,
        type: "historical",
      },
    ]

    // Generate prediction data based on model type and housing investment
    const predictionData = []
    const endYear = Number.parseInt(predictionYear)
    let lastImprovedHousing = 72.4 // 2022 improved housing percentage
    let lastElectricityAccess = 83.5 // 2022 electricity access percentage
    let lastWaterAccess = 89.2 // 2022 water access percentage

    // Different models have slightly different improvement patterns
    const getImprovementFactor = () => {
      const baseFactor = housingInvestment / 4.2 // Normalize to current investment level

      switch (modelType) {
        case "linear":
          return baseFactor
        case "arima":
          return baseFactor * 0.97
        case "prophet":
          return baseFactor * 1.03
        case "neural":
          return baseFactor * 1.02
        case "ensemble":
        default:
          return baseFactor * 1.01
      }
    }

    const improvementFactor = getImprovementFactor()

    for (let year = 2023; year <= endYear; year++) {
      // Apply improvements with diminishing returns as metrics approach 100%
      // Improved housing increase
      const improvedHousingIncrease = (100 - lastImprovedHousing) * 0.05 * improvementFactor
      lastImprovedHousing = Math.min(lastImprovedHousing + improvedHousingIncrease + (Math.random() * 0.6 - 0.3), 100)

      // Electricity access increase
      const electricityAccessIncrease = (100 - lastElectricityAccess) * 0.07 * improvementFactor
      lastElectricityAccess = Math.min(
        lastElectricityAccess + electricityAccessIncrease + (Math.random() * 0.5 - 0.25),
        100,
      )

      // Water access increase
      const waterAccessIncrease = (100 - lastWaterAccess) * 0.04 * improvementFactor
      lastWaterAccess = Math.min(lastWaterAccess + waterAccessIncrease + (Math.random() * 0.4 - 0.2), 100)

      predictionData.push({
        year,
        improvedHousing: Number.parseFloat(lastImprovedHousing.toFixed(1)),
        electricityAccess: Number.parseFloat(lastElectricityAccess.toFixed(1)),
        waterAccess: Number.parseFloat(lastWaterAccess.toFixed(1)),
        type: "prediction",
      })
    }

    // Add confidence intervals for ensemble model
    if (modelType === "ensemble") {
      predictionData.forEach((item) => {
        const yearsSince2022 = item.year - 2022

        // Uncertainty increases with time
        const uncertainty = yearsSince2022 * 0.3

        item.improvedHousingUpper = Math.min(Number.parseFloat((item.improvedHousing + uncertainty).toFixed(1)), 100)
        item.improvedHousingLower = Number.parseFloat((item.improvedHousing - uncertainty).toFixed(1))

        item.electricityAccessUpper = Math.min(
          Number.parseFloat((item.electricityAccess + uncertainty).toFixed(1)),
          100,
        )
        item.electricityAccessLower = Number.parseFloat((item.electricityAccess - uncertainty).toFixed(1))

        item.waterAccessUpper = Math.min(Number.parseFloat((item.waterAccess + uncertainty).toFixed(1)), 100)
        item.waterAccessLower = Number.parseFloat((item.waterAccess - uncertainty).toFixed(1))
      })
    }

    // Combine historical and prediction data
    setTimeout(() => {
      setData([...historicalData, ...predictionData])
      setIsLoading(false)
    }, 500)
  }, [predictionYear, modelType, housingInvestment])

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
        improvedHousing: {
          label: "Improved Housing (%)",
          color: "hsl(var(--chart-1))",
        },
        electricityAccess: {
          label: "Electricity Access (%)",
          color: "hsl(var(--chart-2))",
        },
        waterAccess: {
          label: "Water Access (%)",
          color: "hsl(var(--chart-3))",
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
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="improvedHousing"
            stroke="var(--color-improvedHousing)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.type === "historical") {
                return <circle cx={cx} cy={cy} r={4} fill="var(--color-improvedHousing)" />
              }
              return null
            }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="electricityAccess"
            stroke="var(--color-electricityAccess)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.type === "historical") {
                return <circle cx={cx} cy={cy} r={4} fill="var(--color-electricityAccess)" />
              }
              return null
            }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="waterAccess"
            stroke="var(--color-waterAccess)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.type === "historical") {
                return <circle cx={cx} cy={cy} r={4} fill="var(--color-waterAccess)" />
              }
              return null
            }}
            activeDot={{ r: 6 }}
          />
          {modelType === "ensemble" && (
            <>
              <Line
                type="monotone"
                dataKey="improvedHousingUpper"
                stroke="var(--color-improvedHousing)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="improvedHousingLower"
                stroke="var(--color-improvedHousing)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="electricityAccessUpper"
                stroke="var(--color-electricityAccess)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="electricityAccessLower"
                stroke="var(--color-electricityAccess)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="waterAccessUpper"
                stroke="var(--color-waterAccess)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="waterAccessLower"
                stroke="var(--color-waterAccess)"
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
