"use client"

import { useState, useCallback } from "react"

export type InsightType = "demographic" | "health" | "housing" | "education" | "economic" | "prediction"

export interface Insight {
  id: string
  title: string
  content: string
  highlights: string[]
  sources: string[]
  tags: string[]
  confidence: number
  timestamp: string
  model: string
  visualizationSuggestions?: {
    type: "bar" | "line" | "pie" | "map" | "scatter"
    title: string
    description: string
  }[]
}

// Sample insights data
const sampleInsights: Insight[] = [
  {
    id: "1",
    title: "Population Growth and Urbanization Trends",
    content:
      "Analysis of the 2022 census data reveals a strong correlation between urbanization rates and improved health outcomes. Districts with higher urbanization rates show significantly lower child mortality rates (r = -0.78) and higher vaccination coverage (r = 0.82). This suggests that urban areas benefit from better access to healthcare facilities and services. The population growth rate has stabilized at 2.8%, down from 3.1% in 2002, indicating a demographic transition. This transition correlates with improved education levels and increased contraceptive use (from 10% in 2000 to 58% in 2022).",
    highlights: [
      "Strong correlation (r = -0.78) between urbanization and reduced child mortality",
      "Population growth rate has stabilized at 2.8%, down from 3.1% in 2002",
      "Contraceptive use increased from 10% in 2000 to 58% in 2022",
      "Urban areas show higher population density (2,124 people/km² in Kigali vs. national average of 525 people/km²)",
    ],
    sources: [
      "2022 Rwanda Population and Housing Census",
      "Rwanda Demographic and Health Survey (DHS) 2020",
      "National Institute of Statistics of Rwanda (NISR) Annual Report",
    ],
    tags: ["Population", "Urbanization", "Health", "Demographics"],
    confidence: 92,
    timestamp: "2023-11-15T14:32:00Z",
    model: "GPT-4o + Statistical Analysis",
    visualizationSuggestions: [
      {
        type: "line",
        title: "Population Growth Rate (2000-2022)",
        description: "Visualization of the declining population growth rate over time",
      },
      {
        type: "scatter",
        title: "Urbanization vs. Child Mortality",
        description: "Scatter plot showing the negative correlation between urbanization rates and child mortality",
      },
    ],
  },
  {
    id: "2",
    title: "Maternal Health Improvements",
    content:
      "Maternal mortality has decreased by 78% since 2000, from 1,071 to 248 deaths per 100,000 live births. This improvement correlates strongly with increased skilled birth attendance (from 31% to 91%) and antenatal care coverage (from 92% to 99%). The Eastern Province has shown the most significant improvement, reducing maternal mortality by 82% during this period. Analysis of healthcare facility distribution shows that 85% of the population now lives within 5km of a health facility, compared to 62% in 2000. Community health worker programs have been particularly effective in rural areas, providing essential prenatal education and care.",
    highlights: [
      "Maternal mortality decreased by 78% since 2000 (from 1,071 to 248 per 100,000 live births)",
      "Skilled birth attendance increased from 31% to 91%",
      "Eastern Province reduced maternal mortality by 82%",
      "85% of population now lives within 5km of a health facility",
    ],
    sources: [
      "Rwanda Ministry of Health Annual Report 2022",
      "WHO Maternal Health Assessment",
      "Rwanda Demographic and Health Survey (DHS) 2020",
    ],
    tags: ["Maternal Health", "Healthcare", "Trends"],
    confidence: 95,
    timestamp: "2023-10-22T09:15:00Z",
    model: "Domain Expert Model + GPT-4o",
    visualizationSuggestions: [
      {
        type: "line",
        title: "Maternal Mortality Trend (2000-2022)",
        description: "Visualization of the declining maternal mortality rate over time",
      },
      {
        type: "map",
        title: "Maternal Mortality by Province",
        description: "Choropleth map showing maternal mortality rates across different provinces",
      },
    ],
  },
  {
    id: "3",
    title: "Housing Quality and Child Health",
    content:
      "Children living in improved housing conditions show 32% lower incidence of respiratory diseases and 45% lower incidence of waterborne diseases compared to those in traditional housing. The percentage of households with improved housing has increased from 54.5% to 62.8% between 2015 and 2022, with the most significant improvements in Kigali City and the Northern Province. Access to clean water (now at 76.4%) and electricity (52.8%) continue to be key determinants of housing quality. The government's rural housing improvement program has reached 42% of targeted households, with plans to reach 75% by 2030.",
    highlights: [
      "32% lower respiratory disease incidence in improved housing",
      "45% lower waterborne disease incidence in improved housing",
      "Improved housing increased from 54.5% to 62.8% between 2015-2022",
      "Clean water access at 76.4%, electricity access at 52.8%",
    ],
    sources: [
      "Housing-Health Correlation Study 2022",
      "Rwanda Housing Authority Annual Report",
      "Ministry of Infrastructure Development Plan",
    ],
    tags: ["Housing", "Child Health", "Disease", "Infrastructure"],
    confidence: 88,
    timestamp: "2023-09-05T11:20:00Z",
    model: "Statistical Analysis + Domain Expert",
    visualizationSuggestions: [
      {
        type: "bar",
        title: "Disease Incidence by Housing Type",
        description: "Comparison of disease rates between traditional and improved housing",
      },
      {
        type: "pie",
        title: "Housing Quality Distribution",
        description: "Breakdown of housing quality categories across Rwanda",
      },
    ],
  },
]

