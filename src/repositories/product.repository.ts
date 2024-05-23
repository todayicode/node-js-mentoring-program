import { ProductPos } from '../models/product.entity.js';
import orm from '../server.js';

export class ProductRepository {
  async getProducts(): Promise<ProductPos[]> {
    const em = orm.em.fork();
    const result = await em.find(ProductPos, {});
    return result;
  }

  async getProduct(id: string): Promise<ProductPos | null> {
    const em = orm.em.fork();
    return await em.findOne(ProductPos, { id });
  }
}
