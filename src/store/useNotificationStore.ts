import { create } from 'zustand'
import type { Notification, NotificationSettings } from '../types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  settings: NotificationSettings
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
  updateSettings: (settings: Partial<NotificationSettings>) => void
}

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

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      title: 'New Assignment Posted',
      message: 'IELTS 6.0 Preparation: Writing Task 1 has been posted',
      type: 'info',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    },
    {
      id: '2',
      title: 'Grade Posted',
      message: 'Your score for IELTS Writing Task 2 is now available',
      type: 'success',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: '3',
      title: 'Upcoming Deadline',
      message: 'IELTS Reading Comprehension assignment due in 2 days',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      id: '4',
      title: 'New Course Available',
      message: 'IELTS 6.5 Intermediate is now available for enrollment',
      type: 'info',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ],
  unreadCount: 3,
  settings: defaultSettings,
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }))
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },
  deleteNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id)
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      }
    })
  },
  clearAll: () => {
    set({ notifications: [], unreadCount: 0 })
  },
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }))
  },
}))

export default useNotificationStore
