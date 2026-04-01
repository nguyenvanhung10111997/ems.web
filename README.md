# ems.web

Education Management System - A modern web application built with React, TypeScript, and Vite.

## Tech Stack

- **ReactJS** - UI Library
- **Vite** - Build Tool
- **TypeScript** - Type Safety
- **TailwindCSS** - Styling
- **Vitest** - Testing Framework
- **Zustand** - State Management
- **Prettier** - Code Formatter

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
ems.web/
├── src/
│   ├── components/      # React components
│   ├── store/          # Zustand stores
│   ├── test/           # Test setup files
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── tailwind.config.js  # TailwindCSS configuration
```

## Features

### Core Features
- 👥 **Multi-role System**: Admin, Teacher, and Student portals
- 📊 **Dashboard**: Role-specific dashboards with statistics
- 📚 **Course Management**: Create, manage, and enroll in courses
- 📁 **Resources Library**: Document, video, and resource management
- 🎓 **Lectures**: Video lectures and live streaming
- 📝 **Assignments**: Create, submit, and grade assignments
- 📈 **Progress Tracking**: Track student progress and performance
- 💬 **Chat System**: Real-time communication between teachers and students
- 📅 **Calendar**: Schedule management and deadlines
- ⚙️ **Settings**: User and system configuration

### Technical Features
- ⚡ Fast development with Vite
- 🎨 Beautiful UI with TailwindCSS (Sky Blue theme)
- 🔒 Type-safe with TypeScript
- 🧪 Tested with Vitest
- 📦 Simple state management with Zustand
- ✨ Code formatting with Prettier
- 🎨 Figma design workflow integration

## Documentation

- [Feature Specification](docs/EMS_FEATURES.md) - Complete feature list
- [Design System](docs/EMS_DESIGN_SYSTEM.md) - Colors, typography, components
- [Implementation Plan](docs/EMS_IMPLEMENTATION_PLAN.md) - Development roadmap
- [Figma Workflow](DESIGN_WORKFLOW.md) - Design-to-code process

## Figma Design Workflow

This project includes comprehensive Cursor rules for converting Figma designs to code:

- **Design Analysis**: Guidelines for extracting design tokens from Figma
- **Code Conversion**: Step-by-step process for converting designs to React components
- **Design Workflow**: Complete workflow for working with Figma designs

See [DESIGN_WORKFLOW.md](DESIGN_WORKFLOW.md) for detailed instructions on:
- How to extract design specs from Figma
- Requesting component conversions
- Design token management
- Best practices for Figma-to-code workflow

### Quick Start with Figma

1. Open your Figma design
2. Use Figma's Inspect panel to extract design specs
3. Share design information with AI assistant (link, screenshot, or specs)
4. Request component conversion following the format in [DESIGN_WORKFLOW.md](DESIGN_WORKFLOW.md)

## License

MIT
