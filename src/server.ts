import bodyParser from 'body-parser';
import express from 'express';
import { CartController } from './controllers/cart.controller.js';
import { ProductController } from './controllers/product.controller.js';
import { UserPos } from './models/user.entity.js';
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import { ProductPos } from './models/product.entity.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

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

const orm = await MikroORM.init(config);
await orm.schema.refreshDatabase();
const em = orm.em.fork();
const userPos = new UserPos();
const prod1 = new ProductPos();
prod1.title = 'Book';
prod1.description = 'Interesting book';
prod1.price = 200;
const prod2 = new ProductPos();
prod2.title = 'Book 2';
prod2.description = 'Interesting book 2';
prod2.price = 400;
await em.persist([userPos, prod1, prod2]).flush();

const myUser = await em.findOne(UserPos, userPos.id);
console.log('prod1, prod2', prod1, prod2);
console.log('myUser myUsermyUser myUser myUser', myUser);

export default orm;
