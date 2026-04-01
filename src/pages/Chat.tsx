import { useState } from 'react'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

interface Message {
  id: string
  sender: string
  message: string
  timestamp: string
  isOwn: boolean
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Dr. John Smith',
      message: 'Hello! How can I help you today?',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      message: 'I have a question about the assignment.',
      timestamp: '10:32 AM',
      isOwn: true,
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwn: true,
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <p className="text-gray-600 mt-1">
          Communicate with teachers and students
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h3 className="font-semibold text-gray-900 mb-4">Conversations</h3>
          <div className="space-y-2">
            {['Dr. John Smith', 'Prof. Jane Doe', 'Study Group'].map(
              (name) => (
                <div
                  key={name}
                  className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                      <span className="text-sky-600 font-semibold">
                        {name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">Last message...</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col" title="Dr. John Smith">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isOwn
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {!message.isOwn && (
                    <p className="text-xs font-medium mb-1 opacity-75">
                      {message.sender}
                    </p>
                  )}
                  <p>{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isOwn ? 'text-sky-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button variant="primary" onClick={handleSend}>
              Send
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Chat
