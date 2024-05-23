import { v4 as uuidv4 } from 'uuid';
import { CartRepository } from '../repositories/cart.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { OrderRepository } from '../repositories/order.repository.js';
import orm from '../server.js';
import { Cart } from '../models/cart.entity.js';

export class CartService {
  private cartRepository = new CartRepository();
  private productRepository = new ProductRepository();
  private orderRepository = new OrderRepository();

  async getUserCart(userId) {
    let cart = await this.cartRepository.findCartByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.createCart({
        user: userId,
        items: [],
        isDeleted: false,
      });
    }

    let total = 0;
    for (const item of cart.items) {
      if (item && item.product) {
        const product = await this.productRepository.getProduct(
          item.product.id
        );
        if (product) {
          total += product.price * item.count;
        }
      }
    }

    return { cart, total };
  }

  async updateUserCart(userId, { productId, count }) {
    let cart = await this.cartRepository.findCartByUserId(userId);
    if (!cart) {
      return { error: 'Cart was not found', statusCode: 404 };
    }

    const product = await this.productRepository.getProduct(productId);

    if (!product) {
      return { error: 'Products are not valid', statusCode: 400 };
    }

    const existingProduct = cart.items.find(
      (item) => item.product.id === productId
    );
    if (existingProduct) {
      existingProduct.count += count;
    } else {
      cart.items.push({ product, count });
    }
    await this.cartRepository.updateCart(cart);

    return { data: { Cart: cart }, statusCode: 200 };
  }

  async emptyUserCart(userId) {
    let cart = await this.cartRepository.findCartByUserId(userId);
    if (!cart) {
      return false;
    }
    return this.cartRepository.emptyCart(userId);
  }

  async createOrderFromCart(userId) {
    let cart = await this.cartRepository.findCartByUserId(userId);
    if (!cart || cart.items.length === 0) {
      return { error: 'Cart is empty', statusCode: 400 };
    }
    const order = await this.orderRepository.createOrderFromCart(userId, cart);

    await this.cartRepository.emptyCart(userId);

    return { data: { order }, statusCode: 200 };
  }
}
