import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssignmentCard from '../../components/assignments/AssignmentCard'
import useCourseStore from '../../store/useCourseStore'
import type { Assignment } from '../../types'

const mockAssignment: Assignment = {
  id: '1',
  title: 'Mathematics Quiz 1',
  courseId: '1',
  dueDate: '2024-12-31',
  status: 'pending',
}

const mockCourse = {
  id: '1',
  title: 'Mathematics 101',
  description: 'Test',
  instructor: 'Dr. Smith',
  enrolledStudents: 10,
  status: 'active' as const,
}

describe('AssignmentCard', () => {
  beforeEach(() => {
    useCourseStore.setState({
      courses: [mockCourse],
    })
  })

  it('renders assignment title', () => {
    render(<AssignmentCard assignment={mockAssignment} />)
    expect(screen.getByText(/mathematics quiz 1/i)).toBeInTheDocument()
  })

  it('renders course name when course is found', () => {
    render(<AssignmentCard assignment={mockAssignment} />)
    expect(screen.getByText(/mathematics 101/i)).toBeInTheDocument()
  })

  it('renders due date', () => {
    render(<AssignmentCard assignment={mockAssignment} />)
    expect(screen.getByText(/due:/i)).toBeInTheDocument()
  })

  it('renders status badge', () => {
    render(<AssignmentCard assignment={mockAssignment} />)
    expect(screen.getByText(/pending/i)).toBeInTheDocument()
  })

  it('applies correct status color for pending', () => {
    render(<AssignmentCard assignment={mockAssignment} />)
    const statusBadge = screen.getByText(/pending/i)
    expect(statusBadge).toHaveClass('bg-orange-100', 'text-orange-700')
  })

  it('applies correct status color for submitted', () => {
    const submittedAssignment = { ...mockAssignment, status: 'submitted' as const }
    render(<AssignmentCard assignment={submittedAssignment} />)
    const statusBadge = screen.getByText(/submitted/i)
    expect(statusBadge).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('applies correct status color for graded', () => {
    const gradedAssignment = { ...mockAssignment, status: 'graded' as const, score: 85 }
    render(<AssignmentCard assignment={gradedAssignment} />)
    const statusBadge = screen.getByText(/graded/i)
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-700')
  })

  it('renders score when graded', () => {
    const gradedAssignment = { ...mockAssignment, status: 'graded' as const, score: 85 }
    render(<AssignmentCard assignment={gradedAssignment} />)
    expect(screen.getByText(/score: 85\/100/i)).toBeInTheDocument()
  })

  it('shows overdue indicator for past due dates', () => {
    const pastDueAssignment = {
      ...mockAssignment,
      dueDate: '2020-01-01',
      status: 'pending' as const,
    }
    render(<AssignmentCard assignment={pastDueAssignment} />)
    expect(screen.getByText(/overdue/i)).toBeInTheDocument()
  })

  it('calls onView when view button is clicked', async () => {
    const user = userEvent.setup()
    const handleView = vi.fn()
    render(<AssignmentCard assignment={mockAssignment} onView={handleView} />)

    const viewButton = screen.getByRole('button', { name: /view details/i })
    await user.click(viewButton)
    expect(handleView).toHaveBeenCalledTimes(1)
  })

  it('calls onSubmit when submit button is clicked', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<AssignmentCard assignment={mockAssignment} onSubmit={handleSubmit} />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('shows submit button only for pending assignments', () => {
    render(<AssignmentCard assignment={mockAssignment} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('does not show submit button for submitted assignments', () => {
    const submittedAssignment = { ...mockAssignment, status: 'submitted' as const }
    render(<AssignmentCard assignment={submittedAssignment} onSubmit={vi.fn()} />)
    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
  })

  it('does not show submit button for graded assignments', () => {
    const gradedAssignment = { ...mockAssignment, status: 'graded' as const }
    render(<AssignmentCard assignment={gradedAssignment} onSubmit={vi.fn()} />)
    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
  })
})
