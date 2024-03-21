import { Request, Response } from 'express';

export function errorHandler(req: Request, res: Response): void {
  req.log.warn('error endpoint');

  res.status(405).json({ message: 'test error msg', statusCode: 405 });
}
