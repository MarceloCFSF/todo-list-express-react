import { createContext } from "react";
import { Task } from "../models/tasks";

export interface TaskContextType {
  loading: boolean,
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);