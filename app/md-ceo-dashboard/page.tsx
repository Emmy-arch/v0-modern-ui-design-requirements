"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Crown,
  FileText,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  TrendingUp,
  Eye,
  Send,
  Users,
  Award,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const pmcProposals = [
  {
    id: "PMC-001",
    projectId: "PPP-PROJ-002",
    projectTitle: "Renewable Energy Grid Integration",
    investorName: "John Investor",
    investorEmail: "john.investor@email.com",
    submittedDate: "2024-01-28",
    status: "Awaiting MD/CEO Decision",
    priority: "high",
    investmentAmount: "$60M - $80M",
    expectedROI: "12-15%",
    projectDuration: "48 months",
    riskLevel: "Low",
    hodRecommendation: "Approved - PMC Generated",
    hodComments:
      "Excellent proposal with strong financial backing and comprehensive risk mitigation. Highly recommend for approval.",
    pppMemberNotes:
      "PMC completed with all key components. Investor has proven track record in renewable energy sector.",
    pmcGenerated: true,
    presentationScheduled: false,
    kycReleased: false,
    documents: {
      businessProposal: true,
      pmc: true,
      financialProjections: true,
      technicalSpecs: true,
      riskAnalysis: true,
    },
  },
  {
    id: "PMC-002",
    projectId: "PPP-PROJ-001",
    projectTitle: "Smart City Infrastructure Development",
    investorName: "Sarah Johnson",
    investorEmail: "sarah.johnson@email.com",
    submittedDate: "2024-01-26",
    status: "Awaiting MD/CEO Decision",
    priority: "high",
    investmentAmount: "$40M - $60M",
    expectedROI: "15-18%",
    projectDuration: "36 months",
    riskLevel: "Medium",
    hodRecommendation: "Approved - PMC Generated",
    hodComments:
      "Strong technical approach with good market potential. Some concerns about implementation timeline but overall positive assessment.",
    pppMemberNotes: "PMC shows solid business model. Investor has experience in infrastructure projects.",
    pmcGenerated: true,
    presentationScheduled: true,
    presentationDate: "2024-02-05",
    kycReleased: false,
    documents: {
      businessProposal: true,
      pmc: true,
      financialProjections: true,
      technicalSpecs: true,
      riskAnalysis: true,
    },
  },
]

