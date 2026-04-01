# Creating EMS Design in Figma - Step by Step Guide

## 🎯 Your Figma File
**File Key**: `3V3O2tThmEaLMDzOEcG2WW`  
**URL**: https://www.figma.com/file/3V3O2tThmEaLMDzOEcG2WW/EMS

## ⚠️ Important Note

The Figma REST API has limited write capabilities, so I cannot directly create designs in your Figma file. However, I've created comprehensive specifications that you can use to build the design quickly.

## 📋 Quick Creation Guide

### Step 1: Open Your Figma File
1. Go to: https://www.figma.com/file/3V3O2tThmEaLMDzOEcG2WW/EMS
2. You should see "Page 1" (currently empty)

### Step 2: Create Design System Page

1. **Add a new page**: Click "+" next to "Page 1", name it "Design System"

2. **Create Color Styles**:
   - Select a rectangle
   - Fill with `#87CEEB`
   - In the right panel, click the "Style" icon (4 dots)
   - Click "+" to create new color style
   - Name it: "Primary / Sky Blue"
   - Repeat for:
     - `#B3E5FC` → "Primary / Sky Blue Light"
     - `#0288D1` → "Primary / Sky Blue Dark"
     - `#FFFFFF` → "Background / White"
     - `#FAFAFA` → "Background / Gray 50"
     - `#212121` → "Text / Primary"
     - `#757575` → "Text / Secondary"

3. **Create Text Styles**:
   - Add text "Heading 1"
   - Font: Inter, 32px, Bold, Color: #212121
   - Create text style: "H1 / Bold"
   - Repeat for H2 (24px), H3 (20px), Body (16px)

### Step 3: Create Dashboard Page

1. **Add new page**: Name it "Dashboard"

2. **Create Main Frame**:
   - Press `F` or select Frame tool
   - Choose "Desktop" (1440×1024)
   - Name it: "Student Dashboard"
   - Background: `#FAFAFA`

3. **Create Header** (inside the frame):
   - Frame: 1440×80px
   - Background: White
   - Effect: Drop shadow (0px, 1px, 3px, rgba(0,0,0,0.1))
   - Add logo: 40×40px rectangle, fill `#87CEEB`, corner radius 8px
   - Add text "EMS" in logo (white, bold)
   - Add title: "Education Management System" (20px, bold, #212121)
   - Add user avatar: 40×40px circle, fill `#87CEEB`

4. **Create Sidebar**:
   - Frame: 256×944px
   - Position: Left side (x: 0, y: 80)
   - Background: White
   - Border: Right, 1px, #E0E0E0
   - Add navigation items (see specs below)

5. **Create Main Content Area**:
   - Frame: 1184×944px
   - Position: Right of sidebar
   - Padding: 24px

### Step 4: Create StatCard Component

1. **Create Frame**: 280×160px
2. **Style**:
   - Background: White
   - Border: 1px, #E0E0E0
   - Corner radius: 8px
   - Effect: Drop shadow (0px, 2px, 4px, rgba(0,0,0,0.05))
3. **Add Content**:
   - Icon: 48×48px frame, background `#87CEEB`, corner radius 8px
   - Value: Large text (24px, bold)
   - Label: Small text (14px, gray)
4. **Make Component**: Right-click → "Create Component"
5. **Create Variants**: Different colors for different stat types

### Step 5: Build Dashboard Layout

1. **Welcome Section**:
   - Add text: "Welcome back, [Name]!" (H2)
   - Add subtitle: "Here's what's happening today" (Body, gray)

2. **Stats Grid**:
   - Use Auto Layout (horizontal, gap: 24px)
   - Add 4 StatCard components
   - Labels: "Total Courses", "Pending Assignments", "Completed Courses", "Average Score"

3. **Activity Feed** (Left):
   - Frame: 50% width
   - Title: "Recent Activity"
   - List items with icons and timestamps

4. **Upcoming Deadlines** (Right):
   - Frame: 50% width
   - Title: "Upcoming Deadlines"
   - List items with due dates

## 🎨 Color Palette (Copy These)

```
Primary Sky Blue: #87CEEB
Sky Blue Light: #B3E5FC
Sky Blue Dark: #0288D1
White: #FFFFFF
Gray 50: #FAFAFA
Text Primary: #212121
Text Secondary: #757575
Success: #4CAF50
Warning: #FF9800
Error: #F44336
```

## 📐 Key Dimensions

- **Container**: 1440px wide
- **Sidebar**: 256px wide
- **Header**: 80px tall
- **StatCard**: 280×160px
- **CourseCard**: 384×320px
- **Nav Item**: 224×48px

## 📚 Detailed Specifications

See these files for complete details:
- `docs/FIGMA_DESIGN_SPEC.md` - Full design specifications
- `scripts/figma-design-helper.md` - Step-by-step helper
- `figma-design-specs.json` - JSON structure reference

## 💡 Pro Tips

1. **Use Auto Layout**: Makes components responsive
2. **Create Components**: Reuse StatCard, NavItem, etc.
3. **Use Constraints**: Set elements to scale properly
4. **Name Layers**: Keep organized with clear names
5. **Use Variants**: For button states, nav active/inactive

## 🚀 Alternative: I Can Help You Build It

If you'd like, I can:
1. Create a Figma plugin that generates the design
2. Provide more detailed step-by-step instructions
3. Create additional component specifications
4. Help convert your designs back to React code

Just let me know what you'd prefer!
