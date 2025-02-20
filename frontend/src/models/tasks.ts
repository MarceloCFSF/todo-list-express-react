export interface Task {
  id?: number
  title: string,
  description: string,
  status: TaskStatus
}

export type TaskStatus = 'pending' | 'inProgress' | 'concluded'