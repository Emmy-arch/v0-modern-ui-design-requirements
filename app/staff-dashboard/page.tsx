"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Eye,
  Upload,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const mockProposals = [
  {
    id: "PPP-2024-001",
    title: "Smart City Infrastructure Development",
    investor: "John Investor",
    status: "Under Review",
    stage: "PAM Assessment",
    submittedDate: "2024-01-15",
    priority: "high",
    daysInReview: 15,
    documents: {
      ic: true,
      nda: true,
      businessPlan: true,
      pam: false,
      pmc: false,
    },
  },
  {
    id: "PPP-2024-002",
    title: "Healthcare Technology Platform",
    investor: "Sarah Johnson",
    status: "Pending Documents",
    stage: "IC Submission",
    submittedDate: "2024-01-20",
    priority: "medium",
    daysInReview: 10,
    documents: {
      ic: false,
      nda: true,
      businessPlan: true,
      pam: false,
      pmc: false,
    },
  },
  {
    id: "PPP-2024-003",
    title: "Renewable Energy Project",
    investor: "Green Energy Corp",
    status: "Ready for HoD",
    stage: "PMC Evaluation",
    submittedDate: "2024-01-10",
    priority: "high",
    daysInReview: 20,
    documents: {
      ic: true,
      nda: true,
      businessPlan: true,
      pam: true,
      pmc: true,
    },
  },
]

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Proposals", id: "proposals", icon: FileText },
    { name: "Review Queue", id: "review", icon: Clock },
    { name: "Messages", id: "messages", icon: MessageSquare },
    { name: "Reports", id: "reports", icon: Users },
  ]

  const filteredProposals = mockProposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || proposal.status.toLowerCase().includes(statusFilter.toLowerCase())
    return matchesSearch && matchesStatus
  })

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Staff Dashboard</h1>
                  <p className="text-blue-100">Manage and review PPP proposals efficiently</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">24</div>
                      <div className="text-sm text-gray-600">Total Proposals</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">8</div>
                      <div className="text-sm text-gray-600">Under Review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">12</div>
                      <div className="text-sm text-gray-600">Approved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">3</div>
                      <div className="text-sm text-gray-600">Urgent Actions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Recent Proposals</CardTitle>
                  <CardDescription>Latest submissions requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProposals.slice(0, 3).map((proposal) => (
                      <div key={proposal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{proposal.title}</p>
                          <p className="text-sm text-gray-600">{proposal.investor}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              proposal.status === "Under Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : proposal.status === "Pending Documents"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {proposal.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{proposal.daysInReview} days</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setActiveTab("proposals")}
                  >
                    View All Proposals
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Priority Actions</CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Missing IC Document</p>
                        <p className="text-sm text-red-600">Healthcare Technology Platform - 10 days overdue</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">PAM Assessment Due</p>
                        <p className="text-sm text-yellow-600">Smart City Infrastructure - Due in 2 days</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Ready for HoD Review</p>
                        <p className="text-sm text-green-600">Renewable Energy Project - All docs complete</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "proposals":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">All Proposals</h1>
                <p className="text-gray-600">Manage and review submitted proposals</p>
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">Export Report</Button>
            </div>

            {/* Filters */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search proposals, investors, or IDs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="under review">Under Review</SelectItem>
                      <SelectItem value="pending">Pending Documents</SelectItem>
                      <SelectItem value="ready">Ready for HoD</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Proposals Table */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-800">Proposal</th>
                        <th className="text-left p-4 font-semibold text-gray-800">Investor</th>
                        <th className="text-left p-4 font-semibold text-gray-800">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-800">Stage</th>
                        <th className="text-left p-4 font-semibold text-gray-800">Days</th>
                        <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProposals.map((proposal) => (
                        <tr key={proposal.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-800">{proposal.title}</p>
                              <p className="text-sm text-gray-600">{proposal.id}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-gray-800">{proposal.investor}</p>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant="secondary"
                              className={
                                proposal.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : proposal.status === "Pending Documents"
                                    ? "bg-red-100 text-red-800"
                                    : proposal.status === "Ready for HoD"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {proposal.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <p className="text-gray-800">{proposal.stage}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-gray-800">{proposal.daysInReview}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedProposal(proposal)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "review":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Review Queue</h1>
                <p className="text-gray-600">Proposals requiring immediate attention</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockProposals
                .filter((p) => p.status !== "Ready for HoD")
                .map((proposal) => (
                  <Card key={proposal.id} className="shadow-lg border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{proposal.title}</CardTitle>
                          <CardDescription>
                            {proposal.investor} • {proposal.id}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            proposal.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : proposal.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {proposal.priority} priority
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Current Stage</p>
                          <p className="font-medium">{proposal.stage}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Days in Review</p>
                          <p className="font-medium">{proposal.daysInReview} days</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Document Status</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div
                            className={`p-2 rounded ${proposal.documents.ic ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            IC: {proposal.documents.ic ? "Complete" : "Missing"}
                          </div>
                          <div
                            className={`p-2 rounded ${proposal.documents.nda ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            NDA: {proposal.documents.nda ? "Complete" : "Missing"}
                          </div>
                          <div
                            className={`p-2 rounded ${proposal.documents.businessPlan ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            Plan: {proposal.documents.businessPlan ? "Complete" : "Missing"}
                          </div>
                          <div
                            className={`p-2 rounded ${proposal.documents.pam ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            PAM: {proposal.documents.pam ? "Complete" : "Pending"}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                          Review
                        </Button>
                        <Button size="sm" variant="outline">
                          Upload Docs
                        </Button>
                        <Button size="sm" variant="outline">
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Content for {activeTab} coming soon...</p>
          </div>
        )
    }
  }

  return (
    <DashboardLayout
      userRole="staff"
      userName="Sarah Manager"
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
