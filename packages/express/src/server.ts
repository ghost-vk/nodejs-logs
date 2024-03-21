import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { cfg } from './config';
import { errorHandler } from './error-handler';
import { helloHandler } from './hello-handler';
import { attachLoggerToApplication, logger } from './logger';

const app = express();

app.use(cors());
app.use(bodyParser.json());

attachLoggerToApplication(app);

app.get('/hello', helloHandler);
app.get('/error', errorHandler);

(async function start(): Promise<void> {
  app.listen(4000);
  logger.info(`Express Server started at port 4000...`);
  logger.info(`Application Config:\n%j`, cfg);
})();
