"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { GoogleResult, ScholarResult } from "@/services/search-service"
import { useSearch } from "@/hooks/use-search"
import { ExternalLink, Search, BookOpen, Clock, Award } from "lucide-react"

interface SearchResultsProps {
  onResultsFound?: (results: { google: GoogleResult[]; scholar: ScholarResult[] }) => void
  initialQuery?: string
  compact?: boolean
}

export function SearchResults({ onResultsFound, initialQuery = "", compact = false }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery)
  const { googleResults, scholarResults, isSearching, error, metadata, searchBoth, clearResults } = useSearch()

  const handleSearch = async () => {
    if (!query.trim()) return

    await searchBoth(query)

    if (onResultsFound) {
      onResultsFound({
        google: googleResults,
        scholar: scholarResults,
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Card className={compact ? "border-0 shadow-none" : ""}>
      {!compact && (
        <CardHeader>
          <CardTitle>Search for Rwanda Data</CardTitle>
          <CardDescription>Search Google and Google Scholar for the latest information about Rwanda</CardDescription>
        </CardHeader>
      )}

      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {(googleResults.length > 0 || scholarResults.length > 0) && (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                {metadata.google && `${metadata.google.totalResults.toLocaleString()} results`}
                {metadata.scholar && metadata.google && " • "}
                {metadata.scholar && `${metadata.scholar.totalResults.toLocaleString()} scholarly articles`}
              </div>
              <Button variant="ghost" size="sm" onClick={clearResults}>
                Clear Results
              </Button>
            </div>

            <Tabs defaultValue="google">
              <TabsList className="mb-4">
                <TabsTrigger value="google" disabled={googleResults.length === 0}>
                  <Search className="h-4 w-4 mr-2" />
                  Google
                  {googleResults.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {googleResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="scholar" disabled={scholarResults.length === 0}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Scholar
                  {scholarResults.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {scholarResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="google" className="space-y-4">
                {googleResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center"
                        >
                          {result.title}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </h3>
                      {result.date && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {result.date}
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-1">{result.snippet}</p>
                    <div className="text-xs text-muted-foreground mt-2">{result.source}</div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="scholar" className="space-y-4">
                {scholarResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center"
                        >
                          {result.title}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </h3>
                      {result.year && <Badge variant="outline">{result.year}</Badge>}
                    </div>
                    <p className="text-sm mt-1">{result.snippet}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground">{result.publication}</div>
                      {result.citedBy > 0 && (
                        <div className="flex items-center text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Cited by {result.citedBy}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}
