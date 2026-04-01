/**
 * Mock data for all features
 * Used when VITE_USE_MOCK_DATA is true
 */

import type { Course, Assignment, Resource, User, Notification } from '../types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@ielts.com',
    name: 'John Student',
    role: 'student',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    email: 'teacher@ielts.com',
    name: 'Jane Teacher',
    role: 'teacher',
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: '3',
    email: 'student2@ielts.com',
    name: 'Sarah Learner',
    role: 'student',
    createdAt: new Date('2024-01-20').toISOString(),
  },
]

// Mock Courses - IELTS focused
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'IELTS 6.0 Preparation',
    description: 'Comprehensive IELTS preparation course targeting band score 6.0. Covers all four skills: Listening, Reading, Writing, and Speaking.',
    instructor: 'Jane Teacher',
    enrolledStudents: 45,
    progress: 65,
    status: 'active',
    thumbnail: undefined,
  },
  {
    id: '2',
    title: 'IELTS 5.0 Foundation',
    description: 'Foundation course for IELTS band 5.0. Perfect for beginners starting their IELTS journey with basic English skills.',
    instructor: 'Jane Teacher',
    enrolledStudents: 120,
    progress: 30,
    status: 'active',
    thumbnail: undefined,
  },
  {
    id: '3',
    title: 'IELTS 7.0 Advanced',
    description: 'Advanced IELTS preparation targeting band 7.0 and above. Intensive practice for high-scoring candidates.',
    instructor: 'Jane Teacher',
    enrolledStudents: 78,
    progress: 100,
    status: 'completed',
    thumbnail: undefined,
  },
  {
    id: '4',
    title: 'IELTS 6.5 Intermediate',
    description: 'Intermediate IELTS course for band 6.5. Builds on foundation skills with advanced techniques and strategies.',
    instructor: 'Jane Teacher',
    enrolledStudents: 92,
    progress: 0,
    status: 'upcoming',
    thumbnail: undefined,
  },
  {
    id: '5',
    title: 'IELTS Speaking Mastery',
    description: 'Focused course on IELTS Speaking test. Practice fluency, pronunciation, and vocabulary for all three parts of the speaking test.',
    instructor: 'Jane Teacher',
    enrolledStudents: 56,
    progress: 45,
    status: 'active',
    thumbnail: undefined,
  },
]

// Mock Assignments - IELTS focused
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'IELTS Writing Task 1: Academic',
    courseId: '1',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    status: 'pending',
    score: undefined,
  },
  {
    id: '2',
    title: 'IELTS Listening Practice Test',
    courseId: '2',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    status: 'pending',
    score: undefined,
  },
  {
    id: '3',
    title: 'IELTS Reading Comprehension',
    courseId: '1',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (overdue)
    status: 'pending',
    score: undefined,
  },
  {
    id: '4',
    title: 'IELTS Speaking Practice: Part 2',
    courseId: '5',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    status: 'submitted',
    score: undefined,
  },
  {
    id: '5',
    title: 'IELTS Writing Task 2: Opinion Essay',
    courseId: '1',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 'graded',
    score: 85,
  },
]

// Mock Resources - IELTS focused
export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'IELTS Vocabulary List: Academic Words',
    category: 'Vocabulary',
    type: 'document',
    size: '2.5 MB',
    downloads: 145,
  },
  {
    id: '2',
    title: 'IELTS Speaking Tips and Strategies',
    category: 'Speaking',
    type: 'video',
    duration: '45:30',
    downloads: 89,
  },
  {
    id: '3',
    title: 'IELTS Listening Practice Tests',
    category: 'Listening',
    type: 'audio',
    duration: '1:30:00',
    downloads: 203,
  },
  {
    id: '4',
    title: 'IELTS Writing Task 1 Templates',
    category: 'Writing',
    type: 'document',
    size: '1.2 MB',
    downloads: 312,
  },
  {
    id: '5',
    title: 'IELTS Reading Techniques',
    category: 'Reading',
    type: 'video',
    duration: '25:00',
    downloads: 167,
  },
]

// Mock Notifications - IELTS focused
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment Available',
    message: 'IELTS Writing Task 1: Academic has been assigned. Due in 2 days.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: '2',
    title: 'Course Update',
    message: 'IELTS 6.0 Preparation course has been updated with new materials.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: '3',
    title: 'Assignment Graded',
    message: 'Your IELTS Writing Task 2: Opinion Essay has been graded. Score: 85/100',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'Reminder',
    message: 'IELTS Reading Comprehension is due tomorrow. Please submit on time.',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
]

// Helper function to simulate random success/failure
export const simulateApiCall = <T>(data: T, successRate: number = 0.95): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < successRate) {
        resolve(data)
      } else {
        reject(new Error('Simulated API error'))
      }
    }, 500 + Math.random() * 1000) // Random delay between 500-1500ms
  })
}

// Helper function to find item by ID
export const findById = <T extends { id: string }>(items: T[], id: string): T | undefined => {
  return items.find((item) => item.id === id)
}

// Helper function to filter items
export const filterItems = <T>(items: T[], predicate: (item: T) => boolean): T[] => {
  return items.filter(predicate)
}
