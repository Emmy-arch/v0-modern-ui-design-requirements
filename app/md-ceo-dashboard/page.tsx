"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Crown,
  FileText,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Eye,
  Users,
  Award,
  Download,
  Settings,
  Lock,
  Bell,
  X,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const interestsForwarded = [
  {
    id: "INT-001",
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
    hodRecommendation: "Approved",
    hodComments:
      "Excellent proposal with strong financial backing and comprehensive risk mitigation. Highly recommend for approval.",
    documents: {
      pmc: "pmc-001.pdf",
      memo: "memo-001.pdf",
      tripes: "tripes-001.pdf",
    },
  },
  {
    id: "INT-002",
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
    hodRecommendation: "Approved",
    hodComments:
      "Strong technical approach with good market potential. Some concerns about implementation timeline but overall positive assessment.",
    documents: {
      pmc: "pmc-002.pdf",
      memo: "memo-002.pdf",
      tripes: "tripes-002.pdf",
    },
  },
]

const presentations = [
  {
    id: "PRES-001",
    projectTitle: "Smart City Infrastructure Development",
    investorName: "Sarah Johnson",
    projectId: "PPP-PROJ-001",
    date: "2024-02-05",
    time: "2:00 PM",
    duration: "90 minutes",
    location: "Conference Room A",
    attendees: 5,
    status: "Scheduled",
    materials: "presentation-001.pptx",
    notes: "Investor to present technical roadmap and financial projections",
  },
]

