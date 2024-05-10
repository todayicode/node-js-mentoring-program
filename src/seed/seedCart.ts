import { Cart, CartEntity } from '../models/cart';

const cartsData: CartEntity[] = [
  {
    "cartId": "cart-eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "userId": "6dc52b3c-de7e-431a-84b8-0ec56e0774d4",
    "isDeleted": false,
    "items": [
      {
        "product": {
          "productId": "891389f0-4312-42d6-a650-6fda0959c734",
          "title": "Book",
          "description": "Interesting book",
          "price": 200
        },
        "count": 2
      },
    ]
  },
  {
    "cartId": "cart-eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "userId": "2eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    "isDeleted": false,
    "items": [
      {
        "product": {
          "productId": "891389f0-4312-42d6-a650-6fda0959c734",
          "title": "Book",
          "description": "Interesting book",
          "price": 200
        },
        "count": 2
      },
    ]
  }
];

export async function seedCart() {
  const count = await Cart.countDocuments();

  if (count === 0) {
    await Cart.insertMany(cartsData);
    console.log('Database has been seeded with Cart!');
  }
}
