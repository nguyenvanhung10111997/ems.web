# EMS Figma Design Specification

This document provides detailed specifications for creating the EMS design in Figma.

## File Structure

### Pages
1. **Design System** - Colors, typography, components
2. **Dashboard** - All dashboard variations
3. **Courses** - Course list and detail pages
4. **Resources** - Resource library
5. **Assignments** - Assignment pages
6. **Components** - Reusable UI components

## Design System Page

### Color Styles
Create these as Figma Color Styles:

#### Primary Colors
- **Sky Blue**: `#87CEEB` (Primary)
- **Sky Blue Light**: `#B3E5FC`
- **Sky Blue Dark**: `#0288D1`
- **Sky Blue Accent**: `#03A9F4`

#### Background Colors
- **White**: `#FFFFFF` (Main background)
- **Gray 50**: `#FAFAFA` (Secondary background)
- **Gray 100**: `#F5F5F5` (Card backgrounds)

#### Text Colors
- **Primary Text**: `#212121`
- **Secondary Text**: `#757575`
- **Muted Text**: `#9E9E9E`

#### Status Colors
- **Success**: `#4CAF50`
- **Warning**: `#FF9800`
- **Error**: `#F44336`
- **Info**: `#2196F3`

### Text Styles
Create these as Figma Text Styles:

- **H1**: Inter, 32px, Bold, #212121
- **H2**: Inter, 24px, Bold, #212121
- **H3**: Inter, 20px, Semibold, #212121
- **H4**: Inter, 18px, Semibold, #212121
- **Body**: Inter, 16px, Regular, #212121
- **Small**: Inter, 14px, Regular, #757575
- **XSmall**: Inter, 12px, Regular, #9E9E9E

### Component Library

#### Buttons
- **Primary Button**: Sky Blue background (#87CEEB), White text, 12px padding, 8px radius
- **Secondary Button**: White background, Sky Blue border, Sky Blue text
- **Ghost Button**: Transparent, Sky Blue text

#### Cards
- White background
- Shadow: 0px 2px 8px rgba(0,0,0,0.1)
- Border radius: 8px
- Padding: 16px-24px

#### Inputs
- White background
- Border: 1px solid #E0E0E0
- Focus border: 2px solid #87CEEB
- Border radius: 6px
- Padding: 12px 16px

## Dashboard Page

### Frame: Student Dashboard (1440x1024)
- Background: #FAFAFA

#### Header Section (1440x80)
- Background: White
- Shadow: 0px 1px 3px rgba(0,0,0,0.1)
- Logo: 40x40, Sky Blue (#87CEEB), rounded 8px
- Title: "Education Management System"
- User avatar: 40x40 circle, Sky Blue background

#### Sidebar (256x944)
- Background: White
- Border right: 1px solid #E0E0E0
- Navigation items:
  - Dashboard (active - Sky Blue background)
  - Courses
  - Resources
  - Lectures
  - Assignments
  - Progress
  - Chat
  - Calendar
  - Settings

#### Main Content Area (1184x944)
- Padding: 24px

##### Welcome Section
- Title: "Welcome back, [Name]!"
- Subtitle: "Here's what's happening today"

##### Stats Grid (4 columns)
- **Total Courses Card**
  - Icon: 📚 (48x48, Sky Blue background)
  - Value: "12"
  - Label: "Total Courses"
  - Trend: ↑ 12%

- **Pending Assignments Card**
  - Icon: 📝 (48x48, Orange background)
  - Value: "5"
  - Label: "Pending Assignments"

- **Completed Courses Card**
  - Icon: ✅ (48x48, Green background)
  - Value: "8"
  - Label: "Completed Courses"

- **Average Score Card**
  - Icon: ⭐ (48x48, Green background)
  - Value: "87%"
  - Label: "Average Score"
  - Trend: ↑ 5%

##### Activity Feed Section (Left, 50% width)
- Title: "Recent Activity"
- List of activities with icons and timestamps

##### Upcoming Deadlines Section (Right, 50% width)
- Title: "Upcoming Deadlines"
- List of assignments with due dates

## Course List Page

### Frame: Course List (1440x1024)
- Same header and sidebar as dashboard

#### Main Content
- Title: "My Courses"
- Filter bar: Search, Category filter, Sort dropdown
- Course grid (3 columns):
  - Course card (384x320):
    - Thumbnail image (384x180)
    - Course title
    - Instructor name
    - Progress bar
    - Enrolled students count
    - "Continue Learning" button

## Component Specifications

### StatCard Component
- Width: 280px
- Height: 160px
- Background: White
- Border: 1px solid #E0E0E0
- Border radius: 8px
- Padding: 24px
- Shadow: 0px 2px 4px rgba(0,0,0,0.05)

### CourseCard Component
- Width: 384px
- Height: 320px
- Background: White
- Border radius: 12px
- Shadow: 0px 4px 12px rgba(0,0,0,0.1)
- Thumbnail: 384x180px
- Content padding: 16px

### Navigation Item Component
- Width: 224px
- Height: 48px
- Padding: 12px 16px
- Border radius: 8px
- Active state: Sky Blue background (#87CEEB), White text
- Inactive state: Transparent, Gray text

## Spacing System

Use 4px grid:
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px

## Layout Guidelines

- Container max width: 1280px
- Sidebar width: 256px
- Header height: 80px
- Card padding: 16px-24px
- Section spacing: 24px-32px
