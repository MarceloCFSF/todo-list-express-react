import { Task } from "../models/tasks";
import { TaskFormProvider } from "../providers/TaskFormProvider";
import { TaskForm } from "./TaskForm";
import Modal, { ModalType } from "./Modal";

interface TaskModalType extends ModalType {
  task?: Task,
}

const TaskModal = (props: TaskModalType) => {
  const { open, onClose, task } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <TaskFormProvider onSubmit={onClose} task={task}>
        <TaskForm />
      </TaskFormProvider>
    </Modal>
  )
}

export default TaskModal;
