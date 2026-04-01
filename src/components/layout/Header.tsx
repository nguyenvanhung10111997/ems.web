import useAuthStore from '../../store/useAuthStore'
import useMobileMenuStore from '../../store/useMobileMenuStore'
import useThemeStore from '../../store/useThemeStore'
import { useTranslation } from '../../hooks/useTranslation'
import NotificationPanel from '../notifications/NotificationPanel'
import ProfilePanel from './ProfilePanel'
import RoleToggle from './RoleToggle'

function Header() {
  const { user } = useAuthStore()
  const { toggle } = useMobileMenuStore()
  const { navbarColor, mainColor, textPrimaryColor, textSecondaryColor } = useThemeStore()
  const t = useTranslation()
  
  // Determine if we're in dark mode
  const isDarkMode = navbarColor && 
    (navbarColor.toLowerCase() === '#1e293b' || 
     navbarColor.toLowerCase().startsWith('#0') ||
     navbarColor.toLowerCase().startsWith('#1'))
  
  const getRoleText = () => {
    if (user?.role === 'teacher') return t.settings.teacherPortal
    if (user?.role === 'student') return t.settings.studentPortal
    return ''
  }

  return (
    <header
      className="shadow-sm border-b border-gray-200 sticky top-0 z-40"
      style={{ backgroundColor: navbarColor }}
    >
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div
              className="rounded-lg flex items-center justify-center flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
              style={{ backgroundColor: mainColor }}
            >
              <span className="text-white font-bold text-sm sm:text-xl">EMS</span>
            </div>
            <div className="hidden sm:block">
              <h1 
                className="text-lg sm:text-xl font-bold"
                style={{ color: textPrimaryColor }}
              >
                IELTS Learning Platform
              </h1>
              <p 
                className="text-xs sm:text-sm"
                style={{ color: textSecondaryColor }}
              >
                {getRoleText()}
              </p>
            </div>
            <div className="sm:hidden">
              <h1 
                className="text-sm font-bold"
                style={{ color: textPrimaryColor }}
              >
                EMS
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {user && (
              <>
                <RoleToggle />
                <NotificationPanel />
                <ProfilePanel />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
