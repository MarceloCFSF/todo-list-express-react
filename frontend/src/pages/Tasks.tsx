import TaskTile from "../components/TaskTile";
import { useTasks } from "../hooks/useTasks";

const Tasks = () => {
  const { tasks, loading } = useTasks();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Tarefas</h1>
      <ul>
        {tasks.map((task) => 
          <TaskTile key={task.id} task={task} />
        )}
      </ul>
    </div>
  );
}

export default Tasks;