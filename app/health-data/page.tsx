"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, FileText, ArrowUp, ArrowDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useHealthData } from "@/hooks/use-health-data"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ChildMortalityChart } from "@/components/charts/child-mortality-chart"
import { MaternalHealthChart } from "@/components/charts/maternal-health-chart"
import { VaccinationCoverageChart } from "@/components/charts/vaccination-coverage-chart"
import { HealthcareAccessChart } from "@/components/charts/healthcare-access-chart"
import { DiseasePrevalenceChart } from "@/components/charts/disease-prevalence-chart"

export default function HealthDataPage() {
  const [region, setRegion] = useState("national")
  const [year, setYear] = useState("2022")
  const [activeTab, setActiveTab] = useState("child-mortality")
  const { toast } = useToast()

  const { data, isLoading, error, refreshData, downloadData, generateReport } = useHealthData(region, year)

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
      description: "Health data has been updated successfully.",
    })
  }

  const handleDownload = async () => {
    await downloadData("health", "csv")
    toast({
      title: "Download Started",
      description: "Health data is being downloaded in CSV format.",
    })
  }

  const handleGenerateReport = async () => {
    await generateReport("health")
    toast({
      title: "Report Generated",
      description: "Health report has been generated successfully.",
    })
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-slate-300 mb-4">There was an error loading the health data.</p>
          <Button onClick={refreshData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Health Data Analysis</h1>

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
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2015">2015</SelectItem>
              <SelectItem value="2010">2010</SelectItem>
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
                {data?.childMortality || "45"}
              </Badge>
              Child Mortality
              <span className="ml-2 text-green-400">
                <ArrowDown className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">Deaths per 1,000 live births for children under 5 years.</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-purple-500/20 text-purple-400 border-purple-500/50">
                {data?.maternalMortality || "248"}
              </Badge>
              Maternal Mortality
              <span className="ml-2 text-green-400">
                <ArrowDown className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Deaths per 100,000 live births related to pregnancy or childbirth.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-blue-500/20 text-blue-400 border-blue-500/50">
                {data?.vaccinationCoverage || "95"}%
              </Badge>
              Vaccination Coverage
              <span className="ml-2 text-amber-400">
                <ArrowUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">Percentage of children who received all recommended vaccines.</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Health Indicators</CardTitle>
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
            <Tabs defaultValue="child-mortality" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800/50 mb-4">
                <TabsTrigger value="child-mortality">Child Mortality</TabsTrigger>
                <TabsTrigger value="maternal-health">Maternal Health</TabsTrigger>
                <TabsTrigger value="vaccination">Vaccination Coverage</TabsTrigger>
                <TabsTrigger value="healthcare-access">Healthcare Access</TabsTrigger>
                <TabsTrigger value="disease-prevalence">Disease Prevalence</TabsTrigger>
              </TabsList>

              <TabsContent value="child-mortality" className="mt-0">
                <div className="h-[400px]">
                  <ChildMortalityChart data={data?.childMortalityData} />
                </div>
              </TabsContent>

              <TabsContent value="maternal-health" className="mt-0">
                <div className="h-[400px]">
                  <MaternalHealthChart data={data?.maternalHealthData} />
                </div>
              </TabsContent>

              <TabsContent value="vaccination" className="mt-0">
                <div className="h-[400px]">
                  <VaccinationCoverageChart data={data?.vaccinationData} />
                </div>
              </TabsContent>

              <TabsContent value="healthcare-access" className="mt-0">
                <div className="h-[400px]">
                  <HealthcareAccessChart data={data?.healthcareAccessData} />
                </div>
              </TabsContent>

              <TabsContent value="disease-prevalence" className="mt-0">
                <div className="h-[400px]">
                  <DiseasePrevalenceChart data={data?.diseasePrevalenceData} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Health Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.healthFacilities?.map((facility, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-400">{facility.type}</div>
                    <div className="text-xs text-cyan-400">{facility.count}</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${facility.color} rounded-full`}
                      style={{ width: `${facility.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{facility.description}</div>
                </div>
              )) || (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Hospitals</div>
                      <div className="text-xs text-cyan-400">48</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Major medical centers</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Health Centers</div>
                      <div className="text-xs text-purple-400">512</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Primary healthcare facilities</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Health Posts</div>
                      <div className="text-xs text-amber-400">167</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Community-based facilities</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Health Insurance Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.healthInsurance?.map((insurance, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-400">{insurance.type}</div>
                    <div className="text-xs text-cyan-400">{insurance.percentage}%</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${insurance.color} rounded-full`}
                      style={{ width: `${insurance.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )) || (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Community-Based Health Insurance</div>
                      <div className="text-xs text-cyan-400">85.3%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: "85.3%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">RAMA (Public Servants)</div>
                      <div className="text-xs text-purple-400">7.2%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "7.2%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">MMI (Military Medical Insurance)</div>
                      <div className="text-xs text-green-400">2.1%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: "2.1%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">Private Insurance</div>
                      <div className="text-xs text-blue-400">1.8%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: "1.8%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-slate-400">No Insurance</div>
                      <div className="text-xs text-red-400">3.6%</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                        style={{ width: "3.6%" }}
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
