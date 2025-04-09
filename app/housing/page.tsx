"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, FileText, ArrowUp, Home, Building, Droplet, Zap } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useHousingData } from "@/hooks/use-housing-data"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HousingTypeChart } from "@/components/charts/housing-type-chart"
import { HousingQualityMap } from "@/components/charts/housing-quality-map"
import { UtilityAccessChart } from "@/components/charts/utility-access-chart"
import { HousingTrendsChart } from "@/components/charts/housing-trends-chart"
import { UrbanRuralComparisonChart } from "@/components/charts/urban-rural-comparison-chart"

export default function HousingPage() {
  const [region, setRegion] = useState("national")
  const [year, setYear] = useState("2022")
  const [activeTab, setActiveTab] = useState("housing-types")
  const { toast } = useToast()

  const { data, isLoading, error, refreshData, downloadData, generateReport } = useHousingData(region, year)

  const handleRegionChange = (value: string) => {
    setRegion(value)
  }

  const handleYearChange = (value: string) => {
    setYear(value)
  }

  const handleRefresh = async () => {
    await refreshData()
    toast({
      title: "Data Refreshed",
      description: "Housing data has been updated successfully.",
    })
  }

  const handleDownload = async () => {
    await downloadData("housing", "csv")
    toast({
      title: "Download Started",
      description: "Housing data is being downloaded in CSV format.",
    })
  }

  const handleGenerateReport = async () => {
    await generateReport("housing")
    toast({
      title: "Report Generated",
      description: "Housing report has been generated successfully.",
    })
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-slate-300 mb-4">There was an error loading the housing data.</p>
          <Button onClick={refreshData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Housing Analysis</h1>

        <div className="flex items-center space-x-4">
          <Select value={region} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700/50 text-slate-200">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="national">National</SelectItem>
              <SelectItem value="kigali">Kigali City</SelectItem>
              <SelectItem value="eastern">Eastern Province</SelectItem>
              <SelectItem value="southern">Southern Province</SelectItem>
              <SelectItem value="western">Western Province</SelectItem>
              <SelectItem value="northern">Northern Province</SelectItem>
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px] bg-slate-800/50 border-slate-700/50 text-slate-200">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2012">2012</SelectItem>
              <SelectItem value="2002">2002</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                {data?.improvedHousingPercentage || "62.8"}%
              </Badge>
              Improved Housing
              <span className="ml-2 text-green-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">Percentage of households with improved housing conditions.</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-purple-500/20 text-purple-400 border-purple-500/50">
                {data?.waterAccessPercentage || "76.4"}%
              </Badge>
              Clean Water Access
              <span className="ml-2 text-green-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">Percentage of households with access to clean water.</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-blue-500/20 text-blue-400 border-blue-500/50">
                {data?.electricityAccessPercentage || "52.8"}%
              </Badge>
              Electricity Access
              <span className="ml-2 text-amber-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">Percentage of households with access to electricity.</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-green-500/20 text-green-400 border-green-500/50">
                {data?.improvedSanitationPercentage || "86.2"}%
              </Badge>
              Improved Sanitation
              <span className="ml-2 text-green-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">Percentage of households with improved sanitation facilities.</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Housing Analysis</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={handleDownload}>
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="text-xs" onClick={handleGenerateReport}>
                  <FileText className="mr-1 h-3 w-3" />
                  Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="housing-types" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800/50 mb-4">
                <TabsTrigger value="housing-types">Housing Types</TabsTrigger>
                <TabsTrigger value="housing-quality">Housing Quality Map</TabsTrigger>
                <TabsTrigger value="utility-access">Utility Access</TabsTrigger>
                <TabsTrigger value="housing-trends">Housing Trends</TabsTrigger>
                <TabsTrigger value="urban-rural">Urban/Rural Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="housing-types" className="mt-0">
                <div className="h-[400px]">
                  <HousingTypeChart data={data?.housingTypeData} />
                </div>
              </TabsContent>

              <TabsContent value="housing-quality" className="mt-0">
                <div className="h-[400px]">
                  <HousingQualityMap data={data?.housingQualityData} />
                </div>
              </TabsContent>

              <TabsContent value="utility-access" className="mt-0">
                <div className="h-[400px]">
                  <UtilityAccessChart data={data?.utilityAccessData} />
                </div>
              </TabsContent>

              <TabsContent value="housing-trends" className="mt-0">
                <div className="h-[400px]">
                  <HousingTrendsChart data={data?.housingTrendsData} />
                </div>
              </TabsContent>

              <TabsContent value="urban-rural" className="mt-0">
                <div className="h-[400px]">
                  <UrbanRuralComparisonChart data={data?.urbanRuralComparisonData} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Housing Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.housingMaterials?.map((material, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-400">{material.type}</div>
                    <div className="text-xs text-cyan-400">{material.percentage}%</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${material.color} rounded-full`}
                      style={{ width: `${material.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{material.description}</div>
                </div>
              )) || (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Cement/Concrete Walls</div>
                      <div className="text-xs text-cyan-400">42.3%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: "42.3%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Modern construction material</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Mud Brick Walls</div>
                      <div className="text-xs text-purple-400">38.7%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "38.7%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Traditional construction material</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Metal Roofing</div>
                      <div className="text-xs text-green-400">78.5%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: "78.5%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Most common roofing material</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Cement Flooring</div>
                      <div className="text-xs text-blue-400">35.2%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: "35.2%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Improved flooring material</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Housing Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.housingAmenities?.map((amenity, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {amenity.icon === "water" ? (
                        <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                      ) : amenity.icon === "electricity" ? (
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                      ) : amenity.icon === "toilet" ? (
                        <Home className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Building className="h-4 w-4 mr-2 text-purple-500" />
                      )}
                      <div className="text-sm text-slate-400">{amenity.type}</div>
                    </div>
                    <div className="text-xs text-cyan-400">{amenity.percentage}%</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${amenity.color} rounded-full`}
                      style={{ width: `${amenity.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )) || (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                        <div className="text-sm text-slate-400">Piped Water</div>
                      </div>
                      <div className="text-xs text-cyan-400">32.5%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: "32.5%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                        <div className="text-sm text-slate-400">Grid Electricity</div>
                      </div>
                      <div className="text-xs text-cyan-400">46.7%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
                        style={{ width: "46.7%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-green-500" />
                        <div className="text-sm text-slate-400">Flush Toilet</div>
                      </div>
                      <div className="text-xs text-cyan-400">12.8%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: "12.8%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-purple-500" />
                        <div className="text-sm text-slate-400">Improved Pit Latrine</div>
                      </div>
                      <div className="text-xs text-cyan-400">73.4%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "73.4%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                        <div className="text-sm text-slate-400">Solar Electricity</div>
                      </div>
                      <div className="text-xs text-cyan-400">6.1%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: "6.1%" }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
