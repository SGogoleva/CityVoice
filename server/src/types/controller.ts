import { Request, Response, NextFunction } from 'express';

export interface controller {
  req: Request,
  res: Response,
  next: NextFunction
}