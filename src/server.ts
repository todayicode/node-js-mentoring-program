import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { CartController } from './controllers/cart.controller.js';
import { ProductController } from './controllers/product.controller.js';
import { UserController } from './controllers/user.controller.js';
import { authenticationMiddleware } from './middlewares/authentication.middleware.js';
import { authorizationMiddleware } from './middlewares/authorization.middleware.js';
import { logEndpointCall } from './logger/logger.js';
import orm from './database.js';
import { setupGracefulShutdown } from './shutdown.js';
import { healthcheck } from './healthcheck.js';

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });


const cartController = new CartController();
const productController = new ProductController();
const userController = new UserController();

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/api/profile/cart', authenticationMiddleware, (req, res) => {
  logEndpointCall('GET', '/api/profile/cart');
  cartController.getCart(req, res);
});
app.put('/api/profile/cart', authenticationMiddleware, (req, res) => {
  logEndpointCall('PUT', '/api/profile/cart', { request: req.body });
  cartController.updateCart(req, res);
});

app.delete(
  '/api/profile/cart',
  authenticationMiddleware,
  authorizationMiddleware,
  (req, res) => {
    logEndpointCall('DELETE', '/api/profile/cart');
    cartController.emptyCart(req, res);
  }
);

app.post('/api/profile/cart/checkout', authenticationMiddleware, (req, res) => {
  logEndpointCall('POST', '/api/profile/cart/checkout', {
    request: req.body,
  });
  cartController.createOrder(req, res);
});

app.get('/api/products', authenticationMiddleware, (req, res) => {
  logEndpointCall('GET', '/api/products');
  productController.getProducts(req, res);
});
app.get('/api/products/:productId', authenticationMiddleware, (req, res) => {
  logEndpointCall('GET', `/api/products/${req.params.productId}`);
  productController.getProduct(req, res);
});

app.post('/api/auth/register', (req, res) => {
  logEndpointCall('POST', '/api/auth/register', { request: req.body });
  userController.register(req, res);
});
app.post('/api/auth/login', (req, res) => {
  logEndpointCall('POST', '/api/auth/login', { request: req.body });
  userController.login(req, res);
});

app.get('/healthcheck', (req, res) => healthcheck(req, res, orm));

const server = app.listen(8000, () => {
  console.log('Server is running at http://localhost:8000');
});

await orm.schema.refreshDatabase();

setupGracefulShutdown(server, orm);
