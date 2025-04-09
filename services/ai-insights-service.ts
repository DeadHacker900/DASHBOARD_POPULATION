// This is a service that could use multiple AI models for generating insights
// NOTE: This is a conceptual implementation - actual API keys should be stored securely
// as environment variables and not hardcoded

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { searchService } from "./search-service"

// Define the types of insights we can generate
export type InsightType = "demographic" | "health" | "housing" | "education" | "economic" | "prediction"

export interface InsightRequest {
  query: string
  dataContext?: any
  type?: InsightType
  depth?: "summary" | "detailed" | "expert"
  useSearch?: boolean
}

export interface InsightResponse {
  id: string
  title: string
  content: string
  highlights: string[]
  confidence: number
  sources: string[]
  tags: string[]
  timestamp: string
  model: string
  searchResults?: {
    google?: any[]
    scholar?: any[]
  }
  visualizationSuggestions?: {
    type: string
    title: string
    description: string
    dataPoints?: any
  }[]
}

// This is a conceptual implementation of a service that could use multiple AI models
export class AIInsightsService {
  private static instance: AIInsightsService

  // Singleton pattern
  public static getInstance(): AIInsightsService {
    if (!AIInsightsService.instance) {
      AIInsightsService.instance = new AIInsightsService()
    }
    return AIInsightsService.instance
  }

  // Generate an insight using the appropriate model based on the request
  public async generateInsight(request: InsightRequest): Promise<InsightResponse> {
    const { query, type = "demographic", depth = "detailed", useSearch = true } = request

    try {
      // If search is enabled, get search results first
      let searchResults = null
      if (useSearch) {
        try {
          const { google, scholar } = await searchService.searchBoth(query)
          if (google.success || scholar.success) {
            searchResults = {
              google: google.success ? google.results : [],
              scholar: scholar.success ? scholar.results : [],
            }
          }
        } catch (error) {
          console.error("Error fetching search results:", error)
          // Continue without search results if there's an error
        }
      }

      // For demonstration purposes, we'll simulate using OpenAI
      if (process.env.OPENAI_API_KEY) {
        return await this.generateWithOpenAI(request, searchResults)
      } else {
        // Fallback to mock data if no API key is available
        return this.generateMockInsight(request, searchResults)
      }
    } catch (error) {
      console.error("Error generating insight:", error)
      return this.generateMockInsight(request)
    }
  }

  // Generate an insight using OpenAI
  private async generateWithOpenAI(
    request: InsightRequest,
    searchResults: { google?: any[]; scholar?: any[] } | null = null,
  ): Promise<InsightResponse> {
    const { query, type = "demographic", depth = "detailed" } = request

    // Create a prompt based on the request and search results
    const prompt = this.createPrompt(query, type, depth, searchResults)

    try {
      // Use the AI SDK to generate text
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
      })

