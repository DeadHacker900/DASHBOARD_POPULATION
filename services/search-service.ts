// Define the types for search results
export interface GoogleResult {
  title: string
  link: string
  snippet: string
  source: string
  date?: string
  type: "google"
}

export interface ScholarResult {
  title: string
  link: string
  snippet: string
  publication: string
  authors: string[]
  citedBy: number
  year: number | null
  type: "scholar"
}

export type SearchResult = GoogleResult | ScholarResult

export interface SearchMetadata {
  totalResults: number
  searchTime: number
  query: string
  type: "google" | "scholar"
}

export interface SearchResponse {
  success: boolean
  results: SearchResult[]
  metadata: SearchMetadata
}

export class SearchService {
  private static instance: SearchService

  // Singleton pattern
  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService()
    }
    return SearchService.instance
  }

  // Search Google
  public async searchGoogle(query: string): Promise<SearchResponse> {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          type: "google",
        }),
      })

      if (!response.ok) {
        throw new Error(`Search request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error searching Google:", error)
      return {
        success: false,
        results: [],
        metadata: {
          totalResults: 0,
          searchTime: 0,
          query,
          type: "google",
        },
      }
    }
  }

  // Search Google Scholar
  public async searchScholar(query: string): Promise<SearchResponse> {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          type: "scholar",
        }),
      })

      if (!response.ok) {
        throw new Error(`Search request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error searching Google Scholar:", error)
      return {
        success: false,
        results: [],
        metadata: {
          totalResults: 0,
          searchTime: 0,
          query,
          type: "scholar",
        },
      }
    }
  }

  // Search both Google and Google Scholar
  public async searchBoth(query: string): Promise<{
    google: SearchResponse
    scholar: SearchResponse
  }> {
    const [googleResults, scholarResults] = await Promise.all([this.searchGoogle(query), this.searchScholar(query)])

    return {
      google: googleResults,
      scholar: scholarResults,
    }
  }
}

// Export a singleton instance
export const searchService = SearchService.getInstance()
