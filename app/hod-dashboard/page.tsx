"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  TrendingUp,
  Clock,
  Users,
  Download,
  RefreshCw,
  X,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const businessProposals = [
  {
    id: "PROP-001",
    projectId: "PPP-PROJ-002",
    projectTitle: "Renewable Energy Grid Integration",
    investorName: "John Investor",
    investorEmail: "john.investor@email.com",
    submittedDate: "2024-01-25",
    forwardedDate: "2024-01-26",
    status: "Awaiting HoD Review",
    priority: "high",
    investmentAmount: "$60M - $80M",
    expectedROI: "12-15%",
    projectDuration: "48 months",
    riskAssessment: "Low",
    pppMemberNotes:
      "Strong financial backing and comprehensive business plan. All documentation complete. Recommend for approval.",
    documents: {
      memo: "memo-001.pdf",
      tripes: "tripes-001.pdf",
    },
  },
  {
    id: "PROP-002",
    projectId: "PPP-PROJ-001",
    projectTitle: "Smart City Infrastructure Development",
    investorName: "Sarah Johnson",
    investorEmail: "sarah.johnson@email.com",
    submittedDate: "2024-01-22",
    forwardedDate: "2024-01-24",
    status: "Awaiting HoD Review",
    priority: "medium",
    investmentAmount: "$40M - $60M",
    expectedROI: "15-18%",
    projectDuration: "36 months",
    riskAssessment: "Medium",
    pppMemberNotes:
      "Good proposal but financial projections need more detail for years 3-5. Technical approach is sound but requires validation.",
    documents: {
      memo: "memo-002.pdf",
      tripes: "tripes-002.pdf",
    },
  },
]

