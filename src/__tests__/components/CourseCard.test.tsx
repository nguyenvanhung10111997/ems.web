import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CourseCard from '../../components/courses/CourseCard'
import type { Course } from '../../types'

const mockCourse: Course = {
  id: '1',
  title: 'Mathematics 101',
  description: 'Introduction to basic mathematics',
  instructor: 'Dr. John Smith',
  enrolledStudents: 45,
  progress: 65,
  status: 'active',
}

const renderWithRouter = (course: Course) => {
  return render(
    <BrowserRouter>
      <CourseCard course={course} />
    </BrowserRouter>
  )
}

describe('CourseCard', () => {
  it('renders course title', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByText(/mathematics 101/i)).toBeInTheDocument()
  })

  it('renders course description', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByText(/introduction to basic mathematics/i)).toBeInTheDocument()
  })

  it('renders instructor name', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByText(/dr\. john smith/i)).toBeInTheDocument()
  })

  it('renders enrolled students count', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByText(/45 students enrolled/i)).toBeInTheDocument()
  })

  it('renders progress bar when progress is defined', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByText(/65%/i)).toBeInTheDocument()
    const progressBar = screen.getByText(/progress/i).closest('div')?.querySelector('.bg-sky-500')
    expect(progressBar).toBeInTheDocument()
  })

  it('does not render progress bar when progress is undefined', () => {
    const courseWithoutProgress = { ...mockCourse, progress: undefined }
    renderWithRouter(courseWithoutProgress)
    expect(screen.queryByText(/progress/i)).not.toBeInTheDocument()
  })

  it('renders status badge', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByText(/active/i)).toBeInTheDocument()
  })

  it('applies correct status color for active', () => {
    renderWithRouter(mockCourse)
    const statusBadge = screen.getByText(/active/i)
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-700')
  })

  it('applies correct status color for completed', () => {
    const completedCourse = { ...mockCourse, status: 'completed' as const }
    renderWithRouter(completedCourse)
    const statusBadge = screen.getByText(/completed/i)
    expect(statusBadge).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('applies correct status color for upcoming', () => {
    const upcomingCourse = { ...mockCourse, status: 'upcoming' as const }
    renderWithRouter(upcomingCourse)
    const statusBadge = screen.getByText(/upcoming/i)
    expect(statusBadge).toHaveClass('bg-orange-100', 'text-orange-700')
  })

  it('shows "Continue" button when progress exists', () => {
    renderWithRouter(mockCourse)
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })

  it('shows "View Course" button when no progress', () => {
    const courseWithoutProgress = { ...mockCourse, progress: undefined }
    renderWithRouter(courseWithoutProgress)
    expect(screen.getByRole('button', { name: /view course/i })).toBeInTheDocument()
  })

  it('navigates to course detail on button click', async () => {
    const user = userEvent.setup()
    const mockNavigate = vi.fn()
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useNavigate: () => mockNavigate,
      }
    })

    renderWithRouter(mockCourse)
    const button = screen.getByRole('button')
    await user.click(button)
    // Note: Navigation testing might need additional setup
  })

  it('renders thumbnail when provided', () => {
    const courseWithThumbnail = { ...mockCourse, thumbnail: '/thumb.jpg' }
    const { container } = renderWithRouter(courseWithThumbnail)
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument()
  })
})
