import { UserEntity } from '../models/user';

export class UserRepository {
  private users: UserEntity[] = [
    {
      id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    },
    {
      id: "2eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    }
  ];

  findUserById(userId: string): UserEntity {
    return this.users.find(user => user.id === userId);
  }

  createUser(user) {
    this.users.push(user);
    return user;
  }
}