import { useRef, useState, useEffect } from 'react'
import useThemeStore from '../../store/useThemeStore'

interface TabsProps {
  tabs: Array<{ id: string; label: string; icon?: string }>
  activeTab: string
  onTabChange: (tabId: string) => void
}

function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const { mainColor } = useThemeStore()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      return () => {
        container.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll =
        direction === 'left'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="border-b border-gray-200 relative">
      {/* Left Arrow - Mobile Only */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-white to-transparent hover:from-gray-50 flex items-center justify-center lg:hidden transition-all"
          aria-label="Scroll left"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: mainColor }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
        </button>
      )}

      {/* Right Arrow - Mobile Only */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-white to-transparent hover:from-gray-50 flex items-center justify-center lg:hidden transition-all"
          aria-label="Scroll right"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: mainColor }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </button>
      )}

      <nav
        ref={scrollContainerRef}
        className="flex space-x-1 overflow-x-auto scrollbar-hide"
        aria-label="Tabs"
        style={{
          paddingLeft: canScrollLeft ? '2.5rem' : '0',
          paddingRight: canScrollRight ? '2.5rem' : '0',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors
              border-b-2
              ${
                activeTab === tab.id
                  ? 'text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
            style={
              activeTab === tab.id
                ? {
                    borderBottomColor: mainColor,
                    color: mainColor,
                  }
                : {}
            }
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Tabs
