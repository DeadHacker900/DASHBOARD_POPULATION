"use client"

import { Progress } from "@/components/ui/progress"

interface DataCompletenessProps {
  className?: string
}

export function DataCompleteness({ className }: DataCompletenessProps) {
  return (
    <div className={`pt-4 ${className}`}>
      <div className="text-xs text-slate-500 mb-2 font-mono">DATA COMPLETENESS</div>
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-400">Demographics</div>
            <div className="text-xs text-slate-400">98%</div>
          </div>
          <Progress value={98} className="h-1 bg-slate-700">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
          </Progress>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-400">Health</div>
            <div className="text-xs text-slate-400">92%</div>
          </div>
          <Progress value={92} className="h-1 bg-slate-700">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </Progress>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-400">Housing</div>
            <div className="text-xs text-slate-400">85%</div>
          </div>
          <Progress value={85} className="h-1 bg-slate-700">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </Progress>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-slate-400">Regional</div>
            <div className="text-xs text-slate-400">78%</div>
          </div>
          <Progress value={78} className="h-1 bg-slate-700">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </Progress>
        </div>
      </div>
    </div>
  )
}
