import { useEffect, useState } from "react"
import { Task } from "../models/tasks"
import { taskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    taskService.getAll()
      .then(setTasks)
      .finally(() => setLoading(false))
  }, [])

  return { tasks, loading }
}