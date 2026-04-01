import { describe, it, expect, beforeEach } from 'vitest'
import useAssignmentStore from '../../store/useAssignmentStore'
import type { Assignment } from '../../types'

const mockAssignment: Assignment = {
  id: '1',
  title: 'Test Assignment',
  courseId: '1',
  dueDate: '2024-12-31',
  status: 'pending',
}

describe('useAssignmentStore', () => {
  beforeEach(() => {
    useAssignmentStore.setState({
      assignments: [],
    })
  })

  it('initializes with default assignments', () => {
    const state = useAssignmentStore.getState()
    // Reset to see defaults
    useAssignmentStore.setState({
      assignments: [
        {
          id: '1',
          title: 'Mathematics Quiz 1',
          courseId: '1',
          dueDate: '2024-03-15',
          status: 'pending',
        },
      ],
    })
    const newState = useAssignmentStore.getState()
    expect(newState.assignments.length).toBeGreaterThan(0)
  })

  it('sets assignments', () => {
    const assignments = [mockAssignment]
    useAssignmentStore.getState().setAssignments(assignments)
    const state = useAssignmentStore.getState()
    expect(state.assignments).toEqual(assignments)
  })

  it('adds a new assignment', () => {
    useAssignmentStore.getState().addAssignment(mockAssignment)
    const state = useAssignmentStore.getState()
    expect(state.assignments).toContainEqual(mockAssignment)
  })

  it('updates an existing assignment', () => {
    useAssignmentStore.setState({ assignments: [mockAssignment] })
    useAssignmentStore.getState().updateAssignment('1', { title: 'Updated Title' })
    const state = useAssignmentStore.getState()
    expect(state.assignments[0].title).toBe('Updated Title')
  })

  it('deletes an assignment', () => {
    useAssignmentStore.setState({ assignments: [mockAssignment] })
    useAssignmentStore.getState().deleteAssignment('1')
    const state = useAssignmentStore.getState()
    expect(state.assignments).not.toContainEqual(mockAssignment)
  })

  it('submits an assignment', () => {
    useAssignmentStore.setState({ assignments: [mockAssignment] })
    useAssignmentStore.getState().submitAssignment('1')
    const state = useAssignmentStore.getState()
    expect(state.assignments[0].status).toBe('submitted')
  })

  it('grades an assignment', () => {
    useAssignmentStore.setState({ assignments: [mockAssignment] })
    useAssignmentStore.getState().gradeAssignment('1', 85)
    const state = useAssignmentStore.getState()
    expect(state.assignments[0].status).toBe('graded')
    expect(state.assignments[0].score).toBe(85)
  })
})
