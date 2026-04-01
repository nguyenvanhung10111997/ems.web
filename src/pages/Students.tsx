import { useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import useThemeStore from '../store/useThemeStore'
import { useTranslation } from '../hooks/useTranslation'

// Mock student data - in real app, this would come from API
const mockStudents = [
  {
    id: '1',
    name: 'John Student',
    email: 'john@ielts.com',
    enrolledCourses: ['IELTS 6.0 Preparation', 'IELTS Speaking Mastery'],
    progress: 75,
    averageScore: 87,
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sarah Learner',
    email: 'sarah@ielts.com',
    enrolledCourses: ['IELTS 5.0 Foundation', 'IELTS 6.0 Preparation'],
    progress: 60,
    averageScore: 82,
    lastActive: '1 day ago',
  },
  {
    id: '3',
    name: 'Mike English',
    email: 'mike@ielts.com',
    enrolledCourses: ['IELTS 6.5 Intermediate'],
    progress: 45,
    averageScore: 78,
    lastActive: '3 hours ago',
  },
]

function Students() {
  const { user } = useAuthStore()
  const { textPrimaryColor, textSecondaryColor, mainColor } = useThemeStore()
  const t = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  // Only teachers can access this page
  if (user?.role !== 'teacher') {
    return (
      <div className="text-center py-12">
        <p style={{ color: textSecondaryColor }}>Access denied. This page is for teachers only.</p>
      </div>
    )
  }

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: textPrimaryColor }}>
            My Students
          </h2>
          <p className="mt-1" style={{ color: textSecondaryColor }}>
            View and manage your students' progress, assignments, and activities
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: textSecondaryColor }}>No students found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: textPrimaryColor }}>
                      {student.name}
                    </h3>
                    <p className="text-sm" style={{ color: textSecondaryColor }}>
                      {student.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium" style={{ color: textPrimaryColor }}>
                      {student.averageScore}% Avg
                    </p>
                    <p className="text-xs" style={{ color: textSecondaryColor }}>
                      Last active: {student.lastActive}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span style={{ color: textSecondaryColor }}>Overall Progress</span>
                    <span className="font-medium" style={{ color: textPrimaryColor }}>
                      {student.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${student.progress}%`, backgroundColor: mainColor }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: textPrimaryColor }}>
                    Enrolled Courses:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {student.enrolledCourses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: `${mainColor}15`,
                          color: mainColor,
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t" style={{ borderColor: textSecondaryColor + '30' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => console.log('View progress', student.id)}
                    style={{ backgroundColor: mainColor }}
                  >
                    View Progress
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => console.log('View calendar', student.id)}
                  >
                    View Calendar
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => console.log('Chat', student.id)}
                  >
                    Chat
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Students
