import { ReactNode } from "react";
import { useTasks } from "../hooks/useTasks";
import { Formik } from "formik";
import { Task } from "../models/tasks";
import { taskValidationSchema } from "../validations/taskValidation";

export interface TaskFormProviderType {
  task?: Task,
  onSubmit?: () => void,
  children: ReactNode,
}

export function TaskFormProvider({ task, children, onSubmit }: TaskFormProviderType) {
  const { createTask, updateTask } = useTasks();

  const initialValues: Omit<Task, "id"> = {
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "pending"
  }

  const handleSubmit = async (values: typeof initialValues) => {
    if (task && task.id) await updateTask(task.id, values);
    else await createTask(values);
    
    if (onSubmit) onSubmit();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskValidationSchema}
      onSubmit={handleSubmit}
    >{children}</Formik>
  )
}
