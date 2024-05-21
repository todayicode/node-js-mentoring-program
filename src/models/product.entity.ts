import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity.js';

@Entity()
export class ProductPos extends BaseEntity {
  @Property({ length: 100 })
  title!: string;

  @Property({ length: 1000 })
  description!: string;

  @Property()
  price!: string;
}
