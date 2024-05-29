import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';
import { Request } from '../interfaces/Request.interface.js';

const userService = new UserService();

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res
      .status(401)
      .json({ data: null, error: { message: 'Token not provided' } });
  }

  const token = authHeader.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodedToken', decodedToken);
  } catch (err) {
    return res
      .status(401)
      .json({ data: null, error: { message: 'Invalid token' } });
  }

  const user = await userService.getUserById(decodedToken.id);
  if (!user) {
    return res
      .status(403)
      .json({ data: null, error: { message: 'User does not exist' } });
  }

  req.user = user;
  next();
}
