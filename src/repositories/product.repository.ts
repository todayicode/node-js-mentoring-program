import Product, { ProductEntity } from '../models/product.js';

export class ProductRepository {

  async getProducts(): Promise<ProductEntity[]> {
    return await Product.find();
  }

  async getProduct(productId: string): Promise<ProductEntity | null> {
    return await Product.findOne({productId});
  }
}
