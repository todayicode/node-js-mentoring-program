import { UserRepository } from '../repositories/user.repository.js';
import {UserPos} from '../models/user.entity.js'; 

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  async createUser(user) {
    const newUser = this.userRepository.createUser(user);
    return newUser;
  }
}
