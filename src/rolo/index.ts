import type { Region } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { ProductDoc } from '../products';

export interface RoloRecord {
  date: string;
  platformId: string;
  productId: string;
  listingId: string;
  userId: string;
  boxed: boolean;
  instructions: boolean;
  new: boolean;
  region: Region;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  // virtuals
  product: ProductDoc;
  platform: ProductDoc;
}
export type RoloModel = Model<RoloRecord>;
export type RoloDoc = RoloRecord & Document;

const roloSchema = new Schema<RoloRecord>(
  {
    date: String,
    platformId: String,
    productId: String,
    listingId: String,
    userId: String,
    boxed: Boolean,
    instructions: Boolean,
    new: Boolean,
    region: String,
    views: Number,
  },
  { timestamps: true },
);
roloSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: 'id',
  justOne: true,
});
roloSchema.virtual('listing', {
  ref: 'Listing',
  localField: 'listingId',
  foreignField: 'id',
  justOne: true,
});
roloSchema.virtual('platform', {
  ref: 'Product',
  localField: 'platformId',
  foreignField: 'id',
  justOne: true,
});
roloSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});

export { roloSchema };
