import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { logger } from './logger/logger.js';

export async function healthcheck(req: Request, res: Response, orm: MikroORM) {
  try {
    const em = orm.em.fork();
    await em.getConnection().execute('SELECT 1');
    logger.info('GET /healthcheck successful');
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    logger.error('GET /healthcheck failed', { error: error.message });
    return res.status(500).json({ status: 'error', error: error.message });
  }
}
