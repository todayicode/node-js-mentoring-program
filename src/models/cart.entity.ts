import { Entity, Property, Embedded } from '@mikro-orm/core';
import { BaseEntity } from './base.entity.js';
import { CartItem } from './cartItem.entity.js';

@Entity()
export class CartPos extends BaseEntity {
  @Property()
  userId: string;

  @Property()
  isDeleted: boolean;

  @Embedded()
  items: CartItem[] = [];
}
