"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Heart,
  CheckCircle,
  FileText,
  Upload,
  Send,
  Eye,
  AlertTriangle,
  Users,
  TrendingUp,
  Download,
  X,
  Calendar,
  Clock,
  UserPlus,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUploadZone } from "@/components/file-upload-zone"

const investorInterests = [
  {
    id: "INT-001",
    projectId: "PPP-PROJ-002",
    projectTitle: "Renewable Energy Grid Integration",
    investorName: "John Investor",
    investorEmail: "john.investor@email.com",
    expressedDate: "2024-01-20",
    status: "Interest Expressed",
    currentStage: 0,
    stages: {
      interestExpressed: {
        status: "completed",
        date: "2024-01-20",
      },
      icNdaExchange: {
        status: "pending",
        documentsSent: true,
        documentsUploaded: [],
      },
      businessProposal: {
        status: "locked",
        documentsSent: false,
        documentsUploaded: [],
      },
      hodReview: {
        status: "locked",
        documentsUploaded: [],
        hodStatus: null,
        refurbishmentRequested: false,
      },
      mdCeoApproval: {
        status: "locked",
        documentsUploaded: [],
        mdCeoStatus: null,
        refurbishmentRequested: false,
      },
      kyc: {
        status: "locked",
        documentsUploaded: [],
        requiredDocuments: [
          "Valid ID",
          "Proof of Address",
          "Company Registration",
          "Tax Clearance",
          "Bank Statements (6 months)",
        ],
      },
      presentation: {
        status: "locked",
        date: null,
        time: null,
        attendees: [],
      },
    },
  },
  {
    id: "INT-002",
    projectId: "PPP-PROJ-001",
    projectTitle: "Smart City Infrastructure Development",
    investorName: "Sarah Johnson",
    investorEmail: "sarah.johnson@email.com",
    expressedDate: "2024-01-18",
    status: "Business Proposal Review",
    currentStage: 2,
    stages: {
      interestExpressed: {
        status: "completed",
        date: "2024-01-18",
      },
      icNdaExchange: {
        status: "approved",
        documentsSent: true,
        documentsUploaded: [
          { name: "Investment_Certificate_Signed.pdf", uploadDate: "2024-01-19", size: "2.3 MB" },
          { name: "NDA_Signed.pdf", uploadDate: "2024-01-19", size: "1.8 MB" },
        ],
        approvedDate: "2024-01-19",
      },
      businessProposal: {
        status: "pending",
        documentsSent: true,
        documentsUploaded: [
          {
            name: "Business_Proposal_Smart_City.pdf",
            uploadDate: "2024-01-22",
            size: "5.6 MB",
            status: "pending",
          },
        ],
      },
      hodReview: {
        status: "locked",
        documentsUploaded: [],
        hodStatus: null,
        refurbishmentRequested: false,
      },
      mdCeoApproval: {
        status: "locked",
        documentsUploaded: [],
        mdCeoStatus: null,
        refurbishmentRequested: false,
      },
      kyc: {
        status: "locked",
        documentsUploaded: [],
        requiredDocuments: [
          "Valid ID",
          "Proof of Address",
          "Company Registration",
          "Tax Clearance",
          "Bank Statements (6 months)",
        ],
      },
      presentation: {
        status: "locked",
        date: null,
        time: null,
        attendees: [],
      },
    },
  },
]

const hodRequests = [
  {
    id: "REQ-001",
    projectId: "PPP-PROJ-003",
    projectTitle: "Digital Healthcare Platform",
    investorName: "Michael Corp",
    requestType: "refurbishment",
    hodComments:
      "The financial projections need to be more detailed. Please request updated cash flow analysis for years 3-5.",
    requestDate: "2024-01-25",
    status: "pending_resubmission",
  },
]

