import User, { UserEntity } from '../models/user.js';

export class UserRepository {
  async findUserById(userId: string): Promise<UserEntity | null> {
    return await User.findOne({ id: userId }).exec();
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = new User(user);
    return newUser.save();
  }
}
