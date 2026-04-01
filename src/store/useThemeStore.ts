import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  backgroundColor: string
  mainColor: string
  sidebarColor: string
  navbarColor: string
  sidebarItemPanelColor: string
  textPrimaryColor: string
  textSecondaryColor: string
  theme: 'light' | 'dark' | 'auto'
  language: string
  timezone: string
  dateFormat: string
  setBackgroundColor: (color: string) => void
  setMainColor: (color: string) => void
  setSidebarColor: (color: string) => void
  setNavbarColor: (color: string) => void
  setSidebarItemPanelColor: (color: string) => void
  setTextPrimaryColor: (color: string) => void
  setTextSecondaryColor: (color: string) => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  setLanguage: (language: string) => void
  setTimezone: (timezone: string) => void
  setDateFormat: (format: string) => void
  resetTheme: () => void
}

const defaultTheme = {
  backgroundColor: '#f8fafc', // Darker gray for main content
  mainColor: '#0ea5e9', // sky-500
  sidebarColor: '#ffffff', // Lighter white for sidebar
  navbarColor: '#ffffff', // Lighter white for navbar
  sidebarItemPanelColor: '#f8fafc', // Distinct panel color for sidebar items
  textPrimaryColor: '#111827', // gray-900
  textSecondaryColor: '#6b7280', // gray-500
  theme: 'light' as const,
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaultTheme,
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      setMainColor: (color) => set({ mainColor: color }),
      setSidebarColor: (color) => set({ sidebarColor: color }),
      setNavbarColor: (color) => set({ navbarColor: color }),
      setSidebarItemPanelColor: (color) => set({ sidebarItemPanelColor: color }),
      setTextPrimaryColor: (color) => set({ textPrimaryColor: color }),
      setTextSecondaryColor: (color) => set({ textSecondaryColor: color }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setTimezone: (timezone) => set({ timezone }),
      setDateFormat: (format) => set({ dateFormat: format }),
      resetTheme: () => set(defaultTheme),
    }),
    {
      name: 'ems-theme-storage',
    }
  )
)

export default useThemeStore
