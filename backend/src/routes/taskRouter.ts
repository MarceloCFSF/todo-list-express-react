import { TaskController } from "../controllers/taskController";
import { TaskRepository } from "../repository/taskRepository";
import { IDatabase } from "../config/database";
import { TaskService } from "../services/taskService";
import { RouterInterface } from "./routerInterface";

export class TaskRouter extends RouterInterface {
  constructor(database: IDatabase) {
    super(database);
    const repository = new TaskRepository(this.database);
    const service = new TaskService(repository);
    const controller = new TaskController(service);
    
    this.router.get("/", (req, res) => controller.getAll(req, res));
    this.router.get("/:id", (req, res) => controller.getById(req, res));
    this.router.post("/", (req, res) => controller.create(req, res));
    this.router.put("/:id", (req, res) => controller.update(req, res));
    this.router.delete("/:id", (req, res) => controller.delete(req, res));
  }
}
