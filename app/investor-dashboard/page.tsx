"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Download,
  Eye,
  FileText,
  User,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Calendar,
  MapPin,
  Building2,
  Mail,
  Briefcase,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProjectCard } from "@/components/project-card"
import { StatusTimeline } from "@/components/status-timeline"
import { FileUploadZone } from "@/components/file-upload-zone"

const availableProjects = [
  {
    id: "PPP-ICT-001",
    project_name: "ICT Broadband Expansion Project",
    project_description: "A nationwide broadband infrastructure expansion to improve internet penetration.",
    investment_opportunity: "Open for collaboration with telecom and fiber-optic firms.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "ict@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/broadband-expansion.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "ICT_Broadband_Overview.pdf" },
      { name: "Financial Models & Projections", fileName: "ICT_Broadband_Financial.pdf" },
      { name: "Technical Specifications", fileName: "ICT_Broadband_Technical.pdf" },
      { name: "Implementation Timeline", fileName: "ICT_Broadband_Timeline.pdf" },
    ],
  },
  {
    id: "PPP-ICT-002",
    project_name: "Digital Infrastructure Initiative",
    project_description: "National digital infrastructure development for smart connectivity solutions.",
    investment_opportunity: "Seeking partners with technology expertise and network infrastructure.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "digital@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/digital-infrastructure.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "Digital_Infrastructure_Overview.pdf" },
      { name: "Financial Models & Projections", fileName: "Digital_Infrastructure_Financial.pdf" },
      { name: "Technical Specifications", fileName: "Digital_Infrastructure_Technical.pdf" },
    ],
  },
  {
    id: "PPP-ICT-003",
    project_name: "5G Network Deployment",
    project_description: "Nationwide 5G network infrastructure deployment across urban and rural areas.",
    investment_opportunity: "Collaborate with telecom companies for network rollout.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "5g@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/5g-network.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "5G_Network_Overview.pdf" },
      { name: "Financial Models & Projections", fileName: "5G_Network_Financial.pdf" },
      { name: "Coverage Maps & Technical Details", fileName: "5G_Network_Coverage.pdf" },
      { name: "Implementation Roadmap", fileName: "5G_Network_Roadmap.pdf" },
    ],
  },
  {
    id: "PPP-ICT-004",
    project_name: "Data Centers and Cloud Infrastructure",
    project_description: "Strategic data centers and cloud computing infrastructure for government and private sector.",
    investment_opportunity: "Partners needed for data center operations and cloud services.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "datacenter@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Planning",
    project_image: "/data-centers.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "DataCenters_Overview.pdf" },
      { name: "Infrastructure Specifications", fileName: "DataCenters_Infrastructure.pdf" },
      { name: "Security & Compliance", fileName: "DataCenters_Security.pdf" },
    ],
  },
  {
    id: "PPP-ICT-005",
    project_name: "E-Government Services Platform",
    project_description: "Integrated e-government platform for seamless digital citizen engagement.",
    investment_opportunity: "Seeking IT solution providers and integration partners.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "egov@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/e-government.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "EGovernment_Overview.pdf" },
      { name: "Platform Architecture", fileName: "EGovernment_Architecture.pdf" },
      { name: "Services & Features", fileName: "EGovernment_Features.pdf" },
      { name: "Implementation Plan", fileName: "EGovernment_Plan.pdf" },
    ],
  },
  {
    id: "PPP-ICT-006",
    project_name: "Cybersecurity Infrastructure",
    project_description: "National cybersecurity infrastructure and threat intelligence systems.",
    investment_opportunity: "Cybersecurity companies and defense contractors welcome.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "cyber@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/cybersecurity-network.png",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "Cybersecurity_Overview.pdf" },
      { name: "Security Framework", fileName: "Cybersecurity_Framework.pdf" },
      { name: "Threat Intelligence Systems", fileName: "Cybersecurity_Threats.pdf" },
    ],
  },
  {
    id: "PPP-ICT-007",
    project_name: "IoT Sensor Network",
    project_description: "Nationwide Internet of Things network infrastructure for smart cities.",
    investment_opportunity: "IoT solution providers and smart city technology partners needed.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "iot@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Planning",
    project_image: "/iot-network.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "IoT_Network_Overview.pdf" },
      { name: "Sensor Network Design", fileName: "IoT_Network_Design.pdf" },
      { name: "Smart Cities Applications", fileName: "IoT_SmartCities.pdf" },
      { name: "Deployment Strategy", fileName: "IoT_Deployment.pdf" },
    ],
  },
  {
    id: "PPP-ICT-008",
    project_name: "Fiber Optic Backbone Network",
    project_description: "High-capacity fiber optic backbone network connecting major cities.",
    investment_opportunity: "Fiber optic companies and infrastructure investors sought.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "fiber@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/fiber-optic.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "FiberOptic_Overview.pdf" },
      { name: "Route Maps & Design", fileName: "FiberOptic_Routes.pdf" },
      { name: "Technical Specifications", fileName: "FiberOptic_Technical.pdf" },
      { name: "Investment Opportunity", fileName: "FiberOptic_Investment.pdf" },
    ],
  },
  {
    id: "PPP-ICT-009",
    project_name: "Digital Skills Training Centers",
    project_description: "National network of digital skills and technology training centers.",
    investment_opportunity: "EdTech companies and training providers partnership available.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "training@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Planning",
    project_image: "/training-centers.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "Training_Overview.pdf" },
      { name: "Curriculum & Training Programs", fileName: "Training_Curriculum.pdf" },
      { name: "Center Setup & Operations", fileName: "Training_Operations.pdf" },
    ],
  },
  {
    id: "PPP-ICT-010",
    project_name: "Last-Mile Connectivity Initiative",
    project_description: "Connecting underserved and rural communities with high-speed internet.",
    investment_opportunity: "Rural broadband providers and community networks stakeholders needed.",
    location: "Nationwide",
    sector: "ICT",
    implementing_MGAs: "Nigerian Communications Commission (NCC)",
    project_contact: "lastmile@ncc.gov.ng",
    project_type: "Public-Private Partnership (PPP)",
    investment_type: "Equity and Debt",
    project_incentives: "Infrastructure tax credit scheme.",
    project_status: "Ongoing",
    project_image: "/rural-connectivity.jpg",
    isInterested: false,
    brochures: [
      { name: "Project Overview Brochure", fileName: "LastMile_Overview.pdf" },
      { name: "Rural Coverage Strategy", fileName: "LastMile_Coverage.pdf" },
      { name: "Community Engagement Plan", fileName: "LastMile_Community.pdf" },
      { name: "Financial Projections", fileName: "LastMile_Financial.pdf" },
    ],
  },
]

