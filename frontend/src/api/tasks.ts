import api from "."
import { Task } from "../models/tasks"

export async function getTasks(): Promise<Task[]> {
  const response = await api.get('/tasks');
  return response.data;
}
