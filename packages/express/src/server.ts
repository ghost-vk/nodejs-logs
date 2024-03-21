import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import pino from 'pino';
import { pinoHttp } from 'pino-http';

import { cfg } from './config';
import { getJsonLoggerConfig, getPrettyLoggerConfig } from './logger';

const app = express();

const logger = pino(
  cfg.LOG_JSON ? getJsonLoggerConfig() : getPrettyLoggerConfig(),
);

app.use(
  pinoHttp({
    logger,
    // Можно использовать crypto.randomUUID(), если есть причины не
    //   устанавливать nanoid
    // nanoid быстрее и дает более короткие идентификаторы
    genReqId: () => nanoid(),
    // quietReqLogger: true,
    autoLogging: false,
  }),
);
app.use(cors());
app.use(bodyParser.json());

app.get('/', function handle(_req: Request, res: Response) {
  res.json({ hello: 'express' });
});

app.get('/error', function handle(req: Request, res: Response) {
  req.log.warn('error endpoint');

  res.json({ hello: 'express' });
});

(async function start(): Promise<void> {
  app.listen(4000);
  logger.info(`Express Server started at port 4000...`);
})();
