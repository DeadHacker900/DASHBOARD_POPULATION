"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download } from "lucide-react"

export function DataDownloader() {
  const [dataset, setDataset] = useState("all")
  const [format, setFormat] = useState("csv")
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    // Simulate download
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsDownloading(false)
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center text-base">
          <Download className="mr-2 h-5 w-5 text-cyan-500" />
          Download Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dataset">Dataset</Label>
            <Select value={dataset} onValueChange={setDataset}>
              <SelectTrigger id="dataset" className="bg-slate-800/50 border-slate-700/50">
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Data</SelectItem>
                <SelectItem value="demographics">Demographics</SelectItem>
                <SelectItem value="health">Health Indicators</SelectItem>
                <SelectItem value="housing">Housing Data</SelectItem>
                <SelectItem value="regional">Regional Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="format" className="bg-slate-800/50 border-slate-700/50">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Data
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
