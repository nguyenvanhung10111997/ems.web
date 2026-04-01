import useAuthStore from '../../store/useAuthStore'
import { useTranslation } from '../../hooks/useTranslation'
import useThemeStore from '../../store/useThemeStore'
import StatCard from './StatCard'
import ProgressChart from './ProgressChart'
import CourseDistributionChart from './CourseDistributionChart'
import AssignmentStatusChart from './AssignmentStatusChart'
import Card from '../common/Card'
import type { DashboardStats } from '../../types'

function Dashboard() {
  const { user } = useAuthStore()
  const { textPrimaryColor, textSecondaryColor } = useThemeStore()
  const t = useTranslation()

  // Mock stats - replace with actual data
  const stats: DashboardStats = {
    totalCourses: user?.role === 'teacher' ? 5 : 3,
    totalStudents: user?.role === 'teacher' ? 45 : undefined,
    studentsEnrolled: user?.role === 'teacher' ? 45 : undefined,
    pendingAssignments: user?.role === 'teacher' ? 12 : 5,
    completedCourses: user?.role === 'student' ? 2 : undefined,
    averageScore: user?.role === 'student' ? 87 : undefined,
  }

  // Mock chart data
  const progressData = [
    { month: 'Jan', score: 75, average: 72 },
    { month: 'Feb', score: 80, average: 75 },
    { month: 'Mar', score: 85, average: 78 },
    { month: 'Apr', score: 82, average: 80 },
    { month: 'May', score: 88, average: 82 },
    { month: 'Jun', score: 90, average: 85 },
  ]

  const courseDistributionData = [
    { name: 'IELTS 6.0', value: 35 },
    { name: 'IELTS 5.0', value: 25 },
    { name: 'IELTS 7.0', value: 20 },
    { name: 'IELTS 6.5', value: 15 },
    { name: 'Speaking', value: 5 },
  ]

  const assignmentStatusData = [
    { month: 'Jan', completed: 12, pending: 3 },
    { month: 'Feb', completed: 15, pending: 2 },
    { month: 'Mar', completed: 18, pending: 1 },
    { month: 'Apr', completed: 20, pending: 2 },
    { month: 'May', completed: 22, pending: 1 },
    { month: 'Jun', completed: 25, pending: 0 },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 
          className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2"
          style={{ color: textPrimaryColor }}
        >
          {t.dashboard.welcomeBack}, {user?.name}!
        </h2>
        <p 
          className="text-sm sm:text-base"
          style={{ color: textSecondaryColor }}
        >
          Here's what's happening with your education journey today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title={t.dashboard.totalCourses}
          value={stats.totalCourses}
          icon="📚"
          color="sky"
          trend={{ value: 12, isPositive: true }}
        />
        {user?.role === 'teacher' && (
          <StatCard
            title={t.dashboard.totalStudents}
            value={stats.totalStudents || 0}
            icon="👥"
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
        )}
        <StatCard
          title={t.dashboard.pendingAssignments}
          value={stats.pendingAssignments}
          icon="📝"
          color="orange"
        />
        {user?.role === 'student' && (
          <StatCard
            title={t.dashboard.averageScore}
            value={`${stats.averageScore}%`}
            icon="⭐"
            color="green"
            trend={{ value: 5, isPositive: true }}
          />
        )}
        {user?.role === 'student' && (
          <StatCard
            title={t.dashboard.completedCourses}
            value={stats.completedCourses || 0}
            icon="✅"
            color="green"
          />
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Progress Over Time">
          <div className="overflow-x-auto">
            <ProgressChart data={progressData} />
          </div>
        </Card>

        <Card title="Course Distribution">
          <div className="overflow-x-auto">
            <CourseDistributionChart data={courseDistributionData} />
          </div>
        </Card>
      </div>

      <Card title="Assignment Status">
        <div className="overflow-x-auto">
          <AssignmentStatusChart data={assignmentStatusData} />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title={t.dashboard.recentActivity}>
          <div className="space-y-4">
            {(user?.role === 'teacher' 
              ? [
                  {
                    icon: '👥',
                    title: 'New student enrolled in IELTS 6.0',
                    time: '2 hours ago',
                  },
                  {
                    icon: '📝',
                    title: 'Graded 5 assignments',
                    time: '5 hours ago',
                  },
                  {
                    icon: '💬',
                    title: 'Responded to student messages',
                    time: '1 day ago',
                  },
                ]
              : [
                  {
                    icon: '📚',
                    title: 'Completed lesson in IELTS 6.0 Preparation',
                    time: '2 hours ago',
                  },
                  {
                    icon: '📝',
                    title: 'Submitted Assignment: IELTS Writing Task 1',
                    time: '5 hours ago',
                  },
                  {
                    icon: '🎓',
                    title: 'Attended lecture: IELTS Speaking Mastery',
                    time: '1 day ago',
                  },
                ]
            ).map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${textPrimaryColor}15`,
                  }}
                >
                  <span style={{ color: textPrimaryColor }}>{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: textPrimaryColor }}
                  >
                    {activity.title}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: textSecondaryColor }}
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t.dashboard.upcomingDeadlines}>
          <div className="space-y-4">
            {(user?.role === 'teacher'
              ? [
                  {
                    icon: '📝',
                    title: 'Grade 12 assignments',
                    time: 'Due in 2 days',
                    urgent: false,
                  },
                  {
                    icon: '📚',
                    title: 'Prepare IELTS 6.5 materials',
                    time: 'Due in 5 days',
                    urgent: false,
                  },
                  {
                    icon: '💬',
                    title: 'Review student progress reports',
                    time: 'Due in 1 week',
                    urgent: false,
                  },
                ]
              : [
                  {
                    icon: '📝',
                    title: 'Assignment: IELTS Writing Task 1',
                    time: 'Due in 2 days',
                    urgent: false,
                  },
                  {
                    icon: '📚',
                    title: 'Practice: IELTS Listening Test',
                    time: 'Due in 5 days',
                    urgent: false,
                  },
                  {
                    icon: '📝',
                    title: 'Assignment: IELTS Reading Comprehension',
                    time: 'Due in 1 week',
                    urgent: false,
                  },
                ]
            ).map((deadline, i) => (
              <div key={i} className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${textPrimaryColor}15`,
                  }}
                >
                  <span style={{ color: textPrimaryColor }}>{deadline.icon}</span>
                </div>
                <div className="flex-1">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: textPrimaryColor }}
                  >
                    {deadline.title}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: textSecondaryColor }}
                  >
                    {deadline.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
