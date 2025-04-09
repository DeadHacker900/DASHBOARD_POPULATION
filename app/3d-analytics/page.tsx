"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, CuboidIcon as Cube, RotateCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { PopulationDensity3D } from "@/components/charts/population-density-3d"
import { HealthIndicators3D } from "@/components/charts/health-indicators-3d"
import { RegionalComparison3D } from "@/components/charts/regional-comparison-3d"
import { TemporalTrends3D } from "@/components/charts/temporal-trends-3d"

export default function ThreeDAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("population")
  const [rotationSpeed, setRotationSpeed] = useState("medium")
  const { toast } = useToast()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Data Refreshed",
        description: "3D visualizations have been updated successfully.",
      })
    }, 1500)
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "3D visualization data is being downloaded.",
    })
  }

  const handleRotationSpeedChange = (value: string) => {
    setRotationSpeed(value)
    toast({
      title: "Rotation Speed Updated",
      description: `Visualization rotation speed set to ${value}.`,
    })
  }

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center">
          <Cube className="mr-2 h-6 w-6 text-cyan-500" />
          3D Analytics
        </h1>

        <div className="flex items-center space-x-4">
          <Select value={rotationSpeed} onValueChange={handleRotationSpeedChange}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700/50 text-slate-200">
              <SelectValue placeholder="Rotation Speed" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="slow">Slow Rotation</SelectItem>
              <SelectItem value="medium">Medium Rotation</SelectItem>
              <SelectItem value="fast">Fast Rotation</SelectItem>
              <SelectItem value="none">No Rotation</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
        <CardHeader className="pb-2 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100">3D Data Visualization</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-xs" onClick={handleDownload}>
                <Download className="mr-1 h-3 w-3" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center">
                <RotateCw className="mr-1 h-3 w-3" />
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                {rotationSpeed === "none" ? "Static" : `${rotationSpeed} rotation`}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="population" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800/50 mb-4">
              <TabsTrigger value="population">Population Density</TabsTrigger>
              <TabsTrigger value="health">Health Indicators</TabsTrigger>
              <TabsTrigger value="regional">Regional Comparison</TabsTrigger>
              <TabsTrigger value="temporal">Temporal Trends</TabsTrigger>
            </TabsList>

            <div className="h-[500px] bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
              <TabsContent value="population" className="mt-0 h-full">
                <PopulationDensity3D rotationSpeed={rotationSpeed} />
              </TabsContent>

              <TabsContent value="health" className="mt-0 h-full">
                <HealthIndicators3D rotationSpeed={rotationSpeed} />
              </TabsContent>

              <TabsContent value="regional" className="mt-0 h-full">
                <RegionalComparison3D rotationSpeed={rotationSpeed} />
              </TabsContent>

              <TabsContent value="temporal" className="mt-0 h-full">
                <TemporalTrends3D rotationSpeed={rotationSpeed} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Visualization Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-400">
              <p>
                <span className="text-slate-200 font-medium">Mouse Controls:</span> Click and drag to rotate the
                visualization. Use the scroll wheel to zoom in and out.
              </p>
              <p>
                <span className="text-slate-200 font-medium">Touch Controls:</span> Use one finger to rotate, two
                fingers to pan, and pinch to zoom in and out.
              </p>
              <p>
                <span className="text-slate-200 font-medium">Keyboard Controls:</span> Use arrow keys to rotate, + and -
                keys to zoom, and spacebar to reset the view.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Data Layers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-cyan-500 mr-2"></div>
                  <span className="text-sm text-slate-400">Population Density</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-slate-400">Health Facilities</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm text-slate-400">Administrative Boundaries</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-slate-400">Temporal Data</span>
                </div>
                <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">Inactive</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Visualization Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-400">
              <p>
                These 3D visualizations provide spatial and temporal insights into Rwanda's demographic and health data,
                allowing for intuitive exploration of complex relationships between different variables.
              </p>
              <p>
                Data is sourced from the 2022 Rwanda Population Census, Demographic Health Surveys, and administrative
                records from the Ministry of Health and National Institute of Statistics of Rwanda.
              </p>
              <div className="pt-2 border-t border-slate-700/50 mt-2">
                <p className="text-xs text-slate-500">
                  Powered by Three.js and WebGL. For optimal performance, use a modern browser with hardware
                  acceleration enabled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
