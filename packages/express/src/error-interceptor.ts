import { NextFunction, Request, Response } from 'express';

export function errorInterceptor(
  err: Error | string | unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  req.log.error('intercept error', err);

  if (res.headersSent) {
    next(err);

    return;
  }

  let errMessage: string | null = null;

  if (err instanceof Error) {
    errMessage = err.message;
  } else if (typeof err === 'string') {
    errMessage = err;
  }

  const code = res.statusCode ?? 500;

  res.status(code).json({ message: 'internal error', original: errMessage });
}
