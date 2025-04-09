"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Building,
  Calendar,
  Download,
  FileText,
  Globe,
  Heart,
  Info,
  LineChart,
  type LucideIcon,
  MapPin,
  MessageSquare,
  Moon,
  RefreshCw,
  Search,
  Shield,
  Sun,
  Thermometer,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { DemographicsChart } from "@/components/charts/demographics-chart"
import { HealthIndicatorsChart } from "@/components/charts/health-indicators-chart"
import { HousingChart } from "@/components/charts/housing-chart"
import { RegionalMapChart } from "@/components/charts/regional-map-chart"
import { TrendChart } from "@/components/charts/trend-chart"
import { AgeDistributionChart } from "@/components/charts/age-distribution-chart"
import { HealthcareAccessChart } from "@/components/charts/healthcare-access-chart"
import { useData } from "@/hooks/use-data"
import { useAiInsights } from "@/hooks/use-ai-insights"
import { useAuth } from "@/hooks/use-auth"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Dashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const region = searchParams.get("region") || "national"
  const year = searchParams.get("year") || "2022"

  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [activeTab, setActiveTab] = useState("demographics")
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [showAiInsightsDialog, setShowAiInsightsDialog] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState<string>("all")
  const [selectedFormat, setSelectedFormat] = useState<string>("csv")
  const [reportType, setReportType] = useState<string>("summary")
  const [aiQuery, setAiQuery] = useState<string>("")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { user, isAuthenticated, login, logout } = useAuth()

  const {
    data,
    isLoading,
    error,
    refreshData,
    dataIntegrity,
    dataCompleteness,
    updateProgress,
    requestUpdate,
    generateReport,
    downloadData,
  } = useData(region, year)

  const { insights, isGeneratingInsight, generateInsight, aiPredictions } = useAiInsights()

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Handle region change
  const handleRegionChange = (newRegion: string) => {
    router.push(`?region=${newRegion}&year=${year}`)
  }

  // Handle year change
  const handleYearChange = (newYear: string) => {
    router.push(`?region=${region}&year=${newYear}`)
  }

  // Handle report generation
  const handleGenerateReport = async () => {
    try {
      await generateReport(reportType)
      toast({
        title: "Report Generated",
        description: `Your ${reportType} report has been generated successfully.`,
      })
      setShowReportDialog(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle data download
  const handleDownloadData = async () => {
    try {
      await downloadData(selectedDataset, selectedFormat)
      toast({
        title: "Download Started",
        description: `Your ${selectedDataset} data is being downloaded in ${selectedFormat} format.`,
      })
      setShowDownloadDialog(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download data. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle AI insight generation
  const handleGenerateAiInsight = async () => {
    if (!aiQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a query for AI analysis.",
        variant: "destructive",
      })
      return
    }

    try {
      await generateInsight(aiQuery)
      toast({
        title: "AI Insight Generated",
        description: "Your AI insight has been generated successfully.",
      })
      setShowAiInsightsDialog(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI insight. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle data update request
  const handleRequestUpdate = async () => {
    try {
      await requestUpdate()
      toast({
        title: "Update Requested",
        description: "Your data update request has been submitted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request data update. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 flex items-center justify-center">
        <Card className="w-[400px] bg-slate-900/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-red-400">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">There was an error loading the dashboard data. Please try again later.</p>
            <Button className="mt-4 w-full" onClick={() => refreshData()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && <LoadingSpinner />}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              RWANDA CENSUS & HEALTH DATA
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search data..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
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

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={user?.image || "/placeholder.svg?height=40&width=40"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-slate-700 text-cyan-500">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={login}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}

          {/* Main dashboard */}
          <div className="col-span-12 lg:col-span-9">
            <div className="grid gap-6">
              {/* Demographic & Health Overview */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                      Population & Health Overview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                        {year} DATA
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={refreshData}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title="Population Growth"
                      value={data?.populationGrowth || 0}
                      icon={Users}
                      trend={data?.populationGrowthTrend || "stable"}
                      color="cyan"
                      detail="Annual Rate (%)"
                      suffix="%"
                    />
                    <MetricCard
                      title="Urbanization"
                      value={data?.urbanizationRate || 0}
                      icon={Building}
                      trend={data?.urbanizationTrend || "up"}
                      color="purple"
                      detail="Urban Population (%)"
                      suffix="%"
                    />
                    <MetricCard
                      title="Fertility Rate"
                      value={data?.fertilityRate || 0}
                      icon={Heart}
                      trend={data?.fertilityTrend || "down"}
                      color="blue"
                      detail="Births per Woman"
                      suffix=""
                    />
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="demographics" className="w-full" onValueChange={setActiveTab}>
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className="bg-slate-800/50 p-1">
                          <TabsTrigger
                            value="demographics"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Demographics
                          </TabsTrigger>
                          <TabsTrigger
                            value="health"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Health Indicators
                          </TabsTrigger>
                          <TabsTrigger
                            value="housing"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Housing
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                            Urban
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                            Rural
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                            National
                          </div>
                        </div>
                      </div>

                      <TabsContent value="demographics" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <DemographicsChart data={data?.demographicsData} />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Total Population</div>
                            <div className="text-lg font-mono text-cyan-400">{data?.totalPopulation || "N/A"}</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="health" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <HealthIndicatorsChart data={data?.healthData} />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Child Mortality</div>
                            <div className="text-lg font-mono text-cyan-400">
                              {data?.childMortality || "N/A"} per 1,000
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="housing" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <HousingChart data={data?.housingData} />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Improved Housing</div>
                            <div className="text-lg font-mono text-cyan-400">
                              {data?.improvedHousingPercentage || "N/A"}%
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Regional Data & Health Disparities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Shield className="mr-2 h-5 w-5 text-green-500" />
                      Data Integrity Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Census Data</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          {data?.censusDataStatus || "Complete"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">DHS Data</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          {data?.dhsDataStatus || "Complete"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Regional Breakdown</div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                          {data?.regionalDataStatus || "In Progress"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Last Update</div>
                        <div className="text-sm text-cyan-400">
                          Updated <span className="text-slate-500">{data?.lastUpdateTime || "3 months ago"}</span>
                        </div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Data Completeness</div>
                          <div className="text-sm text-cyan-400">{dataCompleteness}%</div>
                        </div>
                        <Progress value={dataCompleteness} className="h-2 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                            style={{ width: `${dataCompleteness}%` }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <MapPin className="mr-2 h-5 w-5 text-amber-500" />
                      Regional Health Disparities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data?.regionalData?.map((item, index) => (
                        <RegionalItem
                          key={index}
                          region={item.region}
                          healthIndex={item.healthIndex}
                          description={item.description}
                          type={item.type as "positive" | "warning" | "improved"}
                        />
                      )) || (
                        <>
                          <RegionalItem
                            region="Kigali City"
                            healthIndex={82}
                            description="Highest access to healthcare services"
                            type="positive"
                          />
                          <RegionalItem
                            region="Eastern Province"
                            healthIndex={65}
                            description="Improved maternal health outcomes"
                            type="improved"
                          />
                          <RegionalItem
                            region="Southern Province"
                            healthIndex={58}
                            description="Higher child malnutrition rates"
                            type="warning"
                          />
                          <RegionalItem
                            region="Western Province"
                            healthIndex={62}
                            description="Limited access to clean water"
                            type="warning"
                          />
                          <RegionalItem
                            region="Northern Province"
                            healthIndex={70}
                            description="Better vaccination coverage"
                            type="positive"
                          />
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Visualizations */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                    Advanced Visualizations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="trends">
                    <TabsList className="bg-slate-800/50 mb-4">
                      <TabsTrigger value="trends">Historical Trends</TabsTrigger>
                      <TabsTrigger value="age">Age Distribution</TabsTrigger>
                      <TabsTrigger value="healthcare">Healthcare Access</TabsTrigger>
                      <TabsTrigger value="map">Regional Map</TabsTrigger>
                    </TabsList>

                    <TabsContent value="trends" className="h-80">
                      <TrendChart data={data?.trendData} />
                    </TabsContent>

                    <TabsContent value="age" className="h-80">
                      <AgeDistributionChart data={data?.ageDistributionData} />
                    </TabsContent>

                    <TabsContent value="healthcare" className="h-80">
                      <HealthcareAccessChart data={data?.healthcareAccessData} />
                    </TabsContent>

                    <TabsContent value="map" className="h-80">
                      <RegionalMapChart data={data?.regionalMapData} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Demographic & Health Insights */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                    Demographic & Health Insights
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                    {data?.insights?.length || 4} Insights
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data?.insights?.map((item, index) => (
                      <InsightItem
                        key={index}
                        source={item.source}
                        time={item.time}
                        message={item.message}
                        avatar={item.avatar || "/placeholder.svg?height=40&width=40"}
                        unread={item.unread}
                      />
                    )) || (
                      <>
                        <InsightItem
                          source="Census Analysis"
                          time="2 weeks ago"
                          message="Population density in Kigali has increased by 12% since the last census, indicating accelerated urbanization."
                          avatar="/placeholder.svg?height=40&width=40"
                          unread
                        />
                        <InsightItem
                          source="DHS Report"
                          time="1 month ago"
                          message="Maternal mortality has decreased by 18% nationwide, with the most significant improvements in the Eastern Province."
                          avatar="/placeholder.svg?height=40&width=40"
                          unread
                        />
                        <InsightItem
                          source="Housing Analysis"
                          time="2 months ago"
                          message="62.8% of households now have access to improved housing conditions, up from 54.5% in the previous survey."
                          avatar="/placeholder.svg?height=40&width=40"
                          unread
                        />
                        <InsightItem
                          source="Health Trends"
                          time="3 months ago"
                          message="Vaccination coverage for children under 5 has reached 95% in urban areas but remains at 82% in rural regions."
                          avatar="/placeholder.svg?height=40&width=40"
                          unread
                        />
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 pt-4">
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      placeholder="Search insights..."
                      className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-cyan-600 hover:bg-cyan-700"
                      onClick={() => setShowAiInsightsDialog(true)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* System time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">LAST CENSUS</div>
                      <div className="text-3xl font-mono text-cyan-400 mb-1">{data?.lastCensusYear || "2022"}</div>
                      <div className="text-sm text-slate-400">Rwanda Population & Housing Census</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Last DHS</div>
                        <div className="text-sm font-mono text-slate-200">{data?.lastDhsYear || "2019-20"}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Next Update</div>
                        <div className="text-sm font-mono text-slate-200">{data?.nextUpdateDate || "Q3 2023"}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={FileText} label="Generate Reports" onClick={() => setShowReportDialog(true)} />
                    <ActionButton icon={Download} label="Download Data" onClick={() => setShowDownloadDialog(true)} />
                    <ActionButton icon={RefreshCw} label="Request Update" onClick={handleRequestUpdate} />
                    <ActionButton icon={Search} label="Advanced Search" onClick={() => router.push("/search")} />
                  </div>
                </CardContent>
              </Card>

              {/* Resource allocation */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Resource Allocation for Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data?.resourceAllocation?.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-slate-400">{item.sector}</div>
                          <div className="text-xs text-cyan-400">{item.percentage}% allocated</div>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )) || (
                      <>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-slate-400">Health Sector</div>
                            <div className="text-xs text-cyan-400">42% allocated</div>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: "42%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-slate-400">Education</div>
                            <div className="text-xs text-purple-400">35% allocated</div>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: "35%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-slate-400">Housing Development</div>
                            <div className="text-xs text-blue-400">23% allocated</div>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                              style={{ width: "23%" }}
                            ></div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-400">Data Priority</div>
                        <div className="flex items-center">
                          <Slider defaultValue={[3]} max={5} step={1} className="w-24 mr-2" />
                          <span className="text-cyan-400">3/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Update Controls */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Data Update Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Auto-Refresh Data</Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">New Data Alerts</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Regional Updates</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Thermometer className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Health Data Focus</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Predictions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                    AI Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiPredictions?.map((prediction, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-sm font-medium text-slate-200 mb-1">{prediction.title}</div>
                        <div className="text-xs text-slate-400">{prediction.description}</div>
                        <div className="mt-2 text-xs text-yellow-400 flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          {prediction.confidence}% confidence
                        </div>
                      </div>
                    )) || (
                      <>
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-sm font-medium text-slate-200 mb-1">Population Growth Forecast</div>
                          <div className="text-xs text-slate-400">
                            Population growth rate projected to decrease to 2.3% by 2025
                          </div>
                          <div className="mt-2 text-xs text-yellow-400 flex items-center">
                            <Zap className="h-3 w-3 mr-1" />
                            87% confidence
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-sm font-medium text-slate-200 mb-1">Health Outcome Prediction</div>
                          <div className="text-xs text-slate-400">
                            Child mortality expected to decrease by 15% in next 5 years
                          </div>
                          <div className="mt-2 text-xs text-yellow-400 flex items-center">
                            <Zap className="h-3 w-3 mr-1" />
                            82% confidence
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Report Generation Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select the type of report you want to generate.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-200">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                  <SelectItem value="regional">Regional Analysis</SelectItem>
                  <SelectItem value="trends">Trend Analysis</SelectItem>
                  <SelectItem value="health">Health Indicators</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Data Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Download Data</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select the dataset and format you want to download.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dataset">Dataset</Label>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-200">
                  <SelectValue placeholder="Select dataset" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="demographics">Demographics</SelectItem>
                  <SelectItem value="health">Health Indicators</SelectItem>
                  <SelectItem value="housing">Housing Data</SelectItem>
                  <SelectItem value="regional">Regional Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-200">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownloadData}>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Insights Dialog */}
      <Dialog open={showAiInsightsDialog} onOpenChange={setShowAiInsightsDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI-Powered Insights</DialogTitle>
            <DialogDescription className="text-slate-400">
              Ask questions about the data to get AI-generated insights.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ai-query">Your Question</Label>
              <Input
                id="ai-query"
                placeholder="e.g., What factors are driving urbanization in Rwanda?"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-200"
              />
            </div>

            {insights.length > 0 && (
              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium text-slate-200">AI Insights</h3>
                <div className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                  {isGeneratingInsight ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {insights.map((insight, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="text-sm font-medium text-cyan-400">{insight.title}</h4>
                          <p className="text-xs text-slate-300">{insight.content}</p>
                          {insight.sources && <div className="text-xs text-slate-500">Sources: {insight.sources}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAiInsightsDialog(false)}>
              Close
            </Button>
            <Button onClick={handleGenerateAiInsight} disabled={isGeneratingInsight}>
              {isGeneratingInsight ? "Generating..." : "Generate Insight"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Update the MetricCard component to include a suffix parameter
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  suffix = "%",
}: {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  suffix?: string
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value.toFixed(1)}
        {suffix}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
}

// Replace the RegionalItem component
function RegionalItem({
  region,
  healthIndex,
  description,
  type,
}: {
  region: string
  healthIndex: number
  description: string
  type: "positive" | "warning" | "improved"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "positive":
        return { icon: Heart, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "warning":
        return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "improved":
        return { icon: Activity, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{region}</div>
          <div className="ml-2 text-xs text-cyan-400">{healthIndex}/100</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// Replace the InsightItem component (renamed from CommunicationItem)
function InsightItem({
  source,
  time,
  message,
  avatar,
  unread,
}: {
  source: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}) {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={source} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">{source.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{source}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
        </div>
      )}
    </div>
  )
}

// Action button component
function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
}) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
