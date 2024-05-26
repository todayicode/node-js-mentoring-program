import {
  Entity,
  Property,
  Embeddable,
  Embedded,
  ManyToOne,
} from '@mikro-orm/core';
import { CartItem } from './cartItem.entity.js';
import { BaseEntity } from './base.entity.js';
import { User } from './user.entity.js';

@Embeddable()
class CreditCard {
  @Property()
  number: string;

  @Property()
  expiry: string;
}

@Embeddable()
class Payment {
  @Property()
  type: string;

  @Property({ nullable: true })
  address?: string;

  @Embedded(() => CreditCard, { nullable: true })
  creditCard?: CreditCard;
}

@Embeddable()
class Address {
  @Property()
  country: string;

  @Property()
  city: string;

  @Property()
  street: string;

  @Property()
  pin: string;
}

@Embeddable()
class Delivery {
  @Property()
  type: string;

  @Embedded(() => Address)
  address: Address;
}

@Entity()
export class Order extends BaseEntity {
  @ManyToOne()
  user: User;

  @Embedded(() => CartItem, { array: true })
  items: CartItem[] = [];

  @Property()
  comments?: string;

  @Property()
  status: string;

  @Property()
  total: number;

  @Embedded(() => Payment)
  payment: Payment;

  @Embedded(() => Delivery)
  delivery: Delivery;
}
