import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { CartController } from './controllers/cart.controller.js';
import { ProductController } from './controllers/product.controller.js';
import { UserController } from './controllers/user.controller.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { seedUser, seedCart, seedProduct } from './seed/index.js';


const uri: string = 'mongodb://root:nodegmp@localhost:27017';

mongoose
  .connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error: Error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });

const cartController = new CartController();
const productController = new ProductController();

const app = express();
app.use(bodyParser.json());

app.get('/api/profile/cart', authMiddleware, cartController.getCart);
app.put('/api/profile/cart', authMiddleware, cartController.updateCart);
app.delete('/api/profile/cart', authMiddleware, cartController.emptyCart);
app.post(
  '/api/profile/cart/checkout',
  authMiddleware,
  cartController.createOrder
);

app.get('/api/products', authMiddleware, productController.getProducts);
app.get(
  '/api/products/:productId',
  authMiddleware,
  productController.getProduct
);

app.listen(8000, () => {
  console.log('Server is running at http://localhost:8000');
});

seedProduct();
seedCart();
seedUser();
