import { NextResponse } from "next/server"

// Define types for our data
interface RegionalItem {
  region: string
  healthIndex: number
  description: string
  type: "positive" | "warning" | "improved"
}

interface ResourceAllocation {
  sector: string
  percentage: number
  color: string
}

interface Insight {
  source: string
  time: string
  message: string
  avatar: string
  unread: boolean
}

interface DashboardData {
  // Key metrics
  populationGrowth: number
  populationGrowthTrend: "up" | "down" | "stable"
  urbanizationRate: number
  urbanizationTrend: "up" | "down" | "stable"
  fertilityRate: number
  fertilityTrend: "up" | "down" | "stable"
  childMortality: number

  // Status information
  censusDataStatus: string
  dhsDataStatus: string
  regionalDataStatus: string
  lastUpdateTime: string

  // Time information
  lastCensusYear: string
  lastDhsYear: string
  nextUpdateDate: string

  // Chart data
  totalPopulation: string
  improvedHousingPercentage: number
  demographicsData: any
  healthData: any
  housingData: any
  trendData: any
  ageDistributionData: any
  healthcareAccessData: any
  regionalMapData: any

  // Lists
  regionalData: RegionalItem[]
  resourceAllocation: ResourceAllocation[]
  insights: Insight[]
}

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region") || "national"
  const year = searchParams.get("year") || "2022"

  // In a real application, this would fetch data from a database
  // For this example, we'll return mock data based on the region and year

  // Mock data
  const mockData: DashboardData = {
    // Key metrics
    populationGrowth: region === "kigali" ? 3.2 : 2.8,
    populationGrowthTrend: "up",
    urbanizationRate: region === "kigali" ? 100 : region === "eastern" ? 12.5 : 17.6,
    urbanizationTrend: "up",
    fertilityRate: region === "kigali" ? 3.6 : 4.1,
    fertilityTrend: "down",
    childMortality: region === "kigali" ? 38 : region === "southern" ? 52 : 45,

    // Status information
    censusDataStatus: "Complete",
    dhsDataStatus: "Complete",
    regionalDataStatus: "In Progress",
    lastUpdateTime: "3 months ago",

    // Time information
    lastCensusYear: "2022",
    lastDhsYear: "2019-20",
    nextUpdateDate: "Q3 2023",

    // Chart data
    totalPopulation: region === "national" ? "13.2M" : region === "kigali" ? "1.2M" : "2.6M",
    improvedHousingPercentage: region === "kigali" ? 78.5 : 62.8,
    demographicsData: {
      ageGroups: [
        { label: "0-14", urban: 35, rural: 42 },
        { label: "15-24", urban: 22, rural: 20 },
        { label: "25-34", urban: 18, rural: 15 },
        { label: "35-44", urban: 12, rural: 10 },
        { label: "45-54", urban: 7, rural: 7 },
        { label: "55-64", urban: 4, rural: 4 },
        { label: "65+", urban: 2, rural: 2 },
      ],
      totalPopulation: region === "national" ? "13.2M" : region === "kigali" ? "1.2M" : "2.6M",
    },
    healthData: {
      indicators: [
        { label: "Vaccination", urban: 95, rural: 82 },
        { label: "Prenatal Care", urban: 92, rural: 78 },
        { label: "Skilled Birth", urban: 97, rural: 85 },
        { label: "Contraceptive", urban: 65, rural: 48 },
        { label: "HIV Testing", urban: 88, rural: 72 },
      ],
      childMortality: region === "kigali" ? 38 : region === "southern" ? 52 : 45,
    },
    housingData: {
      improvedPercentage: region === "kigali" ? 78.5 : 62.8,
      traditionalPercentage: region === "kigali" ? 21.5 : 37.2,
      housingTypes: [
        { type: "Modern", percentage: region === "kigali" ? 42.3 : 28.5 },
        { type: "Semi-modern", percentage: region === "kigali" ? 36.2 : 34.3 },
        { type: "Traditional", percentage: region === "kigali" ? 21.5 : 37.2 },
      ],
    },
    trendData: {
      years: ["2000", "2005", "2010", "2015", "2020", year],
      populationGrowth: [3.1, 2.9, 2.7, 2.6, 2.5, 2.4],
      fertilityRate: [5.8, 5.3, 4.6, 4.2, 4.1, 4.0],
      childMortality: [107, 86, 65, 50, 45, 43],
    },
    ageDistributionData: {
      male: [15, 14, 12, 10, 8, 6, 4, 3, 2, 1],
      female: [14, 13, 12, 10, 8, 7, 5, 4, 3, 2],
      ageGroups: ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-39", "40-49", "50-59", "60+"],
    },
    healthcareAccessData: {
      regions: ["Kigali", "Eastern", "Southern", "Western", "Northern"],
      distances: [1.2, 4.8, 5.2, 6.1, 3.9],
      facilities: [8.2, 3.1, 2.8, 2.5, 3.6],
      satisfaction: [78, 62, 58, 55, 65],
    },
    regionalMapData: {
      regions: [
        { name: "Kigali City", healthIndex: 82, population: 1.2, coordinates: [50, 45] },
        { name: "Eastern Province", healthIndex: 65, population: 2.6, coordinates: [70, 45] },
        { name: "Southern Province", healthIndex: 58, population: 2.9, coordinates: [45, 70] },
        { name: "Western Province", healthIndex: 62, population: 3.1, coordinates: [25, 55] },
        { name: "Northern Province", healthIndex: 70, population: 2.4, coordinates: [40, 25] },
      ],
    },

    // Lists
    regionalData: [
      {
        region: "Kigali City",
        healthIndex: 82,
        description: "Highest access to healthcare services",
        type: "positive",
      },
      {
        region: "Eastern Province",
        healthIndex: 65,
        description: "Improved maternal health outcomes",
        type: "improved",
      },
      { region: "Southern Province", healthIndex: 58, description: "Higher child malnutrition rates", type: "warning" },
      { region: "Western Province", healthIndex: 62, description: "Limited access to clean water", type: "warning" },
      { region: "Northern Province", healthIndex: 70, description: "Better vaccination coverage", type: "positive" },
    ],
    resourceAllocation: [
      { sector: "Health Sector", percentage: 42, color: "from-cyan-500 to-blue-500" },
      { sector: "Education", percentage: 35, color: "from-purple-500 to-pink-500" },
      { sector: "Housing Development", percentage: 23, color: "from-blue-500 to-indigo-500" },
    ],
    insights: [
      {
        source: "Census Analysis",
        time: "2 weeks ago",
        message:
          "Population density in Kigali has increased by 12% since the last census, indicating accelerated urbanization.",
        avatar: "/placeholder.svg?height=40&width=40",
        unread: true,
      },
      {
        source: "DHS Report",
        time: "1 month ago",
        message:
          "Maternal mortality has decreased by 18% nationwide, with the most significant improvements in the Eastern Province.",
        avatar: "/placeholder.svg?height=40&width=40",
        unread: true,
      },
      {
        source: "Housing Analysis",
        time: "2 months ago",
        message:
          "62.8% of households now have access to improved housing conditions, up from 54.5% in the previous survey.",
        avatar: "/placeholder.svg?height=40&width=40",
        unread: true,
      },
      {
        source: "Health Trends",
        time: "3 months ago",
        message:
          "Vaccination coverage for children under 5 has reached 95% in urban areas but remains at 82% in rural regions.",
        avatar: "/placeholder.svg?height=40&width=40",
        unread: true,
      },
    ],
  }

  // Return the data
  return NextResponse.json(mockData)
}
