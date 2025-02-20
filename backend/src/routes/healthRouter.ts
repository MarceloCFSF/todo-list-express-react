import { IDatabase } from '../config/database';
import { RouterInterface } from './routerInterface';

export class HealthRouter extends RouterInterface {
  constructor(database: IDatabase) {
    super(database);

    this.router.get('/', async (_, res) => {
      try {
        await this.database.query('SELECT 1');
        res.status(200).json({
          status: 'ok',
          database: 'connected'
        });
      } catch (error: any) {
        res.status(500).json({
          status: 'error',
          database: 'disconnected',
          error: error.message
        });
      }
    });
  }

  getRouter(){
    return this.router;
  }
}
