import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import { CartController } from './controllers/cart.controller.js';
import { ProductController } from './controllers/product.controller.js';
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import { authenticationMiddleware } from './middlewares/authentication.middleware.js';
import { UserController } from './controllers/user.controller.js';
import { authorizationMiddleware } from './middlewares/authorization.middleware.js';

dotenv.config();
const cartController = new CartController();
const productController = new ProductController();
const userController = new UserController();

const app = express();
app.use(bodyParser.json());

app.get('/api/profile/cart', authenticationMiddleware, cartController.getCart);
app.put('/api/profile/cart', authenticationMiddleware, cartController.updateCart);
app.delete('/api/profile/cart', authenticationMiddleware, authorizationMiddleware, cartController.emptyCart);
app.post('/api/profile/cart/checkout', authenticationMiddleware, cartController.createOrder);

app.get('/api/products', authenticationMiddleware, productController.getProducts);
app.get('/api/products/:productId', authenticationMiddleware, productController.getProduct);

app.post('/api/auth/register', userController.register);
app.post('/api/auth/login', userController.login);

app.listen(8000, () => {
  console.log('Server is running at http://localhost:8000');
});

const orm = await MikroORM.init(config);
await orm.schema.refreshDatabase();


export default orm;
