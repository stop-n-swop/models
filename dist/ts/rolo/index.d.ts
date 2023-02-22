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
    product: ProductDoc;
    platform: ProductDoc;
}
export type RoloModel = Model<RoloRecord>;
export type RoloDoc = RoloRecord & Document;
declare const roloSchema: Schema<RoloRecord, Model<RoloRecord, any, any>, undefined, {}>;
export { roloSchema };
