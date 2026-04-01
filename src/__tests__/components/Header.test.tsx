import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../../components/layout/Header'
import useAuthStore from '../../store/useAuthStore'

describe('Header', () => {
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

  it('renders EMS logo', () => {
    render(<Header />)
    expect(screen.getByText('EMS')).toBeInTheDocument()
  })

  it('renders system title', () => {
    render(<Header />)
    expect(screen.getByText(/education management system/i)).toBeInTheDocument()
  })

  it('displays user name', () => {
    render(<Header />)
    expect(screen.getByText(/test user/i)).toBeInTheDocument()
  })

  it('displays user role', () => {
    render(<Header />)
    expect(screen.getByText(/student/i)).toBeInTheDocument()
  })

  it('displays student portal for student role', () => {
    render(<Header />)
    expect(screen.getByText(/student portal/i)).toBeInTheDocument()
  })

  it('displays teacher portal for teacher role', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'teacher@example.com',
        name: 'Teacher',
        role: 'teacher',
        createdAt: new Date().toISOString(),
      },
    })
    render(<Header />)
    expect(screen.getByText(/teacher portal/i)).toBeInTheDocument()
  })

  it('displays admin dashboard for admin role', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    })
    render(<Header />)
    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument()
  })

  it('renders logout button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('calls logout when logout button is clicked', async () => {
    const user = userEvent.setup()
    const logoutSpy = vi.spyOn(useAuthStore.getState(), 'logout')
    render(<Header />)

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    await user.click(logoutButton)
    expect(logoutSpy).toHaveBeenCalled()
  })

  it('displays user avatar with first letter', () => {
    render(<Header />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('does not render user info when user is null', () => {
    useAuthStore.setState({ user: null })
    render(<Header />)
    expect(screen.queryByText(/test user/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument()
  })
})
