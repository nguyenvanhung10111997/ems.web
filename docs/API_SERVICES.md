# API Services Documentation

## Overview

The EMS application uses a modern API service architecture with interceptors for error handling, automatic loading management, and mock data support.

## Architecture

### Base API Service (`src/services/apiService.ts`)

The base API service provides:
- **Request/Response Interceptors**: Transform requests and responses
- **Error Interceptors**: Handle errors consistently
- **Automatic Loading Management**: Integrates with LoadingService
- **Mock Data Support**: Automatically uses mock data when configured
- **Authentication**: Automatically adds auth tokens to requests

### Feature Services

Each feature has its own service:
- `authService` - Authentication and user management
- `courseService` - Course operations
- `assignmentService` - Assignment operations
- `resourceService` - Resource management
- `notificationService` - Notifications and settings

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=true
```

- `VITE_API_BASE_URL`: Base URL for API calls (default: `http://localhost:3000/api`)
- `VITE_USE_MOCK_DATA`: Enable/disable mock data (default: `true`)

## Usage Examples

### Authentication Service

```typescript
import authService from '../services/authService'

// Login
const { user, token } = await authService.login({
  email: 'student@ems.com',
  password: 'password123'
})

// Register
const { user, token } = await authService.register({
  email: 'newuser@ems.com',
  password: 'password123',
  name: 'New User',
  role: 'student'
})

// Get current user
const user = await authService.getCurrentUser()

// Update profile
const updatedUser = await authService.updateProfile(userId, {
  name: 'Updated Name'
})

// Logout
await authService.logout()
```

### Course Service

```typescript
import courseService from '../services/courseService'

// Get all courses
const courses = await courseService.getCourses()

// Get course by ID
const course = await courseService.getCourseById('1')

// Create course
const newCourse = await courseService.createCourse({
  title: 'New Course',
  description: 'Course description',
  instructor: 'Dr. Smith',
  enrolledStudents: 0,
  status: 'active'
})

// Update course
const updated = await courseService.updateCourse('1', {
  title: 'Updated Title'
})

// Enroll in course
const result = await courseService.enrollInCourse('1')

// Search courses
const results = await courseService.searchCourses('mathematics')

// Get courses by status
const activeCourses = await courseService.getCoursesByStatus('active')
```

### Assignment Service

```typescript
import assignmentService from '../services/assignmentService'

// Get all assignments
const assignments = await assignmentService.getAssignments()

// Get assignment by ID
const assignment = await assignmentService.getAssignmentById('1')

// Get assignments by course
const courseAssignments = await assignmentService.getAssignmentsByCourse('1')

// Get assignments by status
const pending = await assignmentService.getAssignmentsByStatus('pending')

// Submit assignment
const submitted = await assignmentService.submitAssignment('1', {
  text: 'Assignment submission text'
})

// Grade assignment (teacher/admin only)
const graded = await assignmentService.gradeAssignment('1', 85)
```

### Resource Service

```typescript
import resourceService from '../services/resourceService'

// Get all resources
const resources = await resourceService.getResources()

// Get resource by ID
const resource = await resourceService.getResourceById('1')

// Get resources by category
const mathResources = await resourceService.getResourcesByCategory('Mathematics')

// Get resources by type
const videos = await resourceService.getResourcesByType('video')

// Create resource
const newResource = await resourceService.createResource({
  title: 'New Resource',
  category: 'Mathematics',
  type: 'document',
  size: '1.5 MB'
})

// Download resource
const { url } = await resourceService.downloadResource('1')

// Search resources
const results = await resourceService.searchResources('mathematics')
```

### Notification Service

```typescript
import notificationService from '../services/notificationService'

// Get all notifications
const notifications = await notificationService.getNotifications()

// Get unread notifications
const unread = await notificationService.getUnreadNotifications()

// Mark as read
await notificationService.markAsRead('1')

// Mark all as read
await notificationService.markAllAsRead()

// Delete notification
await notificationService.deleteNotification('1')

// Get settings
const settings = await notificationService.getSettings()

// Update settings
const updated = await notificationService.updateSettings({
  email: true,
  push: false
})
```

## Error Handling

The API service includes automatic error handling:

```typescript
import apiService from '../services/apiService'
import type { ApiError } from '../services/apiService'

try {
  const courses = await courseService.getCourses()
} catch (error) {
  const apiError = error as ApiError
  console.error('Error:', apiError.message)
  console.error('Status:', apiError.status)
  console.error('Errors:', apiError.errors)
}
```

### Error Interceptors

Errors are automatically handled:
- **401 Unauthorized**: Redirects to login
- **403 Forbidden**: Shows permission error
- **404 Not Found**: Shows not found message
- **500+ Server Error**: Shows server error message
- **Network Error**: Shows connection error

## Custom Interceptors

You can add custom interceptors:

```typescript
import apiService from '../services/apiService'

// Request interceptor
apiService.addRequestInterceptor((config) => {
  // Add custom header
  config.headers = {
    ...config.headers,
    'X-Custom-Header': 'value'
  }
  return config
})

// Response interceptor
apiService.addResponseInterceptor((response) => {
  // Transform response
  return response.data
})

// Error interceptor
apiService.addErrorInterceptor((error) => {
  // Custom error handling
  if (error.status === 429) {
    error.message = 'Too many requests. Please try again later.'
  }
  return error
})
```

## Mock Data

Mock data is automatically used when `VITE_USE_MOCK_DATA=true`. Mock data is defined in `src/utils/mockData.ts`.

### Using Mock Data

Mock data is automatically used for all API calls when configured. Each service method includes a `mockData` function that returns mock responses.

### Switching to Real API

1. Set `VITE_USE_MOCK_DATA=false` in `.env`
2. Set `VITE_API_BASE_URL` to your API endpoint
3. Ensure your API follows the expected response format

## Loading Management

Loading is automatically managed by the API service using `LoadingService`. You can skip loading for specific requests:

```typescript
// Skip loading indicator
const data = await apiService.get('/endpoint', {
  skipLoading: true
})
```

## Authentication

Authentication tokens are automatically added to requests. The token is stored in `localStorage` under `ems-auth`:

```json
{
  "token": "your-jwt-token",
  "user": { ... }
}
```

## Best Practices

1. **Use Feature Services**: Always use feature-specific services instead of calling `apiService` directly
2. **Error Handling**: Always wrap API calls in try-catch blocks
3. **Type Safety**: Use TypeScript types for request/response data
4. **Mock Data**: Keep mock data in sync with real API responses
5. **Loading States**: Let the service handle loading automatically
6. **Authentication**: Don't manually add auth tokens - the service handles it

## Migration from Old API

The old `api` object in `src/utils/api.ts` is still available for backward compatibility but is deprecated. Migrate to feature services:

```typescript
// Old way (deprecated)
import { api } from '../utils/api'
const courses = await api.fetchCourses()

// New way
import courseService from '../services/courseService'
const courses = await courseService.getCourses()
```
