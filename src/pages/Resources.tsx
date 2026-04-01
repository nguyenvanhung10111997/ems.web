import { useState } from 'react'
import useResourceStore, { type Resource } from '../store/useResourceStore'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import useThemeStore from '../store/useThemeStore'

function Resources() {
  const { resources } = useResourceStore()
  const { textPrimaryColor, textSecondaryColor, backgroundColor } = useThemeStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<Resource['type'] | 'all'>(
    'all'
  )
  
  // Determine if we're in dark mode
  const isDarkMode = backgroundColor && 
    (backgroundColor.toLowerCase() === '#0f172a' || 
     backgroundColor.toLowerCase().startsWith('#0') ||
     backgroundColor.toLowerCase().startsWith('#1'))
  
  const selectBg = isDarkMode ? '#1e293b' : '#ffffff'
  const selectBorder = isDarkMode ? '#334155' : '#e5e7eb'
  const selectText = textPrimaryColor

  const categories = Array.from(
    new Set(resources.map((r) => r.category))
  )

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return '📄'
      case 'video':
        return '🎥'
      case 'audio':
        return '🎵'
      case 'image':
        return '🖼️'
      case 'link':
        return '🔗'
      default:
        return '📁'
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-2xl font-bold"
            style={{ color: textPrimaryColor }}
          >
            Learning Resources
          </h2>
          <p 
            className="mt-1"
            style={{ color: textSecondaryColor }}
          >
            Access documents, videos, and other learning materials
          </p>
        </div>
        <Button variant="primary">Upload Resource</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
          style={{
            backgroundColor: selectBg,
            borderColor: selectBorder,
            color: selectText,
          }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
          style={{
            backgroundColor: selectBg,
            borderColor: selectBorder,
            color: selectText,
          }}
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value as Resource['type'] | 'all')
          }
        >
          <option value="all">All Types</option>
          <option value="document">Documents</option>
          <option value="video">Videos</option>
          <option value="audio">Audio</option>
          <option value="image">Images</option>
          <option value="link">Links</option>
        </select>
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: textSecondaryColor }}>No resources found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{getTypeIcon(resource.type)}</div>
                <div className="flex-1">
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: textPrimaryColor }}
                  >
                    {resource.title}
                  </h3>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: textSecondaryColor }}
                  >
                    {resource.category}
                  </p>
                  <div 
                    className="flex items-center gap-4 text-xs"
                    style={{ color: textSecondaryColor }}
                  >
                    {resource.size && <span>📦 {resource.size}</span>}
                    {resource.duration && <span>⏱️ {resource.duration}</span>}
                    {resource.downloads && (
                      <span>⬇️ {resource.downloads} downloads</span>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="primary" size="sm">
                      Download
                    </Button>
                    <Button variant="secondary" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Resources
