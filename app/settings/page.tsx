"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Settings, User, Bell, Shield, Database, Palette, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const { toast } = useToast()

  // Account settings
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")

  // Appearance settings
  const [theme, setTheme] = useState("dark")
  const [chartColorScheme, setChartColorScheme] = useState("default")
  const [animationSpeed, setAnimationSpeed] = useState([50])

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dataUpdateAlerts, setDataUpdateAlerts] = useState(true)
  const [insightAlerts, setInsightAlerts] = useState(true)

  // Data settings
  const [dataRefreshInterval, setDataRefreshInterval] = useState("daily")
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [dataExportFormat, setDataExportFormat] = useState("csv")

  // Privacy settings
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center">
          <Settings className="mr-2 h-6 w-6 text-slate-400" />
          Settings
        </h1>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2 border-b border-slate-700/50">
          <CardTitle className="text-slate-100">Dashboard Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800/50 mb-6">
              <TabsTrigger value="account" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                Data
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-slate-800/50 border-slate-700/50 text-slate-200"
                  />
                  <p className="text-xs text-slate-400">Leave blank to keep current password</p>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Account Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-lg border cursor-pointer flex items-center justify-center ${
                        theme === "dark"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                      }`}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="text-center">
                        <div className="h-12 w-full bg-slate-900 rounded-md mb-2"></div>
                        <span className="text-sm text-slate-200">Dark</span>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border cursor-pointer flex items-center justify-center ${
                        theme === "light"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                      }`}
                      onClick={() => setTheme("light")}
                    >
                      <div className="text-center">
                        <div className="h-12 w-full bg-slate-300 rounded-md mb-2"></div>
                        <span className="text-sm text-slate-200">Light</span>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border cursor-pointer flex items-center justify-center ${
                        theme === "system"
                          ? "bg-slate-800 border-cyan-500"
                          : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                      }`}
                      onClick={() => setTheme("system")}
                    >
                      <div className="text-center">
                        <div className="h-12 w-full bg-gradient-to-r from-slate-900 to-slate-300 rounded-md mb-2"></div>
                        <span className="text-sm text-slate-200">System</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Chart Color Scheme</Label>
                  <Select value={chartColorScheme} onValueChange={setChartColorScheme}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-slate-200">
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Animation Speed</Label>
                  <div className="py-4">
                    <Slider value={animationSpeed} onValueChange={setAnimationSpeed} max={100} step={1} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-slate-400">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Update Alerts</Label>
                    <p className="text-sm text-slate-400">Get notified when new data is available</p>
                  </div>
                  <Switch checked={dataUpdateAlerts} onCheckedChange={setDataUpdateAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Insight Alerts</Label>
                    <p className="text-sm text-slate-400">Get notified when new insights are generated</p>
                  </div>
                  <Switch checked={insightAlerts} onCheckedChange={setInsightAlerts} />
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Data Refresh Interval</Label>
                  <Select value={dataRefreshInterval} onValueChange={setDataRefreshInterval}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-slate-200">
                      <SelectValue placeholder="Select refresh interval" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Data Caching</Label>
                    <p className="text-sm text-slate-400">Cache data locally for faster loading</p>
                  </div>
                  <Switch checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
                </div>

                <div className="space-y-2">
                  <Label>Default Export Format</Label>
                  <Select value={dataExportFormat} onValueChange={setDataExportFormat}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-slate-200">
                      <SelectValue placeholder="Select export format" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Data Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Usage Analytics</Label>
                    <p className="text-sm text-slate-400">Allow collection of anonymous usage data</p>
                  </div>
                  <Switch checked={analyticsEnabled} onCheckedChange={setAnalyticsEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-slate-400">Share your insights with the community</p>
                  </div>
                  <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                </div>

                <div className="space-y-2">
                  <Label>Data Retention</Label>
                  <Select defaultValue="90days">
                    <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-slate-200">
                      <SelectValue placeholder="Select data retention period" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-400">How long to keep your personal data</p>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Privacy Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