export default function HoDDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [proposals, setProposals] = useState(businessProposals)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showRefurbishmentModal, setShowRefurbishmentModal] = useState(false)
  const [refurbishmentReason, setRefurbishmentReason] = useState("")

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Business Proposals", id: "proposals", icon: FileText },
    { name: "Refurbishment Requests", id: "refurbishment", icon: RefreshCw },
    { name: "Messages", id: "messages", icon: MessageSquare },
  ]

  const handleProposalDecision = (proposalId, decision, reason = "") => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              status:
                decision === "approve"
                  ? "Approved - Forwarded to MD/CEO"
                  : decision === "decline"
                    ? "Declined"
                    : "Refurbishment Requested",
              hodDecision: decision,
              hodReason: reason,
              decisionDate: new Date().toISOString().split("T")[0],
            }
          : proposal,
      ),
    )
    setShowDetailsModal(false)
    setShowRefurbishmentModal(false)
    setSelectedProposal(null)
    setRefurbishmentReason("")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Head of Department Dashboard</h1>
                  <p className="text-purple-100">Review and approve business proposals from PPP members</p>
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
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">3</div>
                      <div className="text-sm text-gray-600">Awaiting Review</div>
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
                      <div className="text-sm text-gray-600">Approved This Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">2</div>
                      <div className="text-sm text-gray-600">Declined</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">1</div>
                      <div className="text-sm text-gray-600">Refurbishment Requested</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Reviews */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Proposals Requiring Your Review</CardTitle>
                <CardDescription>Business proposals forwarded from PPP members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals
                    .filter((p) => p.status === "Awaiting HoD Review")
                    .map((proposal) => (
                      <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{proposal.projectTitle}</h3>
                            <p className="text-sm text-gray-600">
                              {proposal.investorName} • Forwarded: {proposal.forwardedDate}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="secondary"
                              className={
                                proposal.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {proposal.priority} priority
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {proposal.investmentAmount}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600">Expected ROI</p>
                            <p className="font-medium">{proposal.expectedROI}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-medium">{proposal.projectDuration}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Risk Level</p>
                            <p
                              className={`font-medium ${
                                proposal.riskAssessment === "High"
                                  ? "text-red-600"
                                  : proposal.riskAssessment === "Medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                              }`}
                            >
                              {proposal.riskAssessment}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                            onClick={() => {
                              setSelectedProposal(proposal)
                              setShowDetailsModal(true)
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "proposals":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">All Business Proposals</h1>
              <p className="text-gray-600">Complete list of proposals forwarded from PPP members</p>
            </div>

            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{proposal.projectTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {proposal.investorName} • {proposal.projectId}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          proposal.status === "Awaiting HoD Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : proposal.status === "Approved - Forwarded to MD/CEO"
                              ? "bg-green-100 text-green-800"
                              : proposal.status === "Declined"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-800">{proposal.investmentAmount}</div>
                        <div className="text-sm text-blue-600">Investment</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-800">{proposal.expectedROI}</div>
                        <div className="text-sm text-green-600">Expected ROI</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-800">{proposal.projectDuration}</div>
                        <div className="text-sm text-yellow-600">Duration</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className={`text-xl font-bold ${
                            proposal.riskAssessment === "High"
                              ? "text-red-800"
                              : proposal.riskAssessment === "Medium"
                                ? "text-yellow-800"
                                : "text-green-800"
                          }`}
                        >
                          {proposal.riskAssessment}
                        </div>
                        <div className="text-sm text-gray-600">Risk Level</div>
                      </div>
                    </div>

                    <Button
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                      onClick={() => {
                        setSelectedProposal(proposal)
                        setShowDetailsModal(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "refurbishment":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Refurbishment Requests</h1>
              <p className="text-gray-600">Manage all refurbishment requests</p>
            </div>

            {proposals
              .filter((p) => p.status === "Refurbishment Requested")
              .map((proposal) => (
                <Card key={proposal.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{proposal.projectTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {proposal.investorName} • {proposal.projectId}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Refurbishment Requested</Badge>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-yellow-800 mb-2">Refurbishment Reason</h4>
                      <p className="text-yellow-700">{proposal.hodReason}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 mb-1">Investment Amount</p>
                        <p className="font-semibold text-blue-800">{proposal.investmentAmount}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 mb-1">Expected ROI</p>
                        <p className="font-semibold text-green-800">{proposal.expectedROI}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-600 mb-1">Decision Date</p>
                        <p className="font-semibold text-purple-800">{proposal.decisionDate}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approved Refurbishment
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Request More Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {proposals.filter((p) => p.status === "Refurbishment Requested").length === 0 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">No refurbishment requests at this time</p>
                </CardContent>
              </Card>
            )}
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
    <>
      <DashboardLayout
        userRole="hod"
        userName="Michael Director"
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>

      {/* Proposal Details Modal */}
      {showDetailsModal && selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedProposal.projectTitle}</CardTitle>
                <CardDescription>
                  {selectedProposal.investorName} • {selectedProposal.projectId}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowDetailsModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-800">{selectedProposal.investmentAmount}</div>
                  <div className="text-sm text-blue-600">Investment</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-800">{selectedProposal.expectedROI}</div>
                  <div className="text-sm text-green-600">Expected ROI</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-800">{selectedProposal.projectDuration}</div>
                  <div className="text-sm text-yellow-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`text-xl font-bold ${
                      selectedProposal.riskAssessment === "High"
                        ? "text-red-800"
                        : selectedProposal.riskAssessment === "Medium"
                          ? "text-yellow-800"
                          : "text-green-800"
                    }`}
                  >
                    {selectedProposal.riskAssessment}
                  </div>
                  <div className="text-sm text-gray-600">Risk Level</div>
                </div>
              </div>

              {/* PPP Member Assessment */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">PPP Member Assessment</h4>
                <p className="text-gray-600">{selectedProposal.pppMemberNotes}</p>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Documents for Download</h4>
                <div className="space-y-3">
                  {Object.entries(selectedProposal.documents).map(([docType, fileName]) => (
                    <div key={docType} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800 uppercase">{docType} Document</p>
                          <p className="text-sm text-gray-600">{fileName}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Buttons */}
              {selectedProposal.status === "Awaiting HoD Review" && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleProposalDecision(selectedProposal.id, "approve")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={() => {
                      setShowDetailsModal(false)
                      setShowRefurbishmentModal(true)
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refurbishment
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleProposalDecision(selectedProposal.id, "decline")}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Refurbishment Modal */}
      {showRefurbishmentModal && selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Request Refurbishment</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowRefurbishmentModal(false)
                  setShowDetailsModal(true)
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-gray-800 mb-2">Proposal</p>
                <p className="text-gray-600">{selectedProposal.projectTitle}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Refurbishment Reason</label>
                <Textarea
                  placeholder="Explain the specific areas that need refurbishment..."
                  rows={4}
                  value={refurbishmentReason}
                  onChange={(e) => setRefurbishmentReason(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => handleProposalDecision(selectedProposal.id, "refurbishment", refurbishmentReason)}
                >
                  Send Refurbishment Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRefurbishmentModal(false)
                    setShowDetailsModal(true)
                    setRefurbishmentReason("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
