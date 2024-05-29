import { User } from '../models/user.entity.js';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    user?: User;
  }
