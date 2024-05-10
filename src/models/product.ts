import mongoose, { Schema, Document } from 'mongoose';
export interface ProductEntity {
  productId: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductEntityModel extends ProductEntity, Document {}

export const ProductSchema: Schema = new Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<ProductEntityModel>('Product', ProductSchema);
