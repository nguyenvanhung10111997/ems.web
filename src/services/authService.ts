/**
 * Authentication Service
 */

import apiService from './apiService'
import type { User } from '../types'
import { mockUsers, simulateApiCall } from '../utils/mockData'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role?: 'student' | 'teacher'
}

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiService.post<LoginResponse>(
      '/auth/login',
      credentials,
      {
        mockData: async () => {
          const user = mockUsers.find((u) => u.email === credentials.email) || mockUsers[0]
          const token = `mock-token-${Date.now()}`
          
          // Store token
          localStorage.setItem('ems-auth', JSON.stringify({ token, user }))
          
          return simulateApiCall({
            user,
            token,
          })
        },
      }
    )
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<LoginResponse> {
    return apiService.post<LoginResponse>(
      '/auth/register',
      data,
      {
        mockData: async () => {
          const newUser: User = {
            id: String(mockUsers.length + 1),
            email: data.email,
            name: data.name,
            role: data.role || 'student',
            createdAt: new Date().toISOString(),
          }
          
          const token = `mock-token-${Date.now()}`
          
          // Store token
          localStorage.setItem('ems-auth', JSON.stringify({ token, user: newUser }))
          
          return simulateApiCall({
            user: newUser,
            token,
          })
        },
      }
    )
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    return apiService.post<void>(
      '/auth/logout',
      {},
      {
        mockData: async () => {
          localStorage.removeItem('ems-auth')
          return simulateApiCall(undefined as any)
        },
        skipLoading: true,
      }
    )
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    return apiService.get<User>(
      '/auth/me',
      {
        mockData: async () => {
          const authData = localStorage.getItem('ems-auth')
          if (authData) {
            const parsed = JSON.parse(authData)
            return simulateApiCall(parsed.user || mockUsers[0])
          }
          throw new Error('Not authenticated')
        },
      }
    )
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<{ token: string }> {
    return apiService.post<{ token: string }>(
      '/auth/refresh',
      {},
      {
        mockData: async () => {
          const newToken = `mock-token-${Date.now()}`
          const authData = localStorage.getItem('ems-auth')
          if (authData) {
            const parsed = JSON.parse(authData)
            localStorage.setItem('ems-auth', JSON.stringify({ ...parsed, token: newToken }))
          }
          return simulateApiCall({ token: newToken })
        },
      }
    )
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    return apiService.patch<User>(
      `/auth/profile/${userId}`,
      updates,
      {
        mockData: async () => {
          const authData = localStorage.getItem('ems-auth')
          if (authData) {
            const parsed = JSON.parse(authData)
            const updatedUser = { ...parsed.user, ...updates }
            localStorage.setItem('ems-auth', JSON.stringify({ ...parsed, user: updatedUser }))
            return simulateApiCall(updatedUser)
          }
          throw new Error('Not authenticated')
        },
      }
    )
  }
}

export default new AuthService()
