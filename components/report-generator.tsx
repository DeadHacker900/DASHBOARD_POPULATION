"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, Download } from "lucide-react"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("summary")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsGenerating(false)
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center text-base">
          <FileText className="mr-2 h-5 w-5 text-cyan-500" />
          Generate Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type" className="bg-slate-800/50 border-slate-700/50">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Report</SelectItem>
                <SelectItem value="regional">Regional Analysis</SelectItem>
                <SelectItem value="trends">Trend Analysis</SelectItem>
                <SelectItem value="health">Health Indicators</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleGenerateReport} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent"></div>
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
