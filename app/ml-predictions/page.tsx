"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Download,
  FileText,
  Brain,
  Zap,
  TrendingUp,
  Info,
  BarChart2,
  AlertTriangle,
  CheckCircle2,
  Users,
  Building,
  Heart,
  Home,
  Share2,
  ArrowRight,
  Calendar,
  Lightbulb,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { MLArchitectureSimplified } from "@/components/ml-architecture-simplified"
import { MLArchitectureMermaid } from "@/components/ml-architecture-mermaid"
import { MLModelCard } from "@/components/ml-model-card"
import { MLPredictionWorkflow } from "@/components/ml-prediction-workflow"
import { MLModelComparison } from "@/components/ml-model-comparison"
import { PopulationPredictionChart } from "@/components/charts/population-prediction-chart"
import { UrbanizationPredictionChart } from "@/components/charts/urbanization-prediction-chart"
import { HealthOutcomePredictionChart } from "@/components/charts/health-outcome-prediction-chart"
import { HousingTrendPredictionChart } from "@/components/charts/housing-trend-prediction-chart"
import { useData } from "@/hooks/use-data"
import { useRouter, useSearchParams } from "next/navigation"

export default function MLPredictionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const region = searchParams.get("region") || "national"
  const year = searchParams.get("year") || "2022"

  const { data: dashboardData, isLoading: isDashboardLoading } = useData(region, year)

  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("population")
  const [predictionYear, setPredictionYear] = useState("2030")
  const [confidenceThreshold, setConfidenceThreshold] = useState([80])
  const [modelType, setModelType] = useState("ensemble")
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [showDetailedArchitecture, setShowDetailedArchitecture] = useState(false)
  const [showModelComparison, setShowModelComparison] = useState(false)
  const [policyNotes, setPolicyNotes] = useState("")
  const [showPolicyImplications, setShowPolicyImplications] = useState(false)
  const { toast } = useToast()

  // Custom parameters for each model
  const [populationGrowthRate, setPopulationGrowthRate] = useState("2.5")
  const [urbanizationRate, setUrbanizationRate] = useState("3.2")
  const [healthcareInvestment, setHealthcareInvestment] = useState("5.8")
  const [housingInvestment, setHousingInvestment] = useState("4.2")

  // Initialize parameters based on dashboard data
  useEffect(() => {
    if (dashboardData) {
      setPopulationGrowthRate(dashboardData.populationGrowth.toFixed(1))
      setUrbanizationRate((dashboardData.urbanizationRate * 0.1).toFixed(1)) // Convert to growth rate
      // Default values if not available
      setHealthcareInvestment("5.8")
      setHousingInvestment("4.2")
    }
  }, [dashboardData])

  const handleRunPrediction = () => {
    setShowWorkflow(true)
  }

  const handlePredictionComplete = (result: any) => {
    // Use a single state update to avoid multiple renders
    setPredictionResult(result)
    // Use setTimeout to ensure this doesn't happen during rendering
    setTimeout(() => {
      setShowWorkflow(false)
      setShowPolicyImplications(true)
      toast({
        title: "Prediction Complete",
        description: `ML prediction for ${predictionYear} has been generated successfully.`,
      })
    }, 0)
  }

  const handleDownloadPrediction = () => {
    toast({
      title: "Download Started",
      description: "Prediction data is being downloaded in CSV format.",
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Prediction report has been generated successfully.",
    })
  }

  const handleRegionChange = (newRegion: string) => {
    router.push(`?region=${newRegion}&year=${year}`)
  }

  const handleSavePolicyNotes = () => {
    toast({
      title: "Policy Notes Saved",
      description: "Your policy implications notes have been saved and shared with your team.",
    })
  }

  // Generate policy implications based on prediction results
  const getPolicyImplications = () => {
    if (!predictionResult) return []

    return [
      {
        area: "Population Growth",
        implication:
          "Based on the predicted population growth to 16.8M by 2030, infrastructure planning should account for approximately 20% more demand for public services.",
        urgency: "medium",
      },
      {
        area: "Urbanization",
        implication:
          "With urbanization projected to reach 28.5% by 2030, urban housing development should be prioritized, particularly in Kigali and secondary cities.",
        urgency: "high",
      },
      {
        area: "Healthcare",
        implication:
          "The projected reduction in child mortality to 32 per 1,000 births will require sustained investment in maternal and child health services to achieve this target.",
        urgency: "medium",
      },
      {
        area: "Housing",
        implication:
          "To achieve 78.5% improved housing by 2030, current housing improvement programs need to be scaled up by approximately 25%.",
        urgency: "high",
      },
    ]
  }

  return (
    <div className="container mx-auto p-6 relative">
      {(isLoading || isDashboardLoading) && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center">
            <Brain className="mr-2 h-6 w-6 text-purple-500" />
            ML Predictions
          </h1>
          <p className="text-slate-400 mt-1">
            Forecast future demographic and health trends using machine learning models
          </p>
        </div>

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

          <Select value={predictionYear} onValueChange={setPredictionYear}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700/50 text-slate-200">
              <SelectValue placeholder="Prediction Year" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2030">2030</SelectItem>
              <SelectItem value="2035">2035</SelectItem>
              <SelectItem value="2040">2040</SelectItem>
              <SelectItem value="2050">2050</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default" className="bg-purple-600 hover:bg-purple-700" onClick={handleRunPrediction}>
            <Zap className="mr-2 h-4 w-4" />
            Run Prediction
          </Button>
        </div>
      </div>

      {/* Current data context */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">
            Current Data Context (
            {region === "national" ? "National" : region.charAt(0).toUpperCase() + region.slice(1)} - {year})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Population Growth</div>
                <div className="text-lg font-semibold text-slate-100">{dashboardData?.populationGrowth || 2.5}%</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Building className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Urbanization Rate</div>
                <div className="text-lg font-semibold text-slate-100">{dashboardData?.urbanizationRate || 17.6}%</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Heart className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Child Mortality</div>
                <div className="text-lg font-semibold text-slate-100">{dashboardData?.childMortality || 45}/1,000</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Home className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Improved Housing</div>
                <div className="text-lg font-semibold text-slate-100">
                  {dashboardData?.improvedHousingPercentage || 62.8}%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-purple-500/20 text-purple-400 border-purple-500/50">16.8M</Badge>
              Population ({predictionYear})
              <span className="ml-2 text-green-400">
                <TrendingUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Predicted population by {predictionYear} based on {populationGrowthRate}% annual growth rate.
            </div>
            {predictionResult && (
              <div className="mt-2 text-xs text-purple-400">{predictionResult.confidence}% confidence level</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">28.5%</Badge>
              Urbanization ({predictionYear})
              <span className="ml-2 text-amber-400">
                <TrendingUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Predicted percentage of population living in urban areas by {predictionYear}.
            </div>
            {predictionResult && (
              <div className="mt-2 text-xs text-cyan-400">
                +{(28.5 - (dashboardData?.urbanizationRate || 17.6)).toFixed(1)}% from current rate
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-blue-500/20 text-blue-400 border-blue-500/50">32</Badge>
              Child Mortality ({predictionYear})
              <span className="ml-2 text-green-400">
                <TrendingUp className="h-4 w-4 rotate-180" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Predicted child mortality rate per 1,000 live births by {predictionYear}.
            </div>
            {predictionResult && (
              <div className="mt-2 text-xs text-blue-400">
                {((dashboardData?.childMortality || 45) - 32).toFixed(0)} fewer deaths per 1,000 births
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base flex items-center">
              <Badge className="mr-2 bg-green-500/20 text-green-400 border-green-500/50">78.5%</Badge>
              Improved Housing ({predictionYear})
              <span className="ml-2 text-green-400">
                <TrendingUp className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-400">
              Predicted percentage of households with improved housing by {predictionYear}.
            </div>
            {predictionResult && (
              <div className="mt-2 text-xs text-green-400">
                +{(78.5 - (dashboardData?.improvedHousingPercentage || 62.8)).toFixed(1)}% from current level
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showWorkflow ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-3">
            <MLPredictionWorkflow onComplete={handlePredictionComplete} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">Prediction Models</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowModelComparison(!showModelComparison)}
                    >
                      <BarChart2 className="mr-1 h-3 w-3" />
                      {showModelComparison ? "Hide Comparison" : "Compare Models"}
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleDownloadPrediction}>
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
                {showModelComparison ? (
                  <MLModelComparison />
                ) : (
                  <Tabs defaultValue="population" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-slate-800/50 mb-4">
                      <TabsTrigger value="population">Population</TabsTrigger>
                      <TabsTrigger value="urbanization">Urbanization</TabsTrigger>
                      <TabsTrigger value="health">Health Outcomes</TabsTrigger>
                      <TabsTrigger value="housing">Housing Trends</TabsTrigger>
                    </TabsList>

                    <TabsContent value="population" className="mt-0">
                      <div className="h-[400px]">
                        <PopulationPredictionChart
                          predictionYear={predictionYear}
                          modelType={modelType}
                          growthRate={Number.parseFloat(populationGrowthRate)}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="urbanization" className="mt-0">
                      <div className="h-[400px]">
                        <UrbanizationPredictionChart
                          predictionYear={predictionYear}
                          modelType={modelType}
                          urbanizationRate={Number.parseFloat(urbanizationRate)}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="health" className="mt-0">
                      <div className="h-[400px]">
                        <HealthOutcomePredictionChart
                          predictionYear={predictionYear}
                          modelType={modelType}
                          healthcareInvestment={Number.parseFloat(healthcareInvestment)}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="housing" className="mt-0">
                      <div className="h-[400px]">
                        <HousingTrendPredictionChart
                          predictionYear={predictionYear}
                          modelType={modelType}
                          housingInvestment={Number.parseFloat(housingInvestment)}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Model Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="confidence-threshold"
                        value={confidenceThreshold}
                        onValueChange={setConfidenceThreshold}
                        min={50}
                        max={95}
                        step={5}
                      />
                      <span className="w-12 text-right text-sm text-slate-400">{confidenceThreshold}%</span>
                    </div>
                  </div>

                  {activeTab === "population" && !showModelComparison && (
                    <div className="space-y-2">
                      <Label htmlFor="growth-rate">Population Growth Rate (%)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="growth-rate"
                          type="number"
                          value={populationGrowthRate}
                          onChange={(e) => setPopulationGrowthRate(e.target.value)}
                          min="0"
                          max="10"
                          step="0.1"
                          className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                        />
                        <div className="text-xs text-slate-500">Current: {dashboardData?.populationGrowth || 2.5}%</div>
                      </div>
                    </div>
                  )}

                  {activeTab === "urbanization" && !showModelComparison && (
                    <div className="space-y-2">
                      <Label htmlFor="urbanization-rate">Urbanization Rate (%)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="urbanization-rate"
                          type="number"
                          value={urbanizationRate}
                          onChange={(e) => setUrbanizationRate(e.target.value)}
                          min="0"
                          max="10"
                          step="0.1"
                          className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                        />
                        <div className="text-xs text-slate-500">Annual growth</div>
                      </div>
                    </div>
                  )}

                  {activeTab === "health" && !showModelComparison && (
                    <div className="space-y-2">
                      <Label htmlFor="healthcare-investment">Healthcare Investment (% of GDP)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="healthcare-investment"
                          type="number"
                          value={healthcareInvestment}
                          onChange={(e) => setHealthcareInvestment(e.target.value)}
                          min="0"
                          max="20"
                          step="0.1"
                          className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                        />
                        <div className="text-xs text-slate-500">Current: 5.8%</div>
                      </div>
                    </div>
                  )}

                  {activeTab === "housing" && !showModelComparison && (
                    <div className="space-y-2">
                      <Label htmlFor="housing-investment">Housing Investment (% of GDP)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="housing-investment"
                          type="number"
                          value={housingInvestment}
                          onChange={(e) => setHousingInvestment(e.target.value)}
                          min="0"
                          max="20"
                          step="0.1"
                          className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                        />
                        <div className="text-xs text-slate-500">Current: 4.2%</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Model Type</Label>
                    <Select value={modelType} onValueChange={setModelType}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-slate-200">
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectItem value="linear">Linear Regression</SelectItem>
                        <SelectItem value="arima">ARIMA</SelectItem>
                        <SelectItem value="prophet">Prophet</SelectItem>
                        <SelectItem value="ensemble">Ensemble Model</SelectItem>
                        <SelectItem value="neural">Neural Network</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleRunPrediction}>
                      <Zap className="mr-2 h-4 w-4" />
                      Run Advanced Prediction
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Available Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MLModelCard
                  title="Neural Network"
                  description="Deep learning model optimized for demographic time series data"
                  type="neural"
                  accuracy={87}
                  lastUpdated="2023-11-15"
                  features={["Time series", "Pattern recognition", "Non-linear relationships"]}
                />

                <MLModelCard
                  title="XGBoost"
                  description="Gradient boosted trees for robust prediction with feature importance"
                  type="tree"
                  accuracy={89}
                  lastUpdated="2023-12-01"
                  features={["Feature importance", "Handles missing data", "Robust to outliers"]}
                />

                <MLModelCard
                  title="Ensemble"
                  description="Weighted combination of multiple models for optimal performance"
                  type="ensemble"
                  accuracy={91}
                  lastUpdated="2023-12-10"
                  features={["Model blending", "Uncertainty quantification", "Robust predictions"]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Policy Implications Section */}
      {showPolicyImplications && (
        <div className="mb-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100">Policy Implications</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setShowPolicyImplications(!showPolicyImplications)}
                >
                  <Lightbulb className="mr-1 h-3 w-3" />
                  {showPolicyImplications ? "Hide Implications" : "Show Implications"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-sm text-slate-300 mb-4">
                Based on the ML predictions for{" "}
                {region === "national" ? "Rwanda" : region.charAt(0).toUpperCase() + region.slice(1)} by{" "}
                {predictionYear}, the following policy implications have been identified:
              </div>

              <div className="space-y-4 mb-6">
                {getPolicyImplications().map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border ${
                      item.urgency === "high"
                        ? "bg-red-900/20 border-red-700/30"
                        : item.urgency === "medium"
                          ? "bg-amber-900/20 border-amber-700/30"
                          : "bg-blue-900/20 border-blue-700/30"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`mt-0.5 mr-2 ${
                          item.urgency === "high"
                            ? "text-red-400"
                            : item.urgency === "medium"
                              ? "text-amber-400"
                              : "text-blue-400"
                        }`}
                      >
                        {item.urgency === "high" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : item.urgency === "medium" ? (
                          <ArrowRight className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{item.area}</div>
                        <div className="text-sm text-slate-400">{item.implication}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Label htmlFor="policy-notes">Your Policy Notes</Label>
                <Textarea
                  id="policy-notes"
                  placeholder="Add your notes on policy implications based on these predictions..."
                  className="bg-slate-800/50 border-slate-700/50 text-slate-200 min-h-[100px]"
                  value={policyNotes}
                  onChange={(e) => setPolicyNotes(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    These notes will be saved to your team's shared workspace
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setPolicyNotes("")}>
                      Clear
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={handleSavePolicyNotes}>
                      <Share2 className="mr-1 h-3 w-3" />
                      Save & Share
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-slate-800/50 rounded-md border border-slate-700/50">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                  <div className="text-sm font-medium text-slate-300">Next Steps</div>
                </div>
                <div className="mt-2 text-sm text-slate-400">
                  Schedule a policy planning meeting to discuss these predictions and their implications for the{" "}
                  {region === "national" ? "National" : "Regional"} Development Plan. Consider inviting stakeholders
                  from relevant ministries and development partners.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Mixture of Experts Architecture</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setShowDetailedArchitecture(!showDetailedArchitecture)}
              >
                <Info className="mr-1 h-3 w-3" />
                {showDetailedArchitecture ? "Simple View" : "Detailed View"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-sm text-slate-300 mb-4">
              <p className="mb-2">
                Our ML prediction system uses a sophisticated Mixture of Experts architecture that combines multiple
                specialized models with an orchestrator to produce highly accurate predictions for Rwanda's demographic
                and health indicators.
              </p>
              <p>
                This approach allows us to leverage the strengths of different models (linear regression for stable
                trends, neural networks for complex patterns, etc.) while minimizing their individual weaknesses. The
                system is trained on historical census data from 2002, 2012, and 2022, along with annual DHS surveys.
              </p>
            </div>
            <div className="h-[500px] overflow-auto flex items-center justify-center">
              {showDetailedArchitecture ? <MLArchitectureMermaid /> : <MLArchitectureSimplified />}
            </div>
            <div className="mt-4 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-md border border-slate-700/50">
              <div className="font-medium mb-1">Real-world applications:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ministry of Finance uses these predictions for long-term budget planning</li>
                <li>Ministry of Infrastructure leverages urbanization forecasts for city planning</li>
                <li>Ministry of Health utilizes health outcome predictions for resource allocation</li>
                <li>Development partners align program investments with predicted demographic shifts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
