import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import GlobalLoader from '../../components/common/GlobalLoader'
import useLoadingStore from '../../store/useLoadingStore'

describe('GlobalLoader', () => {
  beforeEach(() => {
    useLoadingStore.setState({
      isLoading: false,
      loadingMessage: undefined,
    })
  })

  it('does not render when isLoading is false', () => {
    render(<GlobalLoader />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders when isLoading is true', () => {
    useLoadingStore.setState({ isLoading: true })
    render(<GlobalLoader />)
    const { container } = render(<GlobalLoader />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('displays loading message', () => {
    useLoadingStore.setState({
      isLoading: true,
      loadingMessage: 'Loading courses...',
    })
    render(<GlobalLoader />)
    expect(screen.getByText(/loading courses/i)).toBeInTheDocument()
  })

  it('renders full screen overlay', () => {
    useLoadingStore.setState({ isLoading: true })
    const { container } = render(<GlobalLoader />)
    expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument()
  })
})
