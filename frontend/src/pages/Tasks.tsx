import { useState } from "react";
import TaskTile from "../components/TaskTile";
import { useTasks } from "../hooks/useTasks";
import TaskModal from "../components/TaskModal";
import { Task, TaskStatus } from "../models/tasks";
import "./Tasks.css"

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

  const pendingTasks = tasks.filter(task => task.status === TaskStatus.pending);
  const inProgressTasks = tasks.filter(task => task.status === TaskStatus.inProgress);
  const concludedTasks = tasks.filter(task => task.status === TaskStatus.concluded);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="task-list">
      <TaskModal task={editTask} open={open} onClose={closeModal} />
      <h1>Tarefas</h1>
      <button onClick={() => openModal()} >+ Nova Tarefa</button>
      <div>
        <h2>Pendentes</h2>
        <ul>
          {pendingTasks.map((task) => 
            <TaskTile key={`task_${task.id}`} openModal={openModal} task={task} />
          )}
        </ul>
      </div>
      <div>
        <h2>Em Progresso</h2>
        <ul>
          {inProgressTasks.map((task) => 
            <TaskTile key={`task_${task.id}`} openModal={openModal} task={task} />
          )}
        </ul>
      </div>
      <div>
        <h2>Concluídas</h2>
        <ul>
          {concludedTasks.map((task) => 
            <TaskTile key={`task_${task.id}`} openModal={openModal} task={task} />
          )}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
