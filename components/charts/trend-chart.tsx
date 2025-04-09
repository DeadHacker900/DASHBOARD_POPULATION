"use client"

import { useEffect, useRef } from "react"

interface TrendData {
  years: string[]
  populationGrowth: number[]
  fertilityRate: number[]
  childMortality: number[]
}

export function TrendChart({ data }: { data?: TrendData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Default data if none is provided
  const defaultData = {
    years: ["2000", "2005", "2010", "2015", "2020", "2022"],
    populationGrowth: [3.1, 2.9, 2.7, 2.6, 2.5, 2.4],
    fertilityRate: [5.8, 5.3, 4.6, 4.2, 4.1, 4.0],
    childMortality: [107, 86, 65, 50, 45, 43],
  }

  const chartData = data || defaultData

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "rgba(100, 116, 139, 0.5)"
    ctx.lineWidth = 1

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)

    // X-axis
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Draw X-axis labels (years)
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
    ctx.textAlign = "center"

    const xStep = chartWidth / (chartData.years.length - 1)
    chartData.years.forEach((year, i) => {
      const x = padding + i * xStep
      ctx.fillText(year, x, canvas.height - padding + 15)
    })

    // Draw Y-axis labels and grid lines
    ctx.textAlign = "right"
    const yLabels = [0, 2, 4, 6, 8, 10]
    const yStep = chartHeight / (yLabels.length - 1)

    yLabels.forEach((label, i) => {
      const y = canvas.height - padding - i * yStep

      // Grid line
      ctx.beginPath()
      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()

      // Label
      ctx.fillText(label.toString(), padding - 5, y + 3)
    })

    // Draw secondary Y-axis for child mortality
    ctx.textAlign = "left"
    const mortalityLabels = [0, 20, 40, 60, 80, 100, 120]
    const mortalityStep = chartHeight / (mortalityLabels.length - 1)

    mortalityLabels.forEach((label, i) => {
      const y = canvas.height - padding - i * mortalityStep
      ctx.fillText(label.toString(), canvas.width - padding + 5, y + 3)
    })

    // Draw data lines
    const drawLine = (data: number[], color: string, yMax: number, isDashed = false) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      if (isDashed) {
        ctx.setLineDash([5, 3])
      } else {
        ctx.setLineDash([])
      }

      data.forEach((value, i) => {
        const x = padding + i * xStep
        const y = canvas.height - padding - (value / yMax) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw data points
      ctx.setLineDash([])
      data.forEach((value, i) => {
        const x = padding + i * xStep
        const y = canvas.height - padding - (value / yMax) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = "rgba(15, 23, 42, 0.8)"
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    // Draw population growth line
    drawLine(chartData.populationGrowth, "rgba(6, 182, 212, 0.8)", 10)

    // Draw fertility rate line
    drawLine(chartData.fertilityRate, "rgba(168, 85, 247, 0.8)", 10)

    // Draw child mortality line (using secondary Y-axis)
    drawLine(
      chartData.childMortality.map((v) => (v / 120) * 10), // Scale to primary axis
      "rgba(249, 115, 22, 0.8)",
      10,
      true,
    )

    // Draw legend
    const legendY = padding + 15

    // Population growth
    ctx.beginPath()
    ctx.strokeStyle = "rgba(6, 182, 212, 0.8)"
    ctx.lineWidth = 2
    ctx.setLineDash([])
    ctx.moveTo(padding + 10, legendY)
    ctx.lineTo(padding + 30, legendY)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(padding + 20, legendY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(6, 182, 212, 0.8)"
    ctx.fill()

    ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
    ctx.textAlign = "left"
    ctx.fillText("Population Growth (%)", padding + 35, legendY + 3)

    // Fertility rate
    ctx.beginPath()
    ctx.strokeStyle = "rgba(168, 85, 247, 0.8)"
    ctx.moveTo(padding + 160, legendY)
    ctx.lineTo(padding + 180, legendY)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(padding + 170, legendY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(168, 85, 247, 0.8)"
    ctx.fill()

    ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
    ctx.fillText("Fertility Rate", padding + 185, legendY + 3)

    // Child mortality
    ctx.beginPath()
    ctx.strokeStyle = "rgba(249, 115, 22, 0.8)"
    ctx.setLineDash([5, 3])
    ctx.moveTo(padding + 270, legendY)
    ctx.lineTo(padding + 290, legendY)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineDash([])
    ctx.arc(padding + 280, legendY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(249, 115, 22, 0.8)"
    ctx.fill()

    ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
    ctx.fillText("Child Mortality (per 1,000)", padding + 295, legendY + 3)

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Redraw everything on resize
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [chartData])

  return (
    <div className="h-full w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
