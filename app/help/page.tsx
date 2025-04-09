"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, MessageSquare, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HelpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [activeTab, setActiveTab] = useState("faq")
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Search Results",
        description: `Found 3 results for "${searchQuery}"`,
      })
    }, 1500)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false)

      // Reset form
      setContactName("")
      setContactEmail("")
      setContactMessage("")

      toast({
        title: "Message Sent",
        description: "Your message has been sent. We'll get back to you soon.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && <LoadingSpinner />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center">
          <HelpCircle className="mr-2 h-6 w-6 text-blue-500" />
          Help & Support
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
            <CardHeader className="pb-2 border-b border-slate-700/50">
              <CardTitle className="text-slate-100">Support Center</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-slate-800/50 mb-6">
                  <TabsTrigger value="faq" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="search" className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Us
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="faq" className="mt-0">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-slate-700/50">
                      <AccordionTrigger className="text-slate-200 hover:text-slate-100">
                        How do I interpret the population density map?
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400">
                        The population density map uses color coding to represent the number of people per square
                        kilometer. Darker colors indicate higher population density. You can hover over specific regions
                        to see exact figures. The map also includes a legend that explains the color scale.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-slate-700/50">
                      <AccordionTrigger className="text-slate-200 hover:text-slate-100">
                        How often is the data updated?
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400">
                        The dashboard uses data from the 2022 Rwanda Population and Housing Census and the latest
                        Demographic and Health Survey. Major updates occur when new census or survey data is released.
                        However, some indicators may be updated more frequently based on administrative data. You can
                        check the "Last Updated" timestamp on each visualization for specific information.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-slate-700/50">
                      <AccordionTrigger className="text-slate-200 hover:text-slate-100">
                        Can I export data from the dashboard?
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400">
                        Yes, you can export data from most visualizations. Look for the download button in the top-right
                        corner of each chart. You can export data in CSV, Excel, or JSON formats. For maps and complex
                        visualizations, you can also save images as PNG or SVG.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="search" className="mt-2">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Enter your search query..."
                      className="flex-1 p-2 border rounded-l-md bg-slate-800/50 border-slate-700/50 text-slate-100 focus:ring-0 focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md">
                      Search
                    </button>
                  </form>
                </TabsContent>

                <TabsContent value="contact" className="mt-2">
                  <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 p-2 w-full border rounded-md bg-slate-800/50 border-slate-700/50 text-slate-100 focus:ring-0 focus:border-blue-500"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 p-2 w-full border rounded-md bg-slate-800/50 border-slate-700/50 text-slate-100 focus:ring-0 focus:border-blue-500"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-200">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="mt-1 p-2 w-full border rounded-md bg-slate-800/50 border-slate-700/50 text-slate-100 focus:ring-0 focus:border-blue-500"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
                      Send Message
                    </button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2 border-b border-slate-700/50">
              <CardTitle className="text-slate-100">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="list-none pl-0">
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    Documentation
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    Community Forum
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
