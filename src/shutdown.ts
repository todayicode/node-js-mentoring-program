import { Server } from 'http';
import { MikroORM } from '@mikro-orm/core';

async function shutdown(server: Server, orm: MikroORM) {
  console.log('Closing http server.');
  server.close(async () => {
    console.log('Http server closed.');
    await orm.close();
    console.log('Database connection closed.');
    process.exit(0);
  });
}

export function setupGracefulShutdown(server: Server, orm: MikroORM) {
  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    await shutdown(server, orm);
  });

  process.on('SIGINT', async () => {
    console.info('SIGINT signal received.');
    await shutdown(server, orm);
  });
}
