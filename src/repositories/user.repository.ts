import orm from '../server.js';
import { UserPos } from '../models/user.entity.js';

export class UserRepository {
  async findUserById(id: string): Promise<UserPos | null> {
    const em = orm.em.fork();
    return em.findOne(UserPos, { id });
  }

  async createUser(user: UserPos): Promise<UserPos> {
    const em = orm.em.fork();
    await em.persistAndFlush(user);
    return user;
  }
}
