import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { cfg } from './config';
import { errorHandler } from './error-handler';
import { errorInterceptor } from './error-interceptor';
import { helloHandler } from './hello-handler';
import { attachLoggerToApplication, logger } from './logger';
import { unwrappedErrorHandler } from './unwrapped-error-handler';
import { wrappedErrorHandler } from './wrapped-error-handler';

const app = express();

app.use(cors());
app.use(bodyParser.json());

attachLoggerToApplication(app);

app.get('/hello', helloHandler);
app.get('/error', errorHandler);
app.post('/unwrapped-error', unwrappedErrorHandler);
app.post('/wrapped-error', wrappedErrorHandler);

app.use(errorInterceptor);

(async function start(): Promise<void> {
  app.listen(4000);
  logger.info(`Express Server started at port 4000...`);
  logger.info(`Application Config:\n%j`, cfg);
})();
