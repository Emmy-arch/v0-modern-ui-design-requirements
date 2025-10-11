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
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const mockExecutiveProposals = [
  {
    id: "PPP-2024-003",
    title: "Renewable Energy Project",
    investor: "Green Energy Corp",
    status: "Awaiting Executive Decision",
    hodRecommendation: "Strongly Recommend Approval",
    investmentAmount: "$50M",
    expectedROI: "18% annually",
    projectDuration: "36 months",
    riskLevel: "medium",
    hodNotes:
      "Excellent financial backing, proven track record in renewable energy sector. Risk mitigation strategies are comprehensive.",
    staffNotes: "All documentation complete. Investor has successfully delivered 3 similar projects.",
    presentationScheduled: false,
    priority: "high",
    escalatedDate: "2024-01-30",
  },
  {
    id: "PPP-2024-005",
    title: "Smart Transportation Hub",
    investor: "Urban Mobility Inc",
    status: "Awaiting Executive Decision",
    hodRecommendation: "Conditional Approval",
    investmentAmount: "$75M",
    expectedROI: "15% annually",
    projectDuration: "48 months",
    riskLevel: "high",
    hodNotes:
      "Innovative concept but requires additional technical validation. Recommend conditional approval pending prototype demonstration.",
    staffNotes: "Strong business plan but technology is still in development phase.",
    presentationScheduled: true,
    presentationDate: "2024-02-05",
    priority: "high",
    escalatedDate: "2024-01-28",
  },
]

export default function ExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProposal, setSelectedProposal] = useState(null)

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Executive Review", id: "executive-review", icon: Crown },
    { name: "Final Decisions", id: "decisions", icon: CheckCircle },
    { name: "Presentations", id: "presentations", icon: Calendar },
    { name: "Messages", id: "messages", icon: MessageSquare },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Executive Dashboard</h1>
                  <p className="text-blue-100">Final review and approval of PPP proposals</p>
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
                      <div className="text-2xl font-bold text-gray-800">3</div>
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
                      <div className="text-2xl font-bold text-gray-800">12</div>
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
                      <div className="text-2xl font-bold text-gray-800">2</div>
                      <div className="text-sm text-gray-600">Presentations Scheduled</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">$250M</div>
                      <div className="text-sm text-gray-600">Total Value Under Review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Priority Proposals */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>High Priority Proposals</CardTitle>
                <CardDescription>Proposals requiring immediate executive attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExecutiveProposals.map((proposal) => (
                    <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{proposal.title}</h3>
                          <p className="text-sm text-gray-600">
                            {proposal.investor} • {proposal.id}
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
                          <p
                            className={`font-medium ${
                              proposal.hodRecommendation.includes("Strongly")
                                ? "text-green-600"
                                : proposal.hodRecommendation.includes("Conditional")
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {proposal.hodRecommendation}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Expected ROI</p>
                          <p className="font-medium">{proposal.expectedROI}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Risk Level</p>
                          <p
                            className={`font-medium ${
                              proposal.riskLevel === "high"
                                ? "text-red-600"
                                : proposal.riskLevel === "medium"
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
                            setActiveTab("executive-review")
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review Details
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

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Water Treatment Facility</p>
                      <p className="text-sm text-yellow-600">AquaTech Corp • Conditional Approval</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-yellow-800">$60M</p>
                      <p className="text-xs text-yellow-600">Jan 20, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "executive-review":
        const reviewProposal = selectedProposal || mockExecutiveProposals[0]
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Executive Review</h1>
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
                    <CardTitle className="text-xl">{reviewProposal.title}</CardTitle>
                    <CardDescription>
                      {reviewProposal.investor} • {reviewProposal.id}
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
                        reviewProposal.riskLevel === "high"
                          ? "text-red-800"
                          : reviewProposal.riskLevel === "medium"
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
                <div
                  className={`rounded-lg p-4 ${
                    reviewProposal.hodRecommendation.includes("Strongly")
                      ? "bg-green-50"
                      : reviewProposal.hodRecommendation.includes("Conditional")
                        ? "bg-yellow-50"
                        : "bg-red-50"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 ${
                      reviewProposal.hodRecommendation.includes("Strongly")
                        ? "text-green-800"
                        : reviewProposal.hodRecommendation.includes("Conditional")
                          ? "text-yellow-800"
                          : "text-red-800"
                    }`}
                  >
                    HoD Recommendation: {reviewProposal.hodRecommendation}
                  </h4>
                  <p
                    className={`${
                      reviewProposal.hodRecommendation.includes("Strongly")
                        ? "text-green-700"
                        : reviewProposal.hodRecommendation.includes("Conditional")
                          ? "text-yellow-700"
                          : "text-red-700"
                    }`}
                  >
                    {reviewProposal.hodNotes}
                  </p>
                </div>

                {/* Staff Assessment */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Staff Assessment</h4>
                  <p className="text-gray-600">{reviewProposal.staffNotes}</p>
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

                {/* Executive Decision Form */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Executive Decision</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="approve" className="text-green-600" />
                          <span className="text-green-700 font-medium">Approve Proposal</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="conditional" className="text-yellow-600" />
                          <span className="text-yellow-700 font-medium">Conditional Approval</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="presentation" className="text-blue-600" />
                          <span className="text-blue-700 font-medium">Request Investor Presentation</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="reject" className="text-red-600" />
                          <span className="text-red-700 font-medium">Reject Proposal</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="decision" value="governor" className="text-purple-600" />
                          <span className="text-purple-700 font-medium">Forward to Governor/GC</span>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps (if applicable)</label>
                      <Textarea
                        placeholder="Outline any required next steps, conditions, or follow-up actions..."
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
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Schedule Presentation
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
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-blue-800">Smart Transportation Hub</h3>
                        <p className="text-sm text-blue-600">Urban Mobility Inc • PPP-2024-005</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Feb 5, 2024 • 2:00 PM</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-blue-600">Investment Amount</p>
                        <p className="font-medium text-blue-800">$75M</p>
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
                        <p className="text-sm text-gray-600">EduTech Solutions • PPP-2024-004</p>
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

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">Blockchain Infrastructure</h3>
                        <p className="text-sm text-gray-600">CryptoInfra Ltd • PPP-2024-002</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                        <Badge variant="secondary">Jan 25, 2024</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Investment Amount</p>
                        <p className="font-medium">$45M</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Presentation Rating</p>
                        <p className="font-medium text-red-600">Poor</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Decision Time</p>
                        <p className="font-medium">1 day</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Rejection Reasons
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
      userRole="executive"
      userName="Robert CEO"
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
