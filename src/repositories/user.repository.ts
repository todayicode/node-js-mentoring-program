import orm from '../server.js';
import { User } from '../models/user.entity.js';

export class UserRepository {
  async findUserById(id: string): Promise<User | null> {
    const em = orm.em.fork();
    return em.findOne(User, { id });
  }

  async createUser(user: User): Promise<User> {
    const em = orm.em.fork();
    await em.persistAndFlush(user);
    return user;
  }
}
