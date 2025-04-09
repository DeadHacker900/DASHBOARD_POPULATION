import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "population"
  const region = searchParams.get("region") || "national"

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return different data based on the visualization type
  switch (type) {
    case "population":
      return NextResponse.json({
        success: true,
        data: {
          provinces: [
            { name: "Kigali", density: 2124, population: 1.2, coordinates: [0, 0, 0] },
            { name: "Eastern", density: 274, population: 2.6, coordinates: [10, 0, 0] },
            { name: "Southern", density: 565, population: 2.9, coordinates: [0, 0, 10] },
            { name: "Western", density: 420, population: 3.1, coordinates: [-10, 0, 0] },
            { name: "Northern", density: 528, population: 2.4, coordinates: [0, 0, -10] },
          ],
        },
      })

    case "health":
      return NextResponse.json({
        success: true,
        data: {
          indicators: [
            { name: "Child Mortality", value: 45, coordinates: [-5, 0, -5] },
            { name: "Maternal Mortality", value: 248, coordinates: [5, 0, -5] },
            { name: "Vaccination Coverage", value: 95, coordinates: [5, 0, 5] },
            { name: "Healthcare Access", value: 76, coordinates: [-5, 0, 5] },
            { name: "Health Insurance", value: 85, coordinates: [0, 0, 0] },
          ],
        },
      })

    case "regional":
      return NextResponse.json({
        success: true,
        data: {
          regions: [
            {
              name: "Kigali",
              metrics: [
                { name: "Population", value: 1.2 },
                { name: "Density", value: 2124 },
                { name: "Child Mortality", value: 38 },
                { name: "Healthcare Access", value: 92 },
              ],
              coordinates: [0, 0, 0],
            },
            {
              name: "Eastern",
              metrics: [
                { name: "Population", value: 2.6 },
                { name: "Density", value: 274 },
                { name: "Child Mortality", value: 48 },
                { name: "Healthcare Access", value: 68 },
              ],
              coordinates: [10, 0, 0],
            },
            {
              name: "Southern",
              metrics: [
                { name: "Population", value: 2.9 },
                { name: "Density", value: 565 },
                { name: "Child Mortality", value: 52 },
                { name: "Healthcare Access", value: 65 },
              ],
              coordinates: [0, 0, 10],
            },
            {
              name: "Western",
              metrics: [
                { name: "Population", value: 3.1 },
                { name: "Density", value: 420 },
                { name: "Child Mortality", value: 47 },
                { name: "Healthcare Access", value: 62 },
              ],
              coordinates: [-10, 0, 0],
            },
            {
              name: "Northern",
              metrics: [
                { name: "Population", value: 2.4 },
                { name: "Density", value: 528 },
                { name: "Child Mortality", value: 43 },
                { name: "Healthcare Access", value: 72 },
              ],
              coordinates: [0, 0, -10],
            },
          ],
        },
      })

    case "temporal":
      return NextResponse.json({
        success: true,
        data: {
          years: [2000, 2005, 2010, 2015, 2020, 2022],
          metrics: [
            {
              name: "Population",
              values: [8.1, 9.2, 10.5, 11.8, 12.9, 13.2],
              color: 0x06b6d4,
            },
            {
              name: "Child Mortality",
              values: [196, 152, 76, 50, 45, 43],
              color: 0xef4444,
            },
            {
              name: "Vaccination",
              values: [72, 80, 87, 93, 95, 95],
              color: 0x10b981,
            },
          ],
        },
      })

    default:
      return NextResponse.json({ success: false, message: "Invalid visualization type" }, { status: 400 })
  }
}
