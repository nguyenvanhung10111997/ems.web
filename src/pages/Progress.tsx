import useCourseStore from '../store/useCourseStore'
import Card from '../components/common/Card'

function Progress() {
  const { courses } = useCourseStore()

  const totalProgress =
    courses.reduce((sum, course) => sum + (course.progress || 0), 0) /
    courses.length

  const completedCourses = courses.filter(
    (course) => course.status === 'completed'
  ).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Study Progress</h2>
        <p className="text-gray-600 mt-1">
          Track your learning journey and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-sky-600 mb-2">
              {Math.round(totalProgress)}%
            </div>
            <p className="text-gray-600">Overall Progress</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {completedCourses}
            </div>
            <p className="text-gray-600">Completed Courses</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {courses.length - completedCourses}
            </div>
            <p className="text-gray-600">Active Courses</p>
          </div>
        </Card>
      </div>

      <Card title="Course Progress">
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <span className="text-sm font-medium text-gray-600">
                  {course.progress || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-sky-500 h-3 rounded-full transition-all"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Progress
