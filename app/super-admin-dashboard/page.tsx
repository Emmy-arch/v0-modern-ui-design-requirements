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
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUploadZone } from "@/components/file-upload-zone"

const users = [
  {
    id: "USR-001",
    name: "John PPP Member",
    email: "john.ppp@gov.ng",
    role: "PPP Member",
    status: "Active",
    lastLogin: "2024-01-28 14:30",
    createdDate: "2024-01-01",
  },
  {
    id: "USR-002",
    name: "Sarah Director",
    email: "sarah.hod@gov.ng",
    role: "HoD",
    status: "Active",
    lastLogin: "2024-01-28 09:15",
    createdDate: "2024-01-01",
  },
  {
    id: "USR-003",
    name: "Michael CEO",
    email: "michael.ceo@gov.ng",
    role: "MD/CEO",
    status: "Active",
    lastLogin: "2024-01-27 16:45",
    createdDate: "2024-01-01",
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

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateUser, setShowCreateUser] = useState(false)

  const navigation = [
    { name: "Overview", id: "overview", icon: Activity },
    { name: "User Management", id: "users", icon: Users },
    { name: "Audit Logs", id: "audit", icon: Shield },
    { name: "System Settings", id: "settings", icon: Settings },
    { name: "Document Templates", id: "templates", icon: FileText },
    { name: "Communications", id: "communications", icon: Mail },
  ]

  const renderContent = () => {
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
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
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
                          {user.email} • Last login: {user.lastLogin}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Configure automated email messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <CardTitle>SMS Templates</CardTitle>
                  <CardDescription>Configure automated SMS messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
          </div>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout
      userRole="super-admin"
      userName="Admin User"
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
