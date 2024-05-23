import { Entity, Property, Embedded, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from './base.entity.js';
import { CartItem } from './cartItem.entity.js';
import { UserPos } from './user.entity.js';

@Entity()
export class CartPos extends BaseEntity {
  @OneToOne(() => UserPos, { primary: true })
  user: UserPos;

  @Property()
  isDeleted: boolean;

  @Embedded()
  items: CartItem[] = [];
}
