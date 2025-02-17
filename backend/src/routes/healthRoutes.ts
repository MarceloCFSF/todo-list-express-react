import { Router } from 'express';
import Database from '../config/database';

const router = Router();

router.get('/health', async (_, res) => {
  try {
    await Database.getInstance().query('SELECT 1');
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

export default router;
