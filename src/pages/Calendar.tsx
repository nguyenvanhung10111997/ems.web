import { useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

interface CalendarEvent {
  id: string
  title: string
  type: 'lecture' | 'assignment' | 'exam' | 'deadline' | 'event'
  date: string
  time: string
  course?: string
  location?: string
  description?: string
  isAllDay?: boolean
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'IELTS Writing Task 1 Lecture',
    type: 'lecture',
    date: '2024-01-15',
    time: '10:00 AM',
    course: 'IELTS 6.0 Preparation',
    location: 'Online',
    description: 'Learn how to describe graphs and charts for IELTS Writing',
  },
  {
    id: '2',
    title: 'IELTS Writing Task 1 Due',
    type: 'deadline',
    date: '2024-01-18',
    time: '11:59 PM',
    course: 'IELTS 6.0 Preparation',
    isAllDay: false,
  },
  {
    id: '3',
    title: 'IELTS Mock Test',
    type: 'exam',
    date: '2024-01-20',
    time: '2:00 PM',
    course: 'IELTS 6.0 Preparation',
    location: 'Online',
    description: 'Full IELTS practice test covering all four skills',
  },
  {
    id: '4',
    title: 'IELTS Speaking Practice Session',
    type: 'lecture',
    date: '2024-01-22',
    time: '11:00 AM',
    course: 'IELTS Speaking Mastery',
    location: 'Online',
  },
  {
    id: '5',
    title: 'IELTS Listening Practice Test',
    type: 'assignment',
    date: '2024-01-25',
    time: '9:00 AM',
    course: 'IELTS 5.0 Foundation',
    description: 'Practice test with 40 questions',
  },
  {
    id: '6',
    title: 'IELTS Study Group Meeting',
    type: 'event',
    date: '2024-01-26',
    time: '3:00 PM',
    location: 'Online',
    description: 'Weekly IELTS study group for speaking practice',
  },
  {
    id: '7',
    title: 'IELTS Writing Task 2 Due',
    type: 'deadline',
    date: '2024-01-28',
    time: '11:59 PM',
    course: 'IELTS 6.0 Preparation',
  },
  {
    id: '8',
    title: 'IELTS Reading Techniques',
    type: 'lecture',
    date: '2024-01-30',
    time: '1:00 PM',
    course: 'IELTS 6.5 Intermediate',
    location: 'Online',
  },
]

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [filter, setFilter] = useState<
    'all' | 'lecture' | 'assignment' | 'exam' | 'deadline' | 'event'
  >('all')

  const filteredEvents = mockEvents.filter((event) => {
    const matchesFilter = filter === 'all' || event.type === filter
    const matchesDate = event.date === selectedDate || view === 'month'
    return matchesFilter && matchesDate
  })

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture':
        return 'bg-sky-100 text-sky-700 border-sky-300'
      case 'assignment':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'exam':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'deadline':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'event':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture':
        return '🎓'
      case 'assignment':
        return '📝'
      case 'exam':
        return '📋'
      case 'deadline':
        return '⏰'
      case 'event':
        return '📅'
      default:
        return '📌'
    }
  }

  // Group events by date
  const eventsByDate = filteredEvents.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }
      acc[event.date].push(event)
      return acc
    },
    {} as Record<string, CalendarEvent[]>
  )

  // Get unique dates
  const dates = Object.keys(eventsByDate).sort()

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Calendar</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            View and manage your schedule and deadlines
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(['month', 'week', 'day'] as const).map((v) => (
            <Button
              key={v}
              variant={view === v ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setView(v)}
              className="whitespace-nowrap"
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            type="date"
            label="Select Date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(
            ['all', 'lecture', 'assignment', 'exam', 'deadline', 'event'] as const
          ).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(type)}
              className="whitespace-nowrap"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {dates.length === 0 ? (
        <Card>
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-gray-500">No events found for selected date</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {dates.map((date) => (
            <Card key={date} title={new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}>
              <div className="space-y-3">
                {eventsByDate[date].map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-2 ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">{getEventIcon(event.type)}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {event.title}
                          </h3>
                          {event.course && (
                            <p className="text-sm text-gray-600 mb-1">
                              Course: {event.course}
                            </p>
                          )}
                          {event.location && (
                            <p className="text-sm text-gray-600 mb-1">
                              📍 {event.location}
                            </p>
                          )}
                          {event.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {event.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>🕐 {event.time}</span>
                            {event.type && (
                              <span className="capitalize">{event.type}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Calendar Summary */}
      <Card title="Upcoming Events Summary">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            { type: 'lecture', count: mockEvents.filter((e) => e.type === 'lecture').length },
            { type: 'assignment', count: mockEvents.filter((e) => e.type === 'assignment').length },
            { type: 'exam', count: mockEvents.filter((e) => e.type === 'exam').length },
            { type: 'deadline', count: mockEvents.filter((e) => e.type === 'deadline').length },
            { type: 'event', count: mockEvents.filter((e) => e.type === 'event').length },
          ].map(({ type, count }) => (
            <div
              key={type}
              className={`p-4 rounded-lg border-2 text-center ${getEventTypeColor(
                type as CalendarEvent['type']
              )}`}
            >
              <div className="text-3xl mb-2">{getEventIcon(type as CalendarEvent['type'])}</div>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-sm capitalize">{type}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Calendar
