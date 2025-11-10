"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Shield,
  Settings,
  FileText,
  Activity,
  Mail,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  Save,
  Server,
  Database,
  Bell,
  ArrowLeft,
  Calendar,
  MessageSquare,
  FileCheck,
  TrendingUp,
  AlertCircle,
  Clock,
  BarChart3,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUploadZone } from "@/components/file-upload-zone"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { systemNotifications } from "@/lib/notifications" // Imported systemNotifications

const users = [
  {
    id: "USR-001",
    name: "John PPP Member",
    email: "john.ppp@gov.ng",
    role: "PPP Member",
    department: "Infrastructure Development",
    status: "Active",
    lastLogin: "2024-01-28 14:30",
    createdDate: "2024-01-01",
    phone: "+234 801 234 5678",
    totalInterests: 12,
    approvedInterests: 8,
    pendingInterests: 4,
  },
  {
    id: "USR-002",
    name: "Sarah Director",
    email: "sarah.hod@gov.ng",
    role: "HoD",
    department: "Project Management",
    status: "Active",
    lastLogin: "2024-01-28 09:15",
    createdDate: "2024-01-01",
    phone: "+234 802 345 6789",
    totalInterests: 0,
    approvedInterests: 0,
    pendingInterests: 0,
  },
  {
    id: "USR-003",
    name: "Michael CEO",
    email: "michael.ceo@gov.ng",
    role: "MD/CEO",
    department: "Executive Office",
    status: "Active",
    lastLogin: "2024-01-27 16:45",
    createdDate: "2024-01-01",
    phone: "+234 803 456 7890",
    totalInterests: 0,
    approvedInterests: 0,
    pendingInterests: 0,
  },
]

const userActivityLogs = [
  {
    id: "ACT-001",
    action: "Created new proposal",
    details: "PPP-2024-005 - Smart City Infrastructure",
    timestamp: "2024-01-28 14:30:25",
    type: "Created",
  },
  {
    id: "ACT-002",
    action: "Approved IC/NDA stage",
    details: "PPP-2024-003 - Healthcare Platform",
    timestamp: "2024-01-28 12:15:10",
    type: "Approval",
  },
  {
    id: "ACT-003",
    action: "Uploaded business proposal",
    details: "PPP-2024-002 - Renewable Energy Project",
    timestamp: "2024-01-27 16:45:30",
    type: "Upload",
  },
  {
    id: "ACT-004",
    action: "Logged in to dashboard",
    details: "User accessed the system",
    timestamp: "2024-01-27 09:00:00",
    type: "Login",
  },
]

const userInterests = [
  {
    id: "INT-001",
    projectTitle: "Smart City Infrastructure",
    investorName: "TechCorp International",
    status: "Business Proposal",
    submittedDate: "2024-01-15",
    lastUpdate: "2024-01-28",
  },
  {
    id: "INT-002",
    projectTitle: "Healthcare Platform Development",
    investorName: "MedTech Solutions",
    status: "HoD Review",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-27",
  },
  {
    id: "INT-003",
    projectTitle: "Renewable Energy Initiative",
    investorName: "GreenEnergy Corp",
    status: "IC/NDA Exchange",
    submittedDate: "2024-01-20",
    lastUpdate: "2024-01-26",
  },
]

const auditLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-01-28 14:30:25",
    user: "John PPP Member",
    action: "Created new proposal",
    details: "PPP-2024-005 - Smart City Infrastructure",
    ipAddress: "192.168.1.100",
    type: "Created",
  },
  {
    id: "LOG-002",
    timestamp: "2024-01-28 14:15:10",
    user: "Sarah Director",
    action: "Approved PMC package",
    details: "PPP-2024-003 - Healthcare Platform",
    ipAddress: "192.168.1.101",
    type: "Approval",
  },
  {
    id: "LOG-003",
    timestamp: "2024-01-28 13:45:30",
    user: "Michael CEO",
    action: "Scheduled investor presentation",
    details: "PPP-2024-002 - Renewable Energy Project",
    ipAddress: "192.168.1.102",
    type: "System",
  },
  {
    id: "LOG-004",
    timestamp: "2024-01-28 12:30:15",
    user: "Admin User",
    action: "Updated system settings",
    details: "Modified SMTP configuration",
    ipAddress: "192.168.1.1",
    type: "System",
  },
]

