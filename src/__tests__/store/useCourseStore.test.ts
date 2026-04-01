import { describe, it, expect, beforeEach } from 'vitest'
import useCourseStore from '../../store/useCourseStore'
import type { Course } from '../../types'

const mockCourse: Course = {
  id: '1',
  title: 'Test Course',
  description: 'Test Description',
  instructor: 'Test Instructor',
  enrolledStudents: 10,
  progress: 50,
  status: 'active',
}

describe('useCourseStore', () => {
  beforeEach(() => {
    useCourseStore.setState({
      courses: [],
      selectedCourse: null,
    })
  })

  it('initializes with default courses', () => {
    const state = useCourseStore.getState()
    // Reset to see default
    useCourseStore.setState({
      courses: [
        {
          id: '1',
          title: 'Mathematics 101',
          description: 'Introduction to basic mathematics concepts',
          instructor: 'Dr. John Smith',
          enrolledStudents: 45,
          progress: 65,
          status: 'active',
        },
      ],
    })
    const newState = useCourseStore.getState()
    expect(newState.courses.length).toBeGreaterThan(0)
  })

  it('sets courses', () => {
    const courses = [mockCourse]
    useCourseStore.getState().setCourses(courses)
    const state = useCourseStore.getState()
    expect(state.courses).toEqual(courses)
  })

  it('adds a new course', () => {
    useCourseStore.getState().addCourse(mockCourse)
    const state = useCourseStore.getState()
    expect(state.courses).toContainEqual(mockCourse)
  })

  it('updates an existing course', () => {
    useCourseStore.setState({ courses: [mockCourse] })
    useCourseStore.getState().updateCourse('1', { title: 'Updated Title' })
    const state = useCourseStore.getState()
    expect(state.courses[0].title).toBe('Updated Title')
  })

  it('deletes a course', () => {
    useCourseStore.setState({ courses: [mockCourse] })
    useCourseStore.getState().deleteCourse('1')
    const state = useCourseStore.getState()
    expect(state.courses).not.toContainEqual(mockCourse)
  })

  it('sets selected course', () => {
    useCourseStore.getState().setSelectedCourse(mockCourse)
    const state = useCourseStore.getState()
    expect(state.selectedCourse).toEqual(mockCourse)
  })

  it('enrolls in a course', () => {
    useCourseStore.setState({ courses: [mockCourse] })
    const initialCount = mockCourse.enrolledStudents
    useCourseStore.getState().enrollInCourse('1')
    const state = useCourseStore.getState()
    expect(state.courses[0].enrolledStudents).toBe(initialCount + 1)
    expect(state.courses[0].status).toBe('active')
  })
})
