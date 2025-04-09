"use client"

import { useEffect, useRef } from "react"

interface RegionalData {
  regions: {
    name: string
    healthIndex: number
    population: number
    coordinates: [number, number] // [x, y] as percentage of container
  }[]
}

export function RegionalMapChart({ data }: { data?: RegionalData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Default data if none is provided
  const defaultData = {
    regions: [
      { name: "Kigali City", healthIndex: 82, population: 1.2, coordinates: [50, 45] },
      { name: "Eastern Province", healthIndex: 65, population: 2.6, coordinates: [70, 45] },
      { name: "Southern Province", healthIndex: 58, population: 2.9, coordinates: [45, 70] },
      { name: "Western Province", healthIndex: 62, population: 3.1, coordinates: [25, 55] },
      { name: "Northern Province", healthIndex: 70, population: 2.4, coordinates: [40, 25] },
    ],
  }

  const mapData = data || defaultData

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw Rwanda map outline (simplified)
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.3, canvas.height * 0.2)
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.2)
    ctx.lineTo(canvas.width * 0.8, canvas.height * 0.5)
    ctx.lineTo(canvas.width * 0.6, canvas.height * 0.8)
    ctx.lineTo(canvas.width * 0.3, canvas.height * 0.8)
    ctx.lineTo(canvas.width * 0.2, canvas.height * 0.5)
    ctx.closePath()
    ctx.strokeStyle = "rgba(100, 116, 139, 0.5)"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "rgba(30, 41, 59, 0.3)"
    ctx.fill()

    // Draw region indicators
    mapData.regions.forEach((region) => {
      const x = canvas.width * (region.coordinates[0] / 100)
      const y = canvas.height * (region.coordinates[1] / 100)
      const radius = Math.max(15, (region.population / 3.5) * 15) // Scale circle by population

      // Health index determines color (green = good, amber = medium, red = poor)
      let color
      if (region.healthIndex >= 75) {
        color = "rgba(34, 197, 94, 0.7)" // green
      } else if (region.healthIndex >= 60) {
        color = "rgba(45, 212, 191, 0.7)" // cyan
      } else {
        color = "rgba(251, 191, 36, 0.7)" // amber
      }

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw region name
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.textAlign = "center"
      ctx.fillText(region.name, x, y - radius - 5)

      // Draw health index
      ctx.font = "bold 10px sans-serif"
      ctx.fillText(`${region.healthIndex}`, x, y + 3)
    })

    // Add legend
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.textAlign = "left"
    ctx.fillText("Health Index by Region", 10, 15)

    ctx.beginPath()
    ctx.arc(15, 30, 5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(34, 197, 94, 0.7)"
    ctx.fill()
    ctx.fillText("75-100 (Good)", 25, 33)

    ctx.beginPath()
    ctx.arc(15, 45, 5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)"
    ctx.fill()
    ctx.fillText("60-74 (Medium)", 25, 48)

    ctx.beginPath()
    ctx.arc(15, 60, 5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(251, 191, 36, 0.7)"
    ctx.fill()
    ctx.fillText("0-59 (Needs Improvement)", 25, 63)

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Redraw everything on resize
      // This is a simplified approach - in a real app, you'd want to extract the drawing code
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mapData])

  return (
    <div className="h-full w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
