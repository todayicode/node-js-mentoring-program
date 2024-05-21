import { Property, Embeddable, ManyToOne } from '@mikro-orm/core';
import { ProductPos } from './product.entity.js';

@Embeddable()
export class CartItem {
  @ManyToOne()
  product: ProductPos;

  @Property()
  count: number;
}
