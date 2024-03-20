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
      customLevels: {
        emerg: 80,
        alert: 70,
        crit: 60,
        error: 50,
        warn: 40,
        info: 30,
        trace: 20,
        debug: 10,
      },
      useOnlyCustomLevels: true,
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
    },
  };
}