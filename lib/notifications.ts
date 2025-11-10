export interface SystemNotification {
  id: string
  title: string
  message: string
  type: "success" | "warning" | "error" | "info"
  timestamp: string
  icon: any
}

export const systemNotifications: SystemNotification[] = [
  {
    id: "NOTIF-001",
    title: "System Maintenance Scheduled",
    message: "System maintenance is scheduled for next Sunday from 2 AM to 4 AM PST.",
    timestamp: "2024-01-28 15:00:00",
    type: "info",
    icon: "Bell",
  },
  {
    id: "NOTIF-002",
    title: "New User Registration",
    message: "A new user has registered with the email address john.doe@example.com.",
    timestamp: "2024-01-28 14:30:00",
    type: "success",
    icon: "Users",
  },
  {
    id: "NOTIF-003",
    title: "High CPU Usage Detected",
    message: "CPU usage on server web-01 has exceeded 90% for the last 10 minutes.",
    timestamp: "2024-01-28 13:45:00",
    type: "warning",
    icon: "AlertCircle",
  },
  {
    id: "NOTIF-004",
    title: "Database Backup Completed",
    message: "Daily database backup completed successfully at 03:00 AM.",
    timestamp: "2024-01-28 03:05:00",
    type: "success",
    icon: "Database",
  },
  {
    id: "NOTIF-005",
    title: "Incoming Investment Proposal",
    message: "New investment proposal received for Project Alpha.",
    timestamp: "2024-01-28 02:30:00",
    type: "info",
    icon: "TrendingUp",
  },
  {
    id: "NOTIF-006",
    title: "Project Status Change",
    message: "Project 'Infrastructure Development' has been moved to 'Completed' status.",
    timestamp: "2024-01-27 18:20:00",
    type: "success",
    icon: "CheckCircle",
  },
  {
    id: "NOTIF-007",
    title: "Payment Processing Error",
    message: "Error encountered while processing payment for Invoice #2024-001.",
    timestamp: "2024-01-27 16:45:00",
    type: "error",
    icon: "XCircle",
  },
  {
    id: "NOTIF-008",
    title: "Email Queue Backup",
    message: "Email service queue has 45 pending messages. Processing initiated.",
    timestamp: "2024-01-27 15:30:00",
    type: "warning",
    icon: "Mail",
  },
  {
    id: "NOTIF-009",
    title: "New Investment Opportunity",
    message: "New PPP opportunity available: Water Infrastructure Project in Lagos.",
    timestamp: "2024-01-27 12:00:00",
    type: "info",
    icon: "Lightbulb",
  },
  {
    id: "NOTIF-010",
    title: "Report Generated",
    message: "Monthly performance report has been generated and is ready for download.",
    timestamp: "2024-01-27 10:15:00",
    type: "success",
    icon: "FileText",
  },
  {
    id: "NOTIF-011",
    title: "Security Alert",
    message: "Multiple failed login attempts detected from IP address 192.168.1.100.",
    timestamp: "2024-01-27 08:30:00",
    type: "error",
    icon: "Shield",
  },
  {
    id: "NOTIF-012",
    title: "Backup Completed",
    message: "System backup completed successfully. 2.5 GB of data backed up.",
    timestamp: "2024-01-26 23:45:00",
    type: "success",
    icon: "Save",
  },
]
