import Task from "../models/task";
import { TaskRepository } from "../repository/taskRepository";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  getAll(): Promise<Task[]> {
    return this.repository.getAll();
  }

  getById(id: number): Promise<Task> {
    return this.repository.getById(id);
  }

  create(task: Task): Promise<Task> {
    return this.repository.create(task);
  }

  update(id: number, task: Task): Promise<Task> {
    return this.repository.update(id, task);
  }
  
  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
