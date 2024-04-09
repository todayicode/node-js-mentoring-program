import express from 'express';
import { CartController } from './controllers/cart.controller';
import { ProductController } from './controllers/product.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import bodyParser from 'body-parser';



const cartController = new CartController();
const productController = new ProductController();

const app = express();
app.use(bodyParser.json());

app.get('/api/profile/cart', authMiddleware, cartController.getCart);
app.put('/api/profile/cart', authMiddleware, cartController.updateCart);
app.delete('/api/profile/cart', authMiddleware, cartController.emptyCart);
app.post('/api/profile/cart/checkout', authMiddleware, cartController.createOrder);

app.get('/api/products', authMiddleware, productController.getProducts);
app.get('/api/products/:productId', authMiddleware, productController.getProduct);

app.listen(8000, () => {
  console.log('Server is running at http://localhost:8000');
});
