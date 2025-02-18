import { Pool } from 'pg'

interface DatabaseConfig {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number,
}

export default class Database {
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
  }

  async query(sql: string, params?: any[]) {
    return this.pool.query(sql, params);
  }
}
