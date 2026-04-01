import { useState } from 'react'
import useAuthStore from '../../store/useAuthStore'
import useThemeStore from '../../store/useThemeStore'
import type { UserRole } from '../../types'

/**
 * Role Toggle Component
 * Only visible in development mode
 * Allows switching between teacher and student roles for testing
 */
function RoleToggle() {
  const { user, updateRole } = useAuthStore()
  const { mainColor, textPrimaryColor, textSecondaryColor } = useThemeStore()
  const [isOpen, setIsOpen] = useState(false)

  // Only show in development mode
  const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development'
  if (!isDev || !user) return null

  const currentRole = user.role
  const toggleRole = () => {
    const newRole: UserRole = currentRole === 'teacher' ? 'student' : 'teacher'
    updateRole(newRole)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all hover:shadow-sm"
        style={{
          borderColor: mainColor,
          backgroundColor: currentRole === 'teacher' ? `${mainColor}15` : 'transparent',
          color: textPrimaryColor,
        }}
        title={`Current: ${currentRole} (Dev Mode)`}
        aria-label="Toggle role (Development Mode)"
      >
        <span className="text-sm font-medium">
          {currentRole === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
        </span>
        <span className="hidden sm:inline text-xs font-semibold capitalize">
          {currentRole}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            style={{ backgroundColor: 'white' }}
          >
            <div className="p-2">
              <div
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wide"
                style={{ color: textSecondaryColor }}
              >
                Switch Role (Dev)
              </div>
              
              <button
                onClick={toggleRole}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-50 text-left"
                style={{ color: textPrimaryColor }}
              >
                <span className="text-lg">
                  {currentRole === 'teacher' ? '👨‍🎓' : '👨‍🏫'}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    Switch to {currentRole === 'teacher' ? 'Student' : 'Teacher'}
                  </div>
                  <div className="text-xs" style={{ color: textSecondaryColor }}>
                    {currentRole === 'teacher' ? 'View as student' : 'View as teacher'}
                  </div>
                </div>
              </button>

              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="px-3 py-1.5 text-xs" style={{ color: textSecondaryColor }}>
                  Current: <span className="font-semibold capitalize">{currentRole}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RoleToggle
