import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../../components/common/Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('associates label with input', () => {
    render(<Input label="Username" id="username" />)
    const input = screen.getByLabelText(/username/i)
    expect(input).toHaveAttribute('id', 'username')
  })

  it('displays error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  it('displays helper text when no error', () => {
    render(<Input helperText="Enter your email address" />)
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument()
  })

  it('does not display helper text when error is present', () => {
    render(
      <Input
        helperText="Helper text"
        error="Error message"
      />
    )
    expect(screen.queryByText(/helper text/i)).not.toBeInTheDocument()
    expect(screen.getByText(/error message/i)).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const user = userEvent.setup()
    render(<Input />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.type(input, 'test@example.com')
    expect(input.value).toBe('test@example.com')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  it('passes through input props', () => {
    render(
      <Input
        type="email"
        placeholder="Enter email"
        required
        data-testid="email-input"
      />
    )
    const input = screen.getByTestId('email-input')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Enter email')
    expect(input).toBeRequired()
  })

  it('generates unique id when not provided', () => {
    const { container } = render(<Input label="Test" />)
    const input = container.querySelector('input')
    const label = container.querySelector('label')
    expect(input?.id).toBeTruthy()
    expect(label?.getAttribute('for')).toBe(input?.id)
  })
})
