import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from '../../components/dashboard/Dashboard'
import useAuthStore from '../../store/useAuthStore'
import useCourseStore from '../../store/useCourseStore'

describe('Dashboard', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      isAuthenticated: true,
    })

    useCourseStore.setState({
      courses: [
        {
          id: '1',
          title: 'Course 1',
          description: 'Test',
          instructor: 'Instructor',
          enrolledStudents: 10,
          progress: 50,
          status: 'active',
        },
      ],
    })
  })

  it('renders welcome message with user name', () => {
    render(<Dashboard />)
    expect(screen.getByText(/welcome back, test user!/i)).toBeInTheDocument()
  })

  it('renders stat cards', () => {
    render(<Dashboard />)
    expect(screen.getByText(/total courses/i)).toBeInTheDocument()
    expect(screen.getByText(/pending assignments/i)).toBeInTheDocument()
  })

  it('displays total courses count', () => {
    render(<Dashboard />)
    // Should show the count from courses store
    expect(screen.getByText(/total courses/i)).toBeInTheDocument()
  })

  it('renders recent activity section', () => {
    render(<Dashboard />)
    expect(screen.getByText(/recent activity/i)).toBeInTheDocument()
  })

  it('renders upcoming deadlines section', () => {
    render(<Dashboard />)
    expect(screen.getByText(/upcoming deadlines/i)).toBeInTheDocument()
  })

  it('shows student-specific stats for student role', () => {
    render(<Dashboard />)
    expect(screen.getByText(/average score/i)).toBeInTheDocument()
    expect(screen.getByText(/completed courses/i)).toBeInTheDocument()
  })

  it('shows admin-specific stats for admin role', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    })
    render(<Dashboard />)
    expect(screen.getByText(/total students/i)).toBeInTheDocument()
    expect(screen.getByText(/total teachers/i)).toBeInTheDocument()
  })
})
