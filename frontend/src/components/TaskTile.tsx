import { Task } from "../models/tasks";

const TaskTile = ({ task }: { task: Task }) => {
  return (
    <li key={task.id}>
      <strong>{task.title}</strong>: {task.description} - {task.status}
    </li>
  )
}

export default TaskTile;