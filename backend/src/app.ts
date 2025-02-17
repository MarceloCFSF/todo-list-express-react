import express, { Express } from 'express';
import healthRoutes from './routes/healthRoutes';

const app: Express = express();

app.use(express.json());

app.use(healthRoutes);

export default app;