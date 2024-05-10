import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
import { validateUpdateCart } from '../validators/requestValidations';

export class CartController {
  private cartService = new CartService();

  getCart = async (req: Request, res: Response) => {
    const userId = String(req.headers['x-user-id']);
    try {
      const result = await this.cartService.getUserCart(userId);
      return res.status(200).json({ data: result, error: null });
    } catch (error) {
      return res.status(500).json({ data: null, error: error.message });
    }
  };

  updateCart = async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'];
    const cartUpdates = req.body;

    const { error } = validateUpdateCart(cartUpdates);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const result = await this.cartService.updateUserCart(userId, cartUpdates);
      if (result.error) {
        return res
          .status(result.statusCode)
          .json({ data: null, error: result.error });
      }
      return res.status(200).json({ data: result.data, error: null });
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  };

  emptyCart = async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'];
    try {
      const success = await this.cartService.emptyUserCart(userId);
      if (success) {
        return res.status(200).json({ data: { success: true }, error: null });
      } else {
        return res
          .status(500)
          .json({ data: null, error: { message: 'Internal Server error' } });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  };

  createOrder = async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'];
    try {
      const result = await this.cartService.createOrderFromCart(userId);
      if (result.error) {
        return res
          .status(result.statusCode)
          .json({ data: null, error: result.error });
      }
      return res.status(200).json({ data: result.data, error: null });
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  };
}
