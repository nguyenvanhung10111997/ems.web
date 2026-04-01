import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useAuthStore from './store/useAuthStore'
import useThemeStore from './store/useThemeStore'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import GlobalLoader from './components/common/GlobalLoader'
import Login from './pages/Login'
import Courses from './pages/Courses'
import Assignments from './pages/Assignments'
import Resources from './pages/Resources'
import Progress from './pages/Progress'
import Chat from './pages/Chat'
import Lectures from './pages/Lectures'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Students from './pages/Students'

function App() {
  const { isAuthenticated } = useAuthStore()
  const {
    backgroundColor,
    mainColor,
    sidebarColor,
    navbarColor,
    textPrimaryColor,
    textSecondaryColor,
  } = useThemeStore()

  // Apply theme colors dynamically
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--theme-bg-color', backgroundColor)
    root.style.setProperty('--theme-main-color', mainColor)
    root.style.setProperty('--theme-sidebar-color', sidebarColor)
    root.style.setProperty('--theme-navbar-color', navbarColor)
    root.style.setProperty('--theme-text-primary', textPrimaryColor)
    root.style.setProperty('--theme-text-secondary', textSecondaryColor)
    
    // Update body background and text color
    document.body.style.backgroundColor = backgroundColor
    document.body.style.color = textPrimaryColor
  }, [backgroundColor, mainColor, sidebarColor, navbarColor, textPrimaryColor, textSecondaryColor])

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor }}>
        <GlobalLoader />
        <Header />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <Sidebar />
          <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full lg:w-auto overflow-y-auto min-h-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/lectures" element={<Lectures />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/calendar" element={<Calendar />} />
                    <Route path="/students" element={<Students />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
