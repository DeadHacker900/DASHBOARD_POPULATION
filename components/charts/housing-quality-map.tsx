"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

interface HousingQualityData {
  regions: {
    name: string
    quality: number
    coordinates: [number, number]
  }[]
}

export function HousingQualityMap({ data }: { data?: HousingQualityData }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  // Default data if none is provided
  const defaultData: HousingQualityData = {
    regions: [
      { name: "Kigali City", quality: 78.5, coordinates: [30.0619, -1.9441] },
      { name: "Eastern Province", quality: 58.2, coordinates: [30.5395, -1.7863] },
      { name: "Southern Province", quality: 61.5, coordinates: [29.7375, -2.3378] },
      { name: "Western Province", quality: 59.8, coordinates: [29.2587, -2.1643] },
      { name: "Northern Province", quality: 65.3, coordinates: [29.75, -1.5] },
    ],
  }

  const mapData = data || defaultData

  useEffect(() => {
    // If we don't have a mapbox token, render a fallback
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      if (mapContainer.current) {
        renderFallbackMap(mapContainer.current, mapData)
      }
      return
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string

    if (map.current) return // Map already initialized

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [29.8739, -1.9403], // Rwanda center
        zoom: 7.5,
      })

      map.current.on("load", () => {
        if (!map.current) return

        // Add Rwanda boundary
        map.current.addSource("rwanda-boundary", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [28.8617, -2.8389],
                  [30.8885, -2.8389],
                  [30.8885, -1.0475],
                  [28.8617, -1.0475],
                  [28.8617, -2.8389],
                ],
              ],
            },
            properties: {},
          },
        })

        map.current.addLayer({
          id: "rwanda-boundary-fill",
          type: "fill",
          source: "rwanda-boundary",
          paint: {
            "fill-color": "#1e293b",
            "fill-opacity": 0.5,
          },
        })

        map.current.addLayer({
          id: "rwanda-boundary-line",
          type: "line",
          source: "rwanda-boundary",
          paint: {
            "line-color": "#475569",
            "line-width": 2,
          },
        })

        // Add data points
        mapData.regions.forEach((region) => {
          // Create a color based on quality
          const color = getColorFromQuality(region.quality)

          // Create a popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="color: #0f172a;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${region.name}</h3>
              <p>Housing Quality: <span style="color: ${color}; font-weight: bold;">${region.quality}%</span></p>
              <p>Improved Housing</p>
            </div>`,
          )

          // Create a DOM element for the marker
          const el = document.createElement("div")
          el.className = "marker"
          el.style.backgroundColor = color
          el.style.width = "24px"
          el.style.height = "24px"
          el.style.borderRadius = "50%"
          el.style.border = "2px solid white"
          el.style.cursor = "pointer"

          // Add marker to map
          new mapboxgl.Marker(el).setLngLat(region.coordinates).setPopup(popup).addTo(map.current!)
        })
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [mapData])

  // Helper function to get color based on quality
  const getColorFromQuality = (quality: number): string => {
    if (quality >= 75) return "#10b981" // green
    if (quality >= 65) return "#06b6d4" // cyan
    if (quality >= 60) return "#3b82f6" // blue
    if (quality >= 50) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  // Fallback map renderer when no Mapbox token is available
  const renderFallbackMap = (container: HTMLDivElement, data: HousingQualityData) => {
    // Clear container
    container.innerHTML = ""

    // Create canvas
    const canvas = document.createElement("canvas")
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    container.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw background
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Rwanda outline (simplified)
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.2, canvas.height * 0.2)
    ctx.lineTo(canvas.width * 0.8, canvas.height * 0.2)
    ctx.lineTo(canvas.width * 0.8, canvas.height * 0.8)
    ctx.lineTo(canvas.width * 0.2, canvas.height * 0.8)
    ctx.closePath()
    ctx.fillStyle = "#1e293b"
    ctx.fill()
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    data.regions.forEach((region) => {
      // Map coordinates to canvas
      const x = ((region.coordinates[0] - 28.8617) / (30.8885 - 28.8617)) * canvas.width
      const y = ((region.coordinates[1] - -2.8389) / (-1.0475 - -2.8389)) * canvas.height

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fillStyle = getColorFromQuality(region.quality)
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw label
      ctx.font = "12px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText(region.name, x, y - 20)
      ctx.fillText(`${region.quality}%`, x, y + 25)
    })

    // Add note about Mapbox token
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.textAlign = "center"
    ctx.fillText("Note: Add NEXT_PUBLIC_MAPBOX_TOKEN for interactive map", canvas.width / 2, 20)
  }

  return (
    <div ref={mapContainer} className="w-full h-full relative">
      <div className="absolute bottom-2 right-2 bg-slate-900/80 p-2 rounded-md z-10">
        <div className="text-xs text-slate-300 mb-1">Housing Quality</div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs text-slate-400">&lt;50%</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-amber-500 mr-1"></div>
            <span className="text-xs text-slate-400">50-60%</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-xs text-slate-400">60-65%</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-cyan-500 mr-1"></div>
            <span className="text-xs text-slate-400">65-75%</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-slate-400">&gt;75%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
