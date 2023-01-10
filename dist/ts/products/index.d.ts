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
    spotPrice: number;
    highPrice: number;
    lowPrice: number;
    rawgId: number;
    gameId: string;
    platformId: string;
    platformIds: string[];
    alias: string[];
    publisherId: string;
    developerId: string;
    platform: ProductRecord & Document;
    publisher: CompanyDoc;
    developer: CompanyDoc;
}
export type ProductModel = Model<ProductRecord>;
export type ProductDoc = ProductRecord & Document;
declare const productSchema: Schema<ProductRecord, Model<ProductRecord, any, any>, undefined, {}>;
export { productSchema };
