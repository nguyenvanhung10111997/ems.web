import useThemeStore from '../../store/useThemeStore'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'sky' | 'green' | 'orange' | 'purple'
}

function StatCard({ title, value, icon, trend, color = 'sky' }: StatCardProps) {
  const { backgroundColor, textPrimaryColor, textSecondaryColor, mainColor } = useThemeStore()
  
  // Determine if we're in dark mode
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))
  
  const cardBg = isDarkMode ? '#1e293b' : '#ffffff'
  const cardBorder = isDarkMode ? '#334155' : '#e5e7eb'
  
  const colorClasses = {
    sky: 'bg-sky-50 text-sky-600 border-sky-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  }

  return (
    <div 
      className="rounded-lg shadow-sm border p-4 sm:p-6"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border-2 ${colorClasses[color]}`}
        >
          <span className="text-xl sm:text-2xl">{icon}</span>
        </div>
        {trend && (
          <div
            className="text-xs sm:text-sm font-medium"
            style={{
              color: trend.isPositive ? '#16a34a' : '#dc2626',
            }}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <h3 
        className="text-xs sm:text-sm font-medium mb-1"
        style={{ color: textSecondaryColor }}
      >
        {title}
      </h3>
      <p 
        className="text-xl sm:text-2xl font-bold"
        style={{ color: textPrimaryColor }}
      >
        {value}
      </p>
    </div>
  )
}

export default StatCard
