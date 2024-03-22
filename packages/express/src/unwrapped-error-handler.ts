import { NextFunction, Request, Response } from 'express';

export function unwrappedErrorHandler(
  _req: Request,
  _res: Response,
  _next: NextFunction,
): void {
  JSON.parse('{bad json}');

  return;
}
