import { Entity, Property, Embedded, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from './base.entity.js';
import { CartItem } from './cartItem.entity.js';
import { User } from './user.entity.js';

@Entity()
export class Cart extends BaseEntity {
  @OneToOne(() => User, { primary: true })
  user: User;

  @Property()
  isDeleted: boolean;

  @Embedded()
  items: CartItem[] = [];
}
