import { NextResponse } from "next/server"

// Define the SerpAPI base URL
const SERPAPI_BASE_URL = "https://serpapi.com/search"

// Define the search types
type SearchType = "google" | "scholar"

export async function POST(request: Request) {
  try {
    const { query, type = "google" } = await request.json()

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query is required",
        },
        { status: 400 },
      )
    }

    // Construct the search URL based on the type
    const searchParams = new URLSearchParams({
      q: `${query} Rwanda`,
      api_key: process.env.SERPAPI_KEY || "777efdd7b8ed7201f33c5d87b4326203566645fcabb4a5e220804b1958ad9baa",
      engine: type === "scholar" ? "google_scholar" : "google",
    })

    if (type === "scholar") {
      searchParams.append("num", "5")
    } else {
      searchParams.append("num", "10")
    }

    // Make the request to SerpAPI
    const response = await fetch(`${SERPAPI_BASE_URL}?${searchParams.toString()}`)

    if (!response.ok) {
      throw new Error(`SerpAPI request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Process the results based on the search type
    let processedResults

    if (type === "scholar") {
      processedResults = processScholarResults(data)
    } else {
      processedResults = processGoogleResults(data)
    }

    return NextResponse.json({
      success: true,
      results: processedResults,
      metadata: {
        totalResults: data.search_information?.total_results || 0,
        searchTime: data.search_information?.time_taken_displayed || 0,
        query: query,
        type: type,
      },
    })
  } catch (error) {
    console.error("Error in search API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to perform search",
      },
      { status: 500 },
    )
  }
}

// Process Google Scholar results
function processScholarResults(data: any) {
  if (!data.organic_results) {
    return []
  }

  return data.organic_results.map((result: any) => ({
    title: result.title,
    link: result.link,
    snippet: result.snippet,
    publication: result.publication_info?.summary || "",
    authors: result.publication_info?.authors?.map((a: any) => a.name) || [],
    citedBy: result.inline_links?.cited_by?.total || 0,
    year: extractYear(result.publication_info?.summary || ""),
    type: "scholar",
  }))
}

// Process Google Search results
function processGoogleResults(data: any) {
  if (!data.organic_results) {
    return []
  }

  return data.organic_results.map((result: any) => ({
    title: result.title,
    link: result.link,
    snippet: result.snippet,
    source: result.source,
    date: result.date,
    type: "google",
  }))
}

// Helper function to extract year from publication info
function extractYear(text: string): number | null {
  const yearMatch = text.match(/\b(19|20)\d{2}\b/)
  return yearMatch ? Number.parseInt(yearMatch[0]) : null
}