export default function PPPMemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [interests, setInterests] = useState(investorInterests)
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [documentToReject, setDocumentToReject] = useState<{ stage: string; docName: string } | null>(null)
  const [presentationDate, setPresentationDate] = useState("")
  const [presentationTime, setPresentationTime] = useState("")
  const [newAttendee, setNewAttendee] = useState("")

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Investor Interests", id: "interests", icon: Heart },
    { name: "Document Management", id: "documents", icon: FileText },
    { name: "HoD Requests", id: "hod-requests", icon: AlertTriangle },
    { name: "PMC Generation", id: "pmc", icon: Upload },
  ]

  const handleOpenRejectModal = (stage: string, docName: string) => {
    setDocumentToReject({ stage, docName })
    setRejectModalOpen(true)
  }

  const handleRejectDocument = () => {
    if (!selectedInterest || !documentToReject || !rejectReason) return

    setInterests((prev) =>
      prev.map((interest) => {
        if (interest.id === selectedInterest) {
          const updatedStages = { ...interest.stages }
          const stage = updatedStages[documentToReject.stage as keyof typeof updatedStages] as any

          if (stage.documentsUploaded) {
            stage.documentsUploaded = stage.documentsUploaded.map((doc: any) =>
              doc.name === documentToReject.docName
                ? { ...doc, status: "rejected", rejectionReason: rejectReason }
                : doc,
            )
          }

          return { ...interest, stages: updatedStages }
        }
        return interest
      }),
    )

    setRejectModalOpen(false)
    setRejectReason("")
    setDocumentToReject(null)
  }

  const handleApproveStage = (interestId: string, stageName: string) => {
    setInterests((prev) =>
      prev.map((interest) => {
        if (interest.id === interestId) {
          const updatedStages = { ...interest.stages }
          const stage = updatedStages[stageName as keyof typeof updatedStages] as any

          stage.status = "approved"
          stage.approvedDate = new Date().toISOString().split("T")[0]

          // Unlock next stage
          const stageOrder = [
            "interestExpressed",
            "icNdaExchange",
            "businessProposal",
            "hodReview",
            "mdCeoApproval",
            "kyc",
            "presentation",
          ]
          const currentIndex = stageOrder.indexOf(stageName)
          if (currentIndex < stageOrder.length - 1) {
            const nextStage = stageOrder[currentIndex + 1]
            const nextStageData = updatedStages[nextStage as keyof typeof updatedStages] as any
            if (nextStageData.status === "locked") {
              nextStageData.status = "pending"
            }

            // Auto-send documents for business proposal stage
            if (nextStage === "businessProposal") {
              nextStageData.documentsSent = true
            }
          }

          return {
            ...interest,
            stages: updatedStages,
            currentStage: Math.min(interest.currentStage + 1, 6),
            status: getStatusFromStages(updatedStages),
          }
        }
        return interest
      }),
    )
  }

  const handleSchedulePresentation = (interestId: string) => {
    if (!presentationDate || !presentationTime) return

    setInterests((prev) =>
      prev.map((interest) => {
        if (interest.id === interestId) {
          const updatedStages = { ...interest.stages }
          updatedStages.presentation.date = presentationDate
          updatedStages.presentation.time = presentationTime
          return { ...interest, stages: updatedStages }
        }
        return interest
      }),
    )

    setPresentationDate("")
    setPresentationTime("")
  }

  const handleAddAttendee = (interestId: string) => {
    if (!newAttendee) return

    setInterests((prev) =>
      prev.map((interest) => {
        if (interest.id === interestId) {
          const updatedStages = { ...interest.stages }
          updatedStages.presentation.attendees.push(newAttendee)
          return { ...interest, stages: updatedStages }
        }
        return interest
      }),
    )

    setNewAttendee("")
  }

  const getStatusFromStages = (stages: any) => {
    if (stages.presentation.status === "approved") return "Presentation Scheduled"
    if (stages.kyc.status === "approved") return "KYC Complete"
    if (stages.mdCeoApproval.status === "approved") return "MD/CEO Approved"
    if (stages.hodReview.status === "approved") return "HoD Approved"
    if (stages.businessProposal.status === "approved") return "Business Proposal Approved"
    if (stages.icNdaExchange.status === "approved") return "IC/NDA Approved"
    if (stages.businessProposal.status === "pending") return "Business Proposal Review"
    if (stages.icNdaExchange.status === "pending") return "IC/NDA Exchange"
    return "Interest Expressed"
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
                  <h1 className="text-2xl font-bold mb-2">PPP Member Dashboard</h1>
                  <p className="text-blue-100">Manage investor interests and project documentation</p>
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
                      <Heart className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">5</div>
                      <div className="text-sm text-gray-600">New Interests</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">8</div>
                      <div className="text-sm text-gray-600">Pending Documents</div>
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
                      <div className="text-sm text-gray-600">Forwarded to HoD</div>
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
                      <div className="text-2xl font-bold text-gray-800">2</div>
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
                  <CardTitle>Recent Interests</CardTitle>
                  <CardDescription>Latest investor interests requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interests.slice(0, 3).map((interest) => (
                      <div key={interest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{interest.projectTitle}</p>
                          <p className="text-sm text-gray-600">{interest.investorName}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              interest.status === "Interest Expressed"
                                ? "bg-yellow-100 text-yellow-800"
                                : interest.status.includes("Business Proposal")
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {interest.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{interest.expressedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setActiveTab("interests")}
                  >
                    View All Interests
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
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Heart className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">New Interest Expressed</p>
                        <p className="text-sm text-yellow-600">
                          Renewable Energy Project - Acknowledge and send IC/NDA
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Business Proposal Received</p>
                        <p className="text-sm text-blue-600">Smart City Infrastructure - Review and approve</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">HoD Refurbishment Request</p>
                        <p className="text-sm text-red-600">Digital Healthcare Platform - Update required</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "interests":
        // If an interest is selected, show the tracking page
        if (selectedInterest) {
          const interest = interests.find((i) => i.id === selectedInterest)
          if (!interest) {
            setSelectedInterest(null)
            return null
          }

          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => setSelectedInterest(null)}>
                    ← Back to Interests
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Interest Tracking</h2>
                    <p className="text-gray-600">{interest.projectTitle}</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">{interest.status}</Badge>
              </div>

              {/* Investor Details Card */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Investor Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Investor Name</div>
                      <div className="font-medium">{interest.investorName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Contact Email</div>
                      <div className="font-medium">{interest.investorEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Project ID</div>
                      <Badge variant="outline">{interest.projectId}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Submission Date</div>
                      <div className="font-medium">{interest.expressedDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stage 1: Interest Expressed */}
              <Card className="shadow-lg border-0 border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-green-800">Stage 1: Interest Expressed</CardTitle>
                        <CardDescription>
                          Interest submitted on {interest.stages.interestExpressed.date}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Stage 2: IC/NDA Exchange */}
              <Card
                className={`shadow-lg border-0 border-l-4 ${
                  interest.stages.icNdaExchange.status === "approved"
                    ? "border-l-green-500"
                    : interest.stages.icNdaExchange.status === "pending"
                      ? "border-l-yellow-500"
                      : "border-l-gray-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          interest.stages.icNdaExchange.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.icNdaExchange.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${
                            interest.stages.icNdaExchange.status === "approved"
                              ? "text-green-600"
                              : interest.stages.icNdaExchange.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle
                          className={
                            interest.stages.icNdaExchange.status === "approved"
                              ? "text-green-800"
                              : interest.stages.icNdaExchange.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }
                        >
                          Stage 2: IC/NDA Exchange
                        </CardTitle>
                        <CardDescription>
                          {interest.stages.icNdaExchange.status === "approved"
                            ? `Approved on ${interest.stages.icNdaExchange.approvedDate}`
                            : interest.stages.icNdaExchange.status === "pending"
                              ? "Awaiting investor to upload signed documents"
                              : "Locked - Complete previous stage"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        interest.stages.icNdaExchange.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : interest.stages.icNdaExchange.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {interest.stages.icNdaExchange.status === "approved"
                        ? "Approved"
                        : interest.stages.icNdaExchange.status === "pending"
                          ? "Pending"
                          : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                {interest.stages.icNdaExchange.status !== "locked" && (
                  <CardContent className="space-y-4">
                    {interest.stages.icNdaExchange.documentsSent && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">✓ IC/NDA documents automatically sent to investor</p>
                      </div>
                    )}

                    {interest.stages.icNdaExchange.documentsUploaded.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Uploaded Documents</h4>
                        {interest.stages.icNdaExchange.documentsUploaded.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-600">
                                  {doc.size} • Uploaded {doc.uploadDate}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              {interest.stages.icNdaExchange.status !== "approved" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                  onClick={() => handleOpenRejectModal("icNdaExchange", doc.name)}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}

                        {interest.stages.icNdaExchange.status === "pending" && (
                          <div className="flex justify-end pt-4 border-t">
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApproveStage(interest.id, "icNdaExchange")}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Stage
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>Waiting for investor to upload signed documents</p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Stage 3: Business Proposal */}
              <Card
                className={`shadow-lg border-0 border-l-4 ${
                  interest.stages.businessProposal.status === "approved"
                    ? "border-l-green-500"
                    : interest.stages.businessProposal.status === "pending"
                      ? "border-l-yellow-500"
                      : "border-l-gray-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          interest.stages.businessProposal.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.businessProposal.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${
                            interest.stages.businessProposal.status === "approved"
                              ? "text-green-600"
                              : interest.stages.businessProposal.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle
                          className={
                            interest.stages.businessProposal.status === "approved"
                              ? "text-green-800"
                              : interest.stages.businessProposal.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }
                        >
                          Stage 3: Business Proposal
                        </CardTitle>
                        <CardDescription>
                          {interest.stages.businessProposal.status === "approved"
                            ? `Approved on ${interest.stages.businessProposal.approvedDate}`
                            : interest.stages.businessProposal.status === "pending"
                              ? "Review and approve business proposal"
                              : "Locked - Complete previous stage"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        interest.stages.businessProposal.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : interest.stages.businessProposal.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {interest.stages.businessProposal.status === "approved"
                        ? "Approved"
                        : interest.stages.businessProposal.status === "pending"
                          ? "Pending"
                          : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                {interest.stages.businessProposal.status !== "locked" && (
                  <CardContent className="space-y-4">
                    {interest.stages.businessProposal.documentsSent && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          ✓ Business proposal template automatically sent to investor
                        </p>
                      </div>
                    )}

                    {interest.stages.businessProposal.documentsUploaded.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Uploaded Documents</h4>
                        {interest.stages.businessProposal.documentsUploaded.map((doc: any, index) => (
                          <div key={index} className="space-y-3">
                            <div
                              className={`flex items-center justify-between p-4 border rounded-lg ${
                                doc.status === "rejected" ? "border-red-300 bg-red-50" : ""
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {doc.size} • Uploaded {doc.uploadDate}
                                  </p>
                                  {doc.status === "rejected" && (
                                    <p className="text-sm text-red-600 mt-1">
                                      <strong>Rejected:</strong> {doc.rejectionReason}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                {interest.stages.businessProposal.status !== "approved" &&
                                  doc.status !== "rejected" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 hover:text-red-700 bg-transparent"
                                      onClick={() => handleOpenRejectModal("businessProposal", doc.name)}
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  )}
                              </div>
                            </div>

                            {doc.status === "rejected" && (
                              <div className="ml-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                  Waiting for investor to upload revised document
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        {interest.stages.businessProposal.status === "pending" &&
                          !interest.stages.businessProposal.documentsUploaded.some(
                            (doc: any) => doc.status === "rejected",
                          ) && (
                            <div className="flex justify-end pt-4 border-t">
                              <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleApproveStage(interest.id, "businessProposal")}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve Stage
                              </Button>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>Waiting for investor to upload business proposal</p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Stage 4: HoD Review */}
              <Card
                className={`shadow-lg border-0 border-l-4 ${
                  interest.stages.hodReview.status === "approved"
                    ? "border-l-green-500"
                    : interest.stages.hodReview.status === "pending"
                      ? "border-l-yellow-500"
                      : "border-l-gray-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          interest.stages.hodReview.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.hodReview.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <Users
                          className={`w-6 h-6 ${
                            interest.stages.hodReview.status === "approved"
                              ? "text-green-600"
                              : interest.stages.hodReview.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle
                          className={
                            interest.stages.hodReview.status === "approved"
                              ? "text-green-800"
                              : interest.stages.hodReview.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }
                        >
                          Stage 4: HoD Review
                        </CardTitle>
                        <CardDescription>
                          {interest.stages.hodReview.status === "approved"
                            ? "HoD approved the proposal"
                            : interest.stages.hodReview.status === "pending"
                              ? "Upload documents and await HoD approval"
                              : "Locked - Complete previous stage"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        interest.stages.hodReview.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : interest.stages.hodReview.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {interest.stages.hodReview.status === "approved"
                        ? "Approved"
                        : interest.stages.hodReview.status === "pending"
                          ? "Pending"
                          : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                {interest.stages.hodReview.status === "pending" && (
                  <CardContent className="space-y-4">
                    {interest.stages.hodReview.documentsUploaded.length === 0 ? (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Upload Documents for HoD Review</h4>
                        <FileUploadZone
                          title="Business Proposal Overview"
                          description="Upload summary of business proposal"
                          acceptedTypes=".pdf,.doc,.docx"
                          maxSize="10MB"
                          status="required"
                        />
                        <FileUploadZone
                          title="TRIPES Documents"
                          description="Upload TRIPES evaluation documents"
                          acceptedTypes=".pdf,.doc,.docx"
                          maxSize="10MB"
                          status="required"
                        />
                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Submit to HoD
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Documents Submitted to HoD</h4>
                        {interest.stages.hodReview.refurbishmentRequested ? (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              <p className="font-semibold text-red-800">Refurbishment Requested</p>
                            </div>
                            <p className="text-sm text-red-700 mb-3">
                              HoD has requested changes to the proposal. Please review the feedback.
                            </p>
                            <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                              View Refurbishment Details
                            </Button>
                          </div>
                        ) : (
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-yellow-600" />
                              <p className="font-semibold text-yellow-800">Awaiting HoD Approval</p>
                            </div>
                            <p className="text-sm text-yellow-700 mt-1">
                              Documents have been submitted and are under review by the Head of Department
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Stage 5: MD/CEO Approval */}
              <Card
                className={`shadow-lg border-0 border-l-4 ${
                  interest.stages.mdCeoApproval.status === "approved"
                    ? "border-l-green-500"
                    : interest.stages.mdCeoApproval.status === "pending"
                      ? "border-l-yellow-500"
                      : "border-l-gray-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          interest.stages.mdCeoApproval.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.mdCeoApproval.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <Users
                          className={`w-6 h-6 ${
                            interest.stages.mdCeoApproval.status === "approved"
                              ? "text-green-600"
                              : interest.stages.mdCeoApproval.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle
                          className={
                            interest.stages.mdCeoApproval.status === "approved"
                              ? "text-green-800"
                              : interest.stages.mdCeoApproval.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }
                        >
                          Stage 5: MD/CEO Approval
                        </CardTitle>
                        <CardDescription>
                          {interest.stages.mdCeoApproval.status === "approved"
                            ? "MD/CEO approved the proposal"
                            : interest.stages.mdCeoApproval.status === "pending"
                              ? "Upload documents and await MD/CEO approval"
                              : "Locked - Complete previous stage"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        interest.stages.mdCeoApproval.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : interest.stages.mdCeoApproval.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {interest.stages.mdCeoApproval.status === "approved"
                        ? "Approved"
                        : interest.stages.mdCeoApproval.status === "pending"
                          ? "Pending"
                          : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                {interest.stages.mdCeoApproval.status === "pending" && (
                  <CardContent className="space-y-4">
                    {interest.stages.mdCeoApproval.documentsUploaded.length === 0 ? (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Upload Documents for MD/CEO Review</h4>
                        <FileUploadZone
                          title="Executive Summary"
                          description="Upload executive summary of the proposal"
                          acceptedTypes=".pdf,.doc,.docx"
                          maxSize="10MB"
                          status="required"
                        />
                        <FileUploadZone
                          title="HoD Recommendation"
                          description="Upload HoD recommendation letter"
                          acceptedTypes=".pdf,.doc,.docx"
                          maxSize="10MB"
                          status="required"
                        />
                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Submit to MD/CEO
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Documents Submitted to MD/CEO</h4>
                        {interest.stages.mdCeoApproval.refurbishmentRequested ? (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              <p className="font-semibold text-red-800">Refurbishment Requested</p>
                            </div>
                            <p className="text-sm text-red-700 mb-3">
                              MD/CEO has requested changes to the proposal. Please review the feedback.
                            </p>
                            <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                              View Refurbishment Details
                            </Button>
                          </div>
                        ) : (
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-yellow-600" />
                              <p className="font-semibold text-yellow-800">Awaiting MD/CEO Approval</p>
                            </div>
                            <p className="text-sm text-yellow-700 mt-1">
                              Documents have been submitted and are under review by the Managing Director/CEO
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Stage 6: KYC */}
              <Card
                className={`shadow-lg border-0 border-l-4 ${
                  interest.stages.kyc.status === "approved"
                    ? "border-l-green-500"
                    : interest.stages.kyc.status === "pending"
                      ? "border-l-yellow-500"
                      : "border-l-gray-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          interest.stages.kyc.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.kyc.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${
                            interest.stages.kyc.status === "approved"
                              ? "text-green-600"
                              : interest.stages.kyc.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle
                          className={
                            interest.stages.kyc.status === "approved"
                              ? "text-green-800"
                              : interest.stages.kyc.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }
                        >
                          Stage 6: KYC Documentation
                        </CardTitle>
                        <CardDescription>
                          {interest.stages.kyc.status === "approved"
                            ? "All KYC documents verified"
                            : interest.stages.kyc.status === "pending"
                              ? "Verify investor KYC documents"
                              : "Locked - Complete previous stage"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        interest.stages.kyc.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : interest.stages.kyc.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {interest.stages.kyc.status === "approved"
                        ? "Approved"
                        : interest.stages.kyc.status === "pending"
                          ? "Pending"
                          : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                {interest.stages.kyc.status === "pending" && (
                  <CardContent className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Required Documents</h4>
                    <div className="space-y-3">
                      {interest.stages.kyc.requiredDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="font-medium">{doc}</span>
                          </div>
                          <Badge variant="outline" className="text-yellow-600">
                            Pending
                          </Badge>
                        </div>
                      ))}
                    </div>

                    {interest.stages.kyc.documentsUploaded.length > 0 && (
                      <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-semibold text-gray-800">Uploaded Documents</h4>
                        {interest.stages.kyc.documentsUploaded.map((doc: any, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-600">Uploaded {doc.uploadDate}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 hover:text-green-700 bg-transparent"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Verify
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end pt-4 border-t">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve All Documents
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Stage 7: Presentation */}
              <Card
                className={`shadow-lg border-0 border-l-4 ${
                  interest.stages.presentation.status === "approved"
                    ? "border-l-green-500"
                    : interest.stages.presentation.status === "pending"
                      ? "border-l-yellow-500"
                      : "border-l-gray-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          interest.stages.presentation.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.presentation.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <Calendar
                          className={`w-6 h-6 ${
                            interest.stages.presentation.status === "approved"
                              ? "text-green-600"
                              : interest.stages.presentation.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle
                          className={
                            interest.stages.presentation.status === "approved"
                              ? "text-green-800"
                              : interest.stages.presentation.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }
                        >
                          Stage 7: Investor Presentation
                        </CardTitle>
                        <CardDescription>
                          {interest.stages.presentation.status === "approved"
                            ? "Presentation completed"
                            : interest.stages.presentation.status === "pending"
                              ? "Schedule investor presentation"
                              : "Locked - Complete previous stage"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        interest.stages.presentation.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : interest.stages.presentation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {interest.stages.presentation.status === "approved"
                        ? "Completed"
                        : interest.stages.presentation.status === "pending"
                          ? "Pending"
                          : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                {interest.stages.presentation.status === "pending" && (
                  <CardContent className="space-y-6">
                    {!interest.stages.presentation.date ? (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Schedule Presentation</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="presentation-date">Presentation Date</Label>
                            <Input
                              id="presentation-date"
                              type="date"
                              value={presentationDate}
                              onChange={(e) => setPresentationDate(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="presentation-time">Presentation Time</Label>
                            <Input
                              id="presentation-time"
                              type="time"
                              value={presentationTime}
                              onChange={(e) => setPresentationTime(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Attendees</Label>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Enter attendee name or email"
                              value={newAttendee}
                              onChange={(e) => setNewAttendee(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  handleAddAttendee(interest.id)
                                }
                              }}
                            />
                            <Button type="button" onClick={() => handleAddAttendee(interest.id)}>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Add
                            </Button>
                          </div>

                          {interest.stages.presentation.attendees.length > 0 && (
                            <div className="space-y-2 mt-3">
                              {interest.stages.presentation.attendees.map((attendee, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span>{attendee}</span>
                                  </div>
                                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleSchedulePresentation(interest.id)}
                            disabled={!presentationDate || !presentationTime}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Presentation
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="font-semibold text-green-800">Presentation Scheduled</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-green-700 font-medium">Date</p>
                              <p className="text-green-900">{interest.stages.presentation.date}</p>
                            </div>
                            <div>
                              <p className="text-sm text-green-700 font-medium">Time</p>
                              <p className="text-green-900">{interest.stages.presentation.time}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-green-700 font-medium mb-2">Attendees</p>
                            <div className="space-y-2">
                              {interest.stages.presentation.attendees.map((attendee, index) => (
                                <div key={index} className="flex items-center space-x-2 text-green-900">
                                  <Users className="w-4 h-4" />
                                  <span>{attendee}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                          <Button variant="outline">Reschedule</Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Completed
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>
          )
        }

        // Otherwise, show the interests list
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Investor Interests</h1>
                <p className="text-gray-600">Manage expressed interests and document flow</p>
              </div>
            </div>

            <div className="space-y-6">
              {interests.map((interest) => (
                <Card key={interest.id} className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{interest.projectTitle}</CardTitle>
                        <CardDescription>
                          {interest.investorName} • {interest.investorEmail}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          interest.status === "Interest Expressed"
                            ? "bg-yellow-100 text-yellow-800"
                            : interest.status.includes("Business Proposal")
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {interest.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Document Flow Status */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg text-center bg-green-100">
                        <div className="font-medium text-green-800">Interest</div>
                        <div className="text-sm text-green-600">Complete</div>
                      </div>

                      <div
                        className={`p-3 rounded-lg text-center ${
                          interest.stages.icNdaExchange.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.icNdaExchange.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <div
                          className={`font-medium ${
                            interest.stages.icNdaExchange.status === "approved"
                              ? "text-green-800"
                              : interest.stages.icNdaExchange.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }`}
                        >
                          IC/NDA
                        </div>
                        <div
                          className={`text-sm ${
                            interest.stages.icNdaExchange.status === "approved"
                              ? "text-green-600"
                              : interest.stages.icNdaExchange.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-500"
                          }`}
                        >
                          {interest.stages.icNdaExchange.status === "approved"
                            ? "Complete"
                            : interest.stages.icNdaExchange.status === "pending"
                              ? "Pending"
                              : "Locked"}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg text-center ${
                          interest.stages.businessProposal.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.businessProposal.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <div
                          className={`font-medium ${
                            interest.stages.businessProposal.status === "approved"
                              ? "text-green-800"
                              : interest.stages.businessProposal.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }`}
                        >
                          Proposal
                        </div>
                        <div
                          className={`text-sm ${
                            interest.stages.businessProposal.status === "approved"
                              ? "text-green-600"
                              : interest.stages.businessProposal.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-500"
                          }`}
                        >
                          {interest.stages.businessProposal.status === "approved"
                            ? "Complete"
                            : interest.stages.businessProposal.status === "pending"
                              ? "Pending"
                              : "Locked"}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg text-center ${
                          interest.stages.hodReview.status === "approved"
                            ? "bg-green-100"
                            : interest.stages.hodReview.status === "pending"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <div
                          className={`font-medium ${
                            interest.stages.hodReview.status === "approved"
                              ? "text-green-800"
                              : interest.stages.hodReview.status === "pending"
                                ? "text-yellow-800"
                                : "text-gray-600"
                          }`}
                        >
                          HoD Review
                        </div>
                        <div
                          className={`text-sm ${
                            interest.stages.hodReview.status === "approved"
                              ? "text-green-600"
                              : interest.stages.hodReview.status === "pending"
                                ? "text-yellow-600"
                                : "text-gray-500"
                          }`}
                        >
                          {interest.stages.hodReview.status === "approved"
                            ? "Complete"
                            : interest.stages.hodReview.status === "pending"
                              ? "Pending"
                              : "Locked"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setSelectedInterest(interest.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
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

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Management</h1>
                <p className="text-gray-600">Manage IC/NDA templates, project plans, and PMC documents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Documents */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Template Documents</CardTitle>
                  <CardDescription>Standard templates to send to investors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Investment Certificate Template</p>
                        <p className="text-sm text-gray-600">Standard IC template for all projects</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">NDA Template</p>
                        <p className="text-sm text-gray-600">Non-disclosure agreement template</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Project Plan Template</p>
                        <p className="text-sm text-gray-600">Business proposal template</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Documents */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Upload Documents</CardTitle>
                  <CardDescription>Upload PMC and other project documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUploadZone
                    title="Project Model Canvas (PMC)"
                    description="Upload generated PMC document"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="15MB"
                    status="optional"
                  />

                  <FileUploadZone
                    title="KYC Form"
                    description="Upload completed KYC form"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="10MB"
                    status="optional"
                  />

                  <FileUploadZone
                    title="MoU Draft"
                    description="Upload draft Memorandum of Understanding"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="15MB"
                    status="optional"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "hod-requests":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">HoD Requests</h1>
                <p className="text-gray-600">Handle refurbishment requests and resubmissions</p>
              </div>
            </div>

            {hodRequests.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Requests</h3>
                  <p className="text-gray-600">All proposals are currently under normal review process</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {hodRequests.map((request) => (
                  <Card key={request.id} className="shadow-lg border-0 border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-red-800">{request.projectTitle}</CardTitle>
                          <CardDescription>
                            {request.investorName} • Request Date: {request.requestDate}
                          </CardDescription>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          {request.requestType === "refurbishment" ? "Refurbishment Required" : request.requestType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">HoD Comments:</h4>
                        <p className="text-red-700">{request.hodComments}</p>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Response to Investor</label>
                        <Textarea
                          placeholder="Draft your response to the investor explaining the required changes..."
                          rows={4}
                          className="w-full"
                        />
                      </div>

                      <div className="flex space-x-3 pt-4 border-t">
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                          <Send className="w-4 h-4 mr-2" />
                          Send Refurbishment Request
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Original Proposal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )

      case "pmc":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PMC Generation</h1>
                <p className="text-gray-600">Generate and manage Project Model Canvas documents</p>
              </div>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Generate Project Model Canvas</CardTitle>
                <CardDescription>Create PMC for approved proposals before forwarding to MD/CEO</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select approved project</option>
                      <option value="PPP-PROJ-001">Smart City Infrastructure Development</option>
                      <option value="PPP-PROJ-002">Renewable Energy Grid Integration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investor</label>
                    <input
                      type="text"
                      value="John Investor"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Partners</label>
                    <Textarea placeholder="List key partners and stakeholders..." rows={3} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Activities</label>
                    <Textarea placeholder="Describe key project activities..." rows={3} className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Value Propositions</label>
                    <Textarea placeholder="Define value propositions..." rows={3} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Relationships</label>
                    <Textarea placeholder="Describe customer relationships..." rows={3} className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Streams</label>
                    <Textarea placeholder="Identify revenue streams..." rows={3} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost Structure</label>
                    <Textarea placeholder="Outline cost structure..." rows={3} className="w-full" />
                  </div>
                </div>

                <div className="flex space-x-3 pt-6 border-t">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Generate PMC
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
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
        userRole="ppp-member"
        userName="Sarah Manager"
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>

      {/* Reject Document Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Document</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this document. The investor will receive this feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Explain why this document is being rejected and what needs to be corrected..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleRejectDocument}
              disabled={!rejectReason}
            >
              Reject Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
