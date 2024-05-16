import { v4 as uuidv4 } from 'uuid';
import Order, { OrderEntity } from '../models/order.js';
import { CartEntity } from '../models/cart.js';

export class OrderRepository {

  async createOrderFromCart(userId: string, cart: CartEntity): Promise<OrderEntity> {
    
    const order = new Order({
      orderId: uuidv4(),
      userId,
      cartId: cart.cartId,
      items: cart.items,
      comments: "",
      status: "created",
      total: cart.items.reduce((sum, item) => sum + (item.product.price * item.count), 0),
      payment: {
        type: "cash",
        address: { country: "USA", street: "street 1" },
        creditCard: { cardNumber: "4111111111111111", expiry: "12/25" },
      },
      delivery: {
        type: "home",
        address: { country: "USA", city: "New York", street: "street 1", pin: "10001" },
      }
    });


    return await order.save();
  }
}
