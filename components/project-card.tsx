"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, DollarSign, Calendar, TrendingUp, Eye } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  sector: string
  location: string
  investmentRange: string
  duration: string
  expectedROI: string
  riskLevel: string
  deadline: string
  status: string
  image: string
  highlights: string[]
  isInterested: boolean
}

interface ProjectCardProps {
  project: Project
  onInterest: (projectId: string) => void
  onView: (project: Project) => void
}

export function ProjectCard({ project, onInterest, onView }: ProjectCardProps) {
  return (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className={
              project.riskLevel === "Low"
                ? "bg-green-100 text-green-800"
                : project.riskLevel === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }
          >
            {project.riskLevel} Risk
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{project.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{project.investmentRange}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{project.expectedROI} ROI</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{project.duration}</span>
          </div>
        </div>

        {/* Sector and Deadline */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {project.sector}
          </Badge>
          <span className="text-xs text-gray-500">Deadline: {project.deadline}</span>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Key Highlights:</p>
          <div className="flex flex-wrap gap-1">
            {project.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t">
          <Button
            className={`flex-1 ${
              project.isInterested
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
            }`}
            onClick={() => onInterest(project.id)}
          >
            <Heart className={`w-4 h-4 mr-2 ${project.isInterested ? "fill-current" : ""}`} />
            {project.isInterested ? "Interest Expressed" : "I'm Interested"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onView(project)} className="bg-transparent">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
