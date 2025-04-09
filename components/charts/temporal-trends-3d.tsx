"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface TemporalTrends3DProps {
  rotationSpeed?: string
}

export function TemporalTrends3D({ rotationSpeed = "medium" }: TemporalTrends3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0f172a)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(20, 20, 20)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222)
    scene.add(gridHelper)

    // Add Rwanda map outline (simplified)
    const mapGeometry = new THREE.PlaneGeometry(30, 30)
    const mapMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    })
    const map = new THREE.Mesh(mapGeometry, mapMaterial)
    map.rotation.x = -Math.PI / 2
    scene.add(map)

    // Temporal data
    const temporalData = {
      years: [2000, 2005, 2010, 2015, 2020, 2022],
      metrics: [
        {
          name: "Population",
          values: [8.1, 9.2, 10.5, 11.8, 12.9, 13.2],
          color: 0x06b6d4,
          scale: 1,
        },
        {
          name: "Child Mortality",
          values: [196, 152, 76, 50, 45, 43],
          color: 0xef4444,
          scale: 0.05,
        },
        {
          name: "Vaccination",
          values: [72, 80, 87, 93, 95, 95],
          color: 0x10b981,
          scale: 0.1,
        },
      ],
    }

    // Create 3D visualization of temporal trends
    const yearSpacing = 5
    const metricSpacing = 8

    temporalData.metrics.forEach((metric, metricIndex) => {
      // Create a line connecting all points for this metric
      const points: THREE.Vector3[] = []

      temporalData.years.forEach((year, yearIndex) => {
        const x = yearIndex * yearSpacing - ((temporalData.years.length - 1) * yearSpacing) / 2
        const z = metricIndex * metricSpacing - ((temporalData.metrics.length - 1) * metricSpacing) / 2
        const y = metric.values[yearIndex] * metric.scale

        points.push(new THREE.Vector3(x, y, z))

        // Create a sphere at each data point
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: metric.color,
          metalness: 0.3,
          roughness: 0.4,
        })

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(x, y, z)
        scene.add(sphere)

        // Add year label for the first metric only
        if (metricIndex === 0) {
          addText(year.toString(), x, -1, z - 4)
        }

        // Add value label
        addText(metric.values[yearIndex].toString(), x, y + 1, z)
      })

      // Create line
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({ color: metric.color, linewidth: 2 })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)

      // Add metric label
      const firstPoint = points[0]
      addText(metric.name, firstPoint.x - 2, firstPoint.y, firstPoint.z)
    })

    // Helper function to add text
    function addText(text: string, x: number, y: number, z: number) {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      if (!context) return

      canvas.width = 256
      canvas.height = 128

      context.fillStyle = "#000000"
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.font = "24px Arial"
      context.fillStyle = "#ffffff"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillText(text, canvas.width / 2, canvas.height / 2)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      const geometry = new THREE.PlaneGeometry(3, 1.5)
      const textMesh = new THREE.Mesh(geometry, material)
      textMesh.position.set(x, y, z)
      textMesh.lookAt(camera.position)

      scene.add(textMesh)

      // Update text orientation to always face camera
      textMeshes.push(textMesh)
    }

    // Store text meshes to update their orientation
    const textMeshes: THREE.Mesh[] = []

    // Add legend
    const legendGeometry = new THREE.PlaneGeometry(10, 5)
    const legendCanvas = document.createElement("canvas")
    const legendContext = legendCanvas.getContext("2d")
    if (legendContext) {
      legendCanvas.width = 512
      legendCanvas.height = 256

      legendContext.fillStyle = "#1e293b"
      legendContext.fillRect(0, 0, legendCanvas.width, legendCanvas.height)

      legendContext.font = "20px Arial"
      legendContext.fillStyle = "#ffffff"
      legendContext.textAlign = "left"
      legendContext.fillText("Temporal Trends (2000-2022)", 20, 30)

      const colors = [
        { color: "#06b6d4", label: "Population (millions)" },
        { color: "#ef4444", label: "Child Mortality (per 1,000)" },
        { color: "#10b981", label: "Vaccination Coverage (%)" },
      ]

      colors.forEach((item, index) => {
        const y = 70 + index * 30

        legendContext.fillStyle = item.color
        legendContext.fillRect(20, y, 20, 20)

        legendContext.fillStyle = "#ffffff"
        legendContext.fillText(item.label, 50, y + 15)
      })

      const legendTexture = new THREE.CanvasTexture(legendCanvas)
      const legendMaterial = new THREE.MeshBasicMaterial({
        map: legendTexture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      const legend = new THREE.Mesh(legendGeometry, legendMaterial)
      legend.position.set(-13, 5, -13)
      legend.rotation.y = Math.PI / 4
      scene.add(legend)
    }

    // Animation loop
    const getRotationSpeed = () => {
      switch (rotationSpeed) {
        case "slow":
          return 0.001
        case "medium":
          return 0.003
        case "fast":
          return 0.005
        default:
          return 0
      }
    }

    function animate() {
      requestAnimationFrame(animate)

      // Update controls
      controls.update()

      // Rotate the scene if rotation is enabled
      if (rotationSpeed !== "none") {
        scene.rotation.y += getRotationSpeed()
      }

      // Update text orientations to face camera
      textMeshes.forEach((mesh) => {
        mesh.lookAt(camera.position)
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          }
        }
      })
    }
  }, [rotationSpeed])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="absolute top-2 left-2 bg-slate-900/80 p-2 rounded-md text-xs text-slate-300 z-10">
        <p>Temporal Trends 3D Visualization</p>
        <p className="text-slate-400 mt-1">Click and drag to rotate | Scroll to zoom</p>
      </div>
    </div>
  )
}
