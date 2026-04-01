import { useNavigate } from 'react-router-dom'
import type { Course } from '../../types'
import Button from '../common/Button'
import useThemeStore from '../../store/useThemeStore'

interface CourseCardProps {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate()
  const { backgroundColor, textPrimaryColor, textSecondaryColor, mainColor } = useThemeStore()

  // Determine if we're in dark mode
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))
  
  const cardBg = isDarkMode ? '#1e293b' : '#ffffff'
  const cardBorder = isDarkMode ? '#334155' : '#e5e7eb'
  const progressBg = isDarkMode ? '#334155' : '#e5e7eb'

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'active':
        return isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
      case 'completed':
        return isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
      case 'upcoming':
        return isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700'
      default:
        return isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div 
      className="rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      {course.thumbnail && (
        <div 
          className="h-48 bg-gradient-to-br"
          style={{
            background: `linear-gradient(to bottom right, ${mainColor}cc, ${mainColor})`,
          }}
        ></div>
      )}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 
            className="text-base sm:text-lg font-semibold flex-1"
            style={{ color: textPrimaryColor }}
          >
            {course.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(
              course.status
            )}`}
          >
            {course.status}
          </span>
        </div>
        <p 
          className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2"
          style={{ color: textSecondaryColor }}
        >
          {course.description}
        </p>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div 
            className="text-xs sm:text-sm"
            style={{ color: textSecondaryColor }}
          >
            <p>Instructor: {course.instructor}</p>
            <p>{course.enrolledStudents} students enrolled</p>
          </div>
        </div>
        {course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span style={{ color: textSecondaryColor }}>Progress</span>
              <span 
                className="font-medium"
                style={{ color: textPrimaryColor }}
              >
                {course.progress}%
              </span>
            </div>
            <div 
              className="w-full rounded-full h-2"
              style={{ backgroundColor: progressBg }}
            >
              <div
                className="h-2 rounded-full transition-all"
                style={{ 
                  width: `${course.progress}%`,
                  backgroundColor: mainColor,
                }}
              ></div>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            {course.progress ? 'Continue' : 'View Course'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
