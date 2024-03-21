import { stdTimeFunctions } from 'pino';
import { Options } from 'pino-http';

import { cfg } from './config';

export function getJsonLoggerConfig(): Options {
  return {
    level: cfg.LOG_LEVEL,
    redact: ['req.headers.cookie', 'req.headers.authorization'],
    timestamp: stdTimeFunctions.unixTime,
    autoLogging: cfg.LOG_HTTP,
    quietReqLogger: cfg.LOG_QUIET_REQ,
    formatters: {
      level: (label): { level: string } => ({ level: label.toUpperCase() }),
    },
  };
}

export function getPrettyLoggerConfig(): Options {
  return {
    level: cfg.LOG_LEVEL,
    redact: ['req.headers.cookie', 'req.headers.authorization'],
    timestamp: stdTimeFunctions.isoTime,
    autoLogging: cfg.LOG_HTTP,
    quietReqLogger: cfg.LOG_QUIET_REQ,
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
