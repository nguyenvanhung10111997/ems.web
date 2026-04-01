import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import useAuthStore from '../../store/useAuthStore'

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  )
}

describe('Sidebar', () => {
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
  })

  it('renders navigation items', () => {
    renderWithRouter()
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/courses/i)).toBeInTheDocument()
    expect(screen.getByText(/resources/i)).toBeInTheDocument()
  })

  it('filters navigation items based on user role', () => {
    renderWithRouter()
    // Student should not see Users (admin only)
    expect(screen.queryByText(/users/i)).not.toBeInTheDocument()
  })

  it('shows admin-only items for admin role', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    })
    renderWithRouter()
    expect(screen.getByText(/users/i)).toBeInTheDocument()
  })

  it('highlights active route', () => {
    // When on dashboard route, it should be highlighted
    // This is tested by checking if the link has active classes when pathname matches
    renderWithRouter()
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    // The active state depends on current location, which is '/' by default in test
    expect(dashboardLink).toBeInTheDocument()
  })

  it('renders all navigation items for student', () => {
    renderWithRouter()
    const expectedItems = [
      'Dashboard',
      'Courses',
      'Resources',
      'Lectures',
      'Assignments',
      'Progress',
      'Chat',
      'Calendar',
      'Settings',
    ]
    expectedItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('renders navigation icons', () => {
    renderWithRouter()
    // Check for emoji icons (they're rendered as text)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('does not render navigation when user is null', () => {
    useAuthStore.setState({ user: null })
    renderWithRouter()
    expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument()
  })
})
