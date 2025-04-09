"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Search,
  Brain,
  Cog,
  Network,
  GitBranch,
  BarChart4,
  Zap,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  LineChart,
  Users,
  Building,
  Heart,
  Home,
} from "lucide-react"

interface MLPredictionWorkflowProps {
  onComplete?: (result: any) => void
  className?: string
}

export function MLPredictionWorkflow({ onComplete, className }: MLPredictionWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>(["ensemble"])
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<{ message: string; type: "info" | "success" | "warning" | "error" }[]>([])
  const [datasetInfo, setDatasetInfo] = useState<any>(null)

  const steps = [
    { name: "Data Gathering", icon: <Database className="h-4 w-4" /> },
    { name: "Data Preprocessing", icon: <Cog className="h-4 w-4" /> },
    { name: "Feature Engineering", icon: <Search className="h-4 w-4" /> },
    { name: "Model Selection", icon: <Network className="h-4 w-4" /> },
    { name: "Training & Validation", icon: <Brain className="h-4 w-4" /> },
    { name: "Prediction", icon: <Zap className="h-4 w-4" /> },
    { name: "Explanation", icon: <FileText className="h-4 w-4" /> },
  ]

  const models = [
    { id: "neural", name: "Neural Network", icon: <Network className="h-4 w-4" />, accuracy: 87 },
    { id: "tree", name: "XGBoost (Tree)", icon: <GitBranch className="h-4 w-4" />, accuracy: 89 },
    { id: "linear", name: "Linear Regression", icon: <LineChart className="h-4 w-4" />, accuracy: 82 },
    { id: "arima", name: "ARIMA", icon: <BarChart4 className="h-4 w-4" />, accuracy: 85 },
    { id: "ensemble", name: "Ensemble", icon: <Brain className="h-4 w-4" />, accuracy: 91 },
  ]

  // Initialize dataset info
  useEffect(() => {
    setDatasetInfo({
      censusYears: [2002, 2012, 2022],
      dhsYears: [2005, 2010, 2015, 2020, 2022],
      totalRecords: "13.2M",
      features: 42,
      dataQuality: "92%",
      lastUpdated: "2023-12-15",
    })
  }, [])

  const toggleModelSelection = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter((id) => id !== modelId))
    } else {
      setSelectedModels([...selectedModels, modelId])
    }
  }

  const addLog = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    setLogs((prev) => [...prev, { message, type }])
  }

  const runPrediction = () => {
    if (isRunning) return

    setIsRunning(true)
    setCompletedSteps([])
    setProgress(0)
    setLogs([])

    // Step 1: Data Gathering
    addLog("Starting data gathering process...", "info")
    simulateStep(0, 15, () => {
      addLog("Connected to Rwanda Census database (2002, 2012, 2022)", "success")
      addLog("Connected to DHS surveys database (2005-2022)", "success")
      addLog("Retrieved 13.2M demographic records", "success")
      addLog("Retrieved regional health indicators from HMIS", "success")
      addLog("Retrieved housing data from National Housing Survey", "success")

      // Step 2: Data Preprocessing
      addLog("Preprocessing raw data...", "info")
      simulateStep(1, 10, () => {
        addLog("Cleaned missing values in demographic data", "success")
        addLog("Normalized health indicators across regions", "success")
        addLog("Standardized housing classification categories", "success")
        addLog("Detected and removed 342 outliers", "warning")
        addLog("Aligned temporal data to consistent time periods", "success")

        // Step 3: Feature Engineering
        addLog("Engineering features for prediction models...", "info")
        simulateStep(2, 20, () => {
          addLog("Created 42 engineered features from raw data", "success")
          addLog("Generated population density features by region", "success")
          addLog("Created urbanization rate change features", "success")
          addLog("Developed healthcare access composite indicators", "success")
          addLog("Generated housing quality index features", "success")

          // Step 4: Model Selection
          addLog("Selecting optimal models for prediction task...", "info")
          simulateStep(3, 10, () => {
            if (selectedModels.includes("ensemble")) {
              addLog("Selected ensemble approach with weighted model combination", "success")
            } else {
              addLog(`Selected ${selectedModels.length} models for prediction`, "success")
            }
            addLog("Configured model hyperparameters for Rwanda data", "success")
            addLog("Set up cross-validation framework (5-fold)", "success")

            // Step 5: Training & Validation
            addLog("Training and validating models...", "info")
            simulateStep(4, 20, () => {
              if (selectedModels.includes("neural")) {
                addLog("Training Neural Network model...", "info")
                addLog("Neural Network training complete (RMSE: 0.42, R²: 0.87)", "success")
              }
              if (selectedModels.includes("tree")) {
                addLog("Training XGBoost model...", "info")
                addLog("XGBoost training complete (RMSE: 0.38, R²: 0.89)", "success")
              }
              if (selectedModels.includes("linear")) {
                addLog("Training Linear Regression model...", "info")
                addLog("Linear Regression training complete (RMSE: 0.56, R²: 0.82)", "success")
              }
              if (selectedModels.includes("arima")) {
                addLog("Training ARIMA model...", "info")
                addLog("ARIMA training complete (RMSE: 0.45, R²: 0.85)", "success")
              }
              if (selectedModels.includes("ensemble")) {
                addLog("Training Ensemble model...", "info")
                addLog("Ensemble model training complete (RMSE: 0.32, R²: 0.91)", "success")
              }
              addLog("Cross-validation complete", "success")
              addLog("Model calibration and uncertainty quantification complete", "success")

              // Step 6: Prediction
              addLog("Running prediction models...", "info")
              simulateStep(5, 15, () => {
                addLog("Generating population projections to 2030...", "info")
                addLog("Population projection complete: 16.8M by 2030 (±0.4M)", "success")

                addLog("Generating urbanization projections to 2030...", "info")
                addLog("Urbanization projection complete: 28.5% by 2030 (±1.2%)", "success")

                addLog("Generating health outcome projections to 2030...", "info")
                addLog("Child mortality projection complete: 32 per 1,000 by 2030 (±3)", "success")

                addLog("Generating housing projections to 2030...", "info")
                addLog("Improved housing projection complete: 78.5% by 2030 (±2.1%)", "success")

                // Step 7: Explanation
                addLog("Generating explanation for prediction results...", "info")
                simulateStep(6, 10, () => {
                  addLog("Generated natural language explanation of results", "success")
                  addLog("Created feature importance visualization", "success")
                  addLog("Generated policy implication recommendations", "success")
                  addLog("Created uncertainty visualization for key metrics", "success")
                  addLog("Prediction workflow complete!", "success")

                  setIsRunning(false)
                  // Use setTimeout to ensure this doesn't happen during rendering
                  setTimeout(() => {
                    if (onComplete) {
                      onComplete({
                        result: {
                          population2030: 16.8,
                          urbanization2030: 28.5,
                          childMortality2030: 32,
                          improvedHousing2030: 78.5,
                        },
                        confidence: selectedModels.includes("ensemble") ? 91 : 87,
                        models: selectedModels,
                        timestamp: new Date().toISOString(),
                      })
                    }
                  }, 0)
                })
              })
            })
          })
        })
      })
    })
  }

  const simulateStep = (step: number, durationPercent: number, callback: () => void) => {
    setCurrentStep(step)

    const startProgress = progress
    const targetProgress = startProgress + durationPercent

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= targetProgress) {
          clearInterval(interval)
          setCompletedSteps((prev) => [...prev, step])
          // Use setTimeout to ensure this doesn't happen during rendering
          setTimeout(() => {
            callback()
          }, 0)
          return targetProgress
        }
        return newProgress
      })
    }, 100)
  }

  const getStepStatus = (index: number) => {
    if (completedSteps.includes(index)) {
      return "completed"
    }
    if (currentStep === index && isRunning) {
      return "current"
    }
    return "pending"
  }

  return (
    <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base flex items-center">
          <Brain className="mr-2 h-5 w-5 text-purple-500" />
          Rwanda Census ML Prediction Workflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-300">Prediction Progress</div>
            <div className="text-sm text-slate-400">{progress}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm font-medium text-slate-300 mb-3">Workflow Steps</div>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 rounded-md ${
                    getStepStatus(index) === "completed"
                      ? "bg-green-900/20 border border-green-700/30"
                      : getStepStatus(index) === "current"
                        ? "bg-blue-900/20 border border-blue-700/30"
                        : "bg-slate-800/30 border border-slate-700/30"
                  }`}
                >
                  <div
                    className={`
                    h-6 w-6 rounded-full flex items-center justify-center mr-2
                    ${
                      getStepStatus(index) === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : getStepStatus(index) === "current"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-slate-700/30 text-slate-400"
                    }
                  `}
                  >
                    {getStepStatus(index) === "completed" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : getStepStatus(index) === "current" ? (
                      <Clock className="h-4 w-4 animate-pulse" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="text-sm">{step.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-300 mb-3">Model Selection</div>
            <div className="space-y-2 mb-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`
                    flex items-center justify-between p-2 rounded-md cursor-pointer
                    ${
                      selectedModels.includes(model.id)
                        ? "bg-purple-900/20 border border-purple-700/30"
                        : "bg-slate-800/30 border border-slate-700/30"
                    }
                  `}
                  onClick={() => toggleModelSelection(model.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`
                      h-6 w-6 rounded-full flex items-center justify-center mr-2
                      ${
                        selectedModels.includes(model.id)
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-slate-700/30 text-slate-400"
                      }
                    `}
                    >
                      {model.icon}
                    </div>
                    <div className="text-sm">{model.name}</div>
                  </div>
                  <Badge className="bg-slate-800/50 text-slate-300">{model.accuracy}%</Badge>
                </div>
              ))}
            </div>

            <Button
              onClick={runPrediction}
              disabled={isRunning || selectedModels.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isRunning ? (
                <>
                  <Cog className="mr-2 h-4 w-4 animate-spin" />
                  Running Prediction...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Run Prediction Workflow
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="logs">
          <TabsList className="bg-slate-800/50 mb-2">
            <TabsTrigger value="logs">Process Logs</TabsTrigger>
            <TabsTrigger value="dataset">Dataset Info</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="mt-0">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-md p-2 h-[200px] overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-slate-500 p-2">Run the prediction workflow to see logs...</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        {log.type === "success" && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                        {log.type === "info" && <ArrowRight className="h-3 w-3 text-blue-500" />}
                        {log.type === "warning" && <AlertCircle className="h-3 w-3 text-amber-500" />}
                        {log.type === "error" && <AlertCircle className="h-3 w-3 text-red-500" />}
                      </div>
                      <div
                        className={`
                        ${log.type === "success" ? "text-green-400" : ""}
                        ${log.type === "info" ? "text-slate-300" : ""}
                        ${log.type === "warning" ? "text-amber-400" : ""}
                        ${log.type === "error" ? "text-red-400" : ""}
                      `}
                      >
                        {log.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dataset" className="mt-0">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-md p-3 h-[200px] overflow-auto">
              {datasetInfo ? (
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Data Sources</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-900/20 text-purple-400 border-purple-700/30">
                        <Users className="h-3 w-3 mr-1" />
                        Census {datasetInfo.censusYears.join(", ")}
                      </Badge>
                      <Badge className="bg-blue-900/20 text-blue-400 border-blue-700/30">
                        <Heart className="h-3 w-3 mr-1" />
                        DHS {datasetInfo.dhsYears.join(", ")}
                      </Badge>
                      <Badge className="bg-green-900/20 text-green-400 border-green-700/30">
                        <Home className="h-3 w-3 mr-1" />
                        Housing Survey
                      </Badge>
                      <Badge className="bg-amber-900/20 text-amber-400 border-amber-700/30">
                        <Building className="h-3 w-3 mr-1" />
                        Urbanization Data
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 p-2 rounded-md">
                      <div className="text-xs text-slate-500">Total Records</div>
                      <div className="text-sm font-medium text-slate-300">{datasetInfo.totalRecords}</div>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-md">
                      <div className="text-xs text-slate-500">Features</div>
                      <div className="text-sm font-medium text-slate-300">{datasetInfo.features}</div>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-md">
                      <div className="text-xs text-slate-500">Data Quality</div>
                      <div className="text-sm font-medium text-slate-300">{datasetInfo.dataQuality}</div>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-md">
                      <div className="text-xs text-slate-500">Last Updated</div>
                      <div className="text-sm font-medium text-slate-300">{datasetInfo.lastUpdated}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    <div className="font-medium mb-1">Key Variables:</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <div>• Population by age group and gender</div>
                      <div>• Urbanization rates by province</div>
                      <div>• Child mortality rates</div>
                      <div>• Maternal health indicators</div>
                      <div>• Housing quality metrics</div>
                      <div>• Access to utilities</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="mt-0">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-md p-2 h-[200px] overflow-auto">
              <div className="text-xs text-slate-400 mb-2">Mixture of Experts Architecture</div>
              <div className="flex items-center text-xs mb-1">
                <div className="h-3 w-3 bg-purple-500 rounded-sm mr-1"></div>
                <div className="text-slate-300">Orchestrator</div>

                <div className="h-3 w-3 bg-blue-500 rounded-sm ml-3 mr-1"></div>
                <div className="text-slate-300">LLM Module</div>

                <div className="h-3 w-3 bg-amber-500 rounded-sm ml-3 mr-1"></div>
                <div className="text-slate-300">Model Serving</div>

                <div className="h-3 w-3 bg-green-500 rounded-sm ml-3 mr-1"></div>
                <div className="text-slate-300">Output</div>
              </div>

              <div className="text-center text-xs text-slate-500 italic">Hover over components to see details</div>

              <div className="flex justify-center mt-2">
                <div className="flex flex-col items-center">
                  <div
                    className="bg-purple-500/20 border border-purple-500/30 rounded-md p-1 text-xs text-purple-300 w-24 text-center mb-2"
                    title="Central component that manages the entire prediction workflow"
                  >
                    Orchestrator
                  </div>

                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className="bg-slate-700/30 border border-slate-600/30 rounded-md p-1 text-xs text-slate-300 w-24 text-center"
                      title="Retrieves data from databases and structured sources"
                    >
                      Data Gathering
                    </div>
                    <div
                      className="bg-blue-500/20 border border-blue-500/30 rounded-md p-1 text-xs text-blue-300 w-24 text-center"
                      title="Processes text and generates embeddings using LLaMA"
                    >
                      LLM Module
                    </div>
                  </div>

                  <div
                    className="bg-slate-700/30 border border-slate-600/30 rounded-md p-1 text-xs text-slate-300 w-full text-center mb-2"
                    title="Creates features from raw data and LLM outputs"
                  >
                    Feature Engineering
                  </div>

                  <div
                    className="bg-amber-500/20 border border-amber-500/30 rounded-md p-1 text-xs text-amber-300 w-full text-center mb-2"
                    title="Routes requests to appropriate models and handles ensembling"
                  >
                    Model Serving Environment
                  </div>

                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className="bg-slate-700/30 border border-slate-600/30 rounded-md p-1 text-xs text-slate-300 w-24 text-center"
                      title="Neural Network models"
                    >
                      NN Models
                    </div>
                    <div
                      className="bg-slate-700/30 border border-slate-600/30 rounded-md p-1 text-xs text-slate-300 w-24 text-center"
                      title="Tree-based models like XGBoost"
                    >
                      Tree Models
                    </div>
                  </div>

                  <div
                    className="bg-green-500/20 border border-green-500/30 rounded-md p-1 text-xs text-green-300 w-full text-center"
                    title="Formats and delivers final predictions and explanations"
                  >
                    Output Module
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
