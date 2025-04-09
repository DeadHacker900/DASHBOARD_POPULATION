"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

interface HealthFacility {
  type: string
  count: number
  percentage: number
  description: string
  color: string
}

interface HealthInsurance {
  type: string
  percentage: number
  color: string
}

interface HealthData {
  childMortality: number
  maternalMortality: number
  vaccinationCoverage: number

  healthFacilities: HealthFacility[]
  healthInsurance: HealthInsurance[]

  childMortalityData: any
  maternalHealthData: any
  vaccinationData: any
  healthcareAccessData: any
  diseasePrevalenceData: any
}

export function useHealthData(region: string, year: string) {
  const [data, setData] = useState<HealthData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch data based on region and year
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call
        // await fetch(`/api/health?region=${region}&year=${year}`)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockData: HealthData = {
          childMortality: region === "kigali" ? 38 : region === "southern" ? 52 : 45,
          maternalMortality: region === "kigali" ? 203 : region === "southern" ? 287 : 248,
          vaccinationCoverage: region === "kigali" ? 98 : region === "southern" ? 92 : 95,

          healthFacilities: [
            {
              type: "Hospitals",
              count: region === "kigali" ? 18 : 48,
              percentage: region === "kigali" ? 38 : 15,
              description: "Major medical centers",
              color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            {
              type: "Health Centers",
              count: region === "kigali" ? 87 : 512,
              percentage: region === "kigali" ? 42 : 65,
              description: "Primary healthcare facilities",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              type: "Health Posts",
              count: region === "kigali" ? 32 : 167,
              percentage: region === "kigali" ? 20 : 20,
              description: "Community-based facilities",
              color: "bg-gradient-to-r from-amber-500 to-orange-500",
            },
          ],

          healthInsurance: [
            {
              type: "Community-Based Health Insurance",
              percentage: region === "kigali" ? 78.5 : 85.3,
              color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            {
              type: "RAMA (Public Servants)",
              percentage: region === "kigali" ? 12.3 : 7.2,
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              type: "MMI (Military Medical Insurance)",
              percentage: region === "kigali" ? 2.8 : 2.1,
              color: "bg-gradient-to-r from-green-500 to-emerald-500",
            },
            {
              type: "Private Insurance",
              percentage: region === "kigali" ? 4.2 : 1.8,
              color: "bg-gradient-to-r from-blue-500 to-indigo-500",
            },
            {
              type: "No Insurance",
              percentage: region === "kigali" ? 2.2 : 3.6,
              color: "bg-gradient-to-r from-red-500 to-rose-500",
            },
          ],

          childMortalityData: {
            years: ["2000", "2005", "2010", "2015", "2020", "2022"],
            neonatal: [44, 37, 28, 20, 18, 16],
            infant: [107, 86, 59, 32, 29, 26],
            under5: [196, 152, 76, 50, 45, 43],
          },

          maternalHealthData: {
            years: ["2000", "2005", "2010", "2015", "2020", "2022"],
            maternalMortality: [1071, 750, 476, 290, 248, 203],
            skilledBirthAttendance: [31, 39, 69, 91, 96, 98],
            antenatalCare: [92, 94, 98, 99, 99, 99],
          },

          vaccinationData: {
            vaccines: ["BCG", "DPT3", "Polio3", "Measles", "PCV3", "Rotavirus", "HPV"],
            coverage: [99, 98, 98, 95, 97, 96, 93],
            urban: [99, 99, 99, 98, 99, 98, 96],
            rural: [98, 97, 97, 93, 96, 95, 91],
          },

          healthcareAccessData: {
            regions: ["Kigali", "Eastern", "Southern", "Western", "Northern"],
            distances: [1.2, 4.8, 5.2, 6.1, 3.9],
            facilities: [8.2, 3.1, 2.8, 2.5, 3.6],
            satisfaction: [78, 62, 58, 55, 65],
          },

          diseasePrevalenceData: {
            diseases: ["Malaria", "HIV/AIDS", "Tuberculosis", "Respiratory Infections", "Diarrheal Diseases"],
            prevalence: [7.5, 3.0, 0.6, 12.3, 8.7],
            mortality: [2.1, 1.8, 0.4, 3.2, 2.5],
            trend: [-0.8, -0.2, -0.1, -0.3, -0.5],
          },
        }

        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        toast({
          title: "Error",
          description: "Failed to load health data. Please try again.",
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
          childMortality: Math.max(data.childMortality - Math.random() * 2, 10),
          maternalMortality: Math.max(data.maternalMortality - Math.random() * 10, 100),
          vaccinationCoverage: Math.min(data.vaccinationCoverage + Math.random() * 1, 100),
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
