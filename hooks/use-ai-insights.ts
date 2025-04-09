"use client"

import { useState } from "react"

interface Insight {
  title: string
  content: string
  sources?: string
}

interface Prediction {
  title: string
  description: string
  confidence: number
}

export function useAiInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false)

  // AI predictions
  const [aiPredictions] = useState<Prediction[]>([
    {
      title: "Population Growth Forecast",
      description: "Population growth rate projected to decrease to 2.3% by 2025",
      confidence: 87,
    },
    {
      title: "Health Outcome Prediction",
      description: "Child mortality expected to decrease by 15% in next 5 years",
      confidence: 82,
    },
    {
      title: "Urbanization Trend",
      description: "Urban population expected to reach 22% by 2030",
      confidence: 79,
    },
  ])

  // Generate AI insight
  const generateInsight = async (query: string) => {
    if (!query.trim()) return

    setIsGeneratingInsight(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Generate insight based on query
      let newInsight: Insight

      if (query.toLowerCase().includes("urbanization")) {
        newInsight = {
          title: "Urbanization Analysis",
          content:
            "The data shows a strong correlation between urbanization and improved health outcomes. Urban areas like Kigali show significantly better health indicators compared to rural regions. This is likely due to better access to healthcare facilities, with urban residents living an average of 1.2km from the nearest facility compared to 5.2km in rural areas.",
          sources: "2022 Census, 2019-20 DHS Survey",
        }
      } else if (query.toLowerCase().includes("mortality") || query.toLowerCase().includes("child")) {
        newInsight = {
          title: "Child Mortality Trends",
          content:
            "Child mortality has decreased from 107 per 1,000 in 2000 to 43 per 1,000 in 2022, representing a 60% reduction. This improvement correlates strongly with increased vaccination coverage (now at 95% in urban areas and 82% in rural areas) and better maternal healthcare access.",
          sources: "DHS Surveys 2000-2022, Ministry of Health Reports",
        }
      } else if (query.toLowerCase().includes("fertility")) {
        newInsight = {
          title: "Fertility Rate Analysis",
          content:
            "The total fertility rate has declined from 5.8 in 2000 to 4.0 in 2022. Urban areas show lower fertility rates (3.6) compared to rural areas (4.3). This decline correlates with increased contraceptive use, which has risen from 10% in 2000 to 58% in 2022.",
          sources: "2022 Census, DHS Surveys",
        }
      } else if (query.toLowerCase().includes("housing")) {
        newInsight = {
          title: "Housing Conditions Impact",
          content:
            "Improved housing conditions (now at 62.8% nationally) show a significant correlation with better health outcomes. Households with improved housing show 32% lower incidence of respiratory diseases and 45% lower incidence of waterborne diseases compared to traditional housing.",
          sources: "2022 Housing Census, Health Impact Studies 2020-2022",
        }
      } else {
        newInsight = {
          title: "Demographic & Health Patterns",
          content: `Analysis of "${query}" reveals several key patterns in the data. Rwanda has made significant progress in health indicators over the past two decades, with improvements in life expectancy, child survival, and maternal health. Regional disparities persist, with Kigali showing the best outcomes and Southern Province facing the most challenges.`,
          sources: "2022 Census, 2019-20 DHS Survey, Ministry of Health Reports",
        }
      }

      setInsights([newInsight, ...insights])
      return newInsight
    } catch (error) {
      console.error("Error generating AI insight:", error)
      throw error
    } finally {
      setIsGeneratingInsight(false)
    }
  }

  return {
    insights,
    isGeneratingInsight,
    generateInsight,
    aiPredictions,
  }
}
