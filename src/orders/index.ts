import type { Address, Status } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { ListingRecord } from '../listings';

export interface OrderRecord {
  id: string;
  listingId: string;
  userId: string;
  paymentId: string;
  status: Status;
  errorCode: string;
  createdAt: Date;
  updatedAt: Date;
  postedAt: Date;
  useBalance: boolean;
  balanceUsed: number;
  trackingProvider: string;
  trackingNumber: string;
  deliveryAddress: Address & { name: string };
  providerFee: number;
  history: Array<{
    createdAt: Date;
    userId: string;
    username: string;
    status: Status;
  }>;
  // virtuals
  listing: ListingRecord & Document;
}

export type OrderModel = Model<OrderRecord>;
export type OrderDoc = OrderRecord & Document;

const historySchema = new Schema(
  {
    userId: String,
    username: String,
    status: String,
  },
  { timestamps: true },
);
const orderSchema = new Schema<OrderRecord>(
  {
    id: String,
    listingId: String,
    userId: String,
    paymentId: String,
    status: String,
    errorCode: String,
    deliveryAddress: new Schema({
      name: String,
      line1: String,
      line2: String,
      city: String,
      postcode: String,
      country: String,
    }),
    history: [historySchema],
    providerFee: Number,
    postedAt: Date,
    trackingProvider: String,
    trackingNumber: String,
    useBalance: Boolean,
    balanceUsed: Number,
  },
  { timestamps: true },
);
orderSchema.virtual('listing', {
  ref: 'Listing',
  localField: 'listingId',
  foreignField: 'id',
  justOne: true,
});
orderSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});

export { orderSchema };
