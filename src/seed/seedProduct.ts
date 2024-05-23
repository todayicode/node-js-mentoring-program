// import Product, { ProductEntity } from '../models/product.js';

// const productsData: ProductEntity[] = [
//   {
//     productId: '891389f0-4312-42d6-a650-6fda0959c734',
//     title: 'Book',
//     description: 'Interesting book',
//     price: 200,
//   },
//   {
//     productId: '891389f0-4312-42d6-a650-6fda0959c735',
//     title: 'Book 2',
//     description: 'Interesting book 2',
//     price: 300,
//   },
//   {
//     productId: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
//     title: 'Book 3',
//     description: 'Interesting book 3',
//     price: 400,
//   },
// ];

// export async function seedProduct() {
//   const count = await Product.countDocuments();
//   if (count === 0) {
//     await Product.insertMany(productsData);
//     console.log('Database has been seeded with Products!');
//   }
// }
