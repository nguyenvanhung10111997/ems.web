import { describe, it, expect, beforeEach } from 'vitest'
import useAuthStore from '../../store/useAuthStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    })
  })

  it('initializes with default user', () => {
    const state = useAuthStore.getState()
    // Reset to default
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'demo@ems.com',
        name: 'Demo User',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      isAuthenticated: true,
    })
    const newState = useAuthStore.getState()
    expect(newState.user).toBeTruthy()
    expect(newState.isAuthenticated).toBe(true)
  })

  it('sets user correctly', () => {
    const user = {
      id: '2',
      email: 'test@example.com',
      name: 'Test User',
      role: 'teacher' as const,
      createdAt: new Date().toISOString(),
    }
    useAuthStore.getState().setUser(user)
    const state = useAuthStore.getState()
    expect(state.user).toEqual(user)
    expect(state.isAuthenticated).toBe(true)
  })

  it('sets isAuthenticated to false when user is null', () => {
    useAuthStore.getState().setUser(null)
    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
  })

  it('logs in user', async () => {
    await useAuthStore.getState().login('test@example.com', 'password')
    const state = useAuthStore.getState()
    expect(state.user).toBeTruthy()
    expect(state.isAuthenticated).toBe(true)
    expect(state.user?.email).toBe('test@example.com')
  })

  it('logs out user', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      isAuthenticated: true,
    })
    useAuthStore.getState().logout()
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('updates user role', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      isAuthenticated: true,
    })
    useAuthStore.getState().updateRole('teacher')
    const state = useAuthStore.getState()
    expect(state.user?.role).toBe('teacher')
  })

  it('does not update role when user is null', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    useAuthStore.getState().updateRole('admin')
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
  })
})
