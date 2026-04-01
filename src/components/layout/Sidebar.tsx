import { Link, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useMobileMenuStore from '../../store/useMobileMenuStore'
import useSidebarStore from '../../store/useSidebarStore'
import useThemeStore from '../../store/useThemeStore'
import { useTranslation } from '../../hooks/useTranslation'

interface NavItem {
  name: string
  path: string
  icon: string
  roles: ('teacher' | 'student')[]
}

const getNavItems = (t: ReturnType<typeof useTranslation>) => [
  {
    name: t.nav.dashboard,
    path: '/',
    icon: '📊',
    roles: ['teacher', 'student'],
  },
  {
    name: t.nav.courses,
    path: '/courses',
    icon: '📚',
    roles: ['teacher', 'student'],
  },
  {
    name: t.nav.resources,
    path: '/resources',
    icon: '📁',
    roles: ['teacher', 'student'],
  },
  {
    name: t.nav.lectures,
    path: '/lectures',
    icon: '🎓',
    roles: ['teacher', 'student'],
  },
  {
    name: t.nav.assignments,
    path: '/assignments',
    icon: '📝',
    roles: ['student'],
  },
  {
    name: t.nav.progress,
    path: '/progress',
    icon: '📈',
    roles: ['student'],
  },
  {
    name: t.nav.chat,
    path: '/chat',
    icon: '💬',
    roles: ['teacher', 'student'],
  },
  {
    name: t.nav.calendar,
    path: '/calendar',
    icon: '📅',
    roles: ['teacher', 'student'],
  },
  {
    name: t.nav.students,
    path: '/students',
    icon: '👥',
    roles: ['teacher'],
  },
  {
    name: t.nav.settings,
    path: '/settings',
    icon: '⚙️',
    roles: ['teacher', 'student'],
  },
]

function Sidebar() {
  const { user } = useAuthStore()
  const location = useLocation()
  const { isOpen, close } = useMobileMenuStore()
  const { isCollapsed, toggle } = useSidebarStore()
  const { sidebarColor, sidebarItemPanelColor, mainColor, textPrimaryColor, textSecondaryColor } = useThemeStore()
  const t = useTranslation()
  
  // Determine if we're in dark mode
  const isDarkMode = sidebarColor && 
    (sidebarColor.toLowerCase() === '#1e293b' || 
     sidebarColor.toLowerCase().startsWith('#0') ||
     sidebarColor.toLowerCase().startsWith('#1'))

  const navItems = getNavItems(t)
  const filteredNavItems = navItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 z-50 border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 inset-y-0 lg:inset-y-auto lg:h-full ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isCollapsed ? 'w-16 lg:w-16' : 'w-64 lg:w-64'
        }`}
        style={{
          backgroundColor: sidebarColor,
        }}
      >
        <nav className="p-4 h-full overflow-y-auto flex flex-col">
          {/* Desktop Toggle Button */}
          <div className="hidden lg:flex items-center justify-end mb-4">
            <button
              onClick={toggle}
              className={`p-2 rounded-lg transition-colors hover:opacity-80 ${
                isCollapsed ? 'mx-auto' : ''
              }`}
              style={{
                backgroundColor: sidebarItemPanelColor || `${mainColor}15`,
                color: mainColor,
              }}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isCollapsed ? (
                  <path d="M9 5l7 7-7 7"></path>
                ) : (
                  <path d="M15 19l-7-7 7-7"></path>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Header */}
          <div className="flex items-center justify-end mb-4 lg:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
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
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <ul className="space-y-2 flex-1">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={close}
                    className={`flex items-center rounded-lg transition-colors ${
                      isActive ? 'font-semibold' : ''
                    } ${
                      isCollapsed
                        ? 'justify-center px-3 py-3'
                        : 'gap-3 px-4 py-3'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: sidebarItemPanelColor || `${mainColor}15`,
                            color: mainColor,
                          }
                        : {
                            color: textPrimaryColor,
                            backgroundColor: 'transparent',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = sidebarItemPanelColor || 'rgba(0, 0, 0, 0.05)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
