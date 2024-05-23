import { CartPos } from '../models/cart.entity.js';
import { UserPos } from '../models/user.entity.js';
import orm from '../server.js';
export class CartRepository {
  async findCartByUserId(userId: string): Promise<CartPos | null> {
    const em = orm.em.fork();
    return await em.findOne(CartPos, { user: userId });
  }

  async createCart(cartData: any): Promise<CartPos> {
    const em = orm.em.fork();
    const user = await em.findOne(UserPos, { id: cartData.user });
    const newCart = new CartPos();
    newCart.user = user.id;
    newCart.isDeleted = false;
    newCart.items = [];
    await em.persist(newCart).flush();
    return newCart;
  }

  async updateCart(cartData: any): Promise<CartPos> {
    const em = orm.em.fork();
    const cart = await em.findOne(CartPos, { id: cartData.id });
    em.assign(cart, cartData);
    await em.flush();

    return cart;
  }

  async emptyCart(userId: string): Promise<boolean> {
    const em = orm.em.fork();
    const cart = await em.findOne(CartPos, { user: userId });

    if (cart) {
      cart.items = [];
      await em.flush();
      return true;
    }
    return false;
  }
}
