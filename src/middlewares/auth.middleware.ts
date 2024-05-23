import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const userService = new UserService();

  let userId = req.headers['x-user-id'];

  if (Array.isArray(userId)) {
    userId = userId[0];
  }

  if (!userId) {
    return res.status(403).json({ data: null, error: { message: "You must be authorized user" } });
  }
  
  if (userId === 'admin') {
    next();
    return;
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(401).json({ data: null, error: { message: "User is not authorized" } });
  }
  
  next();
};
