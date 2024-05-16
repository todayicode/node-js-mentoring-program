import { ProductRepository } from '../repositories/product.repository.js';

export class ProductService {
  private productRepository = new ProductRepository();

  async getProducts() {
    let products = this.productRepository.getProducts();
    return products;
  }

  async getProduct(productId) {
    let product = this.productRepository.getProduct(productId);
    return product;
  }
}
