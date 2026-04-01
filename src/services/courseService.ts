/**
 * Course Service
 */

import apiService from './apiService'
import type { Course } from '../types'
import { mockCourses, simulateApiCall, findById } from '../utils/mockData'

class CourseService {
  /**
   * Get all courses
   */
  async getCourses(): Promise<Course[]> {
    return apiService.get<Course[]>(
      '/courses',
      {
        mockData: async () => simulateApiCall(mockCourses),
      }
    )
  }

  /**
   * Get course by ID
   */
  async getCourseById(id: string): Promise<Course> {
    return apiService.get<Course>(
      `/courses/${id}`,
      {
        mockData: async () => {
          const course = findById(mockCourses, id)
          if (!course) {
            throw new Error('Course not found')
          }
          return simulateApiCall(course)
        },
      }
    )
  }

  /**
   * Create new course
   */
  async createCourse(data: Omit<Course, 'id'>): Promise<Course> {
    return apiService.post<Course>(
      '/courses',
      data,
      {
        mockData: async () => {
          const newCourse: Course = {
            ...data,
            id: String(mockCourses.length + 1),
          }
          return simulateApiCall(newCourse)
        },
      }
    )
  }

  /**
   * Update course
   */
  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    return apiService.patch<Course>(
      `/courses/${id}`,
      updates,
      {
        mockData: async () => {
          const course = findById(mockCourses, id)
          if (!course) {
            throw new Error('Course not found')
          }
          const updatedCourse = { ...course, ...updates }
          return simulateApiCall(updatedCourse)
        },
      }
    )
  }

  /**
   * Delete course
   */
  async deleteCourse(id: string): Promise<void> {
    return apiService.delete<void>(
      `/courses/${id}`,
      {
        mockData: async () => {
          const course = findById(mockCourses, id)
          if (!course) {
            throw new Error('Course not found')
          }
          return simulateApiCall(undefined as any)
        },
      }
    )
  }

  /**
   * Enroll in course
   */
  async enrollInCourse(courseId: string): Promise<{ success: boolean; course: Course }> {
    return apiService.post<{ success: boolean; course: Course }>(
      `/courses/${courseId}/enroll`,
      {},
      {
        mockData: async () => {
          const course = findById(mockCourses, courseId)
          if (!course) {
            throw new Error('Course not found')
          }
          const updatedCourse = {
            ...course,
            enrolledStudents: (course.enrolledStudents || 0) + 1,
            status: 'active' as const,
          }
          return simulateApiCall({ success: true, course: updatedCourse })
        },
      }
    )
  }

  /**
   * Get courses by status
   */
  async getCoursesByStatus(status: Course['status']): Promise<Course[]> {
    return apiService.get<Course[]>(
      `/courses?status=${status}`,
      {
        mockData: async () => {
          const filtered = mockCourses.filter((c) => c.status === status)
          return simulateApiCall(filtered)
        },
      }
    )
  }

  /**
   * Search courses
   */
  async searchCourses(query: string): Promise<Course[]> {
    return apiService.get<Course[]>(
      `/courses/search?q=${encodeURIComponent(query)}`,
      {
        mockData: async () => {
          const filtered = mockCourses.filter(
            (c) =>
              c.title.toLowerCase().includes(query.toLowerCase()) ||
              c.description.toLowerCase().includes(query.toLowerCase())
          )
          return simulateApiCall(filtered)
        },
      }
    )
  }
}

export default new CourseService()
