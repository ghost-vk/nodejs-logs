import { Application } from 'express';
import { nanoid } from 'nanoid';
import pino, { stdTimeFunctions } from 'pino';
import pinoHttp, { Options } from 'pino-http';

import { cfg } from './config';

function getJsonLoggerConfig(): Options {
  return {
    level: cfg.LOG_LEVEL,
    redact: ['req.headers.cookie', 'req.headers.authorization'],
    timestamp: stdTimeFunctions.unixTime,
    formatters: {
      level: (label): { level: string } => ({ level: label.toUpperCase() }),
    },
  };
}

function getPrettyLoggerConfig(): Options {
  return {
    level: cfg.LOG_LEVEL,
    redact: ['req.headers.cookie', 'req.headers.authorization'],
    timestamp: stdTimeFunctions.isoTime,
    formatters: {
      level: (label): { level: string } => ({ level: label.toUpperCase() }),
    },
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  };
}

export const logger = pino(
  cfg.LOG_JSON ? getJsonLoggerConfig() : getPrettyLoggerConfig(),
);

export function attachLoggerToApplication(app: Application): void {
  app.use(
    pinoHttp({
      logger,
      // Можно использовать crypto.randomUUID(), если есть причины не
      //   устанавливать nanoid
      // nanoid быстрее и дает более короткие идентификаторы
      genReqId: () => nanoid(),
      quietReqLogger: cfg.LOG_QUIET_REQ,
      autoLogging: cfg.LOG_HTTP,
    }),
  );
}
