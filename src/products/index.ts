import type { ProductType } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { CompanyDoc } from '../companies';

export interface ProductRecord {
  type: ProductType;
  id: string;
  name: string;
  cover: string;
  banner: string;
  releaseDate: Date;
  price: {
    spot: number;
    mint: number;
    cib: number;
    loose: number;
  };
  rawgId: number;
  gameId: string;
  platformId: string;
  platformIds: string[];
  alias: string[];
  publisherId: string;
  developerId: string;
  // virtuals
  platform: ProductRecord & Document;
  publisher: CompanyDoc;
  developer: CompanyDoc;
}

export type ProductModel = Model<ProductRecord>;
export type ProductDoc = ProductRecord & Document;

const productSchema = new Schema<ProductRecord>({
  id: String,
  gameId: String,
  platformId: String,
  platformIds: [String],
  type: String,
  name: String,
  alias: [String],
  cover: String,
  banner: String,
  releaseDate: Date,
  rawgId: Number,
  developerId: String,
  publisherId: String,
  price: {
    spot: Number,
    mint: Number,
    cib: Number,
    loose: Number,
  },
});
productSchema.virtual('platform', {
  ref: 'product',
  localField: 'platformId',
  foreignField: 'id',
  justOne: true,
});
productSchema.virtual('listings', {
  ref: 'Listing',
  localField: 'id',
  foreignField: 'productIds',
  justOne: false,
});
productSchema.virtual('publisher', {
  ref: 'Company',
  localField: 'publisherId',
  foreignField: 'id',
  justOne: true,
});
productSchema.virtual('developer', {
  ref: 'Company',
  localField: 'developerId',
  foreignField: 'id',
  justOne: true,
});

export { productSchema };
