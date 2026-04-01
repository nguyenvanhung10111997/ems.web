import useLoadingStore from '../../store/useLoadingStore'
import LoadingSpinner from './LoadingSpinner'

function GlobalLoader() {
  const { isLoading, loadingMessage } = useLoadingStore()

  if (!isLoading) return null

  return <LoadingSpinner message={loadingMessage} fullScreen />
}

export default GlobalLoader