export function useEnhancedAiInsights() {
  const [insights, setInsights] = useState<Insight[]>(sampleInsights)
  const [currentInsight, setCurrentInsight] = useState<Insight | null>(insights[0] || null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateInsight = useCallback(
    async (query: string, insightType: InsightType, depth: "summary" | "detailed" | "expert") => {
      setIsGenerating(true)
      setError(null)

      try {
        // In a real implementation, this would call an API
        await new Promise((resolve) => setTimeout(resolve, 2500))

        // Generate a new insight based on the query
        const newInsight: Insight = {
          id: Date.now().toString(),
          title: generateTitle(query, insightType),
          content: generateContent(query, insightType, depth),
          highlights: generateHighlights(query, insightType),
          sources: [
            "2022 Rwanda Population and Housing Census",
            "Rwanda Demographic and Health Survey (DHS) 2020",
            "National Institute of Statistics of Rwanda (NISR) Annual Report",
          ],
          tags: generateTags(query, insightType),
          confidence: Math.floor(Math.random() * 15) + 80, // Random confidence between 80-95%
          timestamp: new Date().toISOString(),
          model: depth === "expert" ? "Mixture of Experts (GPT-4o + Domain Specialist)" : "GPT-4o",
          visualizationSuggestions: generateVisualizations(query, insightType),
        }

        setInsights((prev) => [newInsight, ...prev])
        setCurrentInsight(newInsight)

        return newInsight
      } catch (err) {
        setError("Failed to generate insight. Please try again.")
        return null
      } finally {
        setIsGenerating(false)
      }
    },
    [],
  )

  const clearInsights = useCallback(() => {
    setInsights([])
    setCurrentInsight(null)
  }, [])

  const removeInsight = useCallback(
    (id: string) => {
      setInsights((prev) => prev.filter((insight) => insight.id !== id))

      if (currentInsight && currentInsight.id === id) {
        const remaining = insights.filter((insight) => insight.id !== id)
        setCurrentInsight(remaining.length > 0 ? remaining[0] : null)
      }
    },
    [insights, currentInsight],
  )

  const setActiveInsight = useCallback(
    (id: string) => {
      const insight = insights.find((i) => i.id === id)
      if (insight) {
        setCurrentInsight(insight)
      }
    },
    [insights],
  )

  return {
    insights,
    currentInsight,
    isGenerating,
    error,
    generateInsight,
    clearInsights,
    removeInsight,
    setActiveInsight,
  }
}

// Helper functions to generate content based on the query and insight type
function generateTitle(query: string, insightType: InsightType): string {
  if (query.toLowerCase().includes("mortality") || query.toLowerCase().includes("death")) {
    return "Mortality Rate Analysis and Trends"
  } else if (query.toLowerCase().includes("population")) {
    return "Population Distribution and Growth Patterns"
  } else if (query.toLowerCase().includes("housing") || query.toLowerCase().includes("home")) {
    return "Housing Quality and Infrastructure Assessment"
  } else if (query.toLowerCase().includes("education") || query.toLowerCase().includes("school")) {
    return "Education Access and Outcomes Analysis"
  } else if (query.toLowerCase().includes("health") || query.toLowerCase().includes("disease")) {
    return "Health Outcomes and Healthcare Access Evaluation"
  } else if (query.toLowerCase().includes("urban") || query.toLowerCase().includes("city")) {
    return "Urbanization Trends and Impact Analysis"
  } else {
    switch (insightType) {
      case "demographic":
        return "Demographic Patterns and Trends"
      case "health":
        return "Health Indicators Analysis"
      case "housing":
        return "Housing and Infrastructure Assessment"
      case "education":
        return "Education System Performance"
      case "economic":
        return "Economic Indicators and Development"
      case "prediction":
        return "Future Projections and Forecasts"
      default:
        return "Comprehensive Data Analysis"
    }
  }
}

function generateContent(query: string, insightType: InsightType, depth: "summary" | "detailed" | "expert"): string {
  let baseContent = ""

  // Generate content based on insight type
  switch (insightType) {
    case "demographic":
      baseContent =
        "Analysis of population distribution patterns reveals significant regional variations. Urban areas show higher population density (2,124 people/km² in Kigali vs. national average of 525 people/km²) and lower fertility rates (3.6 vs. national average of 4.1). The population growth rate has stabilized at 2.8%, down from 3.1% in 2002, indicating a demographic transition. This transition correlates with improved education levels and increased contraceptive use (from 10% in 2000 to 58% in 2022)."
      break
    case "health":
      baseContent =
        "Health indicators show substantial improvement over the past two decades. Child mortality has decreased from 196 to 43 per 1,000 live births (78% reduction), while maternal mortality has decreased from 1,071 to 248 per 100,000 live births (77% reduction). These improvements correlate strongly with increased healthcare access, higher vaccination coverage (now at 95%), and improved sanitation. Regional disparities persist, with Kigali showing the best outcomes (child mortality at 38 per 1,000) and Southern Province facing the most challenges (child mortality at 52 per 1,000)."
      break
    case "housing":
      baseContent =
        "Housing quality analysis indicates that 62.8% of households now have access to improved housing conditions, up from 54.5% in 2015. Urban areas show higher rates of improved housing (78.5% in Kigali) compared to rural areas (average of 58.3%). Households with improved housing show significantly better health outcomes, including 32% lower incidence of respiratory diseases and 45% lower incidence of waterborne diseases. Access to clean water (now at 76.4%) and electricity (52.8%) continue to be key determinants of housing quality."
      break
    case "education":
      baseContent =
        "Education indicators show significant progress, with primary school enrollment reaching 98.3%. However, secondary school enrollment remains lower at 35.2%, with notable gender disparities (38.1% for girls vs. 32.3% for boys). Higher education levels correlate strongly with improved health outcomes, lower fertility rates, and better economic prospects. Urban areas show higher educational attainment (10.2 years of schooling on average in Kigali) compared to rural areas (6.8 years on average)."
      break
    case "economic":
      baseContent =
        "Economic analysis shows steady GDP growth averaging 7.5% annually over the past decade, with a temporary decline to 2.1% in 2020 due to the COVID-19 pandemic. The services sector now accounts for 47.8% of GDP, followed by agriculture (24.3%) and industry (17.9%). Poverty rates have declined from 44.9% in 2010 to 38.2% in 2022, though rural poverty (42.3%) remains significantly higher than urban poverty (22.1%). Income inequality, as measured by the Gini coefficient, has decreased slightly from 0.49 to 0.45."
      break
    case "prediction":
      baseContent =
        "Predictive modeling suggests Rwanda's population will reach approximately 16.9 million by 2030 and 22.1 million by 2050. Urbanization is projected to increase from the current 17.6% to approximately 35% by 2040. Health outcomes are expected to continue improving, with child mortality projected to decrease to 28 per 1,000 live births by 2030. Housing quality is expected to improve, with 75% of households having access to improved housing by 2030, contingent on continued infrastructure investment."
      break
    default:
      baseContent =
        "Comprehensive analysis of Rwanda's development indicators shows significant progress across multiple sectors. Key achievements include reduced mortality rates, increased life expectancy (now at 69.2 years), improved access to healthcare services, and enhanced educational opportunities. Regional disparities persist, with urban areas generally showing better outcomes than rural areas. Continued focus on reducing these disparities, particularly in healthcare access and housing quality, will be crucial for achieving equitable development outcomes across all regions and population groups."
  }

  // Adjust content based on depth
  if (depth === "summary") {
    // Return a shorter version
    return baseContent.split(".").slice(0, 3).join(".") + "."
  } else if (depth === "expert") {
    // Return a more detailed version
    return (
      baseContent +
      " Statistical analysis using multivariate regression models indicates that the strongest predictors of improved outcomes are education level (β = 0.42, p < 0.001), healthcare access (β = 0.38, p < 0.001), and infrastructure quality (β = 0.29, p < 0.01). Time-series analysis reveals accelerating improvement rates in most indicators since 2015, with the exception of income inequality metrics which have shown more modest changes. Geospatial analysis identifies several 'development hotspots' where multiple indicators are improving simultaneously, primarily in urban and peri-urban areas, suggesting potential for targeted intervention strategies in underperforming regions."
    )
  }

  // Return the detailed (default) version
  return baseContent
}

function generateHighlights(query: string, insightType: InsightType): string[] {
  switch (insightType) {
    case "demographic":
      return [
        "Population density in Kigali (2,124 people/km²) vs. national average (525 people/km²)",
        "Population growth rate stabilized at 2.8%, down from 3.1% in 2002",
        "Fertility rates lower in urban areas (3.6) vs. national average (4.1)",
        "Contraceptive use increased from 10% in 2000 to 58% in 2022",
      ]
    case "health":
      return [
        "Child mortality decreased by 78% (from 196 to 43 per 1,000 live births)",
        "Maternal mortality decreased by 77% (from 1,071 to 248 per 100,000 live births)",
        "Vaccination coverage now at 95% nationwide",
        "Regional disparities: Kigali (38/1,000) vs. Southern Province (52/1,000)",
      ]
    case "housing":
      return [
        "62.8% of households have improved housing, up from 54.5% in 2015",
        "32% lower respiratory disease incidence in improved housing",
        "45% lower waterborne disease incidence in improved housing",
        "Clean water access at 76.4%, electricity access at 52.8%",
      ]
    case "education":
      return [
        "Primary school enrollment at 98.3% nationwide",
        "Secondary school enrollment at 35.2% with gender disparities",
        "Urban educational attainment: 10.2 years vs. rural: 6.8 years",
        "Strong correlation between education and improved health outcomes",
      ]
    case "economic":
      return [
        "GDP growth averaging 7.5% annually over the past decade",
        "Services sector accounts for 47.8% of GDP",
        "Poverty rates declined from 44.9% in 2010 to 38.2% in 2022",
        "Gini coefficient decreased from 0.49 to 0.45",
      ]
    case "prediction":
      return [
        "Population projected to reach 16.9 million by 2030",
        "Urbanization expected to increase to 35% by 2040",
        "Child mortality projected to decrease to 28 per 1,000 by 2030",
        "75% of households expected to have improved housing by 2030",
      ]
    default:
      return [
        "Significant progress across multiple development indicators",
        "Life expectancy increased to 69.2 years",
        "Persistent regional disparities between urban and rural areas",
        "Education, healthcare access, and infrastructure are key development drivers",
      ]
  }
}

function generateTags(query: string, insightType: InsightType): string[] {
  const baseTags = ["Rwanda", "Data Analysis"]

  switch (insightType) {
    case "demographic":
      return [...baseTags, "Demographics", "Population", "Fertility", "Urbanization"]
    case "health":
      return [...baseTags, "Health", "Mortality", "Healthcare", "Vaccination"]
    case "housing":
      return [...baseTags, "Housing", "Infrastructure", "Sanitation", "Development"]
    case "education":
      return [...baseTags, "Education", "Schools", "Literacy", "Human Capital"]
    case "economic":
      return [...baseTags, "Economy", "GDP", "Poverty", "Inequality"]
    case "prediction":
      return [...baseTags, "Forecasting", "Projections", "Future Trends", "Development Goals"]
    default:
      return [...baseTags, "Comprehensive", "Development", "Social Indicators"]
  }
}

function generateVisualizations(
  query: string,
  insightType: InsightType,
): {
  type: "bar" | "line" | "pie" | "map" | "scatter"
  title: string
  description: string
}[] {
  switch (insightType) {
    case "demographic":
      return [
        {
          type: "map",
          title: "Population Density by District",
          description: "Choropleth map showing population density across Rwanda's districts",
        },
        {
          type: "line",
          title: "Population Growth Rate (2000-2022)",
          description: "Line chart showing the trend in population growth rate over time",
        },
      ]
    case "health":
      return [
        {
          type: "bar",
          title: "Mortality Rates by Province",
          description: "Bar chart comparing child and maternal mortality rates across provinces",
        },
        {
          type: "line",
          title: "Health Indicators Improvement (2000-2022)",
          description: "Line chart showing trends in key health indicators over time",
        },
      ]
    case "housing":
      return [
        {
          type: "pie",
          title: "Housing Quality Distribution",
          description: "Pie chart showing the distribution of housing quality categories",
        },
        {
          type: "bar",
          title: "Disease Incidence by Housing Type",
          description: "Bar chart comparing disease rates between housing types",
        },
      ]
    case "education":
      return [
        {
          type: "bar",
          title: "School Enrollment by Level and Gender",
          description: "Bar chart showing enrollment rates across education levels and gender",
        },
        {
          type: "scatter",
          title: "Education vs. Health Outcomes",
          description: "Scatter plot showing the relationship between education and health indicators",
        },
      ]
    case "economic":
      return [
        {
          type: "line",
          title: "GDP Growth and Sector Contribution",
          description: "Line chart showing GDP growth and stacked area chart of sector contributions",
        },
        {
          type: "bar",
          title: "Poverty Rates by Province",
          description: "Bar chart comparing poverty rates across provinces",
        },
      ]
    case "prediction":
      return [
        {
          type: "line",
          title: "Population Projections (2022-2050)",
          description: "Line chart showing projected population growth with confidence intervals",
        },
        {
          type: "bar",
          title: "Projected Development Indicators (2030)",
          description: "Bar chart comparing current and projected values for key indicators",
        },
      ]
    default:
      return [
        {
          type: "line",
          title: "Key Indicators Trend (2000-2022)",
          description: "Line chart showing trends in multiple development indicators",
        },
        {
          type: "map",
          title: "Development Index by District",
          description: "Choropleth map showing the composite development index across districts",
        },
      ]
  }
}
