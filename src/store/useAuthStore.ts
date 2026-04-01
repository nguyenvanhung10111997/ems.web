import { create } from 'zustand'
import type { User, UserRole } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateRole: (role: UserRole) => void
}

const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    email: 'demo@ems.com',
    name: 'Demo User',
    role: 'student',
    createdAt: new Date().toISOString(),
  },
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      email,
      name: 'Demo User',
      role: 'student',
      createdAt: new Date().toISOString(),
    }
    set({ user: mockUser, isAuthenticated: true })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),
}))

export default useAuthStore
