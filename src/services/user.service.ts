import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(userId: string) {
    const user = this.userRepository.findUserById(userId);
    return user;
  }

  async createUser(user) {
    const newUser = this.userRepository.createUser(user);
    return newUser;
  }
}