const myInterests = [
  {
    id: "PPP-ICT-001",
    project_name: "ICT Broadband Expansion Project",
    status: "Business Proposal Submitted",
    stage: 4,
    totalStages: 8,
    progress: 50,
    lastUpdate: "2024-01-25",
    nextAction: "Awaiting HoD Review",
    documents: {
      icNda: { status: "approved", date: "2024-01-15" },
      projectPlan: { status: "downloaded", date: "2024-01-18" },
      businessProposal: { status: "submitted", date: "2024-01-22" },
      kyc: { status: "pending", date: null },
      mou: { status: "pending", date: null },
    },
  },
]

const downloadFile = (filename: string, content: string) => {
  const element = document.createElement("a")
  const file = new Blob([content], { type: "text/plain" })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const handleDownload = (documentType: string, projectName: string, broschureName?: string) => {
  let content = ""
  let filename = ""

  switch (documentType) {
    case "ic":
      content = `INVESTMENT CERTIFICATE TEMPLATE
        
Project: ${projectName}
Date: ${new Date().toLocaleDateString()}

This is a template for the Investment Certificate document.
Please fill in all required fields and sign before uploading.

[Template content would be here...]`
      filename = `IC_Template_${projectName.replace(/\s+/g, "_")}.txt`
      break
    case "nda":
      content = `NON-DISCLOSURE AGREEMENT TEMPLATE
        
Project: ${projectName}
Date: ${new Date().toLocaleDateString()}

This is a template for the Non-Disclosure Agreement document.
Please review, fill in required information, and sign before uploading.

[NDA template content would be here...]`
      filename = `NDA_Template_${projectName.replace(/\s+/g, "_")}.txt`
      break
    case "project-plan":
      content = `PROJECT PLAN TEMPLATE
        
Project: ${projectName}
Date: ${new Date().toLocaleDateString()}

This is a template for the Project Plan document.
Please provide detailed project implementation strategy.

[Project plan template content would be here...]`
      filename = `Project_Plan_Template_${projectName.replace(/\s+/g, "_")}.txt`
      break
    case "kyc":
      content = `KYC FORM TEMPLATE
        
Project: ${projectName}
Date: ${new Date().toLocaleDateString()}

Know Your Customer (KYC) Form
Please provide all required documentation and information.

[KYC form template content would be here...]`
      filename = `KYC_Form_${projectName.replace(/\s+/g, "_")}.txt`
      break
    case "brochure":
      content = `${broschureName || "PROJECT BROCHURE"}
        
${projectName}
Date: ${new Date().toLocaleDateString()}

Comprehensive project information and investment details.

[Project brochure content would be here...]`
      filename = `${broschureName ? broschureName.replace(/\s+/g, "_") : projectName.replace(/\s+/g, "_")}_Brochure.txt`
      break
    default:
      content = "Document content"
      filename = "document.txt"
  }

  downloadFile(filename, content)
}

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("projects")
  const [projects, setProjects] = useState(availableProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [pendingInterestProject, setPendingInterestProject] = useState(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [interestsPage, setInterestsPage] = useState(1)
  const [selectedInterest, setSelectedInterest] = useState(null)
  const interestsPerPage = 3

  const projectsPerPage = 6

  const navigation = [
    { name: "Available Projects", id: "projects", icon: TrendingUp },
    { name: "My Interests", id: "interests", icon: Heart },
    { name: "Documents", id: "documents", icon: FileText },
    { name: "Settings", id: "settings", icon: User },
  ]

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.project_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.implementing_MGAs.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  const handleInterest = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    setPendingInterestProject(project)
    setShowInterestModal(true)
  }

  const confirmInterest = () => {
    if (pendingInterestProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === pendingInterestProject.id ? { ...project, isInterested: !project.isInterested } : project,
        ),
      )
      setShowInterestModal(false)
      setPendingInterestProject(null)
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
    }
  }

  const handleViewProject = (project) => {
    setSelectedProject(project)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        if (selectedProject) {
          return (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setSelectedProject(null)} className="bg-transparent">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="shadow-lg border-0">
                    <div className="relative">
                      <img
                        src={selectedProject.project_image || "/placeholder.svg?height=300&width=600&query=project"}
                        alt={selectedProject.project_name}
                        className="w-full h-72 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className={
                            selectedProject.project_status === "Ongoing"
                              ? "bg-green-100 text-green-800"
                              : selectedProject.project_status === "Planning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {selectedProject.project_status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-3xl mb-4">{selectedProject.project_name}</CardTitle>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {selectedProject.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {selectedProject.sector}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {selectedProject.project_type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Project Description */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">Project Overview</h3>
                        <p className="text-gray-600 leading-relaxed">{selectedProject.project_description}</p>
                      </div>

                      {/* Investment Opportunity */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">Investment Opportunity</h3>
                        <p className="text-gray-600 leading-relaxed">{selectedProject.investment_opportunity}</p>
                      </div>

                      {/* Project Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Project Type</p>
                          <p className="font-semibold text-gray-800">{selectedProject.project_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Investment Type</p>
                          <p className="font-semibold text-gray-800">{selectedProject.investment_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Sector</p>
                          <p className="font-semibold text-gray-800">{selectedProject.sector}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Project Status</p>
                          <Badge
                            className={
                              selectedProject.project_status === "Ongoing"
                                ? "bg-green-100 text-green-800"
                                : selectedProject.project_status === "Planning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {selectedProject.project_status}
                          </Badge>
                        </div>
                      </div>

                      {/* Project Incentives */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">Project Incentives</h3>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-purple-800">{selectedProject.project_incentives}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Investment Summary */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Investment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex justify-between pb-3 border-b">
                          <span className="text-gray-600">Investment Type</span>
                          <span className="font-medium">{selectedProject.investment_type}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b">
                          <span className="text-gray-600">Sector</span>
                          <span className="font-medium">{selectedProject.sector}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium">{selectedProject.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status</span>
                          <Badge
                            className={
                              selectedProject.project_status === "Ongoing"
                                ? "bg-green-100 text-green-800"
                                : selectedProject.project_status === "Planning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {selectedProject.project_status}
                          </Badge>
                        </div>
                      </div>

                      <div className="pt-4 border-t space-y-3">
                        <Button
                          className={`w-full ${
                            selectedProject.isInterested
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                          }`}
                          onClick={() => handleInterest(selectedProject.id)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${selectedProject.isInterested ? "fill-current" : ""}`} />
                          {selectedProject.isInterested ? "Interest Expressed" : "Express Interest"}
                        </Button>
                        {/* <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleDownload("brochure", selectedProject.project_name)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Brochure
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Project Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Implementing MGA</p>
                        <p className="font-medium text-gray-800">{selectedProject.implementing_MGAs}</p>
                      </div>
                      <div className="space-y-2 pt-3 border-t">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <a
                            href={`mailto:${selectedProject.project_contact}`}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {selectedProject.project_contact}
                          </a>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        Contact Project Manager
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Download Brochures */}
                  {selectedProject.brochures && selectedProject.brochures.length > 0 && (
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Download Brochures
                        </CardTitle>
                        <CardDescription>
                          {selectedProject.brochures.length} document{selectedProject.brochures.length > 1 ? "s" : ""}{" "}
                          available
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedProject.brochures.map((brochure, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start bg-transparent hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                            onClick={() => handleDownload("brochure", selectedProject.project_name, brochure.name)}
                          >
                            <Download className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-left flex-1 text-blue-900">{brochure.name}</span>
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Available PPP Projects</h1>
                  <p className="text-blue-100">Explore investment opportunities in public-private partnerships</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search projects by name, description, sector, location, or MGA..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 h-12"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Project Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onInterest={handleInterest}
                  onView={handleViewProject}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of{" "}
                      {filteredProjects.length} projects
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-transparent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={
                            currentPage === page
                              ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                              : "bg-transparent"
                          }
                        >
                          {page}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-transparent"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all available projects</p>
                  <Button variant="outline" onClick={() => setSearchTerm("")} className="bg-transparent">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case "interests":
        if (selectedInterest) {
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setSelectedInterest(null)} className="bg-transparent">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to My Interests
                </Button>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedInterest.project_name}</CardTitle>
                      <CardDescription>Project ID: {selectedInterest.id}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {selectedInterest.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>
                        Stage {selectedInterest.stage} of {selectedInterest.totalStages}
                      </span>
                    </div>
                    <Progress value={selectedInterest.progress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Last Update: {selectedInterest.lastUpdate}</span>
                      <span>{selectedInterest.nextAction}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Application Stages</h3>

                    {/* Stage 1: Interest Expressed */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 1 ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 1
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 1
                                  ? "bg-yellow-400 text-yellow-900"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 1 ? <Check className="w-4 h-4" /> : "1"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 1: Interest Expressed</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 1
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 1
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 1
                            ? "Approved"
                            : selectedInterest.stage === 1
                              ? "Pending"
                              : "Not Started"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Your interest in this project has been registered and is being reviewed by the PPP team.
                      </p>
                      {selectedInterest.stage === 1 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 text-sm">
                            ⏳ Your interest is currently under review. You will be notified once approved.
                          </p>
                        </div>
                      )}
                      {selectedInterest.stage > 1 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 text-sm">
                            ✅ Interest approved. Moving to document exchange phase.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 2: IC/NDA Exchange */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 2 ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 2
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 2
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 2 ? <Check className="w-4 h-4" /> : "2"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 2: IC/NDA Exchange</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 2
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 2
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 2
                            ? "Completed"
                            : selectedInterest.stage === 2
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Download, sign, and upload the Investment Certificate and Non-Disclosure Agreement documents.
                      </p>

                      {selectedInterest.stage >= 2 && (
                        <div className="space-y-4">
                          {/* Download Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">📥 Download Documents</h5>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">Investment Certificate Template</p>
                                    <p className="text-sm text-blue-600">IC_Template_v2.pdf</p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-200 bg-transparent"
                                  onClick={() => handleDownload("ic", selectedInterest.project_name)}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">Non-Disclosure Agreement</p>
                                    <p className="text-sm text-blue-600">NDA_Template_v2.pdf</p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-200 bg-transparent"
                                  onClick={() => handleDownload("nda", selectedInterest.project_name)}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Upload Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">Upload Signed Documents</h5>
                            <div className="space-y-4">
                              <FileUploadZone
                                title="Signed Investment Certificate"
                                description="Upload your completed and signed IC document"
                                acceptedTypes=".pdf,.doc,.docx"
                                maxSize="10MB"
                                status={
                                  selectedInterest.documents.icNda.status === "approved" ? "uploaded" : "required"
                                }
                              />
                              <FileUploadZone
                                title="Signed NDA"
                                description="Upload your completed and signed NDA document"
                                acceptedTypes=".pdf,.doc,.docx"
                                maxSize="10MB"
                                status={
                                  selectedInterest.documents.icNda.status === "approved" ? "uploaded" : "required"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stage 3: Project Plan Submission */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 3 ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 3
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 3
                                  ? "bg-purple-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 3 ? <Check className="w-4 h-4" /> : "3"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 3: Project Plan Submission</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 3
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 3
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 3
                            ? "Completed"
                            : selectedInterest.stage === 3
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Download the project plan template and submit your detailed project proposal.
                      </p>

                      {selectedInterest.stage >= 3 && (
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">Download Project Plan Template</h5>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-purple-600" />
                                <div>
                                  <p className="font-medium text-purple-800">Project Plan Template</p>
                                  <p className="text-sm text-purple-600">Project_Plan_Template_v3.pdf</p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-200 bg-transparent"
                                onClick={() => handleDownload("project-plan", selectedInterest.project_name)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">Upload Project Plan</h5>
                            <FileUploadZone
                              title="Completed Project Plan"
                              description="Upload your detailed project plan document"
                              acceptedTypes=".pdf,.doc,.docx"
                              maxSize="25MB"
                              status={
                                selectedInterest.documents.projectPlan.status === "submitted" ? "uploaded" : "required"
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stage 4: Business Proposal Submission */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 4 ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 4
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 4
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 4 ? <Check className="w-4 h-4" /> : "4"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 4: Business Proposal Submission</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 4
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 4
                                ? "bg-orange-100 text-orange-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 4
                            ? "Completed"
                            : selectedInterest.stage === 4
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Submit your comprehensive business proposal with financial projections and implementation
                        strategy.
                      </p>

                      {selectedInterest.stage >= 4 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 mb-3">Upload Business Proposal</h5>
                          <FileUploadZone
                            title="Business Proposal Document"
                            description="Upload your comprehensive business proposal"
                            acceptedTypes=".pdf,.doc,.docx"
                            maxSize="50MB"
                            status={
                              selectedInterest.documents.businessProposal.status === "submitted"
                                ? "uploaded"
                                : "required"
                            }
                          />
                        </div>
                      )}
                    </div>

                    {/* Stage 5: HoD Review */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 5 ? "border-indigo-200 bg-indigo-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 5
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 5
                                  ? "bg-indigo-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 5 ? <Check className="w-4 h-4" /> : "5"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 5: HoD Review</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 5
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 5
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 5
                            ? "Approved"
                            : selectedInterest.stage === 5
                              ? "Under Review"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        Your proposal is being reviewed by the Head of Department. No action required from your side at
                        this stage.
                      </p>
                      {selectedInterest.stage === 5 && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-4">
                          <p className="text-indigo-800 text-sm">
                            🔍 Your proposal is currently under review by the Head of Department. You will be notified
                            of the decision.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 6: PMC Generation */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 6 ? "border-teal-200 bg-teal-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 6
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 6
                                  ? "bg-teal-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 6 ? <Check className="w-4 h-4" /> : "6"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 6: PMC Generation</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 6
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 6
                                ? "bg-teal-100 text-teal-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 6
                            ? "Completed"
                            : selectedInterest.stage === 6
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        Project Model Canvas (PMC) is being generated by the PPP team based on your approved proposal.
                      </p>
                      {selectedInterest.stage === 6 && (
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
                          <p className="text-teal-800 text-sm">
                            📋 PMC document is being prepared. You will receive a copy once completed.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 7: MD/CEO Approval */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 7 ? "border-pink-200 bg-pink-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage > 7
                                ? "bg-green-500 text-white"
                                : selectedInterest.stage === 7
                                  ? "bg-pink-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage > 7 ? <Check className="w-4 h-4" /> : "7"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 7: MD/CEO Approval</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage > 7
                              ? "bg-green-100 text-green-800"
                              : selectedInterest.stage === 7
                                ? "bg-pink-100 text-pink-800"
                                : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage > 7
                            ? "Approved"
                            : selectedInterest.stage === 7
                              ? "Under Review"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        Final approval is being sought from the MD/CEO. This is the last review stage before project
                        approval.
                      </p>
                      {selectedInterest.stage === 7 && (
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mt-4">
                          <p className="text-pink-800 text-sm">
                            👑 Your proposal is with the MD/CEO for final approval. You will be notified of the
                            decision.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 8: Presentation & KYC */}
                    <div
                      className={`border rounded-lg p-6 ${selectedInterest.stage >= 8 ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage >= 8 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage >= 8 ? <Check className="w-4 h-4" /> : "8"}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">Stage 8: Presentation & KYC</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage >= 8 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage >= 8 ? "Active" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Final stage: Present your project to stakeholders and complete KYC documentation.
                      </p>

                      {selectedInterest.stage >= 8 && (
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">Presentation Scheduling</h5>
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
                            <h5 className="font-medium text-gray-800 mb-3">KYC Documentation</h5>
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
                                  onClick={() => handleDownload("kyc", selectedInterest.project_name)}
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
                                status={selectedInterest.documents.kyc.status === "submitted" ? "uploaded" : "required"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }

        // Pagination for interests
        const totalInterestPages = Math.ceil(myInterests.length / interestsPerPage)
        const interestStartIndex = (interestsPage - 1) * interestsPerPage
        const interestEndIndex = interestStartIndex + interestsPerPage
        const currentInterests = myInterests.slice(interestStartIndex, interestEndIndex)

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Interests</h1>
                <p className="text-gray-600">Track your expressed interests and application progress</p>
              </div>
            </div>

            {myInterests.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Interests Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Browse available projects and express your interest to get started
                  </p>
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                    onClick={() => setActiveTab("projects")}
                  >
                    Browse Projects
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Interest Cards */}
                {currentInterests.map((interest) => (
                  <Card key={interest.id} className="shadow-lg border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{interest.project_name}</CardTitle>
                          <CardDescription>Project ID: {interest.id}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {interest.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Progress Overview */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            Stage {interest.stage} of {interest.totalStages}
                          </span>
                        </div>
                        <Progress value={interest.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Last Update: {interest.lastUpdate}</span>
                          <span>{interest.nextAction}</span>
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <StatusTimeline currentStage={interest.stage} documents={interest.documents} />

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t">
                        <Button
                          size="sm"
                          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                          onClick={() => setSelectedInterest(interest)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination for Interests */}
                {totalInterestPages > 1 && (
                  <Card className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Showing {interestStartIndex + 1}-{Math.min(interestEndIndex, myInterests.length)} of{" "}
                          {myInterests.length} interests
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInterestsPage(interestsPage - 1)}
                            disabled={interestsPage === 1}
                            className="bg-transparent"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                          </Button>

                          {Array.from({ length: totalInterestPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={interestsPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setInterestsPage(page)}
                              className={
                                interestsPage === page
                                  ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                                  : "bg-transparent"
                              }
                            >
                              {page}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInterestsPage(interestsPage + 1)}
                            disabled={interestsPage === totalInterestPages}
                            className="bg-transparent"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Center</h1>
                <p className="text-gray-600">Manage all your project-related documents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Downloads */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Available Downloads</CardTitle>
                  <CardDescription>Documents ready for download</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Investment Certificate</p>
                        <p className="text-sm text-green-600">ICT Broadband Expansion</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 bg-transparent"
                      onClick={() => handleDownload("ic", "ICT Broadband Expansion")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">NDA Template</p>
                        <p className="text-sm text-green-600">ICT Broadband Expansion</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 bg-transparent"
                      onClick={() => handleDownload("nda", "ICT Broadband Expansion")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Required */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Upload Required</CardTitle>
                  <CardDescription>Documents you need to submit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUploadZone
                    title="Signed Investment Certificate"
                    description="Upload your signed IC document"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="10MB"
                    status="required"
                  />

                  <FileUploadZone
                    title="Signed NDA"
                    description="Upload your signed NDA document"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="10MB"
                    status="required"
                  />

                  <FileUploadZone
                    title="Business Proposal"
                    description="Upload your detailed business proposal"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="25MB"
                    status="optional"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">Manage your account information and preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">John Investor</h3>
                    <p className="text-sm text-gray-600">john.investor@email.com</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Change Photo
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Investor"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.investor@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about your projects via email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Project Updates</p>
                          <p className="text-sm text-gray-600">Get notified when project status changes</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <DashboardLayout
        userRole="investor"
        userName="John Investor"
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>

      {/* Interest Confirmation Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Interest</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowInterestModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {pendingInterestProject && (
              <div className="space-y-4">
                <p className="text-gray-600">Are you sure you want to express interest in:</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800">{pendingInterestProject.project_name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {pendingInterestProject.sector} • {pendingInterestProject.location}
                  </p>
                  <p className="text-sm text-gray-600">{pendingInterestProject.investment_type}</p>
                </div>
                <p className="text-sm text-gray-600">
                  By confirming, you'll be added to the project's interested investor list and will receive relevant
                  project documents and updates.
                </p>

                <div className="flex space-x-3 pt-4">
                  <Button
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                    onClick={confirmInterest}
                  >
                    Confirm Interest
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowInterestModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3">
          <Check className="w-5 h-5" />
          <div>
            <p className="font-medium">Interest Registered Successfully!</p>
            <p className="text-sm opacity-90">You will be contacted shortly with project details.</p>
          </div>
        </div>
      )}
    </>
  )
}
