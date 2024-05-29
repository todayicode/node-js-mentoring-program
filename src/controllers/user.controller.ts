import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
  private userService = new UserService();

  getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ data: null, error: 'No user with such id' });
      }
      return res.status(200).json({ data: user, error: null });
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  };

  register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        data: null,
        error: { message: 'Email, password and role are required' },
      });
    }

    try {
      const user = await this.userService.register(email, password, role);
      return res.status(200).json({ data: user, error: null });
    } catch (error) {
      const errorMessage = error.message || 'Internal Server error';
      return res
        .status(500)
        .json({ data: null, error: { message: errorMessage } });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        data: null,
        error: { message: 'Email and password are required' },
      });
    }

    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          data: null,
          error: { message: 'No user with such email or password' },
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(404).json({
          data: null,
          error: { message: 'No user with such email or password' },
        });
      }

      const userForToken = {
        email: user.email,
        id: user.id,
        role: user.role,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

      return res.status(200).json({ data: { token }, error: null });
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  };
}
