import './App.css'
import { useTasks } from './hooks/useTasks'

function App() {
  const { tasks, loading } = useTasks();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
