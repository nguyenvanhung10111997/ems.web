import useNotificationStore from '../../store/useNotificationStore'
import Card from '../common/Card'
import Button from '../common/Button'

function NotificationSettings() {
  const { settings, updateSettings } = useNotificationStore()

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] })
  }

  const handleMasterToggle = (enabled: boolean) => {
    updateSettings({ enabled })
  }

  const notificationChannels = [
    {
      key: 'email' as const,
      label: 'Email',
      description: 'Receive notifications via email',
      icon: '📧',
    },
    {
      key: 'sms' as const,
      label: 'SMS',
      description: 'Receive notifications via text message',
      icon: '💬',
    },
    {
      key: 'hub' as const,
      label: 'Notification Hub',
      description: 'Show notifications in the notification panel',
      icon: '📬',
    },
  ]

  const notificationTypes = [
    {
      key: 'assignmentDeadline' as const,
      label: 'Assignment Deadlines',
      description: 'Get notified when assignments are due',
      icon: '📝',
    },
    {
      key: 'newCourse' as const,
      label: 'New Courses',
      description: 'Get notified when new courses are available',
      icon: '📚',
    },
    {
      key: 'gradePosted' as const,
      label: 'Grades Posted',
      description: 'Get notified when grades are posted',
      icon: '⭐',
    },
    {
      key: 'announcement' as const,
      label: 'Announcements',
      description: 'Get notified about important announcements',
      icon: '📢',
    },
    {
      key: 'messageReceived' as const,
      label: 'Messages',
      description: 'Get notified when you receive messages',
      icon: '💬',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Master Toggle - Enable/Disable All Notifications */}
      <Card title="Notification Preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Enable Notifications
              </h3>
              <p className="text-sm text-gray-600">
                Turn all notifications on or off
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleMasterToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Notification Channels */}
      {settings.enabled && (
        <Card title="Notification Channels">
          <div className="space-y-4">
            {notificationChannels.map((channel) => (
              <div
                key={channel.key}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{channel.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {channel.label}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {channel.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[channel.key]}
                    onChange={() => handleToggle(channel.key)}
                    disabled={!settings.enabled}
                    className="sr-only peer disabled:opacity-50"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500 peer-disabled:opacity-50"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* What to Notify Me About */}
      {settings.enabled && (
        <Card title="What to Notify Me About">
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div
                key={type.key}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {type.label}
                    </h3>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[type.key]}
                    onChange={() => handleToggle(type.key)}
                    disabled={!settings.enabled}
                    className="sr-only peer disabled:opacity-50"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500 peer-disabled:opacity-50"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disabled State Message */}
      {!settings.enabled && (
        <Card>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔕</div>
            <p className="text-sm text-gray-600">
              Notifications are currently disabled. Enable notifications above to
              configure your preferences.
            </p>
          </div>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary">Reset to Default</Button>
        <Button variant="primary">Save Settings</Button>
      </div>
    </div>
  )
}

export default NotificationSettings
