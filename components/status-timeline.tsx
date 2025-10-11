"use client"

import { CheckCircle, Clock, Circle, Download, Upload } from "lucide-react"

interface StatusTimelineProps {
  currentStage: number
  documents: {
    icNda: { status: string; date: string | null }
    projectPlan: { status: string; date: string | null }
    businessProposal: { status: string; date: string | null }
    kyc: { status: string; date: string | null }
    mou: { status: string; date: string | null }
  }
}

const stages = [
  { name: "Interest Expressed", icon: CheckCircle },
  { name: "IC/NDA Exchange", icon: Download },
  { name: "Project Plan Received", icon: Download },
  { name: "Business Proposal Submitted", icon: Upload },
  { name: "HoD Review", icon: Clock },
  { name: "PMC Generation", icon: Upload },
  { name: "MD/CEO Approval", icon: CheckCircle },
  { name: "Presentation & KYC", icon: CheckCircle },
]

export function StatusTimeline({ currentStage, documents }: StatusTimelineProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800">Application Progress</h4>
      <div className="space-y-3">
        {stages.map((stage, index) => {
          const stageNumber = index + 1
          const isCompleted = stageNumber < currentStage
          const isCurrent = stageNumber === currentStage
          const isPending = stageNumber > currentStage

          const Icon = stage.icon

          return (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    isCurrent ? "text-yellow-800" : isCompleted ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  {stage.name}
                </p>
                {isCurrent && <p className="text-sm text-yellow-600">Currently in progress</p>}
                {isCompleted && <p className="text-sm text-green-600">Completed</p>}
              </div>
              {isCompleted && <div className="text-xs text-green-600">✓</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
