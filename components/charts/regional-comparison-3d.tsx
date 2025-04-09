"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface RegionalComparison3DProps {
  rotationSpeed?: string
}

export function RegionalComparison3D({ rotationSpeed = "medium" }: RegionalComparison3DProps) {
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

    // Regional data
    const regions = [
      {
        name: "Kigali",
        coordinates: [0, 0, 0],
        metrics: [
          { name: "Population", value: 1.2, color: 0x3b82f6 },
          { name: "Density", value: 2124 / 100, color: 0xef4444 },
          { name: "Child Mortality", value: 38 / 10, color: 0x10b981 },
          { name: "Healthcare Access", value: 92 / 20, color: 0x6366f1 },
        ],
      },
      {
        name: "Eastern",
        coordinates: [10, 0, 0],
        metrics: [
          { name: "Population", value: 2.6, color: 0x3b82f6 },
          { name: "Density", value: 274 / 100, color: 0xef4444 },
          { name: "Child Mortality", value: 48 / 10, color: 0x10b981 },
          { name: "Healthcare Access", value: 68 / 20, color: 0x6366f1 },
        ],
      },
      {
        name: "Southern",
        coordinates: [0, 0, 10],
        metrics: [
          { name: "Population", value: 2.9, color: 0x3b82f6 },
          { name: "Density", value: 565 / 100, color: 0xef4444 },
          { name: "Child Mortality", value: 52 / 10, color: 0x10b981 },
          { name: "Healthcare Access", value: 65 / 20, color: 0x6366f1 },
        ],
      },
      {
        name: "Western",
        coordinates: [-10, 0, 0],
        metrics: [
          { name: "Population", value: 3.1, color: 0x3b82f6 },
          { name: "Density", value: 420 / 100, color: 0xef4444 },
          { name: "Child Mortality", value: 47 / 10, color: 0x10b981 },
          { name: "Healthcare Access", value: 62 / 20, color: 0x6366f1 },
        ],
      },
      {
        name: "Northern",
        coordinates: [0, 0, -10],
        metrics: [
          { name: "Population", value: 2.4, color: 0x3b82f6 },
          { name: "Density", value: 528 / 100, color: 0xef4444 },
          { name: "Child Mortality", value: 43 / 10, color: 0x10b981 },
          { name: "Healthcare Access", value: 72 / 20, color: 0x6366f1 },
        ],
      },
    ]

    // Create 3D bars for each region
    regions.forEach((region) => {
      const [x, y, z] = region.coordinates

      // Create a group for each region
      const regionGroup = new THREE.Group()
      regionGroup.position.set(x, y, z)
      scene.add(regionGroup)

      // Add region name
      addText(region.name, 0, 6, 0, regionGroup)

      // Add metrics as bars
      region.metrics.forEach((metric, index) => {
        const angle = (index / region.metrics.length) * Math.PI * 2
        const radius = 3
        const barX = Math.cos(angle) * radius
        const barZ = Math.sin(angle) * radius

        // Create bar
        const geometry = new THREE.BoxGeometry(1, metric.value, 1)
        const material = new THREE.MeshStandardMaterial({
          color: metric.color,
          transparent: true,
          opacity: 0.8,
          metalness: 0.3,
          roughness: 0.4,
        })

        const bar = new THREE.Mesh(geometry, material)
        bar.position.set(barX, metric.value / 2, barZ)
        regionGroup.add(bar)

        // Add wireframe
        const wireframe = new THREE.LineSegments(
          new THREE.EdgesGeometry(geometry),
          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }),
        )
        wireframe.position.copy(bar.position)
        regionGroup.add(wireframe)

        // Add metric label
        addText(metric.name, barX, metric.value + 0.5, barZ, regionGroup)
      })
    })

    // Helper function to add text
    function addText(text: string, x: number, y: number, z: number, parent: THREE.Object3D = scene) {
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

      parent.add(textMesh)

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
      legendContext.fillText("Regional Comparison", 20, 30)

      const colors = [
        { color: "#3b82f6", label: "Population (millions)" },
        { color: "#ef4444", label: "Density (scaled)" },
        { color: "#10b981", label: "Child Mortality (scaled)" },
        { color: "#6366f1", label: "Healthcare Access (scaled)" },
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
        <p>Regional Comparison 3D Visualization</p>
        <p className="text-slate-400 mt-1">Click and drag to rotate | Scroll to zoom</p>
      </div>
    </div>
  )
}
