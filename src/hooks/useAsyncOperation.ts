import { useState, useCallback } from 'react'
import useLoadingStore from '../store/useLoadingStore'

// Inline loading service to avoid module resolution issues
const loadingService = {
  show: (message?: string) => {
    const store = useLoadingStore.getState()
    store.startLoading(message)
  },
  hide: () => {
    const store = useLoadingStore.getState()
    store.stopLoading()
  },
}

interface UseAsyncOperationOptions {
  loadingMessage?: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

/**
 * React hook for async operations with loading state
 * Uses loadingService under the hood
 */
function useAsyncOperation<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options: UseAsyncOperationOptions = {}
) {
  const { loadingMessage, onSuccess, onError } = options
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
      loadingService.show(loadingMessage)
      try {
        const result = await asyncFn(...args)
        onSuccess?.()
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        onError?.(error)
        return null
      } finally {
        loadingService.hide()
      }
    },
    [asyncFn, loadingMessage, onSuccess, onError]
  )

  return { execute, error }
}

export default useAsyncOperation
