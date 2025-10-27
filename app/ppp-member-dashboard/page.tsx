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
  X,
  Check,
  Download,
  ChevronLeft,
  Search,
  Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { FileUploadZone } from "@/components/file-upload-zone";

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
          { name: "Investment_Certificate_Signed.pdf", uploadDate: "2024-01-19", size: "2.3 MB", type: "ic" },
          { name: "NDA_Signed.pdf", uploadDate: "2024-01-19", size: "1.8 MB", type: "nda" },
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
            type: "proposal",
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
  {
    id: "INT-003",
    projectId: "PPP-PROJ-003",
    projectTitle: "Digital Healthcare Platform",
    investorName: "Tech Ventures Ltd",
    investorEmail: "contact@techventures.com",
    expressedDate: "2024-01-15",
    status: "HoD Review",
    currentStage: 4,
    stages: {
      interestExpressed: {
        status: "completed",
        date: "2024-01-15",
      },
      icNdaExchange: {
        status: "approved",
        documentsSent: true,
        documentsUploaded: [
          { name: "IC_TechVentures.pdf", uploadDate: "2024-01-16", size: "2.1 MB", type: "ic" },
          { name: "NDA_TechVentures.pdf", uploadDate: "2024-01-16", size: "1.9 MB", type: "nda" },
        ],
        approvedDate: "2024-01-16",
      },
      businessProposal: {
        status: "approved",
        documentsSent: true,
        documentsUploaded: [
          {
            name: "Business_Plan_Healthcare.pdf",
            uploadDate: "2024-01-18",
            size: "8.2 MB",
            status: "approved",
            type: "proposal",
          },
        ],
        approvedDate: "2024-01-18",
      },
      hodReview: {
        status: "pending",
        documentsUploaded: [
          { name: "Healthcare_Overview.pdf", uploadDate: "2024-01-20", size: "3.4 MB", type: "hod" },
          { name: "TRIPES_Assessment.pdf", uploadDate: "2024-01-20", size: "4.1 MB", type: "hod" },
        ],
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
        requiredDocuments: [],
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

const refurbishmentRequests = [
  {
    id: "REF-001",
    projectId: "PPP-PROJ-003",
    projectTitle: "Digital Healthcare Platform",
    interestId: "INT-003",
    investorName: "Tech Ventures Ltd",
    hodComment:
      "The financial projections need to be more detailed. Please request updated cash flow analysis for years 3-5 and clarify the CAPEX breakdown.",
    pppMemberComment: null,
    requiredDocuments: [],
    requestDate: "2024-01-25",
    status: "pending_response",
    hodName: "Dr. Michael Chen",
  },
  {
    id: "REF-002",
    projectId: "PPP-PROJ-001",
    projectTitle: "Smart City Infrastructure Development",
    interestId: "INT-002",
    investorName: "Sarah Johnson",
    hodComment:
      "Risk assessment needs to be comprehensive. Include market risk, regulatory risk, and operational risk analysis.",
    pppMemberComment:
      "We have added notes on market conditions. Awaiting investor response on regulatory documentation.",
    requiredDocuments: ["Updated_Risk_Assessment.pdf", "Regulatory_Compliance_Report.pdf"],
    requestDate: "2024-01-20",
    status: "awaiting_investor",
    hodName: "Dr. Michael Chen",
  },
]

export default function PPPMemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [interests, setInterests] = useState(investorInterests)
  const [refurbishments, setRefurbishments] = useState(refurbishmentRequests)
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null)
  const [viewingDocuments, setViewingDocuments] = useState<string | null>(null)
  const [selectedRefurbishment, setSelectedRefurbishment] = useState<string | null>(null)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [documentToReject, setDocumentToReject] = useState<{ stage: string; docName: string } | null>(null)
  const [presentationDate, setPresentationDate] = useState("")
  const [presentationTime, setPresentationTime] = useState("")
  const [newAttendee, setNewAttendee] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [documentsSearchTerm, setDocumentsSearchTerm] = useState("")
  const [filterStage, setFilterStage] = useState("all")
  const [refurbPppComment, setRefurbPppComment] = useState("")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Investor Interests", id: "interests", icon: Heart },
    { name: "Document Management", id: "documents", icon: FileText },
    { name: "HoD Requests", id: "hod-requests", icon: AlertTriangle },
    { name: "PMC Generation", id: "pmc", icon: Upload },
  ]

  const availableDocuments = [
    { id: "doc-1", name: "Updated Financial Projections", label: "Updated_Financial_Projections.pdf" },
    { id: "doc-2", name: "CAPEX Breakdown", label: "CAPEX_Breakdown.pdf" },
    { id: "doc-3", name: "Risk Assessment", label: "Risk_Assessment.pdf" },
    { id: "doc-4", name: "Market Analysis", label: "Market_Analysis.pdf" },
    { id: "doc-5", name: "Regulatory Compliance Report", label: "Regulatory_Compliance_Report.pdf" },
    { id: "doc-6", name: "Operational Plan", label: "Operational_Plan.pdf" },
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

  const handleSendRefurbishment = (refurbId: string) => {
    if (!refurbPppComment || selectedDocuments.length === 0) {
      alert("Please add comments and select at least one document")
      return
    }

    setRefurbishments((prev) =>
      prev.map((refurb) => {
        if (refurb.id === refurbId) {
          return {
            ...refurb,
            pppMemberComment: refurbPppComment,
            requiredDocuments: selectedDocuments.map(
              (docId) => availableDocuments.find((d) => d.id === docId)?.label || "",
            ),
            status: "awaiting_investor",
          }
        }
        return refurb
      }),
    )

    setSelectedRefurbishment(null)
    setRefurbPppComment("")
    setSelectedDocuments([])
  }

  const handleCloseRefurbishment = (refurbId: string) => {
    setRefurbishments((prev) =>
      prev.map((refurb) => {
        if (refurb.id === refurbId) {
          return { ...refurb, status: "closed" }
        }
        return refurb
      }),
    )

    setSelectedRefurbishment(null)
    setRefurbPppComment("")
    setSelectedDocuments([])
  }

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments((prev) => (prev.includes(docId) ? prev.filter((d) => d !== docId) : [...prev, docId]))
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

  const getAllDocuments = (interest: any) => {
    const allDocs: any[] = []

    if (interest.stages.icNdaExchange.documentsUploaded.length > 0) {
      allDocs.push(
        ...interest.stages.icNdaExchange.documentsUploaded.map((doc: any) => ({
          ...doc,
          stage: "IC/NDA Exchange",
          stageKey: "icNdaExchange",
        })),
      )
    }

    if (interest.stages.businessProposal.documentsUploaded.length > 0) {
      allDocs.push(
        ...interest.stages.businessProposal.documentsUploaded.map((doc: any) => ({
          ...doc,
          stage: "Business Proposal",
          stageKey: "businessProposal",
        })),
      )
    }

    if (interest.stages.hodReview.documentsUploaded.length > 0) {
      allDocs.push(
        ...interest.stages.hodReview.documentsUploaded.map((doc: any) => ({
          ...doc,
          stage: "HoD Review",
          stageKey: "hodReview",
        })),
      )
    }

    if (interest.stages.mdCeoApproval.documentsUploaded.length > 0) {
      allDocs.push(
        ...interest.stages.mdCeoApproval.documentsUploaded.map((doc: any) => ({
          ...doc,
          stage: "MD/CEO Approval",
          stageKey: "mdCeoApproval",
        })),
      )
    }

    if (interest.stages.kyc.documentsUploaded.length > 0) {
      allDocs.push(
        ...interest.stages.kyc.documentsUploaded.map((doc: any) => ({
          ...doc,
          stage: "KYC",
          stageKey: "kyc",
        })),
      )
    }

    return allDocs
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
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
                  <Button
                    variant="outline"
                    onClick={() => setSelectedInterest(null)}
                  >
                    ← Back to Interests
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Interest Tracking
                    </h2>
                    <p className="text-gray-600">{interest.projectTitle}</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {interest.status}
                </Badge>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Investor Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Investor Name
                      </div>
                      <div className="font-medium">{interest.investorName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Contact Email
                      </div>
                      <div className="font-medium">
                        {interest.investorEmail}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Project ID
                      </div>
                      <Badge variant="outline">{interest.projectId}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Submission Date
                      </div>
                      <div className="font-medium">
                        {interest.expressedDate}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Application Stages
                    </h3>

                    {/* Stage 1: Interest Expressed */}
                    <div
                      className={`border rounded-lg p-6 ${
                        2 >= 1
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              2 > 1
                                ? "bg-green-500 text-white"
                                : 2 === 1
                                ? "bg-yellow-400 text-yellow-900"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {2 > 1 ? <Check className="w-4 h-4" /> : "1"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 1: Interest Expressed
                          </h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            2 > 1
                              ? "bg-green-100 text-green-800"
                              : 2 === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {2 > 1
                            ? "Approved"
                            : 2 === 1
                            ? "Pending"
                            : "Not Started"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Your interest in this project has been registered and is
                        being reviewed by the PPP team.
                      </p>
                      {selectedInterest.stage === 1 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 text-sm">
                            ⏳ Your interest is currently under review. You will
                            be notified once approved.
                          </p>
                        </div>
                      )}
                      {2 > 1 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 text-sm">
                            ✅ Interest approved. Moving to document exchange
                            phase.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 2: IC/NDA */}
                    <div
                      className={`border rounded-lg p-6 ${
                        3 >= 2
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              3 > 2
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 2
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {3 > 2 ? <Check className="w-4 h-4" /> : "2"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 2: IC/NDA Exchange
                          </h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            3 > 2
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 2
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {3 > 2
                            ? "Completed"
                            : selectedInterest.stage === 2
                            ? "In Progress"
                            : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Download, sign, and upload the Investment Certificate
                        and Non-Disclosure Agreement documents.
                      </p>

                      {3 >= 2 && (
                        <div className="space-y-4">
                          {/* Download Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">
                              📥 Download Documents
                            </h5>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">
                                      Investment Certificate Template
                                    </p>
                                    <p className="text-sm text-blue-600">
                                      IC_Template_v2.pdf
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-200 bg-transparent"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-200 bg-danger"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">
                                      Non-Disclosure Agreement
                                    </p>
                                    <p className="text-sm text-blue-600">
                                      NDA_Template_v2.pdf
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-200 bg-transparent"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-200 bg-danger"
                                >
                                  <Download className="w-4 h-4" />
                                  Reject
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-200 bg-transparent"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Approve Stage
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>


                    {/* Stage 8: Presentation & KYC */}
                    <div
                      className={`border rounded-lg p-6 ${9 >= 8 ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              9 >= 8 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {9 >= 8 ? <Check className="w-4 h-4" /> : "8"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 8: Presentation & KYC</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            9 >= 8 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                          }
                        >
                          {9 >= 8 ? "Active" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Final stage: Present your project to stakeholders and complete KYC documentation.
                      </p>

                      {9 >= 8 && (
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">🎯 Presentation Scheduling</h5>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <p className="text-green-800 text-sm mb-3">📅 Your presentation has been scheduled:</p>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Date:</strong> February 15, 2024
                                </p>
                                <p>
                                  <strong>Time:</strong> 2:00 PM - 3:30 PM
                                </p>
                                <p>
                                  <strong>Location:</strong> Executive Conference Room
                                </p>
                                <p>
                                  <strong>Attendees:</strong> MD/CEO, HoD, PPP Team
                                </p>
                              </div>
                              <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700 text-white">
                                <Calendar className="w-4 h-4 mr-2" />
                                Add to Calendar
                              </Button>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">📋 KYC Documentation</h5>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-green-600" />
                                  <div>
                                    <p className="font-medium text-green-800">KYC Form Template</p>
                                    <p className="text-sm text-green-600">KYC_Form_v1.pdf</p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-200 bg-transparent"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>

                              <FileUploadZone
                                title="Completed KYC Form"
                                description="Upload your completed KYC documentation"
                                acceptedTypes=".pdf,.doc,.docx"
                                maxSize="15MB"
                                status={"submitted" === "submitted" ? "uploaded" : "required"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* {Buttom Buttons} */}
                    <div
                      className={`border rounded-lg p-6 ${
                        3 >= 2
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-200 bg-success"
                      >
                        <Download className="w-4 h-4" />
                        Approve Proposal
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-200 bg-danger"
                      >
                        <Download className="w-4 h-4" />
                        Cancel Proposal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-green-800">
                          Stage 1: Interest Expressed
                        </CardTitle>
                        <CardDescription>
                          Interest submitted on{" "}
                          {interest.stages.interestExpressed.date}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Investor Interests</h1>
                <p className="text-gray-600">Manage expressed interests and document flow</p>
              </div>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by interest ID, investor name, or project title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {interests
              .filter(
                (interest) =>
                  interest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  interest.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  interest.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((interest) => (
                <Card key={interest.id} className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl">{interest.projectTitle}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {interest.id}
                          </Badge>
                        </div>
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

                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setSelectedInterest(interest.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>

                      <Button variant="outline" onClick={() => setViewingDocuments(interest.id)}>
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )

      case "documents":

      
        if (viewingDocuments) {
          const interest = interests.find((i) => i.id === viewingDocuments)
          if (!interest) {
            setViewingDocuments(null)
            return null
          }

          const filteredDocs =
            filterStage === "all"
              ? getAllDocuments(interest)
              : getAllDocuments(interest).filter((doc) => doc.stageKey === filterStage)

          const searchedDocs = filteredDocs.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))

          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => setViewingDocuments(null)}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Interests
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Document Center</h2>
                    <p className="text-gray-600">{interest.projectTitle}</p>
                  </div>
                </div>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Interest Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Investor</div>
                      <div className="font-medium">{interest.investorName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="font-medium">{interest.investorEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Status</div>
                      <Badge className="bg-blue-100 text-blue-800">{interest.status}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Total Documents</div>
                      <div className="font-medium">{getAllDocuments(interest).length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search documents by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={filterStage}
                      onChange={(e) => setFilterStage(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Stages</option>
                      <option value="icNdaExchange">IC/NDA Exchange</option>
                      <option value="businessProposal">Business Proposal</option>
                      <option value="hodReview">HoD Review</option>
                      <option value="mdCeoApproval">MD/CEO Approval</option>
                      <option value="kyc">KYC</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {searchedDocs.length > 0 ? (
                <div className="space-y-4">
                  {searchedDocs.map((doc, index) => (
                    <Card key={index} className="shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                  Stage: <Badge variant="outline">{doc.stage}</Badge>
                                </p>
                                <p>
                                  {doc.size} • Uploaded {doc.uploadDate}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Documents Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Management</h1>
                <p className="text-gray-600">View and download documents from your interests</p>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by interest ID, investor name, or project title..."
                value={documentsSearchTerm}
                onChange={(e) => setDocumentsSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {interests
              .filter(
                (interest) =>
                  interest.id.toLowerCase().includes(documentsSearchTerm.toLowerCase()) ||
                  interest.investorName.toLowerCase().includes(documentsSearchTerm.toLowerCase()) ||
                  interest.projectTitle.toLowerCase().includes(documentsSearchTerm.toLowerCase()),
              )
              .map((interest) => (
                <Card key={interest.id} className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-lg">{interest.projectTitle}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {interest.id}
                          </Badge>
                        </div>
                        <CardDescription>{interest.investorName}</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{interest.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="w-5 h-5" />
                        <span>{getAllDocuments(interest).length} documents available</span>
                      </div>
                      <Button
                        onClick={() => setViewingDocuments(interest.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Documents Feature</h3>
                <p className="text-gray-600">Select an interest from the Investor Interests tab to view documents</p>
              </CardContent>
            </Card>
          </div>
        )

      case "hod-requests":
        if (selectedRefurbishment) {
          const refurb = refurbishments.find((r) => r.id === selectedRefurbishment)
          if (!refurb) {
            setSelectedRefurbishment(null)
            return null
          }

          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => setSelectedRefurbishment(null)}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Requests
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Refurbishment Details</h2>
                    <p className="text-gray-600">{refurb.projectTitle}</p>
                  </div>
                </div>
                <Badge
                  className={
                    refurb.status === "awaiting_investor"
                      ? "bg-blue-100 text-blue-800"
                      : refurb.status === "pending_response"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {refurb.status === "awaiting_investor"
                    ? "Awaiting Investor"
                    : refurb.status === "pending_response"
                      ? "Pending Response"
                      : "Closed"}
                </Badge>
              </div>

              {/* Overview */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Request Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Project</div>
                      <div className="font-medium">{refurb.projectTitle}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Investor</div>
                      <div className="font-medium">{refurb.investorName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">HoD</div>
                      <div className="font-medium">{refurb.hodName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Request Date</div>
                      <div className="font-medium">{refurb.requestDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* HoD Comment */}
              <Card className="shadow-lg border-0 border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-red-800">HoD Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-gray-800">{refurb.hodComment}</p>
                  </div>
                </CardContent>
              </Card>

              {/* PPP Member Comments */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>PPP Member Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ppp-comment">Your Comments</Label>
                    <Textarea
                      id="ppp-comment"
                      placeholder="Add your response to the HoD feedback. Explain what has been done or what is being requested from the investor..."
                      value={refurbPppComment}
                      onChange={(e) => setRefurbPppComment(e.target.value)}
                      rows={5}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents Selection */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Required Documents for Investor</CardTitle>
                  <CardDescription>
                    Select documents that the investor needs to upload to address the HoD feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <input
                          type="checkbox"
                          id={doc.id}
                          checked={selectedDocuments.includes(doc.id)}
                          onChange={() => toggleDocumentSelection(doc.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={doc.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-800">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.label}</div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {selectedDocuments.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>{selectedDocuments.length}</strong> document(s) selected for investor upload
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {refurb.status !== "closed" && (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleSendRefurbishment(refurb.id)}
                        disabled={!refurbPppComment || selectedDocuments.length === 0}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Refurbishment Request
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCloseRefurbishment(refurb.id)}
                        className="text-gray-700"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Close Refurbishment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Status */}
              {refurb.pppMemberComment && (
                <Card className="shadow-lg border-0 border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-800">Current Response Sent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Your Response:</p>
                      <p className="text-gray-800">{refurb.pppMemberComment}</p>
                    </div>
                    {refurb.requiredDocuments.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Required Documents:</p>
                        <div className="space-y-2">
                          {refurb.requiredDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2 text-gray-700">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )
        }

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">HoD Refurbishment Requests</h1>
                <p className="text-gray-600">Manage refurbishment requests from the Head of Department</p>
              </div>
            </div>

            {refurbishments.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Requests</h3>
                  <p className="text-gray-600">All proposals are currently progressing normally</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {refurbishments.map((refurb) => (
                  <Card key={refurb.id} className="shadow-lg border-0 border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{refurb.projectTitle}</CardTitle>
                          <CardDescription>
                            {refurb.investorName} • From: {refurb.hodName}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={
                              refurb.status === "awaiting_investor"
                                ? "bg-blue-100 text-blue-800"
                                : refurb.status === "pending_response"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {refurb.status === "awaiting_investor"
                              ? "Awaiting Investor"
                              : refurb.status === "pending_response"
                                ? "Pending Response"
                                : "Closed"}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => setSelectedRefurbishment(refurb.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View More
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{refurb.hodComment}</p>
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
                    <Label htmlFor="project-select">Select Project</Label>
                    <select
                      id="project-select"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
                    >
                      <option value="">Select approved project</option>
                      <option value="PPP-PROJ-001">Smart City Infrastructure Development</option>
                      <option value="PPP-PROJ-002">Renewable Energy Grid Integration</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="investor-input">Investor</Label>
                    <Input id="investor-input" type="text" value="John Investor" disabled className="mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="partners-textarea">Key Partners</Label>
                    <Textarea id="partners-textarea" placeholder="List key partners and stakeholders..." rows={3} />
                  </div>

                  <div>
                    <Label htmlFor="activities-textarea">Key Activities</Label>
                    <Textarea id="activities-textarea" placeholder="Describe key project activities..." rows={3} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="value-textarea">Value Propositions</Label>
                    <Textarea id="value-textarea" placeholder="Define value propositions..." rows={3} />
                  </div>

                  <div>
                    <Label htmlFor="relationships-textarea">Customer Relationships</Label>
                    <Textarea id="relationships-textarea" placeholder="Describe customer relationships..." rows={3} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="revenue-textarea">Revenue Streams</Label>
                    <Textarea id="revenue-textarea" placeholder="Identify revenue streams..." rows={3} />
                  </div>

                  <div>
                    <Label htmlFor="costs-textarea">Cost Structure</Label>
                    <Textarea id="costs-textarea" placeholder="Outline cost structure..." rows={3} />
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
