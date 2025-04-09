"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string
  role: "admin" | "analyst" | "viewer"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check for stored auth in localStorage (in a real app, this would be a secure cookie or token)
      const storedUser = localStorage.getItem("rwandaDataUser")

      if (storedUser) {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async () => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_123",
        name: "Demo User",
        email: "demo@example.com",
        image: "/placeholder.svg?height=40&width=40",
        role: "analyst",
      }

      // Store in localStorage (in a real app, this would be handled by a secure auth system)
      localStorage.setItem("rwandaDataUser", JSON.stringify(mockUser))

      setUser(mockUser)
      setIsAuthenticated(true)

      return mockUser
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove from localStorage
      localStorage.removeItem("rwandaDataUser")

      setUser(null)
      setIsAuthenticated(false)

      return true
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
