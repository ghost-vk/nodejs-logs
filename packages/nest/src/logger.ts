import { nanoid } from 'nanoid';
import { stdTimeFunctions } from 'pino';
import { Options } from 'pino-http';

import { cfg } from './config';

export function getJsonLoggerConfig(): { pinoHttp: Options } {
  return {
    pinoHttp: {
      level: cfg.LOG_LEVEL,
      redact: ['req.headers.cookie', 'req.headers.authorization'],
      timestamp: stdTimeFunctions.unixTime,
      formatters: {
        level: (label): { level: string } => ({ level: label.toUpperCase() }),
      },
      // Можно использовать crypto.randomUUID(), если есть причины не
      //   устанавливать nanoid
      // nanoid быстрее и дает более короткие идентификаторы
      genReqId: () => nanoid(),
    },
  };
}

export function getPrettyLoggerConfig(): {
  pinoHttp: Options;
} {
  return {
    pinoHttp: {
      level: cfg.LOG_LEVEL,
      redact: ['req.headers.cookie', 'req.headers.authorization'],
      timestamp: stdTimeFunctions.isoTime,
      autoLogging: false,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    },
  };
}
