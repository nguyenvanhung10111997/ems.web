import React from 'react'
import { darkenColor } from '../../utils/themeUtils'
import useThemeStore from '../../store/useThemeStore'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { mainColor } = useThemeStore()

  const baseStyles =
    'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const getVariantStyles = (): {
    backgroundColor: string
    color: string
    hoverColor?: string
    hoverBackground?: string
    borderColor?: string
    focusRing: string
  } => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: mainColor,
          color: '#ffffff',
          hoverColor: darkenColor(mainColor, 10),
          focusRing: mainColor,
        }
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: mainColor,
          color: mainColor,
          hoverBackground: `${mainColor}15`,
          focusRing: mainColor,
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: mainColor,
          hoverBackground: `${mainColor}15`,
          focusRing: mainColor,
        }
      case 'danger':
        return {
          backgroundColor: '#ef4444',
          color: '#ffffff',
          hoverColor: '#dc2626',
          focusRing: '#ef4444',
        }
      default:
        return {
          backgroundColor: mainColor,
          color: '#ffffff',
          hoverColor: darkenColor(mainColor, 10),
          focusRing: mainColor,
        }
    }
  }

  const variantStyle = getVariantStyles()

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-4 py-2 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base sm:text-lg',
  }

  const buttonStyle: React.CSSProperties = {
    ...style,
    ...(variant === 'primary' && {
      backgroundColor: variantStyle.backgroundColor,
      color: variantStyle.color,
    }),
    ...(variant === 'secondary' && {
      borderColor: variantStyle.borderColor,
      color: variantStyle.color,
      borderWidth: '2px',
    }),
    ...(variant === 'ghost' && {
      color: variantStyle.color,
    }),
    ...(variant === 'danger' && {
      backgroundColor: variantStyle.backgroundColor,
      color: variantStyle.color,
    }),
  }

  const hoverClass =
    variant === 'primary' || variant === 'danger'
      ? ''
      : variant === 'secondary'
        ? 'hover:bg-opacity-10'
        : 'hover:bg-opacity-10'

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${hoverClass} ${className}`}
      style={buttonStyle}
      disabled={disabled || isLoading}
      onMouseEnter={(e) => {
        if (variant === 'primary' && !disabled && !isLoading) {
          e.currentTarget.style.backgroundColor = variantStyle.hoverColor || variantStyle.backgroundColor
        } else if (variant === 'danger' && !disabled && !isLoading) {
          e.currentTarget.style.backgroundColor = variantStyle.hoverColor || variantStyle.backgroundColor
        } else if (
          (variant === 'secondary' || variant === 'ghost') &&
          !disabled &&
          !isLoading
        ) {
          e.currentTarget.style.backgroundColor = variantStyle.hoverBackground || 'transparent'
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary' && !disabled && !isLoading) {
          e.currentTarget.style.backgroundColor = variantStyle.backgroundColor
        } else if (variant === 'danger' && !disabled && !isLoading) {
          e.currentTarget.style.backgroundColor = variantStyle.backgroundColor
        } else if (
          (variant === 'secondary' || variant === 'ghost') &&
          !disabled &&
          !isLoading
        ) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
