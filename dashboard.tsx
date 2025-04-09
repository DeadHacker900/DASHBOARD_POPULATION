"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Building,
  Calendar,
  Command,
  Download,
  FileText,
  Globe,
  Heart,
  Home,
  Info,
  LineChart,
  type LucideIcon,
  MapPin,
  MessageSquare,
  Moon,
  PieChart,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  Thermometer,
  Users,
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

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [populationGrowth, setPopulationGrowth] = useState(2.8)
  const [urbanizationRate, setUrbanizationRate] = useState(17.6)
  const [fertilityRate, setFertilityRate] = useState(4.1)
  const [childMortality, setChildMortality] = useState(45)
  const [dataIntegrity, setDataIntegrity] = useState(92)
  const [dataCompleteness, setDataCompleteness] = useState(85)
  const [updateProgress, setUpdateProgress] = useState(68)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("demographics")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setPopulationGrowth(2.8 + (Math.random() * 0.4 - 0.2))
      setUrbanizationRate(17.6 + (Math.random() * 1 - 0.5))
      setFertilityRate(4.1 + (Math.random() * 0.3 - 0.15))
      setChildMortality(45 + (Math.random() * 4 - 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}

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
                placeholder="Search systems..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
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

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">CM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem icon={Command} label="Dashboard" active />
                  <NavItem icon={Activity} label="Demographics" />
                  <NavItem icon={Heart} label="Health Data" />
                  <NavItem icon={Home} label="Housing" />
                  <NavItem icon={Globe} label="Regional Data" />
                  <NavItem icon={PieChart} label="Visualizations" />
                  <NavItem icon={MessageSquare} label="Insights" />
                  <NavItem icon={Settings} label="Settings" />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">DATA STATUS</div>
                  <div className="space-y-3">
                    <StatusItem label="Data Integrity" value={dataIntegrity} color="cyan" />
                    <StatusItem label="Completeness" value={dataCompleteness} color="green" />
                    <StatusItem label="Update Progress" value={updateProgress} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
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
                        2022 CENSUS
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title="Population Growth"
                      value={populationGrowth}
                      icon={Users}
                      trend="up"
                      color="cyan"
                      detail="Annual Rate (%)"
                      suffix="%"
                    />
                    <MetricCard
                      title="Urbanization"
                      value={urbanizationRate}
                      icon={Building}
                      trend="up"
                      color="purple"
                      detail="Urban Population (%)"
                      suffix="%"
                    />
                    <MetricCard
                      title="Fertility Rate"
                      value={fertilityRate}
                      icon={Heart}
                      trend="down"
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
                          <DemographicsChart />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Total Population</div>
                            <div className="text-lg font-mono text-cyan-400">13.2M</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="health" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <HealthIndicatorsChart />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Child Mortality</div>
                            <div className="text-lg font-mono text-cyan-400">{childMortality} per 1,000</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="housing" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <HousingChart />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Improved Housing</div>
                            <div className="text-lg font-mono text-cyan-400">62.8%</div>
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
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">DHS Data</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Regional Breakdown</div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">In Progress</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Last Update</div>
                        <div className="text-sm text-cyan-400">
                          Updated <span className="text-slate-500">3 months ago</span>
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
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Demographic & Health Insights */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                    Demographic & Health Insights
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                    4 New Insights
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
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
                    <Button size="icon" className="bg-cyan-600 hover:bg-cyan-700">
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
                      <div className="text-3xl font-mono text-cyan-400 mb-1">2022</div>
                      <div className="text-sm text-slate-400">Rwanda Population & Housing Census</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Last DHS</div>
                        <div className="text-sm font-mono text-slate-200">2019-20</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Next Update</div>
                        <div className="text-sm font-mono text-slate-200">Q3 2023</div>
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
                    <ActionButton icon={FileText} label="Generate Reports" />
                    <ActionButton icon={Download} label="Download Data" />
                    <ActionButton icon={RefreshCw} label="Request Update" />
                    <ActionButton icon={Search} label="Advanced Search" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
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

// Add new chart components
function DemographicsChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">15M</div>
        <div className="text-xs text-slate-500">10M</div>
        <div className="text-xs text-slate-500">5M</div>
        <div className="text-xs text-slate-500">0</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars - Population by age group */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {[
          { label: "0-14", urban: 35, rural: 42 },
          { label: "15-24", urban: 22, rural: 20 },
          { label: "25-34", urban: 18, rural: 15 },
          { label: "35-44", urban: 12, rural: 10 },
          { label: "45-54", urban: 7, rural: 7 },
          { label: "55-64", urban: 4, rural: 4 },
          { label: "65+", urban: 2, rural: 2 },
        ].map((group, i) => {
          const urbanHeight = group.urban * 1.5
          const ruralHeight = group.rural * 1.5

          return (
            <div key={i} className="flex flex-col items-center">
              <div className="flex space-x-1 h-48 items-end mb-2">
                <div
                  className="w-6 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                  style={{ height: `${urbanHeight}%` }}
                ></div>
                <div
                  className="w-6 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                  style={{ height: `${ruralHeight}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500 rotate-0">{group.label}</div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">Age Groups (years)</div>
      </div>
    </div>
  )
}

function HealthIndicatorsChart() {
  return (
    <div className="h-full w-full flex items-center justify-center px-4 pt-4 pb-8 relative">
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* Grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Health indicators as horizontal bars */}
      <div className="w-full h-full flex flex-col justify-between py-6 pl-10 z-10">
        {[
          { label: "Vaccination", urban: 95, rural: 82 },
          { label: "Prenatal Care", urban: 92, rural: 78 },
          { label: "Skilled Birth", urban: 97, rural: 85 },
          { label: "Contraceptive", urban: 65, rural: 48 },
          { label: "HIV Testing", urban: 88, rural: 72 },
        ].map((indicator, i) => (
          <div key={i} className="flex items-center w-full">
            <div className="w-24 text-xs text-slate-400 mr-2">{indicator.label}</div>
            <div className="flex-1 flex items-center space-x-1">
              <div className="h-4 bg-cyan-500 rounded-sm" style={{ width: `${indicator.urban * 0.6}%` }}></div>
              <div className="h-4 bg-purple-500 rounded-sm" style={{ width: `${indicator.rural * 0.6}%` }}></div>
            </div>
            <div className="w-16 text-right text-xs text-slate-500">
              {Math.round((indicator.urban + indicator.rural) / 2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HousingChart() {
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      {/* Housing type distribution as a pie chart visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Simulated pie chart segments */}
          <div
            className="absolute inset-0 rounded-full border-8 border-cyan-500 rotate-0"
            style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
          ></div>
          <div
            className="absolute inset-0 rounded-full border-8 border-purple-500 rotate-0"
            style={{ clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)" }}
          ></div>

          {/* Inner circle for donut effect */}
          <div className="absolute inset-8 rounded-full bg-slate-900/90"></div>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-slate-400">Improved</div>
              <div className="text-xl font-bold text-cyan-400">62.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-sm bg-cyan-500 mr-2"></div>
          <span className="text-xs text-slate-400">Improved Housing (62.8%)</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-sm bg-purple-500 mr-2"></div>
          <span className="text-xs text-slate-400">Traditional Housing (37.2%)</span>
        </div>
      </div>

      {/* Housing types */}
      <div className="absolute top-4 left-4 text-xs text-slate-400">
        <div className="mb-1">Housing Types:</div>
        <div className="pl-2">- Modern (28.5%)</div>
        <div className="pl-2">- Semi-modern (34.3%)</div>
        <div className="pl-2">- Traditional (37.2%)</div>
      </div>
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
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Add missing imports
function Check(props) {
  return <Shield {...props} />
}
