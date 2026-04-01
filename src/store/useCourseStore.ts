import { create } from 'zustand'
import type { Course } from '../types'

interface CourseState {
  courses: Course[]
  selectedCourse: Course | null
  setCourses: (courses: Course[]) => void
  addCourse: (course: Course) => void
  updateCourse: (id: string, updates: Partial<Course>) => void
  deleteCourse: (id: string) => void
  setSelectedCourse: (course: Course | null) => void
  enrollInCourse: (courseId: string) => void
}

const useCourseStore = create<CourseState>((set) => ({
  courses: [
    {
      id: '1',
      title: 'IELTS 6.0 Preparation',
      description: 'Comprehensive IELTS preparation course targeting band score 6.0',
      instructor: 'Jane Teacher',
      enrolledStudents: 45,
      progress: 65,
      status: 'active',
    },
    {
      id: '2',
      title: 'IELTS 5.0 Foundation',
      description: 'Foundation course for IELTS band 5.0. Perfect for beginners',
      instructor: 'Jane Teacher',
      enrolledStudents: 120,
      progress: 30,
      status: 'active',
    },
    {
      id: '3',
      title: 'IELTS 7.0 Advanced',
      description: 'Advanced IELTS preparation targeting band 7.0 and above',
      instructor: 'Jane Teacher',
      enrolledStudents: 78,
      progress: 100,
      status: 'completed',
    },
  ],
  selectedCourse: null,
  setCourses: (courses) => set({ courses }),
  addCourse: (course) =>
    set((state) => ({ courses: [...state.courses, course] })),
  updateCourse: (id, updates) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, ...updates } : course
      ),
    })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  enrollInCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              enrolledStudents: (course.enrolledStudents || 0) + 1,
              status: 'active' as const,
            }
          : course
      ),
    })),
}))

export default useCourseStore
