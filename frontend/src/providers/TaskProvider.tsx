import { ReactNode, useEffect, useState } from "react";
import { Task } from "../models/tasks";
import { taskService } from "../services/taskService";
import { TaskContext } from "../contexts/taskContext";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
   fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true);
    const data = await taskService.getAll();
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (task: Omit<Task, "id">) => {
    setLoading(true);
    const newTask = await taskService.create(task);
    setTasks((prev) => [newTask, ...prev]);
    setLoading(false);
  };

  const updateTask = async (id: number, updatedTask: Task) => {
    setLoading(true);
    await taskService.update(id, updatedTask);
    setTasks((prev) => prev.map((task) => 
      (task.id === id ? { ...task, ...updatedTask } : task)
    ));
    setLoading(false);
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    await taskService.delete(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setLoading(false);
  };

  return (
    <TaskContext.Provider
      value={{ 
        loading,
        tasks,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
      }}
    >{children}</TaskContext.Provider>
  )
}
