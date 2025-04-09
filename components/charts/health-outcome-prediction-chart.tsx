"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LoadingSpinner } from "@/components/loading-spinner"

interface HealthOutcomePredictionChartProps {
  predictionYear: string
  modelType: string
  healthcareInvestment: number
}

export function HealthOutcomePredictionChart({
  predictionYear,
  modelType,
  healthcareInvestment,
}: HealthOutcomePredictionChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true)

    // Generate historical data (2000-2022)
    const historicalData = [
      { year: 2000, childMortality: 107, maternalMortality: 1071, lifeExpectancy: 48.6, type: "historical" },
      { year: 2005, childMortality: 86, maternalMortality: 567, lifeExpectancy: 55.7, type: "historical" },
      { year: 2010, childMortality: 64, maternalMortality: 476, lifeExpectancy: 61.4, type: "historical" },
      { year: 2015, childMortality: 50, maternalMortality: 290, lifeExpectancy: 65.8, type: "historical" },
      { year: 2020, childMortality: 38, maternalMortality: 248, lifeExpectancy: 68.7, type: "historical" },
      { year: 2022, childMortality: 35, maternalMortality: 230, lifeExpectancy: 69.6, type: "historical" },
    ]

    // Generate prediction data based on model type and healthcare investment
    const predictionData = []
    const endYear = Number.parseInt(predictionYear)
    let lastChildMortality = 35 // 2022 child mortality rate
    let lastMaternalMortality = 230 // 2022 maternal mortality rate
    let lastLifeExpectancy = 69.6 // 2022 life expectancy

    // Different models have slightly different improvement patterns
    const getImprovementFactor = () => {
      const baseFactor = healthcareInvestment / 5.8 // Normalize to current investment level

      switch (modelType) {
        case "linear":
          return baseFactor
        case "arima":
          return baseFactor * 0.95
        case "prophet":
          return baseFactor * 1.02
        case "neural":
          return baseFactor * 1.05
        case "ensemble":
        default:
          return baseFactor * 1.03
      }
    }

    const improvementFactor = getImprovementFactor()

    for (let year = 2023; year <= endYear; year++) {
      // Apply improvements with diminishing returns as metrics improve
      // Child mortality reduction (diminishing returns as it approaches zero)
      const childMortalityReduction = lastChildMortality > 10 ? 1.5 * improvementFactor : 0.8 * improvementFactor

      lastChildMortality = Math.max(lastChildMortality - childMortalityReduction + (Math.random() * 0.6 - 0.3), 5)

      // Maternal mortality reduction (diminishing returns as it approaches developed country levels)
      const maternalMortalityReduction = lastMaternalMortality > 100 ? 10 * improvementFactor : 5 * improvementFactor

      lastMaternalMortality = Math.max(
        lastMaternalMortality - maternalMortalityReduction + (Math.random() * 5 - 2.5),
        50,
      )

      // Life expectancy increase (diminishing returns as it approaches global maximum)
      const lifeExpectancyIncrease = lastLifeExpectancy < 75 ? 0.4 * improvementFactor : 0.2 * improvementFactor

      lastLifeExpectancy = Math.min(lastLifeExpectancy + lifeExpectancyIncrease + (Math.random() * 0.2 - 0.1), 85)

      predictionData.push({
        year,
        childMortality: Number.parseFloat(lastChildMortality.toFixed(1)),
        maternalMortality: Number.parseFloat(lastMaternalMortality.toFixed(0)),
        lifeExpectancy: Number.parseFloat(lastLifeExpectancy.toFixed(1)),
        type: "prediction",
      })
    }

    // Add confidence intervals for ensemble model
    if (modelType === "ensemble") {
      predictionData.forEach((item) => {
        const yearsSince2022 = item.year - 2022

        // Uncertainty increases with time
        const childMortalityUncertainty = yearsSince2022 * 0.5
        item.childMortalityUpper = Number.parseFloat((item.childMortality + childMortalityUncertainty).toFixed(1))
        item.childMortalityLower = Number.parseFloat((item.childMortality - childMortalityUncertainty).toFixed(1))

        const lifeExpectancyUncertainty = yearsSince2022 * 0.2
        item.lifeExpectancyUpper = Number.parseFloat((item.lifeExpectancy + lifeExpectancyUncertainty).toFixed(1))
        item.lifeExpectancyLower = Number.parseFloat((item.lifeExpectancy - lifeExpectancyUncertainty).toFixed(1))
      })
    }

    // Combine historical and prediction data
    setTimeout(() => {
      setData([...historicalData, ...predictionData])
      setIsLoading(false)
    }, 500)
  }, [predictionYear, modelType, healthcareInvestment])

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
        childMortality: {
          label: "Child Mortality (per 1,000)",
          color: "hsl(var(--chart-1))",
        },
        lifeExpectancy: {
          label: "Life Expectancy (years)",
          color: "hsl(var(--chart-2))",
        },
        childMortalityUpper: {
          label: "Child Mortality Upper Bound",
          color: "hsl(var(--chart-1))",
          dashed: true,
        },
        childMortalityLower: {
          label: "Child Mortality Lower Bound",
          color: "hsl(var(--chart-1))",
          dashed: true,
        },
        lifeExpectancyUpper: {
          label: "Life Expectancy Upper Bound",
          color: "hsl(var(--chart-2))",
          dashed: true,
        },
        lifeExpectancyLower: {
          label: "Life Expectancy Lower Bound",
          color: "hsl(var(--chart-2))",
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
            yAxisId="left"
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="childMortality"
            stroke="var(--color-childMortality)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.type === "historical") {
                return <circle cx={cx} cy={cy} r={4} fill="var(--color-childMortality)" />
              }
              return null
            }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="lifeExpectancy"
            stroke="var(--color-lifeExpectancy)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.type === "historical") {
                return <circle cx={cx} cy={cy} r={4} fill="var(--color-lifeExpectancy)" />
              }
              return null
            }}
            activeDot={{ r: 6 }}
          />
          {modelType === "ensemble" && (
            <>
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="childMortalityUpper"
                stroke="var(--color-childMortalityUpper)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="childMortalityLower"
                stroke="var(--color-childMortalityLower)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="lifeExpectancyUpper"
                stroke="var(--color-lifeExpectancyUpper)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="lifeExpectancyLower"
                stroke="var(--color-lifeExpectancyLower)"
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
