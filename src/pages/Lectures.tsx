import { useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

interface Lecture {
  id: string
  title: string
  course: string
  instructor: string
  duration: string
  date: string
  status: 'upcoming' | 'live' | 'recorded'
  description: string
  videoUrl?: string
}

const mockLectures: Lecture[] = [
  {
    id: '1',
    title: 'IELTS Writing Task 1: Academic Overview',
    course: 'IELTS 6.0 Preparation',
    instructor: 'Jane Teacher',
    duration: '45 min',
    date: '2024-01-15',
    status: 'recorded',
    description:
      'Learn how to describe graphs, charts, and diagrams for IELTS Writing Task 1. Master the structure and vocabulary needed for band 6.0+ scores.',
    videoUrl: 'https://example.com/video1',
  },
  {
    id: '2',
    title: 'IELTS Listening Strategies',
    course: 'IELTS 5.0 Foundation',
    instructor: 'Jane Teacher',
    duration: '60 min',
    date: '2024-01-20',
    status: 'recorded',
    description:
      'Essential listening techniques and strategies for IELTS. Practice with real test questions and improve your band score.',
    videoUrl: 'https://example.com/video2',
  },
  {
    id: '3',
    title: 'IELTS Speaking Part 2: Cue Card Practice',
    course: 'IELTS Speaking Mastery',
    instructor: 'Jane Teacher',
    duration: '50 min',
    date: '2024-01-22',
    status: 'live',
    description: 'Live practice session for IELTS Speaking Part 2. Learn how to structure your 2-minute talk effectively.',
  },
  {
    id: '4',
    title: 'IELTS Reading: Skimming and Scanning',
    course: 'IELTS 6.5 Intermediate',
    instructor: 'Jane Teacher',
    duration: '55 min',
    date: '2024-01-25',
    status: 'upcoming',
    description: 'Master reading techniques to find answers quickly in IELTS Reading test. Practice with authentic passages.',
  },
  {
    id: '5',
    title: 'IELTS Writing Task 2: Opinion Essays',
    course: 'IELTS 6.0 Preparation',
    instructor: 'Jane Teacher',
    duration: '70 min',
    date: '2024-01-18',
    status: 'recorded',
    description:
      'Learn how to write effective opinion essays for IELTS Writing Task 2. Structure, vocabulary, and grammar tips for higher scores.',
    videoUrl: 'https://example.com/video3',
  },
  {
    id: '6',
    title: 'IELTS Vocabulary Building: Academic Words',
    course: 'IELTS 7.0 Advanced',
    instructor: 'Jane Teacher',
    duration: '65 min',
    date: '2024-01-28',
    status: 'upcoming',
    description:
      'Expand your academic vocabulary for IELTS. Learn high-frequency words and phrases for band 7.0 and above.',
  },
]

function Lectures() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'recorded'>('all')

  const filteredLectures = mockLectures.filter((lecture) => {
    const matchesSearch =
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || lecture.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: Lecture['status']) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-700'
      case 'upcoming':
        return 'bg-blue-100 text-blue-700'
      case 'recorded':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Lectures</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Access live and recorded lectures from your courses
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search lectures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(['all', 'upcoming', 'live', 'recorded'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(status)}
              className="whitespace-nowrap"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {filteredLectures.length === 0 ? (
        <Card>
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-gray-500">No lectures found</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredLectures.map((lecture) => (
            <Card key={lecture.id} title={lecture.title}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {lecture.course}
                    </p>
                    <p className="text-sm text-gray-600">
                      {lecture.instructor}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      lecture.status
                    )}`}
                  >
                    {lecture.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">{lecture.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 {new Date(lecture.date).toLocaleDateString()}</span>
                  <span>⏱️ {lecture.duration}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {lecture.status === 'live' && (
                    <Button variant="danger" size="sm" className="flex-1">
                      Join Live
                    </Button>
                  )}
                  {lecture.status === 'recorded' && (
                    <Button variant="primary" size="sm" className="flex-1">
                      Watch Recording
                    </Button>
                  )}
                  {lecture.status === 'upcoming' && (
                    <Button variant="secondary" size="sm" className="flex-1">
                      Set Reminder
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                    View Details
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

export default Lectures
