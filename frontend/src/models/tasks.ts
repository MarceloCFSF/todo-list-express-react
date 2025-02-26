export interface Task {
  id?: number
  title: string,
  description: string,
  status: TaskStatus
}

export const TaskStatus = {
  pending: "pending",
  inProgress: "inProgress",
  concluded: "concluded",
} as const;

export type TaskStatus = keyof typeof TaskStatus;

export const taskStatusValues = Object.values(TaskStatus);

export const TaskStatusOptions: Record<TaskStatus, string> = {
  pending: "Pendente",
  inProgress: "Em progresso",
  concluded: "Concluído",
}
