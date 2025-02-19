import request from "supertest";
import { App } from "../app";
import { HealthRouter } from "../routes/healthRouter";
import { MockDatabase } from "./mocks/mockDatabase";

describe("Server Health Check", () => {
  let app: App;
  let database: MockDatabase;

  beforeAll(async () => {
    app = new App(3000);
    database = new MockDatabase();
    await database.connect();
    const router = new HealthRouter(database);
    app.addRoute('/health', router.getRouter());
  });

  afterAll(async () => {
    await database.disconnect();
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
