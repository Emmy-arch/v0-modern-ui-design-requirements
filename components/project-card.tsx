"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, DollarSign, Eye, Building2, Mail } from "lucide-react"

interface Project {
  id: string
  project_name: string
  project_description: string
  sector: string
  location: string
  investment_type: string
  project_status: string
  project_image: string
  implementing_MGAs: string
  investment_opportunity: string
  project_contact: string
  isInterested?: boolean
}

interface ProjectCardProps {
  project: Project
  onInterest: (projectId: string) => void
  onView: (project: Project) => void
}

export function ProjectCard({ project, onInterest, onView }: ProjectCardProps) {
  return (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <img
          src={project.project_image || "/placeholder.svg?height=200&width=400&query=project"}
          alt={project.project_name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className={
              project.project_status === "Ongoing"
                ? "bg-green-100 text-green-800"
                : project.project_status === "Planning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
            }
          >
            {project.project_status}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{project.project_name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">{project.project_description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 truncate">{project.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 truncate">{project.sector}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 truncate">{project.investment_type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 truncate text-xs">{project.project_contact}</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex-shrink-0">
            {project.sector}
          </Badge>
          <div className="flex-1 text-right">
            <p className="text-xs text-gray-500 line-clamp-1">{project.investment_opportunity}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Implementing MGAs:</p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
              {project.implementing_MGAs}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t mt-auto">
          <Button
            className={`flex-1 ${
              project.isInterested
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
            }`}
            onClick={() => onInterest(project.id)}
          >
            <Heart className={`w-4 h-4 mr-2 ${project.isInterested ? "fill-current" : ""}`} />
            {project.isInterested ? "Interested" : "Interest"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onView(project)} className="bg-transparent">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
