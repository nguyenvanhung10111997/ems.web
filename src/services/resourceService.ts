/**
 * Resource Service
 */

import apiService from './apiService'
import type { Resource } from '../types'
import { mockResources, simulateApiCall, findById } from '../utils/mockData'

class ResourceService {
  /**
   * Get all resources
   */
  async getResources(): Promise<Resource[]> {
    return apiService.get<Resource[]>(
      '/resources',
      {
        mockData: async () => simulateApiCall(mockResources),
      }
    )
  }

  /**
   * Get resource by ID
   */
  async getResourceById(id: string): Promise<Resource> {
    return apiService.get<Resource>(
      `/resources/${id}`,
      {
        mockData: async () => {
          const resource = findById(mockResources, id)
          if (!resource) {
            throw new Error('Resource not found')
          }
          return simulateApiCall(resource)
        },
      }
    )
  }

  /**
   * Get resources by category
   */
  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return apiService.get<Resource[]>(
      `/resources?category=${encodeURIComponent(category)}`,
      {
        mockData: async () => {
          const filtered = mockResources.filter((r) => r.category === category)
          return simulateApiCall(filtered)
        },
      }
    )
  }

  /**
   * Get resources by type
   */
  async getResourcesByType(type: Resource['type']): Promise<Resource[]> {
    return apiService.get<Resource[]>(
      `/resources?type=${type}`,
      {
        mockData: async () => {
          const filtered = mockResources.filter((r) => r.type === type)
          return simulateApiCall(filtered)
        },
      }
    )
  }

  /**
   * Create new resource
   */
  async createResource(data: Omit<Resource, 'id'>): Promise<Resource> {
    return apiService.post<Resource>(
      '/resources',
      data,
      {
        mockData: async () => {
          const newResource: Resource = {
            ...data,
            id: String(mockResources.length + 1),
            downloads: 0,
          }
          return simulateApiCall(newResource)
        },
      }
    )
  }

  /**
   * Update resource
   */
  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource> {
    return apiService.patch<Resource>(
      `/resources/${id}`,
      updates,
      {
        mockData: async () => {
          const resource = findById(mockResources, id)
          if (!resource) {
            throw new Error('Resource not found')
          }
          const updatedResource = { ...resource, ...updates }
          return simulateApiCall(updatedResource)
        },
      }
    )
  }

  /**
   * Delete resource
   */
  async deleteResource(id: string): Promise<void> {
    return apiService.delete<void>(
      `/resources/${id}`,
      {
        mockData: async () => {
          const resource = findById(mockResources, id)
          if (!resource) {
            throw new Error('Resource not found')
          }
          return simulateApiCall(undefined as any)
        },
      }
    )
  }

  /**
   * Download resource
   */
  async downloadResource(id: string): Promise<{ url: string }> {
    return apiService.post<{ url: string }>(
      `/resources/${id}/download`,
      {},
      {
        mockData: async () => {
          const resource = findById(mockResources, id)
          if (!resource) {
            throw new Error('Resource not found')
          }
          // Increment download count
          if (resource.downloads !== undefined) {
            resource.downloads += 1
          }
          return simulateApiCall({ url: `/downloads/${id}` })
        },
      }
    )
  }

  /**
   * Search resources
   */
  async searchResources(query: string): Promise<Resource[]> {
    return apiService.get<Resource[]>(
      `/resources/search?q=${encodeURIComponent(query)}`,
      {
        mockData: async () => {
          const filtered = mockResources.filter((r) =>
            r.title.toLowerCase().includes(query.toLowerCase())
          )
          return simulateApiCall(filtered)
        },
      }
    )
  }
}

export default new ResourceService()
