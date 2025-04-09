"use client"

import { EnhancedAiInsights } from "@/components/enhanced-ai-insights"

export default function InsightsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Insights</h1>
        <p className="text-muted-foreground mt-2">
          Generate AI-powered insights from Rwanda's demographic and health data
        </p>
      </div>

      <EnhancedAiInsights />
    </div>
  )
}
