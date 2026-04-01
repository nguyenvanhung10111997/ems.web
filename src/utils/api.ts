/**
 * Legacy API utility functions
 * @deprecated Use feature-specific services instead (authService, courseService, etc.)
 * This file is kept for backward compatibility
 */

import useLoadingStore from '../store/useLoadingStore'
import courseService from '../services/courseService'
import assignmentService from '../services/assignmentService'
import resourceService from '../services/resourceService'

// Inline loading service to avoid module resolution issues
const loadingService = {
  show: (message?: string) => {
    const store = useLoadingStore.getState()
    store.startLoading(message)
  },
  hide: () => {
    const store = useLoadingStore.getState()
    store.stopLoading()
  },
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Wrapper for API calls that automatically manages loading state
 * @deprecated Use apiService from '../services/apiService' instead
 */
export async function apiCall<T>(
  fn: () => Promise<T>,
  loadingMessage?: string
): Promise<T> {
  loadingService.show(loadingMessage)
  try {
    const result = await fn()
    return result
  } finally {
    loadingService.hide()
  }
}

/**
 * Pre-built API functions using loadingService
 * @deprecated Use feature-specific services instead
 */
export const api = {
  // Simulate fetching courses
  async fetchCourses() {
    loadingService.show('Loading courses...')
    try {
      return await courseService.getCourses()
    } finally {
      loadingService.hide()
    }
  },

  // Simulate fetching assignments
  async fetchAssignments() {
    loadingService.show('Loading assignments...')
    try {
      return await assignmentService.getAssignments()
    } finally {
      loadingService.hide()
    }
  },

  // Simulate submitting assignment
  async submitAssignment(assignmentId: string) {
    loadingService.show('Submitting assignment...')
    try {
      await assignmentService.submitAssignment(assignmentId, {})
      return { success: true, assignmentId }
    } finally {
      loadingService.hide()
    }
  },

  // Simulate enrolling in course
  async enrollInCourse(courseId: string) {
    loadingService.show('Enrolling in course...')
    try {
      const result = await courseService.enrollInCourse(courseId)
      return { success: result.success, courseId }
    } finally {
      loadingService.hide()
    }
  },

  // Simulate fetching resources
  async fetchResources() {
    loadingService.show('Loading resources...')
    try {
      return await resourceService.getResources()
    } finally {
      loadingService.hide()
    }
  },
}
