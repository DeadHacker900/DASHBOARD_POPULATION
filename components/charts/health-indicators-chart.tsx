"use client"

interface HealthIndicator {
  label: string
  urban: number
  rural: number
}

interface HealthData {
  indicators: HealthIndicator[]
  childMortality: number
}

export function HealthIndicatorsChart({ data }: { data?: HealthData }) {
  // Default data if none is provided
  const defaultData = {
    indicators: [
      { label: "Vaccination", urban: 95, rural: 82 },
      { label: "Prenatal Care", urban: 92, rural: 78 },
      { label: "Skilled Birth", urban: 97, rural: 85 },
      { label: "Contraceptive", urban: 65, rural: 48 },
      { label: "HIV Testing", urban: 88, rural: 72 },
    ],
    childMortality: 45,
  }

  const chartData = data || defaultData

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
        {chartData.indicators.map((indicator, i) => (
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