const systemTemplates = [
  {
    id: "TMPL-001",
    name: "Investment Certificate Template",
    type: "IC Document",
    fileSize: "2.5 MB",
    uploadDate: "2024-01-15",
    version: "v2.1",
  },
  {
    id: "TMPL-002",
    name: "NDA Template",
    type: "NDA Document",
    fileSize: "1.8 MB",
    uploadDate: "2024-01-15",
    version: "v1.5",
  },
  {
    id: "TMPL-003",
    name: "Business Proposal Template",
    type: "Business Plan",
    fileSize: "3.2 MB",
    uploadDate: "2024-01-15",
    version: "v2.0",
  },
  {
    id: "TMPL-004",
    name: "PAM Assessment Template",
    type: "PAM Document",
    fileSize: "2.1 MB",
    uploadDate: "2024-01-15",
    version: "v1.8",
  },
]

const savedEmailTemplates = [
  {
    id: "EMAIL-001",
    name: "Welcome Email",
    subject: "Welcome to PPP Management System",
    type: "Welcome",
    lastModified: "2024-01-15",
  },
  {
    id: "EMAIL-002",
    name: "Approval Notification",
    subject: "Your proposal has been approved",
    type: "Approval",
    lastModified: "2024-01-18",
  },
  {
    id: "EMAIL-003",
    name: "Status Update",
    subject: "Project Status Update",
    type: "Status Update",
    lastModified: "2024-01-20",
  },
]

const savedSMSTemplates = [
  {
    id: "SMS-001",
    name: "Verification Code",
    message: "Your verification code is: {CODE}. Valid for 10 minutes.",
    type: "Verification",
    lastModified: "2024-01-15",
  },
  {
    id: "SMS-002",
    name: "Meeting Reminder",
    message: "Reminder: Meeting scheduled for {DATE} at {TIME}.",
    type: "Meeting",
    lastModified: "2024-01-18",
  },
]

const systemHealthData = {
  uptime: 99.95,
  downtime: 0.05,
  totalMonitors: 12,
  activeAlerts: 2,
  lastChecked: "2024-01-28 15:45:30",
}

const uptimeHistory = [
  { month: "December 2023", uptime: 99.92, downtime: 0.08, incidents: 1 },
  { month: "January 2024", uptime: 99.95, downtime: 0.05, incidents: 0 },
  { month: "February 2024", uptime: 99.88, downtime: 0.12, incidents: 2 },
  { month: "March 2024", uptime: 99.99, downtime: 0.01, incidents: 0 },
  { month: "April 2024", uptime: 99.91, downtime: 0.09, incidents: 1 },
  { month: "May 2024", uptime: 99.97, downtime: 0.03, incidents: 0 },
]

const emailServiceData = {
  sentToday: 342,
  pendingToday: 12,
  failedToday: 3,
  avgDeliveryTime: "2.3s",
}

const emailHistoryLast7Days = [
  { date: "Jan 22", sent: 284, pending: 5, failed: 1 },
  { date: "Jan 23", sent: 312, pending: 8, failed: 2 },
  { date: "Jan 24", sent: 298, pending: 3, failed: 0 },
  { date: "Jan 25", sent: 325, pending: 11, failed: 1 },
  { date: "Jan 26", sent: 308, pending: 7, failed: 2 },
  { date: "Jan 27", sent: 335, pending: 9, failed: 1 },
  { date: "Jan 28", sent: 342, pending: 12, failed: 3 },
]

