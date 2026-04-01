import React from 'react'
import useThemeStore from '../../store/useThemeStore'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  action?: React.ReactNode
}

function Card({ children, className = '', title, action }: CardProps) {
  const { backgroundColor, textPrimaryColor } = useThemeStore()
  
  // Determine if we're in dark mode based on background color
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))

  return (
    <div
      className={`rounded-lg shadow-sm border ${className}`}
      style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        borderColor: isDarkMode ? '#334155' : '#e5e7eb',
      }}
    >
      {(title || action) && (
        <div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b gap-2 sm:gap-0"
          style={{
            borderColor: isDarkMode ? '#334155' : '#e5e7eb',
          }}
        >
          {title && (
            <h3 
              className="text-base sm:text-lg font-semibold"
              style={{ color: textPrimaryColor }}
            >
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div 
        className={title || action ? 'p-4 sm:p-6' : 'p-4 sm:p-6'}
        style={{ color: textPrimaryColor }}
      >
        {children}
      </div>
    </div>
  )
}

export default Card
