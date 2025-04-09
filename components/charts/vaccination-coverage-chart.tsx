"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VaccinationData {
  vaccines: string[]
  coverage: number[]
  urban: number[]
  rural: number[]
}

export function VaccinationCoverageChart({ data }: { data?: VaccinationData }) {
  // Default data if none is provided
  const defaultData: VaccinationData = {
    vaccines: ["BCG", "DPT3", "Polio3", "Measles", "PCV3", "Rotavirus", "HPV"],
    coverage: [99, 98, 98, 95, 97, 96, 93],
    urban: [99, 99, 99, 98, 99, 98, 96],
    rural: [98, 97, 97, 93, 96, 95, 91],
  }

  const chartData = data || defaultData

  // Transform data for Recharts
  const transformedData = chartData.vaccines.map((vaccine, index) => ({
    vaccine,
    coverage: chartData.coverage[index],
    urban: chartData.urban[index],
    rural: chartData.rural[index],
  }))

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          coverage: {
            label: "National Coverage (%)",
            color: "hsl(var(--chart-1))",
          },
          urban: {
            label: "Urban Coverage (%)",
            color: "hsl(var(--chart-2))",
          },
          rural: {
            label: "Rural Coverage (%)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="vaccine" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} domain={[80, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            <Bar dataKey="coverage" name="National" fill="var(--color-coverage)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="urban" name="Urban" fill="var(--color-urban)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rural" name="Rural" fill="var(--color-rural)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center mt-2">
        <div className="bg-slate-800/50 px-3 py-1 rounded-full text-xs text-slate-400">
          <span className="font-medium text-slate-300">Vaccine Types:</span> BCG (Tuberculosis), DPT3 (Diphtheria,
          Pertussis, Tetanus), PCV3 (Pneumococcal), HPV (Human Papillomavirus)
        </div>
      </div>
    </div>
  )
}
