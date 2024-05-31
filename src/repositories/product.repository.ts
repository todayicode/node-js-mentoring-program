import { Product } from '../models/product.entity.js';
import orm from '../database.js';

export class ProductRepository {
  async getProducts(): Promise<Product[]> {
    const em = orm.em.fork();
    const result = await em.find(Product, {});
    return result;
  }

  async getProduct(id: string): Promise<Product | null> {
    const em = orm.em.fork();
    return await em.findOne(Product, { id });
  }
}
