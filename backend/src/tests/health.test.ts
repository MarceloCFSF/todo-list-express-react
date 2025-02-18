import request from "supertest";
import { App } from "../app";
import { HealthRouter } from "../routes/healthRouter";
import Database from "../config/database";

describe("Server Health Check", () => {
  let app: App;

  beforeAll(() => {
    app = new App(3000);
    const database = new Database({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'todo',
      password: process.env.DB_PASS || 'root',
      port: Number(process.env.DB_PORT) || 5432,
    });
    const router = new HealthRouter(database);
    app.addRoute('/health', router.getRouter());
  });

  it("GET /health - should return 200 OK", async () => {
    const response = await request(app.getApplication()).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 
      status: "ok",
      database: "connected"
    });
  });
});
