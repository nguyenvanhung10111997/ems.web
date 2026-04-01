import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../../components/common/Modal'

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    )
    expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    )
    expect(screen.getByText(/modal content/i)).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Modal Title">
        <p>Content</p>
      </Modal>
    )
    expect(screen.getByText(/modal title/i)).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Title">
        <p>Content</p>
      </Modal>
    )

    const closeButton = screen.getByText('×')
    await user.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    )

    const backdrop = container.querySelector('.bg-black')
    if (backdrop) {
      await user.click(backdrop)
      expect(handleClose).toHaveBeenCalledTimes(1)
    }
  })

  it('does not call onClose when modal content is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    )

    const content = screen.getByText(/content/i)
    await user.click(content)
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('applies small size', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="sm">
        <p>Content</p>
      </Modal>
    )
    expect(container.querySelector('.max-w-md')).toBeInTheDocument()
  })

  it('applies medium size by default', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    )
    expect(container.querySelector('.max-w-lg')).toBeInTheDocument()
  })

  it('applies large size', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="lg">
        <p>Content</p>
      </Modal>
    )
    expect(container.querySelector('.max-w-2xl')).toBeInTheDocument()
  })

  it('applies extra large size', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="xl">
        <p>Content</p>
      </Modal>
    )
    expect(container.querySelector('.max-w-4xl')).toBeInTheDocument()
  })
})
