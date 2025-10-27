"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  CheckCircle,
  AlertTriangle,
  Send,
  Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectCard } from "@/components/project-card";
import { StatusTimeline } from "@/components/status-timeline";
import { FileUploadZone } from "@/components/file-upload-zone";

const availableProjects = [
  {
    id: "PPP-PROJ-001",
    title: "Smart City Infrastructure Development",
    description:
      "Comprehensive smart city infrastructure including IoT sensors, traffic management systems, and digital governance platforms for the metropolitan area.",
    fullDescription:
      "This project aims to transform the metropolitan area into a smart city by implementing cutting-edge IoT sensors, advanced traffic management systems, and comprehensive digital governance platforms. The initiative will enhance urban living through improved connectivity, efficient resource management, and seamless citizen services. Key components include smart lighting systems, environmental monitoring sensors, integrated traffic control, digital citizen portals, and data analytics platforms for informed decision-making.",
    sector: "Infrastructure",
    location: "Metropolitan Area",
    investmentRange: "$40M - $60M",
    duration: "36 months",
    expectedROI: "15-18%",
    riskLevel: "Medium",
    deadline: "2024-03-15",
    status: "Open for Interest",
    image:
      "/placeholder.svg?height=200&width=400&text=Smart+City+Infrastructure",
    highlights: [
      "Government backing",
      "Proven technology",
      "Long-term contract",
    ],
    keyFeatures: [
      "IoT sensor network across the city",
      "Integrated traffic management system",
      "Digital governance platform",
      "Smart lighting and energy management",
      "Environmental monitoring systems",
    ],
    technicalRequirements: [
      "Advanced IoT infrastructure",
      "Cloud-based data processing",
      "Mobile application development",
      "Integration with existing city systems",
      "Cybersecurity implementation",
    ],
    financialProjections: {
      year1: "$15M revenue",
      year2: "$25M revenue",
      year3: "$35M revenue",
      breakEven: "Month 18",
      totalROI: "18% over 5 years",
    },
    contactInfo: {
      projectManager: "Sarah Wilson",
      email: "s.wilson@ppp.gov",
      phone: "+1 (555) 123-4567",
    },
    isInterested: false,
  },
  {
    id: "PPP-PROJ-002",
    title: "Renewable Energy Grid Integration",
    description:
      "Large-scale solar and wind energy project with battery storage and smart grid integration across rural districts.",
    fullDescription:
      "A comprehensive renewable energy project focused on developing large-scale solar and wind farms with advanced battery storage systems and smart grid integration across rural districts. This initiative will significantly contribute to the region's clean energy goals while providing sustainable economic opportunities for rural communities. The project includes cutting-edge energy storage solutions, grid modernization, and community engagement programs.",
    sector: "Energy",
    location: "Rural Districts",
    investmentRange: "$60M - $80M",
    duration: "48 months",
    expectedROI: "12-15%",
    riskLevel: "Low",
    deadline: "2024-04-01",
    status: "Open for Interest",
    image: "/placeholder.svg?height=200&width=400&text=Renewable+Energy+Grid",
    highlights: [
      "Green energy focus",
      "Government incentives",
      "Stable returns",
    ],
    keyFeatures: [
      "2000MW solar farm installation",
      "500MW wind turbine network",
      "Advanced battery storage systems",
      "Smart grid integration",
      "Community benefit programs",
    ],
    technicalRequirements: [
      "Large-scale solar panel deployment",
      "Wind turbine installation and maintenance",
      "Battery storage technology",
      "Grid integration systems",
      "Environmental impact management",
    ],
    financialProjections: {
      year1: "$20M revenue",
      year2: "$35M revenue",
      year3: "$50M revenue",
      breakEven: "Month 24",
      totalROI: "15% over 7 years",
    },
    contactInfo: {
      projectManager: "Michael Green",
      email: "m.green@ppp.gov",
      phone: "+1 (555) 987-6543",
    },
    isInterested: true,
  },
  {
    id: "PPP-PROJ-003",
    title: "Digital Healthcare Platform",
    description:
      "Nationwide digital healthcare platform integrating telemedicine, patient records, and AI-powered diagnostics.",
    fullDescription:
      "Revolutionary nationwide digital healthcare platform that will transform healthcare delivery through integrated telemedicine services, comprehensive patient record management, and AI-powered diagnostic tools. This platform aims to improve healthcare accessibility, reduce costs, and enhance patient outcomes across the country. The system will connect healthcare providers, patients, and medical institutions through a unified digital ecosystem.",
    sector: "Healthcare",
    location: "National",
    investmentRange: "$25M - $35M",
    duration: "30 months",
    expectedROI: "20-25%",
    riskLevel: "High",
    deadline: "2024-02-28",
    status: "Open for Interest",
    image:
      "/placeholder.svg?height=200&width=400&text=Digital+Healthcare+Platform",
    highlights: ["High growth potential", "Tech innovation", "Social impact"],
    keyFeatures: [
      "Telemedicine consultation platform",
      "Electronic health records system",
      "AI-powered diagnostic tools",
      "Mobile health applications",
      "Healthcare provider network",
    ],
    technicalRequirements: [
      "HIPAA-compliant infrastructure",
      "AI/ML diagnostic algorithms",
      "Mobile app development",
      "Integration with existing healthcare systems",
      "Data security and privacy measures",
    ],
    financialProjections: {
      year1: "$8M revenue",
      year2: "$18M revenue",
      year3: "$28M revenue",
      breakEven: "Month 15",
      totalROI: "25% over 4 years",
    },
    contactInfo: {
      projectManager: "Dr. Lisa Chen",
      email: "l.chen@ppp.gov",
      phone: "+1 (555) 456-7890",
    },
    isInterested: false,
  },
  {
    id: "PPP-PROJ-004",
    title: "Educational Technology Infrastructure",
    description:
      "Comprehensive digital learning platform with virtual classrooms and AI-powered personalized learning systems.",
    fullDescription:
      "Next-generation educational technology infrastructure designed to revolutionize learning through virtual classrooms, AI-powered personalized learning systems, and comprehensive digital resource libraries. This project will enhance educational outcomes by providing adaptive learning experiences, real-time performance analytics, and seamless integration with existing educational institutions.",
    sector: "Education",
    location: "National",
    investmentRange: "$30M - $45M",
    duration: "42 months",
    expectedROI: "16-20%",
    riskLevel: "Medium",
    deadline: "2024-05-15",
    status: "Open for Interest",
    image: "/placeholder.svg?height=200&width=400&text=Educational+Technology",
    highlights: [
      "AI-powered learning",
      "Scalable platform",
      "Future-ready education",
    ],
    keyFeatures: [
      "Virtual classroom environments",
      "AI-powered personalized learning",
      "Digital resource libraries",
      "Performance analytics dashboard",
      "Teacher training programs",
    ],
    technicalRequirements: [
      "Cloud-based learning platform",
      "AI/ML personalization engines",
      "Video conferencing technology",
      "Content management systems",
      "Mobile learning applications",
    ],
    financialProjections: {
      year1: "$10M revenue",
      year2: "$22M revenue",
      year3: "$35M revenue",
      breakEven: "Month 20",
      totalROI: "20% over 5 years",
    },
    contactInfo: {
      projectManager: "Robert Taylor",
      email: "r.taylor@ppp.gov",
      phone: "+1 (555) 234-5678",
    },
    isInterested: false,
  },
  {
    id: "PPP-PROJ-005",
    title: "Smart Transportation Network",
    description:
      "Intelligent transportation system with autonomous vehicle infrastructure and smart traffic management.",
    fullDescription:
      "Advanced smart transportation network featuring autonomous vehicle infrastructure, intelligent traffic management systems, and integrated mobility solutions. This project will modernize urban transportation through connected vehicle technology, smart parking systems, and real-time traffic optimization, reducing congestion and improving air quality.",
    sector: "Transportation",
    location: "Metropolitan Area",
    investmentRange: "$55M - $70M",
    duration: "40 months",
    expectedROI: "14-17%",
    riskLevel: "High",
    deadline: "2024-06-30",
    status: "Open for Interest",
    image: "/placeholder.svg?height=200&width=400&text=Smart+Transportation",
    highlights: [
      "Autonomous vehicle ready",
      "Smart infrastructure",
      "Traffic optimization",
    ],
    keyFeatures: [
      "V2X communication systems",
      "Smart sensor networks",
      "Edge computing infrastructure",
      "5G connectivity",
      "AI traffic optimization",
    ],
    technicalRequirements: [
      "Autonomous vehicle infrastructure",
      "Smart traffic management",
      "Connected parking systems",
      "Real-time route optimization",
      "Mobility as a Service platform",
    ],
    financialProjections: {
      year1: "$18M revenue",
      year2: "$32M revenue",
      year3: "$45M revenue",
      breakEven: "Month 22",
      totalROI: "17% over 6 years",
    },
    contactInfo: {
      projectManager: "Jennifer Adams",
      email: "j.adams@ppp.gov",
      phone: "+1 (555) 345-6789",
    },
    isInterested: false,
  },
  {
    id: "PPP-PROJ-006",
    title: "Water Management System",
    description:
      "Smart water distribution and treatment system with IoT monitoring and predictive maintenance capabilities.",
    fullDescription:
      "Comprehensive smart water management system incorporating IoT-enabled distribution networks, advanced treatment facilities, and predictive maintenance capabilities. This project will optimize water usage, reduce waste, and ensure reliable water supply through real-time monitoring, leak detection, and quality management systems.",
    sector: "Infrastructure",
    location: "Regional",
    investmentRange: "$45M - $60M",
    duration: "38 months",
    expectedROI: "13-16%",
    riskLevel: "Low",
    deadline: "2024-07-20",
    status: "Open for Interest",
    image: "/placeholder.svg?height=200&width=400&text=Water+Management",
    highlights: [
      "Water conservation",
      "IoT monitoring",
      "Predictive maintenance",
    ],
    keyFeatures: [
      "Smart water distribution network",
      "Advanced treatment facilities",
      "IoT monitoring systems",
      "Predictive maintenance tools",
      "Water quality management",
    ],
    technicalRequirements: [
      "IoT sensor deployment",
      "Water treatment technology",
      "SCADA systems",
      "Data analytics platform",
      "Mobile monitoring applications",
    ],
    financialProjections: {
      year1: "$14M revenue",
      year2: "$28M revenue",
      year3: "$40M revenue",
      breakEven: "Month 19",
      totalROI: "16% over 5 years",
    },
    contactInfo: {
      projectManager: "David Martinez",
      email: "d.martinez@ppp.gov",
      phone: "+1 (555) 567-8901",
    },
    isInterested: false,
  },
];

