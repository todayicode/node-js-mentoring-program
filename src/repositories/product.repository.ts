import { ProductEntity } from '../models/product';

export class ProductRepository {
  private products: ProductEntity[] = [
    {
      "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
      "title": "Book",
      "description": "Interesting book",
      "price": 200
    },
    {
      "id": "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
      "title": "Pen",
      "description": "Cute pen",
      "price": 20
    },
    {
      "id": "915b2f40-9fd9-47f2-9b51-628f3dc69aac",
      "title": "Pen 2",
      "description": "Cute pen 2",
      "price": 30
    }
  ];

  getProducts() {
    return this.products;
  }

  getProduct(productId) {
    return this.products.find(product => product.id === productId);
  }
}