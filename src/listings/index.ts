import { Stats, Status } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { OrderRecord } from '../orders';

export interface ListingRecord {
  id: string;
  productIds: string[];
  images: Array<{ id: string; verified: boolean }>;
  price: number;
  postage: number;
  currency: string;
  stats: Stats;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  rating: number;
  status: Status;
  history: Array<{
    createdAt: Date;
    userId: string;
    username: string;
    status: Status;
  }>;
  // virtuals
  orders: Array<OrderRecord & Document>;
}

export type ListingModel = Model<ListingRecord>;
export type ListingDoc = ListingRecord & Document;

const historySchema = new Schema(
  {
    userId: String,
    username: String,
    status: String,
  },
  { timestamps: true },
);
const imageSchema = new Schema({
  id: String,
  verified: Boolean,
});
const discountSchema = new Schema({
  name: String,
  fixed: Number,
  percentage: Number,
});
const listingSchema = new Schema<ListingRecord>(
  {
    id: String,
    productIds: [String],
    images: [imageSchema],
    price: Number,
    postage: Number,
    currency: String,
    stats: {
      condition: String,
      region: String,
      boxed: Boolean,
      instructions: Boolean,
    },
    description: String,
    createdDate: Date,
    userId: String,
    rating: Number,
    status: String,
    history: [historySchema],
    discount: discountSchema,
    postedAt: Date,
  },
  { timestamps: true },
);
listingSchema.virtual('orders', {
  ref: 'Order',
  localField: 'id',
  foreignField: 'listingId',
  justOne: false,
});

export { listingSchema };
