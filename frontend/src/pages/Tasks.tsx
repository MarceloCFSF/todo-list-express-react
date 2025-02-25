import { useState } from "react";
import TaskTile from "../components/TaskTile";
import { useTasks } from "../hooks/useTasks";
import TaskModal from "../components/TaskModal";

const Tasks = () => {
  const { tasks, loading } = useTasks();
  const [open, setOpen] = useState<boolean>(false);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <TaskModal open={open} onClose={() => setOpen(false)} />
      <h1>Tarefas</h1>
      <button onClick={() => setOpen(true)} >+ Nova Tarefa</button>
      <ul>
        {tasks.map((task) => 
          <TaskTile key={task.id} task={task} />
        )}
      </ul>
    </div>
  );
}

export default Tasks;