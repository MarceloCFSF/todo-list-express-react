import { App } from "./app";
import Database from './config/database';
import { HealthRouter } from "./routes/healthRouter";

const database = new Database({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'todo',
  password: process.env.DB_PASS || 'root',
  port: Number(process.env.DB_PORT) || 5432,
});
const port = parseInt(process.env.PORT ?? '3000');
const app = new App(port);

const healthRouter = new HealthRouter(database);
app.addRoute('/health', healthRouter.getRouter())

app.start();
