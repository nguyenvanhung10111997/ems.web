import { create } from 'zustand'
import type { Assignment } from '../types'

interface AssignmentState {
  assignments: Assignment[]
  setAssignments: (assignments: Assignment[]) => void
  addAssignment: (assignment: Assignment) => void
  updateAssignment: (id: string, updates: Partial<Assignment>) => void
  deleteAssignment: (id: string) => void
  submitAssignment: (id: string) => void
  gradeAssignment: (id: string, score: number) => void
}

const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [
    {
      id: '1',
      title: 'IELTS Writing Task 1: Academic',
      courseId: '1',
      dueDate: '2024-03-15',
      status: 'pending',
    },
    {
      id: '2',
      title: 'IELTS Writing Task 2: Opinion Essay',
      courseId: '1',
      dueDate: '2024-03-20',
      status: 'submitted',
    },
    {
      id: '3',
      title: 'IELTS Listening Practice Test',
      courseId: '2',
      dueDate: '2024-03-18',
      status: 'graded',
      score: 85,
    },
  ],
  setAssignments: (assignments) => set({ assignments }),
  addAssignment: (assignment) =>
    set((state) => ({ assignments: [...state.assignments, assignment] })),
  updateAssignment: (id, updates) =>
    set((state) => ({
      assignments: state.assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, ...updates } : assignment
      ),
    })),
  deleteAssignment: (id) =>
    set((state) => ({
      assignments: state.assignments.filter(
        (assignment) => assignment.id !== id
      ),
    })),
  submitAssignment: (id) =>
    set((state) => ({
      assignments: state.assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status: 'submitted' as const }
          : assignment
      ),
    })),
  gradeAssignment: (id, score) =>
    set((state) => ({
      assignments: state.assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status: 'graded' as const, score }
          : assignment
      ),
    })),
}))

export default useAssignmentStore
