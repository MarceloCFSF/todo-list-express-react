import { Router } from "express";
import Database from "../config/database";

export abstract class RouterInterface {
  protected readonly router: Router;

  constructor (protected readonly database: Database) {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }
}