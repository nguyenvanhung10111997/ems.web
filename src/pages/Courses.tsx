import { useState, useEffect } from 'react'
import useCourseStore from '../store/useCourseStore'
import CourseCard from '../components/courses/CourseCard'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import useThemeStore from '../store/useThemeStore'
import { api } from '../utils/api'

function Courses() {
  const { courses, setCourses } = useCourseStore()
  const { textPrimaryColor, textSecondaryColor } = useThemeStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'upcoming'>('all')

  useEffect(() => {
    // Simulate loading courses on mount
    const loadCourses = async () => {
      const fetchedCourses = await api.fetchCourses()
      if (fetchedCourses) {
        setCourses([...courses, ...fetchedCourses])
      }
    }
    // Only load if courses array is empty or small
    if (courses.length <= 3) {
      loadCourses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || course.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h2 
            className="text-xl sm:text-2xl font-bold"
            style={{ color: textPrimaryColor }}
          >
            My Courses
          </h2>
          <p 
            className="text-sm sm:text-base mt-1"
            style={{ color: textSecondaryColor }}
          >
            Manage and access all your enrolled courses
          </p>
        </div>
        <Button variant="primary" size="sm" className="sm:size-md">
          Create Course
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(['all', 'active', 'completed', 'upcoming'] as const).map(
            (status) => (
              <Button
                key={status}
                variant={filter === status ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(status)}
                className="whitespace-nowrap"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            )
          )}
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p 
            className="text-sm sm:text-base"
            style={{ color: textSecondaryColor }}
          >
            No courses found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses
