import { Entity, Property, Embeddable, Embedded } from '@mikro-orm/core';
import { CartItem } from './cartItem.entity.js';
import { BaseEntity } from './base.entity.js';

@Embeddable()
class CreditCard {
  @Property()
  cardNumber: string;

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

@Entity()
export class OrderEntity extends BaseEntity {
  @Embedded(() => Payment)
  payment: Payment;

  @Embedded(() => Address)
  shippingAddress: Address;

  @Embedded(() => CartItem, { array: true })
  items: CartItem[] = [];
}
