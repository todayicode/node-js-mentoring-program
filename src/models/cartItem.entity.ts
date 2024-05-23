import { Property, Embeddable, ManyToOne } from '@mikro-orm/core';
import { Product } from './product.entity.js';

@Embeddable()
export class CartItem {
  @ManyToOne({ eager: true })
  product: Product;

  @Property()
  count: number;
}
