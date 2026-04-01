/**
 * Design Tokens extracted from Figma
 * 
 * This file can be used to store design tokens that don't map directly
 * to Tailwind's default palette. Add custom colors, spacing, or other
 * design values here and reference them in tailwind.config.js
 */

// Example: Custom brand colors from Figma
export const brandColors = {
  primary: '#0066FF',
  secondary: '#00CC99',
  accent: '#FF6B6B',
}

// Example: Custom spacing values from Figma
export const customSpacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
}

// Example: Typography scale from Figma
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
}

/**
 * Helper function to convert Figma pixel values to Tailwind spacing scale
 * 
 * @param pixels - Pixel value from Figma
 * @returns Tailwind spacing value (1-96)
 * 
 * @example
 * figmaToTailwind(16) // returns 4 (16px = 1rem = Tailwind's 4)
 */
export function figmaToTailwind(pixels: number): number {
  // Tailwind spacing scale: 1 = 0.25rem = 4px
  return Math.round(pixels / 4)
}

/**
 * Helper function to check if a color exists in Tailwind's default palette
 * 
 * @param hex - Hex color code from Figma
 * @returns Object with closest Tailwind color or custom flag
 */
export function mapFigmaColorToTailwind(hex: string): {
  tailwindColor?: string
  isCustom: boolean
  hex: string
} {
  // This is a simplified version - in practice, you'd have a full color mapping
  // For now, return the hex and flag as custom
  return {
    isCustom: true,
    hex: hex.toUpperCase(),
  }
}
