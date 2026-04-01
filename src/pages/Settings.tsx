import { useState } from 'react'
import Tabs from '../components/settings/Tabs'
import AccountSettings from '../components/settings/AccountSettings'
import NotificationSettings from '../components/notifications/NotificationSettings'
import ThemeLanguageSettings from '../components/settings/ThemeLanguageSettings'
import PrivacySettings from '../components/settings/PrivacySettings'
import AboutEMS from '../components/settings/AboutEMS'

const tabs = [
  { id: 'account', label: 'Account Settings', icon: '👤' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'theme', label: 'Theme and Language', icon: '🎨' },
  { id: 'privacy', label: 'Privacy', icon: '🔒' },
  { id: 'about', label: 'About EMS', icon: 'ℹ️' },
]

function Settings() {
  const [activeTab, setActiveTab] = useState('account')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />
      case 'notifications':
        return <NotificationSettings />
      case 'theme':
        return <ThemeLanguageSettings />
      case 'privacy':
        return <PrivacySettings />
      case 'about':
        return <AboutEMS />
      default:
        return <AccountSettings />
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-4 sm:p-6">{renderTabContent()}</div>
      </div>
    </div>
  )
}

export default Settings
