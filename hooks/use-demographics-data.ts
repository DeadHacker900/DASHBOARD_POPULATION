"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

interface KeyIndicator {
  name: string
  value: string
  percentage: number
  description: string
  color: string
}

interface PopulationDistributionItem {
  category: string
  percentage: number
  color: string
}

interface DemographicsData {
  totalPopulation: string
  populationGrowth: number
  populationDensity: number

  keyIndicators: KeyIndicator[]
  populationDistribution: PopulationDistributionItem[]

  populationPyramidData: any
  populationDensityData: any
  populationGrowthData: any
  ageDistributionData: any
  populationProjectionData: any
}

export function useDemographicsData(region: string, year: string) {
  const [data, setData] = useState<DemographicsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch data based on region and year
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call
        // await fetch(`/api/demographics?region=${region}&year=${year}`)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockData: DemographicsData = {
          totalPopulation:
            region === "national"
              ? "13.2M"
              : region === "kigali"
                ? "1.2M"
                : region === "eastern"
                  ? "2.6M"
                  : region === "southern"
                    ? "2.9M"
                    : region === "western"
                      ? "3.1M"
                      : "2.4M",
          populationGrowth: region === "kigali" ? 3.5 : 2.8,
          populationDensity:
            region === "kigali"
              ? 2124
              : region === "eastern"
                ? 274
                : region === "southern"
                  ? 565
                  : region === "western"
                    ? 420
                    : 528,

          keyIndicators: [
            {
              name: "Fertility Rate",
              value: region === "kigali" ? "3.6 births per woman" : "4.1 births per woman",
              percentage: region === "kigali" ? 60 : 68,
              description: "Decreasing trend since 2000",
              color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            {
              name: "Life Expectancy",
              value: region === "kigali" ? "71.5 years" : "69.2 years",
              percentage: region === "kigali" ? 78 : 75,
              description: "Increasing trend since 2000",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              name: "Median Age",
              value: region === "kigali" ? "22.3 years" : "19.7 years",
              percentage: region === "kigali" ? 52 : 45,
              description: "Young population structure",
              color: "bg-gradient-to-r from-amber-500 to-orange-500",
            },
          ],

          populationDistribution: [
            {
              category: "Urban Population",
              percentage:
                region === "kigali"
                  ? 100
                  : region === "eastern"
                    ? 12.5
                    : region === "southern"
                      ? 13.8
                      : region === "western"
                        ? 15.2
                        : region === "northern"
                          ? 14.7
                          : 17.6,
              color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            {
              category: "Rural Population",
              percentage:
                region === "kigali"
                  ? 0
                  : region === "eastern"
                    ? 87.5
                    : region === "southern"
                      ? 86.2
                      : region === "western"
                        ? 84.8
                        : region === "northern"
                          ? 85.3
                          : 82.4,
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              category: "Male Population",
              percentage: region === "kigali" ? 50.5 : 48.2,
              color: "bg-gradient-to-r from-green-500 to-emerald-500",
            },
            {
              category: "Female Population",
              percentage: region === "kigali" ? 49.5 : 51.8,
              color: "bg-gradient-to-r from-blue-500 to-indigo-500",
            },
          ],

          populationPyramidData: {
            ageGroups: [
              "0-4",
              "5-9",
              "10-14",
              "15-19",
              "20-24",
              "25-29",
              "30-34",
              "35-39",
              "40-44",
              "45-49",
              "50-54",
              "55-59",
              "60-64",
              "65-69",
              "70-74",
              "75-79",
              "80+",
            ],
            male:
              region === "kigali"
                ? [7.2, 6.8, 6.3, 6.8, 7.2, 6.5, 5.2, 4.5, 3.8, 3.3, 2.9, 2.5, 2.2, 1.9, 1.6, 1.4, 1.3]
                : [8.2, 7.8, 7.3, 6.5, 5.7, 4.9, 4.2, 3.5, 2.8, 2.3, 1.9, 1.5, 1.2, 0.9, 0.6, 0.4, 0.3],
            female:
              region === "kigali"
                ? [7.0, 6.6, 6.2, 6.7, 7.3, 6.7, 5.4, 4.7, 4.0, 3.5, 3.1, 2.7, 2.4, 2.1, 1.8, 1.5, 1.4]
                : [8.0, 7.6, 7.2, 6.4, 5.8, 5.1, 4.4, 3.7, 3.0, 2.5, 2.1, 1.7, 1.4, 1.1, 0.8, 0.5, 0.4],
          },

          populationDensityData: {
            regions: [
              { name: "Kigali City", density: 2124, population: 1.2, coordinates: [30.0619, -1.9441] },
              { name: "Eastern Province", density: 274, population: 2.6, coordinates: [30.5395, -1.7863] },
              { name: "Southern Province", density: 565, population: 2.9, coordinates: [29.7375, -2.3378] },
              { name: "Western Province", density: 420, population: 3.1, coordinates: [29.2587, -2.1643] },
              { name: "Northern Province", density: 528, population: 2.4, coordinates: [29.75, -1.5] },
            ],
          },

          populationGrowthData: {
            years: ["1978", "1991", "2002", "2012", "2022"],
            population: [4.8, 7.1, 8.1, 10.5, 13.2],
            growthRate: [3.7, 3.1, 2.6, 2.9, 2.8],
          },

          ageDistributionData: {
            male: [15, 14, 12, 10, 8, 6, 4, 3, 2, 1],
            female: [14, 13, 12, 10, 8, 7, 5, 4, 3, 2],
            ageGroups: ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-39", "40-49", "50-59", "60+"],
          },

          populationProjectionData: {
            years: [2022, 2025, 2030, 2035, 2040, 2045, 2050],
            lowVariant: [13.2, 14.1, 15.5, 16.8, 18.0, 19.1, 20.0],
            mediumVariant: [13.2, 14.3, 16.0, 17.7, 19.4, 21.0, 22.5],
            highVariant: [13.2, 14.5, 16.5, 18.6, 20.8, 23.0, 25.2],
          },
        }

        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        toast({
          title: "Error",
          description: "Failed to load demographics data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [region, year])

  // Refresh data function
  const refreshData = async () => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Refresh the data (in a real app, this would be an API call)
      // In this mock, we're just updating the existing data with slight variations
      if (data) {
        setData({
          ...data,
          populationGrowth: +(data.populationGrowth + (Math.random() * 0.4 - 0.2)).toFixed(1),
          populationDensity: Math.round(data.populationDensity + (Math.random() * 20 - 10)),
        })
      }

      return true
    } catch (error) {
      console.error("Error refreshing data:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Generate report
  const generateReport = async (reportType: string) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would generate and download a report
      console.log(`Generating ${reportType} report for ${region} (${year})...`)

      return true
    } catch (error) {
      console.error("Error generating report:", error)
      throw error
    }
  }

  // Download data
  const downloadData = async (dataset: string, format: string) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would download the data in the specified format
      console.log(`Downloading ${dataset} data in ${format} format for ${region} (${year})...`)

      return true
    } catch (error) {
      console.error("Error downloading data:", error)
      throw error
    }
  }

  return {
    data,
    isLoading,
    error,
    refreshData,
    generateReport,
    downloadData,
  }
}
