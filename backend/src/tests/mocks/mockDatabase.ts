import { newDb } from "pg-mem";
import { IDatabase } from "../../config/database";

export class MockDatabase implements IDatabase {
  private db = newDb();

  constructor() {
    this.db.public.registerFunction({ 
      name: "now", implementation: () => new Date()
    });
  }

  async connect(): Promise<void> {
  }

  async query(sql: string, params?: any[]) {
    return this.db.public.query(sql);
  }

  async disconnect() {
  }
}
