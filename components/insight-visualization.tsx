"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, Map, ScatterChartIcon as ScatterPlot } from "lucide-react"
import { ChartContainer } from "@/components/ui/chart"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"

// Import the Insight type from our hook
import type { Insight } from "@/hooks/use-enhanced-ai-insights"

interface InsightVisualizationProps {
  insight: Insight
}

export function InsightVisualization({ insight }: InsightVisualizationProps) {
  const [activeVisualization, setActiveVisualization] = useState(0)

  if (!insight.visualizationSuggestions || insight.visualizationSuggestions.length === 0) {
    return null
  }

  // Generate sample data based on the visualization type
  const generateData = (type: "bar" | "line" | "pie" | "map" | "scatter") => {
    switch (type) {
      case "bar":
        return [
          { name: "Kigali", value: 85 },
          { name: "Northern", value: 62 },
          { name: "Southern", value: 58 },
          { name: "Eastern", value: 67 },
          { name: "Western", value: 55 },
        ]
      case "line":
        return [
          { year: 2000, value: 100 },
          { year: 2005, value: 85 },
          { year: 2010, value: 72 },
          { year: 2015, value: 56 },
          { year: 2020, value: 43 },
          { year: 2022, value: 38 },
        ]
      case "pie":
        return [
          { name: "Improved", value: 62.8 },
          { name: "Semi-improved", value: 24.5 },
          { name: "Traditional", value: 12.7 },
        ]
      case "scatter":
        return [
          { x: 25, y: 82, name: "Kigali" },
          { x: 45, y: 65, name: "Northern" },
          { x: 55, y: 58, name: "Southern" },
          { x: 40, y: 70, name: "Eastern" },
          { x: 60, y: 52, name: "Western" },
        ]
      case "map":
        // For map, we'll just show a placeholder since we can't render a real map easily
        return []
      default:
        return []
    }
  }

  // Colors for charts
  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"]

  // Render the appropriate chart based on the visualization type
  const renderVisualization = (type: "bar" | "line" | "pie" | "map" | "scatter", index: number) => {
    const data = generateData(type)

    switch (type) {
      case "bar":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="var(--color-value)" name="Value" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "line":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="var(--color-value)" name="Value" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "pie":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "scatter":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="X Value" />
                <YAxis type="number" dataKey="y" name="Y Value" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter name="Provinces" data={data} fill="#f59e0b" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "map":
        return (
          <div className="flex items-center justify-center h-80 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-center">
              <Map className="h-12 w-12 mx-auto mb-4 text-amber-500/50" />
              <p className="text-slate-400">Interactive map visualization</p>
              <p className="text-xs text-slate-500 mt-2">Geographic data visualization would appear here</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardContent className="p-4">
        <Tabs
          defaultValue={`viz-${activeVisualization}`}
          onValueChange={(value) => setActiveVisualization(Number.parseInt(value.split("-")[1]))}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 sm:flex sm:flex-wrap">
            {insight.visualizationSuggestions.map((viz, index) => (
              <TabsTrigger
                key={index}
                value={`viz-${index}`}
                className="data-[state=active]:bg-amber-600 flex items-center"
              >
                {viz.type === "bar" && <BarChart className="mr-2 h-4 w-4" />}
                {viz.type === "line" && <LineChart className="mr-2 h-4 w-4" />}
                {viz.type === "pie" && <PieChart className="mr-2 h-4 w-4" />}
                {viz.type === "map" && <Map className="mr-2 h-4 w-4" />}
                {viz.type === "scatter" && <ScatterPlot className="mr-2 h-4 w-4" />}
                {index === 0 ? "Primary" : "Alternative"} View
              </TabsTrigger>
            ))}
          </TabsList>

          {insight.visualizationSuggestions.map((viz, index) => (
            <TabsContent key={index} value={`viz-${index}`} className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-200">{viz.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{viz.description}</p>
              </div>

              {renderVisualization(viz.type, index)}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
