import { Pool } from 'pg'

export default class Database {
  private readonly pool: Pool;
  private static instance: Database; 

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'todo',
      password: process.env.DB_PASS || 'root',
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  static getInstance(): Database {
    return this.instance ??= new Database();
  }

  async query(sql: string, params?: any[]) {
    return this.pool.query(sql, params);
  }
}
