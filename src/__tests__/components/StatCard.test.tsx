import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatCard from '../../components/dashboard/StatCard'

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Total Courses" value={12} icon="📚" />)
    expect(screen.getByText(/total courses/i)).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(<StatCard title="Test" value={10} icon="📊" />)
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('renders with string value', () => {
    render(<StatCard title="Score" value="87%" icon="⭐" />)
    expect(screen.getByText('87%')).toBeInTheDocument()
  })

  it('renders positive trend', () => {
    render(
      <StatCard
        title="Growth"
        value={100}
        icon="📈"
        trend={{ value: 12, isPositive: true }}
      />
    )
    expect(screen.getByText(/↑ 12%/i)).toBeInTheDocument()
  })

  it('renders negative trend', () => {
    render(
      <StatCard
        title="Decline"
        value={50}
        icon="📉"
        trend={{ value: 5, isPositive: false }}
      />
    )
    expect(screen.getByText(/↓ 5%/i)).toBeInTheDocument()
  })

  it('applies sky color by default', () => {
    const { container } = render(
      <StatCard title="Test" value={10} icon="📊" />
    )
    expect(container.querySelector('.bg-sky-50')).toBeInTheDocument()
  })

  it('applies green color', () => {
    const { container } = render(
      <StatCard title="Test" value={10} icon="✅" color="green" />
    )
    expect(container.querySelector('.bg-green-50')).toBeInTheDocument()
  })

  it('applies orange color', () => {
    const { container } = render(
      <StatCard title="Test" value={10} icon="⚠️" color="orange" />
    )
    expect(container.querySelector('.bg-orange-50')).toBeInTheDocument()
  })

  it('applies purple color', () => {
    const { container } = render(
      <StatCard title="Test" value={10} icon="🎓" color="purple" />
    )
    expect(container.querySelector('.bg-purple-50')).toBeInTheDocument()
  })

  it('does not render trend when not provided', () => {
    const { container } = render(
      <StatCard title="Test" value={10} icon="📊" />
    )
    expect(container.querySelector('.text-green-600, .text-red-600')).not.toBeInTheDocument()
  })
})
