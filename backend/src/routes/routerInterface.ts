import { Router } from "express";
import { IDatabase } from "../config/database";

export abstract class RouterInterface {
  protected readonly router: Router;

  constructor (protected readonly database: IDatabase) {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }
}