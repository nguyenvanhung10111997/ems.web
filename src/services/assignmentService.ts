/**
 * Assignment Service
 */

import apiService from './apiService'
import type { Assignment } from '../types'
import { mockAssignments, simulateApiCall, findById } from '../utils/mockData'

class AssignmentService {
  /**
   * Get all assignments
   */
  async getAssignments(): Promise<Assignment[]> {
    return apiService.get<Assignment[]>(
      '/assignments',
      {
        mockData: async () => simulateApiCall(mockAssignments),
      }
    )
  }

  /**
   * Get assignment by ID
   */
  async getAssignmentById(id: string): Promise<Assignment> {
    return apiService.get<Assignment>(
      `/assignments/${id}`,
      {
        mockData: async () => {
          const assignment = findById(mockAssignments, id)
          if (!assignment) {
            throw new Error('Assignment not found')
          }
          return simulateApiCall(assignment)
        },
      }
    )
  }

  /**
   * Get assignments by course ID
   */
  async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
    return apiService.get<Assignment[]>(
      `/assignments?courseId=${courseId}`,
      {
        mockData: async () => {
          const filtered = mockAssignments.filter((a) => a.courseId === courseId)
          return simulateApiCall(filtered)
        },
      }
    )
  }

  /**
   * Get assignments by status
   */
  async getAssignmentsByStatus(status: Assignment['status']): Promise<Assignment[]> {
    return apiService.get<Assignment[]>(
      `/assignments?status=${status}`,
      {
        mockData: async () => {
          const filtered = mockAssignments.filter((a) => a.status === status)
          return simulateApiCall(filtered)
        },
      }
    )
  }

  /**
   * Create new assignment
   */
  async createAssignment(data: Omit<Assignment, 'id'>): Promise<Assignment> {
    return apiService.post<Assignment>(
      '/assignments',
      data,
      {
        mockData: async () => {
          const newAssignment: Assignment = {
            ...data,
            id: String(mockAssignments.length + 1),
          }
          return simulateApiCall(newAssignment)
        },
      }
    )
  }

  /**
   * Update assignment
   */
  async updateAssignment(id: string, updates: Partial<Assignment>): Promise<Assignment> {
    return apiService.patch<Assignment>(
      `/assignments/${id}`,
      updates,
      {
        mockData: async () => {
          const assignment = findById(mockAssignments, id)
          if (!assignment) {
            throw new Error('Assignment not found')
          }
          const updatedAssignment = { ...assignment, ...updates }
          return simulateApiCall(updatedAssignment)
        },
      }
    )
  }

  /**
   * Delete assignment
   */
  async deleteAssignment(id: string): Promise<void> {
    return apiService.delete<void>(
      `/assignments/${id}`,
      {
        mockData: async () => {
          const assignment = findById(mockAssignments, id)
          if (!assignment) {
            throw new Error('Assignment not found')
          }
          return simulateApiCall(undefined as any)
        },
      }
    )
  }

  /**
   * Submit assignment
   */
  async submitAssignment(id: string, submission: { file?: File; text?: string }): Promise<Assignment> {
    return apiService.post<Assignment>(
      `/assignments/${id}/submit`,
      submission,
      {
        mockData: async () => {
          const assignment = findById(mockAssignments, id)
          if (!assignment) {
            throw new Error('Assignment not found')
          }
          const updatedAssignment = {
            ...assignment,
            status: 'submitted' as const,
          }
          return simulateApiCall(updatedAssignment)
        },
      }
    )
  }

  /**
   * Grade assignment
   */
  async gradeAssignment(id: string, score: number): Promise<Assignment> {
    return apiService.post<Assignment>(
      `/assignments/${id}/grade`,
      { score },
      {
        mockData: async () => {
          const assignment = findById(mockAssignments, id)
          if (!assignment) {
            throw new Error('Assignment not found')
          }
          const updatedAssignment = {
            ...assignment,
            status: 'graded' as const,
            score,
          }
          return simulateApiCall(updatedAssignment)
        },
      }
    )
  }
}

export default new AssignmentService()