export default function MDCEODashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [proposals, setProposals] = useState(pmcProposals)
  const [selectedProposal, setSelectedProposal] = useState(null)

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "PMC Review", id: "pmc-review", icon: Crown },
    { name: "Final Decisions", id: "decisions", icon: CheckCircle },
    { name: "Presentations", id: "presentations", icon: Calendar },
    { name: "Messages", id: "messages", icon: MessageSquare },
  ]

  const handleFinalDecision = (proposalId: string, decision: string, comments: string) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              status: decision === "approve" ? "Approved - Presentation Scheduled" : "Rejected",
              finalDecision: decision,
              ceoComments: comments,
              decisionDate: new Date().toISOString().split("T")[0],
              presentationScheduled: decision === "approve",
              kycReleased: decision === "approve",
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
                  <h1 className="text-2xl font-bold mb-2">MD/CEO Dashboard</h1>
                  <p className="text-blue-100">Final review and approval of PPP proposals with PMC</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Crown className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">2</div>
                      <div className="text-sm text-gray-600">Awaiting Decision</div>
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
                      <div className="text-2xl font-bold text-gray-800">8</div>
                      <div className="text-sm text-gray-600">Approved This Year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">1</div>
                      <div className="text-sm text-gray-600">Presentations Scheduled</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">$180M</div>
                      <div className="text-sm text-gray-600">Total Value Under Review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Priority Proposals */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Proposals Requiring Your Decision</CardTitle>
                <CardDescription>PMC packages ready for final executive approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals
                    .filter((p) => p.status === "Awaiting MD/CEO Decision")
                    .map((proposal) => (
                      <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{proposal.projectTitle}</h3>
                            <p className="text-sm text-gray-600">
                              {proposal.investorName} • {proposal.projectId}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              High Priority
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {proposal.investmentAmount}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600">HoD Recommendation</p>
                            <p className="font-medium text-green-600">{proposal.hodRecommendation}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Expected ROI</p>
                            <p className="font-medium">{proposal.expectedROI}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Risk Level</p>
                            <p
                              className={`font-medium ${
                                proposal.riskLevel === "High"
                                  ? "text-red-600"
                                  : proposal.riskLevel === "Medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                              }`}
                            >
                              {proposal.riskLevel}
                            </p>
                          </div>
                        </div>

                        {proposal.presentationScheduled && (
                          <div className="bg-blue-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">
                                Presentation scheduled for {proposal.presentationDate}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                            onClick={() => {
                              setSelectedProposal(proposal)
                              setActiveTab("pmc-review")
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Review PMC Package
                          </Button>
                          {proposal.presentationScheduled && (
                            <Button size="sm" variant="outline">
                              <Calendar className="w-4 h-4 mr-2" />
                              View Presentation
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact HoD
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Decisions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Decisions</CardTitle>
                <CardDescription>Your latest proposal decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Digital Education Platform</p>
                      <p className="text-sm text-green-600">EduTech Solutions • Approved</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-800">$30M</p>
                      <p className="text-xs text-green-600">Jan 25, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">Blockchain Infrastructure</p>
                      <p className="text-sm text-red-600">CryptoInfra Ltd • Rejected</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-800">$45M</p>
                      <p className="text-xs text-red-600">Jan 22, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "pmc-review":
        const reviewProposal = selectedProposal || proposals[0]
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PMC Package Review</h1>
                <p className="text-gray-600">Final assessment and decision</p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab("overview")}>
                Back to Overview
              </Button>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{reviewProposal.projectTitle}</CardTitle>
                    <CardDescription>
                      {reviewProposal.investorName} • {reviewProposal.projectId}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    High Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Executive Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-800">{reviewProposal.investmentAmount}</div>
                    <div className="text-sm text-blue-600">Investment Amount</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-800">{reviewProposal.expectedROI}</div>
                    <div className="text-sm text-green-600">Expected ROI</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-800">{reviewProposal.projectDuration}</div>
                    <div className="text-sm text-yellow-600">Project Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`text-2xl font-bold ${
                        reviewProposal.riskLevel === "High"
                          ? "text-red-800"
                          : reviewProposal.riskLevel === "Medium"
                            ? "text-yellow-800"
                            : "text-green-800"
                      }`}
                    >
                      {reviewProposal.riskLevel}
                    </div>
                    <div className="text-sm text-gray-600">Risk Level</div>
                  </div>
                </div>

                {/* HoD Recommendation */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    HoD Recommendation: {reviewProposal.hodRecommendation}
                  </h4>
                  <p className="text-green-700">{reviewProposal.hodComments}</p>
                </div>

                {/* PPP Member Assessment */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">PPP Member Assessment</h4>
                  <p className="text-gray-600">{reviewProposal.pppMemberNotes}</p>
                </div>

                {/* PMC Status */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Project Model Canvas Status</h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700">PMC Generated and Complete</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-2">
                    All business model components have been validated and documented
                  </p>
                </div>

                {/* Document Package */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Complete Document Package</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(reviewProposal.documents).map(([doc, status]) => (
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

                {/* Presentation Section */}
                {reviewProposal.presentationScheduled && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Scheduled Presentation</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-700">Date: {reviewProposal.presentationDate}</p>
                        <p className="text-sm text-blue-600">Investor presentation and Q&A session</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-blue-200 bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                )}

                {/* Final Decision Form */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Final Decision</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="approve" className="text-green-600" />
                          <span className="text-green-700 font-medium">
                            Approve Project - Trigger Presentation & KYC Release
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="reject" className="text-red-600" />
                          <span className="text-red-700 font-medium">Reject Project</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Executive Comments</label>
                      <Textarea
                        placeholder="Provide your decision rationale and any specific conditions or requirements..."
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps (if approved)</label>
                      <Textarea
                        placeholder="Outline next steps including presentation scheduling and KYC document release..."
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
                    Approve & Schedule Presentation
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Release KYC Documents
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "presentations":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Investor Presentations</h1>
                <p className="text-gray-600">Scheduled and completed investor presentations</p>
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New
              </Button>
            </div>

            {/* Upcoming Presentations */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Upcoming Presentations</CardTitle>
                <CardDescription>Scheduled investor presentations requiring your attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals
                    .filter((p) => p.presentationScheduled && p.status !== "Rejected")
                    .map((proposal) => (
                      <div key={proposal.id} className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-blue-800">{proposal.projectTitle}</h3>
                            <p className="text-sm text-blue-600">
                              {proposal.investorName} • {proposal.projectId}
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">{proposal.presentationDate} • 2:00 PM</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-blue-600">Investment Amount</p>
                            <p className="font-medium text-blue-800">{proposal.investmentAmount}</p>
                          </div>
                          <div>
                            <p className="text-blue-600">Duration</p>
                            <p className="font-medium text-blue-800">90 minutes</p>
                          </div>
                          <div>
                            <p className="text-blue-600">Attendees</p>
                            <p className="font-medium text-blue-800">5 executives</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Materials
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            Attendee List
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Presentations */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Presentations</CardTitle>
                <CardDescription>Completed presentations and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">Digital Education Platform</h3>
                        <p className="text-sm text-gray-600">EduTech Solutions • PPP-PROJ-004</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        <Badge variant="secondary">Jan 28, 2024</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Investment Amount</p>
                        <p className="font-medium">$30M</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Presentation Rating</p>
                        <p className="font-medium text-green-600">Excellent</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Decision Time</p>
                        <p className="font-medium">2 days</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Presentation Notes
                    </Button>
                  </div>
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
      userRole="md-ceo"
      userName="Robert CEO"
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
