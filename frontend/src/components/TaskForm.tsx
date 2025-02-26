import { ErrorMessage, Field, Form, useFormikContext } from "formik"
import { TaskStatusOptions } from "../models/tasks";
import "./TaskForm.css";

export const TaskForm = () => {
  const { isSubmitting } = useFormikContext();

  return (
    <Form className="task-form">
      <div className="field">
        <label>Titulo</label>
        <Field type="text" name="title" />
        <ErrorMessage name="title" component="div" />
      </div>
      <div className="field">
        <label>Descrição</label>
        <Field type="text" name="description" as="textarea" />
        <ErrorMessage name="description" component="div" />
      </div>
      <div className="field select-field">
        <label>Status</label>
        <Field as="select" name="status">
          {Object.entries(TaskStatusOptions).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage name="status" component="div" />
      </div>
      <button type="submit" disabled={isSubmitting}>
        Enviar
      </button>
    </Form>
  )
}
