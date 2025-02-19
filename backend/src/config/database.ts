import { Pool } from 'pg'

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query(sql: string, params?: any[]): Promise<any>;
}

interface DatabaseConfig {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number,
}

export default class Database implements IDatabase {
  private readonly pool: Pool;
  private static instance: Database; 

  constructor(config: DatabaseConfig) {
    this.pool = new Pool({
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
    });

    this.connect();
  }

  async connect(): Promise<void> {
    this.pool.connect();
  }

  async query(sql: string, params?: any[]): Promise<any> {
    return this.pool.query(sql, params);
  }

  async disconnect(): Promise<void> {
    this.pool.end();
  }
}