const myInterests = [
  {
    id: "PPP-PROJ-002",
    title: "Renewable Energy Grid Integration",
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
  {
    id: "PPP-PROJ-001",
    title: "Smart City Infrastructure Development",
    status: "IC/NDA Exchange",
    stage: 2,
    totalStages: 8,
    progress: 25,
    lastUpdate: "2024-01-28",
    nextAction: "Upload signed IC/NDA documents",
    documents: {
      icNda: { status: "downloaded", date: "2024-01-28" },
      projectPlan: { status: "pending", date: null },
      businessProposal: { status: "pending", date: null },
      kyc: { status: "pending", date: null },
      mou: { status: "pending", date: null },
    },
  },
  {
    id: "PPP-PROJ-003",
    title: "Digital Healthcare Platform",
    status: "Interest Expressed",
    stage: 1,
    totalStages: 8,
    progress: 12,
    lastUpdate: "2024-01-30",
    nextAction: "Awaiting IC/NDA documents",
    documents: {
      icNda: { status: "pending", date: null },
      projectPlan: { status: "pending", date: null },
      businessProposal: { status: "pending", date: null },
      kyc: { status: "pending", date: null },
      mou: { status: "pending", date: null },
    },
  },
];

const downloadFile = (filename: string, content: string) => {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

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
    requiredDocuments: [
      "Updated_Risk_Assessment.pdf",
      "Regulatory_Compliance_Report.pdf",
    ],
    requestDate: "2024-01-20",
    status: "awaiting_investor",
    hodName: "Dr. Michael Chen",
  },
];

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState(availableProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [pendingInterestProject, setPendingInterestProject] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [interestsPage, setInterestsPage] = useState(1);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [selectedRefurbishment, setSelectedRefurbishment] = useState<
    string | null
  >(null);
  const [refurbishments, setRefurbishments] = useState(refurbishmentRequests);
  const [refurbPppComment, setRefurbPppComment] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const interestsPerPage = 3;

  const projectsPerPage = 6;

  const navigation = [
    { name: "Available Projects", id: "projects", icon: TrendingUp },
    { name: "My Interests", id: "interests", icon: Heart },
    { name: "Documents", id: "documents", icon: FileText },
    { name: "Query", id: "hod-requests", icon: AlertTriangle },
    { name: "Settings", id: "settings", icon: User },
  ];

  const availableDocuments = [
    {
      id: "doc-1",
      name: "Updated Financial Projections",
      label: "Updated_Financial_Projections.pdf",
    },
    { id: "doc-2", name: "CAPEX Breakdown", label: "CAPEX_Breakdown.pdf" },
    { id: "doc-3", name: "Risk Assessment", label: "Risk_Assessment.pdf" },
    { id: "doc-4", name: "Market Analysis", label: "Market_Analysis.pdf" },
    {
      id: "doc-5",
      name: "Regulatory Compliance Report",
      label: "Regulatory_Compliance_Report.pdf",
    },
    { id: "doc-6", name: "Operational Plan", label: "Operational_Plan.pdf" },
  ];

  const handleDownload = (documentType: string, projectTitle: string) => {
    let content = "";
    let filename = "";

    switch (documentType) {
      case "ic":
        content = `INVESTMENT CERTIFICATE TEMPLATE
        
Project: ${projectTitle}
Date: ${new Date().toLocaleDateString()}

This is a template for the Investment Certificate document.
Please fill in all required fields and sign before uploading.

[Template content would be here...]`;
        filename = `IC_Template_${projectTitle.replace(/\s+/g, "_")}.txt`;
        break;
      case "nda":
        content = `NON-DISCLOSURE AGREEMENT TEMPLATE
        
Project: ${projectTitle}
Date: ${new Date().toLocaleDateString()}

This is a template for the Non-Disclosure Agreement document.
Please review, fill in required information, and sign before uploading.

[NDA template content would be here...]`;
        filename = `NDA_Template_${projectTitle.replace(/\s+/g, "_")}.txt`;
        break;
      case "project-plan":
        content = `PROJECT PLAN TEMPLATE
        
Project: ${projectTitle}
Date: ${new Date().toLocaleDateString()}

This is a template for the Project Plan document.
Please provide detailed project implementation strategy.

[Project plan template content would be here...]`;
        filename = `Project_Plan_Template_${projectTitle.replace(
          /\s+/g,
          "_"
        )}.txt`;
        break;
      case "kyc":
        content = `KYC FORM TEMPLATE
        
Project: ${projectTitle}
Date: ${new Date().toLocaleDateString()}

Know Your Customer (KYC) Form
Please provide all required documentation and information.

[KYC form template content would be here...]`;
        filename = `KYC_Form_${projectTitle.replace(/\s+/g, "_")}.txt`;
        break;
      case "brochure":
        content = `PROJECT BROCHURE
        
${projectTitle}
Date: ${new Date().toLocaleDateString()}

Comprehensive project information and investment details.

[Project brochure content would be here...]`;
        filename = `${projectTitle.replace(/\s+/g, "_")}_Brochure.txt`;
        break;
      default:
        content = "Document content";
        filename = "document.txt";
    }

    downloadFile(filename, content);
  };

  const handleSendRefurbishment = (refurbId: string) => {
    if (!refurbPppComment || selectedDocuments.length === 0) {
      alert("Please add comments and select at least one document");
      return;
    }

    setRefurbishments((prev) =>
      prev.map((refurb) => {
        if (refurb.id === refurbId) {
          return {
            ...refurb,
            pppMemberComment: refurbPppComment,
            requiredDocuments: selectedDocuments.map(
              (docId) =>
                availableDocuments.find((d) => d.id === docId)?.label || ""
            ),
            status: "awaiting_investor",
          };
        }
        return refurb;
      })
    );

    setSelectedRefurbishment(null);
    setRefurbPppComment("");
    setSelectedDocuments([]);
  };

  const handleCloseRefurbishment = (refurbId: string) => {
    setRefurbishments((prev) =>
      prev.map((refurb) => {
        if (refurb.id === refurbId) {
          return { ...refurb, status: "closed" };
        }
        return refurb;
      })
    );

    setSelectedRefurbishment(null);
    setRefurbPppComment("");
    setSelectedDocuments([]);
  };

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId) ? prev.filter((d) => d !== docId) : [...prev, docId]
    );
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleInterest = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    setPendingInterestProject(project);
    setShowInterestModal(true);
  };

  const confirmInterest = () => {
    if (pendingInterestProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === pendingInterestProject.id
            ? { ...project, isInterested: !project.isInterested }
            : project
        )
      );
      setShowInterestModal(false);
      setPendingInterestProject(null);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        if (selectedProject) {
          return (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProject(null)}
                  className="bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="shadow-lg border-0">
                    <div className="relative">
                      <img
                        src={selectedProject.image || "/placeholder.svg"}
                        alt={selectedProject.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className={
                            selectedProject.riskLevel === "Low"
                              ? "bg-green-100 text-green-800"
                              : selectedProject.riskLevel === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {selectedProject.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl mb-2">
                            {selectedProject.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{selectedProject.sector}</span>
                            <span>•</span>
                            <span>{selectedProject.location}</span>
                            <span>•</span>
                            <span>Deadline: {selectedProject.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Project Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedProject.fullDescription}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Key Features
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedProject.keyFeatures.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Technical Requirements
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedProject.technicalRequirements.map(
                            (requirement, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Check className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-600">
                                  {requirement}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Financial Projections
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <div className="text-lg font-bold text-blue-800">
                              {selectedProject.financialProjections.year1}
                            </div>
                            <div className="text-sm text-blue-600">
                              Year 1 Revenue
                            </div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-lg font-bold text-green-800">
                              {selectedProject.financialProjections.year2}
                            </div>
                            <div className="text-sm text-green-600">
                              Year 2 Revenue
                            </div>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-4 text-center">
                            <div className="text-lg font-bold text-yellow-800">
                              {selectedProject.financialProjections.breakEven}
                            </div>
                            <div className="text-sm text-yellow-600">
                              Break Even
                            </div>
                          </div>
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
                      <CardTitle>Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Investment Range
                          </span>
                          <span className="font-medium">
                            {selectedProject.investmentRange}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected ROI</span>
                          <span className="font-medium">
                            {selectedProject.expectedROI}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">
                            {selectedProject.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Risk Level</span>
                          <span
                            className={`font-medium ${
                              selectedProject.riskLevel === "Low"
                                ? "text-green-600"
                                : selectedProject.riskLevel === "Medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {selectedProject.riskLevel}
                          </span>
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
                          <Heart
                            className={`w-4 h-4 mr-2 ${
                              selectedProject.isInterested ? "fill-current" : ""
                            }`}
                          />
                          {selectedProject.isInterested
                            ? "Interest Expressed"
                            : "I'm Interested"}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() =>
                            handleDownload("brochure", selectedProject.title)
                          }
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Brochure
                        </Button>
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
                        <p className="font-medium text-gray-800">
                          {selectedProject.contactInfo.projectManager}
                        </p>
                        <p className="text-sm text-gray-600">Project Manager</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Email: {selectedProject.contactInfo.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          Phone: {selectedProject.contactInfo.phone}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Contact Project Manager
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Key Highlights */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Key Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedProject.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-600">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Available PPP Projects
                  </h1>
                  <p className="text-blue-100">
                    Explore investment opportunities in public-private
                    partnerships
                  </p>
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
                    placeholder="Search projects by title, description, sector, or location..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
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
                      Showing {startIndex + 1}-
                      {Math.min(endIndex, filteredProjects.length)} of{" "}
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

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
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
                        )
                      )}

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
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Projects Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse all available
                    projects
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                    className="bg-transparent"
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "interests":
        if (selectedInterest) {
          return (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedInterest(null)}
                  className="bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to My Interests
                </Button>
              </div>

              {/* Interest Details */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedInterest.title}
                      </CardTitle>
                      <CardDescription>
                        Project ID: {selectedInterest.id}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {selectedInterest.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Progress Overview */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>
                        Stage {selectedInterest.stage} of{" "}
                        {selectedInterest.totalStages}
                      </span>
                    </div>
                    <Progress
                      value={selectedInterest.progress}
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Last Update: {selectedInterest.lastUpdate}</span>
                      <span>{selectedInterest.nextAction}</span>
                    </div>
                  </div>

                  {/* Detailed Stages */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Application Stages
                    </h3>

                    {/* Stage 1: Interest Expressed */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 1
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 1 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "1"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 1: Interest Expressed
                          </h4>
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
                      {selectedInterest.stage > 1 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 text-sm">
                            ✅ Interest approved. Moving to document exchange
                            phase.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 2: IC/NDA Exchange */}

                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 2
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 2 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "2"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 2: IC/NDA Exchange
                          </h4>
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
                        Download, sign, and upload the Investment Certificate
                        and Non-Disclosure Agreement documents.
                      </p>

                      {selectedInterest.stage >= 2 && (
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
                                  onClick={() =>
                                    handleDownload("ic", selectedInterest.title)
                                  }
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
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
                                  onClick={() =>
                                    handleDownload(
                                      "nda",
                                      selectedInterest.title
                                    )
                                  }
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Upload Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">
                              📤 Upload Signed Documents
                            </h5>
                            <div className="space-y-4">
                              <FileUploadZone
                                title="Signed Investment Certificate"
                                description="Upload your completed and signed IC document"
                                acceptedTypes=".pdf,.doc,.docx"
                                maxSize="10MB"
                                status={
                                  selectedInterest.documents.icNda.status ===
                                  "approved"
                                    ? "uploaded"
                                    : "required"
                                }
                              />
                              <FileUploadZone
                                title="Signed NDA"
                                description="Upload your completed and signed NDA document"
                                acceptedTypes=".pdf,.doc,.docx"
                                maxSize="10MB"
                                status={
                                  selectedInterest.documents.icNda.status ===
                                  "approved"
                                    ? "uploaded"
                                    : "required"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stage 3: Project Plan Submission */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 3
                          ? "border-purple-200 bg-purple-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 3 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "3"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 3: Project Plan Submission
                          </h4>
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
                        Download the project plan template and submit your
                        detailed project proposal.
                      </p>

                      {selectedInterest.stage >= 3 && (
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">
                              📥 Download Project Plan Template
                            </h5>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-purple-600" />
                                <div>
                                  <p className="font-medium text-purple-800">
                                    Project Plan Template
                                  </p>
                                  <p className="text-sm text-purple-600">
                                    Project_Plan_Template_v3.pdf
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-200 bg-transparent"
                                onClick={() =>
                                  handleDownload(
                                    "project-plan",
                                    selectedInterest.title
                                  )
                                }
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">
                              📤 Upload Project Plan
                            </h5>
                            <FileUploadZone
                              title="Completed Project Plan"
                              description="Upload your detailed project plan document"
                              acceptedTypes=".pdf,.doc,.docx"
                              maxSize="25MB"
                              status={
                                selectedInterest.documents.projectPlan
                                  .status === "submitted"
                                  ? "uploaded"
                                  : "required"
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stage 4: Business Proposal Submission */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 4
                          ? "border-orange-200 bg-orange-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 4 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "4"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 4: Business Proposal Submission
                          </h4>
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
                        Submit your comprehensive business proposal with
                        financial projections and implementation strategy.
                      </p>

                      {selectedInterest.stage >= 4 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 mb-3">
                            📤 Upload Business Proposal
                          </h5>
                          <FileUploadZone
                            title="Business Proposal Document"
                            description="Upload your comprehensive business proposal"
                            acceptedTypes=".pdf,.doc,.docx"
                            maxSize="50MB"
                            status={
                              selectedInterest.documents.businessProposal
                                .status === "submitted"
                                ? "uploaded"
                                : "required"
                            }
                          />
                        </div>
                      )}
                    </div>

                    {/* Stage 5: HoD Review */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 5
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 5 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "5"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 5: HoD Review
                          </h4>
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
                        Your proposal is being reviewed by the Head of
                        Department. No action required from your side at this
                        stage.
                      </p>
                      {selectedInterest.stage === 5 && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-4">
                          <p className="text-indigo-800 text-sm">
                            🔍 Your proposal is currently under review by the
                            Head of Department. You will be notified of the
                            decision.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 6: PMC Generation */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 6
                          ? "border-teal-200 bg-teal-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 6 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "6"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 6: PMC Generation
                          </h4>
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
                        Project Model Canvas (PMC) is being generated by the PPP
                        team based on your approved proposal.
                      </p>
                      {selectedInterest.stage === 6 && (
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
                          <p className="text-teal-800 text-sm">
                            📋 PMC document is being prepared. You will receive
                            a copy once completed.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 7: MD/CEO Approval */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 7
                          ? "border-pink-200 bg-pink-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
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
                            {selectedInterest.stage > 7 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "7"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 7: MD/CEO Approval
                          </h4>
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
                        Final approval is being sought from the MD/CEO. This is
                        the last review stage before project approval.
                      </p>
                      {selectedInterest.stage === 7 && (
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mt-4">
                          <p className="text-pink-800 text-sm">
                            👑 Your proposal is with the MD/CEO for final
                            approval. You will be notified of the decision.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Stage 8: Presentation & KYC */}
                    <div
                      className={`border rounded-lg p-6 ${
                        selectedInterest.stage >= 8
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedInterest.stage >= 8
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {selectedInterest.stage >= 8 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              "8"
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            Stage 8: Presentation & KYC
                          </h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            selectedInterest.stage >= 8
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {selectedInterest.stage >= 8 ? "Active" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Final stage: Present your project to stakeholders and
                        complete KYC documentation.
                      </p>

                      {selectedInterest.stage >= 8 && (
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">
                              🎯 Presentation Scheduling
                            </h5>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <p className="text-green-800 text-sm mb-3">
                                📅 Your presentation has been scheduled:
                              </p>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Date:</strong> February 15, 2024
                                </p>
                                <p>
                                  <strong>Time:</strong> 2:00 PM - 3:30 PM
                                </p>
                                <p>
                                  <strong>Location:</strong> Executive
                                  Conference Room
                                </p>
                                <p>
                                  <strong>Attendees:</strong> MD/CEO, HoD, PPP
                                  Team
                                </p>
                              </div>
                              <Button
                                size="sm"
                                className="mt-3 bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Add to Calendar
                              </Button>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-800 mb-3">
                              📋 KYC Documentation
                            </h5>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-green-600" />
                                  <div>
                                    <p className="font-medium text-green-800">
                                      KYC Form Template
                                    </p>
                                    <p className="text-sm text-green-600">
                                      KYC_Form_v1.pdf
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-200 bg-transparent"
                                  onClick={() =>
                                    handleDownload(
                                      "kyc",
                                      selectedInterest.title
                                    )
                                  }
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
                                status={
                                  selectedInterest.documents.kyc.status ===
                                  "submitted"
                                    ? "uploaded"
                                    : "required"
                                }
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
          );
        }

        // Pagination for interests
        const totalInterestPages = Math.ceil(
          myInterests.length / interestsPerPage
        );
        const interestStartIndex = (interestsPage - 1) * interestsPerPage;
        const interestEndIndex = interestStartIndex + interestsPerPage;
        const currentInterests = myInterests.slice(
          interestStartIndex,
          interestEndIndex
        );

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  My Interests
                </h1>
                <p className="text-gray-600">
                  Track your expressed interests and application progress
                </p>
              </div>
            </div>

            {myInterests.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Interests Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Browse available projects and express your interest to get
                    started
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
                          <CardTitle className="text-xl">
                            {interest.title}
                          </CardTitle>
                          <CardDescription>
                            Project ID: {interest.id}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
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
                      <StatusTimeline
                        currentStage={interest.stage}
                        documents={interest.documents}
                      />

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
                          Showing {interestStartIndex + 1}-
                          {Math.min(interestEndIndex, myInterests.length)} of{" "}
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

                          {Array.from(
                            { length: totalInterestPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={
                                interestsPage === page ? "default" : "outline"
                              }
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
        );

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Document Center
                </h1>
                <p className="text-gray-600">
                  Manage all your project-related documents
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Downloads */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Available Downloads</CardTitle>
                  <CardDescription>
                    Documents ready for download
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">
                          Investment Certificate
                        </p>
                        <p className="text-sm text-green-600">
                          Renewable Energy Project
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 bg-transparent"
                      onClick={() =>
                        handleDownload("ic", "Renewable Energy Project")
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">
                          NDA Template
                        </p>
                        <p className="text-sm text-green-600">
                          Renewable Energy Project
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 bg-transparent"
                      onClick={() =>
                        handleDownload("nda", "Renewable Energy Project")
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">
                          Project Plan Template
                        </p>
                        <p className="text-sm text-blue-600">
                          Renewable Energy Project
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 bg-transparent"
                      onClick={() =>
                        handleDownload(
                          "project-plan",
                          "Renewable Energy Project"
                        )
                      }
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
                  <CardDescription>
                    Documents you need to submit
                  </CardDescription>
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
        );

      case "hod-requests":
        if (selectedRefurbishment) {
          const refurb = refurbishments.find(
            (r) => r.id === selectedRefurbishment
          );
          if (!refurb) {
            setSelectedRefurbishment(null);
            return null;
          }

          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRefurbishment(null)}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Requests
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Refurbishment Details
                    </h2>
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
                      <div className="text-sm text-gray-600 mb-1">
                        Request Date
                      </div>
                      <div className="font-medium">{refurb.requestDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* HoD Comment */}
              <Card className="shadow-lg border-0 border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-red-800">
                    PPP Member Comment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-gray-800">{refurb.hodComment}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents Selection */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Required Documents for Investor</CardTitle>
                  <CardDescription>
                    Re-upload these documents to address the feedback
                  </CardDescription>
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

              {/* Action Buttons */}
              {refurb.status !== "closed" && (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleSendRefurbishment(refurb.id)}
                        disabled={
                          !refurbPppComment || selectedDocuments.length === 0
                        }
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Refurbishment Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Status */}
              {refurb.pppMemberComment && (
                <Card className="shadow-lg border-0 border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      Current Response Sent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Your Response:
                      </p>
                      <p className="text-gray-800">{refurb.pppMemberComment}</p>
                    </div>
                    {refurb.requiredDocuments.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Required Documents:
                        </p>
                        <div className="space-y-2">
                          {refurb.requiredDocuments.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-gray-700"
                            >
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
          );
        }

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  HoD Refurbishment Requests
                </h1>
                <p className="text-gray-600">
                  Manage refurbishment requests from the Head of Department
                </p>
              </div>
            </div>

            {refurbishments.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-gray-600">
                    All proposals are currently progressing normally
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {refurbishments.map((refurb) => (
                  <Card
                    key={refurb.id}
                    className="shadow-lg border-0 border-l-4 border-l-yellow-500"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {refurb.projectTitle}
                          </CardTitle>
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRefurbishment(refurb.id)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View More
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {refurb.hodComment}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">
                  Manage your account information and preferences
                </p>
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
                    <h3 className="font-semibold text-gray-800">
                      John Investor
                    </h3>
                    <p className="text-sm text-gray-600">
                      john.investor@email.com
                    </p>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Investor"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john.investor@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Investment Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Sectors
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select sectors</option>
                          <option value="infrastructure">Infrastructure</option>
                          <option value="energy">Energy</option>
                          <option value="healthcare">Healthcare</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Investment Range
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select range</option>
                          <option value="0-25">$0M - $25M</option>
                          <option value="25-50">$25M - $50M</option>
                          <option value="50-100">$50M - $100M</option>
                        </select>
                      </div>
                    </div>
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
                          <p className="font-medium text-gray-800">
                            Email Notifications
                          </p>
                          <p className="text-sm text-gray-600">
                            Receive updates about your projects via email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">
                            SMS Notifications
                          </p>
                          <p className="text-sm text-gray-600">
                            Receive urgent updates via SMS
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">
                            Project Updates
                          </p>
                          <p className="text-sm text-gray-600">
                            Get notified when project status changes
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Interest
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInterestModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {pendingInterestProject && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to express interest in:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800">
                    {pendingInterestProject.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {pendingInterestProject.sector} •{" "}
                    {pendingInterestProject.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Investment: {pendingInterestProject.investmentRange}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  By confirming, you'll be added to the project's interested
                  investor list and will receive relevant project documents and
                  updates.
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
            <p className="text-sm opacity-90">
              You will be contacted shortly with project details.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
