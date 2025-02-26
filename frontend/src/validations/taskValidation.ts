import { string, object } from 'yup';
import { taskStatusValues } from "../models/tasks";

export const taskValidationSchema = object({
  title: string()
    .required("Campo título é obrigatório"),
  description: string()
    .required("Campo descrição é obrigatório"),
  status: string()
    .oneOf(taskStatusValues, "Status inválido")
    .required("Campo status é obrigatório")
})