import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { attachLoggerToApplication, logger } from './logger';

const app = express();

app.use(cors());
app.use(bodyParser.json());

attachLoggerToApplication(app);

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
