import { newDb } from "pg-mem";
import { IDatabase } from "../../config/database";

export class MockDatabase implements IDatabase {
  private db = newDb();

  constructor() {
    this.db.public.registerFunction({
      name: "now", implementation: () => new Date()
    });

    this.db.public.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `)
  }

  async connect(): Promise<void> { }

  formatSQL(query: string, params: any[]): string {
    return query.replace(/\$(\d+)/g, (_, index) => {
      const value = params[Number(index) - 1];
      if (typeof value === "string") {
        return `'${value.replace(/'/g, "''")}'`;
      }
      return value;
    });
  }

  async query(sql: string, params?: any[]) {
    const query = this.formatSQL(sql, params ?? []);
    return this.db.public.query(query);
  }

  async disconnect() { }
}
