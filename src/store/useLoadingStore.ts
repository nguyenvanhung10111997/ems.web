import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  loadingMessage?: string
  setLoading: (isLoading: boolean, message?: string) => void
  startLoading: (message?: string) => void
  stopLoading: () => void
}

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingMessage: undefined,
  setLoading: (isLoading, message) =>
    set({ isLoading, loadingMessage: message }),
  startLoading: (message) => set({ isLoading: true, loadingMessage: message }),
  stopLoading: () => set({ isLoading: false, loadingMessage: undefined }),
}))

export default useLoadingStore
