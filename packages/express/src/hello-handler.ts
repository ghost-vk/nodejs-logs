import { Request, Response } from 'express';

export function helloHandler(req: Request, res: Response): void {
  req.log.info('hello express log msg');
  res.json({ hello: 'express' });
}
