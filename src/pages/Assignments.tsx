import { useState, useEffect } from 'react'
import useAssignmentStore from '../store/useAssignmentStore'
import AssignmentCard from '../components/assignments/AssignmentCard'
import Input from '../components/common/Input'
import useThemeStore from '../store/useThemeStore'
import { api } from '../utils/api'

function Assignments() {
  const { assignments, submitAssignment, setAssignments } = useAssignmentStore()
  const { textPrimaryColor, textSecondaryColor, mainColor, backgroundColor } = useThemeStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<
    'all' | 'pending' | 'submitted' | 'graded'
  >('all')
  
  // Determine if we're in dark mode
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))
  
  const buttonBg = isDarkMode ? '#1e293b' : '#ffffff'
  const buttonBorder = isDarkMode ? '#334155' : '#e5e7eb'

  useEffect(() => {
    // Simulate loading assignments on mount
    const loadAssignments = async () => {
      const fetchedAssignments = await api.fetchAssignments()
      if (fetchedAssignments) {
        setAssignments([...assignments, ...fetchedAssignments])
      }
    }
    // Only load if assignments array is empty or small
    if (assignments.length <= 3) {
      loadAssignments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (assignmentId: string) => {
    try {
      const result = await api.submitAssignment(assignmentId)
      if (result?.success) {
        submitAssignment(assignmentId)
      }
    } catch (error) {
      console.error('Failed to submit assignment:', error)
      // Could show toast notification here
    }
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || assignment.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 
          className="text-xl sm:text-2xl font-bold"
          style={{ color: textPrimaryColor }}
        >
          Assignments
        </h2>
        <p 
          className="text-sm sm:text-base mt-1"
          style={{ color: textSecondaryColor }}
        >
          View and manage all your assignments
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(['all', 'pending', 'submitted', 'graded'] as const).map(
            (status) => (
              <button
                key={status}
                className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border"
                style={
                  filter === status
                    ? {
                        backgroundColor: mainColor,
                        color: '#ffffff',
                        borderColor: mainColor,
                      }
                    : {
                        backgroundColor: buttonBg,
                        borderColor: buttonBorder,
                        color: textPrimaryColor,
                      }
                }
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p 
            className="text-sm sm:text-base"
            style={{ color: textSecondaryColor }}
          >
            No assignments found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onView={() => console.log('View assignment', assignment.id)}
              onSubmit={() => handleSubmit(assignment.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Assignments