export default function MDCEODashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedInterest, setSelectedInterest] = useState(null)
  const [selectedPresentation, setSelectedPresentation] = useState(null)
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [showPresentationModal, setShowPresentationModal] = useState(false)
  const [interests, setInterests] = useState(interestsForwarded)

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Interests from HOD", id: "interests", icon: Crown },
    { name: "Presentations", id: "presentations", icon: Calendar },
    { name: "Settings", id: "settings", icon: Settings },
  ]

  const handleInterestDecision = (interestId, decision) => {
    setInterests((prev) =>
      prev.map((interest) =>
        interest.id === interestId
          ? {
              ...interest,
              status: decision === "approve" ? "Approved" : "Rejected",
              decision: decision,
              decisionDate: new Date().toISOString().split("T")[0],
            }
          : interest,
      ),
    )
    setShowInterestModal(false)
    setSelectedInterest(null)
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
                  <p className="text-blue-100">Review interests forwarded from HOD and manage presentations</p>
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

            {/* Pending Interests */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Interests Requiring Your Decision</CardTitle>
                <CardDescription>Business interests forwarded from HOD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interests
                    .filter((i) => i.status === "Awaiting MD/CEO Decision")
                    .map((interest) => (
                      <div key={interest.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{interest.projectTitle}</h3>
                            <p className="text-sm text-gray-600">
                              {interest.investorName} • {interest.projectId}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              High Priority
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {interest.investmentAmount}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600">Expected ROI</p>
                            <p className="font-medium">{interest.expectedROI}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Risk Level</p>
                            <p
                              className={`font-medium ${
                                interest.riskLevel === "High"
                                  ? "text-red-600"
                                  : interest.riskLevel === "Medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                              }`}
                            >
                              {interest.riskLevel}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">HOD Recommendation</p>
                            <p className="font-medium text-green-600">{interest.hodRecommendation}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                            onClick={() => {
                              setSelectedInterest(interest)
                              setShowInterestModal(true)
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View More
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "interests":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Interests from HOD</h1>
              <p className="text-gray-600">All interests forwarded by Head of Department</p>
            </div>

            <div className="space-y-4">
              {interests.map((interest) => (
                <Card key={interest.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{interest.projectTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {interest.investorName} • {interest.projectId}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          interest.status === "Awaiting MD/CEO Decision"
                            ? "bg-yellow-100 text-yellow-800"
                            : interest.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {interest.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-800">{interest.investmentAmount}</div>
                        <div className="text-sm text-blue-600">Investment</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-800">{interest.expectedROI}</div>
                        <div className="text-sm text-green-600">Expected ROI</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-800">{interest.projectDuration}</div>
                        <div className="text-sm text-yellow-600">Duration</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className={`text-xl font-bold ${
                            interest.riskLevel === "High"
                              ? "text-red-800"
                              : interest.riskLevel === "Medium"
                                ? "text-yellow-800"
                                : "text-green-800"
                          }`}
                        >
                          {interest.riskLevel}
                        </div>
                        <div className="text-sm text-gray-600">Risk Level</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">HOD Comments</h4>
                      <p className="text-gray-600">{interest.hodComments}</p>
                    </div>

                    <Button
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                      onClick={() => {
                        setSelectedInterest(interest)
                        setShowInterestModal(true)
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

      case "presentations":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Investor Presentations</h1>
              <p className="text-gray-600">Scheduled and completed presentations</p>
            </div>

            <div className="space-y-4">
              {presentations.map((presentation) => (
                <Card key={presentation.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{presentation.projectTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {presentation.investorName} • {presentation.projectId}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{presentation.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="font-medium">
                          {presentation.date} at {presentation.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{presentation.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{presentation.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Attendees</p>
                        <p className="font-medium">{presentation.attendees} executives</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-600 mb-2">Notes</p>
                      <p className="text-gray-700">{presentation.notes}</p>
                    </div>

                    <Button
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                      onClick={() => {
                        setSelectedPresentation(presentation)
                        setShowPresentationModal(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>

            {/* Change Password */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Change Password</span>
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="font-medium text-gray-800">Decision Alerts</p>
                    <p className="text-sm text-gray-600">Get notified about pending decisions</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="font-medium text-gray-800">Presentation Reminders</p>
                    <p className="text-sm text-gray-600">Get reminders before scheduled presentations</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input value="Robert CEO" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input value="robert.ceo@company.com" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <Input value="MD/CEO" disabled />
                </div>
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
        userRole="md-ceo"
        userName="Robert CEO"
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>

      {/* Interest Details Modal */}
      {showInterestModal && selectedInterest && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedInterest.projectTitle}</CardTitle>
                <CardDescription>
                  {selectedInterest.investorName} • {selectedInterest.projectId}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowInterestModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-800">{selectedInterest.investmentAmount}</div>
                  <div className="text-sm text-blue-600">Investment</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-800">{selectedInterest.expectedROI}</div>
                  <div className="text-sm text-green-600">Expected ROI</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-800">{selectedInterest.projectDuration}</div>
                  <div className="text-sm text-yellow-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`text-xl font-bold ${
                      selectedInterest.riskLevel === "High"
                        ? "text-red-800"
                        : selectedInterest.riskLevel === "Medium"
                          ? "text-yellow-800"
                          : "text-green-800"
                    }`}
                  >
                    {selectedInterest.riskLevel}
                  </div>
                  <div className="text-sm text-gray-600">Risk Level</div>
                </div>
              </div>

              {/* HOD Recommendation */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">HOD Recommendation</h4>
                <p className="text-green-700">{selectedInterest.hodComments}</p>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Documents</h4>
                <div className="space-y-3">
                  {Object.entries(selectedInterest.documents).map(([docType, fileName]) => (
                    <div key={docType} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800 capitalize">{docType} Document</p>
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
              {selectedInterest.status === "Awaiting MD/CEO Decision" && (
                <div className="flex space-x-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleInterestDecision(selectedInterest.id, "approve")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleInterestDecision(selectedInterest.id, "reject")}
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

      {/* Presentation Details Modal */}
      {showPresentationModal && selectedPresentation && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedPresentation.projectTitle}</CardTitle>
                <CardDescription>{selectedPresentation.investorName}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowPresentationModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Date & Time</p>
                  <p className="font-semibold text-blue-800">
                    {selectedPresentation.date} at {selectedPresentation.time}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">Duration</p>
                  <p className="font-semibold text-green-800">{selectedPresentation.duration}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-600 mb-1">Location</p>
                  <p className="font-semibold text-yellow-800">{selectedPresentation.location}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">Attendees</p>
                  <p className="font-semibold text-purple-800">{selectedPresentation.attendees} executives</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Presentation Notes</h4>
                <p className="text-gray-700">{selectedPresentation.notes}</p>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  View Attendees
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
