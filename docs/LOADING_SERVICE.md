# LoadingService - Global Loading Helper

## Overview

`LoadingService` is a simple, global service for managing loading state throughout the EMS application. It provides a clean API with just two methods: `show()` and `hide()`.

## Location

**File**: `src/services/LoadingService.ts`

## Features

- ✅ **Simple API**: Just `show()` and `hide()` methods
- ✅ **Global Access**: Use anywhere without React hooks
- ✅ **TypeScript**: Fully typed
- ✅ **Reusable**: Single import, use everywhere

## Basic Usage

### Import

```typescript
import LoadingService from '../services/LoadingService'
// or
import { LoadingService } from '../services/LoadingService'
```

### Show Loading

```typescript
// Show loading with message
LoadingService.show('Loading data...')

// Show loading without message
LoadingService.show()
```

### Hide Loading

```typescript
// Hide loading spinner
LoadingService.hide()
```

### Complete Example

```typescript
import LoadingService from '../services/LoadingService'

async function fetchData() {
  LoadingService.show('Loading data...')
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  } finally {
    LoadingService.hide() // Always hide, even on error
  }
}
```

## Real-World Examples

### Example 1: Component Data Loading

```typescript
import { useEffect } from 'react'
import LoadingService from '../services/LoadingService'
import useCourseStore from '../store/useCourseStore'

function CoursesPage() {
  const { setCourses } = useCourseStore()

  useEffect(() => {
    const loadCourses = async () => {
      LoadingService.show('Loading courses...')
      try {
        const response = await fetch('/api/courses')
        const courses = await response.json()
        setCourses(courses)
      } finally {
        LoadingService.hide()
      }
    }
    loadCourses()
  }, [])
}
```

### Example 2: Form Submission

```typescript
import LoadingService from '../services/LoadingService'

async function handleSubmit(formData: FormData) {
  LoadingService.show('Submitting form...')
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) throw new Error('Submission failed')
    const result = await response.json()
    toast.success('Form submitted successfully!')
    return result
  } catch (error) {
    toast.error(`Error: ${error.message}`)
    throw error
  } finally {
    LoadingService.hide()
  }
}
```

### Example 3: Multiple Operations

```typescript
import LoadingService from '../services/LoadingService'

async function loadDashboardData() {
  LoadingService.show('Loading dashboard...')
  try {
    const [courses, assignments, progress] = await Promise.all([
      fetch('/api/courses').then(r => r.json()),
      fetch('/api/assignments').then(r => r.json()),
      fetch('/api/progress').then(r => r.json()),
    ])
    
    setCourses(courses)
    setAssignments(assignments)
    setProgress(progress)
  } finally {
    LoadingService.hide()
  }
}
```

### Example 4: Using with API Utilities

The `api` object in `src/utils/api.ts` already uses LoadingService:

```typescript
import { api } from '../utils/api'

// Automatically shows/hides loading
const courses = await api.fetchCourses()
const assignments = await api.fetchAssignments()
```

## API Reference

### Methods

#### `show(message?: string): void`
Show loading spinner with optional message.

```typescript
LoadingService.show('Loading courses...')
LoadingService.show() // No message
```

#### `hide(): void`
Hide loading spinner.

```typescript
LoadingService.hide()
```

## Best Practices

1. **Always use try/finally**: Ensure `hide()` is called even on errors
   ```typescript
   LoadingService.show('Loading...')
   try {
     await fetchData()
   } finally {
     LoadingService.hide() // Always called
   }
   ```

2. **Provide meaningful messages**: Help users understand what's happening
   ```typescript
   LoadingService.show('Submitting assignment...')
   ```

3. **Use API utilities when possible**: The `api` object handles loading automatically
   ```typescript
   // This automatically shows/hides loading
   await api.fetchCourses()
   ```

4. **Don't nest loading calls**: Only one loading spinner at a time

## Integration

The service is already integrated with:
- ✅ `src/utils/api.ts` - All API functions use LoadingService
- ✅ `src/pages/Courses.tsx` - Uses via api.fetchCourses()
- ✅ `src/pages/Assignments.tsx` - Uses via api.submitAssignment()
- ✅ `src/hooks/useAsyncOperation.ts` - Uses LoadingService internally

## Testing

Tests are available in:
- `src/__tests__/services/LoadingService.test.ts`

Run tests with:
```bash
npm run test
```

## Migration Guide

If you're currently using the store directly:

**Before:**
```typescript
const { startLoading, stopLoading } = useLoadingStore()
startLoading('Loading...')
try {
  await fetchData()
} finally {
  stopLoading()
}
```

**After:**
```typescript
import LoadingService from '../services/LoadingService'

LoadingService.show('Loading...')
try {
  await fetchData()
} finally {
  LoadingService.hide()
}
```
