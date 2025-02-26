import { useFormik } from "formik"
import { Task } from "../models/tasks"
import { taskValidationSchema } from "../validations/taskValidation";
import { useTasks } from "./useTasks";

export const useTaskForm = (task?: Task) => {
  const { createTask, updateTask } = useTasks();

  const initialValues: Omit<Task, "id"> = {
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "pending"
  }

  const handleSubmit = (values: typeof initialValues) => {
    if (task && task.id) updateTask(task.id, values);
    createTask(values);
  }

  return useFormik({ 
    initialValues,
    validationSchema: taskValidationSchema,
    onSubmit: handleSubmit
  });
}
