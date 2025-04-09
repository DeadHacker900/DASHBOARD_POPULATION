"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare, Zap } from "lucide-react"

export function AiInsights() {
  const [query, setQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState<string[]>([])

  const handleGenerateInsight = async () => {
    if (!query.trim()) return

    setIsGenerating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add the new insight
    setInsights([
      `Analysis of "${query}": Based on the demographic and health data, we can observe significant correlations between urbanization rates and improved health outcomes, particularly in maternal health indicators.`,
      ...insights,
    ])

    setIsGenerating(false)
    setQuery("")
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center text-base">
          <Zap className="mr-2 h-5 w-5 text-yellow-500" />
          AI-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-query">Ask a question about the data</Label>
            <div className="flex space-x-2">
              <Input
                id="ai-query"
                placeholder="e.g., What factors are driving urbanization?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-slate-800/50 border-slate-700/50"
              />
              <Button size="icon" onClick={handleGenerateInsight} disabled={isGenerating || !query.trim()}>
                {isGenerating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {insights.length > 0 && (
            <div className="space-y-3 mt-4">
              <Label>Generated Insights</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {insights.map((insight, index) => (
                  <div key={index} className="bg-slate-800/50 p-3 rounded-md border border-slate-700/50 text-sm">
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-slate-500 italic">
          Powered by AI analysis of demographic and health data patterns
        </div>
      </CardFooter>
    </Card>
  )
}
