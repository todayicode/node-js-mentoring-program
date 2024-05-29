import { Response, NextFunction } from 'express';
import { Request } from '../interfaces/Request.interface.js';

export async function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ data: null, error: { message: 'Forbidden' } });
  }

  next();
}
