import { useTasks } from "../hooks/useTasks";
import { Task } from "../models/tasks";
import Modal, { ModalType } from "./Modal";

export interface DeleteTaskModalType extends ModalType {
  task: Task,
}

const DeleteTaskModal = (props: DeleteTaskModalType) => {
  const { open, onClose, task } = props;
  const { deleteTask } = useTasks();

  const handleDelete = async () => {
    await deleteTask(task.id!); 
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      Tem certeza de que quer deletar a tarefa {task.title}?
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleDelete}>Sim</button>
      </div>
    </Modal>
  )

}

export default DeleteTaskModal;