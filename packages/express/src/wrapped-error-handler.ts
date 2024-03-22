import { NextFunction, Request, Response } from 'express';

export function wrappedErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    JSON.parse('{bad json}');
  } catch (err) {
    req.log.warn({
      message: 'seems we have an parse json error',
      meta: { handler: 'wrappedErrorHandler', status: `i'm a teapot` },
    });
    res.status(418);
    next(err);
  }
}