const systemServices = [
  { name: "Web Server", status: "Operational", uptime: 99.98, responseTime: "145ms" },
  { name: "Database", status: "Operational", uptime: 99.99, responseTime: "12ms" },
  { name: "Email Service", status: "Operational", uptime: 99.92, responseTime: "2.3s" },
  { name: "File Storage", status: "Operational", uptime: 99.95, responseTime: "234ms" },
  { name: "Cache Server", status: "Warning", uptime: 98.5, responseTime: "1.2s" },
  { name: "API Gateway", status: "Operational", uptime: 99.97, responseTime: "89ms" },
]

const systemNotificationsData = [
  // Renamed to avoid conflict with imported systemNotifications
  {
    id: "NOTIF-001",
    title: "System Maintenance Scheduled",
    message: "System maintenance is scheduled for next Sunday from 2 AM to 4 AM PST.",
    timestamp: "2024-01-28 15:00:00",
    type: "info",
    icon: Bell,
  },
  {
    id: "NOTIF-002",
    title: "New User Registration",
    message: "A new user has registered with the email address john.doe@example.com.",
    timestamp: "2024-01-28 14:30:00",
    type: "success",
    icon: Users,
  },
  {
    id: "NOTIF-003",
    title: "High CPU Usage Detected",
    message: "CPU usage on server web-01 has exceeded 90% for the last 10 minutes.",
    timestamp: "2024-01-28 13:45:00",
    type: "warning",
    icon: AlertCircle,
  },
  {
    id: "NOTIF-004",
    title: "Database Backup Completed",
    message: "Daily database backup completed successfully at 03:00 AM.",
    timestamp: "2024-01-28 03:05:00",
    type: "success",
    icon: Database,
  },
  {
    id: "NOTIF-005",
    title: "Incoming Investment Proposal",
    message: "New investment proposal received for Project Alpha.",
    timestamp: "2024-01-27 16:00:00",
    type: "info",
    icon: FileCheck,
  },
]

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [viewingUser, setViewingUser] = useState<any>(null)
  const [interestFilter, setInterestFilter] = useState("all")
  const [activityFilter, setActivityFilter] = useState("all")
  const [showDeleteTemplate, setShowDeleteTemplate] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportType, setExportType] = useState("")

  const [notificationFilter, setNotificationFilter] = useState<"all" | "success" | "warning" | "error" | "info">("all")
  const [notificationPage, setNotificationPage] = useState(1)
  const [notificationSearch, setNotificationSearch] = useState("")

  const itemsPerPage = 5

  const navigation = [
    { name: "Overview", id: "overview", icon: Activity },
    { name: "User Management", id: "users", icon: Users },
    { name: "Audit Logs", id: "audit", icon: Shield },
    { name: "System Settings", id: "settings", icon: Settings },
    { name: "Document Templates", id: "templates", icon: FileText },
    { name: "Communications", id: "communications", icon: Mail },
    { name: "System Health", id: "system-health", icon: BarChart3 },
    { name: "Notifications", id: "notifications", icon: Bell },
  ]

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setShowEditUser(true)
  }

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setShowDeleteConfirm(true)
  }

  const handleViewUser = (user: any) => {
    setViewingUser(user)
  }

  const handleDeleteTemplate = (template: any, type: string) => {
    setSelectedTemplate({ ...template, templateType: type })
    setShowDeleteTemplate(true)
  }

  const handleEditTemplate = (template: any, type: string) => {
    setEditingTemplate({ ...template, templateType: type })
  }

  const handleExport = (format: string) => {
    const timestamp = new Date().toISOString().split("T")[0]
    let content = ""
    let filename = ""

    if (format === "csv") {
      content = generateCSVReport()
      filename = `system-health-${timestamp}.csv`
    } else if (format === "json") {
      content = JSON.stringify(generateJSONReport(), null, 2)
      filename = `system-health-${timestamp}.json`
    } else if (format === "pdf") {
      filename = `system-health-${timestamp}.pdf`
      // In a real app, you'd use a library like pdfkit or html2pdf
      alert("PDF export would be generated using a PDF library")
      return
    }

    if (format === "csv" || format === "json") {
      const blob = new Blob([content], { type: "text/plain" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }

    setShowExportDialog(false)
  }

  const generateCSVReport = () => {
    let csv = "System Health Report\n"
    csv += `Generated: ${new Date().toLocaleString()}\n\n`

    csv += "UPTIME HISTORY\n"
    csv += "Month,Uptime %,Downtime %,Incidents\n"
    uptimeHistory.forEach((row) => {
      csv += `${row.month},${row.uptime},${row.downtime},${row.incidents}\n`
    })

    csv += "\nEMAIL SERVICE (Last 7 Days)\n"
    csv += "Date,Sent,Pending,Failed\n"
    emailHistoryLast7Days.forEach((row) => {
      csv += `${row.date},${row.sent},${row.pending},${row.failed}\n`
    })

    csv += "\nSYSTEM SERVICES\n"
    csv += "Service,Status,Uptime %,Response Time\n"
    systemServices.forEach((service) => {
      csv += `${service.name},${service.status},${service.uptime},${service.responseTime}\n`
    })

    return csv
  }

  const generateJSONReport = () => {
    return {
      generatedAt: new Date().toISOString(),
      systemHealth: systemHealthData,
      uptimeHistory,
      emailServiceData,
      emailHistoryLast7Days,
      systemServices,
    }
  }

  const filteredInterests = userInterests.filter((interest) => {
    if (interestFilter === "all") return true
    return interest.status === interestFilter
  })

  const filteredActivities = userActivityLogs.filter((activity) => {
    if (activityFilter === "all") return true
    return activity.type === activityFilter
  })

  const filteredNotifications = systemNotifications.filter((notif) => {
    const matchesType = notificationFilter === "all" || notif.type === notificationFilter
    const matchesSearch =
      notif.title.toLowerCase().includes(notificationSearch.toLowerCase()) ||
      notif.message.toLowerCase().includes(notificationSearch.toLowerCase())
    return matchesType && matchesSearch
  })

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const paginatedNotifications = filteredNotifications.slice(
    (notificationPage - 1) * itemsPerPage,
    notificationPage * itemsPerPage,
  )

  const renderContent = () => {
    if (viewingUser) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setViewingUser(null)} className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Button>
          </div>

          <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{viewingUser.name}</h1>
                <p className="text-blue-100">User Profile & Activity Overview</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{viewingUser.totalInterests}</div>
                    <div className="text-sm text-gray-600">Total Interests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{viewingUser.approvedInterests}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{viewingUser.pendingInterests}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">User ID</Label>
                  <p className="font-medium text-gray-800">{viewingUser.id}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Email</Label>
                  <p className="font-medium text-gray-800">{viewingUser.email}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Role</Label>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {viewingUser.role}
                  </Badge>
                </div>
                <div>
                  <Label className="text-gray-600">Department</Label>
                  <p className="font-medium text-gray-800">{viewingUser.department}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Phone</Label>
                  <p className="font-medium text-gray-800">{viewingUser.phone}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Status</Label>
                  <Badge
                    className={
                      viewingUser.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }
                  >
                    {viewingUser.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-gray-600">Last Login</Label>
                  <p className="font-medium text-gray-800">{viewingUser.lastLogin}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Created Date</Label>
                  <p className="font-medium text-gray-800">{viewingUser.createdDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity Log</CardTitle>
                <div className="flex space-x-2">
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Activities</option>
                    <option value="Created">Created</option>
                    <option value="Approval">Approval</option>
                    <option value="Upload">Upload</option>
                    <option value="Login">Login</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge
                            variant="outline"
                            className={
                              activity.type === "Created"
                                ? "bg-green-50 text-green-700"
                                : activity.type === "Approval"
                                  ? "bg-blue-50 text-blue-700"
                                  : activity.type === "Upload"
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-gray-50 text-gray-700"
                            }
                          >
                            {activity.type}
                          </Badge>
                          <span className="font-medium text-gray-800">{activity.action}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{activity.details}</div>
                        <div className="text-xs text-gray-500">{activity.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Declared Interests</CardTitle>
                <div className="flex space-x-2">
                  <select
                    value={interestFilter}
                    onChange={(e) => setInterestFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Stages</option>
                    <option value="Interest Expressed">Interest Expressed</option>
                    <option value="IC/NDA Exchange">IC/NDA Exchange</option>
                    <option value="Business Proposal">Business Proposal</option>
                    <option value="HoD Review">HoD Review</option>
                    <option value="MD/CEO Approval">MD/CEO Approval</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInterests.map((interest) => (
                  <div key={interest.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-gray-800">{interest.projectTitle}</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {interest.id}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">Investor: {interest.investorName}</div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Submitted: {interest.submittedDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Updated: {interest.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={
                          interest.status === "HoD Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : interest.status === "Business Proposal"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {interest.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Super Admin Dashboard</h1>
                  <p className="text-blue-100">System-wide management and configuration</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">24</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">156</div>
                      <div className="text-sm text-gray-600">Actions Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">12</div>
                      <div className="text-sm text-gray-600">System Templates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">3</div>
                      <div className="text-sm text-gray-600">System Alerts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                  <CardDescription>Latest actions across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {log.user} • {log.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setActiveTab("audit")}
                  >
                    View All Logs
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Server className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Server Status</p>
                          <p className="text-sm text-green-600">All systems operational</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-800">Database</p>
                          <p className="text-sm text-blue-600">Connected and synced</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-800">Email Service</p>
                          <p className="text-sm text-yellow-600">156 emails sent today</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "users":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600">Create and manage system users and roles</p>
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowCreateUser(!showCreateUser)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </div>

            {showCreateUser && (
              <Card className="shadow-lg border-0 border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle>Create New User</CardTitle>
                  <CardDescription>Add a new user to the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="Enter full name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="user@gov.ng" />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select role</option>
                        <option value="ppp-member">PPP Member</option>
                        <option value="hod">Head of Department</option>
                        <option value="md-ceo">MD/CEO</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" placeholder="Enter department" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+234 801 234 5678" />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Create User
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateUser(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Users</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search users..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                {showFilterMenu && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Role</Label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="all">All Roles</option>
                          <option value="ppp-member">PPP Member</option>
                          <option value="hod">HoD</option>
                          <option value="md-ceo">MD/CEO</option>
                        </select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <div>
                        <Label>Department</Label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="all">All Departments</option>
                          <option value="infrastructure">Infrastructure</option>
                          <option value="project">Project Management</option>
                          <option value="executive">Executive Office</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Apply Filters
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowFilterMenu(false)}>
                        Clear
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="font-semibold text-gray-800">{user.name}</div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {user.role}
                          </Badge>
                          <Badge
                            className={
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.email} • {user.department}
                        </div>
                        <div className="text-xs text-gray-500">Last login: {user.lastLogin}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewUser(user)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>Update user information</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editFullName">Full Name</Label>
                    <Input id="editFullName" defaultValue={selectedUser?.name} />
                  </div>
                  <div>
                    <Label htmlFor="editEmail">Email Address</Label>
                    <Input id="editEmail" type="email" defaultValue={selectedUser?.email} />
                  </div>
                  <div>
                    <Label htmlFor="editRole">Role</Label>
                    <select
                      id="editRole"
                      defaultValue={selectedUser?.role}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ppp-member">PPP Member</option>
                      <option value="hod">Head of Department</option>
                      <option value="md-ceo">MD/CEO</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="editDepartment">Department</Label>
                    <Input id="editDepartment" defaultValue={selectedUser?.department} />
                  </div>
                  <div>
                    <Label htmlFor="editPhone">Phone Number</Label>
                    <Input id="editPhone" defaultValue={selectedUser?.phone} />
                  </div>
                  <div>
                    <Label htmlFor="editStatus">Status</Label>
                    <select
                      id="editStatus"
                      defaultValue={selectedUser?.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditUser(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete user <strong>{selectedUser?.name}</strong>? This action cannot be
                    undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Delete User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )

      case "audit":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
                <p className="text-gray-600">System-wide activity tracking and monitoring</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Activity Log</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search logs..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge
                              variant="outline"
                              className={
                                log.type === "Created"
                                  ? "bg-green-50 text-green-700"
                                  : log.type === "Approval"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-yellow-50 text-yellow-700"
                              }
                            >
                              {log.type}
                            </Badge>
                            <span className="font-medium text-gray-800">{log.action}</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{log.details}</div>
                          <div className="text-xs text-gray-500">
                            {log.user} • {log.timestamp} • IP: {log.ipAddress}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
              <p className="text-gray-600">Configure system-wide settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>SMTP Configuration</CardTitle>
                  <CardDescription>Configure email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input id="smtpHost" placeholder="smtp.example.com" defaultValue="smtp.gov.ng" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpPort">Port</Label>
                      <Input id="smtpPort" placeholder="587" defaultValue="587" />
                    </div>
                    <div>
                      <Label htmlFor="encryption">Encryption</Label>
                      <select
                        id="encryption"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtpUser">Username</Label>
                    <Input id="smtpUser" placeholder="noreply@gov.ng" defaultValue="noreply@gov.ng" />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input id="smtpPassword" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save SMTP Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>SMS Configuration</CardTitle>
                  <CardDescription>Configure SMS gateway settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="smsProvider">SMS Provider</Label>
                    <select
                      id="smsProvider"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="twilio">Twilio</option>
                      <option value="nexmo">Nexmo</option>
                      <option value="aws-sns">AWS SNS</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="smsApiKey">API Key</Label>
                    <Input id="smsApiKey" placeholder="Enter API key" />
                  </div>
                  <div>
                    <Label htmlFor="smsApiSecret">API Secret</Label>
                    <Input id="smsApiSecret" type="password" placeholder="Enter API secret" />
                  </div>
                  <div>
                    <Label htmlFor="smsSender">Sender ID</Label>
                    <Input id="smsSender" placeholder="GOV-NG" defaultValue="GOV-NG" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save SMS Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>System-wide configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="systemName">System Name</Label>
                    <Input id="systemName" defaultValue="PPP Management System" />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input id="supportEmail" type="email" defaultValue="support@gov.ng" />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save General Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "templates":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Templates</h1>
                <p className="text-gray-600">Manage system-wide document templates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Upload New Template</CardTitle>
                  <CardDescription>Add or update system templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="templateType">Template Type</Label>
                    <select
                      id="templateType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select template type</option>
                      <option value="ic">Investment Certificate (IC)</option>
                      <option value="nda">Non-Disclosure Agreement (NDA)</option>
                      <option value="business-plan">Business Proposal Template</option>
                      <option value="pam">PAM Assessment Template</option>
                      <option value="pmc">PMC Template</option>
                    </select>
                  </div>

                  <FileUploadZone
                    title="Template Document"
                    description="Upload template file (PDF, DOC, DOCX)"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="15MB"
                    status="required"
                  />

                  <div>
                    <Label htmlFor="templateVersion">Version</Label>
                    <Input id="templateVersion" placeholder="e.g., v2.0" />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Existing Templates</CardTitle>
                  <CardDescription>Manage uploaded templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-800">{template.name}</p>
                            <p className="text-sm text-gray-600">
                              {template.type} • {template.fileSize} • {template.version}
                            </p>
                            <p className="text-xs text-gray-500">Uploaded: {template.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "communications":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Communication Templates</h1>
              <p className="text-gray-600">Manage email and SMS templates</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Create Email Template</CardTitle>
                  <CardDescription>Configure automated email messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="emailName">Template Name</Label>
                    <Input id="emailName" placeholder="e.g., Welcome Email" />
                  </div>
                  <div>
                    <Label htmlFor="emailType">Email Type</Label>
                    <select
                      id="emailType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="welcome">Welcome Email</option>
                      <option value="approval">Approval Notification</option>
                      <option value="rejection">Rejection Notification</option>
                      <option value="status-update">Status Update</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="emailSubject">Subject Line</Label>
                    <Input id="emailSubject" placeholder="Enter email subject" />
                  </div>
                  <div>
                    <Label htmlFor="emailBody">Email Body</Label>
                    <Textarea id="emailBody" rows={6} placeholder="Enter email content..." />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Email Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Create SMS Template</CardTitle>
                  <CardDescription>Configure automated SMS messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="smsName">Template Name</Label>
                    <Input id="smsName" placeholder="e.g., Verification Code" />
                  </div>
                  <div>
                    <Label htmlFor="smsType">SMS Type</Label>
                    <select
                      id="smsType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="verification">Verification Code</option>
                      <option value="approval">Approval Alert</option>
                      <option value="meeting">Meeting Reminder</option>
                      <option value="deadline">Deadline Reminder</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="smsBody">SMS Message</Label>
                    <Textarea
                      id="smsBody"
                      rows={4}
                      placeholder="Enter SMS content (max 160 characters)..."
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">Character count: 0/160</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save SMS Template
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Saved Email Templates</CardTitle>
                <CardDescription>Manage existing email templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedEmailTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">{template.name}</p>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                          <p className="text-xs text-gray-500">
                            {template.type} • Last modified: {template.lastModified}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template, "email")}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteTemplate(template, "email")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Saved SMS Templates</CardTitle>
                <CardDescription>Manage existing SMS templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedSMSTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-800">{template.name}</p>
                          <p className="text-sm text-gray-600">{template.message}</p>
                          <p className="text-xs text-gray-500">
                            {template.type} • Last modified: {template.lastModified}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template, "sms")}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteTemplate(template, "sms")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit {editingTemplate?.templateType === "email" ? "Email" : "SMS"} Template</DialogTitle>
                  <DialogDescription>Update template information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="editTemplateName">Template Name</Label>
                    <Input id="editTemplateName" defaultValue={editingTemplate?.name} />
                  </div>
                  {editingTemplate?.templateType === "email" ? (
                    <>
                      <div>
                        <Label htmlFor="editEmailSubject">Subject Line</Label>
                        <Input id="editEmailSubject" defaultValue={editingTemplate?.subject} />
                      </div>
                      <div>
                        <Label htmlFor="editEmailBody">Email Body</Label>
                        <Textarea
                          id="editEmailBody"
                          rows={6}
                          placeholder="Enter email content..."
                          defaultValue={editingTemplate?.message}
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <Label htmlFor="editSMSBody">SMS Message</Label>
                      <Textarea id="editSMSBody" rows={4} defaultValue={editingTemplate?.message} maxLength={160} />
                      <p className="text-xs text-gray-500 mt-1">Character count: 0/160</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showDeleteTemplate} onOpenChange={setShowDeleteTemplate}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete the template <strong>{selectedTemplate?.name}</strong>? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteTemplate(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setShowDeleteTemplate(false)}
                  >
                    Delete Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )

      case "system-health":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">System Health & Monitoring</h1>
                <p className="text-gray-600">Track system uptime, downtime, and service performance</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowExportDialog(true)}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{systemHealthData.uptime}%</div>
                      <div className="text-sm text-gray-600">Current Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{systemHealthData.downtime}%</div>
                      <div className="text-sm text-gray-600">Current Downtime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Server className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{systemHealthData.totalMonitors}</div>
                      <div className="text-sm text-gray-600">Monitors Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{systemHealthData.activeAlerts}</div>
                      <div className="text-sm text-gray-600">Active Alerts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Uptime & Downtime History (Last 6 Months)</CardTitle>
                <CardDescription>Monthly system availability tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={uptimeHistory} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uptime" fill="#10b981" name="Uptime %" />
                    <Bar dataKey="downtime" fill="#ef4444" name="Downtime %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Email Service Metrics</CardTitle>
                <CardDescription>Email delivery performance and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Sent Today</p>
                    <p className="text-2xl font-bold text-blue-600">{emailServiceData.sentToday}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{emailServiceData.pendingToday}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{emailServiceData.failedToday}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg Delivery Time</p>
                    <p className="text-2xl font-bold text-green-600">{emailServiceData.avgDeliveryTime}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-4">Last 7 Days Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emailHistoryLast7Days}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sent" stroke="#3b82f6" name="Sent" strokeWidth={2} />
                    <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="Pending" strokeWidth={2} />
                    <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>System Services Status</CardTitle>
                <CardDescription>Individual service health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Services Overview</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Operational",
                              value: systemServices.filter((s) => s.status === "Operational").length,
                            },
                            {
                              name: "Warning",
                              value: systemServices.filter((s) => s.status === "Warning").length,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Service Details</h4>
                    <div className="space-y-3">
                      {systemServices.map((service, idx) => (
                        <div key={idx} className="p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <Server className="w-5 h-5 text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{service.name}</p>
                                <p className="text-xs text-gray-600">{service.responseTime}</p>
                              </div>
                            </div>
                            <Badge
                              className={
                                service.status === "Operational"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {service.uptime}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Last System Check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Last checked: {systemHealthData.lastChecked}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">System Notifications</h1>
              <p className="text-gray-600">View all system notifications and alerts</p>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Notification Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Search Notifications</label>
                    <Input
                      placeholder="Search by title or message..."
                      value={notificationSearch}
                      onChange={(e) => {
                        setNotificationSearch(e.target.value)
                        setNotificationPage(1)
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Filter by Type</label>
                    <div className="flex gap-2 flex-wrap">
                      {["all", "success", "warning", "error", "info"].map((type) => (
                        <Button
                          key={type}
                          variant={notificationFilter === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setNotificationFilter(type as any)
                            setNotificationPage(1)
                          }}
                          className="capitalize"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Showing {paginatedNotifications.length} of {filteredNotifications.length} notifications
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>System-wide notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paginatedNotifications.length > 0 ? (
                    paginatedNotifications.map((notif) => {
                      const getIconColor = () => {
                        switch (notif.type) {
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

                      const getBgColor = () => {
                        switch (notif.type) {
                          case "success":
                            return "bg-green-50 border-green-200"
                          case "warning":
                            return "bg-yellow-50 border-yellow-200"
                          case "error":
                            return "bg-red-50 border-red-200"
                          default:
                            return "bg-blue-50 border-blue-200"
                        }
                      }

                      return (
                        <div
                          key={notif.id}
                          className={`p-4 border rounded-lg hover:shadow-md transition ${getBgColor()}`}
                        >
                          <div className="flex items-start space-x-4">
                            <Bell className={`w-6 h-6 mt-0.5 ${getIconColor()}`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800">{notif.title}</h3>
                                <Badge
                                  className={
                                    notif.type === "success"
                                      ? "bg-green-100 text-green-800"
                                      : notif.type === "warning"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : notif.type === "error"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                              <p className="text-gray-500 text-xs mt-2">{notif.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No notifications found</p>
                    </div>
                  )}
                </div>

                {filteredNotifications.length > 0 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <div className="text-sm text-gray-600">
                      Page {notificationPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNotificationPage(Math.max(1, notificationPage - 1))}
                        disabled={notificationPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={notificationPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNotificationPage(page)}
                            className="w-8"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNotificationPage(Math.min(totalPages, notificationPage + 1))}
                        disabled={notificationPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <DashboardLayout
        userRole="super-admin"
        userName="Admin User"
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export System Health Report</DialogTitle>
            <DialogDescription>Choose file format for the export</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <button
              onClick={() => handleExport("csv")}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-800">CSV Format</p>
                <p className="text-sm text-gray-600">Spreadsheet compatible</p>
              </div>
            </button>
            <button
              onClick={() => handleExport("json")}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">JSON Format</p>
                <p className="text-sm text-gray-600">Structured data format</p>
              </div>
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition flex items-center space-x-3"
            >
              <FileText className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-gray-800">PDF Format</p>
                <p className="text-sm text-gray-600">Professional document</p>
              </div>
            </button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
