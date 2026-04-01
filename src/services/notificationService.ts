/**
 * Notification Service
 */

import apiService from './apiService'
import type { Notification, NotificationSettings } from '../types'
import { mockNotifications, simulateApiCall, findById } from '../utils/mockData'

class NotificationService {
  /**
   * Get all notifications
   */
  async getNotifications(): Promise<Notification[]> {
    return apiService.get<Notification[]>(
      '/notifications',
      {
        mockData: async () => simulateApiCall(mockNotifications),
      }
    )
  }

  /**
   * Get unread notifications
   */
  async getUnreadNotifications(): Promise<Notification[]> {
    return apiService.get<Notification[]>(
      '/notifications/unread',
      {
        mockData: async () => {
          const filtered = mockNotifications.filter((n) => !n.read)
          return simulateApiCall(filtered)
        },
      }
    )
  }

  /**
   * Get notification by ID
   */
  async getNotificationById(id: string): Promise<Notification> {
    return apiService.get<Notification>(
      `/notifications/${id}`,
      {
        mockData: async () => {
          const notification = findById(mockNotifications, id)
          if (!notification) {
            throw new Error('Notification not found')
          }
          return simulateApiCall(notification)
        },
      }
    )
  }

  /**
   * Mark notification as read
   */
  async markAsRead(id: string): Promise<Notification> {
    return apiService.patch<Notification>(
      `/notifications/${id}/read`,
      {},
      {
        mockData: async () => {
          const notification = findById(mockNotifications, id)
          if (!notification) {
            throw new Error('Notification not found')
          }
          const updatedNotification = { ...notification, read: true }
          return simulateApiCall(updatedNotification)
        },
      }
    )
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    return apiService.post<void>(
      '/notifications/read-all',
      {},
      {
        mockData: async () => {
          mockNotifications.forEach((n) => {
            n.read = true
          })
          return simulateApiCall(undefined as any)
        },
      }
    )
  }

  /**
   * Delete notification
   */
  async deleteNotification(id: string): Promise<void> {
    return apiService.delete<void>(
      `/notifications/${id}`,
      {
        mockData: async () => {
          const notification = findById(mockNotifications, id)
          if (!notification) {
            throw new Error('Notification not found')
          }
          return simulateApiCall(undefined as any)
        },
      }
    )
  }

  /**
   * Get notification settings
   */
  async getSettings(): Promise<NotificationSettings> {
    return apiService.get<NotificationSettings>(
      '/notifications/settings',
      {
        mockData: async () => {
          const defaultSettings: NotificationSettings = {
            enabled: true,
            email: true,
            sms: false,
            push: true,
            hub: true,
            assignmentDeadline: true,
            newCourse: true,
            gradePosted: true,
            announcement: true,
            messageReceived: true,
          }
          
          // Try to get from localStorage
          const stored = localStorage.getItem('ems-notification-settings')
          if (stored) {
            try {
              return JSON.parse(stored)
            } catch {
              return defaultSettings
            }
          }
          
          return simulateApiCall(defaultSettings)
        },
      }
    )
  }

  /**
   * Update notification settings
   */
  async updateSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    return apiService.patch<NotificationSettings>(
      '/notifications/settings',
      settings,
      {
        mockData: async () => {
          const current = await this.getSettings()
          const updated = { ...current, ...settings }
          localStorage.setItem('ems-notification-settings', JSON.stringify(updated))
          return simulateApiCall(updated)
        },
      }
    )
  }
}

export default new NotificationService()
