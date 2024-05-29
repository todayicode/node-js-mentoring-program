import { UserRepository } from '../repositories/user.repository.js';
import {User} from '../models/user.entity.js'; 

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async register(email, password, role) {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const newUser = this.userRepository.register(email, password, role);
    return newUser;
  }

  async login(email, password, role) {
    const newUser = this.userRepository.register(email, password, role);
    return newUser;
  }
}
