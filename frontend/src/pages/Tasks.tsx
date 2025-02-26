import { useState } from "react";
import TaskTile from "../components/TaskTile";
import { useTasks } from "../hooks/useTasks";
import TaskModal from "../components/TaskModal";
import { Task } from "../models/tasks";

const Tasks = () => {
  const { tasks, loading } = useTasks();
  const [open, setOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task>();

  const openModal = (task?: Task) => {
    setOpen(true);
    setEditTask(task);
  }
  
  const closeModal = () => {
    setOpen(false);
    setEditTask(undefined);
  }


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <TaskModal task={editTask} open={open} onClose={closeModal} />
      <h1>Tarefas</h1>
      <button onClick={() => openModal()} >+ Nova Tarefa</button>
      <ul style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {tasks.map((task) => 
          <TaskTile openModal={openModal} key={task.id} task={task} />
        )}
      </ul>
    </div>
  );
}

export default Tasks;