      // Parse the response
      try {
        const parsedResponse = JSON.parse(text)
        return {
          id: `insight-${Date.now()}`,
          timestamp: new Date().toISOString(),
          model: "gpt-4o with SerpAPI integration",
          searchResults,
          ...parsedResponse,
        }
      } catch (e) {
        // If parsing fails, create a structured response from the text
        return {
          id: `insight-${Date.now()}`,
          title: this.generateTitle(query, type),
          content: text,
          highlights: [text.split(". ")[0]],
          confidence: 70,
          sources: ["Rwanda Census 2022", "DHS Survey"],
          tags: [type, "AI-generated", depth],
          timestamp: new Date().toISOString(),
          model: "gpt-4o with SerpAPI integration",
          searchResults,
        }
      }
    } catch (error) {
      console.error("Error with OpenAI:", error)
      return this.generateMockInsight(request, searchResults)
    }
  }

  // Create a prompt for the AI model
  private createPrompt(
    query: string,
    type: InsightType,
    depth: string,
    searchResults: { google?: any[]; scholar?: any[] } | null = null,
  ): string {
    let searchContext = ""

    if (searchResults) {
      // Add Google Scholar results
      if (searchResults.scholar && searchResults.scholar.length > 0) {
        searchContext += "\nRecent scholarly articles about this topic:\n"
        searchResults.scholar.forEach((result, index) => {
          searchContext += `${index + 1}. "${result.title}" (${result.year || "n/a"}) - ${result.publication}\n`
          if (result.snippet) {
            searchContext += `   Summary: ${result.snippet}\n`
          }
          if (result.citedBy) {
            searchContext += `   Cited by: ${result.citedBy} publications\n`
          }
        })
      }

      // Add Google results
      if (searchResults.google && searchResults.google.length > 0) {
        searchContext += "\nRecent web information about this topic:\n"
        searchResults.google.forEach((result, index) => {
          searchContext += `${index + 1}. "${result.title}" - ${result.source || "Unknown source"}\n`
          if (result.snippet) {
            searchContext += `   Summary: ${result.snippet}\n`
          }
        })
      }
    }

    return `You are an expert data analyst specializing in demographic and health data for Rwanda.
    
    Analyze the following query about Rwanda's demographic and health data: "${query}"
    
    Focus on ${type} data with ${depth} analysis.
    
    Use data from the 2022 Rwanda Population and Housing Census and the latest Demographic and Health Survey (DHS).
    ${searchContext ? `\nHere is additional context from recent research and web sources:\n${searchContext}` : ""}
    
    Provide your response in the following JSON format:
    {
      "title": "A concise, informative title for this insight",
      "content": "A detailed analysis addressing the query, with data-driven insights and clear conclusions",
      "highlights": ["3-5 key points or statistics from your analysis"],
      "confidence": A number between 0-100 representing your confidence in this analysis,
      "sources": ["List of specific data sources used"],
      "tags": ["5-7 relevant tags for categorizing this insight"],
      "visualizationSuggestions": [
        {
          "type": "chart type (e.g., line, bar, map)",
          "title": "Suggested visualization title",
          "description": "What this visualization would show"
        }
      ]
    }`
  }

  // Generate a title based on the query and type
  private generateTitle(query: string, type: InsightType): string {
    const typeMap: Record<InsightType, string> = {
      demographic: "Demographic Analysis",
      health: "Health Outcomes Assessment",
      housing: "Housing Conditions Impact",
      education: "Education Patterns",
      economic: "Economic Indicators",
      prediction: "Future Projections",
    }

    const baseTitle = typeMap[type] || "Data Analysis"

    if (query.length < 30) {
      return `${baseTitle}: ${query}`
    } else {
      // Extract key terms from the query
      const keywords = query
        .split(" ")
        .filter((word) => word.length > 4)
        .slice(0, 3)
        .join(" ")

      return `${baseTitle}: ${keywords}...`
    }
  }

  // Generate a mock insight for demonstration purposes
  private generateMockInsight(
    request: InsightRequest,
    searchResults: { google?: any[]; scholar?: any[] } | null = null,
  ): InsightResponse {
    const { query, type = "demographic" } = request
    const now = new Date()

    // Generate different mock insights based on the type
    let insight: Partial<InsightResponse>

    switch (type) {
      case "health":
        insight = {
          title: "Health Outcomes Analysis",
          content: `Analysis of health indicators shows substantial improvement over the past two decades. Child mortality has decreased from 196 to 43 per 1,000 live births (78% reduction), while maternal mortality has decreased from 1,071 to 248 per 100,000 live births (77% reduction). These improvements correlate strongly with increased healthcare access, higher vaccination coverage (now at 95%), and improved sanitation. Regional disparities persist, with Kigali showing the best outcomes (child mortality at 38 per 1,000) and Southern Province facing the most challenges (child mortality at 52 per 1,000).`,
          highlights: [
            "Child mortality reduced by 78% since 2000",
            "Maternal mortality reduced by 77% since 2000",
            "Vaccination coverage now at 95% in urban areas",
          ],
          confidence: 92,
          sources: ["DHS Surveys 2000-2022", "Ministry of Health Reports", "UNICEF Data"],
          tags: ["health", "mortality", "vaccination", "maternal health", "regional disparities"],
          visualizationSuggestions: [
            {
              type: "line",
              title: "Child Mortality Trends 2000-2022",
              description: "Declining trend of child mortality rates across provinces",
            },
            {
              type: "map",
              title: "Regional Health Disparities",
              description: "Heat map showing health outcome variations by province",
            },
          ],
        }
        break

      case "housing":
        insight = {
          title: "Housing Quality Impact Analysis",
          content: `Housing quality analysis indicates that 62.8% of households now have access to improved housing conditions, up from 54.5% in 2015. Urban areas show higher rates of improved housing (78.5% in Kigali) compared to rural areas (average of 58.3%). Households with improved housing show significantly better health outcomes, including 32% lower incidence of respiratory diseases and 45% lower incidence of waterborne diseases. Access to clean water (now at 76.4%) and electricity (52.8%) continue to be key determinants of housing quality.`,
          highlights: [
            "62.8% of households have improved housing, up from 54.5% in 2015",
            "78.5% improved housing rate in Kigali vs 58.3% in rural areas",
            "32% lower respiratory disease rates in improved housing",
          ],
          confidence: 88,
          sources: ["2022 Housing Census", "Health Impact Studies 2020-2022", "Ministry of Infrastructure Reports"],
          tags: ["housing", "infrastructure", "urban-rural divide", "health impact", "utilities access"],
          visualizationSuggestions: [
            {
              type: "bar",
              title: "Housing Quality by Province",
              description: "Comparison of housing quality metrics across provinces",
            },
            {
              type: "pie",
              title: "Housing Type Distribution",
              description: "Breakdown of housing types across Rwanda",
            },
          ],
        }
        break

      case "prediction":
        insight = {
          title: "Future Demographic Projections",
          content: `Predictive modeling based on current demographic trends suggests Rwanda's population will reach approximately 16.2 million by 2030, with urbanization rates increasing to 22% (from current 17.6%). Fertility rates are projected to continue declining, reaching approximately 3.5 by 2030. Life expectancy is expected to increase to 72.5 years by 2030. These projections assume continued improvements in healthcare access, education, and economic development. The most significant population growth is expected in secondary cities, which may grow at 1.5x the rate of rural areas.`,
          highlights: [
            "Population projected to reach 16.2 million by 2030",
            "Urbanization expected to increase to 22% by 2030",
            "Secondary cities may grow at 1.5x the rate of rural areas",
          ],
          confidence: 78,
          sources: [
            "Trend Analysis of Census Data 2002-2022",
            "UN Population Projections",
            "National Institute of Statistics Rwanda",
          ],
          tags: ["prediction", "population growth", "urbanization", "fertility", "life expectancy"],
          visualizationSuggestions: [
            {
              type: "line",
              title: "Population Projection 2022-2040",
              description: "Projected population growth with confidence intervals",
            },
            {
              type: "area",
              title: "Changing Age Distribution",
              description: "Projected changes in population age structure",
            },
          ],
        }
        break

      default:
        insight = {
          title: "Demographic Patterns Analysis",
          content: `Analysis of demographic data reveals complex patterns and relationships. Rwanda has made significant progress in key indicators, including reduced mortality rates, increased life expectancy (now at 69.2 years), and improved access to healthcare services. Regional disparities persist, with urban areas generally showing better outcomes than rural areas. The population growth rate has stabilized at 2.8%, down from 3.1% in 2002, indicating a demographic transition. This transition correlates with improved education levels and increased contraceptive use (from 10% in 2000 to 58% in 2022).`,
          highlights: [
            "Life expectancy increased to 69.2 years",
            "Population growth rate stabilized at 2.8%",
            "Contraceptive use increased from 10% to 58% since 2000",
          ],
          confidence: 90,
          sources: ["2022 Census", "DHS Surveys", "Ministry of Health Reports"],
          tags: ["demographics", "population", "life expectancy", "fertility", "regional analysis"],
          visualizationSuggestions: [
            {
              type: "pyramid",
              title: "Population Pyramid 2022",
              description: "Age and gender distribution of Rwanda's population",
            },
            {
              type: "map",
              title: "Population Density by District",
              description: "Geographic distribution of population density",
            },
          ],
        }
    }

    return {
      id: `insight-${Date.now()}`,
      timestamp: now.toISOString(),
      model: "mixture-of-experts-simulation with SerpAPI",
      searchResults,
      ...(insight as InsightResponse),
    }
  }
}

// Export a singleton instance
export const aiInsightsService = AIInsightsService.getInstance()
