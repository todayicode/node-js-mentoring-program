import { UserRepository } from '../repositories/user.repository';
import User from '../models/user'; 

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
