import orm from '../database.js';
import { User, UserRole } from '../models/user.entity.js';
import { v4 as uuidv4 } from 'uuid';

import bcrypt from 'bcrypt';

export class UserRepository {
  async findUserById(id: string): Promise<User | null> {
    const em = orm.em.fork();
    return em.findOne(User, { id });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const em = orm.em.fork();
    return em.findOne(User, { email });
  }

  async createUser(user: User): Promise<User> {
    const em = orm.em.fork();
    await em.persistAndFlush(user);
    return user;
  }

  async register(
    email: string,
    password: string,
    role: UserRole
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const em = orm.em.fork();

    const newUser = new User();
    newUser.id = uuidv4();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.role = role;

    await em.persistAndFlush(newUser);
    return newUser;
  }
}
