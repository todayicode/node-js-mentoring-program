import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../models/order';
import { CartEntity } from '../models/cart';

export class OrderRepository {
  private orders: OrderEntity[] = [];

  createOrderFromCart(userId: string, cart: CartEntity): OrderEntity {
    const order: OrderEntity = {
      id: uuidv4(),
      userId,
      cartId: cart.id,
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
    };
    this.orders.push(order);
    return order;
  }
}