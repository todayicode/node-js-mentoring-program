import { Entity, Property, Unique, Enum } from '@mikro-orm/core';
import { BaseEntity } from './base.entity.js';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role: UserRole;

  async beforeCreate() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async beforeUpdate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
