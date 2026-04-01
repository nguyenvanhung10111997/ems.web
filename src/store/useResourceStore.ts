import { create } from 'zustand'

interface Resource {
  id: string
  title: string
  type: 'document' | 'video' | 'audio' | 'image' | 'link'
  category: string
  url: string
  size?: string
  duration?: string
  createdAt: string
  downloads?: number
}

interface ResourceState {
  resources: Resource[]
  setResources: (resources: Resource[]) => void
  addResource: (resource: Resource) => void
  deleteResource: (id: string) => void
  filterByCategory: (category: string) => Resource[]
  filterByType: (type: Resource['type']) => Resource[]
}

const useResourceStore = create<ResourceState>((set, get) => ({
  resources: [
    {
      id: '1',
      title: 'IELTS Vocabulary List: Academic Words',
      type: 'document',
      category: 'Vocabulary',
      url: '/resources/ielts-vocabulary.pdf',
      size: '2.5 MB',
      createdAt: '2024-03-01',
      downloads: 145,
    },
    {
      id: '2',
      title: 'IELTS Speaking Tips and Strategies',
      type: 'video',
      category: 'Speaking',
      url: '/resources/ielts-speaking-tips.mp4',
      duration: '45:30',
      createdAt: '2024-03-02',
      downloads: 89,
    },
    {
      id: '3',
      title: 'IELTS Writing Task 1 Templates',
      type: 'document',
      category: 'Writing',
      url: '/resources/ielts-writing-templates.pdf',
      size: '1.2 MB',
      createdAt: '2024-03-03',
      downloads: 312,
    },
  ],
  setResources: (resources) => set({ resources }),
  addResource: (resource) =>
    set((state) => ({ resources: [...state.resources, resource] })),
  deleteResource: (id) =>
    set((state) => ({
      resources: state.resources.filter((resource) => resource.id !== id),
    })),
  filterByCategory: (category) =>
    get().resources.filter((resource) => resource.category === category),
  filterByType: (type) =>
    get().resources.filter((resource) => resource.type === type),
}))

export default useResourceStore
export type { Resource }
