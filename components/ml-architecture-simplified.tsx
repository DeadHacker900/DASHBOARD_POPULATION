import { Brain, Database, Search, Cog, Network, GitBranch, BarChart4, FileText } from "lucide-react"

export function MLArchitectureSimplified() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        {/* Input */}
        <div className="bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-slate-300 w-40 text-center mb-4 flex items-center justify-center">
          <Database className="h-4 w-4 mr-2" />
          Input Data
        </div>

        {/* Arrow */}
        <div className="h-6 w-0.5 bg-slate-700 mb-2"></div>

        {/* Orchestrator */}
        <div className="bg-purple-900/50 border border-purple-700 rounded-md p-2 text-sm text-purple-300 w-60 text-center mb-4 flex items-center justify-center">
          <Brain className="h-4 w-4 mr-2" />
          Orchestrator
        </div>

        {/* Arrow */}
        <div className="h-6 w-0.5 bg-slate-700 mb-2"></div>

        {/* Middle Layer */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="bg-blue-900/50 border border-blue-700 rounded-md p-2 text-sm text-blue-300 w-40 text-center flex items-center justify-center">
            <Search className="h-4 w-4 mr-2" />
            Query Generation
          </div>
          <div className="bg-cyan-900/50 border border-cyan-700 rounded-md p-2 text-sm text-cyan-300 w-40 text-center flex items-center justify-center">
            <Brain className="h-4 w-4 mr-2" />
            LLM Module
          </div>
          <div className="bg-teal-900/50 border border-teal-700 rounded-md p-2 text-sm text-teal-300 w-40 text-center flex items-center justify-center">
            <Cog className="h-4 w-4 mr-2" />
            Feature Engineering
          </div>
        </div>

        {/* Arrow */}
        <div className="h-6 w-0.5 bg-slate-700 mb-2"></div>

        {/* Model Layer */}
        <div className="bg-amber-900/50 border border-amber-700 rounded-md p-3 text-sm text-amber-300 w-80 mb-4">
          <div className="text-center mb-2 font-medium">Model Serving Environment</div>
          <div className="flex justify-between gap-2 mb-2">
            <div className="bg-slate-800/80 border border-slate-700 rounded-md p-1 text-xs text-slate-300 flex-1 text-center flex items-center justify-center">
              <Network className="h-3 w-3 mr-1" />
              Neural Networks
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-md p-1 text-xs text-slate-300 flex-1 text-center flex items-center justify-center">
              <GitBranch className="h-3 w-3 mr-1" />
              Tree Models
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-md p-1 text-xs text-slate-300 flex-1 text-center flex items-center justify-center">
              <BarChart4 className="h-3 w-3 mr-1" />
              Linear Models
            </div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-md p-1 text-xs text-slate-300 text-center flex items-center justify-center">
            <Brain className="h-3 w-3 mr-1" />
            Ensemble / Aggregation Logic
          </div>
        </div>

        {/* Arrow */}
        <div className="h-6 w-0.5 bg-slate-700 mb-2"></div>

        {/* Output */}
        <div className="bg-green-900/50 border border-green-700 rounded-md p-2 text-sm text-green-300 w-40 text-center flex items-center justify-center">
          <FileText className="h-4 w-4 mr-2" />
          Output / Results
        </div>
      </div>
    </div>
  )
}
