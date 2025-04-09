"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, FileText, ArrowUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useDemographicsData } from "@/hooks/use-demographics-data"
import { LoadingSpinner } from "@/components/loading-spinner"
import { PopulationPyramid } from "@/components/charts/population-pyramid"
import { PopulationDensityMap } from "@/components/charts/population-density-map"
import { PopulationGrowthChart } from "@/components/charts/population-growth-chart"
import { AgeDistributionChart } from "@/components/charts/age-distribution-chart"
import { PopulationProjectionChart } from "@/components/charts/population-projection-chart"

export default function DemographicsPage() {
  const [region, setRegion] = useState("national")
  const [year, setYear] = useState("2022")
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const { data, isLoading, error, refreshData, downloadData, generateReport } = useDemographicsData(region, year)

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
      description: "Demographics data has been updated successfully.",
    })
  }

  const handleDownload = async () => {
    await downloadData("demographics", "csv")
    toast({
      title: "Download Started",
      description: "Demographics data is being downloaded in CSV format.",
    })
  }

  const handleGenerateReport = async () => {
    await generateReport("demographics")
    toast({
      title: "Report Generated",
      description: "Demographics report has been generated successfully.",
    })
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-slate-300 mb-4">There was an error loading the demographics data.</p>
          <Button onClick={refreshData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Demographics Analysis</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                {data?.totalPopulation || "13.2M"}
              </Badge>
              Total Population
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Total population of Rwanda based on the {year} census data.
              {region !== "national" && ` Filtered for ${region.charAt(0).toUpperCase() + region.slice(1)}.`}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-purple-500/20 text-purple-400 border-purple-500/50">
                {data?.populationGrowth || "2.8"}%
              </Badge>
              Population Growth
              <span className="ml-2 text-green-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Annual population growth rate, showing an increase compared to previous years.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-blue-500/20 text-blue-400 border-blue-500/50">
                {data?.populationDensity || "525"}
              </Badge>
              Population Density
              <span className="ml-2 text-amber-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">People per square kilometer, one of the highest in Africa.</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Population Analysis</CardTitle>
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
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800/50 mb-4">
                <TabsTrigger value="overview">Population Pyramid</TabsTrigger>
                <TabsTrigger value="density">Population Density</TabsTrigger>
                <TabsTrigger value="growth">Growth Trends</TabsTrigger>
                <TabsTrigger value="age">Age Distribution</TabsTrigger>
                <TabsTrigger value="projection">Population Projection</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="h-[400px]">
                  <PopulationPyramid data={data?.populationPyramidData} />
                </div>
              </TabsContent>

              <TabsContent value="density" className="mt-0">
                <div className="h-[400px]">
                  <PopulationDensityMap data={data?.populationDensityData} />
                </div>
              </TabsContent>

              <TabsContent value="growth" className="mt-0">
                <div className="h-[400px]">
                  <PopulationGrowthChart data={data?.populationGrowthData} />
                </div>
              </TabsContent>

              <TabsContent value="age" className="mt-0">
                <div className="h-[400px]">
                  <AgeDistributionChart data={data?.ageDistributionData} />
                </div>
              </TabsContent>

              <TabsContent value="projection" className="mt-0">
                <div className="h-[400px]">
                  <PopulationProjectionChart data={data?.populationProjectionData} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Key Demographics Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.keyIndicators?.map((indicator, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-400">{indicator.name}</div>
                    <div className="text-xs text-cyan-400">{indicator.value}</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${indicator.color} rounded-full`}
                      style={{ width: `${indicator.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{indicator.description}</div>
                </div>
              )) || (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Fertility Rate</div>
                      <div className="text-xs text-cyan-400">4.1 births per woman</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Decreasing trend since 2000</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Life Expectancy</div>
                      <div className="text-xs text-purple-400">69.2 years</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Increasing trend since 2000</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Median Age</div>
                      <div className="text-xs text-amber-400">19.7 years</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Young population structure</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Population Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.populationDistribution?.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-400">{item.category}</div>
                    <div className="text-xs text-cyan-400">{item.percentage}%</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              )) || (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Urban Population</div>
                      <div className="text-xs text-cyan-400">17.6%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: "17.6%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Rural Population</div>
                      <div className="text-xs text-purple-400">82.4%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "82.4%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Male Population</div>
                      <div className="text-xs text-green-400">48.2%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: "48.2%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Female Population</div>
                      <div className="text-xs text-blue-400">51.8%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: "51.8%" }}
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
