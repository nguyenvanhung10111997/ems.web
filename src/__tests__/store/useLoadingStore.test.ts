import { describe, it, expect, beforeEach } from 'vitest'
import useLoadingStore from '../../store/useLoadingStore'

describe('useLoadingStore', () => {
  beforeEach(() => {
    useLoadingStore.setState({
      isLoading: false,
      loadingMessage: undefined,
    })
  })

  it('initializes with loading false', () => {
    const state = useLoadingStore.getState()
    expect(state.isLoading).toBe(false)
    expect(state.loadingMessage).toBeUndefined()
  })

  it('sets loading state', () => {
    useLoadingStore.getState().setLoading(true, 'Loading data...')
    const state = useLoadingStore.getState()
    expect(state.isLoading).toBe(true)
    expect(state.loadingMessage).toBe('Loading data...')
  })

  it('starts loading', () => {
    useLoadingStore.getState().startLoading('Fetching courses...')
    const state = useLoadingStore.getState()
    expect(state.isLoading).toBe(true)
    expect(state.loadingMessage).toBe('Fetching courses...')
  })

  it('starts loading without message', () => {
    useLoadingStore.getState().startLoading()
    const state = useLoadingStore.getState()
    expect(state.isLoading).toBe(true)
    expect(state.loadingMessage).toBeUndefined()
  })

  it('stops loading', () => {
    useLoadingStore.setState({
      isLoading: true,
      loadingMessage: 'Loading...',
    })
    useLoadingStore.getState().stopLoading()
    const state = useLoadingStore.getState()
    expect(state.isLoading).toBe(false)
    expect(state.loadingMessage).toBeUndefined()
  })
})
