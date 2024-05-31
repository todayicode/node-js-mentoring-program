import { Cart } from '../models/cart.entity.js';
import { User } from '../models/user.entity.js';
import orm from '../database.js';
export class CartRepository {
  async findCartByUserId(userId: string): Promise<Cart | null> {
    const em = orm.em.fork();
    return await em.findOne(Cart, { user: userId });
  }

  async createCart(cartData: any): Promise<Cart> {
    const em = orm.em.fork();
    const user = await em.findOne(User, { id: cartData.user });
    const newCart = new Cart();
    newCart.user = user.id;
    newCart.isDeleted = false;
    newCart.items = [];
    await em.persist(newCart).flush();
    return newCart;
  }

  async updateCart(cartData: any): Promise<Cart> {
    const em = orm.em.fork();
    const cart = await em.findOne(Cart, { id: cartData.id });
    em.assign(cart, cartData);
    await em.flush();

    return cart;
  }

  async emptyCart(userId: string): Promise<boolean> {
    const em = orm.em.fork();
    const cart = await em.findOne(Cart, { user: userId });

    if (cart) {
      cart.items = [];
      await em.flush();
      return true;
    }
    return false;
  }
}
