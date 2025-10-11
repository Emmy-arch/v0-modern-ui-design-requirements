"use client"

import type React from "react"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadZoneProps {
  title: string
  description: string
  acceptedTypes: string
  maxSize: string
  status: "required" | "optional" | "uploaded"
  onUpload?: (file: File) => void
}

export function FileUploadZone({ title, description, acceptedTypes, maxSize, status, onUpload }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file.name)
    onUpload?.(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "required":
        return "border-red-300 bg-red-50"
      case "uploaded":
        return "border-green-300 bg-green-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "required":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      case "uploaded":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      default:
        return <Upload className="w-6 h-6 text-gray-400" />
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragOver ? "border-blue-400 bg-blue-50" : getStatusColor()
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-3">
        {getStatusIcon()}

        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
          {uploadedFile && <p className="text-sm text-green-600 mt-1">Uploaded: {uploadedFile}</p>}
        </div>

        <div className="text-xs text-gray-500">
          <p>Accepted: {acceptedTypes}</p>
          <p>Max size: {maxSize}</p>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="bg-transparent">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          <input type="file" accept={acceptedTypes} onChange={handleFileSelect} className="hidden" />
        </div>
      </div>
    </div>
  )
}
