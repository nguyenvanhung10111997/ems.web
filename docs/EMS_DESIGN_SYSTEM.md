# EMS Design System

## Color Palette

### Primary Colors
- **Sky Blue (Primary)**: `#87CEEB` or `#4FC3F7`
- **Sky Blue Light**: `#B3E5FC`
- **Sky Blue Dark**: `#0288D1`
- **Sky Blue Accent**: `#03A9F4`

### Background Colors
- **White**: `#FFFFFF` (Main background)
- **Gray 50**: `#FAFAFA` (Secondary background)
- **Gray 100**: `#F5F5F5` (Card backgrounds)

### Text Colors
- **Primary Text**: `#212121` (Dark gray)
- **Secondary Text**: `#757575` (Medium gray)
- **Muted Text**: `#9E9E9E` (Light gray)
- **White Text**: `#FFFFFF` (On colored backgrounds)

### Status Colors
- **Success**: `#4CAF50` (Green)
- **Warning**: `#FF9800` (Orange)
- **Error**: `#F44336` (Red)
- **Info**: `#2196F3` (Blue)

## Typography

### Font Families
- **Primary**: Inter, system-ui, sans-serif
- **Headings**: Inter, system-ui, sans-serif
- **Monospace**: 'Courier New', monospace (for code)

### Font Sizes
- **H1**: 32px (2rem) - Page titles
- **H2**: 24px (1.5rem) - Section titles
- **H3**: 20px (1.25rem) - Subsection titles
- **H4**: 18px (1.125rem) - Card titles
- **Body**: 16px (1rem) - Default text
- **Small**: 14px (0.875rem) - Secondary text
- **XSmall**: 12px (0.75rem) - Labels, captions

### Font Weights
- **Bold**: 700 - Headings
- **Semibold**: 600 - Subheadings
- **Medium**: 500 - Emphasis
- **Regular**: 400 - Body text

## Spacing System

Based on 4px grid:
- **XS**: 4px (0.25rem)
- **SM**: 8px (0.5rem)
- **MD**: 16px (1rem)
- **LG**: 24px (1.5rem)
- **XL**: 32px (2rem)
- **2XL**: 48px (3rem)
- **3XL**: 64px (4rem)

## Component Styles

### Buttons
- **Primary**: Sky blue background, white text
- **Secondary**: White background, sky blue border
- **Ghost**: Transparent, sky blue text
- **Danger**: Red background for destructive actions

### Cards
- White background
- Subtle shadow (shadow-md)
- Border radius: 8px (rounded-lg)
- Padding: 16px-24px

### Inputs
- White background
- Sky blue border on focus
- Border radius: 6px (rounded-md)
- Padding: 12px 16px

### Navigation
- White background
- Sky blue active state
- Clean, minimal design

## Layout

### Container
- Max width: 1280px (7xl)
- Padding: 16px-24px on mobile, 32px on desktop
- Centered layout

### Grid System
- 12-column grid
- Responsive breakpoints:
  - Mobile: < 640px (1 column)
  - Tablet: 640px - 1024px (2-3 columns)
  - Desktop: > 1024px (3-4 columns)

## Shadows

- **Small**: `shadow-sm` - Subtle elevation
- **Medium**: `shadow-md` - Cards, modals
- **Large**: `shadow-lg` - Dropdowns, popovers
- **XL**: `shadow-xl` - Modals, dialogs

## Border Radius

- **Small**: 4px (rounded-sm)
- **Medium**: 8px (rounded-md) - Default
- **Large**: 12px (rounded-lg) - Cards
- **Full**: 9999px (rounded-full) - Pills, avatars

## Icons

- **Size**: 16px, 20px, 24px
- **Style**: Outline style (not filled)
- **Library**: Heroicons or similar

## Animations

- **Transitions**: 200ms ease-in-out
- **Hover**: Scale 1.02 or color change
- **Loading**: Smooth spinner animations
