import mongoose, { Schema, Document } from 'mongoose';
import { ProductEntity, ProductSchema } from './product';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  cartId: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export const CartItemSchema: Schema = new Schema({
  product: {  type: ProductSchema, required: true },
  count: { type: Number, required: true },
});

export const CartSchema: Schema = new Schema({
  cartId: { type: String },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: [CartItemSchema], required: true },
});

export const Cart = mongoose.model<CartEntity>('Cart', CartSchema);
