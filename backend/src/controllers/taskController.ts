import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  constructor (private readonly service: TaskService) {}

  async getAll(req: Request, res: Response) {
    const result = await this.service.getAll();
    res.json(result);
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await this.service.getById(parseInt(id));
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({error: error.message})  
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description, status } = req.body;
      const newTask = await this.service.create({
        title,
        description,
        status
      });
      res.status(201).json(newTask);
    } catch (error: any) {
      res.status(500).json({error: error.message})  
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const newTask = await this.service.update(
        parseInt(id), {
        title,
        description,
        status
      });
      res.status(200).json(newTask);
    } catch (error: any) {
      res.status(500).json({error: error.message})  
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.service.delete(parseInt(id));
      res.status(200).json({message: "Successful deleted task"});
    } catch (error: any) {
      res.status(500).json({error: error.message})  
    }
  }
}
