export type UserRole = 'teacher' | 'student'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail?: string
  enrolledStudents: number
  progress?: number
  status: 'active' | 'completed' | 'upcoming'
}

export interface Assignment {
  id: string
  title: string
  courseId: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
  score?: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  link?: string
}

export interface NotificationSettings {
  enabled: boolean
  email: boolean
  sms: boolean
  push: boolean
  hub: boolean
  assignmentDeadline: boolean
  newCourse: boolean
  gradePosted: boolean
  announcement: boolean
  messageReceived: boolean
}

export interface DashboardStats {
  totalCourses: number
  totalStudents?: number
  pendingAssignments: number
  completedCourses: number
  averageScore?: number
  studentsEnrolled?: number // For teachers
}
