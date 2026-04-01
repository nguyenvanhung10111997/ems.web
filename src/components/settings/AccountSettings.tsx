import { useState, useRef } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import useAuthStore from '../../store/useAuthStore'
import useThemeStore from '../../store/useThemeStore'

function AccountSettings() {
  const { user } = useAuthStore()
  const { mainColor, textPrimaryColor, textSecondaryColor } = useThemeStore()
  
  // Split name into firstName and lastName
  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/)
    if (parts.length === 0) return ['', '']
    if (parts.length === 1) return [parts[0], '']
    const lastName = parts.slice(-1)[0]
    const firstName = parts.slice(0, -1).join(' ')
    return [firstName, lastName]
  }
  
  const [firstName, setFirstName] = useState(() => {
    return user?.name ? splitName(user.name)[0] : ''
  })
  const [lastName, setLastName] = useState(() => {
    return user?.name ? splitName(user.name)[1] : ''
  })
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Get full name for display
  const getFullName = () => {
    return [firstName, lastName].filter(Boolean).join(' ') || user?.name || ''
  }
  
  // Get initial for avatar
  const getInitial = () => {
    if (firstName) return firstName.charAt(0).toUpperCase()
    if (user?.name) return user.name.charAt(0).toUpperCase()
    return ''
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      // Here you would typically upload the file to your server
      // For now, we just update the preview
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card title="Profile Information">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden"
                style={{
                  backgroundColor: avatarPreview ? 'transparent' : `${mainColor}15`,
                }}
                onClick={handleAvatarClick}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span
                    className="font-bold text-2xl"
                    style={{ color: mainColor }}
                  >
                    {getInitial()}
                  </span>
                )}
              </div>
              {/* Pencil Icon on Border */}
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                style={{ backgroundColor: mainColor }}
                aria-label="Change avatar"
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: textPrimaryColor }}>
                {getFullName()}
              </p>
              <p className="text-xs" style={{ color: textSecondaryColor }}>
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card title="Change Password">
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <div className="pt-4 border-t border-gray-200">
            <Button variant="primary">Update Password</Button>
          </div>
        </div>
      </Card>

      {/* Account Actions */}
      <Card title="Account Actions">
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Delete Account
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button variant="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AccountSettings
