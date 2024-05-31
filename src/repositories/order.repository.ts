import orm from '../database.js';
import { EntityManager } from '@mikro-orm/core';
import { Cart } from '../models/cart.entity.js';
import { Order } from '../models/order.entity.js';

export class OrderRepository {
  async createOrderFromCart(user, cart: Cart): Promise<Order> {
    const em: EntityManager = orm.em.fork();

    const order = new Order();
    order.user = user;
    order.items = cart.items;
    order.comments = '';
    order.status = 'created';
    order.total = cart.items.reduce((sum, item) => {
      if (
        item.product &&
        typeof item.product.price === 'number' &&
        typeof item.count === 'number'
      ) {
        return sum + item.product.price * item.count;
      } else {
        return sum;
      }
    }, 0);
    order.payment = {
      type: 'cash',
      address: 'USA, street 1',
      creditCard: { number: '4111111111111111', expiry: '12/25' },
    };
    order.delivery = {
      type: 'home',
      address: {
        country: 'USA',
        city: 'New York',
        street: 'street 1',
        pin: '10001',
      },
    };

    await em.persistAndFlush(order);

    cart.items = [];
    await em.flush();

    return order;
  }
}
