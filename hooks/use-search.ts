"use client"

import { useState, useCallback } from "react"
import { searchService, type GoogleResult, type ScholarResult } from "@/services/search-service"

export function useSearch() {
  const [googleResults, setGoogleResults] = useState<GoogleResult[]>([])
  const [scholarResults, setScholarResults] = useState<ScholarResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{
    google?: { totalResults: number; searchTime: number }
    scholar?: { totalResults: number; searchTime: number }
  }>({})

  // Search Google
  const searchGoogle = useCallback(async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const response = await searchService.searchGoogle(query)

      if (response.success) {
        setGoogleResults(response.results as GoogleResult[])
        setMetadata((prev) => ({
          ...prev,
          google: {
            totalResults: response.metadata.totalResults,
            searchTime: response.metadata.searchTime,
          },
        }))
      } else {
        setError("Failed to search Google. Please try again.")
      }
    } catch (err) {
      console.error("Error searching Google:", err)
      setError("An error occurred while searching Google.")
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Search Google Scholar
  const searchScholar = useCallback(async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const response = await searchService.searchScholar(query)

      if (response.success) {
        setScholarResults(response.results as ScholarResult[])
        setMetadata((prev) => ({
          ...prev,
          scholar: {
            totalResults: response.metadata.totalResults,
            searchTime: response.metadata.searchTime,
          },
        }))
      } else {
        setError("Failed to search Google Scholar. Please try again.")
      }
    } catch (err) {
      console.error("Error searching Google Scholar:", err)
      setError("An error occurred while searching Google Scholar.")
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Search both Google and Google Scholar
  const searchBoth = useCallback(async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const { google, scholar } = await searchService.searchBoth(query)

      if (google.success) {
        setGoogleResults(google.results as GoogleResult[])
        setMetadata((prev) => ({
          ...prev,
          google: {
            totalResults: google.metadata.totalResults,
            searchTime: google.metadata.searchTime,
          },
        }))
      }

      if (scholar.success) {
        setScholarResults(scholar.results as ScholarResult[])
        setMetadata((prev) => ({
          ...prev,
          scholar: {
            totalResults: scholar.metadata.totalResults,
            searchTime: scholar.metadata.searchTime,
          },
        }))
      }

      if (!google.success && !scholar.success) {
        setError("Failed to search. Please try again.")
      }
    } catch (err) {
      console.error("Error searching:", err)
      setError("An error occurred while searching.")
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Clear all search results
  const clearResults = useCallback(() => {
    setGoogleResults([])
    setScholarResults([])
    setMetadata({})
  }, [])

  return {
    googleResults,
    scholarResults,
    isSearching,
    error,
    metadata,
    searchGoogle,
    searchScholar,
    searchBoth,
    clearResults,
  }
}
