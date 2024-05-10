import mongoose, { Schema, Document } from 'mongoose';
import { CartItemSchema, CartItemEntity } from '../models/cart';

interface CreditCard {
  cardNumber: string;
  expiry: string;
}
interface Payment {
  type: string;
  address?: string;
  creditCard?: CreditCard;
}

interface Address {
  country: string;
  city: string;
  street: string;
  pin: string;
}

interface Delivery {
  type: string;
  address: Address;
}

export interface OrderEntity {
  orderId: string,
  userId: string,
  cartId: string,
  items: CartItemEntity[];
  payment: Payment;
  delivery: Delivery;
  comments: string;
  status: string;
  total: number;
}
const PaymentAddressSchema: Schema = new Schema({
  country: { type: String, required: true },
  street: { type: String, required: true },
});

const CreditCardSchema: Schema = new Schema({
  cardNumber: { type: String, required: true },
  expiry: { type: String, required: true }
});

const PaymentSchema: Schema = new Schema({
  type: { type: String, required: true },
  address: { type: PaymentAddressSchema, required: false },
  creditCard: { type: CreditCardSchema, required: false }
})

const DeliveryAddressSchema: Schema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  pin: { type: String, required: true }
});

const DeliverySchema: Schema = new Schema({
  type: { type: String, required: true },
  address: { type: DeliveryAddressSchema, required: true }
})

const OrderSchema: Schema = new Schema({
  orderId:{ type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [CartItemSchema], required: true },
  payment: { type: PaymentSchema, required: true },
  delivery: { type: DeliverySchema, required: true },
  comments: { type: String, required: false },
  status: { type: String, required: true },
  total: { type: Number, required: true }
});

export default mongoose.model<OrderEntity>('Order', OrderSchema);
