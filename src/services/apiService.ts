/**
 * Base API Service with interceptors for error handling
 * Supports both real API calls and mock data
 */

import useLoadingStore from '../store/useLoadingStore'

// Inline loading service to avoid module resolution issues
const loadingService = {
  show: (message?: string) => {
    const store = useLoadingStore.getState()
    store.startLoading(message)
  },
  hide: () => {
    const store = useLoadingStore.getState()
    store.stopLoading()
  },
}

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false' // Default to true

// Types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

export type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
export type ResponseInterceptor = <T>(response: Response) => T | Promise<T>
export type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>

export interface RequestConfig extends RequestInit {
  url: string
  mockData?: () => Promise<any>
  skipLoading?: boolean
  skipErrorHandling?: boolean
}

class ApiService {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor)
  }

  /**
   * Apply request interceptors
   */
  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let finalConfig = config
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig)
    }
    return finalConfig
  }

  /**
   * Apply response interceptors
   */
  private async applyResponseInterceptors<T>(response: Response): Promise<T> {
    let finalResponse: any = response
    for (const interceptor of this.responseInterceptors) {
      finalResponse = await interceptor(finalResponse)
    }
    return finalResponse
  }

  /**
   * Apply error interceptors
   */
  private async applyErrorInterceptors(error: ApiError): Promise<ApiError> {
    let finalError = error
    for (const interceptor of this.errorInterceptors) {
      finalError = await interceptor(finalError)
    }
    return finalError
  }

  /**
   * Get auth token from storage
   */
  private getAuthToken(): string | null {
    try {
      const authData = localStorage.getItem('ems-auth')
      if (authData) {
        const parsed = JSON.parse(authData)
        return parsed.token || null
      }
    } catch (error) {
      console.error('Error reading auth token:', error)
    }
    return null
  }

  /**
   * Simulate API delay for mock data
   */
  private delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Main request method
   */
  async request<T = any>(config: RequestConfig): Promise<T> {
    // Apply request interceptors
    const finalConfig = await this.applyRequestInterceptors(config)

    // Show loading if not skipped
    if (!finalConfig.skipLoading) {
      loadingService.show()
    }

    try {
      // Use mock data if configured
      if (USE_MOCK_DATA && finalConfig.mockData) {
        await this.delay(800) // Simulate network delay
        const mockResponse = await finalConfig.mockData()
        return mockResponse as T
      }

      // Build full URL
      const url = finalConfig.url.startsWith('http')
        ? finalConfig.url
        : `${API_BASE_URL}${finalConfig.url}`

      // Get auth token
      const token = this.getAuthToken()

      // Prepare headers
      const headers = new Headers(finalConfig.headers)
      headers.set('Content-Type', 'application/json')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      // Make actual API call
      const response = await fetch(url, {
        ...finalConfig,
        headers,
      })

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: ApiError = {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          errors: errorData.errors,
        }

        // Apply error interceptors
        const finalError = await this.applyErrorInterceptors(error)

        // Skip error handling if configured
        if (!finalConfig.skipErrorHandling) {
          throw finalError
        }

        throw finalError
      }

      // Parse response
      const data = await response.json()

      // Apply response interceptors
      const finalData = await this.applyResponseInterceptors<T>(data)

      return finalData
    } catch (error: any) {
      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        const networkError: ApiError = {
          message: 'Network error. Please check your connection.',
          status: 0,
        }
        const finalError = await this.applyErrorInterceptors(networkError)
        throw finalError
      }

      // Re-throw if already an ApiError
      if (error.status !== undefined) {
        throw error
      }

      // Convert to ApiError
      const apiError: ApiError = {
        message: error.message || 'An unexpected error occurred',
        status: 500,
      }
      const finalError = await this.applyErrorInterceptors(apiError)
      throw finalError
    } finally {
      // Hide loading if not skipped
      if (!finalConfig.skipLoading) {
        loadingService.hide()
      }
    }
  }

  /**
   * GET request
   */
  get<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    })
  }

  /**
   * POST request
   */
  post<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'url' | 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT request
   */
  put<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'url' | 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * PATCH request
   */
  patch<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'url' | 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE request
   */
  delete<T = any>(
    url: string,
    config?: Omit<RequestConfig, 'url' | 'method'>
  ): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'DELETE',
    })
  }
}

// Create singleton instance
const apiService = new ApiService()

// Setup default interceptors
apiService.addRequestInterceptor((config) => {
  // Add timestamp to prevent caching
  const url = new URL(config.url.startsWith('http') ? config.url : `${API_BASE_URL}${config.url}`)
  url.searchParams.set('_t', Date.now().toString())
  return { ...config, url: url.pathname + url.search }
})

apiService.addErrorInterceptor((error) => {
  // Log error for debugging
  console.error('API Error:', error)

  // Handle 401 Unauthorized - redirect to login
  if (error.status === 401) {
    localStorage.removeItem('ems-auth')
    window.location.href = '/login'
  }

  // Handle 403 Forbidden
  if (error.status === 403) {
    error.message = 'You do not have permission to perform this action.'
  }

  // Handle 404 Not Found
  if (error.status === 404) {
    error.message = 'The requested resource was not found.'
  }

  // Handle 500 Server Error
  if (error.status >= 500) {
    error.message = 'Server error. Please try again later.'
  }

  return error
})

export default apiService
