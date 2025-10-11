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
      businessProposal: true,
      financialProjections: true,
      technicalSpecs: true,
      riskAnalysis: true,
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
      businessProposal: true,
      financialProjections: false,
      technicalSpecs: true,
      riskAnalysis: true,
    },
  },
]

export default function HoDDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [proposals, setProposals] = useState(businessProposals)
  const [selectedProposal, setSelectedProposal] = useState(null)

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Business Proposals", id: "proposals", icon: FileText },
    { name: "Review & Decision", id: "review", icon: CheckCircle },
    { name: "Messages", id: "messages", icon: MessageSquare },
  ]

  const handleProposalDecision = (proposalId: string, decision: string, comments: string) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              status:
                decision === "approve"
                  ? "Approved - PMC Required"
                  : decision === "decline"
                    ? "Declined"
                    : "Refurbishment Required",
              hodDecision: decision,
              hodComments: comments,
              decisionDate: new Date().toISOString().split("T")[0],
            }
          : proposal,
      ),
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Head of Department Dashboard</h1>
                  <p className="text-blue-100">Review business proposals and make approval decisions</p>
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

                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">PPP Member Notes:</p>
                          <p className="text-sm text-gray-600">{proposal.pppMemberNotes}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                            onClick={() => {
                              setSelectedProposal(proposal)
                              setActiveTab("review")
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Review Proposal
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            View Documents
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Business Proposals</h1>
                <p className="text-gray-600">All proposals forwarded from PPP members</p>
              </div>
            </div>

            <div className="space-y-6">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{proposal.projectTitle}</CardTitle>
                        <CardDescription>
                          {proposal.investorName} • {proposal.projectId}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          proposal.status === "Awaiting HoD Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : proposal.status === "Approved - PMC Required"
                              ? "bg-green-100 text-green-800"
                              : proposal.status === "Declined"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Project Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                    {/* PPP Member Assessment */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">PPP Member Assessment</h4>
                      <p className="text-gray-600">{proposal.pppMemberNotes}</p>
                    </div>

                    {/* Document Status */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Document Completeness</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(proposal.documents).map(([doc, status]) => (
                          <div
                            key={doc}
                            className={`p-3 rounded-lg text-center ${
                              status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            <div className="font-medium capitalize">{doc.replace(/([A-Z])/g, " $1").trim()}</div>
                            <div className="text-sm">{status ? "Complete" : "Missing"}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4 border-t">
                      <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                        onClick={() => {
                          setSelectedProposal(proposal)
                          setActiveTab("review")
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review Details
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "review":
        const reviewProposal = selectedProposal || proposals[0]
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Review & Decision</h1>
                <p className="text-gray-600">Make your decision on the business proposal</p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab("proposals")}>
                Back to Proposals
              </Button>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">{reviewProposal.projectTitle}</CardTitle>
                <CardDescription>
                  {reviewProposal.investorName} • {reviewProposal.projectId}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-800">{reviewProposal.investmentAmount}</div>
                    <div className="text-sm text-blue-600">Investment Amount</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-800">{reviewProposal.expectedROI}</div>
                    <div className="text-sm text-green-600">Expected ROI</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-800">{reviewProposal.projectDuration}</div>
                    <div className="text-sm text-yellow-600">Project Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`text-xl font-bold ${
                        reviewProposal.riskAssessment === "High"
                          ? "text-red-800"
                          : reviewProposal.riskAssessment === "Medium"
                            ? "text-yellow-800"
                            : "text-green-800"
                      }`}
                    >
                      {reviewProposal.riskAssessment}
                    </div>
                    <div className="text-sm text-gray-600">Risk Assessment</div>
                  </div>
                </div>

                {/* PPP Member Assessment */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">PPP Member Assessment</h4>
                  <p className="text-gray-600 mb-4">{reviewProposal.pppMemberNotes}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div>
                      <span className="text-gray-600">Forwarded by:</span>
                      <span className="font-medium ml-1">PPP Member</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium ml-1">{reviewProposal.forwardedDate}</span>
                    </div>
                  </div>
                </div>

                {/* HoD Decision Form */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Your Decision</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="approve" className="text-green-600" />
                          <span className="text-green-700 font-medium">Approve - Notify PPP Member to Prepare PMC</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="refurbishment" className="text-yellow-600" />
                          <span className="text-yellow-700 font-medium">Request Refurbishment</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="decline" className="text-red-600" />
                          <span className="text-red-700 font-medium">Decline Proposal</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                      <Textarea
                        placeholder="Provide your detailed assessment and reasoning for the decision..."
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instructions for PPP Member (if applicable)
                      </label>
                      <Textarea
                        placeholder="Specific instructions for next steps or required changes..."
                        rows={3}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Decision
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    <XCircle className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
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
      userRole="hod"
      userName="Michael Director"
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
