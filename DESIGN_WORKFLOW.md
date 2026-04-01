# Figma Design Workflow Guide

This guide explains how to work with Figma designs and convert them to code in this project.

## Quick Start

1. **Open your Figma design** in Figma Desktop or web
2. **Extract design specs** using Figma's Inspect panel
3. **Share design information** with AI assistant:
   - Figma file link (if shareable)
   - Screenshots of the design
   - Design specifications (colors, spacing, typography)
4. **Request component conversion** following the format below

## How to Request Component Conversion

### Option 1: Share Figma Link
```
Convert this Figma design to a React component:
[Figma file link]

Component requirements:
- Reusable with props
- TypeScript types
- TailwindCSS styling
- Responsive design
```

### Option 2: Provide Design Specs
```
Create a React component based on these Figma specs:

Card Component:
- Width: 400px (max-w-md)
- Padding: 24px (p-6)
- Background: White
- Border radius: 8px (rounded-lg)
- Shadow: Medium (shadow-md)

Header:
- Font size: 24px (text-2xl)
- Font weight: Bold
- Color: Gray-900

Body text:
- Font size: 16px (text-base)
- Color: Gray-600
```

### Option 3: Screenshot Analysis
```
Analyze this Figma design screenshot and create a React component:
[Attach screenshot]

Requirements:
- Follow project code conventions
- Use TypeScript
- Implement with TailwindCSS
- Add hover/focus states
- Make it responsive
```

## Design Token Extraction

### Colors
When you find colors in Figma:
1. Copy the hex code from the Inspect panel
2. Check if it exists in Tailwind's default palette
3. If not, we'll add it to `tailwind.config.js`

### Typography
Map Figma text sizes to Tailwind:
- 12px → `text-xs`
- 14px → `text-sm`
- 16px → `text-base`
- 18px → `text-lg`
- 20px → `text-xl`
- 24px → `text-2xl`
- 30px → `text-3xl`
- 36px → `text-4xl`

### Spacing
Map Figma spacing to Tailwind:
- 4px → `1` (p-1, m-1)
- 8px → `2` (p-2, m-2)
- 12px → `3` (p-3, m-3)
- 16px → `4` (p-4, m-4)
- 24px → `6` (p-6, m-6)
- 32px → `8` (p-8, m-8)
- 48px → `12` (p-12, m-12)

## Using Figma's Inspect Panel

1. **Select an element** in Figma
2. **Open Inspect panel** (right sidebar, or press `Shift + I`)
3. **Extract information**:
   - Dimensions (width, height)
   - Spacing (padding, margin)
   - Typography (font, size, weight)
   - Colors (hex codes)
   - Effects (shadows, blur)
   - Layout (flexbox properties)

## Component Conversion Process

The AI assistant will follow this process (automated via Cursor rules):

1. **Analyze Design** - Extract all design tokens and specifications
2. **Plan Structure** - Determine component hierarchy and file organization
3. **Create Component** - Build React/TypeScript component with TailwindCSS
4. **Add Interactivity** - Implement hover, focus, and click states
5. **Make Responsive** - Add mobile-first responsive design
6. **Add Types** - Define TypeScript interfaces
7. **Write Tests** - Create component tests
8. **Format Code** - Apply Prettier formatting

## Example Request

```
I need to convert a user profile card from Figma:

Design specs:
- Container: 400px wide, white bg, 24px padding, 8px radius, shadow
- Avatar: 80px circle, top center
- Name: 24px bold, gray-900, centered
- Email: 16px, gray-600, centered
- Bio: 14px, gray-500, centered, max 2 lines
- Button: Primary blue, full width, 12px padding

States needed:
- Button hover: darker blue
- Button focus: ring-2 ring-blue-500

Make it responsive:
- Mobile: full width
- Desktop: max 400px, centered

Create as a reusable component with props for:
- avatar (image URL)
- name (string)
- email (string)
- bio (string, optional)
- onButtonClick (function)
```

## Tips

1. **Be Specific**: Provide exact values from Figma's Inspect panel
2. **Include States**: Mention hover, active, focus, disabled states if they exist
3. **Responsive**: Specify if design has mobile/tablet/desktop variants
4. **Interactivity**: Describe any animations or interactions
5. **Accessibility**: Mention if design has specific accessibility requirements

## Design System Integration

If your Figma file uses:
- **Variables**: We can extract and add to Tailwind config
- **Component Variants**: We'll create React component props
- **Design Tokens**: We'll map to Tailwind utilities or custom config

## Getting Help

If you're unsure about design specs:
1. Use Figma's Inspect panel to get exact values
2. Take screenshots of the design
3. Share the Figma file link (if possible)
4. Describe what you see in the design

The AI assistant will use the Cursor rules to automatically:
- Follow code conventions
- Use proper TypeScript types
- Apply TailwindCSS patterns
- Create test files
- Format code with Prettier
