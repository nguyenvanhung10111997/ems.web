# Global Loading System

## Overview

The EMS system includes a global loading spinner that automatically displays when data is being loaded. This provides a consistent user experience across all pages.

## Components

### 1. LoadingSpinner
A reusable spinner component with customizable size and message.

**Location**: `src/components/common/LoadingSpinner.tsx`

**Props**:
- `message?: string` - Optional loading message
- `size?: 'sm' | 'md' | 'lg'` - Spinner size (default: 'md')
- `fullScreen?: boolean` - Whether to show full-screen overlay (default: false)

**Usage**:
```tsx
<LoadingSpinner message="Loading courses..." size="lg" />
<LoadingSpinner fullScreen message="Please wait..." />
```

### 2. GlobalLoader
Global loader component that shows/hides based on loading store state.

**Location**: `src/components/common/GlobalLoader.tsx`

Automatically integrated into `App.tsx` - no manual setup needed.

### 3. useLoadingStore
Zustand store for managing global loading state.

**Location**: `src/store/useLoadingStore.ts`

**Methods**:
- `setLoading(isLoading: boolean, message?: string)` - Set loading state
- `startLoading(message?: string)` - Start loading
- `stopLoading()` - Stop loading

**Usage**:
```tsx
import useLoadingStore from '../store/useLoadingStore'

function MyComponent() {
  const { startLoading, stopLoading } = useLoadingStore()

  const handleLoad = async () => {
    startLoading('Loading data...')
    try {
      await fetchData()
    } finally {
      stopLoading()
    }
  }
}
```

## API Utilities

### apiCall Function
Wrapper function that automatically manages loading state for API calls.

**Location**: `src/utils/api.ts`

**Usage**:
```tsx
import { apiCall } from '../utils/api'

const data = await apiCall(
  async () => {
    const response = await fetch('/api/courses')
    return response.json()
  },
  'Loading courses...'
)
```

### Pre-built API Functions
The `api` object provides ready-to-use functions:

```tsx
import { api } from '../utils/api'

// These automatically show loading spinner
await api.fetchCourses()
await api.fetchAssignments()
await api.submitAssignment(assignmentId)
await api.enrollInCourse(courseId)
```

## Usage Examples

### Example 1: Manual Loading Control

```tsx
import useLoadingStore from '../store/useLoadingStore'

function MyComponent() {
  const { startLoading, stopLoading } = useLoadingStore()

  const handleSubmit = async () => {
    startLoading('Submitting form...')
    try {
      await submitForm()
    } catch (error) {
      console.error(error)
    } finally {
      stopLoading()
    }
  }
}
```

### Example 2: Using API Utilities

```tsx
import { api } from '../utils/api'

function CoursesPage() {
  useEffect(() => {
    const loadCourses = async () => {
      const courses = await api.fetchCourses() // Shows "Loading courses..."
      // courses are automatically loaded
    }
    loadCourses()
  }, [])
}
```

### Example 3: Using useAsyncOperation Hook

```tsx
import useAsyncOperation from '../hooks/useAsyncOperation'

function MyComponent() {
  const { execute, error } = useAsyncOperation(
    async (id: string) => {
      const response = await fetch(`/api/data/${id}`)
      return response.json()
    },
    {
      loadingMessage: 'Fetching data...',
      onSuccess: () => console.log('Success!'),
      onError: (err) => console.error(err),
    }
  )

  const handleClick = () => {
    execute('123') // Automatically shows loading spinner
  }
}
```

## Integration

The global loader is already integrated into `App.tsx`:

```tsx
<GlobalLoader /> // Shows automatically when isLoading is true
```

## Customization

### Change Spinner Style
Edit `src/components/common/LoadingSpinner.tsx`:
- Change colors: Modify `border-sky-500` to your preferred color
- Change size: Adjust `sizeClasses` object
- Change animation: Modify the `animate-spin` class

### Change Loading Message Style
Edit the message paragraph styling in `LoadingSpinner.tsx`.

## Best Practices

1. **Always use try/finally**: Ensure `stopLoading()` is called even on errors
2. **Provide meaningful messages**: Use descriptive loading messages
3. **Don't overuse**: Only show loading for operations that take > 300ms
4. **Use API utilities**: Prefer `apiCall` or `api` functions for automatic management

## Testing

Tests are available in:
- `src/__tests__/components/LoadingSpinner.test.tsx`
- `src/__tests__/components/GlobalLoader.test.tsx`
- `src/__tests__/store/useLoadingStore.test.ts`

Run tests with:
```bash
npm run test
```
