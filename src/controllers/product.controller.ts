import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  private productService = new ProductService();

  getProducts = async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'];
    try {
      const products = await this.productService.getProducts(userId);
      if (products.length === 0) {
        return res.status(404).json({ data: [], error: null });
      }
      return res.status(200).json({ data: products, error: null });
    } catch (error) {
      return res.status(500).json({ data: null, error: { message: "Internal Server error" } });
    }
  }

  getProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
      const product = await this.productService.getProduct(productId);
      if (!product) {
        return res.status(404).json({ data: null, error: "No product with such id" });
      }
      return res.status(200).json({ data: product, error: null });
    } catch (error) {
      return res.status(500).json({ data: null, error: { message: "Internal Server error" } });
    }
  }
}