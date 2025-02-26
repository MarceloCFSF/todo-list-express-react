import { useTasks } from "../hooks/useTasks";
import { Task, TaskStatus } from "../models/tasks";
import { FaEdit, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import "./TaskTile.css"
import DeleteTaskModal from "./DeleteTaskModal";
import { useState } from "react";

export interface TaskTileType {
  task: Task,
  openModal: (task?: Task) => void
}

const TaskTile = ({ task, openModal }: TaskTileType) => {
  const { updateTask } = useTasks();
  const [deleteTask, setDeleteTask] = useState<boolean>(false);

  const updateTaskStatus = (status: TaskStatus) => {
    updateTask(task.id!, { ...task, status });
  }

  const toggleTaskStatus = () => {
    updateTaskStatus(
      task.status === TaskStatus.concluded
        ? TaskStatus.pending
        : TaskStatus.concluded
    )
  }

  const openDeleteTaskModal = () => {
    setDeleteTask(true);
  }
  
  const closeDeleteModal = () => {
    setDeleteTask(false);
  }

  return (
    <li className="task-tile" key={`task_${task.id}`}>
      <DeleteTaskModal
        open={deleteTask}
        onClose={closeDeleteModal}
        task={task}
      />
      <input
        className="conclude-task-button"
        type="checkbox"
        checked={task.status === TaskStatus.concluded}
        onChange={toggleTaskStatus}
      />
      <div className="task-tile-info">
        <strong className="task-title">{task.title}</strong>
        <p className="task-description">
          {task.description}
        </p>
      </div>
      <div className="task-tile-buttons">
        <button
          className="edit-task-button"
          onClick={() => openModal(task)}
        ><FaEdit /></button>
        {task.status === TaskStatus.pending
          && <button
            className="start-task-button"
            onClick={() => updateTaskStatus(TaskStatus.inProgress)}
          ><FaPlay /></button>
        }
        {task.status === TaskStatus.inProgress
          && <button
            className="stop-task-button"
            onClick={() => updateTaskStatus(TaskStatus.pending)}
          ><FaStop /></button>
        }
        <button
          className="delete-task-button"
          onClick={openDeleteTaskModal}
        ><FaTrash /></button>
      </div>
    </li>
  )
}

export default TaskTile;