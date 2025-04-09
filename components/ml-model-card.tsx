import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart4, Network, GitBranch, Cpu, Zap } from "lucide-react"

interface MLModelCardProps {
  title: string
  description: string
  type: "neural" | "tree" | "ensemble" | "linear" | "svm"
  accuracy: number
  lastUpdated: string
  features: string[]
  className?: string
}

export function MLModelCard({
  title,
  description,
  type,
  accuracy,
  lastUpdated,
  features,
  className,
}: MLModelCardProps) {
  const getModelIcon = () => {
    switch (type) {
      case "neural":
        return <Network className="h-5 w-5 text-purple-500" />
      case "tree":
        return <GitBranch className="h-5 w-5 text-amber-500" />
      case "ensemble":
        return <Brain className="h-5 w-5 text-blue-500" />
      case "linear":
        return <BarChart4 className="h-5 w-5 text-green-500" />
      case "svm":
        return <Cpu className="h-5 w-5 text-rose-500" />
      default:
        return <Zap className="h-5 w-5 text-slate-500" />
    }
  }

  const getModelTypeBadge = () => {
    switch (type) {
      case "neural":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Neural Network</Badge>
      case "tree":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Tree-based</Badge>
      case "ensemble":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Ensemble</Badge>
      case "linear":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Linear</Badge>
      case "svm":
        return <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/50">SVM</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">Other</Badge>
    }
  }

  return (
    <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getModelIcon()}
            <CardTitle className="text-slate-100 text-base ml-2">{title}</CardTitle>
          </div>
          {getModelTypeBadge()}
        </div>
        <CardDescription className="text-slate-400 text-xs">Last updated: {lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-300 mb-3">{description}</div>

        <div className="mb-3">
          <div className="text-xs text-slate-400 mb-1">Accuracy</div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                accuracy > 85
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : accuracy > 75
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500"
                    : "bg-gradient-to-r from-red-500 to-rose-500"
              }`}
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
          <div className="text-right text-xs text-slate-400 mt-1">{accuracy}%</div>
        </div>

        <div>
          <div className="text-xs text-slate-400 mb-1">Key Features</div>
          <div className="flex flex-wrap gap-1">
            {features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
