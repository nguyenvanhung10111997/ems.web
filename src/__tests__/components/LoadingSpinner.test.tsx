import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../../components/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders spinner', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders with message', () => {
    render(<LoadingSpinner message="Loading data..." />)
    expect(screen.getByText(/loading data/i)).toBeInTheDocument()
  })

  it('applies small size', () => {
    const { container } = render(<LoadingSpinner size="sm" />)
    expect(container.querySelector('.h-4')).toBeInTheDocument()
  })

  it('applies medium size by default', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('.h-8')).toBeInTheDocument()
  })

  it('applies large size', () => {
    const { container } = render(<LoadingSpinner size="lg" />)
    expect(container.querySelector('.h-12')).toBeInTheDocument()
  })

  it('renders full screen overlay when fullScreen is true', () => {
    const { container } = render(<LoadingSpinner fullScreen />)
    expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument()
  })

  it('does not render overlay when fullScreen is false', () => {
    const { container } = render(<LoadingSpinner fullScreen={false} />)
    expect(container.querySelector('.fixed.inset-0')).not.toBeInTheDocument()
  })
})
