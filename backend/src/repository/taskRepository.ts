import { IDatabase } from "../config/database";
import Task from "../models/task";

export class TaskRepository {
  constructor(private readonly db: IDatabase) {}

  async getAll(): Promise<Task[]> {
    const result = await this.db.query('SELECT * FROM tasks;');
    return result.rows;
  }

  async getById(id: number): Promise<Task> {
    const query = `SELECT * FROM tasks
      WHERE id = $1`;
    const params = [id];

    const result = await this.db.query(query, params);
    return result.rows[0];
  }

  async create(task: Task): Promise<Task> {
    const query = `INSERT INTO tasks 
      (title, description, status)
      VALUES ($1, $2, $3) 
      RETURNING *`
    const params = [task.title, task.description, task.status];

    const result = await this.db.query(query, params);
    return result.rows[0];
  }
  
  async update(id: number, task: Task): Promise<Task> {
    const query = `UPDATE tasks SET
        title = $1,
        description = $2,
        status = $3
      WHERE id = $4
      RETURNING *`
    const params = [
      task.title,
      task.description,
      task.status,
      id
    ];

    const result = await this.db.query(query, params);
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM tasks WHERE id = $1`;
    const params = [id];

    await this.db.query(query, params);
  }
}
