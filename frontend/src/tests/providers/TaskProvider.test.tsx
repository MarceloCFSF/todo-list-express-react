import "@testing-library/jest-dom";
import { describe, expect, vi, beforeEach, it } from "vitest";
import { render, waitFor, act } from "@testing-library/react";
import { taskService } from "../../services/taskService";
import { TaskProvider } from "../../providers/TaskProvider";
import { TaskContext, TaskContextType } from "../../contexts/taskContext";
import { Task } from "../../models/tasks";

vi.mock("../../services/taskService", () => ({
  taskService: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: "pending"
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: "pending"
  },
]

const newTask: Task = {
  id: 1,
  title: "Nova Tarefa",
  description: "Descrição da tarefa",
  status: "pending",
}

describe("TaskProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have a task on list", async () => {
    vi.mocked(taskService.getAll).mockResolvedValue([{
      id: 1,
      title: "Test Task",
      description: "Description",
      status: "pending"
    }]);

    const contextValue: Partial<TaskContextType> = {
      tasks: [],
      loading: false
    };

    render(
      <TaskProvider>
        <TaskContext.Consumer>
          {(value) => {
            Object.assign(contextValue, value);
            return null;
          }}
        </TaskContext.Consumer>
      </TaskProvider>
    );

    await waitFor(() =>
      expect(contextValue.tasks).toHaveLength(1)
    );
  });

  it("should create a new task", async () => {
    vi.mocked(taskService.getAll).mockResolvedValue([]);

    vi.mocked(taskService.create).mockResolvedValue(newTask);

    let contextValue: TaskContextType | null = null;

    const TestConsumer = () => (
      <TaskContext.Consumer>
        {(value) => {
          contextValue = value!;
          return null;
        }}
      </TaskContext.Consumer>
    );

    render(
      <TaskProvider>
        <TestConsumer />
      </TaskProvider>
    );

    await act(() => contextValue!.createTask(newTask));

    await waitFor(() => {
      expect(contextValue!.tasks).toHaveLength(1);
      expect(contextValue!.tasks[0]).toMatchObject(newTask);
    });

    await act(() => contextValue!.createTask(newTask));

    await waitFor(() => {
      expect(contextValue!.tasks).toHaveLength(2);
    });

    expect(taskService.create).toHaveBeenCalledWith(newTask);
  });

  it("should update a task", async () => {
    vi.mocked(taskService.getAll).mockResolvedValue(initialTasks);

    vi.mocked(taskService.update).mockResolvedValue(newTask);

    let contextValue: TaskContextType | null = null;

    render(
      <TaskProvider>
        <TaskContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </TaskContext.Consumer>
      </TaskProvider>
    );

    await act(() => contextValue!.updateTask(newTask.id!, newTask))

    await waitFor(() => {
      const updatedTask = contextValue!.tasks
        .find(task => task.id === newTask.id!)
      expect(updatedTask).toMatchObject(newTask);
    });

    expect(taskService.update).toHaveBeenCalledWith(newTask.id!, newTask);
  });

  it("should delete a task", async () => {
    vi.mocked(taskService.getAll).mockResolvedValue(initialTasks);
    vi.mocked(taskService.delete).mockResolvedValue();

    let contextValue: TaskContextType | null = null;

    render(
      <TaskProvider>
        <TaskContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </TaskContext.Consumer>
      </TaskProvider>
    );

    await act(() => contextValue!.deleteTask(initialTasks[0].id!));

    waitFor(() => {
      expect(contextValue!.tasks).toHaveLength(1);
      const tasks = initialTasks
        .filter(task => task.id !== initialTasks[0].id)
      expect(contextValue!.tasks).toEqual(tasks);
    })

    expect(taskService.delete).toBeCalledWith(initialTasks[0].id);
  })
});
