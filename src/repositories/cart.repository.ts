import { CartEntity, Cart } from '../models/cart.js';
export class CartRepository {

  async findCartByUserId(userId: string): Promise<CartEntity | null> {
    return await Cart.findOne({ userId });
  }

  async createCart(cartData: CartEntity): Promise<CartEntity> {
    const newCart = new Cart({...cartData});
    return await newCart.save();
  }

  async updateCart(cartData: CartEntity): Promise<CartEntity> {
    return await Cart.findOneAndUpdate({userId: cartData.userId}, cartData)
  }

  async emptyCart(userId: string): Promise<boolean> {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      await Cart.findOneAndUpdate({userId}, cart);
      return true;
    }
    return false;
  }
}
