import { useEffect, useState } from "react"
import { Task } from "../models/tasks"
import { getTasks } from "../api/tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false))
  }, [])

  return { tasks, loading }
}