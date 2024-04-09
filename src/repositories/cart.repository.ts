import { v4 as uuidv4 } from 'uuid';
import { CartEntity } from '../models/cart';

export class CartRepository {
  private carts: CartEntity[] = [ {
    "id": "cart-eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "userId": "6dc52b3c-de7e-431a-84b8-0ec56e0774d4",
    "isDeleted": false,
    "items": [
      {
        "product": {
          "id": "891389f0-4312-42d6-a650-6fda0959c734",
          "title": "Book",
          "description": "Interesting book",
          "price": 200
        },
        "count": 2
      },
    ]
  },
  {
    "id": "cart-eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "userId": "2eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "isDeleted": false,
    "items": [
      {
        "product": {
          "id": "891389f0-4312-42d6-a650-6fda0959c734",
          "title": "Book",
          "description": "Interesting book",
          "price": 200
        },
        "count": 2
      },
    ]
  }];

  findCartByUserId(userId): CartEntity {
    return this.carts.find((cart) => cart.userId === userId);
  }

  createCart(cartData): CartEntity {
    const newCart = { ...cartData, id: uuidv4() };
    this.carts.push(newCart);
    return newCart;
  }

  emptyCart(userId) {
    const userIndex = this.carts.findIndex((cart) => cart.userId === userId);
    if (userIndex !== -1) {
      this.carts[userIndex].items = [];
      return true;
    }
    return false;
  }
}