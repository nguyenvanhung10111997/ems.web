import { useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import useThemeStore from '../../store/useThemeStore'
import { useTranslation } from '../../hooks/useTranslation'

interface PresetTheme {
  name: string
  icon: string
  backgroundColor: string
  mainColor: string
  sidebarColor: string
  navbarColor: string
  sidebarItemPanelColor: string
  textPrimaryColor: string
  textSecondaryColor: string
}

interface Language {
  code: string
  name: string
  flag: string
  nativeName: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
]

const presetThemes: PresetTheme[] = [
  {
    name: 'Light',
    icon: '☀️',
    backgroundColor: '#f8fafc', // Darker gray for main content
    mainColor: '#0ea5e9',
    sidebarColor: '#ffffff', // Lighter white for sidebar
    navbarColor: '#ffffff', // Lighter white for navbar
    sidebarItemPanelColor: '#f1f5f9', // Distinct gray panel for sidebar items
    textPrimaryColor: '#0f172a', // Darker for better contrast
    textSecondaryColor: '#475569', // Darker gray for better readability
  },
  {
    name: 'Dark',
    icon: '🌙',
    backgroundColor: '#0a0f1a', // Darker than sidebar/navbar
    mainColor: '#60a5fa',
    sidebarColor: '#1e293b', // Lighter than main content
    navbarColor: '#1e293b', // Lighter than main content
    sidebarItemPanelColor: '#334155', // Distinct darker panel for sidebar items
    textPrimaryColor: '#f8fafc', // Brighter for better visibility
    textSecondaryColor: '#e2e8f0', // Brighter secondary text
  },
  {
    name: 'Ocean',
    icon: '🌊',
    backgroundColor: '#cfe2f3', // Darker blue for main content
    mainColor: '#0284c7',
    sidebarColor: '#e0f2fe', // Lighter blue for sidebar
    navbarColor: '#e0f2fe', // Lighter blue for navbar
    sidebarItemPanelColor: '#bae6fd', // Distinct lighter blue panel
    textPrimaryColor: '#0c4a6e', // Darker blue-gray for contrast on light blue
    textSecondaryColor: '#1e40af', // Medium blue for secondary text
  },
  {
    name: 'Forest',
    icon: '🌲',
    backgroundColor: '#c6f6d5', // Darker green for main content
    mainColor: '#16a34a',
    sidebarColor: '#dcfce7', // Lighter green for sidebar
    navbarColor: '#dcfce7', // Lighter green for navbar
    sidebarItemPanelColor: '#bbf7d0', // Distinct lighter green panel
    textPrimaryColor: '#14532d', // Darker green-gray for contrast on light green
    textSecondaryColor: '#166534', // Medium green for secondary text
  },
  {
    name: 'Sunset',
    icon: '🌅',
    backgroundColor: '#fed7aa', // Darker orange for main content
    mainColor: '#f97316',
    sidebarColor: '#ffedd5', // Lighter orange for sidebar
    navbarColor: '#ffedd5', // Lighter orange for navbar
    sidebarItemPanelColor: '#fed7aa', // Distinct lighter orange panel
    textPrimaryColor: '#7c2d12', // Darker orange-brown for contrast on light orange
    textSecondaryColor: '#9a3412', // Medium orange for secondary text
  },
  {
    name: 'Professional',
    icon: '💼',
    backgroundColor: '#e5e7eb', // Darker gray for main content
    mainColor: '#4b5563',
    sidebarColor: '#f3f4f6', // Lighter gray for sidebar
    navbarColor: '#f3f4f6', // Lighter gray for navbar
    sidebarItemPanelColor: '#e5e7eb', // Distinct gray panel
    textPrimaryColor: '#111827', // Very dark for professional look
    textSecondaryColor: '#374151', // Dark gray for secondary text
  },
]

function ThemeLanguageSettings() {
  const {
    language,
    backgroundColor,
    mainColor,
    sidebarColor,
    navbarColor,
    sidebarItemPanelColor,
    textPrimaryColor,
    textSecondaryColor,
    setLanguage,
    setBackgroundColor,
    setMainColor,
    setSidebarColor,
    setNavbarColor,
    setSidebarItemPanelColor,
    setTextPrimaryColor,
    setTextSecondaryColor,
  } = useThemeStore()
  
  const t = useTranslation()
  
  const [languageSearch, setLanguageSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  
  // Determine if we're in dark mode
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))
  
  // Filter languages based on search
  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(languageSearch.toLowerCase()) ||
      lang.code.toLowerCase().includes(languageSearch.toLowerCase())
  )
  
  const handleSaveLanguage = () => {
    setLanguage(selectedLanguage)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 2000)
  }

  const applyPreset = (preset: PresetTheme) => {
    setBackgroundColor(preset.backgroundColor)
    setMainColor(preset.mainColor)
    setSidebarColor(preset.sidebarColor)
    setNavbarColor(preset.navbarColor)
    setSidebarItemPanelColor(preset.sidebarItemPanelColor)
    setTextPrimaryColor(preset.textPrimaryColor)
    setTextSecondaryColor(preset.textSecondaryColor)
  }

  return (
    <div className="space-y-6">
      {/* Preset Themes */}
      <Card title={t.settings.themeMode}>
        <div className="space-y-4">
          <p 
            className="text-sm"
            style={{ color: textSecondaryColor }}
          >
            {t.settings.selectTheme}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {presetThemes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="p-4 rounded-lg border-2 transition-all hover:shadow-md"
                style={{
                  borderColor:
                    backgroundColor === preset.backgroundColor &&
                    mainColor === preset.mainColor
                      ? mainColor
                      : '#e5e7eb',
                  backgroundColor:
                    backgroundColor === preset.backgroundColor &&
                    mainColor === preset.mainColor
                      ? `${mainColor}10`
                      : '#ffffff',
                }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{preset.icon}</div>
                  <div
                    className="text-sm font-medium"
                    style={{
                      color:
                        backgroundColor === preset.backgroundColor &&
                        mainColor === preset.mainColor
                          ? mainColor
                          : '#374151',
                    }}
                  >
                    {preset.name}
                  </div>
                  <div className="mt-2 flex gap-1 justify-center">
                    <div
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: preset.backgroundColor }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: preset.mainColor }}
                    ></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Language Settings */}
      <Card title={`🌍 ${t.settings.language}`}>
        <div className="space-y-4">
          <p 
            className="text-sm"
            style={{ color: textSecondaryColor }}
          >
            {t.settings.selectLanguage}
          </p>
          
          {/* Search Box */}
          <div>
            <Input
              type="search"
              placeholder={t.settings.searchLanguages}
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Language List */}
          <div className="max-h-64 overflow-y-auto border rounded-lg"
            style={{
              borderColor: isDarkMode ? '#334155' : '#e5e7eb',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            }}
          >
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center" style={{ color: textSecondaryColor }}>
                <p className="text-sm">{t.common.search}...</p>
              </div>
            ) : (
              <div className="divide-y"
                style={{
                  borderColor: isDarkMode ? '#334155' : '#e5e7eb',
                }}
              >
                {filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-opacity-10 ${
                      selectedLanguage === lang.code ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor:
                        selectedLanguage === lang.code
                          ? `${mainColor}15`
                          : 'transparent',
                      color:
                        selectedLanguage === lang.code
                          ? mainColor
                          : textPrimaryColor,
                      borderLeft:
                        selectedLanguage === lang.code
                          ? `3px solid ${mainColor}`
                          : '3px solid transparent',
                    }}
                  >
                    <span className="text-2xl flex-shrink-0">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lang.name}</span>
                        {selectedLanguage === lang.code && (
                          <span className="text-xs" style={{ color: mainColor }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <p 
                        className="text-xs truncate"
                        style={{ color: textSecondaryColor }}
                      >
                        {lang.nativeName}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Save Button with Success Message */}
          <div className="pt-4 border-t"
            style={{
              borderColor: isDarkMode ? '#334155' : '#e5e7eb',
            }}
          >
            <div className="flex items-center justify-between gap-3">
              {showSaveSuccess && (
                <div 
                  className="flex items-center gap-2 text-sm"
                  style={{ color: '#10b981' }}
                >
                  <span>✓</span>
                  <span>{t.settings.languageSaved}</span>
                </div>
              )}
              <div className="flex-1"></div>
              <Button
                variant="primary"
                onClick={handleSaveLanguage}
                style={{ backgroundColor: mainColor }}
              >
                {t.settings.saveLanguage}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ThemeLanguageSettings
