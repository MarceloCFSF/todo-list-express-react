import api from "./api"
import { Task } from "../models/tasks"

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  },
  
  async getById(id: number): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  
  async create(task: Task): Promise<Task> {
    const response = await api.post(`/tasks`, task);
    return response.data;
  },
  
  async update(id: number, task: Task): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },
  
  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
}
