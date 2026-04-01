import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText(/card content/i)).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <Card title="Card Title">
        <p>Content</p>
      </Card>
    )
    expect(screen.getByText(/card title/i)).toBeInTheDocument()
  })

  it('renders with action', () => {
    render(
      <Card
        title="Card Title"
        action={<Button>Action</Button>}
      >
        <p>Content</p>
      </Card>
    )
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('renders header when title or action is provided', () => {
    render(
      <Card title="Title">
        <p>Content</p>
      </Card>
    )
    const title = screen.getByText(/title/i)
    expect(title.closest('div')).toHaveClass('border-b')
  })

  it('does not render header when no title or action', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    )
    expect(container.querySelector('.border-b')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-card">
        <p>Content</p>
      </Card>
    )
    expect(container.firstChild).toHaveClass('custom-card')
  })

  it('has correct base styles', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    )
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm')
  })
})
