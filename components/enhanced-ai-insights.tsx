"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  LineChart,
  PieChart,
  Map,
  Brain,
  BookOpen,
  Lightbulb,
  BarChart3,
  Clock,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useEnhancedAiInsights, type InsightType } from "@/hooks/use-enhanced-ai-insights"
import { SearchResults } from "@/components/search-results"
import type { GoogleResult, ScholarResult } from "@/services/search-service"

export function EnhancedAiInsights() {
  const [query, setQuery] = useState("")
  const [insightType, setInsightType] = useState<InsightType>("demographic")
  const [depth, setDepth] = useState<"summary" | "detailed" | "expert">("detailed")
  const [useSearch, setUseSearch] = useState(true)
  const [searchResults, setSearchResults] = useState<{
    google: GoogleResult[]
    scholar: ScholarResult[]
  } | null>(null)

  const {
    insights,
    currentInsight,
    isGenerating,
    error,
    generateInsight,
    clearInsights,
    removeInsight,
    setActiveInsight,
  } = useEnhancedAiInsights()

  const handleGenerateInsight = async () => {
    if (!query.trim()) return

    await generateInsight(query, insightType, depth)
  }

  const handleSearchResults = (results: { google: GoogleResult[]; scholar: ScholarResult[] }) => {
    setSearchResults(results)
  }

  const getInsightTypeIcon = (type: InsightType) => {
    switch (type) {
      case "demographic":
        return <BarChart className="h-4 w-4" />
      case "health":
        return <FileText className="h-4 w-4" />
      case "housing":
        return <Map className="h-4 w-4" />
      case "education":
        return <BookOpen className="h-4 w-4" />
      case "economic":
        return <LineChart className="h-4 w-4" />
      case "prediction":
        return <Brain className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate AI Insights</CardTitle>
            <CardDescription>Ask questions about Rwanda's demographic and health data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Question</label>
              <Textarea
                placeholder="e.g., What are the trends in child mortality rates across provinces?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Insight Type</label>
                <Select value={insightType} onValueChange={(value) => setInsightType(value as InsightType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demographic">Demographics</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="economic">Economic</SelectItem>
                    <SelectItem value="prediction">Prediction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Depth</label>
                <Select value={depth} onValueChange={(value) => setDepth(value as "summary" | "detailed" | "expert")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select depth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="use-search"
                checked={useSearch}
                onChange={(e) => setUseSearch(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="use-search" className="text-sm">
                Enhance with Google & Scholar search
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={clearInsights} disabled={insights.length === 0}>
              Clear All
            </Button>
            <Button onClick={handleGenerateInsight} disabled={isGenerating || !query.trim()}>
              {isGenerating ? "Generating..." : "Generate Insight"}
            </Button>
          </CardFooter>
        </Card>

        {useSearch && <SearchResults onResultsFound={handleSearchResults} initialQuery={query} />}

        {insights.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Previous Insights</CardTitle>
              <CardDescription>
                {insights.length} insight{insights.length !== 1 ? "s" : ""} generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                      currentInsight?.id === insight.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveInsight(insight.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate max-w-[200px]">{insight.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeInsight(insight.id)
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(insight.timestamp).toLocaleString()}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {insight.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {insight.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{insight.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="lg:col-span-2">
        {currentInsight ? (
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{currentInsight.title}</CardTitle>
                  <CardDescription>Generated on {new Date(currentInsight.timestamp).toLocaleString()}</CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge
                    variant={currentInsight.confidence > 80 ? "default" : "secondary"}
                    className="flex items-center"
                  >
                    {currentInsight.confidence > 80 ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {currentInsight.confidence}% confidence
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {currentInsight.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="content">
                <TabsList>
                  <TabsTrigger value="content">
                    <FileText className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="highlights">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Highlights
                  </TabsTrigger>
                  <TabsTrigger value="sources">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Sources
                  </TabsTrigger>
                  <TabsTrigger value="visualizations">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Visualizations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-4">
                  <div className="prose max-w-none">
                    <p>{currentInsight.content}</p>
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Generated using {currentInsight.model}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="highlights" className="mt-4">
                  <div className="space-y-4">
                    {currentInsight.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          {i + 1}
                        </div>
                        <div>{highlight}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="mt-4">
                  <div className="space-y-2">
                    {currentInsight.sources.map((source, i) => (
                      <div key={i} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        <div>{source}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="visualizations" className="mt-4">
                  {currentInsight.visualizationSuggestions && currentInsight.visualizationSuggestions.length > 0 ? (
                    <div className="space-y-4">
                      {currentInsight.visualizationSuggestions.map((viz, i) => (
                        <Card key={i}>
                          <CardHeader className="py-3">
                            <CardTitle className="text-base">{viz.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-start">
                              {viz.type === "bar" && <BarChart3 className="h-10 w-10 mr-3 text-primary" />}
                              {viz.type === "line" && <LineChart className="h-10 w-10 mr-3 text-primary" />}
                              {viz.type === "pie" && <PieChart className="h-10 w-10 mr-3 text-primary" />}
                              {viz.type === "map" && <Map className="h-10 w-10 mr-3 text-primary" />}
                              <div>
                                <div className="font-medium">
                                  {viz.type.charAt(0).toUpperCase() + viz.type.slice(1)} Chart
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">{viz.description}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No visualization suggestions available</div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Insight Selected</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Generate an insight using the form on the left, or select a previously generated insight to view it
                here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
