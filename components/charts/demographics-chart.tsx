"use client"

interface DemographicsData {
  ageGroups: {
    label: string
    urban: number
    rural: number
  }[]
  totalPopulation: string
}

export function DemographicsChart({ data }: { data?: DemographicsData }) {
  // Default data if none is provided
  const defaultData = {
    ageGroups: [
      { label: "0-14", urban: 35, rural: 42 },
      { label: "15-24", urban: 22, rural: 20 },
      { label: "25-34", urban: 18, rural: 15 },
      { label: "35-44", urban: 12, rural: 10 },
      { label: "45-54", urban: 7, rural: 7 },
      { label: "55-64", urban: 4, rural: 4 },
      { label: "65+", urban: 2, rural: 2 },
    ],
    totalPopulation: "13.2M",
  }

  const chartData = data || defaultData

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
        {chartData.ageGroups.map((group, i) => {
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
