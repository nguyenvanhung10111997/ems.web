import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

function ProfilePanel() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center hover:bg-sky-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        aria-label="Profile menu"
      >
        <span className="text-sky-600 font-semibold text-base">
          {user.name.charAt(0).toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-sky-600 font-semibold text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 capitalize mb-1">
                {user.role}
              </p>
              <p className="text-xs text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                navigate('/settings')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-lg">⚙️</span>
              <span>Settings</span>
            </button>
            {user.role === 'student' && (
              <button
                onClick={() => {
                  navigate('/progress')
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-lg">📈</span>
                <span>My Progress</span>
              </button>
            )}
            <button
              onClick={() => {
                navigate('/courses')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-lg">📚</span>
              <span>My Courses</span>
            </button>
            {user.role === 'teacher' && (
              <button
                onClick={() => {
                  navigate('/students')
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-lg">👥</span>
                <span>Manage Students</span>
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Logout */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
            >
              <span className="text-lg">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePanel
