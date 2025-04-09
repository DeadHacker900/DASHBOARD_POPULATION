"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

interface HousingMaterial {
  type: string
  percentage: number
  description: string
  color: string
}

interface HousingAmenity {
  type: string
  percentage: number
  icon: string
  color: string
}

interface HousingData {
  improvedHousingPercentage: number
  waterAccessPercentage: number
  electricityAccessPercentage: number
  improvedSanitationPercentage: number

  housingMaterials: HousingMaterial[]
  housingAmenities: HousingAmenity[]

  housingTypeData: any
  housingQualityData: any
  utilityAccessData: any
  housingTrendsData: any
  urbanRuralComparisonData: any
}

export function useHousingData(region: string, year: string) {
  const [data, setData] = useState<HousingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch data based on region and year
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call
        // await fetch(`/api/housing?region=${region}&year=${year}`)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockData: HousingData = {
          improvedHousingPercentage: region === "kigali" ? 78.5 : 62.8,
          waterAccessPercentage: region === "kigali" ? 92.3 : 76.4,
          electricityAccessPercentage: region === "kigali" ? 96.8 : 52.8,
          improvedSanitationPercentage: region === "kigali" ? 94.5 : 86.2,

          housingMaterials: [
            {
              type: "Cement/Concrete Walls",
              percentage: region === "kigali" ? 68.5 : 42.3,
              description: "Modern construction material",
              color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            {
              type: "Mud Brick Walls",
              percentage: region === "kigali" ? 22.3 : 38.7,
              description: "Traditional construction material",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              type: "Metal Roofing",
              percentage: region === "kigali" ? 95.2 : 78.5,
              description: "Most common roofing material",
              color: "bg-gradient-to-r from-green-500 to-emerald-500",
            },
            {
              type: "Cement Flooring",
              percentage: region === "kigali" ? 72.8 : 35.2,
              description: "Improved flooring material",
              color: "bg-gradient-to-r from-blue-500 to-indigo-500",
            },
          ],

          housingAmenities: [
            {
              type: "Piped Water",
              percentage: region === "kigali" ? 78.2 : 32.5,
              icon: "water",
              color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            },
            {
              type: "Grid Electricity",
              percentage: region === "kigali" ? 92.5 : 46.7,
              icon: "electricity",
              color: "bg-gradient-to-r from-amber-500 to-yellow-500",
            },
            {
              type: "Flush Toilet",
              percentage: region === "kigali" ? 42.3 : 12.8,
              icon: "toilet",
              color: "bg-gradient-to-r from-green-500 to-emerald-500",
            },
            {
              type: "Improved Pit Latrine",
              percentage: region === "kigali" ? 52.2 : 73.4,
              icon: "toilet",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              type: "Solar Electricity",
              percentage: region === "kigali" ? 4.3 : 6.1,
              icon: "electricity",
              color: "bg-gradient-to-r from-amber-500 to-orange-500",
            },
          ],

          housingTypeData: {
            types: ["Modern", "Semi-modern", "Traditional", "Improvised"],
            urban: [42.3, 36.2, 18.5, 3.0],
            rural: [12.5, 25.8, 54.7, 7.0],
            national: region === "kigali" ? [42.3, 36.2, 18.5, 3.0] : [18.5, 28.0, 47.8, 5.7],
          },

          housingQualityData: {
            regions: [
              { name: "Kigali City", quality: 78.5, coordinates: [30.0619, -1.9441] },
              { name: "Eastern Province", quality: 58.2, coordinates: [30.5395, -1.7863] },
              { name: "Southern Province", quality: 61.5, coordinates: [29.7375, -2.3378] },
              { name: "Western Province", quality: 59.8, coordinates: [29.2587, -2.1643] },
              { name: "Northern Province", quality: 65.3, coordinates: [29.75, -1.5] },
            ],
          },

          utilityAccessData: {
            utilities: ["Clean Water", "Electricity", "Improved Sanitation", "Cooking Fuel", "Internet"],
            urban: [92.3, 96.8, 94.5, 72.3, 48.5],
            rural: [72.5, 42.3, 84.2, 12.5, 8.2],
          },

          housingTrendsData: {
            years: ["2002", "2012", "2022"],
            improvedHousing: [32.5, 54.5, 62.8],
            waterAccess: [52.3, 68.2, 76.4],
            electricityAccess: [28.5, 42.3, 52.8],
            improvedSanitation: [64.5, 78.2, 86.2],
          },

          urbanRuralComparisonData: {
            categories: ["Housing Quality", "Water Access", "Electricity", "Sanitation", "Cooking Fuel", "Internet"],
            urban: [78.5, 92.3, 96.8, 94.5, 72.3, 48.5],
            rural: [58.2, 72.5, 42.3, 84.2, 12.5, 8.2],
            gap: [20.3, 19.8, 54.5, 10.3, 59.8, 40.3],
          },
        }

        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        toast({
          title: "Error",
          description: "Failed to load housing data. Please try again.",
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
          improvedHousingPercentage: +(data.improvedHousingPercentage + (Math.random() * 1 - 0.5)).toFixed(1),
          waterAccessPercentage: +(data.waterAccessPercentage + (Math.random() * 1 - 0.5)).toFixed(1),
          electricityAccessPercentage: +(data.electricityAccessPercentage + (Math.random() * 1 - 0.5)).toFixed(1),
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
