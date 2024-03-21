import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('got request: ' + req.path);

  req.on('end', () => {
    console.log('request completed: ' + res.statusCode);
  });

  next();
});

app.get('/', function handle(_req: Request, res: Response) {
  res.json({ hello: 'express' });
});

app.get('/error', function handle(_req: Request, res: Response) {
  res.json({ hello: 'express' });
});

(async function start(): Promise<void> {
  app.listen(4000);
})();
