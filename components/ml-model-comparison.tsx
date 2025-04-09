"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  CheckCircle2,
  Clock,
  FileText,
  HardDrive,
  Network,
  Zap,
  AlertTriangle,
  X,
  GitBranch,
  LineChart,
  Brain,
} from "lucide-react"

export function MLModelComparison() {
  const [selectedMetric, setSelectedMetric] = useState("accuracy")

  const models = [
    {
      name: "Linear Regression",
      icon: <LineChart className="h-5 w-5" />,
      description: "Simple, interpretable model for linear relationships",
      metrics: {
        accuracy: 82,
        speed: 95,
        memory: 98,
        interpretability: 95,
        uncertainty: 65,
        complexity: 30,
      },
      strengths: ["Fast training", "Low resource usage", "Highly interpretable", "Stable predictions"],
      weaknesses: ["Limited to linear patterns", "Lower accuracy", "No uncertainty estimates", "Sensitive to outliers"],
      bestFor: ["Simple trend forecasting", "Baseline predictions", "Resource-constrained environments"],
      realWorldUse:
        "Used by Ministry of Finance for initial budget forecasting due to its simplicity and transparency.",
    },
    {
      name: "ARIMA",
      icon: <BarChart className="h-5 w-5" />,
      description: "Time series model that captures seasonal patterns",
      metrics: {
        accuracy: 85,
        speed: 88,
        memory: 92,
        interpretability: 75,
        uncertainty: 80,
        complexity: 50,
      },
      strengths: [
        "Good for time series",
        "Handles seasonality",
        "Provides confidence intervals",
        "Moderate interpretability",
      ],
      weaknesses: ["Limited to stationary data", "Requires data preprocessing", "Struggles with complex patterns"],
      bestFor: ["Seasonal demographic forecasting", "Short to medium-term predictions", "Trend analysis"],
      realWorldUse: "Deployed by Rwanda Bureau of Statistics for quarterly population estimates between census years.",
    },
    {
      name: "XGBoost",
      icon: <GitBranch className="h-5 w-5" />,
      description: "Tree-based model that excels at capturing non-linear patterns",
      metrics: {
        accuracy: 89,
        speed: 75,
        memory: 70,
        interpretability: 60,
        uncertainty: 75,
        complexity: 75,
      },
      strengths: [
        "Handles non-linear patterns",
        "Feature importance",
        "Robust to outliers",
        "Good with mixed data types",
      ],
      weaknesses: ["Higher resource usage", "More complex to tune", "Less interpretable", "Prone to overfitting"],
      bestFor: ["Complex demographic relationships", "Feature importance analysis", "Handling missing data"],
      realWorldUse: "Used by Ministry of Health to identify key factors influencing health outcomes across regions.",
    },
    {
      name: "Neural Network",
      icon: <Network className="h-5 w-5" />,
      description: "Deep learning model for complex pattern recognition",
      metrics: {
        accuracy: 87,
        speed: 60,
        memory: 55,
        interpretability: 30,
        uncertainty: 70,
        complexity: 90,
      },
      strengths: [
        "Captures complex patterns",
        "Handles large datasets",
        "Flexible architecture",
        "Good with unstructured data",
      ],
      weaknesses: ["Resource intensive", "Requires large datasets", "Black box model", "Difficult to interpret"],
      bestFor: ["Complex non-linear forecasting", "Pattern recognition", "When accuracy is critical"],
      realWorldUse: "Employed for urbanization pattern analysis where complex spatial relationships exist.",
    },
    {
      name: "Ensemble",
      icon: <Brain className="h-5 w-5" />,
      description: "Combination of multiple models for optimal performance",
      metrics: {
        accuracy: 91,
        speed: 65,
        memory: 60,
        interpretability: 50,
        uncertainty: 90,
        complexity: 85,
      },
      strengths: [
        "Highest accuracy",
        "Robust predictions",
        "Uncertainty quantification",
        "Reduces individual model weaknesses",
      ],
      weaknesses: ["Most resource intensive", "Complex to maintain", "Slower inference", "Requires expert oversight"],
      bestFor: [
        "Critical policy decisions",
        "Long-term planning",
        "When accuracy and uncertainty estimates are crucial",
      ],
      realWorldUse:
        "Used for National Development Plan forecasting where accuracy and confidence intervals are essential.",
    },
  ]

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "accuracy":
        return "Prediction Accuracy"
      case "speed":
        return "Training/Inference Speed"
      case "memory":
        return "Memory Efficiency"
      case "interpretability":
        return "Model Interpretability"
      case "uncertainty":
        return "Uncertainty Quantification"
      case "complexity":
        return "Model Complexity"
      default:
        return metric
    }
  }

  const getMetricDescription = (metric: string) => {
    switch (metric) {
      case "accuracy":
        return "How accurately the model predicts future values based on test data"
      case "speed":
        return "How quickly the model trains and makes predictions"
      case "memory":
        return "How efficiently the model uses computational resources"
      case "interpretability":
        return "How easily humans can understand the model's decisions"
      case "uncertainty":
        return "How well the model quantifies prediction uncertainty"
      case "complexity":
        return "How complex the model architecture and parameters are"
      default:
        return ""
    }
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "accuracy":
        return <CheckCircle2 className="h-4 w-4" />
      case "speed":
        return <Zap className="h-4 w-4" />
      case "memory":
        return <HardDrive className="h-4 w-4" />
      case "interpretability":
        return <FileText className="h-4 w-4" />
      case "uncertainty":
        return <AlertTriangle className="h-4 w-4" />
      case "complexity":
        return <Network className="h-4 w-4" />
      default:
        return null
    }
  }

  const getProgressColor = (metric: string, value: number) => {
    // For complexity, lower is better
    if (metric === "complexity") {
      if (value < 40) return "bg-green-500"
      if (value < 70) return "bg-amber-500"
      return "bg-red-500"
    }

    // For other metrics, higher is better
    if (value >= 85) return "bg-green-500"
    if (value >= 70) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div>
      <Tabs defaultValue="metrics">
        <TabsList className="bg-slate-800/50 mb-4">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
          <TabsTrigger value="usage">Real-World Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.keys(models[0].metrics).map((metric) => (
              <div
                key={metric}
                className={`p-2 rounded-md cursor-pointer border ${
                  selectedMetric === metric
                    ? "bg-purple-900/30 border-purple-500/50"
                    : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50"
                }`}
                onClick={() => setSelectedMetric(metric)}
              >
                <div className="flex items-center">
                  <div className={`mr-2 ${selectedMetric === metric ? "text-purple-400" : "text-slate-400"}`}>
                    {getMetricIcon(metric)}
                  </div>
                  <div className="text-sm font-medium">{getMetricLabel(metric)}</div>
                </div>
                <div className="text-xs text-slate-500 mt-1">{getMetricDescription(metric)}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/30 rounded-md border border-slate-700/50 p-4">
            <div className="text-sm font-medium text-slate-300 mb-3 flex items-center">
              {getMetricIcon(selectedMetric)}
              <span className="ml-2">{getMetricLabel(selectedMetric)}</span>
            </div>

            <div className="space-y-4">
              {models.map((model) => (
                <div key={model.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-slate-700/50 flex items-center justify-center mr-2">
                        {model.icon}
                      </div>
                      <div className="text-sm">{model.name}</div>
                    </div>
                    <div className="text-sm font-mono">
                      {model.metrics[selectedMetric as keyof typeof model.metrics]}%
                    </div>
                  </div>
                  <Progress value={model.metrics[selectedMetric as keyof typeof model.metrics]} className="h-2">
                    <div
                      className={`h-full ${getProgressColor(selectedMetric, model.metrics[selectedMetric as keyof typeof model.metrics])} rounded-full`}
                      style={{ width: `${model.metrics[selectedMetric as keyof typeof model.metrics]}%` }}
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-0">
          <div className="bg-slate-800/30 rounded-md border border-slate-700/50 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left pb-2">Model</th>
                  <th className="text-center pb-2">Strengths</th>
                  <th className="text-center pb-2">Weaknesses</th>
                  <th className="text-center pb-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.name} className="border-b border-slate-800/50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-slate-700/50 flex items-center justify-center mr-2">
                          {model.icon}
                        </div>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-xs text-slate-500">{model.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex flex-wrap gap-1">
                        {model.strengths.slice(0, 2).map((strength, i) => (
                          <Badge key={i} className="bg-green-900/30 text-green-400 border-green-700/30 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex flex-wrap gap-1">
                        {model.weaknesses.slice(0, 2).map((weakness, i) => (
                          <Badge key={i} className="bg-red-900/30 text-red-400 border-red-700/30 text-xs">
                            <X className="h-3 w-3 mr-1" />
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs text-slate-400">{model.bestFor[0]}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model) => (
              <Card key={model.name} className="bg-slate-800/30 border-slate-700/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-700/50 flex items-center justify-center mr-2">
                      {model.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{model.name}</CardTitle>
                      <CardDescription className="text-xs">{model.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-300 mb-2">
                    <div className="font-medium mb-1">Real-World Application:</div>
                    <div className="text-slate-400 text-xs">{model.realWorldUse}</div>
                  </div>

                  <div className="text-sm text-slate-300">
                    <div className="font-medium mb-1">Best Used For:</div>
                    <ul className="list-disc pl-5 text-xs text-slate-400">
                      {model.bestFor.map((use, i) => (
                        <li key={i}>{use}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2 flex items-center text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last deployed: 3 months ago</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
