"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  Building2,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { systemNotifications } from "@/lib/notifications"

interface NavigationItem {
  name: string
  id: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  userName: string
  navigation: NavigationItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

const getNotificationIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Bell: Bell,
    AlertCircle: AlertCircle,
    CheckCircle: CheckCircle,
    Info: Info,
    XCircle: XCircle,
    AlertTriangle: AlertTriangle,
  }
  return iconMap[iconName] || Bell
}

export function DashboardLayout({
  children,
  userRole,
  userName,
  navigation,
  activeTab,
  setActiveTab,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount] = useState(systemNotifications.length)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super-admin":
        return "bg-red-100 text-red-800"
      case "investor":
        return "bg-green-100 text-green-800"
      case "ppp-member":
        return "bg-blue-100 text-blue-800"
      case "hod":
        return "bg-purple-100 text-purple-800"
      case "md-ceo":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "super-admin":
        return "Super Admin"
      case "investor":
        return "Investor"
      case "ppp-member":
        return "PPP Member"
      case "hod":
        return "Head of Department"
      case "md-ceo":
        return "MD/CEO"
      default:
        return "User"
    }
  }

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50"
      case "warning":
        return "bg-yellow-50"
      case "error":
        return "bg-red-50"
      default:
        return "bg-blue-50"
    }
  }

  const getNotificationIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">PPP Portal</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{userName}</p>
              <div
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(userRole)}`}
              >
                {getRoleTitle(userRole)}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {navigation.find((item) => item.id === activeTab)?.name || "Dashboard"}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                </Button>
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{notificationCount}</span>
                  </div>
                )}

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Recent Notifications</h3>
                      <p className="text-xs text-gray-500 mt-1">You have {notificationCount} notifications</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {systemNotifications.slice(0, 4).map((notif) => {
                        const IconComponent = getNotificationIcon(notif.icon)
                        return (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition ${getNotificationBgColor(notif.type)}`}
                          >
                            <div className="flex items-start space-x-3">
                              <IconComponent className={`w-5 h-5 mt-0.5 ${getNotificationIconColor(notif.type)}`} />
                              <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{notif.title}</p>
                                <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                                <p className="text-gray-500 text-xs mt-2">{notif.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        className="w-full text-sm bg-transparent"
                        onClick={() => {
                          setActiveTab("notifications")
                          setShowNotifications(false)
                        }}
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-600">{getRoleTitle(userRole)}</p>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
