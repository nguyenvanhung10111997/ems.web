import type { Assignment } from '../../types'
import Button from '../common/Button'
import useCourseStore from '../../store/useCourseStore'
import useThemeStore from '../../store/useThemeStore'

interface AssignmentCardProps {
  assignment: Assignment
  onView?: () => void
  onSubmit?: () => void
}

function AssignmentCard({
  assignment,
  onView,
  onSubmit,
}: AssignmentCardProps) {
  const { courses } = useCourseStore()
  const { backgroundColor, textPrimaryColor, textSecondaryColor } = useThemeStore()
  const course = courses.find((c) => c.id === assignment.courseId)

  // Determine if we're in dark mode
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))
  
  const cardBg = isDarkMode ? '#1e293b' : '#ffffff'
  const cardBorder = isDarkMode ? '#334155' : '#e5e7eb'

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700'
      case 'submitted':
        return isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
      case 'graded':
        return isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
      default:
        return isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
    }
  }

  const dueDate = new Date(assignment.dueDate)
  const isOverdue =
    dueDate < new Date() && assignment.status === 'pending'

  return (
    <div 
      className="rounded-lg shadow-sm border p-4 sm:p-6"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 
            className="text-base sm:text-lg font-semibold mb-1"
            style={{ color: textPrimaryColor }}
          >
            {assignment.title}
          </h3>
          {course && (
            <p 
              className="text-xs sm:text-sm truncate"
              style={{ color: textSecondaryColor }}
            >
              {course.title}
            </p>
          )}
        </div>
        <span
          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(
            assignment.status
          )}`}
        >
          {assignment.status}
        </span>
      </div>

      <div className="space-y-2 mb-3 sm:mb-4">
        <div 
          className="flex items-center text-xs sm:text-sm flex-wrap gap-1"
          style={{ color: textSecondaryColor }}
        >
          <span>📅</span>
          <span>Due: {dueDate.toLocaleDateString()}</span>
          {isOverdue && (
            <span className="font-medium" style={{ color: '#dc2626' }}>(Overdue)</span>
          )}
        </div>
        {assignment.score !== undefined && (
          <div 
            className="flex items-center text-xs sm:text-sm"
            style={{ color: textSecondaryColor }}
          >
            <span className="mr-2">⭐</span>
            <span>Score: {assignment.score}/100</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {onView && (
          <Button variant="secondary" size="sm" onClick={onView} className="w-full sm:w-auto">
            View Details
          </Button>
        )}
        {assignment.status === 'pending' && onSubmit && (
          <Button variant="primary" size="sm" onClick={onSubmit} className="w-full sm:w-auto">
            Submit
          </Button>
        )}
      </div>
    </div>
  )
}

export default AssignmentCard
