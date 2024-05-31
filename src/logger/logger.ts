import winston from 'winston';

interface RequestBody {
  [key: string]: any;
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.Console()],
});

export function logEndpointCall(
  method: string,
  endpoint: string,
  body?: RequestBody
) {
  logger.info(`${method} ${endpoint} endpoint called`, { request: body });
}
