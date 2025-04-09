"use client"

interface HousingData {
  improvedPercentage: number
  traditionalPercentage: number
  housingTypes: {
    type: string
    percentage: number
  }[]
}

export function HousingChart({ data }: { data?: HousingData }) {
  // Default data if none is provided
  const defaultData = {
    improvedPercentage: 62.8,
    traditionalPercentage: 37.2,
    housingTypes: [
      { type: "Modern", percentage: 28.5 },
      { type: "Semi-modern", percentage: 34.3 },
      { type: "Traditional", percentage: 37.2 },
    ],
  }

  const chartData = data || defaultData

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
              <div className="text-xl font-bold text-cyan-400">{chartData.improvedPercentage}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-sm bg-cyan-500 mr-2"></div>
          <span className="text-xs text-slate-400">Improved Housing ({chartData.improvedPercentage}%)</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-sm bg-purple-500 mr-2"></div>
          <span className="text-xs text-slate-400">Traditional Housing ({chartData.traditionalPercentage}%)</span>
        </div>
      </div>

      {/* Housing types */}
      <div className="absolute top-4 left-4 text-xs text-slate-400">
        <div className="mb-1">Housing Types:</div>
        {chartData.housingTypes.map((type, index) => (
          <div key={index} className="pl-2">
            - {type.type} ({type.percentage}%)
          </div>
        ))}
      </div>
    </div>
  )
}
